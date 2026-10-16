// Minimal static server for dist/ used by the Playwright tests (Astro 7's
// preview command daemonizes, which Playwright's webServer cannot manage).
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';

// Send the same security headers production sends (vercel.json), so the browser
// tests fail on anything the Content Security Policy would block.
const SECURITY = Object.fromEntries(JSON.parse(readFileSync(new URL('../../vercel.json', import.meta.url), 'utf8')).headers[0].headers.map((h) => [h.key, h.value]));

const root = new URL('../../dist/', import.meta.url).pathname;
const port = Number(process.env.PORT ?? 47613);
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.json': 'application/json', '.woff2': 'font/woff2', '.woff': 'font/woff', '.png': 'image/png' };

createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', 'http://x');
  let path = normalize(join(root, decodeURIComponent(url.pathname)));
  if (!path.startsWith(root)) return res.writeHead(403).end();
  try {
    if ((await stat(path)).isDirectory()) path = join(path, 'index.html');
    const body = await readFile(path);
    res.writeHead(200, { ...SECURITY, 'Content-Type': TYPES[extname(path)] ?? 'application/octet-stream' }).end(body);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain' }).end('Not found');
  }
}).listen(port, '127.0.0.1', () => console.log(`serving dist on http://127.0.0.1:${port}`));
