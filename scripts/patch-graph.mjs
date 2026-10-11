import fs from "fs"
import path from "path"

const graphFiles = [
  "node_modules/@quartz-community/graph/dist/index.js",
  "node_modules/@quartz-community/graph/dist/components/index.js",
]

export function patchGraphFiles() {
  let patchedCount = 0

  for (const relPath of graphFiles) {
    const fullPath = path.resolve(relPath)
    if (!fs.existsSync(fullPath)) {
      console.warn(`[patch-graph] File not found: ${relPath}`)
      continue
    }

    let code = fs.readFileSync(fullPath, "utf8")
    let modified = false

    // 1. Domain Clustering Color Resolver
    const originalColorPattern = 'function $e(i){var l=i.id===g;return l?Ie:K.has(i.id)||i.id.startsWith("tags/")?Qu:ue}'
    const enhancedColorCode = `function $e(i){
  var l=i.id===g;
  if(l)return"#06b6d4";
  if(i.id.startsWith("tags/"))return"#8b5cf6";
  var s=(i.id||"").toLowerCase();
  if(s.includes("dsa")||s.includes("leetcode")||s.includes("grind")||s.includes("neetcode")||s.includes("algorithm"))return"#10b981";
  if(s.includes("system")||s.includes("backend")||s.includes("arch")||s.includes("database")||s.includes("sql")||s.includes("kafka")||s.includes("redis"))return"#6366f1";
  if(s.includes("lang")||s.includes("english")||s.includes("japanese")||s.includes("mandarin")||s.includes("chinese"))return"#f59e0b";
  if(s.includes("cert")||s.includes("cloud")||s.includes("aws")||s.includes("azure")||s.includes("docker")||s.includes("k8s")||s.includes("linux"))return"#ec4899";
  return K.has(i.id)?Qu:Ie;
}`

    if (code.includes(originalColorPattern)) {
      code = code.replace(originalColorPattern, enhancedColorCode)
      modified = true
    }

    // 2. Directed Arrows Link Drawing (Wrapped in IIFE to prevent "var" syntax error in parenthesized expressions)
    const originalRenderPattern = 'C.gfx.moveTo($+O/2,J+G/2),C.gfx.lineTo(gu+O/2,ce+G/2),C.gfx.stroke({alpha:C.alpha,width:1,color:C.color})'
    const brokenRenderPattern = `var _x1=$+O/2,_y1=J+G/2,_x2=gu+O/2,_y2=ce+G/2;
C.gfx.moveTo(_x1,_y1);
C.gfx.lineTo(_x2,_y2);
var _dx=_x2-_x1,_dy=_y2-_y1,_dist=Math.sqrt(_dx*_dx+_dy*_dy);
if(_dist>14&&window.__GRAPH_ARROWS__!==false){
  var _tr=oe(T.target)+2,_tipX=_x2-(_dx/_dist)*_tr,_tipY=_y2-(_dy/_dist)*_tr;
  var _ang=Math.atan2(_dy,_dx),_len=5.5,_spr=0.5;
  C.gfx.moveTo(_tipX,_tipY);
  C.gfx.lineTo(_tipX-_len*Math.cos(_ang-_spr),_tipY-_len*Math.sin(_ang-_spr));
  C.gfx.moveTo(_tipX,_tipY);
  C.gfx.lineTo(_tipX-_len*Math.cos(_ang+_spr),_tipY-_len*Math.sin(_ang+_spr));
}
C.gfx.stroke({alpha:C.alpha,width:1.2,color:C.color})`

    const enhancedRenderCode = `((_x1,_y1,_x2,_y2)=>{
  C.gfx.moveTo(_x1,_y1);
  C.gfx.lineTo(_x2,_y2);
  var _dx=_x2-_x1,_dy=_y2-_y1,_dist=Math.sqrt(_dx*_dx+_dy*_dy);
  if(_dist>14&&window.__GRAPH_ARROWS__!==false){
    var _tr=oe(T.target)+2,_tipX=_x2-(_dx/_dist)*_tr,_tipY=_y2-(_dy/_dist)*_tr;
    var _ang=Math.atan2(_dy,_dx),_len=5.5,_spr=0.5;
    C.gfx.moveTo(_tipX,_tipY);
    C.gfx.lineTo(_tipX-_len*Math.cos(_ang-_spr),_tipY-_len*Math.sin(_ang-_spr));
    C.gfx.moveTo(_tipX,_tipY);
    C.gfx.lineTo(_tipX-_len*Math.cos(_ang+_spr),_tipY-_len*Math.sin(_ang+_spr));
  }
  C.gfx.stroke({alpha:C.alpha,width:1.2,color:C.color});
})($+O/2,J+G/2,gu+O/2,ce+G/2)`

    if (code.includes(originalRenderPattern)) {
      code = code.replace(originalRenderPattern, enhancedRenderCode)
      modified = true
    } else if (code.includes(brokenRenderPattern)) {
      code = code.replace(brokenRenderPattern, enhancedRenderCode)
      modified = true
    }

    // 3. Node Selection / Preview Event Trigger
    const originalClickPattern = 'Date.now()-ne<500){var l=Nu(i.subject.id);window.location.href=l}'
    const enhancedClickCode = `Date.now()-ne<500){
  var l=Nu(i.subject.id);
  if(window.onGraphNodeClick&&window.onGraphNodeClick(i.subject.id,i.subject.text,l)){/* handled by inspector */}
  else{window.location.href=l}
}`

    if (code.includes(originalClickPattern)) {
      code = code.replace(originalClickPattern, enhancedClickCode)
      modified = true
    }

    // 4. Safe LocalStorage parsing (prevent hard reload Ctrl+Shift+R crashes)
    const originalStoragePattern = 'function s(){return new Set(JSON.parse(localStorage.getItem(n)||"[]"))}'
    const safeStorageCode = 'function s(){try{var _raw=localStorage.getItem(n);return _raw&&_raw!=="undefined"?new Set(JSON.parse(_raw)):new Set()}catch(e){return new Set()}}'

    if (code.includes(originalStoragePattern)) {
      code = code.replace(originalStoragePattern, safeStorageCode)
      modified = true
    }

    if (modified) {
      fs.writeFileSync(fullPath, code, "utf8")
      patchedCount++
      console.log(`[patch-graph] Successfully patched ${relPath}`)
    } else {
      console.log(`[patch-graph] Already up-to-date in ${relPath}`)
    }
  }

  return patchedCount
}

if (process.argv[1]?.endsWith("patch-graph.mjs")) {
  patchGraphFiles()
}
