const fs = require('fs'), assert = require('assert'), path = require('path'), vm = require('vm');
const read = p => fs.readFileSync(p,'utf8');
const write = (p,s) => fs.writeFileSync(p,s,'utf8');
const articles = JSON.parse(read(path.join(__dirname,'文章数据.json')));
const base = read('medical-appraisal/objection-first-step.html');
const oldTitle = '对医疗损害鉴定意见有异议，第一步应该做什么？';
const escape = s => s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const render = lines => lines.map(line => {
  const heading = line.startsWith('## '), tag = heading ? 'h2':'p';
  return `<${tag}>${escape(heading ? line.slice(3):line).replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')}</${tag}>`;
}).join('\n');
let topic=read('medical-appraisal/index.html'), directory=read('articles/index.html'), search=read('script.js'), sitemap=read('sitemap.xml');
const collectionMatch=topic.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
const collection=JSON.parse(collectionMatch[1]);
for(const a of articles){
  assert(!fs.existsSync('medical-appraisal/'+a.slug),'目标文章已存在，请勿重复运行');
  let page=base.replaceAll(oldTitle,a.title).replaceAll('objection-first-step.html',a.slug).replaceAll('鉴定结果与异议',a.category).replaceAll('#objections','#'+a.anchor);
  page=page.replace(/(<meta name="description" content=")[^"]*/, '$1'+escape(a.summary));
  const schemaMatch=page.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  const schema=JSON.parse(schemaMatch[1]);
  schema['@graph'][0].description=a.summary;
  page=page.replace(schemaMatch[1],'\n'+JSON.stringify(schema,null,2)+'\n');
  const split=a.body.findIndex(line=>line.startsWith('## '));
  page=page.replace(/<div class="kb-direct-answer kb-approved-intro">[\s\S]*?<\/div>/,`<div class="kb-direct-answer kb-approved-intro">${render(a.body.slice(0,split))}</div>`);
  page=page.replace(/<div class="kb-final-text">[\s\S]*?<\/div>/,`<div class="kb-final-text">${render(a.body.slice(split))}</div>`);
  const related=articles.filter(item=>item!==a).map(item=>`<li><a href="${item.slug}">${item.title}</a></li>`).join('')+`<li><a href="objection-first-step.html">${oldTitle}</a></li>`;
  page=page.replace(/(<section class="kb-related-inline"[\s\S]*?<ul>)[\s\S]*?(<\/ul>)/,'$1'+related+'$2');
  // Relative breadcrumb links also work when previewing the local file directly.
  page=page.replaceAll('href="/"','href="../index.html"').replaceAll('href="/medical-appraisal/"','href="index.html"').replaceAll('href="/medical-appraisal/#','href="index.html#');
  write('medical-appraisal/'+a.slug,page);
  const entry=new RegExp(`<li id="question-${a.question}">[\\s\\S]*?<\\/li>`);
  assert(entry.test(topic));
  topic=topic.replace(entry,`<li id="question-${a.question}"><span class="kb-question-number">${String(a.question).padStart(2,'0')}</span><a href="${a.slug}">${a.title}</a></li>`);
  collection['@graph'][0].hasPart.push({'@type':'Article',url:'https://shuguangwei.com/medical-appraisal/'+a.slug,headline:a.title});
  sitemap=sitemap.replace('</urlset>',`<url><loc>https://shuguangwei.com/medical-appraisal/${a.slug}</loc></url></urlset>`);
}
topic=topic.replace(collectionMatch[1],'\n'+JSON.stringify(collection,null,2)+'\n');
write('medical-appraisal/index.html',topic);
const cards=articles.map(a=>`        <a class="directory-item" href="../medical-appraisal/${a.slug}">\n          <small class="directory-meta">作者：舒广伟律师 · ${a.category}</small>\n          <h3>${a.title}</h3>\n          <p>${a.summary}</p>\n        </a>\n`).join('');
const marker='        <a class="directory-item" href="../medical-appraisal/objection-first-step.html">';
assert(directory.includes(marker));
write('articles/index.html',directory.replace(marker,cards+marker));
const entries=articles.map(a=>({title:a.title,category:'医疗损害鉴定 · '+a.category,url:'medical-appraisal/'+a.slug,summary:a.summary,keywords:'医疗损害鉴定 参与度 原因力 责任比例 法院 重新鉴定 条件 书面异议 质证 鉴定人出庭'}));
write('script.js',search.replace('const searchPages = [','const searchPages = [\n'+entries.map(a=>JSON.stringify(a,null,2)).join(',\n')+','));
write('sitemap.xml',sitemap);
let first=read('medical-appraisal/objection-first-step.html');
first=first.replace(/(<section class="kb-related-inline"[\s\S]*?<ul>)/,'$1'+articles.map(a=>`<li><a href="${a.slug}">${a.title}</a></li>`).join(''));
write('medical-appraisal/objection-first-step.html',first);
let readme=read('README.md').replace('已完成三篇正式正文：','已完成七篇正式正文：\n'+articles.map(a=>`- medical-appraisal/${a.slug}：${a.title}`).join('\n')).replace('其他27题','其他23题');
write('README.md',readme);
// Targeted content, navigation, metadata and search checks.
let links=0;
const files=articles.map(a=>'medical-appraisal/'+a.slug).concat(['medical-appraisal/index.html','articles/index.html','medical-appraisal/objection-first-step.html']);
for(const file of files){
  const html=read(file);
  for(const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g))JSON.parse(m[1]);
  for(const m of html.matchAll(/(?:href|src)="([^"]+)"/g)){
    const [url,fragment]=m[1].split('#');
    if(/^(https?:|mailto:|tel:)/.test(url))continue;
    let target=url?(url.startsWith('/')?path.join(process.cwd(),url):path.resolve(path.dirname(file),url)):path.resolve(file);
    if(fs.existsSync(target)&&fs.statSync(target).isDirectory())target=path.join(target,'index.html');
    assert(fs.existsSync(target),file+' broken link '+url);
    if(fragment)assert(read(target).includes(`id="${fragment}"`),'missing anchor '+m[1]);
    links++;
  }
}
const normalize=s=>s.replace(/<[^>]+>/g,'').replaceAll('&quot;','"').replaceAll('&amp;','&').replace(/\s/g,'');
for(const a of articles){
 const page=read('medical-appraisal/'+a.slug);
 const intro=page.match(/<div class="kb-direct-answer kb-approved-intro">([\s\S]*?)<\/div>/)[1];
 const body=page.match(/<div class="kb-final-text">([\s\S]*?)<\/div>/)[1];
 assert.equal(normalize(intro+body),normalize(a.body.map(s=>s.replace(/^## /,'').replaceAll('**','')).join('')));
 assert.equal((page.match(/<h1>/g)||[]).length,1);
 assert.equal((page.match(/<strong>/g)||[]).length,a.body.filter(s=>s.includes('**')).length+1);
 const result={innerHTML:''};
 vm.runInNewContext(read('script.js')+'\nrenderSearchResults('+JSON.stringify(a.title)+');',{document:{querySelector:s=>s==='#site-search-results'?result:null}});
 assert(result.innerHTML.includes(a.slug));
 assert.equal((sitemap.match(new RegExp(a.slug.replace('.','\\.'),'g'))||[]).length,1);
}
assert.equal((topic.match(/class="kb-status"/g)||[]).length,23);
const report=`已新增四篇文章，替换专题第 04、08、09、15 题；共 7 篇正文，23 题待撰写。\n四篇正文与输入数据逐字比对通过（忽略段落空白及 Markdown 标记），加粗数量核对通过；${links} 个本地链接及锚点有效；结构化数据解析与四篇文章标题搜索通过；网站地图各收录一次。\n本次为原文入站与排版，不作实质法律审查或修改。未填写未经确认的发布日期，未执行线上部署。\nREADME 所述外部“当前内容索引.json”不在本工作区，未修改；本次内容数据保存在本目录“文章数据.json”。\n`;
write(path.join(__dirname,'检查记录.txt'),report);
console.log(report);
