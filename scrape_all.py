#!/usr/bin/env python3

import os
import sys
import pandas as pd
import json
from datetime import datetime
from tqdm import tqdm

from scraper.scrape_polishventure import scrape_polishventure
from scraper.scrape_onestop import scrape_onestop
from scraper.scrape_autoxpress import scrape_autoxpress
from scraper.scrape_autopartshub import scrape_autopartshub
from scraper.scrape_spares import scrape_spares
from utils.category_mapping import map_to_category, get_subcategory
from utils.drive_upload import upload_directory_to_drive

def ensure_directories():
    os.makedirs('data/raw', exist_ok=True)
    os.makedirs('data/processed', exist_ok=True)
    os.makedirs('reports', exist_ok=True)

def save_to_csv(products, filename):
    if not products:
        print(f"  No products to save for {filename}")
        return
    
    df = pd.DataFrame(products)
    filepath = os.path.join('data/raw', filename)
    df.to_csv(filepath, index=False, encoding='utf-8')
    print(f"  ✓ Saved {len(products)} products to {filepath}")
    return filepath

def merge_and_process_data(all_products):
    print("\n=== Processing and Merging Data ===")
    
    if not all_products:
        print("  No products to process!")
        return None
    
    df = pd.DataFrame(all_products)
    
    print(f"  Total products before deduplication: {len(df)}")
    
    df = df.drop_duplicates(subset=['product_url'], keep='first')
    print(f"  Total products after deduplication: {len(df)}")
    
    print("  Applying category mapping...")
    df['main_category'] = df.apply(
        lambda row: map_to_category(
            str(row.get('product_name', '')),
            str(row.get('description', ''))
        ),
        axis=1
    )
    
    df['subcategory'] = df.apply(
        lambda row: get_subcategory(
            str(row.get('product_name', '')),
            str(row.get('description', '')),
            str(row.get('main_category', ''))
        ),
        axis=1
    )
    
    column_order = [
        'supplier', 'product_name', 'price', 'price_raw', 'vehicle_make',
        'vehicle_model', 'year_range', 'main_category', 'subcategory',
        'brand', 'engine_size', 'oem_part_number', 'category',
        'description', 'product_url', 'image_urls', 'scrape_date'
    ]
    
    existing_columns = [col for col in column_order if col in df.columns]
    extra_columns = [col for col in df.columns if col not in column_order]
    final_columns = existing_columns + extra_columns
    
    df = df[final_columns]
    
    csv_path = 'data/processed/combined_master.csv'
    json_path = 'data/processed/combined_master.json'
    
    df.to_csv(csv_path, index=False, encoding='utf-8')
    print(f"  ✓ Saved combined CSV to {csv_path}")
    
    df.to_json(json_path, orient='records', indent=2, force_ascii=False)
    print(f"  ✓ Saved combined JSON to {json_path}")
    
    return df

