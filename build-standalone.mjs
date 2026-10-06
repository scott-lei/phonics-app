/**
 * build-standalone.mjs —— 打包成单文件版
 *
 * 为什么要打包：
 *   浏览器通过 file:// 直接打开时，出于安全策略不允许加载外部 ES Module，
 *   所以 index.html 必须用本地服务器打开。为了让「双击即用」也能实现，
 *   这里把 CSS 和全部 JS 模块内联进一个 HTML，输出 phonics-standalone.html。
 *
 * 用法：node build-standalone.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const rootDir = path.dirname(fileURLToPath(import.meta.url));
const ENTRY = path.join(rootDir, 'js', 'app.js');
const INDEX = path.join(rootDir, 'index.html');
const OUT = path.join(rootDir, 'phonics-standalone.html');

// 匹配 import 语句：import { a, b } from './x.js';  /  import './x.css';
const IMPORT_RE = /^[ \t]*import\s+(?:[\s\S]*?\sfrom\s+)?(['"])([^'"]+)\1\s*;?[ \t]*$/gm;
// 匹配 export default xxx;
const EXPORT_DEFAULT_RE = /^[ \t]*export\s+default\s+[^;]*;?[ \t]*$/gm;
// 匹配 export const / export function / ...
const EXPORT_RE = /^([ \t]*)export\s+(?!default\b)/gm;

const visited = new Set();
const chunks = [];

function collectDependencies(source) {
  const deps = [];
  const re = new RegExp(IMPORT_RE.source, 'gm');
  let match = re.exec(source);
  while (match) {
    deps.push(match[2]);
    match = re.exec(source);
  }
  return deps;
}

function stripModuleSyntax(source) {
  return source
    .replace(IMPORT_RE, '')
    .replace(EXPORT_DEFAULT_RE, '')
    .replace(EXPORT_RE, '$1');
}

function bundle(file) {
  const abs = path.resolve(file);
  if (visited.has(abs)) return;
  visited.add(abs);

  const source = fs.readFileSync(abs, 'utf8');
  const rel = path.relative(rootDir, abs).split(path.sep).join('/');

  for (const spec of collectDependencies(source)) {
    if (!spec.startsWith('.')) continue; // 忽略裸模块（本项目不使用）
    bundle(path.resolve(path.dirname(abs), spec));
  }

  chunks.push('/* ==== ' + rel + ' ==== */\n' + stripModuleSyntax(source).trim() + '\n');
}

bundle(ENTRY);

const bundleCode = [
  '(function () {',
  "  'use strict';",
  chunks.join('\n'),
  '})();'
].join('\n');

// 语法自检：有语法错误会直接抛错
new vm.Script(bundleCode, { filename: 'phonics-bundle.js' });

const html = fs.readFileSync(INDEX, 'utf8');

const cssPath = path.join(rootDir, 'css', 'style.css');
const css = fs.readFileSync(cssPath, 'utf8');

let output = html
  .replace(
    /[ \t]*<link\s+rel="stylesheet"\s+href="css\/style\.css(?:\?[^"]*)?"\s*>/,
    '<style>\n' + css.trim() + '\n</style>'
  )
  .replace(
    /[ \t]*<script\s+type="module"\s+src="js\/app\.js(?:\?[^"]*)?"\s*><\/script>/,
    '<script>\n' + bundleCode + '\n</script>'
  );

// 防呆：index.html 里的引用写法一旦变了（例如加了查询串或改成别的标签），
// 上面的正则会静默匹配失败，产物就会丢样式/丢脚本。这里显式报错。
if (/href="css\/style\.css/.test(output) || /src="js\/app\.js/.test(output)) {
  throw new Error(
    '索引文件里的样式表或入口脚本没有被内联，请检查 index.html 中 <link rel="stylesheet" href="css/style.css..."> ' +
      '与 <script type="module" src="js/app.js..."> 的写法是否被改过。'
  );
}

output = output.replace(
  '<title>',
  '<!-- 单文件版：由 build-standalone.mjs 自动生成，请勿直接编辑；\n     源码请改 index.html / css/style.css / js/ 后重新运行 node build-standalone.mjs -->\n<title>'
);

fs.writeFileSync(OUT, output, 'utf8');

const sizeKb = (Buffer.byteLength(output, 'utf8') / 1024).toFixed(1);
const modules = visited.size;
console.log('已生成: ' + path.relative(rootDir, OUT));
console.log('内联模块: ' + modules + ' 个');
console.log('文件大小: ' + sizeKb + ' KB');
console.log('语法自检: 通过');
