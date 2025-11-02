import re
from typing import Dict, List, Optional, Tuple

VEHICLE_MAKES = [
    'Toyota', 'Nissan', 'Honda', 'Mazda', 'Mitsubishi', 'Subaru', 'Suzuki', 'Isuzu',
    'Mercedes', 'BMW', 'Audi', 'Volkswagen', 'VW', 'Volvo', 'Peugeot', 'Renault', 'Citroen',
    'Ford', 'Chevrolet', 'Jeep', 'Dodge', 'Chrysler', 'GMC', 'Cadillac',
    'Hyundai', 'Kia', 'Lexus', 'Infiniti', 'Acura',
    'Land Rover', 'Range Rover', 'Jaguar', 'Porsche', 'Ferrari', 'Lamborghini',
    'Alfa Romeo', 'Fiat', 'Opel', 'Skoda', 'Seat'
]

COMMON_MODELS = {
    'Toyota': ['Corolla', 'Camry', 'RAV4', 'Hilux', 'Prado', 'Land Cruiser', 'Yaris', 'Vitz', 'Axio', 'Fielder', 'Harrier', 'Wish', 'Voxy', 'Noah', 'Alphard', 'Hiace'],
    'Nissan': ['X-Trail', 'Patrol', 'Navara', 'Note', 'Tiida', 'March', 'Juke', 'Qashqai', 'Sylphy', 'Wingroad', 'Serena', 'Caravan', 'Sunny', 'AD Van'],
    'Honda': ['Civic', 'Accord', 'CR-V', 'Fit', 'Jazz', 'Vezel', 'Shuttle', 'Stream', 'Stepwgn', 'Odyssey', 'Freed'],
    'Mazda': ['Axela', 'Atenza', 'Demio', 'CX-5', 'CX-3', 'Premacy', 'Biante', 'Verisa'],
    'Mitsubishi': ['Lancer', 'Pajero', 'L200', 'Outlander', 'RVR', 'Canter', 'Fuso'],
    'Subaru': ['Impreza', 'Legacy', 'Forester', 'Outback', 'XV', 'Levorg'],
    'Mercedes': ['C-Class', 'E-Class', 'S-Class', 'GLC', 'GLE', 'GLA', 'ML', 'GLK', 'Sprinter', 'Vito'],
    'BMW': ['3 Series', '5 Series', '7 Series', 'X1', 'X3', 'X5', 'X6'],
    'VW': ['Golf', 'Passat', 'Polo', 'Tiguan', 'Touareg', 'Jetta', 'Crafter'],
    'Volkswagen': ['Golf', 'Passat', 'Polo', 'Tiguan', 'Touareg', 'Jetta', 'Crafter'],
}

def extract_vehicle_make(text: str) -> Optional[str]:
    if not text:
        return None
    
    text_upper = text.upper()
    
    for make in VEHICLE_MAKES:
        pattern = r'\b' + re.escape(make.upper()) + r'\b'
        if re.search(pattern, text_upper):
            return make
    
    return None

def extract_vehicle_model(text: str, make: Optional[str] = None) -> Optional[str]:
    if not text:
        return None
    
    if make and make in COMMON_MODELS:
        for model in COMMON_MODELS[make]:
            pattern = r'\b' + re.escape(model.upper()) + r'\b'
            if re.search(pattern, text.upper()):
                return model
    
    for make_key, models in COMMON_MODELS.items():
        for model in models:
            pattern = r'\b' + re.escape(model.upper()) + r'\b'
            if re.search(pattern, text.upper()):
                return model
    
    return None

def extract_year_range(text: str) -> Optional[str]:
    if not text:
        return None
    
    year_pattern = r'\b(19\d{2}|20[0-2]\d)\s*-\s*(19\d{2}|20[0-2]\d)\b'
    match = re.search(year_pattern, text)
    if match:
        return match.group(0)
    
    single_year_pattern = r'\b(19\d{2}|20[0-2]\d)\b'
    match = re.search(single_year_pattern, text)
    if match:
        return match.group(0)
    
    return None

def extract_oem_part_number(text: str) -> Optional[str]:
    if not text:
        return None
    
    patterns = [
        r'OEM[:\s]*([A-Z0-9\-]+)',
        r'Part[#\s]+([A-Z0-9\-]+)',
        r'P/N[:\s]*([A-Z0-9\-]+)',
        r'\b([A-Z]{2,}\d{4,}[-]?\d*)\b',
    ]
    
    for pattern in patterns:
        match = re.search(pattern, text.upper())
        if match:
            return match.group(1) if match.lastindex else match.group(0)
    
    return None

def extract_engine_size(text: str) -> Optional[str]:
    if not text:
        return None
    
    patterns = [
        r'(\d\.\d)[\s]*L',
        r'(\d{3,4})[\s]*[Cc][Cc]',
        r'(\d\.\d)[\s]*[Ll]iter',
    ]
    
    for pattern in patterns:
        match = re.search(pattern, text)
        if match:
            return match.group(1)
    
    return None

def extract_vehicle_info(text: str) -> Dict[str, Optional[str]]:
    if not text:
        return {
            'make': None,
            'model': None,
            'year': None,
            'engine_size': None,
            'oem_part_number': None
        }
    
    make = extract_vehicle_make(text)
    model = extract_vehicle_model(text, make)
    year = extract_year_range(text)
    engine_size = extract_engine_size(text)
    oem_part = extract_oem_part_number(text)
    
    return {
        'make': make,
        'model': model,
        'year': year,
        'engine_size': engine_size,
        'oem_part_number': oem_part
    }

def extract_all_urls(text: str) -> List[str]:
    if not text:
        return []
    
    url_pattern = r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+'
    urls = re.findall(url_pattern, text)
    
    return list(set(urls))
