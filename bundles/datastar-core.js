"use strict";(()=>{var Z="action",Q="watcher",m="preprocessor",v="attribute";var X={pluginType:v,name:"computed",mustNotEmptyKey:!0,onLoad:t=>{let e=t.store();return e[t.key]=t.reactivity.computed(()=>t.expressionFn(t)),()=>{let r=t.store();delete r[t.key]}}};function ee(t,e,r){let n={};if(!r)Object.assign(n,e);else for(let o in e){let s=t[o]?.value;s==null&&(n[o]=e[o])}return n}var te={pluginType:v,name:"store",removeNewLines:!0,preprocessors:{pre:[{pluginType:m,name:"store",regexp:/(?<whole>.+)/g,replacer:t=>{let{whole:e}=t;return`Object.assign({...ctx.store()}, ${e})`}}]},allowedModifiers:new Set(["ifmissing"]),onLoad:t=>{let e=t.expressionFn(t),r=ee(t.store(),e,t.modifiers.has("ifmissing"));t.mergeStore(r),delete t.el.dataset[t.rawKey]}};var ne="[a-zA-Z_$]+",ve=ne+"[0-9a-zA-Z_$.]*";function O(t,e,r,n=!0){let o=n?ve:ne;return new RegExp(`(?<whole>${t}(?<${e}>${o})${r})`,"g")}var re={name:"action",pluginType:m,regexp:O("\\$","action","(?<call>\\((?<args>.*)\\))",!1),replacer:({action:t,args:e})=>{let r=["ctx"];e&&r.push(...e.split(",").map(o=>o.trim()));let n=r.join(",");return`ctx.actions.${t}.method(${n})`}};var oe={name:"signal",pluginType:m,regexp:O("\\$","signal","(?<method>\\([^\\)]*\\))?"),replacer:t=>{let{signal:e,method:r}=t,n="ctx.store()";if(!r?.length)return`${n}.${e}.value`;let o=e.split("."),s=o.pop(),i=o.join(".");return`${n}.${i}.value.${s}${r}`}};function se(t){return t instanceof HTMLElement||t instanceof SVGElement?t:null}var xe=Symbol.for("preact-signals"),g=1,x=2,R=4,T=8,A=16,b=32;function C(){w++}function L(){if(w>1){w--;return}let t,e=!1;for(;E!==void 0;){let r=E;for(E=void 0,F++;r!==void 0;){let n=r._nextBatchedEffect;if(r._nextBatchedEffect=void 0,r._flags&=~x,!(r._flags&T)&&ue(r))try{r._callback()}catch(o){e||(t=o,e=!0)}r=n}}if(F=0,w--,e)throw t}function ie(t){if(w>0)return t();C();try{return t()}finally{L()}}var a;var E,w=0,F=0,N=0;function ae(t){if(a===void 0)return;let e=t._node;if(e===void 0||e._target!==a)return e={_version:0,_source:t,_prevSource:a._sources,_nextSource:void 0,_target:a,_prevTarget:void 0,_nextTarget:void 0,_rollbackNode:e},a._sources!==void 0&&(a._sources._nextSource=e),a._sources=e,t._node=e,a._flags&b&&t._subscribe(e),e;if(e._version===-1)return e._version=0,e._nextSource!==void 0&&(e._nextSource._prevSource=e._prevSource,e._prevSource!==void 0&&(e._prevSource._nextSource=e._nextSource),e._prevSource=a._sources,e._nextSource=void 0,a._sources._nextSource=e,a._sources=e),e}function l(t){this._value=t,this._version=0,this._node=void 0,this._targets=void 0}l.prototype.brand=xe;l.prototype._refresh=function(){return!0};l.prototype._subscribe=function(t){this._targets!==t&&t._prevTarget===void 0&&(t._nextTarget=this._targets,this._targets!==void 0&&(this._targets._prevTarget=t),this._targets=t)};l.prototype._unsubscribe=function(t){if(this._targets!==void 0){let e=t._prevTarget,r=t._nextTarget;e!==void 0&&(e._nextTarget=r,t._prevTarget=void 0),r!==void 0&&(r._prevTarget=e,t._nextTarget=void 0),t===this._targets&&(this._targets=r)}};l.prototype.subscribe=function(t){return U(()=>{let e=this.value,r=a;a=void 0;try{t(e)}finally{a=r}})};l.prototype.valueOf=function(){return this.value};l.prototype.toString=function(){return this.value+""};l.prototype.toJSON=function(){return this.value};l.prototype.peek=function(){let t=a;a=void 0;try{return this.value}finally{a=t}};Object.defineProperty(l.prototype,"value",{get(){let t=ae(this);return t!==void 0&&(t._version=this._version),this._value},set(t){if(t!==this._value){if(F>100)throw new Error("Cycle detected");this._value=t,this._version++,N++,C();try{for(let e=this._targets;e!==void 0;e=e._nextTarget)e._target._notify()}finally{L()}}}});function k(t){return new l(t)}function ue(t){for(let e=t._sources;e!==void 0;e=e._nextSource)if(e._source._version!==e._version||!e._source._refresh()||e._source._version!==e._version)return!0;return!1}function le(t){for(let e=t._sources;e!==void 0;e=e._nextSource){let r=e._source._node;if(r!==void 0&&(e._rollbackNode=r),e._source._node=e,e._version=-1,e._nextSource===void 0){t._sources=e;break}}}function ce(t){let e=t._sources,r;for(;e!==void 0;){let n=e._prevSource;e._version===-1?(e._source._unsubscribe(e),n!==void 0&&(n._nextSource=e._nextSource),e._nextSource!==void 0&&(e._nextSource._prevSource=n)):r=e,e._source._node=e._rollbackNode,e._rollbackNode!==void 0&&(e._rollbackNode=void 0),e=n}t._sources=r}function S(t){l.call(this,void 0),this._fn=t,this._sources=void 0,this._globalVersion=N-1,this._flags=R}S.prototype=new l;S.prototype._refresh=function(){if(this._flags&=~x,this._flags&g)return!1;if((this._flags&(R|b))===b||(this._flags&=~R,this._globalVersion===N))return!0;if(this._globalVersion=N,this._flags|=g,this._version>0&&!ue(this))return this._flags&=~g,!0;let t=a;try{le(this),a=this;let e=this._fn();(this._flags&A||this._value!==e||this._version===0)&&(this._value=e,this._flags&=~A,this._version++)}catch(e){this._value=e,this._flags|=A,this._version++}return a=t,ce(this),this._flags&=~g,!0};S.prototype._subscribe=function(t){if(this._targets===void 0){this._flags|=R|b;for(let e=this._sources;e!==void 0;e=e._nextSource)e._source._subscribe(e)}l.prototype._subscribe.call(this,t)};S.prototype._unsubscribe=function(t){if(this._targets!==void 0&&(l.prototype._unsubscribe.call(this,t),this._targets===void 0)){this._flags&=~b;for(let e=this._sources;e!==void 0;e=e._nextSource)e._source._unsubscribe(e)}};S.prototype._notify=function(){if(!(this._flags&x)){this._flags|=R|x;for(let t=this._targets;t!==void 0;t=t._nextTarget)t._target._notify()}};Object.defineProperty(S.prototype,"value",{get(){if(this._flags&g)throw new Error("Cycle detected");let t=ae(this);if(this._refresh(),t!==void 0&&(t._version=this._version),this._flags&A)throw this._value;return this._value}});function fe(t){return new S(t)}function pe(t){let e=t._cleanup;if(t._cleanup=void 0,typeof e=="function"){C();let r=a;a=void 0;try{e()}catch(n){throw t._flags&=~g,t._flags|=T,G(t),n}finally{a=r,L()}}}function G(t){for(let e=t._sources;e!==void 0;e=e._nextSource)e._source._unsubscribe(e);t._fn=void 0,t._sources=void 0,pe(t)}function be(t){if(a!==this)throw new Error("Out-of-order effect");ce(this),a=t,this._flags&=~g,this._flags&T&&G(this),L()}function P(t){this._fn=t,this._cleanup=void 0,this._sources=void 0,this._nextBatchedEffect=void 0,this._flags=b}P.prototype._callback=function(){let t=this._start();try{if(this._flags&T||this._fn===void 0)return;let e=this._fn();typeof e=="function"&&(this._cleanup=e)}finally{t()}};P.prototype._start=function(){if(this._flags&g)throw new Error("Cycle detected");this._flags|=g,this._flags&=~T,pe(this),le(this),C();let t=a;return a=this,be.bind(this,t)};P.prototype._notify=function(){this._flags&x||(this._flags|=x,this._nextBatchedEffect=E,E=this)};P.prototype._dispose=function(){this._flags|=T,this._flags&g||G(this)};function U(t){let e=new P(t);try{e._callback()}catch(r){throw e._dispose(),r}return e._dispose.bind(e)}var I=class{get value(){return V(this)}set value(e){ie(()=>Te(this,e))}peek(){return V(this,{peek:!0})}},D=t=>Object.assign(new I,Object.entries(t).reduce((e,[r,n])=>{if(["value","peek"].some(o=>o===r))throw new Error(`${r} is a reserved property name`);return typeof n!="object"||n===null||Array.isArray(n)?e[r]=k(n):e[r]=D(n),e},{})),Te=(t,e)=>Object.keys(e).forEach(r=>t[r].value=e[r]),V=(t,{peek:e=!1}={})=>Object.entries(t).reduce((r,[n,o])=>(o instanceof l?r[n]=e?o.peek():o.value:o instanceof I&&(r[n]=V(o,{peek:e})),r),{});function B(t,e){if(typeof e!="object"||Array.isArray(e)||!e)return JSON.parse(JSON.stringify(e));if(typeof e=="object"&&e.toJSON!==void 0&&typeof e.toJSON=="function")return e.toJSON();let r=t;return typeof t!="object"&&(r={...e}),Object.keys(e).forEach(n=>{r.hasOwnProperty(n)||(r[n]=e[n]),e[n]===null?delete r[n]:r[n]=B(r[n],e[n])}),r}var de="0.20.0";var Ee=t=>t.pluginType===m,we=t=>t.pluginType===Q,Re=t=>t.pluginType===v,Pe=t=>t.pluginType===Z,$=(t,e)=>new Error(`A ${t} named '${e}' already exists`),j=class{constructor(){this.plugins=[];this.store=D({_dsPlugins:{}});this.preprocessors=new Array;this.actions={};this.watchers=new Array;this.refs={};this.reactivity={signal:k,computed:fe,effect:U};this.parentID="";this.missingIDNext=0;this.removals=new Map;this.mergeRemovals=new Array;this.lastMarshalledStore=""}get version(){return de}load(...e){let r=new Set(this.plugins);e.forEach(n=>{if(n.requiredPlugins){for(let s of n.requiredPlugins)if(!r.has(s))throw new Error(`Plugin '${n.name}' requires plugin '${s}' to be loaded`)}let o;if(Ee(n)){if(this.preprocessors.includes(n))throw $("Preprocessor",n.name);this.preprocessors.push(n)}else if(we(n)){if(this.watchers.includes(n))throw $("Watcher",n.name);this.watchers.push(n),o=n.onGlobalInit}else if(Pe(n)){if(this.actions[n.name])throw $("Action",n.name);this.actions[n.name]=n}else if(Re(n)){if(this.plugins.includes(n))throw $("Attribute",n.name);this.plugins.push(n),o=n.onGlobalInit}else throw new Error(`Unknown plugin type: ${n}`);o&&o({store:this.store,upsertIfMissingFromStore:this.upsertIfMissingFromStore.bind(this),mergeStore:this.mergeStore.bind(this),removeFromStore:this.removeFromStore.bind(this),actions:this.actions,reactivity:this.reactivity,applyPlugins:this.applyPlugins.bind(this),cleanupElementRemovals:this.cleanupElementRemovals.bind(this)}),r.add(n)}),this.applyPlugins(document.body)}cleanupElementRemovals(e){let r=this.removals.get(e);if(r){for(let n of r.set)n();this.removals.delete(e)}}mergeStore(e){this.mergeRemovals.forEach(o=>o()),this.mergeRemovals=this.mergeRemovals.slice(0);let r=B(this.store.value,e);this.store=D(r),JSON.stringify(this.store.value),this.lastMarshalledStore}removeFromStore(...e){let r={...this.store.value};for(let n of e){let o=n.split("."),s=o[0],i=r;for(let f=1;f<o.length;f++){let c=o[f];i[s]||(i[s]={}),i=i[s],s=c}delete i[s]}this.store=D(r),this.applyPlugins(document.body)}upsertIfMissingFromStore(e,r){let n=e.split("."),o=this.store;for(let i=0;i<n.length-1;i++){let f=n[i];o[f]||(o[f]={}),o=o[f]}let s=n[n.length-1];o[s]||(o[s]=this.reactivity.signal(r))}signalByName(e){return this.store[e]}applyPlugins(e){let r=new Set;this.plugins.forEach((n,o)=>{this.walkDownDOM(e,s=>{o||this.cleanupElementRemovals(s);for(let i in s.dataset){let f=`${s.dataset[i]}`||"",c=f;if(!i.startsWith(n.name))continue;if(s.id.length===0&&(s.id=`ds-${this.parentID}-${this.missingIDNext++}`),r.clear(),n.allowedTagRegexps){let u=s.tagName.toLowerCase();if(![...n.allowedTagRegexps].some(p=>u.match(p)))throw new Error(`'${s.tagName}' not allowed for '${i}', allowed ${[[...n.allowedTagRegexps].map(p=>`'${p}'`)].join(", ")}`)}let me=i.slice(n.name.length),[_,..._e]=me.split(".");if(n.mustHaveEmptyKey&&_.length>0)throw new Error(`'${i}' must have empty key`);if(n.mustNotEmptyKey&&_.length===0)throw new Error(`'${i}' must have non-empty key`);_.length&&(_=_[0].toLowerCase()+_.slice(1));let H=_e.map(u=>{let[y,...p]=u.split("_");return{label:y,args:p}});if(n.allowedModifiers){for(let u of H)if(!n.allowedModifiers.has(u.label))throw new Error(`'${u.label}' is not allowed`)}let J=new Map;for(let u of H)J.set(u.label,u.args);if(n.mustHaveEmptyExpression&&c.length)throw new Error(`'${i}' must have empty expression`);if(n.mustNotEmptyExpression&&!c.length)throw new Error(`'${i}' must have non-empty expression`);let W=/;|\n/;n.removeNewLines&&(c=c.split(`
`).map(u=>u.trim()).join(" "));let ye=[...n.preprocessors?.pre||[],...this.preprocessors,...n.preprocessors?.post||[]];for(let u of ye){if(r.has(u))continue;r.add(u);let y=c.split(W),p=[];y.forEach(d=>{let h=d,q=[...h.matchAll(u.regexp)];if(q.length)for(let Y of q){if(!Y.groups)continue;let{groups:z}=Y,{whole:Se}=z;h=h.replace(Se,u.replacer(z))}p.push(h)}),c=p.join("; ")}let M={store:()=>this.store,mergeStore:this.mergeStore.bind(this),upsertIfMissingFromStore:this.upsertIfMissingFromStore.bind(this),removeFromStore:this.removeFromStore.bind(this),applyPlugins:this.applyPlugins.bind(this),cleanupElementRemovals:this.cleanupElementRemovals.bind(this),walkSignals:this.walkSignals.bind(this),actions:this.actions,reactivity:this.reactivity,el:s,rawKey:i,key:_,rawExpression:f,expression:c,expressionFn:()=>{throw new Error("Expression function not created")},modifiers:J};if(!n.bypassExpressionFunctionCreation?.(M)&&!n.mustHaveEmptyExpression&&c.length){let u=c.split(W).map(d=>d.trim()).filter(d=>d.length);u[u.length-1]=`return ${u[u.length-1]}`;let y=u.map(d=>`  ${d}`).join(`;
`),p=`
  try {
    const _datastarExpression = () => {
  ${y}
    }
    const _datastarReturnVal = _datastarExpression()
    ctx.sendDatastarEvent('core', 'attributes', 'expr_eval', ctx.el, '${i} equals ' + JSON.stringify(_datastarReturnVal))
    return _datastarReturnVal
  } catch (e) {
   const msg = \`
  Error evaluating Datastar expression:
  ${y.replaceAll("`","\\`")}

  Error: \${e.message}

  Check if the expression is valid before raising an issue.
  \`.trim()
   ctx.sendDatastarEvent('core', 'attributes', 'expr_eval_err', ctx.el, msg)
   console.error(msg)
   debugger
  }
              `;try{let d=n.argumentNames||[],h=new Function("ctx",...d,p);M.expressionFn=h}catch(d){let h=new Error(`Error creating expression function for '${p}', error: ${d}`);console.error(h);debugger}}let K=n.onLoad(M);K&&(this.removals.has(s)||this.removals.set(s,{id:s.id,set:new Set}),this.removals.get(s).set.add(K))}})})}walkSignalsStore(e,r){let n=Object.keys(e);for(let o=0;o<n.length;o++){let s=n[o],i=e[s],f=i instanceof l,c=typeof i=="object"&&Object.keys(i).length>0;if(f){r(s,i);continue}c&&this.walkSignalsStore(i,r)}}walkSignals(e){this.walkSignalsStore(this.store,e)}walkDownDOM(e,r,n=0){if(!e)return;let o=se(e);if(o)for(r(o),n=0,e=e.firstElementChild;e;)this.walkDownDOM(e,r,n++),e=e.nextElementSibling}};var De={Morph:"morph",Inner:"inner",Outer:"outer",Prepend:"prepend",Append:"append",Before:"before",After:"after",UpsertAttributes:"upsertAttributes"},ot=De.Morph;var ge=new j;ge.load(re,oe,te,X);var he=ge;he.load();})();
//# sourceMappingURL=datastar-core.js.map
