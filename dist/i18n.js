// Explicit translations; notation, case IDs and saved learning data never change.
let language='zh';
try { if(localStorage.getItem('cube-language')==='en')language='en'; } catch {}
export const getLanguage=()=>language;
export const tr=(zh,en)=>language==='en'?en:zh;
export const dictionary={
'轻拧':'Cubeflow',
'轻拧 CUBEFLOW · 把每一步，拧明白。':'CUBEFLOW · Understand every turn.',
'从理解到肌肉记忆：中文 CFOP 速拧教程、完整 57 OLL、21 PLL、41 F2L 公式和可逐步播放的 3D 魔方。':'Learn CFOP with 57 OLL, 21 PLL and 41 F2L cases, clear explanations and step-by-step 3D playback.',
'学习路线':'Learning path','公式实验室':'Algorithm lab','练习计划':'Practice','参考资料 ↗':'Resources ↗',
'切换明暗主题':'Switch theme','深色':'Dark','浅色':'Light','切换浅色主题':'Switch to light theme','切换深色主题':'Switch to dark theme',
'开始练习':'Start learning','把每一步，':'Understand','拧明白。':'every turn.',
'从理解每一个动作，到享受流畅复原。':'Understand each move. Enjoy a smoother solve.',
'让 119 个 CFOP 案例，成为你的肌肉记忆。':'Build muscle memory with 119 CFOP cases.',
'探索公式实验室':'Explore the lab','先了解 CFOP ↓':'Discover CFOP ↓','三维魔方展示':'3D cube preview',
'F2L 配对案例':'F2L pairs','OLL 顶面定向':'OLL orientations','PLL 顶层换位':'PLL permutations',
'一个动作，一个突破。':'One move. One breakthrough.','从入门到完整 CFOP，按自己的节奏学习。':'From the basics to full CFOP, at your own pace.',
'一颗魔方，四个阶段。':'One cube. Four stages.',
'先学会稳定复原，再追求更少的停顿。':'Build consistent solves, then reduce pauses.',
'推荐起点：直觉 F2L + 两步 OLL + 两步 PLL。':'Start with intuitive F2L, 2-look OLL and 2-look PLL.',
'底层十字':'Bottom cross','拼好底部四条棱，让侧面也对齐中心。先规划，再动手。':'Solve the four bottom edges and match their side centers. Plan before turning.',
'从观察开始 ↗':'Start observing ↗','前两层配对':'First two layers',
'把角棱配成一组再归槽。公式库收录 41 个标准非复原情况。':'Pair a corner and an edge, then insert them. Explore 41 standard unsolved cases.',
'理解配对 ↗':'Understand pairs ↗','统一顶面朝向':'Orient the last layer',
'完整 OLL 共 57 种情况，一次统一顶色；也可从 10 个两步法公式入门。':'Full OLL has 57 cases. Start with 10 algorithms for 2-look OLL if you prefer.',
'学习顶面公式 ↗':'Learn OLL ↗','顶层块归位':'Permute the last layer',
'完整 PLL 共 21 种情况，一次完成换位；入门可先学两步法的 6 个公式。':'Full PLL has 21 cases. Beginners can start with 6 algorithms for 2-look PLL.',
'完成最后一步 ↗':'Finish the solve ↗','第一次接触魔方？':'New to cubing?',
'先熟悉六个面与转动记号；还不能独立复原时，可先跟随':'Learn the six faces and move notation first. For your first solve, follow',
'J Perm 入门复原教程 ↗':"J Perm’s beginner tutorial ↗",'。这里的重点是从入门过渡到 CFOP。':'. This site helps you progress from beginner solving to CFOP.',
'把公式，看成动作。':'See algorithms in motion.',
'选择案例，观察结构，再逐步跟练。每一步，都有迹可循。':'Choose a case, study its pattern, and follow each move.',
'学习范围':'Library','完整公式库 · 119 案例':'Full CFOP · 119 cases','两步法入门 · 19 示例':'Beginner · 19 examples',
'公式阶段':'CFOP stage','搜索名称、编号或公式…':'Search name, number or moves…','搜索公式':'Search algorithms','两步 OLL':'2-look OLL',
'选择案例':'Choose a case','⤢ 恢复视角':'⤢ Reset view','可拖动旋转视角的公式三维演示':'Interactive 3D algorithm demonstration',
'拖动旋转视角 · 滚轮缩放':'Drag to rotate · Scroll to zoom','公式进度':'Algorithm progress','公式播放进度':'Playback progress',
'回到案例初始状态':'Return to the starting state','重置案例':'Reset case','上一步':'Previous move','下一步':'Next move',
'▶ 播放':'▶ Play','Ⅱ 暂停':'Ⅱ Pause','↺ 重播':'↺ Replay','动画速度':'Playback speed',
'空格 播放 / 暂停':'Space: play / pause','← → 单步':'← → Step',
'案例解析':'Case breakdown','☆ 标记已掌握':'☆ Mark as learned','✓ 已掌握':'✓ Learned',
'动作序列':'Move sequence','点击任一步定位':'Click a move to seek','复制公式':'Copy algorithm','已复制':'Copied','请选中公式复制':'Select the algorithm to copy',
'如何识别':'Recognition','公式初始状态六面展开图':'Six-face diagram of the starting state','初始状态六面展开图':'Six-face diagram of the starting state',
'初始状态展开图 · U 顶 / F 前 / R 右':'Starting state · U top / F front / R right',
'初始握持：白底黄顶、绿前红右。':'Starting grip: white down, yellow up, green front, red right.',
'OLL 看黄色朝向；PLL 看侧面换位；F2L 看目标角棱。':'OLL: yellow orientation. PLL: side permutations. F2L: target pair.',
'动作解析':'How it works',
"示范从公式逆操作生成；OLL 仅需顶面同色，实际完成后侧面不一定复原。PLL 最后可能需要 U / U' / U2 对齐。":"Demos start from the inverse algorithm. OLL only orients the top; the sides may still be unsolved. PLL may need a final U / U' / U2 adjustment.",
'读懂魔方的语言。':'Read the language of cubing.','顺逆时针都从':'Judge clockwise and counterclockwise while',
'正对被转动的那个面':'looking directly at the face being turned','判断，':',','不是始终从你面前看。':'not always from your front view.',
'右面 / 左面':'Right / Left','顶面 / 底面':'Up / Down','前面 / 后面':'Front / Back',
'右面顺时针 90°':'Right face, clockwise 90°','右面逆时针 90°':'Right face, counterclockwise 90°','右面转 180°':'Right face, 180°',
'右 / 前两层一起转':'Right / front two layers','中层，方向同 L':'Middle slice, same direction as L','最后的顶层对齐':'Final adjustment of the U face',
'左 / 顶 / 底 / 后两层':'Left / up / down / back two layers','整颗转体，方向同 R / U / F':'Whole-cube rotations, like R / U / F','中层，方向同 D / F':'Slices, same direction as D / F',
'慢慢转，才会慢慢快。':'Slow turns. Steady progress.','一套可重复的 20 分钟练习。':'A repeatable 20-minute practice routine.',
'不必每天加新公式，先把旧动作练流畅。':'Make familiar moves smooth before adding new algorithms.',
'只观察十字':'Plan the cross','先找到四条底棱，想好前几步再开始。':'Find the four bottom edges and plan your opening moves.',
'慢拧 F2L':'Slow F2L','找角棱、配对、归槽。练习时宁可慢，也尽量不暂停。':'Find, pair, insert. Turn slowly and aim to avoid pauses.',
'一次只练一组':'One group at a time','先辨认，再默念，最后执行。把易混案例成对比较。':'Recognize, recall, execute. Compare similar cases side by side.',
'完整复原与复盘':'Solve and review','记录一次完整复原，回想停顿在哪里，不只盯着秒数。':'Time a full solve, then review your pauses, not just your time.',
'专注这一遍':'Focus on this solve','练习计时':'Practice timer','开始计时':'Start timer','停止并记录':'Stop & save','再练一次':'Try again',
'点击按钮开始 / 停止 · 成绩仅保存在此浏览器':'Click to start / stop · Times stay in this browser',
'还没有记录，开始你的第一次练习。':'No times yet. Start your first practice solve.','清空练习记录':'Clear times','准备好进阶了吗？':'Ready for the next step?',
'先让直觉 F2L 与两步法变得稳定，再逐渐补齐 21 个 PLL，最后按需学习完整 57 个 OLL。本页已收录完整 57 OLL、21 PLL 和常见 41 F2L；入门与完整库可随时切换。Cross 依靠观察规划，没有固定的有限公式全集。':'Get comfortable with intuitive F2L and 2-look methods, then learn all 21 PLLs and gradually add the 57 OLLs. Switch between beginner and full libraries anytime. Cross solving relies on inspection and planning, rather than a fixed list of algorithms.',
'有出处，也有下一步。':'Sources for your next step.','参考原教程整理，中文解释与交互演示为本站制作。':'Based on the tutorials below, with original explanations and interactive demos.',
'检索与核对：2026 年 11 月 17 日。':'Sources checked: November 17, 2026.',
'J Perm · CFOP 教学':'J Perm · CFOP guide','四阶段讲解、学习路径与视频':'Four-stage guide, learning path and videos',
'J Perm · 完整 OLL / PLL':'J Perm · Full OLL / PLL','57 OLL 与 21 PLL，案例内附直接来源':'57 OLLs and 21 PLLs, with sources linked in each case',
'Cubeathon · 41 个 F2L':'Cubeathon · 41 F2L cases','完整右前槽案例；本站 F2L 编号采用该站顺序':'Front-right slot cases; this site follows Cubeathon numbering',
'CubeSkills · 公式参考 PDF':'CubeSkills · Algorithm reference PDF','核对 OLL / PLL 记号与公式；含进阶案例':'OLL / PLL notation and algorithms, including advanced cases',
'让每一次转动，都有方向。':'Make every turn count.',
'没有匹配的案例，试试名称、编号或公式。':'No matching cases. Try a name, number or algorithm.',
'无匹配案例，请修改搜索':'No matches — try another search','十字观察示例':'Cross examples','完整 ':'Full ','入门 ':'Beginner ',
'本次演示完成':'Demonstration complete','案例起始状态':'Starting state','继续观察下一步':'Watch the next move',
'已完成公式。点击重置可回到初始状态，再独立练习一遍。':'Algorithm complete. Reset to the starting state and try it on your own.',
'下一步 ':'Next: ','查看本案例公式来源 ↗':'View algorithm source ↗','查看入门参考教程 ↗':'View beginner tutorial ↗',
'顶面朝向':'Last-layer orientation','顶层换位':'Last-layer permutation','配对与插入':'Pairing and insertion',
'此设备无法启动 WebGL。仍可用展开图、公式和逐步解析学习。':'WebGL is unavailable. You can still learn with diagrams, algorithms and explanations.',
'仅棱换位':'Edges only','邻角交换':'Adjacent corners','对角交换':'Diagonal corners','P 形':'P shape','T 形':'T shape','C 形':'C shape','W 形':'W shape',
'点形':'Dot','一字形':'Line','方块形':'Square','小闪电':'Small lightning bolt','大闪电':'Large lightning bolt','鱼形':'Fish','骑士形':'Knight','黄十字':'Yellow cross','角已定向':'Corners oriented','不规则形':'Irregular','小 L 形':'Small L',
'角棱都在顶层':'Both pieces on top','角在槽内 · 棱在顶层':'Corner in slot · edge on top','角在顶层 · 棱在槽内':'Corner on top · edge in slot','角棱都在槽内':'Both pieces in slot',
'十字练习':'Cross practice','右槽插入':'Right-slot insertion','左槽插入':'Left-slot insertion','棱块 · 一字形':'Edges · Line','棱块 · 小拐角':'Edges · L shape','棱块 · 点形':'Edges · Dot','Sune · 小鱼':'Sune','Anti-Sune · 反小鱼':'Anti-Sune','角块 · H 形':'Corners · H shape','角块 · π 形':'Corners · Pi shape','角块 · T 形':'Corners · T shape','角块 · L 形':'Corners · L shape','角块 · U 形':'Corners · U shape','T Perm · 邻角交换':'T Perm · Adjacent corners','Y Perm · 对角交换':'Y Perm · Diagonal corners','Ua Perm · 三棱循环':'Ua Perm · Three-edge cycle','Ub Perm · 反向三棱':'Ub Perm · Reverse edge cycle','H Perm · 对棱交换':'H Perm · Opposite edges','Z Perm · 邻棱交换':'Z Perm · Adjacent edges'
};
export function t(text){return language==='en'?(dictionary[text]??text):text;}
export function caseName(c){if(language==='zh')return c.name;if(dictionary[c.name])return dictionary[c.name];const split=c.name.indexOf(' · ');return split<0?c.name:c.name.slice(0,split+3)+t(c.name.slice(split+3));}
const staticText=[],staticAttrs=[];
export function initLanguage(onChange){
 const walker=document.createTreeWalker(document.documentElement,NodeFilter.SHOW_TEXT);
 while(walker.nextNode()){const node=walker.currentNode;if(node.parentElement.closest('script,style,#language-dialog'))continue;const key=node.textContent.trim();if(dictionary[key])staticText.push({node,original:node.textContent,key});}
 document.querySelectorAll('[aria-label],[title],[placeholder],meta[name="description"]').forEach(el=>{for(const attr of ['aria-label','title','placeholder','content']){const value=el.getAttribute(attr);if(value&&dictionary[value])staticAttrs.push({el,attr,value});}});
 const dialog=document.querySelector('#language-dialog'),select=document.querySelector('#language-choice'),trigger=document.querySelector('#language-toggle');
 function apply(){document.documentElement.lang=language==='en'?'en':'zh-CN';for(const {node,original,key} of staticText)if(node.isConnected)node.textContent=language==='en'?original.replace(key,dictionary[key]):original;for(const {el,attr,value} of staticAttrs)el.setAttribute(attr,t(value));trigger.textContent=language==='en'?'EN / 中文':'中文 / EN';trigger.setAttribute('aria-label',tr('选择语言','Choose language'));onChange();}
 function open(){select.value=language;dialog.showModal();}
 function commit(){language=select.value==='en'?'en':'zh';try{localStorage.setItem('cube-language',language);}catch{}apply();dialog.close();trigger.focus();}
 trigger.onclick=open;document.querySelector('#language-form').onsubmit=e=>{e.preventDefault();commit();};
 dialog.addEventListener('cancel',e=>{e.preventDefault();select.value=language;commit();});
 apply();let saved=null;try{saved=localStorage.getItem('cube-language');}catch{}if(saved!=='en'&&saved!=='zh')open();
}
