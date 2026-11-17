import {faceGrid,tokens} from './model.js';
const names={U:'顶',D:'底',F:'前',B:'后',R:'右',L:'左'};
const dirs={R:[1,0,0],L:[-1,0,0],U:[0,1,0],D:[0,-1,0],F:[0,0,1],B:[0,0,-1]};
const location=p=>(p[1]===1?'顶层':p[1]===-1?'底层':'中层')+(p[2]===1?'前':p[2]===-1?'后':'')+(p[0]===1?'右':p[0]===-1?'左':'');
const identity=p=>p.stickers.map(s=>s.face).sort().join('');
const target=p=>p.stickers.reduce((a,s)=>a.map((v,i)=>v+dirs[s.face][i]),[0,0,0]);
function cycles(state,size){const pieces=state.filter(p=>p.p[1]===1&&p.stickers.length===size),map=new Map(pieces.map(p=>[p.p.join(','),target(p)])),visited=new Set(),out=[];for(const p of pieces){let k=p.p.join(','),cycle=[];while(!visited.has(k)&&map.has(k)){visited.add(k);cycle.push(location(k.split(',').map(Number)));k=map.get(k).join(',');}if(cycle.length>1)out.push(cycle.join(' → ')+' → '+cycle[0]);}return out.length?out.join('；'):'已归位';}
export function lesson(c,state){if(c.recognize)return {recognize:c.recognize,explain:c.explain};let recognize,explain;
if(c.stage==='OLL'){const g=faceGrid(state,'U'),on=a=>a.filter(i=>g[i]==='U').length;const positions=['后左','后中','后右','左中','中心','右中','前左','前中','前右'].filter((_,i)=>g[i]==='U'&&i!==4);recognize=`${c.group}：${on([1,3,5,7])} 条白棱、${on([0,2,6,8])} 个白角朝上。按图握持时，顶面白色位于${positions.join('、')||'中心以外无白色'}。侧面白色也必须匹配。`;explain='保持前两层已完成，目标是统一最后一层朝向；顶层块的位置也可能改变。先对照白色图案，转 U 匹配；其他颜色的排列不影响 OLL 识别。完成后整个顶面为白色，再判断 PLL。';}
else if(c.stage==='PLL'){recognize=`按本示例的中心颜色与握持方向：角块 ${cycles(state,3)}；棱块 ${cycles(state,2)}。箭头表示当前块应去的位置。`;explain='顶面先全部朝上。根据侧面的同色块、车灯与中心色识别换位关系；转 U 调整到图示，再执行完整公式。实际复原最后按需要补 U、U\' 或 U2 对齐。';}
else {const corner=state.find(p=>identity(p)==='DFR'),edge=state.find(p=>identity(p)==='FR');const white=corner.stickers.find(s=>s.face==='D');const whiteFace=Object.entries(dirs).find(([,n])=>n.every((v,i)=>v===white.n[i]))[0];recognize=`本站 F2L 编号采用 Cubeathon 顺序，不同教程编号可能不同。目标为黄绿红角 + 绿红棱，归入右前槽。角块在${location(corner.p)}，黄色朝${names[whiteFace]}；棱块在${location(edge.p)}。对照展开图看它们是否已正确连接。`;explain=`先定位角棱，再观察公式如何${corner.p[1]===-1||edge.p[1]===0?'将槽内的块取出并重新配对':'调整顶层相对位置并配对'}，最后一起归入右前槽。练习时跟踪这两个块；底十字和另外三个已完成槽应保持完整。`;}
const special=[...new Set(tokens(c.alg).map(t=>t[0]).filter(t=>/[rludfbMESxyz]/.test(t)))];if(special.length)explain+=' 注意 '+special.join(' / ')+' 是宽转、中层或整颗转体，含义见下方记号表。';if(c.adjustment)explain+=' 末尾 '+c.adjustment+' 为演示补回的握持方向，不改变块之间的位置关系。';return {recognize,explain};}
