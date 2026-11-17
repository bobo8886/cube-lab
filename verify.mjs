import assert from 'node:assert/strict';
import {cases} from './dist/data.js';
import {solved,setup,move,tokens,invert,faceGrid} from './dist/model.js';
const faces=['U','D','F','B','R','L'];
const signature=s=>faces.map(f=>faceGrid(s,f).join('')).join('');
const good=signature(solved());
for(const t of ['R','L','U','D','F','B','M','E','S','r','l','u','d','f','b','x','y','z']){let s=solved();for(let i=0;i<4;i++)move(s,t);assert.equal(signature(s),good,t+' four turns');move(s,t);move(s,invert(t));assert.equal(signature(s),good,t+' inverse');}
for(const c of cases){const s=setup(c.alg);assert.equal(s.flatMap(p=>p.stickers).length,54);for(const f of faces)assert.equal(faceGrid(s,f).filter(Boolean).length,9,c.id+' face grid');if(['OLL','PLL'].includes(c.stage)){assert.ok(faceGrid(s,'D').every(f=>f==='D'),c.id+' bottom');for(const f of ['F','B','R','L'])assert.ok(faceGrid(s,f).slice(3).every(v=>v===f),c.id+' lower layers');}if(c.stage==='PLL')assert.ok(faceGrid(s,'U').every(f=>f==='U'),c.id+' PLL orientation');for(const t of tokens(c.alg))move(s,t);assert.equal(signature(s),good,c.id+' solves');console.log('PASS',c.id);}
const expected={line:2,elbow:2,dot:0,sune:4,antisune:4,'h-oll':4,pi:4,'t-oll':4,'l-oll':4,'u-oll':4};
for(const [id,n] of Object.entries(expected)){const g=faceGrid(setup(cases.find(c=>c.id===id).alg),'U');assert.equal([1,3,5,7].filter(i=>g[i]==='U').length,n,id+' yellow edges');}
const full=cases.filter(c=>c.scope==='full');
for(const [stage,count] of [['OLL',57],['PLL',21],['F2L',41]])assert.equal(full.filter(c=>c.stage===stage).length,count,stage+' count');
const mask=s=>faces.map(f=>faceGrid(s,f).map(v=>v==='U'?'1':'0').join('')).join('');
const canonicalOLL=s=>{const variants=[];for(let i=0;i<4;i++){variants.push(mask(s));move(s,'U');}return variants.sort()[0];};
const canonicalPLL=s=>{const variants=[];for(let i=0;i<4;i++){for(let j=0;j<4;j++){const remap=Object.fromEntries(faces.map(f=>[faceGrid(s,f)[4],f]));variants.push(faces.map(f=>faceGrid(s,f).map(v=>remap[v]).join('')).join(''));move(s,'y');}move(s,'U');}return variants.sort()[0];};
for(const [stage,canonical] of [['OLL',canonicalOLL],['PLL',canonicalPLL]]){const seen=new Set();for(const c of full.filter(c=>c.stage===stage)){const key=canonical(setup(c.alg));assert.ok(!seen.has(key),c.id+' duplicate case');assert.notEqual(key,canonical(solved()),c.id+' already solved');seen.add(key);}console.log(stage,seen.size,'distinct non-solved cases');}
const pieceId=p=>p.stickers.map(t=>t.face).sort().join('');
const pieceKey=p=>JSON.stringify([p.p,p.stickers.map(t=>[t.face,t.n]).sort()]);
const pairKey=s=>s.filter(p=>['DFR','FR'].includes(pieceId(p))).map(pieceKey).join('|');
const canonicalPair=s=>{const variants=[];for(let i=0;i<4;i++){variants.push(pairKey(s));move(s,'U');}return variants.sort()[0];};
const f2lKeys=new Set();for(const c of full.filter(c=>c.stage==='F2L')){const s=setup(c.alg);for(const p of solved().filter(p=>p.p[1]<=0&&!['DFR','FR'].includes(pieceId(p))))assert.equal(pieceKey(s.find(q=>pieceId(q)===pieceId(p))),pieceKey(p),c.id+' preserved piece');const k=canonicalPair(s);assert.ok(!f2lKeys.has(k),c.id+' duplicate');assert.notEqual(k,canonicalPair(solved()),c.id+' solved');f2lKeys.add(k);}
console.log('PASS: 119 complete CFOP cases + 19 beginner examples; uniqueness, preserved layers, notation and inverse execution.');
