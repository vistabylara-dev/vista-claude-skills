const assert=require('node:assert/strict');const fs=require('node:fs');const {topics,resolve}=require('./docs/finder.js');
assert.equal(new Set(topics.map(t=>t.id)).size,8);
let count=0;for(const t of topics)for(const d of ['mobile','desktop','both'])for(const c of ['theme','app','none','unknown']){const r=resolve(t.id,d,c);assert.equal(r.topic,t);assert(r.summary.includes(d));assert(r.summary.includes(c));assert(r.context.length>30);assert(!r.summary.includes('undefined'));count++;}
assert.equal(resolve('__proto__','mobile','theme'),null);assert.equal(resolve('missing-section','mobile','__proto__'),null);assert.equal(resolve('missing-section','tablet','theme'),null);
const html=fs.readFileSync('docs/index.html','utf8');for(const t of topics){assert(html.includes(`id="read-${t.id}"`));assert(html.includes(`discussions/${t.guide}`));assert(html.includes(t.title.replaceAll('"','&quot;')));}
assert(!html.includes('http://www.vistabylara'));assert.equal((html.match(/rel="canonical"/g)||[]).length,1);
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);assert.equal(ids.length,new Set(ids).size);
for(const id of [...fs.readFileSync('docs/app.js','utf8').matchAll(/getElementById\('([^']+)'\)/g)].map(x=>x[1]))assert(ids.includes(id),id);
console.log(`${count} result paths plus invalid inputs, 8 fallback guides, unique IDs and DOM bindings passed.`);
