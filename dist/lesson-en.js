import {faceGrid,tokens} from './model.js';
import {t} from './i18n.js?v=20261117-cards';
const beginner={
cross:['Watch the white-green edge. Match it with the green center, then send it down with F2.','This is a single-edge example. A real cross needs all four white edges on the bottom, with their side colors matching the centers.'],
pair:['An already paired corner and edge can be inserted into the front-right slot.',"U positions the pair; R opens the slot, U' moves the pair in, and R' closes it. Keep the pair together."],
'pair-left':['The mirror of the basic right-slot insertion.',"U' positions the pair, L' opens the front-left slot, U inserts the pair, and L closes it. Understand pairing before reducing cube rotations."],
line:['Two yellow top edges face up in a horizontal line.',"Focus on the edges, not the corners. Open with F, perform R U R' U', and close with F' to form the yellow cross."],
elbow:['Two adjacent yellow edges face up. Match the orientation in the diagram.',"Use the same trigger as the line case, but f turns both front layers. Ignore corner orientation for now."],
dot:['None of the four top edges has yellow facing up; only the center does.',"Apply the line algorithm followed by the L-shape algorithm without rotating the whole cube between them. Check for a yellow cross afterward."],
sune:['The yellow cross is solved and exactly one yellow corner faces up. Use the side stickers to distinguish Sune from Anti-Sune.',"Learn it as R U R', then U, then R U2 R'. Watch the corners change orientation; their final positions are not the goal yet."],
antisune:['Exactly one yellow corner faces up, but the side stickers differ from Sune.',"This is the inverse of Sune: R U2 R', then U', then R U' R'. Do not identify it from the top silhouette alone."],
'h-oll':['The yellow cross is solved, but no yellow corner faces up. Inspect yellow corner stickers on opposite sides.',"Recognize the sides, then learn the right-hand sequence in chunks. Once all yellow corners face up, move to PLL without trying to align the sides yet."],
pi:['No yellow corner faces up, but the side pattern differs from H.',"Pay attention to the repeated R2 turns. Either direction gives the same 180° result, so prioritize a stable grip."],
't-oll':['Two yellow corners face up. Check the other corner stickers against the diagram.',"r turns the two right layers; R turns only the right face. Distinguish wide turns from face turns to preserve the first two layers."],
'l-oll':['Two diagonally opposite yellow corners face up.',"Check both the top and sides before starting. Do not omit the opening F' or the final F and R moves."],
'u-oll':['Two adjacent yellow corners face up; the side stickers differ from T.',"D turns the bottom layer. Judge clockwise while looking directly at the bottom face. The D and D' moves restore that layer by the end."],
't-perm':['For adjacent corner permutation in 2-look PLL, find a pair of same-colored corner stickers (headlights).',"Hold the headlights on the left. This algorithm also swaps two edges; in 2-look PLL, solve the corners first and handle the edges afterward."],
'y-perm':['With yellow fully oriented, no side has corner headlights. Use this case for diagonal corner permutation.',"Practice the long algorithm in two parts. Then align the corners with U and identify the remaining edge cycle."],
ua:['The corners are aligned and three top edges need to cycle. Check their direction using the diagram.',"Place the already solved edge at the back. Use Ub if the required cycle goes the other way."],
ub:['The edge cycle runs in the opposite direction to Ua. Use the side centers to find each destination.',"Keep the solved edge at the back. Ua and Ub are inverses, so practice them together."],
'h-perm':['All four edges are misplaced: the front/back and left/right edges swap in opposite pairs.',"M is the middle slice between L and R, turning in the same direction as L. Here every slice turn is M2, so the 180° direction does not matter."],
'z-perm':['The four top edges swap in two adjacent pairs. Match the diagram orientation.',"Identify the two adjacent swaps first. The final U2 is the adjustment of the U face (AUF) for this example; do not omit it."]
};
const dirs={R:[1,0,0],L:[-1,0,0],U:[0,1,0],D:[0,-1,0],F:[0,0,1],B:[0,0,-1]};
const names={U:'up',D:'down',F:'front',B:'back',R:'right',L:'left'};
const location=p=>[p[1]===1?'top':p[1]===-1?'bottom':'middle',p[2]===1?'front':p[2]===-1?'back':'',p[0]===1?'right':p[0]===-1?'left':''].filter(Boolean).join('-');
function cycles(state,size){const pieces=state.filter(p=>p.p[1]===1&&p.stickers.length===size),map=new Map(pieces.map(p=>[p.p.join(','),p.stickers.reduce((a,s)=>a.map((v,i)=>v+dirs[s.face][i]),[0,0,0])])),visited=new Set(),out=[];for(const p of pieces){let k=p.p.join(','),cycle=[];while(!visited.has(k)&&map.has(k)){visited.add(k);cycle.push(location(k.split(',').map(Number)));k=map.get(k).join(',');}if(cycle.length>1)out.push([...cycle,cycle[0]].join(' → '));}return out.length?out.join('; '):'already in place';}
export function lessonEnglish(c,state){
 if(beginner[c.id]){const [recognize,explain]=beginner[c.id];return {recognize,explain};}
 let recognize,explain;
 if(c.stage==='OLL'){
  const g=faceGrid(state,'U'),on=a=>a.filter(i=>g[i]==='U').length;
  const positions=['back-left','back-center','back-right','left-center','center','right-center','front-left','front-center','front-right'].filter((_,i)=>g[i]==='U'&&i!==4);
  recognize=`${t(c.group)}: ${on([1,3,5,7])} yellow edges and ${on([0,2,6,8])} yellow corners face up. With the illustrated grip, yellow appears at: ${positions.join(', ')||'the center only'}. Match the yellow stickers on the sides too.`;
  explain='Keep the first two layers solved and orient the last layer. Piece positions may change. Match the yellow pattern with U turns; the arrangement of other colors does not affect OLL recognition. Once the whole top is yellow, identify PLL.';
 }else if(c.stage==='PLL'){
  recognize=`Using the centers and grip shown: corners — ${cycles(state,3)}; edges — ${cycles(state,2)}. Arrows show where each piece needs to go.`;
  explain="Start with the last layer fully oriented. Use matching side stickers, headlights and center colors to recognize the permutation. Adjust U to match the diagram, perform the algorithm, then finish with U, U' or U2 if needed.";
 }else{
  const identity=p=>p.stickers.map(s=>s.face).sort().join(''),corner=state.find(p=>identity(p)==='DFR'),edge=state.find(p=>identity(p)==='FR');
  const white=corner.stickers.find(s=>s.face==='D'),whiteFace=Object.entries(dirs).find(([,n])=>n.every((v,i)=>v===white.n[i]))[0];
  recognize=`F2L numbering follows Cubeathon and may differ from other tutorials. Solve the white-green-red corner and green-red edge into the front-right slot. The corner is at ${location(corner.p)}, with white facing ${names[whiteFace]}; the edge is at ${location(edge.p)}. Use the diagram to check whether they are correctly paired.`;
  explain=`Locate the two pieces, then watch how the algorithm ${corner.p[1]===-1||edge.p[1]===0?'extracts and re-pairs pieces from the slot':'adjusts their relative positions on top and pairs them'} before inserting them together. Track both pieces. The bottom cross and the other three solved slots should remain intact.`;
 }
 const special=[...new Set(tokens(c.alg).map(t=>t[0]).filter(t=>/[rludfbMESxyz]/.test(t)))];
 if(special.length)explain+=` Note: ${special.join(' / ')} denotes wide turns, slice moves or whole-cube rotations. See the notation guide below.`;
 if(c.adjustment)explain+=` The final ${c.adjustment} restores the demonstration grip without changing the pieces’ relative positions.`;
 return {recognize,explain};
}
