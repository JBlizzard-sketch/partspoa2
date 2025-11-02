import re
from typing import Optional

def normalize_product_name(name: Optional[str]) -> str:
    if not name:
        return ""
    
    name = str(name).strip()
    name = re.sub(r'\s+', ' ', name)
    name = re.sub(r'[^\w\s\-\/().,&+]', '', name)
    
    return name

def normalize_price(price: Optional[str]) -> Optional[float]:
    if not price:
        return None
    
    price_str = str(price).strip()
    price_str = re.sub(r'[^\d.,]', '', price_str)
    price_str = price_str.replace(',', '')
    
    try:
        return float(price_str)
    except (ValueError, AttributeError):
        return None

def normalize_brand(brand: Optional[str]) -> str:
    if not brand:
        return "Unknown"
    
    brand = str(brand).strip()
    brand = brand.upper()
    
    brand_mapping = {
        'OEM': 'OEM',
        'GENUINE': 'GENUINE',
        'AFTERMARKET': 'AFTERMARKET',
    }
    
    for key, value in brand_mapping.items():
        if key in brand:
            return value
    
    return brand

def normalize_category(category: Optional[str]) -> str:
    if not category:
        return "Uncategorized"
    
    category = str(category).strip().title()
    
    category_mapping = {
        'Engine Parts': 'Engine',
        'Brake Parts': 'Brakes',
        'Suspension Parts': 'Suspension',
        'Electrical Parts': 'Electrical',
        'Body Parts': 'Body',
        'Interior Parts': 'Interior',
        'Exterior Parts': 'Exterior',
        'Transmission Parts': 'Transmission',
        'Filters': 'Filters',
        'Oil': 'Fluids',
        'Lubricants': 'Fluids',
    }
    
    for key, value in category_mapping.items():
        if key.lower() in category.lower():
            return value
    
    return category

def clean_text(text: Optional[str]) -> str:
    if not text:
        return ""
    
    text = str(text).strip()
    text = re.sub(r'\s+', ' ', text)
    text = re.sub(r'[\r\n\t]+', ' ', text)
    
    return text
