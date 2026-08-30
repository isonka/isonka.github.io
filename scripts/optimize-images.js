const fs = require('fs');
const path = require('path');
const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');

const inputDir = path.join(__dirname, '../public/assets/images');
const outputDir = path.join(__dirname, '../public/assets/images');
const rootDir = path.join(__dirname, '../');

// Function to get all files recursively
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllFiles(filePath, arrayOfFiles);
    } else {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
}

// Function to replace image references in files
function replaceImageReferences(filePath, replacements) {
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  for (const [original, optimized] of Object.entries(replacements)) {
    // Replace full paths in HTML/Markdown
    const relativeOriginal = path.relative(rootDir, original).replace(/\\/g, '/');
    const relativeOptimized = path.relative(rootDir, optimized).replace(/\\/g, '/');
    
    content = content.replace(
      new RegExp(relativeOriginal.replace(/\./g, '\\.'), 'g'),
      relativeOptimized
    );
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated references in ${filePath}`);
  }
}

// Function to add loading="lazy" to img tags
function addLazyLoading(filePath) {
  if (!fs.existsSync(filePath) || (!filePath.endsWith('.html') && !filePath.endsWith('.md'))) return;

  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;

  // Add loading="lazy" to img tags that don't already have it
  content = content.replace(/<img(?![^>]*\bloading\s*=\s*["']?lazy)([^>]*?)>/gi, (match, p1) => {
    // Skip if it's a self-closing tag without closing bracket
    if (!p1.includes('>')) {
      return match;
    }
    return `<img${p1} loading="lazy">`;
  });

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Added lazy loading to images in ${filePath}`);
  }
}

async function optimizeImages() {
  try {
    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Process all jpg/jpeg/png files
    const jpgPngFiles = await imagemin([`${inputDir}/**/*.{jpg,jpeg,png}`], {
      destination: outputDir,
      plugins: [
        imageminMozjpeg({ quality: 80 }),
        imageminPngquant({ quality: [0.6, 0.8] })
      ]
    });

    console.log('Optimized JPEG/PNG images:');
    jpgPngFiles.forEach(file => console.log(`- ${file.destinationPath}`));

    // Process all images to convert to WebP
    const webpFiles = await imagemin([`${inputDir}/**/*.{jpg,jpeg,png}`], {
      destination: outputDir,
      plugins: [
        imageminWebp({ quality: 80 })
      ]
    });

    console.log('Created WebP versions:');
    webpFiles.forEach(file => console.log(`- ${file.destinationPath}`));

    // Create mapping of original files to optimized files
    const replacements = {};
    
    // Map original files to their WebP versions
    webpFiles.forEach(file => {
      const originalExt = path.extname(file.sourcePath);
      const baseName = file.sourcePath.replace(new RegExp(`${originalExt}$`), '');
      const webpPath = `${baseName}.webp`;
      
      if (fs.existsSync(webpPath)) {
        replacements[file.sourcePath] = webpPath;
      }
    });

    // Get all HTML and Markdown files
    const htmlMdFiles = getAllFiles(rootDir).filter(file => 
      file.endsWith('.html') || file.endsWith('.md')
    );

    // Update image references in all HTML and Markdown files
    console.log('\nUpdating image references in HTML/Markdown files...');
    htmlMdFiles.forEach(file => {
      replaceImageReferences(file, replacements);
    });

    // Add lazy loading to all img tags in HTML files
    console.log('\nAdding lazy loading attributes to img tags...');
    htmlMdFiles.forEach(file => {
      addLazyLoading(file);
    });

    console.log('\nImage optimization and updates complete!');
    console.log('\nTo validate performance improvements with Lighthouse, run:');
    console.log('npx lighthouse http://localhost:3000 --output json --output-path lighthouse_improvement_report.json');
  } catch (error) {
    console.error('Error optimizing images:', error);
  }
}

optimizeImages();