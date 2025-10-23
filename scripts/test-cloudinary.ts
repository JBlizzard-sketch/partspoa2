import { v2 as cloudinary } from 'cloudinary';

// Test Cloudinary connection
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log('Testing Cloudinary Configuration...\n');
console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('API Key:', process.env.CLOUDINARY_API_KEY?.substring(0, 5) + '...');
console.log('API Secret:', process.env.CLOUDINARY_API_SECRET?.substring(0, 5) + '...\n');

async function testConnection() {
  try {
    // Try to get account usage info (low quota operation)
    const result = await cloudinary.api.usage();
    console.log('✅ Cloudinary connection successful!');
    console.log('Account info:', {
      credits: result.credits,
      used_percent: result.used_percent,
      limit: result.limit
    });
  } catch (error: any) {
    console.error('❌ Cloudinary connection failed:');
    console.error('Error:', error.message);
    console.error('\nPlease verify your credentials:');
    console.error('1. Log in to https://cloudinary.com');
    console.error('2. Go to Console Settings → API Keys');
    console.error('3. Make sure you copied:');
    console.error('   - Cloud Name (not API Environment variable)');
    console.error('   - API Key (numeric, not a URL)');
    console.error('   - API Secret (keep this private)');
  }
}

testConnection();