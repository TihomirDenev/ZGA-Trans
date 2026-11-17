// Copies the prerendered /404 page to 404.html, the file static hosts (Vercel, Netlify,
// Firebase, Cloudflare Pages) serve with a real 404 status for unknown URLs.
import { copyFileSync, existsSync } from 'node:fs';

const BROWSER_OUTPUT_DIRECTORY = 'dist/zga-trans/browser';
const prerenderedNotFoundPage = `${BROWSER_OUTPUT_DIRECTORY}/404/index.html`;
const hostNotFoundPage = `${BROWSER_OUTPUT_DIRECTORY}/404.html`;

if (!existsSync(prerenderedNotFoundPage)) {
  console.error(`✖ ${prerenderedNotFoundPage} was not found — is the /404 route prerendered?`);
  process.exit(1);
}

copyFileSync(prerenderedNotFoundPage, hostNotFoundPage);
console.log(`✔ Created ${hostNotFoundPage}`);
