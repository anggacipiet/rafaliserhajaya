const fs = require('fs');
const path = require('path');
const CleanCSS = require('clean-css');
const criticalBootstrap = [
  'reboot',
  'grid',
  'utilities',
  'navbar',
  'buttons'
].join('|');

const bootstrapPath = path.join(__dirname, '../static/plugins/bootstrap/bootstrap.min.css');
const css = fs.readFileSync(bootstrapPath, 'utf8');

// Split CSS
const critical = new CleanCSS().minify(
  css.match(new RegExp(`\.(${criticalBootstrap})[^}]+\}`, 'g')).join('')
);
const nonCritical = new CleanCSS().minify(
  css.replace(new RegExp(`\.(${criticalBootstrap})[^}]+\}`, 'g'), '')
);

// Write files
fs.writeFileSync(
  path.join(__dirname, '../static/plugins/bootstrap/bootstrap.critical.min.css'),
  critical.styles
);
fs.writeFileSync(
  path.join(__dirname, '../static/plugins/bootstrap/bootstrap.noncritical.min.css'),
  nonCritical.styles
); 