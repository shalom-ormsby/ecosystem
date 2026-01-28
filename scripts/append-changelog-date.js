const fs = require('fs');
const path = require('path');

// Recursive function to find all CHANGELOG.md files
function findChangelogs(dir, fileList = []) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            if (file !== 'node_modules' && file !== '.git' && file !== 'dist') {
                findChangelogs(filePath, fileList);
            }
        } else {
            if (file === 'CHANGELOG.md') {
                fileList.push(filePath);
            }
        }
    });

    return fileList;
}

const changelogs = findChangelogs(process.cwd());
const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

changelogs.forEach(filePath => {
    let content = fs.readFileSync(filePath, 'utf8');
    let updated = false;

    // Regex to match "## 1.2.3" that doesn't already have a date
    // It looks for ## <version> followed immediately by newline
    const versionHeaderRegex = /^## \d+\.\d+\.\d+(?! -)/gm;

    // Only replace the *first* occurrence (the top-most, newest version)
    // We split by lines to handle this safely
    const lines = content.split('\n');

    for (let i = 0; i < lines.length; i++) {
        if (versionHeaderRegex.test(lines[i])) {
            // Check if it's already dated (double check)
            if (!lines[i].includes(' - ')) {
                lines[i] = `${lines[i]} - ${today}`;
                updated = true;
                // Stop after the first one (latest release)
                break;
            }
        }
    }

    if (updated) {
        console.log(`Updated date in ${filePath}`);
        fs.writeFileSync(filePath, lines.join('\n'));
    }
});
