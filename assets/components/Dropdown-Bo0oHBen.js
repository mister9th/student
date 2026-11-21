import{B as Pe,a as Re,V as Ke,r as Ie,N as Ce,p as ce}from"./Popover-DC89Vge5.js";import{bU as Oe,bT as _e,bB as q,cK as ie,aT as ze,bD as De,bE as $e,bz as G,bV as A,af as de,ao as B,aS as s,bW as Q,aX as F,bm as pe,n as Te,cx as V,a7 as w,bM as fe,bQ as H,b as Ae,cJ as Fe,q as Be,bt as je,at as Me,H as k,aE as Ee,G as E,P as le,O as K,K as _,bi as He,cs as Le,cF as ve,cG as Ue,aw as We,Q as te,ck as I,ag as T}from"../index-DYWs6O1r.js";import{N as qe}from"./Icon-Dac491N0.js";import{C as Ge}from"../icons/ChevronRight-wG2tyLLd.js";import{h as se}from"../shared/happens-in-CM8LO42l.js";import{u as Ve}from"../shared/use-merged-state-Kt_F9tnB.js";import{a as Qe}from"../shared/create-xMIpMBd9.js";function Xe(e={},n){const d=_e({ctrl:!1,command:!1,win:!1,shift:!1,tab:!1}),{keydown:i,keyup:r}=e,o=a=>{switch(a.key){case"Control":d.ctrl=!0;break;case"Meta":d.command=!0,d.win=!0;break;case"Shift":d.shift=!0;break;case"Tab":d.tab=!0;break}i!==void 0&&Object.keys(i).forEach(m=>{if(m!==a.key)return;const b=i[m];if(typeof b=="function")b(a);else{const{stop:g=!1,prevent:x=!1}=b;g&&a.stopPropagation(),x&&a.preventDefault(),b.handler(a)}})},p=a=>{switch(a.key){case"Control":d.ctrl=!1;break;case"Meta":d.command=!1,d.win=!1;break;case"Shift":d.shift=!1;break;case"Tab":d.tab=!1;break}r!==void 0&&Object.keys(r).forEach(m=>{if(m!==a.key)return;const b=r[m];if(typeof b=="function")b(a);else{const{stop:g=!1,prevent:x=!1}=b;g&&a.stopPropagation(),x&&a.preventDefault(),b.handler(a)}})},v=()=>{(n===void 0||n.value)&&(q("keydown",document,o),q("keyup",document,p)),n!==void 0&&ie(n,a=>{a?(q("keydown",document,o),q("keyup",document,p)):(G("keydown",document,o),G("keyup",document,p))})};return ze()?(De(v),$e(()=>{(n===void 0||n.value)&&(G("keydown",document,o),G("keyup",document,p))})):v(),Oe(d)}function Je(e,n,d){const i=A(e.value);let r=null;return ie(e,o=>{r!==null&&window.clearTimeout(r),o===!0?d&&!d.value?i.value=!0:r=window.setTimeout(()=>{i.value=!0},n):i.value=!1}),i}function Ye(e){return n=>{n?e.value=n.$el:e.value=null}}const ae=de("n-dropdown-menu"),X=de("n-dropdown"),ue=de("n-dropdown-option"),he=B({name:"DropdownDivider",props:{clsPrefix:{type:String,required:!0}},render(){return s("div",{class:`${this.clsPrefix}-dropdown-divider`})}}),Ze=B({name:"DropdownGroupHeader",props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){const{showIconRef:e,hasSubmenuRef:n}=F(ae),{renderLabelRef:d,labelFieldRef:i,nodePropsRef:r,renderOptionRef:o}=F(X);return{labelField:i,showIcon:e,hasSubmenu:n,renderLabel:d,nodeProps:r,renderOption:o}},render(){var e;const{clsPrefix:n,hasSubmenu:d,showIcon:i,nodeProps:r,renderLabel:o,renderOption:p}=this,{rawNode:v}=this.tmNode,a=s("div",Object.assign({class:`${n}-dropdown-option`},r==null?void 0:r(v)),s("div",{class:`${n}-dropdown-option-body ${n}-dropdown-option-body--group`},s("div",{"data-dropdown-option":!0,class:[`${n}-dropdown-option-body__prefix`,i&&`${n}-dropdown-option-body__prefix--show-icon`]},Q(v.icon)),s("div",{class:`${n}-dropdown-option-body__label`,"data-dropdown-option":!0},o?o(v):Q((e=v.title)!==null&&e!==void 0?e:v[this.labelField])),s("div",{class:[`${n}-dropdown-option-body__suffix`,d&&`${n}-dropdown-option-body__suffix--has-submenu`],"data-dropdown-option":!0})));return p?p({node:a,option:v}):a}});function re(e,n){return e.type==="submenu"||e.type===void 0&&e[n]!==void 0}function eo(e){return e.type==="group"}function be(e){return e.type==="divider"}function oo(e){return e.type==="render"}const we=B({name:"DropdownOption",props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null},placement:{type:String,default:"right-start"},props:Object,scrollable:Boolean},setup(e){const n=F(X),{hoverKeyRef:d,keyboardKeyRef:i,lastToggledSubmenuKeyRef:r,pendingKeyPathRef:o,activeKeyPathRef:p,animatedRef:v,mergedShowRef:a,renderLabelRef:m,renderIconRef:b,labelFieldRef:g,childrenFieldRef:x,renderOptionRef:N,nodePropsRef:P,menuPropsRef:z}=n,S=F(ue,null),C=F(ae),O=F(fe),U=w(()=>e.tmNode.rawNode),L=w(()=>{const{value:t}=x;return re(e.tmNode.rawNode,t)}),J=w(()=>{const{disabled:t}=e.tmNode;return t}),Y=w(()=>{if(!L.value)return!1;const{key:t,disabled:c}=e.tmNode;if(c)return!1;const{value:y}=d,{value:D}=i,{value:ne}=r,{value:$}=o;return y!==null?$.includes(t):D!==null?$.includes(t)&&$[$.length-1]!==t:ne!==null?$.includes(t):!1}),Z=w(()=>i.value===null&&!v.value),ee=Je(Y,300,Z),oe=w(()=>!!(S!=null&&S.enteringSubmenuRef.value)),j=A(!1);H(ue,{enteringSubmenuRef:j});function M(){j.value=!0}function W(){j.value=!1}function R(){const{parentKey:t,tmNode:c}=e;c.disabled||a.value&&(r.value=t,i.value=null,d.value=c.key)}function l(){const{tmNode:t}=e;t.disabled||a.value&&d.value!==t.key&&R()}function u(t){if(e.tmNode.disabled||!a.value)return;const{relatedTarget:c}=t;c&&!se({target:c},"dropdownOption")&&!se({target:c},"scrollbarRail")&&(d.value=null)}function f(){const{value:t}=L,{tmNode:c}=e;a.value&&!t&&!c.disabled&&(n.doSelect(c.key,c.rawNode),n.doUpdateShow(!1))}return{labelField:g,renderLabel:m,renderIcon:b,siblingHasIcon:C.showIconRef,siblingHasSubmenu:C.hasSubmenuRef,menuProps:z,popoverBody:O,animated:v,mergedShowSubmenu:w(()=>ee.value&&!oe.value),rawNode:U,hasSubmenu:L,pending:V(()=>{const{value:t}=o,{key:c}=e.tmNode;return t.includes(c)}),childActive:V(()=>{const{value:t}=p,{key:c}=e.tmNode,y=t.findIndex(D=>c===D);return y===-1?!1:y<t.length-1}),active:V(()=>{const{value:t}=p,{key:c}=e.tmNode,y=t.findIndex(D=>c===D);return y===-1?!1:y===t.length-1}),mergedDisabled:J,renderOption:N,nodeProps:P,handleClick:f,handleMouseMove:l,handleMouseEnter:R,handleMouseLeave:u,handleSubmenuBeforeEnter:M,handleSubmenuAfterEnter:W}},render(){var e,n;const{animated:d,rawNode:i,mergedShowSubmenu:r,clsPrefix:o,siblingHasIcon:p,siblingHasSubmenu:v,renderLabel:a,renderIcon:m,renderOption:b,nodeProps:g,props:x,scrollable:N}=this;let P=null;if(r){const O=(e=this.menuProps)===null||e===void 0?void 0:e.call(this,i,i.children);P=s(me,Object.assign({},O,{clsPrefix:o,scrollable:this.scrollable,tmNodes:this.tmNode.children,parentKey:this.tmNode.key}))}const z={class:[`${o}-dropdown-option-body`,this.pending&&`${o}-dropdown-option-body--pending`,this.active&&`${o}-dropdown-option-body--active`,this.childActive&&`${o}-dropdown-option-body--child-active`,this.mergedDisabled&&`${o}-dropdown-option-body--disabled`],onMousemove:this.handleMouseMove,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onClick:this.handleClick},S=g==null?void 0:g(i),C=s("div",Object.assign({class:[`${o}-dropdown-option`,S==null?void 0:S.class],"data-dropdown-option":!0},S),s("div",pe(z,x),[s("div",{class:[`${o}-dropdown-option-body__prefix`,p&&`${o}-dropdown-option-body__prefix--show-icon`]},[m?m(i):Q(i.icon)]),s("div",{"data-dropdown-option":!0,class:`${o}-dropdown-option-body__label`},a?a(i):Q((n=i[this.labelField])!==null&&n!==void 0?n:i.title)),s("div",{"data-dropdown-option":!0,class:[`${o}-dropdown-option-body__suffix`,v&&`${o}-dropdown-option-body__suffix--has-submenu`]},this.hasSubmenu?s(qe,null,{default:()=>s(Ge,null)}):null)]),this.hasSubmenu?s(Pe,null,{default:()=>[s(Re,null,{default:()=>s("div",{class:`${o}-dropdown-offset-container`},s(Ke,{show:this.mergedShowSubmenu,placement:this.placement,to:N&&this.popoverBody||void 0,teleportDisabled:!N},{default:()=>s("div",{class:`${o}-dropdown-menu-wrapper`},d?s(Te,{onBeforeEnter:this.handleSubmenuBeforeEnter,onAfterEnter:this.handleSubmenuAfterEnter,name:"fade-in-scale-up-transition",appear:!0},{default:()=>P}):P)}))})]}):null);return b?b({node:C,option:i}):C}}),no=B({name:"NDropdownGroup",props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null}},render(){const{tmNode:e,parentKey:n,clsPrefix:d}=this,{children:i}=e;return s(Ae,null,s(Ze,{clsPrefix:d,tmNode:e,key:e.key}),i==null?void 0:i.map(r=>{const{rawNode:o}=r;return o.show===!1?null:be(o)?s(he,{clsPrefix:d,key:r.key}):r.isGroup?(Fe("dropdown","`group` node is not allowed to be put in `group` node."),null):s(we,{clsPrefix:d,tmNode:r,parentKey:n,key:r.key})}))}}),to=B({name:"DropdownRenderOption",props:{tmNode:{type:Object,required:!0}},render(){const{rawNode:{render:e,props:n}}=this.tmNode;return s("div",n,[e==null?void 0:e()])}}),me=B({name:"DropdownMenu",props:{scrollable:Boolean,showArrow:Boolean,arrowStyle:[String,Object],clsPrefix:{type:String,required:!0},tmNodes:{type:Array,default:()=>[]},parentKey:{type:[String,Number],default:null}},setup(e){const{renderIconRef:n,childrenFieldRef:d}=F(X);H(ae,{showIconRef:w(()=>{const r=n.value;return e.tmNodes.some(o=>{var p;if(o.isGroup)return(p=o.children)===null||p===void 0?void 0:p.some(({rawNode:a})=>r?r(a):a.icon);const{rawNode:v}=o;return r?r(v):v.icon})}),hasSubmenuRef:w(()=>{const{value:r}=d;return e.tmNodes.some(o=>{var p;if(o.isGroup)return(p=o.children)===null||p===void 0?void 0:p.some(({rawNode:a})=>re(a,r));const{rawNode:v}=o;return re(v,r)})})});const i=A(null);return H(je,null),H(Me,null),H(fe,i),{bodyRef:i}},render(){const{parentKey:e,clsPrefix:n,scrollable:d}=this,i=this.tmNodes.map(r=>{const{rawNode:o}=r;return o.show===!1?null:oo(o)?s(to,{tmNode:r,key:r.key}):be(o)?s(he,{clsPrefix:n,key:r.key}):eo(o)?s(no,{clsPrefix:n,tmNode:r,parentKey:e,key:r.key}):s(we,{clsPrefix:n,tmNode:r,parentKey:e,key:r.key,props:o.props,scrollable:d})});return s("div",{class:[`${n}-dropdown-menu`,d&&`${n}-dropdown-menu--scrollable`],ref:"bodyRef"},d?s(Be,{contentClass:`${n}-dropdown-menu__content`},{default:()=>i}):i,this.showArrow?Ie({clsPrefix:n,arrowStyle:this.arrowStyle,arrowClass:void 0,arrowWrapperClass:void 0,arrowWrapperStyle:void 0}):null)}}),ro=k("dropdown-menu",`
 transform-origin: var(--v-transform-origin);
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 box-shadow: var(--n-box-shadow);
 position: relative;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
`,[Ee(),k("dropdown-option",`
 position: relative;
 `,[E("a",`
 text-decoration: none;
 color: inherit;
 outline: none;
 `,[E("&::before",`
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),k("dropdown-option-body",`
 display: flex;
 cursor: pointer;
 position: relative;
 height: var(--n-option-height);
 line-height: var(--n-option-height);
 font-size: var(--n-font-size);
 color: var(--n-option-text-color);
 transition: color .3s var(--n-bezier);
 `,[E("&::before",`
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
 `,[_("prefix, suffix",`
 color: var(--n-option-text-color-hover);
 `),E("&::before","background-color: var(--n-option-color-hover);")]),K("active",`
 color: var(--n-option-text-color-active);
 `,[_("prefix, suffix",`
 color: var(--n-option-text-color-active);
 `),E("&::before","background-color: var(--n-option-color-active);")]),K("child-active",`
 color: var(--n-option-text-color-child-active);
 `,[_("prefix, suffix",`
 color: var(--n-option-text-color-child-active);
 `)])]),K("disabled",`
 cursor: not-allowed;
 opacity: var(--n-option-opacity-disabled);
 `),K("group",`
 font-size: calc(var(--n-font-size) - 1px);
 color: var(--n-group-header-text-color);
 `,[_("prefix",`
 width: calc(var(--n-option-prefix-width) / 2);
 `,[K("show-icon",`
 width: calc(var(--n-option-icon-prefix-width) / 2);
 `)])]),_("prefix",`
 width: var(--n-option-prefix-width);
 display: flex;
 justify-content: center;
 align-items: center;
 color: var(--n-prefix-color);
 transition: color .3s var(--n-bezier);
 z-index: 1;
 `,[K("show-icon",`
 width: var(--n-option-icon-prefix-width);
 `),k("icon",`
 font-size: var(--n-option-icon-size);
 `)]),_("label",`
 white-space: nowrap;
 flex: 1;
 z-index: 1;
 `),_("suffix",`
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
 `),k("icon",`
 font-size: var(--n-option-icon-size);
 `)]),k("dropdown-menu","pointer-events: all;")]),k("dropdown-offset-container",`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: -4px;
 bottom: -4px;
 `)]),k("dropdown-divider",`
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 4px 0;
 `),k("dropdown-menu-wrapper",`
 transform-origin: var(--v-transform-origin);
 width: fit-content;
 `),E(">",[k("scrollbar",`
 height: inherit;
 max-height: inherit;
 `)]),le("scrollable",`
 padding: var(--n-padding);
 `),K("scrollable",[_("content",`
 padding: var(--n-padding);
 `)])]),io={animated:{type:Boolean,default:!0},keyboard:{type:Boolean,default:!0},size:String,inverted:Boolean,placement:{type:String,default:"bottom"},onSelect:[Function,Array],options:{type:Array,default:()=>[]},menuProps:Function,showArrow:Boolean,renderLabel:Function,renderIcon:Function,renderOption:Function,nodeProps:Function,labelField:{type:String,default:"label"},keyField:{type:String,default:"key"},childrenField:{type:String,default:"children"},value:[String,Number]},ao=Object.keys(ce),lo=Object.assign(Object.assign(Object.assign({},ce),io),ve.props),bo=B({name:"Dropdown",inheritAttrs:!1,props:lo,setup(e){const n=A(!1),d=Ve(I(e,"show"),n),i=w(()=>{const{keyField:l,childrenField:u}=e;return Qe(e.options,{getKey(f){return f[l]},getDisabled(f){return f.disabled===!0},getIgnored(f){return f.type==="divider"||f.type==="render"},getChildren(f){return f[u]}})}),r=w(()=>i.value.treeNodes),o=A(null),p=A(null),v=A(null),a=w(()=>{var l,u,f;return(f=(u=(l=o.value)!==null&&l!==void 0?l:p.value)!==null&&u!==void 0?u:v.value)!==null&&f!==void 0?f:null}),m=w(()=>i.value.getPath(a.value).keyPath),b=w(()=>i.value.getPath(e.value).keyPath),g=V(()=>e.keyboard&&d.value);Xe({keydown:{ArrowUp:{prevent:!0,handler:Z},ArrowRight:{prevent:!0,handler:Y},ArrowDown:{prevent:!0,handler:ee},ArrowLeft:{prevent:!0,handler:J},Enter:{prevent:!0,handler:oe},Escape:L}},g);const{mergedClsPrefixRef:x,inlineThemeDisabled:N,mergedComponentPropsRef:P}=Le(e),z=w(()=>{var l,u;return e.size||((u=(l=P==null?void 0:P.value)===null||l===void 0?void 0:l.Dropdown)===null||u===void 0?void 0:u.size)||"medium"}),S=ve("Dropdown","-dropdown",ro,We,e,x);H(X,{labelFieldRef:I(e,"labelField"),childrenFieldRef:I(e,"childrenField"),renderLabelRef:I(e,"renderLabel"),renderIconRef:I(e,"renderIcon"),hoverKeyRef:o,keyboardKeyRef:p,lastToggledSubmenuKeyRef:v,pendingKeyPathRef:m,activeKeyPathRef:b,animatedRef:I(e,"animated"),mergedShowRef:d,nodePropsRef:I(e,"nodeProps"),renderOptionRef:I(e,"renderOption"),menuPropsRef:I(e,"menuProps"),doSelect:C,doUpdateShow:O}),ie(d,l=>{!e.animated&&!l&&U()});function C(l,u){const{onSelect:f}=e;f&&te(f,l,u)}function O(l){const{"onUpdate:show":u,onUpdateShow:f}=e;u&&te(u,l),f&&te(f,l),n.value=l}function U(){o.value=null,p.value=null,v.value=null}function L(){O(!1)}function J(){M("left")}function Y(){M("right")}function Z(){M("up")}function ee(){M("down")}function oe(){const l=j();l!=null&&l.isLeaf&&d.value&&(C(l.key,l.rawNode),O(!1))}function j(){var l;const{value:u}=i,{value:f}=a;return!u||f===null?null:(l=u.getNode(f))!==null&&l!==void 0?l:null}function M(l){const{value:u}=a,{value:{getFirstAvailableNode:f}}=i;let t=null;if(u===null){const c=f();c!==null&&(t=c.key)}else{const c=j();if(c){let y;switch(l){case"down":y=c.getNext();break;case"up":y=c.getPrev();break;case"right":y=c.getChild();break;case"left":y=c.getParent();break}y&&(t=y.key)}}t!==null&&(o.value=null,p.value=t)}const W=w(()=>{const{inverted:l}=e,u=z.value,{common:{cubicBezierEaseInOut:f},self:t}=S.value,{padding:c,dividerColor:y,borderRadius:D,optionOpacityDisabled:ne,[T("optionIconSuffixWidth",u)]:$,[T("optionSuffixWidth",u)]:ye,[T("optionIconPrefixWidth",u)]:ge,[T("optionPrefixWidth",u)]:xe,[T("fontSize",u)]:Se,[T("optionHeight",u)]:ke,[T("optionIconSize",u)]:Ne}=t,h={"--n-bezier":f,"--n-font-size":Se,"--n-padding":c,"--n-border-radius":D,"--n-option-height":ke,"--n-option-prefix-width":xe,"--n-option-icon-prefix-width":ge,"--n-option-suffix-width":ye,"--n-option-icon-suffix-width":$,"--n-option-icon-size":Ne,"--n-divider-color":y,"--n-option-opacity-disabled":ne};return l?(h["--n-color"]=t.colorInverted,h["--n-option-color-hover"]=t.optionColorHoverInverted,h["--n-option-color-active"]=t.optionColorActiveInverted,h["--n-option-text-color"]=t.optionTextColorInverted,h["--n-option-text-color-hover"]=t.optionTextColorHoverInverted,h["--n-option-text-color-active"]=t.optionTextColorActiveInverted,h["--n-option-text-color-child-active"]=t.optionTextColorChildActiveInverted,h["--n-prefix-color"]=t.prefixColorInverted,h["--n-suffix-color"]=t.suffixColorInverted,h["--n-group-header-text-color"]=t.groupHeaderTextColorInverted):(h["--n-color"]=t.color,h["--n-option-color-hover"]=t.optionColorHover,h["--n-option-color-active"]=t.optionColorActive,h["--n-option-text-color"]=t.optionTextColor,h["--n-option-text-color-hover"]=t.optionTextColorHover,h["--n-option-text-color-active"]=t.optionTextColorActive,h["--n-option-text-color-child-active"]=t.optionTextColorChildActive,h["--n-prefix-color"]=t.prefixColor,h["--n-suffix-color"]=t.suffixColor,h["--n-group-header-text-color"]=t.groupHeaderTextColor),h}),R=N?Ue("dropdown",w(()=>`${z.value[0]}${e.inverted?"i":""}`),W,e):void 0;return{mergedClsPrefix:x,mergedTheme:S,mergedSize:z,tmNodes:r,mergedShow:d,handleAfterLeave:()=>{e.animated&&U()},doUpdateShow:O,cssVars:N?void 0:W,themeClass:R==null?void 0:R.themeClass,onRender:R==null?void 0:R.onRender}},render(){const e=(i,r,o,p,v)=>{var a;const{mergedClsPrefix:m,menuProps:b}=this;(a=this.onRender)===null||a===void 0||a.call(this);const g=(b==null?void 0:b(void 0,this.tmNodes.map(N=>N.rawNode)))||{},x={ref:Ye(r),class:[i,`${m}-dropdown`,`${m}-dropdown--${this.mergedSize}-size`,this.themeClass],clsPrefix:m,tmNodes:this.tmNodes,style:[...o,this.cssVars],showArrow:this.showArrow,arrowStyle:this.arrowStyle,scrollable:this.scrollable,onMouseenter:p,onMouseleave:v};return s(me,pe(this.$attrs,x,g))},{mergedTheme:n}=this,d={show:this.mergedShow,theme:n.peers.Popover,themeOverrides:n.peerOverrides.Popover,internalOnAfterLeave:this.handleAfterLeave,internalRenderBody:e,onUpdateShow:this.doUpdateShow,"onUpdate:show":void 0};return s(Ce,Object.assign({},He(this.$props,ao),d),{trigger:()=>{var i,r;return(r=(i=this.$slots).default)===null||r===void 0?void 0:r.call(i)}})}});export{bo as N,Ye as c,Xe as u};
