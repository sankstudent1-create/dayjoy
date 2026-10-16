// Injects Vercel env vars into index.html at build time and copies mascot art.
// If env vars are absent, placeholders remain and the app shows its manual setup screen.
const fs = require('fs');
const path = require('path');
let html = fs.readFileSync('index.html', 'utf8');
html = html.split('__SUPABASE_URL__').join(process.env.SUPABASE_URL || '__SUPABASE_URL__');
html = html.split('__SUPABASE_ANON_KEY__').join(process.env.SUPABASE_ANON_KEY || '__SUPABASE_ANON_KEY__');
fs.mkdirSync('dist', { recursive: true });
fs.writeFileSync(path.join('dist', 'index.html'), html);
for (const img of ['mascot-sun.webp', 'mascot-clock.webp']) {
  if (fs.existsSync(img)) fs.copyFileSync(img, path.join('dist', img));
}
console.log('Built dist/ with',
  process.env.SUPABASE_URL ? 'env-injected Supabase config' : 'placeholders (manual setup)');
