const fs = require('fs');
const assert = require('assert');
const read = p => fs.readFileSync(p, 'utf8');
const write = (p, s) => fs.writeFileSync(p, s, 'utf8');
const title = '对医疗损害鉴定意见有异议，第一步应该做什么？';
const slug = 'objection-first-step.html';
const summary = '“我不同意”，和“这份鉴定意见存在什么问题”，是两件不同的事情。把病历和鉴定意见放在一起，从事实、医学判断、因果关系和原因力大小入手，重新梳理诊疗时间线，再考虑异议与重新鉴定程序。';
const source = `如果有人拿着一份医疗损害鉴定意见来问我：
“舒律师，我不同意这个鉴定，能不能重新鉴定？”
我通常不会先回答能不能。
我会先问他：
你认为这份鉴定，错在哪里？
因为“我不同意”，和“这份鉴定意见存在什么问题”，是两件不同的事情。
一、先不要急着反驳结论
很多人审查鉴定意见，是从最后一页开始的。
有没有过错？
有没有因果关系？
参与度多少？
伤残几级？
如果结果对自己有利，就觉得鉴定比较合理；结果不利，就觉得鉴定有问题。
但真正审查鉴定意见，我认为不能只看结论。
应该从结论往前走。
看看这个结论建立在什么事实基础上，又经过了怎样的分析。
二、我通常先看几个问题
首先是事实。
鉴定意见引用的重要事实，在病历中是否真的存在？
有没有遗漏重要的诊疗记录？
有没有把患者某一句病史描述单独拿出来，却忽略前后的诊疗过程？
其次是医学判断。
鉴定认为某个诊疗行为存在过错，或者不存在过错，依据是什么？
这个依据和患者当时的症状、体征、检查结果能不能对应？
再往后是因果关系。
即使存在医疗过错，也不能自动得出所有损害后果都由这个过错造成。
那么，医疗过错究竟通过什么过程影响了最后的损害结果？
患者自身疾病又起了什么作用？
最后才是原因力大小。
如果鉴定认为医方是次要原因、同等原因或者主要原因，就需要进一步看看：
前面的事实和分析，能不能支持这样的判断。
三、一个很重要的方法：把鉴定意见重新放回诊疗时间线
医疗纠纷中的很多问题，单独看某一页病历并不明显。
但是把患者从入院、检查、诊断、治疗，到病情变化和最终损害后果按照时间顺序重新排列以后，有些问题就会慢慢显现出来。
某个症状是什么时候第一次出现的？
医生当时是否已经具备进一步检查的条件？
病情发生变化以后，原来的诊断还能不能解释新的表现？
有没有出现第二次发现和纠正问题的机会？
所以我审查医疗损害鉴定意见时，很少只拿着鉴定书本身看。
我会把它重新放回整个诊疗过程。
因为鉴定意见里的每一个重要判断，最终都应该能够在这个过程中找到它的事实基础。
四、然后才谈程序
当具体问题找出来以后，下一步才是：
是否提出书面异议？
鉴定机构的解释和回复能不能解决这些问题？
是否有必要申请鉴定人出庭？
有没有达到重新鉴定的条件？
这些都是后面的事情。
程序当然重要。
但是程序是用来解决问题的。
如果连问题在哪里都没有找出来，就直接进入程序，往往只会变成一句：
“我认为鉴定不公平，请求重新鉴定。”
这样的异议很难真正触及鉴定意见本身。
所以，对医疗损害鉴定意见有异议，第一步是什么？
我的理解其实很简单：
不要先想怎么推翻它。
先坐下来，把病历和鉴定意见放在一起，认真找出：
它究竟哪里值得质疑？`;
const html = lines => lines.map(line => /^([一二三四])、/.test(line) ? `<h2>${line}</h2>` : `<p>${line}</p>`).join('\n');
const lines = source.split('\n');
const oldTitle = '对医疗损害鉴定结果不满意，怎么办？';
let page = read('medical-appraisal/result-disagreement.html');
page = page.replaceAll(oldTitle, title).replaceAll('result-disagreement.html', slug);
page = page.replace(/(<meta name="description" content=")[^"]*/, '$1' + summary);
page = page.replace(/("description": ")[^"]*/, '$1' + summary);
page = page.replace(/<div class="kb-direct-answer kb-approved-intro">[\s\S]*?<\/div>/, `<div class="kb-direct-answer kb-approved-intro">${html(lines.slice(0,6))}</div>`);
page = page.replace(/<div class="kb-final-text">[\s\S]*?<\/div>/, `<div class="kb-final-text">${html(lines.slice(6))}</div>`);
page = page.replace('<ul><li><a href="../articles/initial-assessment.html">', `<ul><li><a href="result-disagreement.html">${oldTitle}</a></li><li><a href="../articles/initial-assessment.html">`);
assert(!fs.existsSync('medical-appraisal/' + slug));
write('medical-appraisal/' + slug, page);
let topic = read('medical-appraisal/index.html');
const pending = `<span class="kb-question-title">${title}</span><span class="kb-status">待撰写</span>`;
assert(topic.includes(pending));
topic = topic.replace(pending, `<a href="${slug}">${title}</a>`);
topic = topic.replace('"hasPart": [', '"hasPart": [\n' + JSON.stringify({'@type':'Article',url:'https://shuguangwei.com/medical-appraisal/'+slug,headline:title},null,2) + ',');
write('medical-appraisal/index.html', topic);
let directory = read('articles/index.html');
const card = `        <a class="directory-item" href="../medical-appraisal/${slug}">\n          <small class="directory-meta">作者：舒广伟律师</small>\n          <h3>${title}</h3>\n          <p>${summary}</p>\n        </a>\n`;
directory = directory.replace('        <a class="directory-item" href="../medical-appraisal/result-disagreement.html">', card + '        <a class="directory-item" href="../medical-appraisal/result-disagreement.html">');
write('articles/index.html', directory);
let search = read('script.js');
search = search.replace('const searchPages = [', 'const searchPages = [\n' + JSON.stringify({title,category:'医疗损害鉴定 · 鉴定结果与异议',url:'medical-appraisal/'+slug,summary,keywords:'鉴定意见 异议 第一步 病历 事实 医学判断 因果关系 原因力 诊疗时间线 书面异议 重新鉴定'},null,2) + ',');
write('script.js', search);
write('sitemap.xml', read('sitemap.xml').replace('</urlset>', `<url><loc>https://shuguangwei.com/medical-appraisal/${slug}</loc></url></urlset>`));
let related = read('medical-appraisal/result-disagreement.html');
related = related.replace('<ul><li><a href="../articles/initial-assessment.html">', `<ul><li><a href="${slug}">${title}</a></li><li><a href="../articles/initial-assessment.html">`);
write('medical-appraisal/result-disagreement.html', related);
let readme = read('README.md').replace('已完成两篇正式正文：','已完成三篇正式正文：').replace('其他28题保持待撰写','其他27题保持待撰写').replace('两篇文章已双向关联','相关文章已相互关联').replace('两篇新文章尚未填写发布日期','专题文章尚未填写发布日期');
readme = readme.replace('已完成三篇正式正文：', `已完成三篇正式正文：\n- medical-appraisal/${slug}：${title}`);
write('README.md',readme);
write('人工智能工作文件夹/2026-09-21_鉴定异议文章/文章原稿.txt', title+'\n\n'+source+'\n');
console.log('文章与目录、搜索、网站地图更新完成。');
