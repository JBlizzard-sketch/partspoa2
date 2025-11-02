import streamlit as st
import pandas as pd
import os
from datetime import datetime

st.set_page_config(
    page_title="Auto Parts Scraper & Browser",
    page_icon="🚗",
    layout="wide"
)

@st.cache_data
def load_data():
    csv_path = 'data/processed/combined_master.csv'
    
    if not os.path.exists(csv_path):
        return None
    
    df = pd.read_csv(csv_path)
    return df

def load_report():
    report_path = 'reports/run_summary.txt'
    
    if not os.path.exists(report_path):
        return None
    
    with open(report_path, 'r', encoding='utf-8') as f:
        return f.read()

def display_product_card(product):
    with st.container():
        st.markdown("---")
        
        col1, col2 = st.columns([1, 3])
        
        with col1:
            images = str(product.get('image_urls', '')).split(',')
            if images and images[0].strip():
                try:
                    st.image(images[0].strip(), use_container_width=True)
                except:
                    st.info("📷 Image not available")
            else:
                st.info("📷 No image")
        
        with col2:
            st.subheader(product['product_name'])
            
            col_a, col_b, col_c = st.columns(3)
            
            with col_a:
                if pd.notna(product.get('price')) and product.get('price') != '' and product.get('price') != 0:
                    st.metric("Price", f"KSH {float(product['price']):,.2f}")
                elif product.get('price_raw'):
                    st.metric("Price", product['price_raw'])
                else:
                    st.metric("Price", "Contact Supplier")
            
            with col_b:
                supplier = product.get('supplier', 'Unknown')
                st.metric("Supplier", supplier)
            
            with col_c:
                category = product.get('main_category', product.get('category', 'Uncategorized'))
                st.metric("Category", category)
            
            info_cols = st.columns(4)
            
            with info_cols[0]:
                if pd.notna(product.get('vehicle_make')):
                    st.write(f"**Make:** {product['vehicle_make']}")
            
            with info_cols[1]:
                if pd.notna(product.get('vehicle_model')):
                    st.write(f"**Model:** {product['vehicle_model']}")
            
            with info_cols[2]:
                if pd.notna(product.get('year_range')):
                    st.write(f"**Year:** {product['year_range']}")
            
            with info_cols[3]:
                if pd.notna(product.get('brand')):
                    st.write(f"**Brand:** {product['brand']}")
            
            if pd.notna(product.get('description')) and str(product.get('description')).strip():
                with st.expander("📄 Description"):
                    st.write(product['description'])
            
            if pd.notna(product.get('oem_part_number')):
                st.write(f"**OEM Part #:** {product['oem_part_number']}")
            
            if pd.notna(product.get('product_url')):
                st.link_button("🔗 View on Website", product['product_url'])

def show_dashboard():
    st.title("🚗 Auto Parts Scraper & Browser")
    st.markdown("Welcome to the Kenyan Auto Parts Data Explorer")
    
    df = load_data()
    
    if df is None:
        st.error("❌ No data found. Please run the scraper first.")
        
        st.markdown("""
        ### How to Get Started:
        
        1. **Run the scraper** to collect data from all 5 websites:
           ```bash
           python scrape_all.py
           ```
        
        2. **Wait for the scraping to complete** (this may take several minutes)
        
        3. **Refresh this page** to see the data
        
        The scraper will collect auto parts data from:
        - PolishVenture.com
        - OneStopAutoGarage.co.ke
        - Auto-Xpress.co.ke
        - AutoPartsHub.co.ke
        - Spares.co.ke
        """)
        
        return
    
    tab1, tab2, tab3 = st.tabs(["📊 Dashboard", "🔍 Browse Products", "📄 Reports"])
    
    with tab1:
        st.header("Data Overview")
        
        col1, col2, col3, col4 = st.columns(4)
        
        with col1:
            st.metric("Total Products", f"{len(df):,}")
        
        with col2:
            st.metric("Suppliers", df['supplier'].nunique())
        
        with col3:
            st.metric("Categories", df['main_category'].nunique())
        
        with col4:
            products_with_make = df['vehicle_make'].notna().sum()
            st.metric("Products with Make", f"{products_with_make:,}")
        
        col_a, col_b = st.columns(2)
        
        with col_a:
            st.subheader("Products by Supplier")
            supplier_counts = df['supplier'].value_counts()
            st.bar_chart(supplier_counts)
        
        with col_b:
            st.subheader("Products by Category")
            category_counts = df['main_category'].value_counts().head(10)
            st.bar_chart(category_counts)
        
        st.subheader("Top Vehicle Makes")
        make_counts = df['vehicle_make'].value_counts().head(15)
        st.bar_chart(make_counts)
        
        st.subheader("Recent Scraping Activity")
        if 'scrape_date' in df.columns:
            st.write(f"Last scrape: {df['scrape_date'].iloc[0]}")
    
    with tab2:
        show_products_browser(df)
    
    with tab3:
        st.header("📄 Scraping Report")
        
        report = load_report()
        
        if report:
            st.text(report)
            
            st.download_button(
                label="📥 Download Report",
                data=report,
                file_name=f"scraping_report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.txt",
                mime="text/plain"
            )
        else:
            st.info("No report available. Run the scraper to generate a report.")

