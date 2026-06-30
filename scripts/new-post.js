#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const type = process.argv[2];
const slug = process.argv[3];

if (!type || !slug) {
  console.log('Usage: npm run new <type> <slug>');
  console.log('Example: npm run new post my-first-article');
  console.log('         npm run new podcast episode-03');
  console.log('         npm run new research ai-trends-2026');
  process.exit(1);
}

const validTypes = ['post', 'podcast', 'research'];
if (!validTypes.includes(type)) {
  console.error(`Error: type must be one of ${validTypes.join(', ')}`);
  process.exit(1);
}

// 读取 .md 模板，生成 .mdx 文章
const templatePath = path.join(__dirname, '..', 'templates', `${type}.md`);
if (!fs.existsSync(templatePath)) {
  console.error(`Template not found: ${templatePath}`);
  process.exit(1);
}

let template = fs.readFileSync(templatePath, 'utf-8');

const now = new Date();
const date = now.toISOString().split('T')[0];
const title = slug
  .replace(/-/g, ' ')
  .replace(/\b\w/g, l => l.toUpperCase());

let episode = 1;
if (type === 'podcast') {
  const contentDir = path.join(process.cwd(), 'src', 'content', 'podcast');
  if (fs.existsSync(contentDir)) {
    const files = fs.readdirSync(contentDir).filter(f => 
      f.endsWith('.mdx') || f.endsWith('.md')
    );
    episode = files.length + 1;
  }
}

// 替换 Templater 变量和脚本占位符
template = template
  .replace(/<% tp\.file\.title %>/g, title)
  .replace(/<% tp\.date\.now\("YYYY-MM-DD"\) %>/g, date)
  .replace(/<% tp\.date\.now\('YYYY-MM-DD'\) %>/g, date)
  .replace(/{{title}}/g, title)
  .replace(/{{date}}/g, date)
  .replace(/{{slug}}/g, slug)
  .replace(/{{episode}}/g, episode);

// 自动填充 episodeNumber
if (type === 'podcast') {
  template = template.replace(/episodeNumber:\s*$/m, `episodeNumber: ${episode}`);
}

const outputDir = path.join(process.cwd(), 'src', 'content', type);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 生成 .mdx 文件（方便以后插入 JSX 组件）
const outputPath = path.join(outputDir, `${slug}.mdx`);

if (fs.existsSync(outputPath)) {
  console.error(`Error: File already exists: ${outputPath}`);
  process.exit(1);
}

fs.writeFileSync(outputPath, template);
console.log(`✅ Created: ${outputPath}`);
console.log(`   Title: ${title}`);
console.log(`   Date: ${date}`);
if (type === 'podcast') {
  console.log(`   Episode: ${episode}`);
}
