// Injects Vercel env vars into index.html at build time.
// If env vars are absent, placeholders remain and the app shows its manual setup screen.
const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
html = html.split('__SUPABASE_URL__').join(process.env.SUPABASE_URL || '__SUPABASE_URL__');
html = html.split('__SUPABASE_ANON_KEY__').join(process.env.SUPABASE_ANON_KEY || '__SUPABASE_ANON_KEY__');
fs.mkdirSync('dist', { recursive: true });
fs.writeFileSync('dist/index.html', html);
console.log('Built dist/index.html with',
  process.env.SUPABASE_URL ? 'env-injected Supabase config' : 'placeholders (manual setup)');
