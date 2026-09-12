const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const edgePath = path.join(process.env['ProgramFiles(x86)'] || 'C:\\Program Files (x86)', 'Microsoft', 'Edge', 'Application', 'msedge.exe');
const tmpDir = os.tmpdir();
const snapOut = path.join(tmpDir, 'snap.png');
const userData = path.join(tmpDir, 'edge-profile-' + Date.now());

try {
  execSync(`"${edgePath}" --headless=new --disable-gpu --virtual-time-budget=7000 --user-data-dir="${userData}" --screenshot="${snapOut}" --window-size=1280,15000 "http://localhost:3939/"`, { stdio: 'inherit' });
  console.log('snap exists in tmp:', fs.existsSync(snapOut));
  if (fs.existsSync(snapOut)) {
    fs.copyFileSync(snapOut, path.join(__dirname, 'snap.png'));
    console.log('copied to snap.png, size:', fs.statSync('snap.png').size);
  }
} catch (e) {
  console.error('Error:', e.message);
}
