import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';

// Storage can be blocked in private/restricted browsing. Chinese must still work.
const fallback=spawnSync(process.execPath,['--input-type=module','-e',"globalThis.localStorage={getItem(){throw Error('blocked')}};const {getLanguage}=await import('./dist/i18n.js');if(getLanguage()!=='zh')process.exit(1);"],{encoding:'utf8'});
assert.equal(fallback.status,0,fallback.stderr);
globalThis.localStorage={getItem:()=> 'en'};
const {dictionary,caseName,getLanguage}=await import('./dist/i18n.js');
const {lesson}=await import('./dist/lesson.js');
const {cases}=await import('./dist/data.js');
const {setup}=await import('./dist/model.js');
assert.equal(getLanguage(),'en');
for(const c of cases){
 const state=setup(c.alg),before=JSON.stringify(state),translated=lesson(c,state);
 for(const value of [caseName(c),translated.recognize,translated.explain]){
  assert.ok(value.length>0,c.id+' has empty English text');
  assert.ok(!/[\u4e00-\u9fff]/u.test(value),c.id+' has untranslated text: '+value);
  assert.ok(!/undefined|\[object Object\]/.test(value),c.id+' has broken interpolation');
 }
 assert.equal(JSON.stringify(state),before,c.id+' translation changed cube state');
}
// Catch newly added Chinese page copy that has not been translated.
const html=readFileSync(new URL('./dist/index.html',import.meta.url),'utf8').replace(/<dialog\b[\s\S]*?<\/dialog>/g,'').replace(/<script\b[\s\S]*?<\/script>/g,'');
for(const match of html.matchAll(/>([^<]+)</g)){
 const key=match[1].trim();
 if(/[\u4e00-\u9fff]/u.test(key)&&key!=='中文 / EN')assert.ok(dictionary[key],'Missing page translation: '+key);
}
for(const match of html.matchAll(/(?:aria-label|placeholder|title|content)="([^"]+)"/g)){
 const key=match[1];
 if(/[\u4e00-\u9fff]/u.test(key)&&key!=='选择语言')assert.ok(dictionary[key],'Missing attribute translation: '+key);
}
console.log(`PASS: English names and explanations for ${cases.length} cases, static copy coverage, state integrity, and Chinese storage fallback.`);