def show_products_browser(df):
    st.header("🔍 Browse Products")
    
    with st.sidebar:
        st.header("🔍 Filters")
        
        search_term = st.text_input("Search Products", placeholder="Enter product name or keyword...")
        
        suppliers = ['All'] + sorted(df['supplier'].unique().tolist())
        selected_supplier = st.selectbox("Supplier", suppliers)
        
        makes = ['All'] + sorted([str(m) for m in df['vehicle_make'].dropna().unique() if str(m) != 'nan'])
        selected_make = st.selectbox("Vehicle Make", makes)
        
        if selected_make != 'All':
            models_filtered = df[df['vehicle_make'] == selected_make]['vehicle_model'].dropna().unique()
            models = ['All'] + sorted([str(m) for m in models_filtered if str(m) != 'nan'])
        else:
            models = ['All'] + sorted([str(m) for m in df['vehicle_model'].dropna().unique() if str(m) != 'nan'])
        selected_model = st.selectbox("Vehicle Model", models)
        
        categories = ['All'] + sorted([str(c) for c in df['main_category'].dropna().unique() if str(c) != 'nan' and str(c) != 'Uncategorized'])
        if 'Uncategorized' in df['main_category'].values:
            categories.append('Uncategorized')
        selected_category = st.selectbox("Category", categories)
        
        brands = ['All'] + sorted([str(b) for b in df['brand'].dropna().unique() if str(b) != 'nan' and str(b) != 'Unknown'])
        selected_brand = st.selectbox("Brand", brands)
        
        price_filter = st.checkbox("Filter by Price Range")
        if price_filter:
            df_with_price = df[df['price'].notna() & (df['price'] > 0)]
            if len(df_with_price) > 0:
                min_price = float(df_with_price['price'].min())
                max_price = float(df_with_price['price'].max())
                price_range = st.slider(
                    "Price Range (KSH)",
                    min_value=min_price,
                    max_value=max_price,
                    value=(min_price, max_price)
                )
            else:
                st.warning("No products with valid prices")
                price_filter = False
        
        if st.button("🔄 Reset Filters"):
            st.rerun()
    
    filtered_df = df.copy()
    
    if search_term:
        search_mask = (
            filtered_df['product_name'].str.contains(search_term, case=False, na=False) |
            filtered_df['description'].str.contains(search_term, case=False, na=False)
        )
        filtered_df = filtered_df[search_mask]
    
    if selected_supplier != 'All':
        filtered_df = filtered_df[filtered_df['supplier'] == selected_supplier]
    
    if selected_make != 'All':
        filtered_df = filtered_df[filtered_df['vehicle_make'] == selected_make]
    
    if selected_model != 'All':
        filtered_df = filtered_df[filtered_df['vehicle_model'] == selected_model]
    
    if selected_category != 'All':
        filtered_df = filtered_df[filtered_df['main_category'] == selected_category]
    
    if selected_brand != 'All':
        filtered_df = filtered_df[filtered_df['brand'] == selected_brand]
    
    if price_filter and len(df_with_price) > 0:
        filtered_df = filtered_df[
            (filtered_df['price'] >= price_range[0]) &
            (filtered_df['price'] <= price_range[1])
        ]
    
    st.subheader(f"Found {len(filtered_df)} products")
    
    col1, col2, col3 = st.columns([2, 2, 1])
    
    with col1:
        sort_by = st.selectbox(
            "Sort by",
            ["Product Name", "Price (Low to High)", "Price (High to Low)", "Supplier", "Make"]
        )
    
    with col2:
        items_per_page = st.selectbox("Items per page", [10, 25, 50, 100], index=1)
    
    with col3:
        if st.button("📥 Export CSV"):
            csv = filtered_df.to_csv(index=False)
            st.download_button(
                label="Download CSV",
                data=csv,
                file_name=f"auto_parts_export_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv",
                mime="text/csv"
            )
    
    if sort_by == "Price (Low to High)":
        filtered_df = filtered_df.sort_values('price', na_position='last')
    elif sort_by == "Price (High to Low)":
        filtered_df = filtered_df.sort_values('price', ascending=False, na_position='last')
    elif sort_by == "Supplier":
        filtered_df = filtered_df.sort_values('supplier')
    elif sort_by == "Make":
        filtered_df = filtered_df.sort_values('vehicle_make', na_position='last')
    else:
        filtered_df = filtered_df.sort_values('product_name')
    
    if len(filtered_df) == 0:
        st.info("No products match your filters. Try adjusting your search criteria.")
        return
    
    total_pages = (len(filtered_df) - 1) // items_per_page + 1
    
    if 'current_page' not in st.session_state:
        st.session_state.current_page = 1
    
    page_cols = st.columns([1, 3, 1])
    with page_cols[0]:
        if st.button("⬅️ Previous") and st.session_state.current_page > 1:
            st.session_state.current_page -= 1
            st.rerun()
    
    with page_cols[1]:
        st.write(f"Page {st.session_state.current_page} of {total_pages}")
    
    with page_cols[2]:
        if st.button("Next ➡️") and st.session_state.current_page < total_pages:
            st.session_state.current_page += 1
            st.rerun()
    
    start_idx = (st.session_state.current_page - 1) * items_per_page
    end_idx = start_idx + items_per_page
    
    page_products = filtered_df.iloc[start_idx:end_idx]
    
    for idx, product in page_products.iterrows():
        display_product_card(product)

if __name__ == "__main__":
    show_dashboard()
