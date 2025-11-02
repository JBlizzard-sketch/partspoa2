import requests
from bs4 import BeautifulSoup
from typing import List, Dict
import time
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from utils.normalize_text import normalize_product_name, normalize_price, clean_text
from utils.attribute_extraction import extract_vehicle_info

def scrape_spares() -> List[Dict]:
    print("\n=== Scraping Spares.co.ke ===")
    base_url = "https://spares.co.ke"
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
            if '/product' in href or '/shop' in href or '/spare' in href or '/part' in href:
                if href.startswith('/'):
                    href = base_url + href
                elif not href.startswith('http'):
                    href = base_url + '/' + href
                if base_url in href:
                    product_urls.add(href)
        
        print(f"Found {len(product_urls)} potential product URLs")
        
        for idx, url in enumerate(list(product_urls)[:100], 1):
            try:
                time.sleep(0.5)
                
                response = requests.get(url, headers=headers, timeout=10)
                soup = BeautifulSoup(response.content, 'html.parser')
                
                product_name = ""
                title_selectors = [
                    {'name': 'h1', 'class': 'product_title'},
                    {'name': 'h1', 'class': 'entry-title'},
                    {'name': 'h1'},
                    {'name': 'h2', 'class': 'product-title'}
                ]
                
                for selector in title_selectors:
                    if 'class' in selector:
                        elem = soup.find(selector['name'], class_=selector['class'])
                    else:
                        elem = soup.find(selector['name'])
                    if elem:
                        product_name = elem.get_text(strip=True)
                        break
                
                if not product_name or len(product_name) < 3:
                    continue
                
                price = ""
                price_classes = ['price', 'amount', 'product-price', 'woocommerce-Price-amount']
                for price_class in price_classes:
                    price_elem = soup.find(class_=price_class)
                    if price_elem:
                        price = price_elem.get_text(strip=True)
                        break
                
                description = ""
                desc_classes = [
                    'description',
                    'product-description',
                    'woocommerce-product-details__short-description',
                    'entry-content'
                ]
                for desc_class in desc_classes:
                    desc_elem = soup.find(class_=desc_class)
                    if desc_elem:
                        description = desc_elem.get_text(strip=True)
                        break
                
                category = "Uncategorized"
                cat_elem = soup.find(class_=['category', 'product-category', 'posted_in'])
                if cat_elem:
                    category = cat_elem.get_text(strip=True)
                
                brand = "Unknown"
                brand_elem = soup.find(class_=['brand', 'manufacturer'])
                if brand_elem:
                    brand = brand_elem.get_text(strip=True)
                
                images = []
                img_tags = soup.find_all('img')
                for img in img_tags:
                    img_class = img.get('class', [])
                    img_class_str = ' '.join(img_class) if isinstance(img_class, list) else str(img_class)
                    
                    if any(keyword in img_class_str.lower() for keyword in ['product', 'gallery', 'wp-post-image']):
                        img_url = img.get('src') or img.get('data-src') or img.get('data-lazy-src')
                        if img_url and 'logo' not in img_url.lower() and 'icon' not in img_url.lower():
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
                    'image_urls': ', '.join(list(set(images))[:5]) if images else '',
                    'vehicle_make': vehicle_info.get('make'),
                    'vehicle_model': vehicle_info.get('model'),
                    'year_range': vehicle_info.get('year'),
                    'engine_size': vehicle_info.get('engine_size'),
                    'oem_part_number': vehicle_info.get('oem_part_number'),
                    'supplier': 'Spares.co.ke',
                    'scrape_date': time.strftime('%Y-%m-%d %H:%M:%S')
                }
                
                products.append(product)
                
                if idx % 10 == 0:
                    print(f"  Scraped {idx}/{min(100, len(product_urls))} products...")
                    
            except Exception as e:
                print(f"  Error scraping {url}: {str(e)}")
                continue
        
        print(f"✓ Total products scraped from Spares.co.ke: {len(products)}")
        return products
        
    except Exception as e:
        print(f"✗ Error scraping Spares.co.ke: {str(e)}")
        return products

if __name__ == "__main__":
    products = scrape_spares()
    print(f"\nTotal products: {len(products)}")
    if products:
        print(f"Sample product: {products[0]}")
