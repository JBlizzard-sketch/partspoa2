import os
import io
from datetime import datetime
from typing import Optional
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload, MediaIoBaseUpload
from google.oauth2.credentials import Credentials
import requests

def get_google_drive_client():
    hostname = os.getenv('REPLIT_CONNECTORS_HOSTNAME')
    x_replit_token = None
    
    if os.getenv('REPL_IDENTITY'):
        x_replit_token = 'repl ' + os.getenv('REPL_IDENTITY')
    elif os.getenv('WEB_REPL_RENEWAL'):
        x_replit_token = 'depl ' + os.getenv('WEB_REPL_RENEWAL')
    
    if not x_replit_token:
        raise Exception('X_REPLIT_TOKEN not found for repl/depl')
    
    response = requests.get(
        f'https://{hostname}/api/v2/connection?include_secrets=true&connector_names=google-drive',
        headers={
            'Accept': 'application/json',
            'X_REPLIT_TOKEN': x_replit_token
        }
    )
    
    connection_data = response.json()
    connection_settings = connection_data.get('items', [{}])[0]
    
    access_token = (
        connection_settings.get('settings', {}).get('access_token') or
        connection_settings.get('settings', {}).get('oauth', {}).get('credentials', {}).get('access_token')
    )
    
    if not access_token:
        raise Exception('Google Drive not connected')
    
    credentials = Credentials(token=access_token)
    service = build('drive', 'v3', credentials=credentials)
    
    return service

def find_or_create_folder(service, folder_name: str, parent_id: Optional[str] = None) -> str:
    query = f"name='{folder_name}' and mimeType='application/vnd.google-apps.folder' and trashed=false"
    if parent_id:
        query += f" and '{parent_id}' in parents"
    
    results = service.files().list(
        q=query,
        spaces='drive',
        fields='files(id, name)'
    ).execute()
    
    files = results.get('files', [])
    
    if files:
        return files[0]['id']
    
    file_metadata = {
        'name': folder_name,
        'mimeType': 'application/vnd.google-apps.folder'
    }
    
    if parent_id:
        file_metadata['parents'] = [parent_id]
    
    folder = service.files().create(
        body=file_metadata,
        fields='id'
    ).execute()
    
    return folder['id']

def upload_file_to_drive(file_path: str, folder_path: str = 'AutoPartsData') -> Optional[str]:
    try:
        service = get_google_drive_client()
        
        base_folder_id = find_or_create_folder(service, folder_path)
        
        date_folder_name = datetime.now().strftime('%Y-%m-%d')
        date_folder_id = find_or_create_folder(service, date_folder_name, base_folder_id)
        
        file_name = os.path.basename(file_path)
        
        file_metadata = {
            'name': file_name,
            'parents': [date_folder_id]
        }
        
        if os.path.exists(file_path):
            media = MediaFileUpload(file_path, resumable=True)
        else:
            raise FileNotFoundError(f"File not found: {file_path}")
        
        file = service.files().create(
            body=file_metadata,
            media_body=media,
            fields='id, webViewLink'
        ).execute()
        
        print(f"✓ Uploaded {file_name} to Google Drive")
        print(f"  Link: {file.get('webViewLink')}")
        
        return file.get('id')
        
    except Exception as e:
        print(f"✗ Failed to upload {file_path}: {str(e)}")
        return None

def upload_directory_to_drive(directory_path: str, folder_path: str = 'AutoPartsData') -> dict:
    uploaded_files = {}
    
    if not os.path.exists(directory_path):
        print(f"Directory not found: {directory_path}")
        return uploaded_files
    
    for root, dirs, files in os.walk(directory_path):
        for file in files:
            if file.endswith(('.csv', '.json', '.txt')):
                file_path = os.path.join(root, file)
                file_id = upload_file_to_drive(file_path, folder_path)
                if file_id:
                    uploaded_files[file] = file_id
    
    return uploaded_files
