/* ╔══════════════════════════════════════════╗
   ║  UPSC COSMOS v6 — graph.js               ║
   ║  Interactive Knowledge Galaxy Canvas      ║
   ╚══════════════════════════════════════════╝ */

const GRAPH = (() => {
  let canvas, ctx, nodes=[], edges=[], animFrame=null;
  let transform={x:0,y:0,scale:1};
  let drag={active:false,lastX:0,lastY:0};
  let selectedNode=null, activeFilter='All';

  const SUBJECT_COLORS = {
    'Polity':'#7c6af7','Economy':'#22c55e','Environment':'#06b6d4',
    'History':'#f59e0b','Geography':'#a855f7','Sci & Tech':'#f97316',
    'Governance':'#ec4899','Int. Relations':'#14b8a6',
  };

  function init(){
    canvas=document.getElementById('graphCanvas');
    if(!canvas) return;
    ctx=canvas.getContext('2d');
    resizeCanvas();
    buildGraph();
    renderFilters();
    if(animFrame) cancelAnimationFrame(animFrame);
    draw();
    canvas.addEventListener('mousedown',onMouseDown);
    canvas.addEventListener('mousemove',onMouseMove);
    canvas.addEventListener('mouseup',()=>{drag.active=false;});
    canvas.addEventListener('click',onClick);
    canvas.addEventListener('wheel',onWheel,{passive:true});
    canvas.addEventListener('touchstart',onTouchStart,{passive:true});
    canvas.addEventListener('touchmove',onTouchMove,{passive:false});
    canvas.addEventListener('touchend',()=>{drag.active=false;});
  }

  function resizeCanvas(){
    const rect=canvas.parentElement.getBoundingClientRect();
    canvas.width=rect.width||360;
    canvas.height=420;
  }

  function buildGraph(){
    const kgNodes=KNOWLEDGE_GRAPH.nodes||[];
    const kgEdges=KNOWLEDGE_GRAPH.edges||[];
    const subjects=[...new Set(kgNodes.map(n=>n.subject))];
    const W=canvas.width, H=canvas.height;
    const cx=W/2, cy=H/2;

    // Arrange subjects in outer ring, nodes around each cluster
    nodes=kgNodes.map(n=>{
      const sIdx=subjects.indexOf(n.subject);
      const angle=(sIdx/subjects.length)*Math.PI*2 - Math.PI/2;
      const clusterR=Math.min(W,H)*0.28;
      const nodeR=50;
      const nodesInSubj=kgNodes.filter(x=>x.subject===n.subject);
      const nIdx=nodesInSubj.indexOf(n);
      const nAngle=angle+(nIdx-nodesInSubj.length/2)*(nodeR/clusterR);
      const r=clusterR+(nIdx%2===0?0:30);
      return {
        ...n,
        x: cx+r*Math.cos(nAngle)+(Math.random()-0.5)*20,
        y: cy+r*Math.sin(nAngle)+(Math.random()-0.5)*20,
        radius: 12,
        vx:0, vy:0,
      };
    });

    edges=kgEdges.map(e=>({from:e.from,to:e.to}));
  }

  function renderFilters(){
    const el=document.getElementById('graphFilters');
    if(!el) return;
    const subjects=['All',...new Set((KNOWLEDGE_GRAPH.nodes||[]).map(n=>n.subject))];
    el.innerHTML=subjects.map(s=>`<button class="filter-chip ${s===activeFilter?'active':''}" onclick="GRAPH.setFilter('${s}')">${s}</button>`).join('');
  }

  function setFilter(subject){
    activeFilter=subject;
    renderFilters();
  }

  function getNodeColor(n){
    const mastery=getMastery(n.id);
    if(mastery>=70) return '#22c55e';
    if(mastery>=40) return SUBJECT_COLORS[n.subject]||'#7c6af7';
    if(mastery>=10) return '#f59e0b';
    return '#2a2a4a';
  }

  function getNodeBorder(n){
    if(selectedNode&&selectedNode.id===n.id) return '#ffffff';
    return SUBJECT_COLORS[n.subject]||'#7c6af7';
  }

  function draw(){
    if(!ctx||!canvas) return;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.save();
    ctx.translate(transform.x,transform.y);
    ctx.scale(transform.scale,transform.scale);

    // Stars background
    drawStars();

    const visible=activeFilter==='All' ? nodes : nodes.filter(n=>n.subject===activeFilter);

    // Edges
    edges.forEach(e=>{
      const from=nodes.find(n=>n.id===e.from);
      const to=nodes.find(n=>n.id===e.to);
      if(!from||!to) return;
      if(activeFilter!=='All'&&(from.subject!==activeFilter&&to.subject!==activeFilter)) return;
      ctx.beginPath();
      ctx.moveTo(from.x,from.y);
      ctx.lineTo(to.x,to.y);
      ctx.strokeStyle='rgba(124,106,247,0.2)';
      ctx.lineWidth=1/transform.scale;
      ctx.stroke();
    });

    // Nodes
    visible.forEach(n=>{
      const color=getNodeColor(n);
      const border=getNodeBorder(n);
      const isSelected=selectedNode&&selectedNode.id===n.id;
      const r=isSelected?n.radius*1.4:n.radius;

      // Glow
      if(isSelected){
        ctx.beginPath();
        ctx.arc(n.x,n.y,r+8,0,Math.PI*2);
        const grad=ctx.createRadialGradient(n.x,n.y,r,n.x,n.y,r+10);
        grad.addColorStop(0,'rgba(124,106,247,0.4)');
        grad.addColorStop(1,'transparent');
        ctx.fillStyle=grad;
        ctx.fill();
      }

      // Node circle
      ctx.beginPath();
      ctx.arc(n.x,n.y,r,0,Math.PI*2);
      ctx.fillStyle=color;
      ctx.fill();
      ctx.strokeStyle=border;
      ctx.lineWidth=isSelected?2/transform.scale:1/transform.scale;
      ctx.stroke();

      // Mastery fill ring
      const m=getMastery(n.id);
      if(m>0){
        ctx.beginPath();
        ctx.arc(n.x,n.y,r+3,(-.5)*Math.PI,(-.5+2*(m/100))*Math.PI);
        ctx.strokeStyle=SUBJECT_COLORS[n.subject]||'#7c6af7';
        ctx.lineWidth=2/transform.scale;
        ctx.stroke();
      }

      // Label
      ctx.fillStyle='rgba(230,230,240,0.9)';
      ctx.font=`${isSelected?500:400} ${9/transform.scale}px Space Grotesk`;
      ctx.textAlign='center';
      ctx.textBaseline='middle';
      const label=n.topic.length>12?n.topic.slice(0,10)+'…':n.topic;
      ctx.fillText(label,n.x,n.y+r+10/transform.scale);
    });

    ctx.restore();
    animFrame=requestAnimationFrame(draw);
  }

  function drawStars(){
    if(!ctx._stars){
      ctx._stars=Array.from({length:40},()=>({
        x:Math.random()*800-200, y:Math.random()*500-50,
        r:Math.random()*1.5+0.3, opacity:Math.random()*0.5+0.2,
      }));
    }
    ctx._stars.forEach(s=>{
      ctx.beginPath();
      ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(200,200,255,${s.opacity})`;
      ctx.fill();
    });
  }

  function worldToScreen(wx,wy){
    return {x:wx*transform.scale+transform.x, y:wy*transform.scale+transform.y};
  }
  function screenToWorld(sx,sy){
    return {x:(sx-transform.x)/transform.scale, y:(sy-transform.y)/transform.scale};
  }

  function getNodeAt(sx,sy){
    const w=screenToWorld(sx,sy);
    const visible=activeFilter==='All'?nodes:nodes.filter(n=>n.subject===activeFilter);
    return visible.find(n=>{
      const dx=n.x-w.x, dy=n.y-w.y;
      return Math.sqrt(dx*dx+dy*dy)<=(n.radius+8);
    })||null;
  }

  function onMouseDown(e){
    drag.active=true;
    drag.lastX=e.clientX;
    drag.lastY=e.clientY;
  }
  function onMouseMove(e){
    if(!drag.active) return;
    transform.x+=e.clientX-drag.lastX;
    transform.y+=e.clientY-drag.lastY;
    drag.lastX=e.clientX;
    drag.lastY=e.clientY;
  }
  function onClick(e){
    const rect=canvas.getBoundingClientRect();
    const n=getNodeAt(e.clientX-rect.left, e.clientY-rect.top);
    if(n) selectNode(n);
    else { selectedNode=null; hideNodeDetail(); }
  }
  function onWheel(e){
    const delta=e.deltaY>0?0.9:1.1;
    transform.scale=Math.max(0.4,Math.min(3,transform.scale*delta));
  }

  let _touchLast=null;
  function onTouchStart(e){
    if(e.touches.length===1){
      drag.active=true;
      drag.lastX=e.touches[0].clientX;
      drag.lastY=e.touches[0].clientY;
      _touchLast={x:e.touches[0].clientX,y:e.touches[0].clientY,t:Date.now()};
    }
  }
  function onTouchMove(e){
    if(!drag.active||e.touches.length!==1) return;
    e.preventDefault();
    transform.x+=e.touches[0].clientX-drag.lastX;
    transform.y+=e.touches[0].clientY-drag.lastY;
    drag.lastX=e.touches[0].clientX;
    drag.lastY=e.touches[0].clientY;
  }

  function selectNode(n){
    selectedNode=n;
    showNodeDetail(n);
    showConnections(n);
  }

  function showNodeDetail(n){
    const el=document.getElementById('nodeDetail');
    if(!el) return;
    el.style.display='block';
    const mastery=getMastery(n.id);
    const color=SUBJECT_COLORS[n.subject]||'#7c6af7';
    const qCount=(typeof QUESTION_BANK!=='undefined'?QUESTION_BANK:[] ).filter(q=>q.node===n.id).length;
    const hist=STATE.history.filter(h=>h.nodeId===n.id);
    const acc=hist.length>0?Math.round(hist.filter(h=>h.correct).length/hist.length*100):0;
    el.innerHTML=`
      <div class="nd-subject">${n.subject}</div>
      <div class="nd-name">${n.topic}</div>
      <div class="nd-mastery-bar"><div class="nd-mastery-fill" style="width:${mastery}%;background:${color}"></div></div>
      <div class="nd-stats">
        <span>Mastery: ${mastery}%</span>
        <span>${qCount} questions</span>
        <span>Accuracy: ${hist.length>0?acc+'%':'—'}</span>
      </div>
      <div style="font-size:12px;color:var(--text3);margin-bottom:14px">Subtopics: ${(n.subtopics||[]).join(', ')}</div>
      <div class="nd-actions">
        <button class="btn-sm accent" onclick="QUIZ.start('subject','${n.subject}')">Practice Questions</button>
        <button class="btn-sm ghost" onclick="navigate('revision')">Schedule Revision</button>
      </div>`;
  }

  function hideNodeDetail(){
    const el=document.getElementById('nodeDetail');
    if(el) el.style.display='none';
    const cp=document.getElementById('connectionPanel');
    if(cp) cp.style.display='none';
  }

  function showConnections(n){
    const el=document.getElementById('connectionPanel');
    if(!el) return;
    const conns=(typeof TOPIC_CONNECTIONS!=='undefined'?TOPIC_CONNECTIONS:[]).filter(c=>c.from===n.id||c.to===n.id);
    if(conns.length===0){ el.style.display='none'; return; }
    el.style.display='block';
    document.getElementById('connectionList').innerHTML=conns.map(c=>{
      const otherId=c.from===n.id?c.to:c.from;
      const other=nodes.find(x=>x.id===otherId);
      return `<div class="connection-item">
        <strong style="color:var(--accent)">${n.topic}</strong> ↔ <strong style="color:var(--cyan)">${other?other.topic:otherId}</strong><br>
        <span style="font-size:12px">${c.insight}</span>
      </div>`;
    }).join('');
  }

  return {init,setFilter};
})();
