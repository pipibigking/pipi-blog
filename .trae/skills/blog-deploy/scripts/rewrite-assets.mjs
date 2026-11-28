import { readdir, readFile, writeFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import path from 'node:path';

const sourceDir = process.argv[2];
if (!sourceDir) {
  console.error('usage: node rewrite-assets.mjs <source-dir>');
  process.exit(1);
}

const publicDir = path.join(sourceDir, 'public');
const versionID = randomUUID().replaceAll('-', '');
const mount = `/_assets/${versionID}/`;

const walk = async (dir, acc = []) => {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full, acc);
    else acc.push(full);
  }
  return acc;
};

const rewriteValue = (value) => {
  if (!value) return value;
  // strip any previously applied version mount so the rewrite stays idempotent
  let next = value.replace(/^\/_assets\/[a-f0-9]{32}\//i, '/');
  if (next.startsWith('#') || /^(?:[a-z][\w+.-]*:|\/\/)/i.test(next)) return next;
  return mount + (next.startsWith('/') ? next.slice(1) : next.replace(/^\.\//, ''));
};

const tagPattern = /<(script|link|img|source|video|audio|iframe|embed|object|input)\b[^>]*>/gi;
const attrPattern = /\b(src|href|poster|data)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gi;

const files = await walk(publicDir);
const htmlFiles = files.filter((file) => /\.html?$/i.test(file));
let rewritten = 0;

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  if (/<base\b/i.test(html)) {
    console.error(`base element not supported: ${file}`);
    process.exit(2);
  }
  const output = html.replace(tagPattern, (tag) =>
    tag.replace(attrPattern, (match, attr, dq, sq, bare) => {
      const value = dq ?? sq ?? bare;
      const next = rewriteValue(value);
      if (next === value) return match;
      const quote = dq !== undefined ? '"' : sq !== undefined ? "'" : '';
      return `${attr}=${quote || '"'}${next}${quote || '"'}`;
    }),
  );
  if (output !== html) {
    await writeFile(file, output);
    rewritten += 1;
  }
}

await writeFile(path.join(sourceDir, 'assets-version.json'), JSON.stringify({ version_id: versionID }));
console.log(JSON.stringify({ ok: true, version_id: versionID, html_files: htmlFiles.length, rewritten }));
