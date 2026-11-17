import * as THREE from 'three';
import {OrbitControls} from './vendor/OrbitControls.js';
import {cases} from './data.js';
import {lesson} from './lesson.js';
import {colors,solved,tokens,invert,spec,affected,move,setup,faceGrid} from './model.js';
const $=s=>document.querySelector(s);
const read=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key))??fallback;}catch{return fallback;}};
const save=(key,v)=>{try{localStorage.setItem(key,JSON.stringify(v));}catch{}};
let learned=new Set(read('cube-learned',[])),times=read('cube-times',[]),selected=cases.find(c=>c.id==='oll-27'),scope='full',filter='OLL',step=0,playing=false,busy=false,state=setup(selected.alg);
let animation=null,run=0,raf=null;
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
function requestRender(){if(raf===null&&!document.hidden)raf=requestAnimationFrame(frame);}
const bodyGeo=new THREE.BoxGeometry(.94,.94,.94),tileGeo=new THREE.PlaneGeometry(.82,.82),bodyMat=new THREE.MeshStandardMaterial({color:'#101010',roughness:.52});
// Sticker colors must stay consistent with the diagrams under every viewing angle.
const mats=Object.fromEntries(Object.entries(colors).map(([f,c])=>[f,new THREE.MeshBasicMaterial({color:c,toneMapped:false})]));
function sceneAt(el,interactive){
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(34,1,.1,100);
 camera.position.set(6,4.8,7);camera.lookAt(0,0,0);
 const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,precision:'highp'});
 renderer.setPixelRatio(Math.min(Math.max(devicePixelRatio,2),3));renderer.setClearColor(0,0);renderer.outputColorSpace=THREE.SRGBColorSpace;el.append(renderer.domElement);
 scene.add(new THREE.AmbientLight(0xffffff,2.4));const light=new THREE.DirectionalLight(0xffffff,3);light.position.set(3,7,6);scene.add(light);
 const root=new THREE.Group();scene.add(root);
 const v={scene,camera,renderer,root,controls:null,visible:true,dirty:true,cubelets:[]};
 if(interactive){v.controls=new OrbitControls(camera,renderer.domElement);v.controls.enablePan=false;v.controls.minDistance=6;v.controls.maxDistance=16;v.controls.enableDamping=true;v.controls.dampingFactor=.1;v.controls.addEventListener('change',()=>{v.dirty=true;requestRender();});}
 new ResizeObserver(()=>{const w=el.clientWidth,h=el.clientHeight;if(!w||!h)return;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();v.dirty=true;requestRender();}).observe(el);
 new IntersectionObserver(entries=>{v.visible=entries[0].isIntersecting;if(v.visible){v.dirty=true;requestRender();}},{rootMargin:'80px'}).observe(el);
 return v;
}
const normal=new THREE.Vector3(),front=new THREE.Vector3(0,0,1);
function fill(v,data){
 for(let i=0;i<data.length;i++){const piece=data[i];let g=v.cubelets[i];
  if(!g){g=new THREE.Group();g.add(new THREE.Mesh(bodyGeo,bodyMat));for(const sticker of piece.stickers)g.add(new THREE.Mesh(tileGeo,mats[sticker.face]));v.cubelets.push(g);}
  v.root.add(g);g.position.set(...piece.p);g.quaternion.identity();g.userData.piece=piece;
  piece.stickers.forEach((sticker,j)=>{const tile=g.children[j+1];normal.set(...sticker.n);tile.position.copy(normal).multiplyScalar(.476);tile.quaternion.setFromUnitVectors(front,normal);tile.material=mats[sticker.face];});
 }
 v.dirty=true;requestRender();
}
let view,hero;try{view=sceneAt($('#cube-view'),true);hero=sceneAt($('#hero-cube'),false);fill(view,state);const hs=solved();move(hs,'U');move(hs,"R'");move(hs,'F2');fill(hero,hs);hero.camera.position.set(6,5.5,7.5);hero.camera.lookAt(0,0,0);}catch(e){$('#cube-view').innerHTML='<p style="padding:30px">此设备无法启动 WebGL。仍可用展开图、公式和逐步解析学习。</p>';console.warn(e);}
function frame(now){
 raf=null;if(document.hidden)return;
 if(animation){const a=animation;const fraction=a.duration===0?1:Math.min(1,(now-a.start)/a.duration);a.pivot.rotation[['x','y','z'][a.s.axis]]=a.s.angle*(.5-.5*Math.cos(Math.PI*fraction));view.dirty=true;
  if(fraction===1){animation=null;move(state,a.token);fill(view,state);view.root.remove(a.pivot);a.resolve();}}
 let settling=false;
 for(const v of [view,hero])if(v&&v.visible){const changed=v.controls?.update()||false;settling ||= changed;if(v.dirty||changed){v.renderer.render(v.scene,v.camera);v.dirty=false;}}
 if(animation||settling)requestRender();
}
document.addEventListener('visibilitychange',()=>{if(!document.hidden){for(const v of [view,hero])if(v)v.dirty=true;requestRender();}});
function animateMove(t){if(!view){move(state,t);return Promise.resolve();}return new Promise(resolve=>{const s=spec(t),pivot=new THREE.Group();view.root.add(pivot);for(const g of view.cubelets)if(affected(g.userData.piece,s))pivot.attach(g);animation={pivot,s,token:t,start:performance.now(),duration:reducedMotion.matches?0:Number($('#speed').value),resolve};requestRender();});}
function net(data){const positions={U:[44,0],L:[0,44],F:[44,44],R:[88,44],B:[132,44],D:[44,88]};let svg='<svg viewBox="0 0 176 134" role="img" aria-label="初始状态六面展开图">';for(const [face,[x,y]] of Object.entries(positions)){faceGrid(data,face).forEach((color,i)=>{svg+=`<rect x="${x+i%3*13}" y="${y+Math.floor(i/3)*13}" width="12" height="12" rx="1" fill="${colors[color]}" stroke="#24352b" stroke-width=".4"/>`;});svg+=`<text x="${x+19}" y="${y+24}" font-family="monospace" text-anchor="middle" font-size="8" fill="#18251c">${face}</text>`;}return svg+'</svg>';}
function stageCases(){return cases.filter(c=>c.stage===filter&&(filter==='Cross'?c.scope==='beginner':c.scope===scope));}
function renderList(){const q=$('#search').value.trim().toLowerCase();const visible=stageCases().filter(c=>(c.name+' '+c.alg).toLowerCase().includes(q)||String(c.number)===q);$('#case-list').innerHTML=visible.map((c,i)=>`<button class="case-item ${c.id===selected.id?'active':''}" data-case="${c.id}" aria-pressed="${c.id===selected.id}"><span class="case-number">${String(i+1).padStart(2,'0')}</span><span>${c.name}</span><span class="check">${learned.has(c.id)?'✓':'›'}</span></button>`).join('')||'<p class="small-note">没有匹配的案例，试试名称、编号或公式。</p>';$('#case-picker').innerHTML=(visible.some(c=>c.id===selected.id)?'':`<option value="">${visible.length?'选择案例':'无匹配案例，请修改搜索'}</option>`)+visible.map(c=>`<option value="${c.id}">${c.name}</option>`).join('');$('#case-picker').value=visible.some(c=>c.id===selected.id)?selected.id:'';$('#case-picker').dataset.empty=String(visible.length===0);$('#case-picker').disabled=visible.length===0;$('#count').textContent=visible.length+' / '+stageCases().length;$('#list-title').textContent=filter==='Cross'?'十字观察示例':(scope==='full'?'完整 ':'入门 ')+filter;const pool=cases.filter(c=>c.scope===scope);$('#learned-count').textContent=`本库已掌握 ${pool.filter(c=>learned.has(c.id)).length} / ${pool.length} 个案例`;document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',b.dataset.filter===filter);b.setAttribute('aria-pressed',b.dataset.filter===filter);});}
const descriptions={R:'右面',L:'左面',U:'顶面',D:'底面',F:'前面',B:'后面',r:'右侧两层',l:'左侧两层',u:'顶部两层',d:'底部两层',f:'前侧两层',b:'后侧两层',M:'中层（方向同 L）',E:'水平中层（方向同 D）',S:'前后间中层（方向同 F）',x:'整颗魔方（方向同 R）',y:'整颗魔方（方向同 U）',z:'整颗魔方（方向同 F）'};
function describe(t){const ref={M:'左面',E:'底面',S:'前面',x:'右面',y:'顶面',z:'前面'}[t[0]];return `${t}：${descriptions[t[0]]} ${t.includes('2')?'转动 180°':t.includes("'")?'逆时针转动 90°':'顺时针转动 90°'}。从正对${ref||'该面'}的位置判断方向。`;}
function status(){const ts=tokens(selected.alg);const formula=$('#formula');if(formula.dataset.case!==selected.id){formula.dataset.case=selected.id;formula.innerHTML=ts.map((t,i)=>`<button type="button" data-step="${i}" aria-label="跳到第 ${i+1} 步 ${t}">${t}</button>`).join('');}formula.querySelectorAll('button').forEach((b,i)=>{b.classList.toggle('done',i<step);b.classList.toggle('current',i===step);b.setAttribute('aria-current',i===step?'step':'false');b.disabled=busy;});$('#scrubber').max=ts.length;$('#scrubber').value=step;$('#scrubber').disabled=busy;$('#scrubber').setAttribute('aria-valuetext',`${step} / ${ts.length} 步`);$('#step-fraction').textContent=`${step} / ${ts.length}`;$('#case-picker').disabled=busy||$('#case-picker').dataset.empty==='true';$('#step-status').textContent=`${step} / ${ts.length} 步 · ${step===ts.length?'本次演示完成':step===0?'案例起始状态':'继续观察下一步'}`;$('#move-explanation').textContent=step===ts.length?'已完成公式。点击重置可回到初始状态，再独立练习一遍。':'下一步 '+describe(ts[step]);$('#play').textContent=playing?'Ⅱ 暂停':step===ts.length?'↺ 重播':'▶ 播放';$('#prev').disabled=busy||step===0;$('#next').disabled=busy||step===ts.length;$('#reset').disabled=busy;$('#scope').disabled=busy;document.querySelectorAll('[data-filter]').forEach(b=>b.disabled=busy);document.querySelectorAll('[data-case]').forEach(b=>b.disabled=busy);$('#learn').textContent=learned.has(selected.id)?'✓ 已掌握':'☆ 标记已掌握';}
function selectCase(c){if(busy||!c)return;run++;playing=false;selected=c;step=0;state=setup(c.alg);if(view)fill(view,state);$('#case-name').textContent=c.name;$('#stage-label').textContent=c.stage+' / '+(c.stage==='OLL'?'顶面朝向':c.stage==='PLL'?'顶层换位':'配对与插入');const text=lesson(c,state);$('#recognize').textContent=text.recognize;$('#explain').textContent=text.explain;$('#case-source').href=c.source||'https://jperm.net/3x3/cfop';$('#case-source').textContent=c.source?'查看本案例公式来源 ↗':'查看入门参考教程 ↗';$('#net').innerHTML=net(state);renderList();status();if(!reducedMotion.matches)$('#case-name').animate([{opacity:.35,transform:'translateY(5px)'},{opacity:1,transform:'translateY(0)'}],{duration:240,easing:'ease-out'});}
async function forward(){if(busy||step>=tokens(selected.alg).length)return;busy=true;status();await animateMove(tokens(selected.alg)[step]);step++;busy=false;status();}
async function play(){if(busy&&!playing)return;if(playing){run++;playing=false;status();return;}if(step===tokens(selected.alg).length)selectCase(selected);const ticket=++run;playing=true;status();while(ticket===run&&playing&&step<tokens(selected.alg).length){await forward();await new Promise(r=>setTimeout(r,90));}if(ticket===run){playing=false;status();}}
function seek(value){if(busy)return;playing=false;run++;step=Math.max(0,Math.min(Number(value),tokens(selected.alg).length));state=setup(selected.alg);for(const t of tokens(selected.alg).slice(0,step))move(state,t);if(view)fill(view,state);status();}
$('#scrubber').oninput=e=>seek(e.target.value);$('#formula').onclick=e=>{const b=e.target.closest('[data-step]');if(b)seek(b.dataset.step);};
$('#case-picker').onchange=e=>selectCase(cases.find(c=>c.id===e.target.value));
$('#copy-formula').onclick=async()=>{try{await navigator.clipboard.writeText(selected.alg);$('#copy-formula').textContent='已复制';}catch{$('#copy-formula').textContent='请选中公式复制';}setTimeout(()=>$('#copy-formula').textContent='复制公式',1800);};
document.addEventListener('keydown',e=>{if(/INPUT|SELECT|TEXTAREA|BUTTON|A/.test(e.target.tagName)||e.ctrlKey||e.metaKey||e.altKey)return;const box=$('#cube-view').getBoundingClientRect();if(box.bottom<0||box.top>innerHeight)return;if(e.code==='Space'){e.preventDefault();play();}if(e.code==='ArrowRight'){e.preventDefault();$('#next').click();}if(e.code==='ArrowLeft'){e.preventDefault();$('#prev').click();}});
$('#play').onclick=play;$('#next').onclick=()=>{playing=false;forward();};$('#prev').onclick=async()=>{if(busy||step===0)return;playing=false;busy=true;status();await animateMove(invert(tokens(selected.alg)[step-1]));step--;busy=false;status();};$('#reset').onclick=()=>selectCase(selected);$('#reset-view').onclick=()=>{if(view){view.camera.position.set(6,4.8,7);view.controls.target.set(0,0,0);view.controls.update();}};
$('#case-list').onclick=e=>{const b=e.target.closest('[data-case]');if(b)selectCase(cases.find(c=>c.id===b.dataset.case));};function changeFilter(f){if(busy)return;filter=f;$('#search').value='';selectCase(stageCases()[0]);}document.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>changeFilter(b.dataset.filter));document.querySelectorAll('[data-stage]').forEach(a=>a.onclick=()=>{changeFilter(a.dataset.stage);});$('#scope').onchange=()=>{if(busy){$('#scope').value=scope;return;}scope=$('#scope').value;changeFilter(filter);};$('#search').oninput=()=>{renderList();status();};$('#learn').onclick=()=>{learned.has(selected.id)?learned.delete(selected.id):learned.add(selected.id);save('cube-learned',[...learned]);renderList();status();};
let timerStart=null,timerFrame;function renderTimes(){$('#times').textContent=times.length?`最近 ${Math.min(5,times.length)} 次：${times.slice(-5).map(t=>t.toFixed(2)+'s').join(' · ')} ｜ 最佳 ${Math.min(...times).toFixed(2)}s`:'还没有记录，开始你的第一次练习。';}function tick(){if(timerStart===null)return;$('#timer').innerHTML=((performance.now()-timerStart)/1000).toFixed(2)+'<span>s</span>';timerFrame=requestAnimationFrame(tick);}$('#timer-toggle').onclick=()=>{if(timerStart===null){timerStart=performance.now();$('#timer-toggle').textContent='停止并记录';tick();}else{const t=(performance.now()-timerStart)/1000;timerStart=null;cancelAnimationFrame(timerFrame);$('#timer').innerHTML=t.toFixed(2)+'<span>s</span>';times.push(t);times=times.slice(-100);save('cube-times',times);$('#timer-toggle').textContent='再练一次';renderTimes();}};$('#clear-times').onclick=()=>{times=[];save('cube-times',times);renderTimes();};renderTimes();selectCase(selected);


