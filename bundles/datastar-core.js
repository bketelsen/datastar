"use strict";(()=>{var Z={pluginType:"attribute",name:"star",onLoad:()=>{alert("YOU ARE PROBABLY OVERCOMPLICATING IT")}};var Q="action",X="watcher",m="preprocessor",v="attribute";var ee={pluginType:v,name:"computed",mustNotEmptyKey:!0,onLoad:t=>{let e=t.store();return e[t.key]=t.reactivity.computed(()=>t.expressionFn(t)),()=>{let r=t.store();delete r[t.key]}}};function te(t,e,r){let n={};if(!r)Object.assign(n,e);else for(let s in e){let o=t[s]?.value;o==null&&(n[s]=e[s])}return n}var ne={pluginType:v,name:"store",removeNewLines:!0,preprocessors:{pre:[{pluginType:m,name:"store",regexp:/(?<whole>.+)/g,replacer:t=>{let{whole:e}=t;return`Object.assign({...ctx.store()}, ${e})`}}]},allowedModifiers:new Set(["ifmissing"]),onLoad:t=>{let e=t.expressionFn(t),r=te(t.store(),e,t.modifiers.has("ifmissing"));t.mergeSignals(r),delete t.el.dataset[t.rawKey]}};var re="[a-zA-Z_$]+",be=re+"[0-9a-zA-Z_$.]*";function O(t,e,r,n=!0){let s=n?be:re;return new RegExp(`(?<whole>${t}(?<${e}>${s})${r})`,"g")}var se={name:"action",pluginType:m,regexp:O("\\$","action","(?<call>\\((?<args>.*)\\))",!1),replacer:({action:t,args:e})=>{let r=["ctx"];e&&r.push(...e.split(",").map(s=>s.trim()));let n=r.join(",");return`ctx.actions.${t}.method(${n})`}};var oe={name:"signal",pluginType:m,regexp:O("\\$","signal","(?<method>\\([^\\)]*\\))?"),replacer:t=>{let{signal:e,method:r}=t,n="ctx.store()";if(!r?.length)return`${n}.${e}.value`;let s=e.split("."),o=s.pop(),i=s.join(".");return`${n}.${i}.value.${o}${r}`}};function ie(t){return t instanceof HTMLElement||t instanceof SVGElement?t:null}var xe=Symbol.for("preact-signals"),g=1,b=2,P=4,T=8,A=16,x=32;function C(){w++}function L(){if(w>1){w--;return}let t,e=!1;for(;E!==void 0;){let r=E;for(E=void 0,G++;r!==void 0;){let n=r._nextBatchedEffect;if(r._nextBatchedEffect=void 0,r._flags&=~b,!(r._flags&T)&&ue(r))try{r._callback()}catch(s){e||(t=s,e=!0)}r=n}}if(G=0,w--,e)throw t}function ae(t){if(w>0)return t();C();try{return t()}finally{L()}}var a;var E,w=0,G=0,N=0;function le(t){if(a===void 0)return;let e=t._node;if(e===void 0||e._target!==a)return e={_version:0,_source:t,_prevSource:a._sources,_nextSource:void 0,_target:a,_prevTarget:void 0,_nextTarget:void 0,_rollbackNode:e},a._sources!==void 0&&(a._sources._nextSource=e),a._sources=e,t._node=e,a._flags&x&&t._subscribe(e),e;if(e._version===-1)return e._version=0,e._nextSource!==void 0&&(e._nextSource._prevSource=e._prevSource,e._prevSource!==void 0&&(e._prevSource._nextSource=e._nextSource),e._prevSource=a._sources,e._nextSource=void 0,a._sources._nextSource=e,a._sources=e),e}function u(t){this._value=t,this._version=0,this._node=void 0,this._targets=void 0}u.prototype.brand=xe;u.prototype._refresh=function(){return!0};u.prototype._subscribe=function(t){this._targets!==t&&t._prevTarget===void 0&&(t._nextTarget=this._targets,this._targets!==void 0&&(this._targets._prevTarget=t),this._targets=t)};u.prototype._unsubscribe=function(t){if(this._targets!==void 0){let e=t._prevTarget,r=t._nextTarget;e!==void 0&&(e._nextTarget=r,t._prevTarget=void 0),r!==void 0&&(r._prevTarget=e,t._nextTarget=void 0),t===this._targets&&(this._targets=r)}};u.prototype.subscribe=function(t){return F(()=>{let e=this.value,r=a;a=void 0;try{t(e)}finally{a=r}})};u.prototype.valueOf=function(){return this.value};u.prototype.toString=function(){return this.value+""};u.prototype.toJSON=function(){return this.value};u.prototype.peek=function(){let t=a;a=void 0;try{return this.value}finally{a=t}};Object.defineProperty(u.prototype,"value",{get(){let t=le(this);return t!==void 0&&(t._version=this._version),this._value},set(t){if(t!==this._value){if(G>100)throw new Error("Cycle detected");this._value=t,this._version++,N++,C();try{for(let e=this._targets;e!==void 0;e=e._nextTarget)e._target._notify()}finally{L()}}}});function I(t){return new u(t)}function ue(t){for(let e=t._sources;e!==void 0;e=e._nextSource)if(e._source._version!==e._version||!e._source._refresh()||e._source._version!==e._version)return!0;return!1}function ce(t){for(let e=t._sources;e!==void 0;e=e._nextSource){let r=e._source._node;if(r!==void 0&&(e._rollbackNode=r),e._source._node=e,e._version=-1,e._nextSource===void 0){t._sources=e;break}}}function fe(t){let e=t._sources,r;for(;e!==void 0;){let n=e._prevSource;e._version===-1?(e._source._unsubscribe(e),n!==void 0&&(n._nextSource=e._nextSource),e._nextSource!==void 0&&(e._nextSource._prevSource=n)):r=e,e._source._node=e._rollbackNode,e._rollbackNode!==void 0&&(e._rollbackNode=void 0),e=n}t._sources=r}function S(t){u.call(this,void 0),this._fn=t,this._sources=void 0,this._globalVersion=N-1,this._flags=P}S.prototype=new u;S.prototype._refresh=function(){if(this._flags&=~b,this._flags&g)return!1;if((this._flags&(P|x))===x||(this._flags&=~P,this._globalVersion===N))return!0;if(this._globalVersion=N,this._flags|=g,this._version>0&&!ue(this))return this._flags&=~g,!0;let t=a;try{ce(this),a=this;let e=this._fn();(this._flags&A||this._value!==e||this._version===0)&&(this._value=e,this._flags&=~A,this._version++)}catch(e){this._value=e,this._flags|=A,this._version++}return a=t,fe(this),this._flags&=~g,!0};S.prototype._subscribe=function(t){if(this._targets===void 0){this._flags|=P|x;for(let e=this._sources;e!==void 0;e=e._nextSource)e._source._subscribe(e)}u.prototype._subscribe.call(this,t)};S.prototype._unsubscribe=function(t){if(this._targets!==void 0&&(u.prototype._unsubscribe.call(this,t),this._targets===void 0)){this._flags&=~x;for(let e=this._sources;e!==void 0;e=e._nextSource)e._source._unsubscribe(e)}};S.prototype._notify=function(){if(!(this._flags&b)){this._flags|=P|b;for(let t=this._targets;t!==void 0;t=t._nextTarget)t._target._notify()}};Object.defineProperty(S.prototype,"value",{get(){if(this._flags&g)throw new Error("Cycle detected");let t=le(this);if(this._refresh(),t!==void 0&&(t._version=this._version),this._flags&A)throw this._value;return this._value}});function pe(t){return new S(t)}function de(t){let e=t._cleanup;if(t._cleanup=void 0,typeof e=="function"){C();let r=a;a=void 0;try{e()}catch(n){throw t._flags&=~g,t._flags|=T,U(t),n}finally{a=r,L()}}}function U(t){for(let e=t._sources;e!==void 0;e=e._nextSource)e._source._unsubscribe(e);t._fn=void 0,t._sources=void 0,de(t)}function Te(t){if(a!==this)throw new Error("Out-of-order effect");fe(this),a=t,this._flags&=~g,this._flags&T&&U(this),L()}function R(t){this._fn=t,this._cleanup=void 0,this._sources=void 0,this._nextBatchedEffect=void 0,this._flags=x}R.prototype._callback=function(){let t=this._start();try{if(this._flags&T||this._fn===void 0)return;let e=this._fn();typeof e=="function"&&(this._cleanup=e)}finally{t()}};R.prototype._start=function(){if(this._flags&g)throw new Error("Cycle detected");this._flags|=g,this._flags&=~T,de(this),ce(this),C();let t=a;return a=this,Te.bind(this,t)};R.prototype._notify=function(){this._flags&b||(this._flags|=b,this._nextBatchedEffect=E,E=this)};R.prototype._dispose=function(){this._flags|=T,this._flags&g||U(this)};function F(t){let e=new R(t);try{e._callback()}catch(r){throw e._dispose(),r}return e._dispose.bind(e)}var k=class{get value(){return V(this)}set value(e){ae(()=>Ee(this,e))}peek(){return V(this,{peek:!0})}},D=t=>Object.assign(new k,Object.entries(t).reduce((e,[r,n])=>{if(["value","peek"].some(s=>s===r))throw new Error(`${r} is a reserved property name`);return typeof n!="object"||n===null||Array.isArray(n)?e[r]=I(n):e[r]=D(n),e},{})),Ee=(t,e)=>Object.keys(e).forEach(r=>t[r].value=e[r]),V=(t,{peek:e=!1}={})=>Object.entries(t).reduce((r,[n,s])=>(s instanceof u?r[n]=e?s.peek():s.value:s instanceof k&&(r[n]=V(s,{peek:e})),r),{});function B(t,e){if(typeof e!="object"||Array.isArray(e)||!e)return JSON.parse(JSON.stringify(e));if(typeof e=="object"&&e.toJSON!==void 0&&typeof e.toJSON=="function")return e.toJSON();let r=t;return typeof t!="object"&&(r={...e}),Object.keys(e).forEach(n=>{r.hasOwnProperty(n)||(r[n]=e[n]),e[n]===null?delete r[n]:r[n]=B(r[n],e[n])}),r}var ge="0.20.0-beta-2";var we=t=>t.pluginType===m,Pe=t=>t.pluginType===X,Re=t=>t.pluginType===v,De=t=>t.pluginType===Q,M=(t,e)=>new Error(`A ${t} named '${e}' already exists`),$=class{constructor(){this.plugins=[];this.store=D({_dsPlugins:{}});this.preprocessors=new Array;this.actions={};this.watchers=new Array;this.refs={};this.reactivity={signal:I,computed:pe,effect:F};this.parentID="";this.missingIDNext=0;this.removals=new Map;this.mergeRemovals=new Array;this.lastMarshalledStore=""}get version(){return ge}load(...e){let r=new Set(this.plugins);e.forEach(n=>{if(n.requiredPlugins){for(let o of n.requiredPlugins)if(!r.has(o))throw new Error(`Plugin '${n.name}' requires plugin '${o}' to be loaded`)}let s;if(we(n)){if(this.preprocessors.includes(n))throw M("Preprocessor",n.name);this.preprocessors.push(n)}else if(Pe(n)){if(this.watchers.includes(n))throw M("Watcher",n.name);this.watchers.push(n),s=n.onGlobalInit}else if(De(n)){if(this.actions[n.name])throw M("Action",n.name);this.actions[n.name]=n}else if(Re(n)){if(this.plugins.includes(n))throw M("Attribute",n.name);this.plugins.push(n),s=n.onGlobalInit}else throw new Error(`Unknown plugin type: ${n}`);s&&s({store:()=>this.store,upsertIfMissingFromStore:this.upsertIfMissingFromStore.bind(this),mergeSignals:this.mergeSignals.bind(this),removeSignals:this.removeSignals.bind(this),actions:this.actions,reactivity:this.reactivity,applyPlugins:this.applyPlugins.bind(this),cleanupElementRemovals:this.cleanupElementRemovals.bind(this)}),r.add(n)}),this.applyPlugins(document.body)}cleanupElementRemovals(e){let r=this.removals.get(e);if(r){for(let n of r.set)n();this.removals.delete(e)}}mergeSignals(e){this.mergeRemovals.forEach(s=>s()),this.mergeRemovals=this.mergeRemovals.slice(0);let r=B(this.store.value,e);this.store=D(r),JSON.stringify(this.store.value),this.lastMarshalledStore}removeSignals(...e){let r={...this.store.value};for(let n of e){let s=n.split("."),o=s[0],i=r;for(let f=1;f<s.length;f++){let c=s[f];i[o]||(i[o]={}),i=i[o],o=c}delete i[o]}this.store=D(r),this.applyPlugins(document.body)}upsertIfMissingFromStore(e,r){let n=e.split("."),s=this.store;for(let i=0;i<n.length-1;i++){let f=n[i];s[f]||(s[f]={}),s=s[f]}let o=n[n.length-1];s[o]||(s[o]=this.reactivity.signal(r))}signalByName(e){return this.store[e]}applyPlugins(e){let r=new Set;this.plugins.forEach((n,s)=>{this.walkDownDOM(e,o=>{s||this.cleanupElementRemovals(o);for(let i in o.dataset){let f=`${o.dataset[i]}`||"",c=f;if(!i.startsWith(n.name))continue;if(o.id.length===0&&(o.id=`ds-${this.parentID}-${this.missingIDNext++}`),r.clear(),n.allowedTagRegexps){let l=o.tagName.toLowerCase();if(![...n.allowedTagRegexps].some(p=>l.match(p)))throw new Error(`'${o.tagName}' not allowed for '${i}', allowed ${[[...n.allowedTagRegexps].map(p=>`'${p}'`)].join(", ")}`)}let _e=i.slice(n.name.length),[_,...ye]=_e.split(".");if(n.mustHaveEmptyKey&&_.length>0)throw new Error(`'${i}' must have empty key`);if(n.mustNotEmptyKey&&_.length===0)throw new Error(`'${i}' must have non-empty key`);_.length&&(_=_[0].toLowerCase()+_.slice(1));let H=ye.map(l=>{let[y,...p]=l.split("_");return{label:y,args:p}});if(n.allowedModifiers){for(let l of H)if(!n.allowedModifiers.has(l.label))throw new Error(`'${l.label}' is not allowed`)}let J=new Map;for(let l of H)J.set(l.label,l.args);if(n.mustHaveEmptyExpression&&c.length)throw new Error(`'${i}' must have empty expression`);if(n.mustNotEmptyExpression&&!c.length)throw new Error(`'${i}' must have non-empty expression`);let W=/;|\n/;n.removeNewLines&&(c=c.split(`
`).map(l=>l.trim()).join(" "));let Se=[...n.preprocessors?.pre||[],...this.preprocessors,...n.preprocessors?.post||[]];for(let l of Se){if(r.has(l))continue;r.add(l);let y=c.split(W),p=[];y.forEach(d=>{let h=d,Y=[...h.matchAll(l.regexp)];if(Y.length)for(let q of Y){if(!q.groups)continue;let{groups:z}=q,{whole:ve}=z;h=h.replace(ve,l.replacer(z))}p.push(h)}),c=p.join("; ")}let j={store:()=>this.store,mergeSignals:this.mergeSignals.bind(this),upsertIfMissingFromStore:this.upsertIfMissingFromStore.bind(this),removeSignals:this.removeSignals.bind(this),applyPlugins:this.applyPlugins.bind(this),cleanupElementRemovals:this.cleanupElementRemovals.bind(this),walkSignals:this.walkSignals.bind(this),actions:this.actions,reactivity:this.reactivity,el:o,rawKey:i,key:_,rawExpression:f,expression:c,expressionFn:()=>{throw new Error("Expression function not created")},modifiers:J};if(!n.bypassExpressionFunctionCreation?.(j)&&!n.mustHaveEmptyExpression&&c.length){let l=c.split(W).map(d=>d.trim()).filter(d=>d.length);l[l.length-1]=`return ${l[l.length-1]}`;let y=l.map(d=>`  ${d}`).join(`;
`),p=`
  try {
    const _datastarExpression = () => {
  ${y}
    }
    const _datastarReturnVal = _datastarExpression()
    return _datastarReturnVal
  } catch (e) {
   const msg = \`
  Error evaluating Datastar expression:
  ${y.replaceAll("`","\\`")}

  Error: \${e.message}

  Check if the expression is valid before raising an issue.
  \`.trim()
   console.error(msg)
   debugger
  }
              `;try{let d=n.argumentNames||[],h=new Function("ctx",...d,p);j.expressionFn=h}catch(d){let h=new Error(`Error creating expression function for '${p}', error: ${d}`);console.error(h);debugger}}let K=n.onLoad(j);K&&(this.removals.has(o)||this.removals.set(o,{id:o.id,set:new Set}),this.removals.get(o).set.add(K))}})})}walkSignalsStore(e,r){let n=Object.keys(e);for(let s=0;s<n.length;s++){let o=n[s],i=e[o],f=i instanceof u,c=typeof i=="object"&&Object.keys(i).length>0;if(f){r(o,i);continue}c&&this.walkSignalsStore(i,r)}}walkSignals(e){this.walkSignalsStore(this.store,e)}walkDownDOM(e,r,n=0){if(!e)return;let s=ie(e);if(s)for(r(s),n=0,e=e.firstElementChild;e;)this.walkDownDOM(e,r,n++),e=e.nextElementSibling}};var Oe={Morph:"morph",Inner:"inner",Outer:"outer",Prepend:"prepend",Append:"append",Before:"before",After:"after",UpsertAttributes:"upsertAttributes"},it=Oe.Morph;var he=new $;he.load(se,oe,ne,ee,Z);var me=he;me.load();})();
//# sourceMappingURL=datastar-core.js.map
