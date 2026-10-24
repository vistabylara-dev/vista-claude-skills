const {topics,resolve}=window.ShopifyFinder;
const form=document.getElementById('finder');
const problem=document.getElementById('problem');
const result=document.getElementById('result');
let current;
function text(id,value){document.getElementById(id).textContent=value;}
function render(){
 const value=resolve(problem.value,form.elements.device.value,form.elements.change.value);if(!value)return;
 current=value;const t=value.topic;
 text('result-title',t.title);text('first-check',t.check);text('context-check',value.context);text('device-check',value.device==='both'?'Compare the same page and action on mobile and desktop.':`Start on ${value.device}, then compare the same page on the other device type.`);text('why',t.why);text('evidence',t.evidence);text('avoid',t.avoid);text('verify',t.verify);
 document.getElementById('guide').href=`https://github.com/vistabylara-dev/vista-claude-skills/discussions/${t.guide}`;
 document.getElementById('whatsapp').href='https://wa.me/971507994292?text='+encodeURIComponent('Hello Dr Lara, I used your free Shopify Help Finder.\n'+value.summary);
 document.getElementById('service').href='https://www.vistabylara.com/services/shopify-development-dubai?utm_source=github&utm_medium=tool&utm_campaign=shopify_free_fixes&utm_content='+t.id+'#shopify-review';
 result.hidden=false;text('status','Your next checks are ready. This is guidance, not a diagnosis of your store.');
 history.replaceState(null,'','#'+t.id);
}
form.addEventListener('submit',e=>{e.preventDefault();render();document.getElementById('result-title').focus();});
document.getElementById('copy').addEventListener('click',async()=>{if(!current)return;try{await navigator.clipboard.writeText(current.summary);text('status','Summary copied. Add your theme name and public page URL before sharing.');}catch{text('status','Copy is unavailable in this browser. Use Print / save PDF to keep the result.');}});
document.getElementById('print').addEventListener('click',()=>window.print());
function fromHash(){const id=location.hash.slice(1);if(topics.some(t=>t.id===id)){problem.value=id;render();}}
window.addEventListener('hashchange',()=>{fromHash();if(current)document.getElementById('result-title').focus();});fromHash();
document.querySelectorAll('#library a[href^="#"]').forEach(link=>link.addEventListener('click',event=>{event.preventDefault();problem.value=link.getAttribute('href').slice(1);render();document.getElementById('result-title').focus();result.scrollIntoView({block:'start',behavior:'instant'});}));
