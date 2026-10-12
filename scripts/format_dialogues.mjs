import fs from 'fs';
import path from 'path';

function walk(dir) {
  let results = [];
  try {
    const list = fs.readdirSync(dir);
    for (const file of list) {
      const full = path.join(dir, file);
      const stat = fs.statSync(full);
      if (stat.isDirectory()) {
        if (!['.git', 'node_modules', '.obsidian', 'bin', 'obj', '.vs', 'public', '.fast-content'].includes(file)) {
          results = results.concat(walk(full));
        }
      } else if (file.endsWith('.md')) {
        results.push(full);
      }
    }
  } catch (e) {}
  return results;
}

// Regex matching speaker turn: starts with optional whitespace, then **Speaker(Optional role)**: text
const speakerRegex = /^\s*(\*\*[^*]+?\*\*:\s*.*)$/;

const vaultDir = path.resolve(process.cwd(), '..');
console.log(`Scanning Markdown files under: ${vaultDir}`);

const files = walk(vaultDir);
let changedCount = 0;
let totalFormattedLines = 0;

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split(/\r?\n/);
  let modified = false;
  const newLines = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    newLines.push(line);

    // If current line is a speaker turn, and next line is also a speaker turn (without blank line)
    if (i < lines.length - 1) {
      const nextLine = lines[i + 1];
      if (speakerRegex.test(line) && speakerRegex.test(nextLine)) {
        // Insert a blank line between speaker turns
        newLines.push('');
        modified = true;
        totalFormattedLines++;
      }
    }
  }

  if (modified) {
    fs.writeFileSync(file, newLines.join('\n'), 'utf8');
    changedCount++;
    console.log(`[Formatted] ${path.relative(vaultDir, file)}`);
  }
}

console.log(`\nDialogue formatting complete!`);
console.log(`Files modified: ${changedCount}`);
console.log(`Dialogue breaks inserted: ${totalFormattedLines}`);
