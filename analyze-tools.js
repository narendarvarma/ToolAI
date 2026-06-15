const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, 'src/app/tools');
const results = [];

function scanDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      scanDirectory(fullPath);
    } else if (entry.name === 'page.tsx') {
      analyzePage(fullPath);
    }
  }
}

function analyzePage(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const toolName = path.basename(path.dirname(filePath));
  
  // Count visible text (exclude JSX tags, imports, etc.)
  const textContent = content
    .replace(/import.*?from.*?['"`].*?['"`]/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*/g, '')
    .replace(/["'`].*?["'`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  
  const wordCount = textContent.split(/\s+/).filter(w => w.length > 0).length;
  
  // Count h2 tags
  const h2Matches = content.match(/<h2[^>]*>/gi) || [];
  const h2Count = h2Matches.length;
  
  // Check heading order
  const headingMatches = content.match(/<h[1-6][^>]*>/gi) || [];
  const headingLevels = headingMatches.map(h => parseInt(h.match(/h([1-6])/i)[1]));
  
  let isSequential = true;
  for (let i = 1; i < headingLevels.length; i++) {
    const prev = headingLevels[i - 1];
    const curr = headingLevels[i];
    // Headings should not skip levels (e.g., h1 -> h3 without h2)
    // But multiple h2s are fine
    if (curr > prev + 1) {
      isSequential = false;
      break;
    }
  }
  
  results.push({
    toolName,
    filePath: filePath.replace(__dirname + '\\', ''),
    wordCount,
    h2Count,
    headingLevels,
    isSequential
  });
}

scanDirectory(toolsDir);

// Sort by word count ascending
results.sort((a, b) => a.wordCount - b.wordCount);

// Generate markdown report
let markdown = '# Tool Pages Analysis Report\n\n';
markdown += 'Sorted by word count (ascending)\n\n';
markdown += '| Tool Name | File Path | Word Count | H2 Count | Heading Order |\n';
markdown += '|-----------|-----------|-----------|----------|---------------|\n';

results.forEach(r => {
  const headingOrder = r.isSequential ? '✅ Sequential' : '❌ Non-Sequential';
  markdown += `| ${r.toolName} | ${r.filePath} | ${r.wordCount} | ${r.h2Count} | ${headingOrder} |\n`;
});

markdown += '\n## Pages with 0 H2 tags\n\n';
const noH2 = results.filter(r => r.h2Count === 0);
if (noH2.length > 0) {
  noH2.forEach(r => {
    markdown += `- ${r.toolName} (${r.wordCount} words)\n`;
  });
} else {
  markdown += 'None\n';
}

markdown += '\n## Pages with Non-Sequential Headings\n\n';
const nonSequential = results.filter(r => !r.isSequential);
if (nonSequential.length > 0) {
  nonSequential.forEach(r => {
    markdown += `- ${r.toolName}: ${r.headingLevels.join(' → ')}\n`;
  });
} else {
  markdown += 'None\n';
}

markdown += '\n## Pages with Low Word Count (< 200 words)\n\n';
const lowWordCount = results.filter(r => r.wordCount < 200);
if (lowWordCount.length > 0) {
  lowWordCount.forEach(r => {
    markdown += `- ${r.toolName}: ${r.wordCount} words\n`;
  });
} else {
  markdown += 'None\n';
}

// Save report
fs.writeFileSync(path.join(__dirname, 'tool-analysis-report.md'), markdown);
console.log('Report saved to tool-analysis-report.md');
console.log(`Analyzed ${results.length} tool pages`);
