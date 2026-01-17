const sharp = require('sharp');
const fs = require('fs');

async function convertFavicon() {
  try {
    // Convert to PNG (16x16)
    await sharp('public/novachrono.jpg')
      .resize(16, 16)
      .toFile('public/favicon-16x16.png');
    
    // Convert to PNG (32x32)
    await sharp('public/novachrono.jpg')
      .resize(32, 32)
      .toFile('public/favicon-32x32.png');
    
    // Convert to PNG (180x180 for Apple)
    await sharp('public/novachrono.jpg')
      .resize(180, 180)
      .toFile('public/apple-touch-icon.png');
    
    // Convert to ICO (32x32)
    await sharp('public/novachrono.jpg')
      .resize(32, 32)
      .toFile('public/favicon.ico');
    
    console.log('Favicon files created successfully!');
  } catch (error) {
    console.error('Error creating favicons:', error);
  }
}

convertFavicon();
