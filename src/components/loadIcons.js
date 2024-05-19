import fs from 'fs';
import path from 'path';

const iconsDir = path.resolve(__dirname, '../icons');
const files = fs.readdirSync(iconsDir);

const icons = files.reduce((acc, file) => {
  const ext = path.extname(file).toLowerCase();
  if (['.png', '.jpg', '.jpeg', '.svg'].includes(ext)) {
    const key = path.basename(file, ext);
    acc[key] = `/src/icons/${file}`;
  }
  return acc;
}, {});

export default icons;
