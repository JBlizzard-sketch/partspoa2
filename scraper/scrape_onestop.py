import requests
from bs4 import BeautifulSoup
from typing import List, Dict
import time
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from utils.normalize_text import normalize_product_name, normalize_price, clean_text
from utils.attribute_extraction import extract_vehicle_info

def scrape_onestop() -> List[Dict]:
    print("\n=== Scraping OneStopAutoGarage.co.ke ===")
    base_url = "https://www.onestopautogarage.co.ke"
    products = []
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    
    try:
        response = requests.get(base_url, headers=headers, timeout=15)
        soup = BeautifulSoup(response.content, 'html.parser')
        
        product_links = soup.find_all('a', href=True)
        product_urls = set()
        
        for link in product_links:
            href = link['href']
            if '/product' in href or '/shop' in href or '/parts' in href:
                if href.startswith('/'):
                    href = base_url + href
                elif not href.startswith('http'):
                    href = base_url + '/' + href
                product_urls.add(href)
        
        print(f"Found {len(product_urls)} potential product URLs")
        
        for idx, url in enumerate(list(product_urls)[:100], 1):
            try:
                time.sleep(0.5)
                
                response = requests.get(url, headers=headers, timeout=10)
                soup = BeautifulSoup(response.content, 'html.parser')
                
                product_name = ""
                title_tags = soup.find_all(['h1', 'h2'], class_=['product_title', 'entry-title', 'title'])
                if title_tags:
                    product_name = title_tags[0].get_text(strip=True)
                elif soup.find('h1'):
                    product_name = soup.find('h1').get_text(strip=True)
                
                if not product_name or len(product_name) < 3:
                    continue
                
                price = ""
                price_tags = soup.find_all(class_=['price', 'amount', 'product-price'])
                if price_tags:
                    price = price_tags[0].get_text(strip=True)
                
                description = ""
                desc_selectors = ['description', 'product-description', 'product_desc', 'short-description']
                for selector in desc_selectors:
                    desc_tags = soup.find_all(class_=selector)
                    if desc_tags:
                        description = desc_tags[0].get_text(strip=True)
                        break
                
                category = "Uncategorized"
                cat_tags = soup.find_all(class_=['category', 'product-category', 'breadcrumb'])
                if cat_tags:
                    category = cat_tags[0].get_text(strip=True)
                
                brand = "Unknown"
                brand_tags = soup.find_all(class_=['brand', 'manufacturer'])
                if brand_tags:
                    brand = brand_tags[0].get_text(strip=True)
                
                images = []
                img_tags = soup.find_all('img')
                for img in img_tags:
                    if 'product' in str(img.get('class', [])).lower() or 'gallery' in str(img.get('class', [])).lower():
                        img_url = img.get('src') or img.get('data-src')
                        if img_url and 'logo' not in img_url.lower():
                            if img_url.startswith('/'):
                                img_url = base_url + img_url
                            images.append(img_url)
                
                vehicle_info = extract_vehicle_info(f"{product_name} {description}")
                
                product = {
                    'product_name': normalize_product_name(product_name),
                    'price': normalize_price(price),
                    'price_raw': price,
                    'category': category,
                    'brand': vehicle_info.get('make') or brand,
                    'description': clean_text(description),
                    'product_url': url,
                    'image_urls': ', '.join(images[:5]) if images else '',
                    'vehicle_make': vehicle_info.get('make'),
                    'vehicle_model': vehicle_info.get('model'),
                    'year_range': vehicle_info.get('year'),
                    'engine_size': vehicle_info.get('engine_size'),
                    'oem_part_number': vehicle_info.get('oem_part_number'),
                    'supplier': 'OneStopAutoGarage',
                    'scrape_date': time.strftime('%Y-%m-%d %H:%M:%S')
                }
                
                products.append(product)
                
                if idx % 10 == 0:
                    print(f"  Scraped {idx}/{min(100, len(product_urls))} products...")
                    
            except Exception as e:
                print(f"  Error scraping {url}: {str(e)}")
                continue
        
        print(f"✓ Total products scraped from OneStopAutoGarage: {len(products)}")
        return products
        
    except Exception as e:
        print(f"✗ Error scraping OneStopAutoGarage: {str(e)}")
        return products

if __name__ == "__main__":
    products = scrape_onestop()
    print(f"\nTotal products: {len(products)}")
    if products:
        print(f"Sample product: {products[0]}")
