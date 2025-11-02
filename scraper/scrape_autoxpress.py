from playwright.sync_api import sync_playwright
from typing import List, Dict
import time
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from utils.normalize_text import normalize_product_name, normalize_price, clean_text
from utils.attribute_extraction import extract_vehicle_info

def scrape_autoxpress() -> List[Dict]:
    print("\n=== Scraping Auto-Xpress.co.ke ===")
    base_url = "https://auto-xpress.co.ke"
    products = []
    
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            context = browser.new_context(
                user_agent='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            )
            page = context.new_page()
            
            page.goto(base_url, wait_until='networkidle', timeout=30000)
            time.sleep(2)
            
            product_links = page.query_selector_all('a')
            product_urls = set()
            
            for link in product_links:
                href = link.get_attribute('href')
                if href and ('/product' in href or '/shop' in href or '/item' in href):
                    if href.startswith('/'):
                        href = base_url + href
                    product_urls.add(href)
            
            print(f"Found {len(product_urls)} potential product URLs")
            
            for idx, url in enumerate(list(product_urls)[:100], 1):
                try:
                    page.goto(url, wait_until='domcontentloaded', timeout=15000)
                    time.sleep(1)
                    
                    product_name = ""
                    try:
                        name_elem = page.query_selector('h1')
                        if name_elem:
                            product_name = name_elem.inner_text().strip()
                    except:
                        pass
                    
                    if not product_name or len(product_name) < 3:
                        continue
                    
                    price = ""
                    try:
                        price_selectors = ['.price', '.amount', '.product-price', '[class*="price"]']
                        for selector in price_selectors:
                            price_elem = page.query_selector(selector)
                            if price_elem:
                                price = price_elem.inner_text().strip()
                                break
                    except:
                        pass
                    
                    description = ""
                    try:
                        desc_selectors = ['.description', '.product-description', '[class*="desc"]']
                        for selector in desc_selectors:
                            desc_elem = page.query_selector(selector)
                            if desc_elem:
                                description = desc_elem.inner_text().strip()
                                break
                    except:
                        pass
                    
                    category = "Uncategorized"
                    try:
                        cat_elem = page.query_selector('.category, .breadcrumb')
                        if cat_elem:
                            category = cat_elem.inner_text().strip()
                    except:
                        pass
                    
                    images = []
                    try:
                        img_elements = page.query_selector_all('img')
                        for img in img_elements:
                            img_url = img.get_attribute('src') or img.get_attribute('data-src')
                            if img_url and 'product' in img.get_attribute('class', '').lower():
                                if img_url.startswith('/'):
                                    img_url = base_url + img_url
                                images.append(img_url)
                    except:
                        pass
                    
                    vehicle_info = extract_vehicle_info(f"{product_name} {description}")
                    
                    product = {
                        'product_name': normalize_product_name(product_name),
                        'price': normalize_price(price),
                        'price_raw': price,
                        'category': category,
                        'brand': vehicle_info.get('make', 'Unknown'),
                        'description': clean_text(description),
                        'product_url': url,
                        'image_urls': ', '.join(images[:5]) if images else '',
                        'vehicle_make': vehicle_info.get('make'),
                        'vehicle_model': vehicle_info.get('model'),
                        'year_range': vehicle_info.get('year'),
                        'engine_size': vehicle_info.get('engine_size'),
                        'oem_part_number': vehicle_info.get('oem_part_number'),
                        'supplier': 'AutoXpress',
                        'scrape_date': time.strftime('%Y-%m-%d %H:%M:%S')
                    }
                    
                    products.append(product)
                    
                    if idx % 10 == 0:
                        print(f"  Scraped {idx}/{min(100, len(product_urls))} products...")
                        
                except Exception as e:
                    print(f"  Error scraping {url}: {str(e)}")
                    continue
            
            browser.close()
        
        print(f"✓ Total products scraped from AutoXpress: {len(products)}")
        return products
        
    except Exception as e:
        print(f"✗ Error scraping AutoXpress: {str(e)}")
        return products

if __name__ == "__main__":
    products = scrape_autoxpress()
    print(f"\nTotal products: {len(products)}")
    if products:
        print(f"Sample product: {products[0]}")
