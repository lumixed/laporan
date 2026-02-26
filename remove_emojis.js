const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = dir + '/' + file;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('.html') || file.endsWith('.js')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('.');
let removedCount = 0;
files.forEach(file => {
    if (file === './remove_emojis.js') return;
    let content = fs.readFileSync(file, 'utf8');
    const original = content;
    
    // Remove variations of emojis
    content = content.replace(/\p{Emoji_Presentation}/gu, '');
    content = content.replace(/\p{Emoji}\uFE0F/gu, '');
    content = content.replace(/[\u{1F300}-\u{1FAFF}]/gu, '');
    content = content.replace(/[\u{2600}-\u{27BF}]/gu, '');
    
    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Cleaned:', file);
        removedCount++;
    }
});
console.log(`Finished processing. Cleaned ${removedCount} files.`);