const themeMedia=matchMedia('(prefers-color-scheme: dark)');
function applyTheme(value){document.documentElement.dataset.theme=value;$('#theme-toggle').textContent=value==='dark'?'浅色':'深色';$('#theme-toggle').setAttribute('aria-label',value==='dark'?'切换浅色主题':'切换深色主题');}
applyTheme(read('cube-theme',themeMedia.matches?'dark':'light'));
$('#theme-toggle').onclick=()=>{const next=document.documentElement.dataset.theme==='dark'?'light':'dark';save('cube-theme',next);applyTheme(next);};
themeMedia.addEventListener('change',e=>{if(!read('cube-theme',null))applyTheme(e.matches?'dark':'light');});
const sectionObserver=new IntersectionObserver(entries=>{for(const e of entries)if(e.isIntersecting){document.querySelectorAll('nav a').forEach(a=>a.classList.toggle('current',a.hash==='#'+e.target.id));}},{rootMargin:'-15% 0px -65% 0px'});document.querySelectorAll('section[id]').forEach(el=>sectionObserver.observe(el));
if(!reducedMotion.matches){const reveal=new IntersectionObserver(entries=>{for(const e of entries)if(e.isIntersecting){e.target.classList.remove('reveal-pending');e.target.classList.add('reveal-entered');reveal.unobserve(e.target);}},{threshold:.08});document.querySelectorAll('.section-heading,.route-grid,.notation-grid,.practice-grid,.source-links').forEach(el=>{if(el.getBoundingClientRect().top>innerHeight){el.classList.add('reveal-pending');reveal.observe(el);}});}
