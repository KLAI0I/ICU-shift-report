const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

// Create a file to stream archive data to
const output = fs.createWriteStream('icu-shift-report-project.zip');
const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level
});

// Listen for all archive data to be written
output.on('close', function() {
  console.log('✅ ZIP file created successfully!');
  console.log(`📦 Total size: ${archive.pointer()} bytes`);
  console.log('📁 File: icu-shift-report-project.zip');
});

// Good practice to catch warnings (ie stat failures and other non-blocking errors)
archive.on('warning', function(err) {
  if (err.code === 'ENOENT') {
    console.warn('Warning:', err);
  } else {
    throw err;
  }
});

// Good practice to catch this error explicitly
archive.on('error', function(err) {
  throw err;
});

// Pipe archive data to the file
archive.pipe(output);

// Add files and directories
const filesToInclude = [
  'src/',
  'public/',
  'package.json',
  'package-lock.json',
  'tsconfig.json',
  'tsconfig.app.json',
  'tsconfig.node.json',
  'vite.config.ts',
  'tailwind.config.js',
  'postcss.config.js',
  'eslint.config.js',
  'index.html',
  '.gitignore'
];

filesToInclude.forEach(item => {
  const itemPath = path.resolve(item);
  
  if (fs.existsSync(itemPath)) {
    const stats = fs.statSync(itemPath);
    
    if (stats.isDirectory()) {
      archive.directory(itemPath, item);
      console.log(`📁 Added directory: ${item}`);
    } else {
      archive.file(itemPath, { name: item });
      console.log(`📄 Added file: ${item}`);
    }
  } else {
    console.log(`⚠️  Skipped (not found): ${item}`);
  }
});

// Add README file with project information
const readmeContent = `# ICU Shift Report Application

A comprehensive medical handover interface for ICU healthcare professionals.

## Features
- Complete ICU shift report form
- Staff handover tracking
- Patient identification and medical history
- Assessment tools with vital signs
- Medication and treatment tracking
- Professional medical interface design

## Setup Instructions

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Start development server:
   \`\`\`bash
   npm run dev
   \`\`\`

3. Build for production:
   \`\`\`bash
   npm run build
   \`\`\`

## Technologies Used
- React 18 with TypeScript
- Tailwind CSS for styling
- Vite for build tooling
- Lucide React for icons

## Live Demo
Visit: https://fancy-capybara-1b5892.netlify.app

Built with ❤️ for healthcare professionals
`;

archive.append(readmeContent, { name: 'README.md' });
console.log('📄 Added file: README.md');

// Finalize the archive
archive.finalize();