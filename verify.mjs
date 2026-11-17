import assert from 'node:assert/strict';
import {cases} from './dist/data.js';
import {solved,setup,move,tokens,invert,faceGrid} from './dist/model.js';
const faces=['U','D','F','B','R','L'];
const signature=s=>faces.map(f=>faceGrid(s,f).join('')).join('');
const good=signature(solved());
for(const t of ['R','L','U','D','F','B','M','r','f']){let s=solved();for(let i=0;i<4;i++)move(s,t);assert.equal(signature(s),good,t+' four turns');move(s,t);move(s,invert(t));assert.equal(signature(s),good,t+' inverse');}
for(const c of cases){const s=setup(c.alg);assert.equal(s.flatMap(p=>p.stickers).length,54);for(const f of faces)assert.equal(faceGrid(s,f).filter(Boolean).length,9,c.id+' face grid');if(['OLL','PLL'].includes(c.stage)){assert.ok(faceGrid(s,'D').every(f=>f==='D'),c.id+' bottom');for(const f of ['F','B','R','L'])assert.ok(faceGrid(s,f).slice(3).every(v=>v===f),c.id+' lower layers');}if(c.stage==='PLL')assert.ok(faceGrid(s,'U').every(f=>f==='U'),c.id+' PLL orientation');for(const t of tokens(c.alg))move(s,t);assert.equal(signature(s),good,c.id+' solves');console.log('PASS',c.id);}
const expected={line:2,elbow:2,dot:0,sune:4,antisune:4,'h-oll':4,pi:4,'t-oll':4,'l-oll':4,'u-oll':4};
for(const [id,n] of Object.entries(expected)){const g=faceGrid(setup(cases.find(c=>c.id===id).alg),'U');assert.equal([1,3,5,7].filter(i=>g[i]==='U').length,n,id+' yellow edges');}
console.log('All 19 cases verified: inverse, face grids, F2L preservation and PLL orientation.');
