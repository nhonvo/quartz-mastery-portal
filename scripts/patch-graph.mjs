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

    // 5. Ensure global graph modal has top-level stacking context (z-index 100030) above mobile app bars
    const originalZIndexPattern = 'g&&(g.style.zIndex="1")'
    const enhancedZIndexCode = 'g&&(g.style.zIndex="100030")'
    if (code.includes(originalZIndexPattern)) {
      code = code.replace(originalZIndexPattern, enhancedZIndexCode)
      modified = true
    }

    // 6. Ensure backdrop click detector ignores mobile floatbar trigger
    const originalTargetPattern = 'S=g.target.closest(".global-graph-icon")'
    const enhancedTargetCode = 'S=g.target.closest(".global-graph-icon,#float-graph-trigger,.float-btn")'
    if (code.includes(originalTargetPattern)) {
      code = code.replace(originalTargetPattern, enhancedTargetCode)
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

const explorerFiles = [
  "node_modules/@quartz-community/explorer/dist/index.js",
  "node_modules/@quartz-community/explorer/dist/components/index.js",
]

export function patchExplorerFiles() {
  let patchedCount = 0

  for (const relPath of explorerFiles) {
    const fullPath = path.resolve(relPath)
    if (!fs.existsSync(fullPath)) {
      continue
    }

    let code = fs.readFileSync(fullPath, "utf8")
    let modified = false

    // 1. Default folder state to open (instead of default collapsed)
    const defaultCollapsedPattern = 'let C=r[u.slug]!==void 0?r[u.slug]:!0,c=S(u.slug),f=c&&c===A.slice(0,c.length);'
    const defaultOpenCode = 'let C=r[u.slug]!==void 0?r[u.slug]:!1,c=S(u.slug),f=c&&c===A.slice(0,c.length);'

    if (code.includes(defaultCollapsedPattern)) {
      code = code.replace(defaultCollapsedPattern, defaultOpenCode)
      modified = true
    }

    // 2. Prevent rebuilding/wiping tree on SPA navigations if already populated
    const originalTreeBuild = 'let d=t.dataset.dataFns,E=t.dataset.behavior||"collapse";console.log("[Explorer] Starting tree build...");let A=await R(d);if(e===b){if(console.log("[Explorer] Render generation is current, rendering tree"),console.log("[Explorer] Trie result:",A?"success":"null"),A&&A.children&&A.children.length>0){n.innerHTML=\'<li class="overflow-end"></li>\',console.log("[Explorer] Rendering",A.children.length,"children");for(let o of A.children)N(o,n,D,E,r,"");console.log("[Explorer] Render complete, final list length:",n.children.length)}else console.warn("[Explorer] No trie or empty children");let l=sessionStorage.getItem("explorerScrollTop");if(l)n.scrollTop=parseInt(l,10);else{let o=n.querySelector(".active");o&&o.scrollIntoView({behavior:"smooth"})}}else console.log("[Explorer] Stale render generation, skipping tree render");'
    const preserveTreeCode = 'let d=t.dataset.dataFns,E=t.dataset.behavior||"collapse";if(n.children&&n.children.length>1){n.querySelectorAll("a.active, a.is-active").forEach(a=>a.classList.remove("active","is-active"));let _curSlug=S(D),_activeA=null;if(_curSlug&&_curSlug!=="/"){for(let _a of n.querySelectorAll("a")){let _h=_a.getAttribute("href")||"";if(_h.endsWith(_curSlug)||_h.endsWith(_curSlug+"/")||_h.includes("/"+_curSlug)){_a.classList.add("active","is-active");_activeA=_a;let _p=_a.closest(".folder-outer");while(_p){_p.classList.add("open");_p=_p.parentElement?.closest(".folder-outer");}break;}}}if(!_activeA){n.querySelectorAll(".explorer-ul > li > .folder-outer").forEach(f=>f.classList.add("open"));}let l=sessionStorage.getItem("explorerScrollTop");if(l)n.scrollTop=parseInt(l,10);else if(_activeA){_activeA.scrollIntoView({behavior:"smooth",block:"center"});}}else{let A=await R(d);if(e===b){if(A&&A.children&&A.children.length>0){n.innerHTML=\'<li class="overflow-end"></li>\';for(let o of A.children)N(o,n,D,E,r,"");let _activeA=n.querySelector(".active, .is-active");if(_activeA){let _p=_activeA.closest(".folder-outer");while(_p){_p.classList.add("open");_p=_p.parentElement?.closest(".folder-outer");}}else{n.querySelectorAll(".explorer-ul > li > .folder-outer").forEach(f=>f.classList.add("open"));}}let l=sessionStorage.getItem("explorerScrollTop");if(l)n.scrollTop=parseInt(l,10);else{let o=n.querySelector(".active");o&&o.scrollIntoView({behavior:"smooth",block:"center"})}}}try{if(typeof window.setupExplorerEnhancements==="function")window.setupExplorerEnhancements();}catch(_){}'

    const oldPreserveTreeCode = 'let d=t.dataset.dataFns,E=t.dataset.behavior||"collapse";if(n.children&&n.children.length>1){n.querySelectorAll("a.active, a.is-active").forEach(a=>a.classList.remove("active","is-active"));let _curSlug=S(D),_activeA=null;if(_curSlug&&_curSlug!=="/"){for(let _a of n.querySelectorAll("a")){let _h=_a.getAttribute("href")||"";if(_h.endsWith(_curSlug)||_h.endsWith(_curSlug+"/")||_h.includes("/"+_curSlug)){_a.classList.add("active","is-active");_activeA=_a;let _p=_a.closest(".folder-outer");while(_p){_p.classList.add("open");_p=_p.parentElement?.closest(".folder-outer");}break;}}}if(!_activeA){n.querySelectorAll(".explorer-ul > li > .folder-outer").forEach(f=>f.classList.add("open"));}let l=sessionStorage.getItem("explorerScrollTop");if(l)n.scrollTop=parseInt(l,10);else if(_activeA){_activeA.scrollIntoView({behavior:"smooth",block:"center"});}}else{let A=await R(d);if(e===b){if(A&&A.children&&A.children.length>0){n.innerHTML=\'<li class="overflow-end"></li>\';for(let o of A.children)N(o,n,D,E,r,"");let _activeA=n.querySelector(".active, .is-active");if(_activeA){let _p=_activeA.closest(".folder-outer");while(_p){_p.classList.add("open");_p=_p.parentElement?.closest(".folder-outer");}}else{n.querySelectorAll(".explorer-ul > li > .folder-outer").forEach(f=>f.classList.add("open"));}}let l=sessionStorage.getItem("explorerScrollTop");if(l)n.scrollTop=parseInt(l,10);else{let o=n.querySelector(".active");o&&o.scrollIntoView({behavior:"smooth",block:"center"})}}}'

    if (code.includes(oldPreserveTreeCode)) {
      code = code.replace(oldPreserveTreeCode, preserveTreeCode)
      modified = true
    } else if (code.includes(originalTreeBuild)) {
      code = code.replace(originalTreeBuild, preserveTreeCode)
      modified = true
    }

    if (modified) {
      fs.writeFileSync(fullPath, code, "utf8")
      patchedCount++
      console.log(`[patch-explorer] Successfully patched ${relPath}`)
    } else {
      console.log(`[patch-explorer] Already up-to-date in ${relPath}`)
    }
  }

  return patchedCount
}

const micromorphFiles = [
  "node_modules/micromorph/dist/index.js",
]

export function patchMicromorphFiles() {
  let patchedCount = 0

  for (const relPath of micromorphFiles) {
    const fullPath = path.resolve(relPath)
    if (!fs.existsSync(fullPath)) {
      continue
    }

    let code = fs.readFileSync(fullPath, "utf8")
    let modified = false

    // Root cause: micromorph diffs element children even when data-persist is present.
    // In function p(e, t), if e has data-persist, return undefined (no patch needed, preserve e as-is!)
    const originalDiff = 'function p(e,t){if(!e)return{type:0,node:c(t)};if(!t)return{type:1};'
    const safeDiff = 'function p(e,t){if(!e)return{type:0,node:c(t)};if(!t)return{type:1};if(e.nodeType===1&&e.hasAttribute("data-persist"))return;'

    if (code.includes(originalDiff)) {
      code = code.replace(originalDiff, safeDiff)
      modified = true
    }

    if (modified) {
      fs.writeFileSync(fullPath, code, "utf8")
      patchedCount++
      console.log(`[patch-micromorph] Successfully patched ${relPath}`)
    } else {
      console.log(`[patch-micromorph] Already up-to-date in ${relPath}`)
    }
  }

  return patchedCount
}

export function patchAll() {
  patchGraphFiles()
  patchExplorerFiles()
  patchMicromorphFiles()
}

if (process.argv[1]?.endsWith("patch-graph.mjs")) {
  patchAll()
}
