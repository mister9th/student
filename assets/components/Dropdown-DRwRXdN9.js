import{B as Pe,a as Re,V as Ke,r as Ie,N as Ce,p as ce}from"./Popover-B71QSRx4.js";import{bP as Oe,bO as ze,bw as q,cC as ie,aO as _e,by as De,bz as $e,bu as G,bQ as F,ad as de,am as B,aN as s,bR as J,aS as T,bh as pe,n as Ae,cp as V,a5 as w,bH as fe,bL as E,b as Fe,cB as Te,p as Be,bo as je,ar as Me,G as N,az as Le,D as L,O as le,K,J as z,bd as Ee,cm as He,cx as ve,cy as Ue,as as We,P as te,ce as I,ae as A}from"../index-BHPrlEyN.js";import{N as qe}from"./Icon-CsDRML0Z.js";import{C as Ge}from"../ChevronRight-BW_PVZlo.js";import{h as se}from"../shared/happens-in-CM8LO42l.js";import{u as Ve}from"../shared/use-merged-state-B6plSYCk.js";import{a as Je}from"../shared/create-B5zygRCT.js";function Qe(e={},n){const d=ze({ctrl:!1,command:!1,win:!1,shift:!1,tab:!1}),{keydown:i,keyup:r}=e,o=a=>{switch(a.key){case"Control":d.ctrl=!0;break;case"Meta":d.command=!0,d.win=!0;break;case"Shift":d.shift=!0;break;case"Tab":d.tab=!0;break}i!==void 0&&Object.keys(i).forEach(m=>{if(m!==a.key)return;const b=i[m];if(typeof b=="function")b(a);else{const{stop:g=!1,prevent:x=!1}=b;g&&a.stopPropagation(),x&&a.preventDefault(),b.handler(a)}})},p=a=>{switch(a.key){case"Control":d.ctrl=!1;break;case"Meta":d.command=!1,d.win=!1;break;case"Shift":d.shift=!1;break;case"Tab":d.tab=!1;break}r!==void 0&&Object.keys(r).forEach(m=>{if(m!==a.key)return;const b=r[m];if(typeof b=="function")b(a);else{const{stop:g=!1,prevent:x=!1}=b;g&&a.stopPropagation(),x&&a.preventDefault(),b.handler(a)}})},v=()=>{(n===void 0||n.value)&&(q("keydown",document,o),q("keyup",document,p)),n!==void 0&&ie(n,a=>{a?(q("keydown",document,o),q("keyup",document,p)):(G("keydown",document,o),G("keyup",document,p))})};return _e()?(De(v),$e(()=>{(n===void 0||n.value)&&(G("keydown",document,o),G("keyup",document,p))})):v(),Oe(d)}function Xe(e,n,d){const i=F(e.value);let r=null;return ie(e,o=>{r!==null&&window.clearTimeout(r),o===!0?d&&!d.value?i.value=!0:r=window.setTimeout(()=>{i.value=!0},n):i.value=!1}),i}function Ye(e){return n=>{n?e.value=n.$el:e.value=null}}const ae=de("n-dropdown-menu"),Q=de("n-dropdown"),ue=de("n-dropdown-option"),he=B({name:"DropdownDivider",props:{clsPrefix:{type:String,required:!0}},render(){return s("div",{class:`${this.clsPrefix}-dropdown-divider`})}}),Ze=B({name:"DropdownGroupHeader",props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){const{showIconRef:e,hasSubmenuRef:n}=T(ae),{renderLabelRef:d,labelFieldRef:i,nodePropsRef:r,renderOptionRef:o}=T(Q);return{labelField:i,showIcon:e,hasSubmenu:n,renderLabel:d,nodeProps:r,renderOption:o}},render(){var e;const{clsPrefix:n,hasSubmenu:d,showIcon:i,nodeProps:r,renderLabel:o,renderOption:p}=this,{rawNode:v}=this.tmNode,a=s("div",Object.assign({class:`${n}-dropdown-option`},r==null?void 0:r(v)),s("div",{class:`${n}-dropdown-option-body ${n}-dropdown-option-body--group`},s("div",{"data-dropdown-option":!0,class:[`${n}-dropdown-option-body__prefix`,i&&`${n}-dropdown-option-body__prefix--show-icon`]},J(v.icon)),s("div",{class:`${n}-dropdown-option-body__label`,"data-dropdown-option":!0},o?o(v):J((e=v.title)!==null&&e!==void 0?e:v[this.labelField])),s("div",{class:[`${n}-dropdown-option-body__suffix`,d&&`${n}-dropdown-option-body__suffix--has-submenu`],"data-dropdown-option":!0})));return p?p({node:a,option:v}):a}});function re(e,n){return e.type==="submenu"||e.type===void 0&&e[n]!==void 0}function eo(e){return e.type==="group"}function be(e){return e.type==="divider"}function oo(e){return e.type==="render"}const we=B({name:"DropdownOption",props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null},placement:{type:String,default:"right-start"},props:Object,scrollable:Boolean},setup(e){const n=T(Q),{hoverKeyRef:d,keyboardKeyRef:i,lastToggledSubmenuKeyRef:r,pendingKeyPathRef:o,activeKeyPathRef:p,animatedRef:v,mergedShowRef:a,renderLabelRef:m,renderIconRef:b,labelFieldRef:g,childrenFieldRef:x,renderOptionRef:k,nodePropsRef:P,menuPropsRef:_}=n,S=T(ue,null),C=T(ae),O=T(fe),U=w(()=>e.tmNode.rawNode),H=w(()=>{const{value:t}=x;return re(e.tmNode.rawNode,t)}),X=w(()=>{const{disabled:t}=e.tmNode;return t}),Y=w(()=>{if(!H.value)return!1;const{key:t,disabled:c}=e.tmNode;if(c)return!1;const{value:y}=d,{value:D}=i,{value:ne}=r,{value:$}=o;return y!==null?$.includes(t):D!==null?$.includes(t)&&$[$.length-1]!==t:ne!==null?$.includes(t):!1}),Z=w(()=>i.value===null&&!v.value),ee=Xe(Y,300,Z),oe=w(()=>!!(S!=null&&S.enteringSubmenuRef.value)),j=F(!1);E(ue,{enteringSubmenuRef:j});function M(){j.value=!0}function W(){j.value=!1}function R(){const{parentKey:t,tmNode:c}=e;c.disabled||a.value&&(r.value=t,i.value=null,d.value=c.key)}function l(){const{tmNode:t}=e;t.disabled||a.value&&d.value!==t.key&&R()}function u(t){if(e.tmNode.disabled||!a.value)return;const{relatedTarget:c}=t;c&&!se({target:c},"dropdownOption")&&!se({target:c},"scrollbarRail")&&(d.value=null)}function f(){const{value:t}=H,{tmNode:c}=e;a.value&&!t&&!c.disabled&&(n.doSelect(c.key,c.rawNode),n.doUpdateShow(!1))}return{labelField:g,renderLabel:m,renderIcon:b,siblingHasIcon:C.showIconRef,siblingHasSubmenu:C.hasSubmenuRef,menuProps:_,popoverBody:O,animated:v,mergedShowSubmenu:w(()=>ee.value&&!oe.value),rawNode:U,hasSubmenu:H,pending:V(()=>{const{value:t}=o,{key:c}=e.tmNode;return t.includes(c)}),childActive:V(()=>{const{value:t}=p,{key:c}=e.tmNode,y=t.findIndex(D=>c===D);return y===-1?!1:y<t.length-1}),active:V(()=>{const{value:t}=p,{key:c}=e.tmNode,y=t.findIndex(D=>c===D);return y===-1?!1:y===t.length-1}),mergedDisabled:X,renderOption:k,nodeProps:P,handleClick:f,handleMouseMove:l,handleMouseEnter:R,handleMouseLeave:u,handleSubmenuBeforeEnter:M,handleSubmenuAfterEnter:W}},render(){var e,n;const{animated:d,rawNode:i,mergedShowSubmenu:r,clsPrefix:o,siblingHasIcon:p,siblingHasSubmenu:v,renderLabel:a,renderIcon:m,renderOption:b,nodeProps:g,props:x,scrollable:k}=this;let P=null;if(r){const O=(e=this.menuProps)===null||e===void 0?void 0:e.call(this,i,i.children);P=s(me,Object.assign({},O,{clsPrefix:o,scrollable:this.scrollable,tmNodes:this.tmNode.children,parentKey:this.tmNode.key}))}const _={class:[`${o}-dropdown-option-body`,this.pending&&`${o}-dropdown-option-body--pending`,this.active&&`${o}-dropdown-option-body--active`,this.childActive&&`${o}-dropdown-option-body--child-active`,this.mergedDisabled&&`${o}-dropdown-option-body--disabled`],onMousemove:this.handleMouseMove,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onClick:this.handleClick},S=g==null?void 0:g(i),C=s("div",Object.assign({class:[`${o}-dropdown-option`,S==null?void 0:S.class],"data-dropdown-option":!0},S),s("div",pe(_,x),[s("div",{class:[`${o}-dropdown-option-body__prefix`,p&&`${o}-dropdown-option-body__prefix--show-icon`]},[m?m(i):J(i.icon)]),s("div",{"data-dropdown-option":!0,class:`${o}-dropdown-option-body__label`},a?a(i):J((n=i[this.labelField])!==null&&n!==void 0?n:i.title)),s("div",{"data-dropdown-option":!0,class:[`${o}-dropdown-option-body__suffix`,v&&`${o}-dropdown-option-body__suffix--has-submenu`]},this.hasSubmenu?s(qe,null,{default:()=>s(Ge,null)}):null)]),this.hasSubmenu?s(Pe,null,{default:()=>[s(Re,null,{default:()=>s("div",{class:`${o}-dropdown-offset-container`},s(Ke,{show:this.mergedShowSubmenu,placement:this.placement,to:k&&this.popoverBody||void 0,teleportDisabled:!k},{default:()=>s("div",{class:`${o}-dropdown-menu-wrapper`},d?s(Ae,{onBeforeEnter:this.handleSubmenuBeforeEnter,onAfterEnter:this.handleSubmenuAfterEnter,name:"fade-in-scale-up-transition",appear:!0},{default:()=>P}):P)}))})]}):null);return b?b({node:C,option:i}):C}}),no=B({name:"NDropdownGroup",props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null}},render(){const{tmNode:e,parentKey:n,clsPrefix:d}=this,{children:i}=e;return s(Fe,null,s(Ze,{clsPrefix:d,tmNode:e,key:e.key}),i==null?void 0:i.map(r=>{const{rawNode:o}=r;return o.show===!1?null:be(o)?s(he,{clsPrefix:d,key:r.key}):r.isGroup?(Te("dropdown","`group` node is not allowed to be put in `group` node."),null):s(we,{clsPrefix:d,tmNode:r,parentKey:n,key:r.key})}))}}),to=B({name:"DropdownRenderOption",props:{tmNode:{type:Object,required:!0}},render(){const{rawNode:{render:e,props:n}}=this.tmNode;return s("div",n,[e==null?void 0:e()])}}),me=B({name:"DropdownMenu",props:{scrollable:Boolean,showArrow:Boolean,arrowStyle:[String,Object],clsPrefix:{type:String,required:!0},tmNodes:{type:Array,default:()=>[]},parentKey:{type:[String,Number],default:null}},setup(e){const{renderIconRef:n,childrenFieldRef:d}=T(Q);E(ae,{showIconRef:w(()=>{const r=n.value;return e.tmNodes.some(o=>{var p;if(o.isGroup)return(p=o.children)===null||p===void 0?void 0:p.some(({rawNode:a})=>r?r(a):a.icon);const{rawNode:v}=o;return r?r(v):v.icon})}),hasSubmenuRef:w(()=>{const{value:r}=d;return e.tmNodes.some(o=>{var p;if(o.isGroup)return(p=o.children)===null||p===void 0?void 0:p.some(({rawNode:a})=>re(a,r));const{rawNode:v}=o;return re(v,r)})})});const i=F(null);return E(je,null),E(Me,null),E(fe,i),{bodyRef:i}},render(){const{parentKey:e,clsPrefix:n,scrollable:d}=this,i=this.tmNodes.map(r=>{const{rawNode:o}=r;return o.show===!1?null:oo(o)?s(to,{tmNode:r,key:r.key}):be(o)?s(he,{clsPrefix:n,key:r.key}):eo(o)?s(no,{clsPrefix:n,tmNode:r,parentKey:e,key:r.key}):s(we,{clsPrefix:n,tmNode:r,parentKey:e,key:r.key,props:o.props,scrollable:d})});return s("div",{class:[`${n}-dropdown-menu`,d&&`${n}-dropdown-menu--scrollable`],ref:"bodyRef"},d?s(Be,{contentClass:`${n}-dropdown-menu__content`},{default:()=>i}):i,this.showArrow?Ie({clsPrefix:n,arrowStyle:this.arrowStyle,arrowClass:void 0,arrowWrapperClass:void 0,arrowWrapperStyle:void 0}):null)}}),ro=N("dropdown-menu",`
 transform-origin: var(--v-transform-origin);
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 box-shadow: var(--n-box-shadow);
 position: relative;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
`,[Le(),N("dropdown-option",`
 position: relative;
 `,[L("a",`
 text-decoration: none;
 color: inherit;
 outline: none;
 `,[L("&::before",`
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),N("dropdown-option-body",`
 display: flex;
 cursor: pointer;
 position: relative;
 height: var(--n-option-height);
 line-height: var(--n-option-height);
 font-size: var(--n-font-size);
 color: var(--n-option-text-color);
 transition: color .3s var(--n-bezier);
 `,[L("&::before",`
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 left: 4px;
 right: 4px;
 transition: background-color .3s var(--n-bezier);
 border-radius: var(--n-border-radius);
 `),le("disabled",[K("pending",`
 color: var(--n-option-text-color-hover);
 `,[z("prefix, suffix",`
 color: var(--n-option-text-color-hover);
 `),L("&::before","background-color: var(--n-option-color-hover);")]),K("active",`
 color: var(--n-option-text-color-active);
 `,[z("prefix, suffix",`
 color: var(--n-option-text-color-active);
 `),L("&::before","background-color: var(--n-option-color-active);")]),K("child-active",`
 color: var(--n-option-text-color-child-active);
 `,[z("prefix, suffix",`
 color: var(--n-option-text-color-child-active);
 `)])]),K("disabled",`
 cursor: not-allowed;
 opacity: var(--n-option-opacity-disabled);
 `),K("group",`
 font-size: calc(var(--n-font-size) - 1px);
 color: var(--n-group-header-text-color);
 `,[z("prefix",`
 width: calc(var(--n-option-prefix-width) / 2);
 `,[K("show-icon",`
 width: calc(var(--n-option-icon-prefix-width) / 2);
 `)])]),z("prefix",`
 width: var(--n-option-prefix-width);
 display: flex;
 justify-content: center;
 align-items: center;
 color: var(--n-prefix-color);
 transition: color .3s var(--n-bezier);
 z-index: 1;
 `,[K("show-icon",`
 width: var(--n-option-icon-prefix-width);
 `),N("icon",`
 font-size: var(--n-option-icon-size);
 `)]),z("label",`
 white-space: nowrap;
 flex: 1;
 z-index: 1;
 `),z("suffix",`
 box-sizing: border-box;
 flex-grow: 0;
 flex-shrink: 0;
 display: flex;
 justify-content: flex-end;
 align-items: center;
 min-width: var(--n-option-suffix-width);
 padding: 0 8px;
 transition: color .3s var(--n-bezier);
 color: var(--n-suffix-color);
 z-index: 1;
 `,[K("has-submenu",`
 width: var(--n-option-icon-suffix-width);
 `),N("icon",`
 font-size: var(--n-option-icon-size);
 `)]),N("dropdown-menu","pointer-events: all;")]),N("dropdown-offset-container",`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: -4px;
 bottom: -4px;
 `)]),N("dropdown-divider",`
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 4px 0;
 `),N("dropdown-menu-wrapper",`
 transform-origin: var(--v-transform-origin);
 width: fit-content;
 `),L(">",[N("scrollbar",`
 height: inherit;
 max-height: inherit;
 `)]),le("scrollable",`
 padding: var(--n-padding);
 `),K("scrollable",[z("content",`
 padding: var(--n-padding);
 `)])]),io={animated:{type:Boolean,default:!0},keyboard:{type:Boolean,default:!0},size:String,inverted:Boolean,placement:{type:String,default:"bottom"},onSelect:[Function,Array],options:{type:Array,default:()=>[]},menuProps:Function,showArrow:Boolean,renderLabel:Function,renderIcon:Function,renderOption:Function,nodeProps:Function,labelField:{type:String,default:"label"},keyField:{type:String,default:"key"},childrenField:{type:String,default:"children"},value:[String,Number]},ao=Object.keys(ce),lo=Object.assign(Object.assign(Object.assign({},ce),io),ve.props),bo=B({name:"Dropdown",inheritAttrs:!1,props:lo,setup(e){const n=F(!1),d=Ve(I(e,"show"),n),i=w(()=>{const{keyField:l,childrenField:u}=e;return Je(e.options,{getKey(f){return f[l]},getDisabled(f){return f.disabled===!0},getIgnored(f){return f.type==="divider"||f.type==="render"},getChildren(f){return f[u]}})}),r=w(()=>i.value.treeNodes),o=F(null),p=F(null),v=F(null),a=w(()=>{var l,u,f;return(f=(u=(l=o.value)!==null&&l!==void 0?l:p.value)!==null&&u!==void 0?u:v.value)!==null&&f!==void 0?f:null}),m=w(()=>i.value.getPath(a.value).keyPath),b=w(()=>i.value.getPath(e.value).keyPath),g=V(()=>e.keyboard&&d.value);Qe({keydown:{ArrowUp:{prevent:!0,handler:Z},ArrowRight:{prevent:!0,handler:Y},ArrowDown:{prevent:!0,handler:ee},ArrowLeft:{prevent:!0,handler:X},Enter:{prevent:!0,handler:oe},Escape:H}},g);const{mergedClsPrefixRef:x,inlineThemeDisabled:k,mergedComponentPropsRef:P}=He(e),_=w(()=>{var l,u;return e.size||((u=(l=P==null?void 0:P.value)===null||l===void 0?void 0:l.Dropdown)===null||u===void 0?void 0:u.size)||"medium"}),S=ve("Dropdown","-dropdown",ro,We,e,x);E(Q,{labelFieldRef:I(e,"labelField"),childrenFieldRef:I(e,"childrenField"),renderLabelRef:I(e,"renderLabel"),renderIconRef:I(e,"renderIcon"),hoverKeyRef:o,keyboardKeyRef:p,lastToggledSubmenuKeyRef:v,pendingKeyPathRef:m,activeKeyPathRef:b,animatedRef:I(e,"animated"),mergedShowRef:d,nodePropsRef:I(e,"nodeProps"),renderOptionRef:I(e,"renderOption"),menuPropsRef:I(e,"menuProps"),doSelect:C,doUpdateShow:O}),ie(d,l=>{!e.animated&&!l&&U()});function C(l,u){const{onSelect:f}=e;f&&te(f,l,u)}function O(l){const{"onUpdate:show":u,onUpdateShow:f}=e;u&&te(u,l),f&&te(f,l),n.value=l}function U(){o.value=null,p.value=null,v.value=null}function H(){O(!1)}function X(){M("left")}function Y(){M("right")}function Z(){M("up")}function ee(){M("down")}function oe(){const l=j();l!=null&&l.isLeaf&&d.value&&(C(l.key,l.rawNode),O(!1))}function j(){var l;const{value:u}=i,{value:f}=a;return!u||f===null?null:(l=u.getNode(f))!==null&&l!==void 0?l:null}function M(l){const{value:u}=a,{value:{getFirstAvailableNode:f}}=i;let t=null;if(u===null){const c=f();c!==null&&(t=c.key)}else{const c=j();if(c){let y;switch(l){case"down":y=c.getNext();break;case"up":y=c.getPrev();break;case"right":y=c.getChild();break;case"left":y=c.getParent();break}y&&(t=y.key)}}t!==null&&(o.value=null,p.value=t)}const W=w(()=>{const{inverted:l}=e,u=_.value,{common:{cubicBezierEaseInOut:f},self:t}=S.value,{padding:c,dividerColor:y,borderRadius:D,optionOpacityDisabled:ne,[A("optionIconSuffixWidth",u)]:$,[A("optionSuffixWidth",u)]:ye,[A("optionIconPrefixWidth",u)]:ge,[A("optionPrefixWidth",u)]:xe,[A("fontSize",u)]:Se,[A("optionHeight",u)]:Ne,[A("optionIconSize",u)]:ke}=t,h={"--n-bezier":f,"--n-font-size":Se,"--n-padding":c,"--n-border-radius":D,"--n-option-height":Ne,"--n-option-prefix-width":xe,"--n-option-icon-prefix-width":ge,"--n-option-suffix-width":ye,"--n-option-icon-suffix-width":$,"--n-option-icon-size":ke,"--n-divider-color":y,"--n-option-opacity-disabled":ne};return l?(h["--n-color"]=t.colorInverted,h["--n-option-color-hover"]=t.optionColorHoverInverted,h["--n-option-color-active"]=t.optionColorActiveInverted,h["--n-option-text-color"]=t.optionTextColorInverted,h["--n-option-text-color-hover"]=t.optionTextColorHoverInverted,h["--n-option-text-color-active"]=t.optionTextColorActiveInverted,h["--n-option-text-color-child-active"]=t.optionTextColorChildActiveInverted,h["--n-prefix-color"]=t.prefixColorInverted,h["--n-suffix-color"]=t.suffixColorInverted,h["--n-group-header-text-color"]=t.groupHeaderTextColorInverted):(h["--n-color"]=t.color,h["--n-option-color-hover"]=t.optionColorHover,h["--n-option-color-active"]=t.optionColorActive,h["--n-option-text-color"]=t.optionTextColor,h["--n-option-text-color-hover"]=t.optionTextColorHover,h["--n-option-text-color-active"]=t.optionTextColorActive,h["--n-option-text-color-child-active"]=t.optionTextColorChildActive,h["--n-prefix-color"]=t.prefixColor,h["--n-suffix-color"]=t.suffixColor,h["--n-group-header-text-color"]=t.groupHeaderTextColor),h}),R=k?Ue("dropdown",w(()=>`${_.value[0]}${e.inverted?"i":""}`),W,e):void 0;return{mergedClsPrefix:x,mergedTheme:S,mergedSize:_,tmNodes:r,mergedShow:d,handleAfterLeave:()=>{e.animated&&U()},doUpdateShow:O,cssVars:k?void 0:W,themeClass:R==null?void 0:R.themeClass,onRender:R==null?void 0:R.onRender}},render(){const e=(i,r,o,p,v)=>{var a;const{mergedClsPrefix:m,menuProps:b}=this;(a=this.onRender)===null||a===void 0||a.call(this);const g=(b==null?void 0:b(void 0,this.tmNodes.map(k=>k.rawNode)))||{},x={ref:Ye(r),class:[i,`${m}-dropdown`,`${m}-dropdown--${this.mergedSize}-size`,this.themeClass],clsPrefix:m,tmNodes:this.tmNodes,style:[...o,this.cssVars],showArrow:this.showArrow,arrowStyle:this.arrowStyle,scrollable:this.scrollable,onMouseenter:p,onMouseleave:v};return s(me,pe(this.$attrs,x,g))},{mergedTheme:n}=this,d={show:this.mergedShow,theme:n.peers.Popover,themeOverrides:n.peerOverrides.Popover,internalOnAfterLeave:this.handleAfterLeave,internalRenderBody:e,onUpdateShow:this.doUpdateShow,"onUpdate:show":void 0};return s(Ce,Object.assign({},Ee(this.$props,ao),d),{trigger:()=>{var i,r;return(r=(i=this.$slots).default)===null||r===void 0?void 0:r.call(i)}})}});export{bo as N,Ye as c,Qe as u};
