# Auto Parts Scraper & Browser

## Overview

This is an autonomous web scraping and data processing system that collects auto parts product data from 5 Kenyan automotive parts websites. The system extracts comprehensive product information, processes it using NLP to identify vehicle compatibility, structures the data hierarchically, and provides an interactive Streamlit-based browser for searching and filtering products. The scraped data is automatically uploaded to Google Drive for backup and sharing.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Scraping Architecture

**Multi-Strategy Web Scraping**
- Uses two scraping approaches based on website characteristics:
  - **Playwright** for dynamic JavaScript-heavy sites (AutoPartsHub, Auto-Xpress)
  - **Requests + BeautifulSoup** for static sites (PolishVenture, OneStopAutoGarage, Spares.co.ke)
- Each website has a dedicated scraper module in `/scraper/` directory
- Scrapers extract: product name, price, category, brand, OEM numbers, descriptions, product URLs, and image URLs (stored as URLs, not downloaded)
- Implements URL-based deduplication to avoid duplicate products
- Includes error handling with retries and timeouts

**Data Extraction Pattern**
- Each scraper follows a consistent pattern: discover product URLs → visit each product page → extract structured data
- Limited to 100 products per site for testing (configurable)
- Uses delays between requests to avoid rate limiting
- Stores raw scraped data as CSV files in `/data/raw/`

### Data Processing Pipeline

**Text Normalization & NLP**
- Product names are cleaned: whitespace normalized, special characters removed
- Prices are extracted and converted to float values
- Uses regex-based pattern matching to extract vehicle information from product text
- Maintains a dictionary of common vehicle makes (Toyota, Nissan, Honda, etc.) and their popular models
- Extracts year ranges using patterns like "2010-2015" or "2010"

**Category Classification**
- Implements a hierarchical category system with main categories (Engine, Brakes, Suspension, etc.) and subcategories
- Maps raw product categories from websites to standardized categories
- Uses keyword matching in product names and descriptions for auto-categorization
- Falls back to "Uncategorized" for unrecognized products

**Data Structuring**
- Merges data from all sources into a single master dataset
- Removes duplicates based on product URLs
- Organizes products hierarchically: Make → Model → Year → Category → Brand → Store
- Preserves all unique attributes as dynamic columns to avoid data loss
- Outputs processed data as both CSV and JSON in `/data/processed/`

### Storage & Backup

**Local Storage**
- `/data/raw/` - Individual CSV files per website
- `/data/processed/` - Combined master dataset (CSV and JSON)
- `/reports/` - Run summaries with statistics

**Google Drive Integration**
- Uses Replit's Google Drive connector for authentication
- Automatically uploads all data files after each scraping run
- Organizes files in Drive under `/AutoPartsData/YYYY-MM-DD/` folders
- Creates folders dynamically based on run date
- Implements OAuth2 token-based authentication via Replit's connector API

### User Interface

**Streamlit Dashboard**
- Main entry point: `app.py` or `view.py`
- Provides interactive filtering by: vehicle make, model, year, price range, brand, supplier
- Full-text search across product names and descriptions
- Displays product images inline using stored URLs
- Paginated results for handling large datasets
- CSV export functionality for filtered results
- Product card layout with image thumbnails and key details

**Design Pattern**
- Uses Streamlit's caching (`@st.cache_data`) to avoid reloading data on every interaction
- Responsive multi-column layout for product cards
- Fallback UI elements for missing images or prices

### Orchestration

**Main Execution Flow** (`scrape_all.py`)
- Calls all 5 scrapers sequentially
- Saves raw data per website
- Merges and processes all data
- Applies category mapping and NLP extraction
- Generates run summary report
- Uploads results to Google Drive
- Provides progress feedback using tqdm

## External Dependencies

### Third-Party Libraries
- **Playwright** - Browser automation for dynamic website scraping
- **BeautifulSoup4** - HTML parsing for static websites
- **Requests** - HTTP client for web requests
- **Pandas** - Data manipulation and CSV/JSON processing
- **Streamlit** - Interactive web UI framework
- **Google API Client** - Google Drive API integration
- **tqdm** - Progress bars for scraping operations

### Cloud Services
- **Google Drive API** - For automated backup and storage of scraped data
  - Authentication via Replit's connector system
  - Uses OAuth2 credentials with access tokens
  - Requires `REPLIT_CONNECTORS_HOSTNAME` and identity tokens from Replit environment

### External Websites (Data Sources)
1. polishventure.com
2. onestopautogarage.co.ke
3. auto-xpress.co.ke
4. autopartshub.co.ke
5. spares.co.ke

### Environment Configuration
- Relies on Replit environment variables for authentication:
  - `REPLIT_CONNECTORS_HOSTNAME` - Connector service endpoint
  - `REPL_IDENTITY` or `WEB_REPL_RENEWAL` - Identity tokens for API authentication
- No local database required - uses CSV/JSON file storage