def generate_report(df, scraper_results):
    print("\n=== Generating Report ===")
    
    report_lines = []
    report_lines.append("=" * 60)
    report_lines.append("AUTO PARTS SCRAPING RUN SUMMARY")
    report_lines.append("=" * 60)
    report_lines.append(f"Run Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    report_lines.append("")
    
    report_lines.append("Products Scraped Per Website:")
    report_lines.append("-" * 60)
    total_products = 0
    for supplier, count in scraper_results.items():
        report_lines.append(f"  {supplier:30s}: {count:5d} products")
        total_products += count
    report_lines.append(f"  {'TOTAL':30s}: {total_products:5d} products")
    report_lines.append("")
    
    if df is not None and len(df) > 0:
        report_lines.append(f"Products After Deduplication: {len(df)}")
        report_lines.append("")
        
        report_lines.append("Categories Detected:")
        report_lines.append("-" * 60)
        category_counts = df['main_category'].value_counts()
        for category, count in category_counts.items():
            report_lines.append(f"  {category:30s}: {count:5d} products")
        report_lines.append("")
        
        report_lines.append("Vehicle Make Distribution:")
        report_lines.append("-" * 60)
        make_counts = df['vehicle_make'].value_counts()
        for make, count in make_counts.head(15).items():
            make_str = str(make) if pd.notna(make) else "Unknown"
            report_lines.append(f"  {make_str:30s}: {count:5d} products")
        report_lines.append("")
        
        total_with_make = df['vehicle_make'].notna().sum()
        total_with_model = df['vehicle_model'].notna().sum()
        total_with_year = df['year_range'].notna().sum()
        
        report_lines.append("Vehicle Information Extraction:")
        report_lines.append("-" * 60)
        report_lines.append(f"  Products with Make detected:  {total_with_make:5d} ({100*total_with_make/len(df):.1f}%)")
        report_lines.append(f"  Products with Model detected: {total_with_model:5d} ({100*total_with_model/len(df):.1f}%)")
        report_lines.append(f"  Products with Year detected:  {total_with_year:5d} ({100*total_with_year/len(df):.1f}%)")
        report_lines.append(f"  Products without detection:   {len(df) - total_with_make:5d} ({100*(len(df)-total_with_make)/len(df):.1f}%)")
        report_lines.append("")
        
        report_lines.append("Price Information:")
        report_lines.append("-" * 60)
        products_with_price = df['price'].notna().sum()
        if products_with_price > 0:
            avg_price = df['price'].mean()
            min_price = df['price'].min()
            max_price = df['price'].max()
            report_lines.append(f"  Products with price:          {products_with_price:5d} ({100*products_with_price/len(df):.1f}%)")
            report_lines.append(f"  Average price:                KSH {avg_price:,.2f}")
            report_lines.append(f"  Price range:                  KSH {min_price:,.2f} - KSH {max_price:,.2f}")
        else:
            report_lines.append(f"  Products with price:          0")
        report_lines.append("")
    
    report_lines.append("=" * 60)
    report_lines.append("END OF REPORT")
    report_lines.append("=" * 60)
    
    report_text = "\n".join(report_lines)
    
    report_path = 'reports/run_summary.txt'
    with open(report_path, 'w', encoding='utf-8') as f:
        f.write(report_text)
    
    print(report_text)
    print(f"\n✓ Report saved to {report_path}")

def main():
    print("\n" + "=" * 60)
    print("AUTONOMOUS AUTO PARTS SCRAPER")
    print("=" * 60)
    print(f"Start Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 60)
    
    ensure_directories()
    
    all_products = []
    scraper_results = {}
    
    scrapers = [
        ('PolishVenture', scrape_polishventure, 'polishventure.csv'),
        ('OneStopAutoGarage', scrape_onestop, 'onestop.csv'),
        ('AutoXpress', scrape_autoxpress, 'autoxpress.csv'),
        ('AutoPartsHub', scrape_autopartshub, 'autopartshub.csv'),
        ('Spares.co.ke', scrape_spares, 'spares.csv'),
    ]
    
    for supplier_name, scraper_func, filename in scrapers:
        try:
            print(f"\n{'='*60}")
            print(f"Scraping {supplier_name}...")
            print(f"{'='*60}")
            
            products = scraper_func()
            scraper_results[supplier_name] = len(products)
            
            if products:
                save_to_csv(products, filename)
                all_products.extend(products)
            else:
                print(f"  ⚠ No products scraped from {supplier_name}")
                
        except Exception as e:
            print(f"✗ Error with {supplier_name}: {str(e)}")
            scraper_results[supplier_name] = 0
    
    df = merge_and_process_data(all_products)
    
    generate_report(df, scraper_results)
    
    print("\n" + "=" * 60)
    print("Uploading to Google Drive...")
    print("=" * 60)
    
    try:
        uploaded_files = upload_directory_to_drive('data/processed')
        uploaded_files.update(upload_directory_to_drive('reports'))
        
        if uploaded_files:
            print(f"\n✓ Successfully uploaded {len(uploaded_files)} files to Google Drive")
        else:
            print("\n⚠ No files uploaded to Google Drive")
            
    except Exception as e:
        print(f"\n✗ Error uploading to Google Drive: {str(e)}")
        print("  You can manually upload files from data/processed/ and reports/ folders")
    
    print("\n" + "=" * 60)
    print("SCRAPING COMPLETE")
    print("=" * 60)
    print(f"End Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"Total Products Collected: {len(all_products)}")
    if df is not None:
        print(f"Total Products After Dedup: {len(df)}")
    print("\nNext Steps:")
    print("  1. Review the data in data/processed/combined_master.csv")
    print("  2. Check the report in reports/run_summary.txt")
    print("  3. Run 'streamlit run view.py --server.port 5000' to explore the data")
    print("=" * 60)

if __name__ == "__main__":
    main()
