# 🚗 Autonomous Auto Parts Scraper & Browser

A comprehensive web scraping and data structuring system that automatically collects auto parts data from 5 Kenyan online automotive parts websites, processes it with NLP, and provides an interactive browser interface.

## 🌐 Scraped Websites

1. **PolishVenture** - https://polishventure.com/
2. **OneStopAutoGarage** - https://www.onestopautogarage.co.ke/
3. **Auto-Xpress** - https://auto-xpress.co.ke/
4. **AutoPartsHub** - https://autopartshub.co.ke/
5. **Spares.co.ke** - https://spares.co.ke/

## ✨ Features

### Scraping Capabilities
- **Comprehensive Data Extraction**: Product names, prices, categories, brands, OEM numbers, fitment compatibility, vehicle details, descriptions, URLs, and image URLs
- **Smart Scraping**: Uses Playwright for dynamic sites and BeautifulSoup for static sites
- **Pagination Handling**: Automatically navigates through product listings
- **Deduplication**: Removes duplicate products based on URL matching
- **Error Handling**: Robust error handling with detailed logging

### Data Processing
- **Text Normalization**: Cleans and standardizes product names and descriptions
- **NLP-Powered Extraction**: Auto-detects vehicle make, model, year, and engine size from text
- **Hierarchical Organization**: Groups products by Make → Model → Year → Category → Brand → Store
- **Category Mapping**: Automatically categorizes products into standardized categories
- **Dynamic Attributes**: Preserves all unique attributes from each website

### Google Drive Integration
- **Automatic Upload**: Uploads processed data to Google Drive after each scraping run
- **Organized Storage**: Files stored in `/AutoPartsData/YYYY-MM-DD/` folders
- **Authenticated Access**: Uses Replit's Google Drive integration for seamless authentication

### Interactive UI
- **Streamlit Dashboard**: Beautiful, responsive web interface
- **Advanced Filtering**: Filter by make, model, year, price range, brand, and supplier
- **Search Functionality**: Full-text search across product names and descriptions
- **Image Display**: Shows product images inline
- **CSV Export**: Export filtered results to CSV
- **Pagination**: Handles large datasets efficiently

## 📁 Project Structure

```
.
├── scraper/
│   ├── __init__.py
│   ├── scrape_polishventure.py
│   ├── scrape_onestop.py
│   ├── scrape_autoxpress.py
│   ├── scrape_autopartshub.py
│   └── scrape_spares.py
├── utils/
│   ├── __init__.py
│   ├── normalize_text.py
│   ├── attribute_extraction.py
│   ├── category_mapping.py
│   └── drive_upload.py
├── data/
│   ├── raw/                    # Individual CSV files per website
│   └── processed/              # Combined and processed data
│       ├── combined_master.csv
│       └── combined_master.json
├── reports/
│   └── run_summary.txt         # Scraping statistics and summary
├── scrape_all.py              # Master orchestration script
├── app.py                     # Main Streamlit application
├── view.py                    # Standalone product browser
├── requirements.txt
└── README.md
```

## 🚀 Getting Started

### Prerequisites

All dependencies are already installed in this Replit environment:
- Python 3.11
- Playwright (with Chromium browser)
- BeautifulSoup4
- Pandas
- Streamlit
- spaCy
- Google Drive API integration

### Usage

#### 1. Run the Scraper

To scrape data from all 5 websites:

```bash
python scrape_all.py
```

This will:
- Scrape all 5 websites sequentially
- Save individual CSV files in `data/raw/`
- Merge and process data into `data/processed/combined_master.csv`
- Generate a summary report in `reports/run_summary.txt`
- Automatically upload files to Google Drive

**Note**: The scraping process may take 10-30 minutes depending on website response times.

#### 2. Browse the Data

Launch the interactive Streamlit interface:

```bash
streamlit run app.py --server.port 5000
```

Or use the standalone product browser:

```bash
streamlit run view.py --server.port 5000
```

## 📊 Data Schema

The combined dataset includes the following fields:

| Field | Description |
|-------|-------------|
| `supplier` | Website/supplier name |
| `product_name` | Normalized product name |
| `price` | Numeric price (cleaned) |
| `price_raw` | Original price string from website |
| `vehicle_make` | Auto-detected vehicle manufacturer (e.g., Toyota) |
| `vehicle_model` | Auto-detected vehicle model (e.g., Corolla) |
| `year_range` | Compatible years (e.g., 2010-2015) |
| `main_category` | Primary category (e.g., Engine, Brakes) |
| `subcategory` | Specific part category |
| `brand` | Part brand/manufacturer |
| `engine_size` | Engine size if applicable |
| `oem_part_number` | OEM part number if available |
| `category` | Original category from website |
| `description` | Product description |
| `product_url` | Direct link to product |
| `image_urls` | Comma-separated image URLs |
| `scrape_date` | Date and time of scraping |

## 🔍 NLP Vehicle Detection

The system uses pattern matching and NLP to automatically extract vehicle information from product names and descriptions:

- **Makes**: Toyota, Nissan, Honda, Mercedes, BMW, VW, and 30+ more
- **Models**: 100+ common models including Corolla, Camry, X-Trail, etc.
- **Years**: Detects year ranges (2010-2015) and single years
- **Engine Sizes**: Extracts engine displacement (1.8L, 2000cc, etc.)
- **OEM Numbers**: Identifies OEM/part numbers from text

## 📈 Reports

After each scraping run, a detailed report is generated in `reports/run_summary.txt` containing:

- Products scraped per website
- Total products after deduplication
- Category distribution
- Vehicle make distribution
- Extraction success rates (make/model/year detection)
- Price statistics

## 🔄 Automatic Updates

### Google Drive Sync

Data is automatically uploaded to Google Drive after each scraping run:
- Location: `/AutoPartsData/YYYY-MM-DD/`
- Files: Combined CSV, JSON, and reports

### Re-running the Scraper

Simply run `python scrape_all.py` again to refresh the data. The system will:
- Scrape fresh data from all websites
- Replace old data files
- Update the dashboard
- Upload new files to Google Drive

## 🛠️ Customization

### Adding More Websites

1. Create a new scraper file in `scraper/scrape_newsite.py`
2. Follow the pattern of existing scrapers
3. Add to the scrapers list in `scrape_all.py`

### Modifying Categories

Edit `utils/category_mapping.py` to add or modify product categories.

### Adjusting Vehicle Detection

Edit `utils/attribute_extraction.py` to add more makes, models, or improve pattern matching.

## 🤝 Support

For issues or questions:
1. Check the `reports/run_summary.txt` for scraping errors
2. Review individual scraper outputs in `data/raw/`
3. Ensure Google Drive connection is active

## 📝 License

This project is for educational and research purposes.

## 🎯 Future Enhancements

- Scheduled automatic scraping (daily/weekly)
- Price tracking and alerts
- Advanced NLP for technical specifications
- API endpoints for programmatic access
- Incremental scraping (update only changed products)
- Email notifications on scraping completion
- Product comparison features

---

**Built with ❤️ for the Kenyan automotive community**
