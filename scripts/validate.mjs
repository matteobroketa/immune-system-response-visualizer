#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const required = [
  'index.html', 'README.md', 'LICENSE', 'CITATION.cff', 'site.webmanifest',
  'assets/favicon.svg', 'docs/SCIENTIFIC_BASIS.md', 'docs/MODEL_REFERENCE.md',
  'docs/DATA_AND_API.md', 'docs/VALIDATION.md', '.github/workflows/pages.yml'
];
const errors = [];
for (const rel of required) if (!fs.existsSync(path.join(root, rel))) errors.push(`Missing ${rel}`);

const htmlPath = path.join(root, 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');
const mustContain = [
  '<!doctype html>', '<title>Immune System Response Visualizer</title>',
  'name="description"', 'rel="canonical"', 'id="scene"',
  'window.immuneChoreography', 'aria-label=', 'prefers-reduced-motion'
];
for (const token of mustContain) if (!html.includes(token)) errors.push(`index.html missing ${token}`);

const forbidden = [/C:\\\\Users\\/i, /\/mnt\/data\//i, /file:\/\//i];
for (const re of forbidden) if (re.test(html)) errors.push(`Local path leakage: ${re}`);
if (/<script\s+[^>]*src=/i.test(html)) errors.push('External script dependency found');
if (/<link\s+[^>]*rel=["']stylesheet["']/i.test(html)) errors.push('External stylesheet dependency found');

const scriptMatches = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)];
if (!scriptMatches.length) errors.push('No inline script found');
for (const [i, match] of scriptMatches.entries()) {
  try { new vm.Script(match[1], { filename: `index-inline-${i}.js` }); }
  catch (error) { errors.push(`JavaScript parse error: ${error.message}`); }
}

try {
  const manifest = JSON.parse(fs.readFileSync(path.join(root, 'site.webmanifest'), 'utf8'));
  for (const key of ['name', 'short_name', 'start_url', 'theme_color', 'icons']) {
    if (!(key in manifest)) errors.push(`Manifest missing ${key}`);
  }
} catch (error) { errors.push(`Manifest parse error: ${error.message}`); }

const markdownFiles = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory() && !['.git', '_site'].includes(entry.name)) walk(full);
    else if (entry.isFile() && full.endsWith('.md')) markdownFiles.push(full);
  }
}
walk(root);
for (const file of markdownFiles) {
  const text = fs.readFileSync(file, 'utf8');
  for (const match of text.matchAll(/\[[^\]]*\]\((?!https?:|mailto:|#)([^)]+)\)/g)) {
    const target = match[1].split('#')[0];
    if (!target) continue;
    const resolved = path.resolve(path.dirname(file), target);
    if (!fs.existsSync(resolved)) errors.push(`Broken local link in ${path.relative(root, file)}: ${match[1]}`);
  }
}

if (errors.length) {
  console.error('Validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`Validation passed: ${required.length} required files, ${scriptMatches.length} inline script(s), ${markdownFiles.length} Markdown files.`);
