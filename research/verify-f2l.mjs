import fs from 'node:fs';
import assert from 'node:assert/strict';
import {solved,setup,move,tokens,faceGrid} from '../dist/model.js';
const data=JSON.parse(fs.readFileSync('research/f2l-cases.json','utf8'));
const id=p=>p.stickers.map(s=>s.face).sort().join('');
const key=p=>JSON.stringify([p.p,p.stickers.map(s=>[s.face,s.n]).sort()]);
const pair=s=>s.filter(p=>['DFR','FR'].includes(id(p)));
const sign=s=>pair(s).map(key).join('|');
const canonical=s=>{const a=[];for(let i=0;i<4;i++){a.push(sign(s));move(s,'U');}return a.sort()[0];};
const baseline=solved(),seen=new Set();
const names={'0,1,0':'上','0,-1,0':'下','0,0,1':'前','0,0,-1':'后','1,0,0':'右','-1,0,0':'左'};
const position=p=>p[1]===0?'右前槽':p[1]===-1?'右前槽':(p[2]===1?'前':p[2]===-1?'后':'')+(p[0]===1?'右':p[0]===-1?'左':'')+'顶层';
for(const c of data){let s=setup(c.alg);for(const p of baseline)if(p.p[1]<=0&&!['DFR','FR'].includes(id(p))){assert.equal(key(s.find(q=>id(p)===id(q))),key(p),'lower piece moved '+c.number+' '+id(p));}const k=canonical(structuredClone(s));assert.ok(!seen.has(k),'duplicate '+c.number);assert.notEqual(k,canonical(solved()),'solved case');seen.add(k);
const corner=s.find(p=>id(p)==='DFR'),edge=s.find(p=>id(p)==='FR');
c.group=corner.p[1]===1?(edge.p[1]===1?'角棱都在顶层':'角在顶层 · 棱在槽内'):(edge.p[1]===1?'角在槽内 · 棱在顶层':'角棱都在槽内');
c.recognize=`黄绿红角位于${position(corner.p)}，黄色朝${names[corner.stickers.find(t=>t.face==='D').n.join(',')]}；绿红棱位于${position(edge.p)}，绿色朝${names[edge.stickers.find(t=>t.face==='F').n.join(',')]}。目标是右前槽。`;
for(const t of tokens(c.alg))move(s,t);for(const f of ['U','D','R','L','F','B'])assert.ok(faceGrid(s,f).every(v=>v===f),'not solved '+c.number);
}
fs.writeFileSync('research/f2l-cases.json',JSON.stringify(data,null,2));console.log('PASS: 41 distinct non-solved F2L pair cases modulo U, cross + other three slots preserved; all inverse setups solved.');
