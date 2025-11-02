from typing import Dict, List, Optional

CATEGORY_HIERARCHY = {
    'Engine': [
        'Pistons', 'Rings', 'Valves', 'Gaskets', 'Cylinder Heads', 'Timing Belt', 
        'Timing Chain', 'Engine Mounts', 'Camshaft', 'Crankshaft', 'Oil Pump',
        'Water Pump', 'Fuel Pump', 'Fuel Injectors', 'Spark Plugs', 'Ignition Coil'
    ],
    'Brakes': [
        'Brake Pads', 'Brake Discs', 'Brake Drums', 'Brake Shoes', 'Brake Fluid',
        'Brake Lines', 'Brake Calipers', 'Master Cylinder', 'Brake Booster', 'ABS'
    ],
    'Suspension': [
        'Shock Absorbers', 'Struts', 'Springs', 'Control Arms', 'Ball Joints',
        'Bushings', 'Stabilizer Links', 'Tie Rod Ends', 'Wheel Bearings'
    ],
    'Transmission': [
        'Clutch Kit', 'Clutch Disc', 'Pressure Plate', 'Flywheel', 'Gearbox',
        'Transmission Fluid', 'CV Joints', 'Drive Shaft', 'Axle'
    ],
    'Electrical': [
        'Battery', 'Alternator', 'Starter Motor', 'Wiring Harness', 'Fuses',
        'Relays', 'Sensors', 'ECU', 'Lights', 'Bulbs', 'Switches'
    ],
    'Filters': [
        'Oil Filter', 'Air Filter', 'Fuel Filter', 'Cabin Filter', 'Transmission Filter'
    ],
    'Fluids': [
        'Engine Oil', 'Transmission Oil', 'Brake Fluid', 'Coolant', 'Power Steering Fluid',
        'Windshield Washer Fluid', 'Differential Oil', 'Grease'
    ],
    'Body': [
        'Bumpers', 'Fenders', 'Hoods', 'Doors', 'Mirrors', 'Grilles', 'Headlights',
        'Taillights', 'Windshield', 'Windows', 'Body Panels'
    ],
    'Interior': [
        'Seats', 'Seat Covers', 'Floor Mats', 'Dashboard', 'Steering Wheel',
        'Door Panels', 'Carpets', 'Console', 'Trim'
    ],
    'Exhaust': [
        'Muffler', 'Catalytic Converter', 'Exhaust Manifold', 'Exhaust Pipe',
        'Resonator', 'Exhaust Gaskets'
    ],
    'Cooling': [
        'Radiator', 'Radiator Cap', 'Thermostat', 'Cooling Fan', 'Hoses',
        'Water Pump', 'Coolant Reservoir'
    ],
    'Fuel System': [
        'Fuel Tank', 'Fuel Pump', 'Fuel Injectors', 'Fuel Filter', 'Fuel Lines'
    ],
    'Steering': [
        'Steering Rack', 'Power Steering Pump', 'Steering Column', 'Tie Rods',
        'Steering Wheel', 'Universal Joints'
    ],
    'Wheels & Tires': [
        'Tires', 'Wheels', 'Wheel Nuts', 'Hubcaps', 'Valve Stems', 'Tire Pressure Sensors'
    ],
}

def map_to_category(product_name: str, description: str = "") -> str:
    combined_text = f"{product_name} {description}".lower()
    
    for main_category, subcategories in CATEGORY_HIERARCHY.items():
        if main_category.lower() in combined_text:
            return main_category
        
        for subcategory in subcategories:
            if subcategory.lower() in combined_text:
                return main_category
    
    return "Uncategorized"

def get_subcategory(product_name: str, description: str = "", main_category: str = "") -> Optional[str]:
    combined_text = f"{product_name} {description}".lower()
    
    if main_category and main_category in CATEGORY_HIERARCHY:
        subcategories = CATEGORY_HIERARCHY[main_category]
        for subcategory in subcategories:
            if subcategory.lower() in combined_text:
                return subcategory
    
    for main_cat, subcategories in CATEGORY_HIERARCHY.items():
        for subcategory in subcategories:
            if subcategory.lower() in combined_text:
                return subcategory
    
    return None

def get_all_categories() -> List[str]:
    return list(CATEGORY_HIERARCHY.keys())

def get_subcategories(main_category: str) -> List[str]:
    return CATEGORY_HIERARCHY.get(main_category, [])
