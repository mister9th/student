import{am as A,aN as i,G as h,D as C,K as R,J as m,cm as ne,cx as U,cy as ie,v as co,a5 as x,ad as ee,bL as J,ce as re,bQ as K,bB as uo,bC as ho,a$ as mo,b_ as vo,aS as Y,ah as po,c4 as fo,ao as go,a4 as Ie,S as Ee,cr as Le,d as je,P as D,O as oe,ay as bo,bR as Z,be as xe,cp as pe,b as Fe,bd as ue,g as xo,V as yo,cD as Re,ac as Co,bh as wo,bg as ko,bD as E,ab as G,a8 as P,af as zo,cz as _o,cl as So,a9 as Q,cE as M,cj as w,ai as H,aa as Io,B as Pe,bS as Ro,ag as Ne,cd as se,bt as Po,cs as No,bY as To,ct as $o}from"../index--tRDvEJp.js";import{S as Te}from"../icons/SchoolSharp-B9FRPFmg.js";import{N as Ke}from"../components/Tooltip-CA6OH3Vy.js";import{N as Ve}from"../components/Dropdown-B0aKfrj7.js";import{u as fe}from"../shared/use-merged-state-CgcFDSTr.js";import{V as Oo,a as he}from"../shared/create-C_d5TFjX.js";import{u as Ao}from"../components/Tag-BNAPg1BY.js";import{C as Bo}from"../ChevronRight-CrooZhtV.js";import{f as me}from"../shared/format-length-B-p6aW7q.js";import{N as Ho}from"../components/Space-DbqDb93X.js";import{N as $e}from"../components/Avatar-CtjgL34V.js";import{P as Mo}from"../icons/PeopleOutline-dT3TUf1g.js";import{P as Eo}from"../icons/PersonOutline-DWHr0aGM.js";import{S as Lo}from"../icons/SchoolOutline-C4nfhrqm.js";import{B as jo}from"../icons/BookOutline-DeqPUoXy.js";import{D as Oe,C as Fo}from"../icons/DocumentTextOutline-BVHn0X84.js";import{S as ve}from"../icons/SparklesOutline-Cxfd3n7t.js";import{N as Ae}from"../icons/NotificationsOutline-X0Mt0igi.js";import{S as Ko}from"../icons/SettingsOutline-DrEh_ns-.js";import{N as te}from"../components/Icon-Dfkm-ERd.js";import"../components/Popover-Dil6oIS2.js";import"../shared/get-CAtMqXMx.js";import"../components/next-frame-once-C5Ksf8W7.js";import"../shared/happens-in-CM8LO42l.js";import"../components/get-slot-Bk_rJcZu.js";import"../shared/utils-BTT2y0lT.js";const Vo=A({name:"ChevronDownFilled",render(){return i("svg",{viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg"},i("path",{d:"M3.20041 5.73966C3.48226 5.43613 3.95681 5.41856 4.26034 5.70041L8 9.22652L11.7397 5.70041C12.0432 5.41856 12.5177 5.43613 12.7996 5.73966C13.0815 6.0432 13.0639 6.51775 12.7603 6.7996L8.51034 10.7996C8.22258 11.0668 7.77743 11.0668 7.48967 10.7996L3.23966 6.7996C2.93613 6.51775 2.91856 6.0432 3.20041 5.73966Z",fill:"currentColor"}))}}),Do=h("breadcrumb",`
 white-space: nowrap;
 cursor: default;
 line-height: var(--n-item-line-height);
`,[C("ul",`
 list-style: none;
 padding: 0;
 margin: 0;
 `),C("a",`
 color: inherit;
 text-decoration: inherit;
 `),h("breadcrumb-item",`
 font-size: var(--n-font-size);
 transition: color .3s var(--n-bezier);
 display: inline-flex;
 align-items: center;
 `,[h("icon",`
 font-size: 18px;
 vertical-align: -.2em;
 transition: color .3s var(--n-bezier);
 color: var(--n-item-text-color);
 `),C("&:not(:last-child)",[R("clickable",[m("link",`
 cursor: pointer;
 `,[C("&:hover",`
 background-color: var(--n-item-color-hover);
 `),C("&:active",`
 background-color: var(--n-item-color-pressed); 
 `)])])]),m("link",`
 padding: 4px;
 border-radius: var(--n-item-border-radius);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 color: var(--n-item-text-color);
 position: relative;
 `,[C("&:hover",`
 color: var(--n-item-text-color-hover);
 `,[h("icon",`
 color: var(--n-item-text-color-hover);
 `)]),C("&:active",`
 color: var(--n-item-text-color-pressed);
 `,[h("icon",`
 color: var(--n-item-text-color-pressed);
 `)])]),m("separator",`
 margin: 0 8px;
 color: var(--n-separator-color);
 transition: color .3s var(--n-bezier);
 user-select: none;
 -webkit-user-select: none;
 `),C("&:last-child",[m("link",`
 font-weight: var(--n-font-weight-active);
 cursor: unset;
 color: var(--n-item-text-color-active);
 `,[h("icon",`
 color: var(--n-item-text-color-active);
 `)]),m("separator",`
 display: none;
 `)])])]),De=ee("n-breadcrumb"),Uo=Object.assign(Object.assign({},U.props),{separator:{type:String,default:"/"}}),Go=A({name:"Breadcrumb",props:Uo,setup(e){const{mergedClsPrefixRef:o,inlineThemeDisabled:t}=ne(e),a=U("Breadcrumb","-breadcrumb",Do,co,e,o);J(De,{separatorRef:re(e,"separator"),mergedClsPrefixRef:o});const n=x(()=>{const{common:{cubicBezierEaseInOut:v},self:{separatorColor:p,itemTextColor:d,itemTextColorHover:f,itemTextColorPressed:B,itemTextColorActive:N,fontSize:g,fontWeightActive:$,itemBorderRadius:c,itemColorHover:u,itemColorPressed:k,itemLineHeight:_}}=a.value;return{"--n-font-size":g,"--n-bezier":v,"--n-item-text-color":d,"--n-item-text-color-hover":f,"--n-item-text-color-pressed":B,"--n-item-text-color-active":N,"--n-separator-color":p,"--n-item-color-hover":u,"--n-item-color-pressed":k,"--n-item-border-radius":c,"--n-font-weight-active":$,"--n-item-line-height":_}}),s=t?ie("breadcrumb",void 0,n,e):void 0;return{mergedClsPrefix:o,cssVars:t?void 0:n,themeClass:s==null?void 0:s.themeClass,onRender:s==null?void 0:s.onRender}},render(){var e;return(e=this.onRender)===null||e===void 0||e.call(this),i("nav",{class:[`${this.mergedClsPrefix}-breadcrumb`,this.themeClass],style:this.cssVars,"aria-label":"Breadcrumb"},i("ul",null,this.$slots))}});function qo(e=mo?window:null){const o=()=>{const{hash:n,host:s,hostname:v,href:p,origin:d,pathname:f,port:B,protocol:N,search:g}=(e==null?void 0:e.location)||{};return{hash:n,host:s,hostname:v,href:p,origin:d,pathname:f,port:B,protocol:N,search:g}},t=K(o()),a=()=>{t.value=o()};return uo(()=>{e&&(e.addEventListener("popstate",a),e.addEventListener("hashchange",a))}),ho(()=>{e&&(e.removeEventListener("popstate",a),e.removeEventListener("hashchange",a))}),t}const Yo={separator:String,href:String,clickable:{type:Boolean,default:!0},showSeparator:{type:Boolean,default:!0},onClick:Function},Wo=A({name:"BreadcrumbItem",props:Yo,slots:Object,setup(e,{slots:o}){const t=Y(De,null);if(!t)return()=>null;const{separatorRef:a,mergedClsPrefixRef:n}=t,s=qo(),v=x(()=>e.href?"a":"span"),p=x(()=>s.value.href===e.href?"location":null);return()=>{const{value:d}=n;return i("li",{class:[`${d}-breadcrumb-item`,e.clickable&&`${d}-breadcrumb-item--clickable`]},i(v.value,{class:`${d}-breadcrumb-item__link`,"aria-current":p.value,href:e.href,onClick:e.onClick},o),e.showSeparator&&i("span",{class:`${d}-breadcrumb-item__separator`,"aria-hidden":"true"},vo(o.separator,()=>{var f;return[(f=e.separator)!==null&&f!==void 0?f:a.value]})))}}});function Xo(e){const{baseColor:o,textColor2:t,bodyColor:a,cardColor:n,dividerColor:s,actionColor:v,scrollbarColor:p,scrollbarColorHover:d,invertedColor:f}=e;return{textColor:t,textColorInverted:"#FFF",color:a,colorEmbedded:v,headerColor:n,headerColorInverted:f,footerColor:v,footerColorInverted:f,headerBorderColor:s,headerBorderColorInverted:f,footerBorderColor:s,footerBorderColorInverted:f,siderBorderColor:s,siderBorderColorInverted:f,siderColor:n,siderColorInverted:f,siderToggleButtonBorder:`1px solid ${s}`,siderToggleButtonColor:o,siderToggleButtonIconColor:t,siderToggleButtonIconColorInverted:t,siderToggleBarColor:Ie(a,p),siderToggleBarColorHover:Ie(a,d),__invertScrollbar:"true"}}const ye=po({name:"Layout",common:go,peers:{Scrollbar:fo},self:Xo}),Ue=ee("n-layout-sider"),Ce={type:String,default:"static"},Jo=h("layout",`
 color: var(--n-text-color);
 background-color: var(--n-color);
 box-sizing: border-box;
 position: relative;
 z-index: auto;
 flex: auto;
 overflow: hidden;
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
`,[h("layout-scroll-container",`
 overflow-x: hidden;
 box-sizing: border-box;
 height: 100%;
 `),R("absolute-positioned",`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),Qo={embedded:Boolean,position:Ce,nativeScrollbar:{type:Boolean,default:!0},scrollbarProps:Object,onScroll:Function,contentClass:String,contentStyle:{type:[String,Object],default:""},hasSider:Boolean,siderPlacement:{type:String,default:"left"}},Ge=ee("n-layout");function qe(e){return A({name:e?"LayoutContent":"Layout",props:Object.assign(Object.assign({},U.props),Qo),setup(o){const t=K(null),a=K(null),{mergedClsPrefixRef:n,inlineThemeDisabled:s}=ne(o),v=U("Layout","-layout",Jo,ye,o,n);function p(u,k){if(o.nativeScrollbar){const{value:_}=t;_&&(k===void 0?_.scrollTo(u):_.scrollTo(u,k))}else{const{value:_}=a;_&&_.scrollTo(u,k)}}J(Ge,o);let d=0,f=0;const B=u=>{var k;const _=u.target;d=_.scrollLeft,f=_.scrollTop,(k=o.onScroll)===null||k===void 0||k.call(o,u)};Le(()=>{if(o.nativeScrollbar){const u=t.value;u&&(u.scrollTop=f,u.scrollLeft=d)}});const N={display:"flex",flexWrap:"nowrap",width:"100%",flexDirection:"row"},g={scrollTo:p},$=x(()=>{const{common:{cubicBezierEaseInOut:u},self:k}=v.value;return{"--n-bezier":u,"--n-color":o.embedded?k.colorEmbedded:k.color,"--n-text-color":k.textColor}}),c=s?ie("layout",x(()=>o.embedded?"e":""),$,o):void 0;return Object.assign({mergedClsPrefix:n,scrollableElRef:t,scrollbarInstRef:a,hasSiderStyle:N,mergedTheme:v,handleNativeElScroll:B,cssVars:s?void 0:$,themeClass:c==null?void 0:c.themeClass,onRender:c==null?void 0:c.onRender},g)},render(){var o;const{mergedClsPrefix:t,hasSider:a}=this;(o=this.onRender)===null||o===void 0||o.call(this);const n=a?this.hasSiderStyle:void 0,s=[this.themeClass,e&&`${t}-layout-content`,`${t}-layout`,`${t}-layout--${this.position}-positioned`];return i("div",{class:s,style:this.cssVars},this.nativeScrollbar?i("div",{ref:"scrollableElRef",class:[`${t}-layout-scroll-container`,this.contentClass],style:[this.contentStyle,n],onScroll:this.handleNativeElScroll},this.$slots):i(Ee,Object.assign({},this.scrollbarProps,{onScroll:this.onScroll,ref:"scrollbarInstRef",theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,contentClass:this.contentClass,contentStyle:[this.contentStyle,n]}),this.$slots))}})}const Be=qe(!1),Zo=qe(!0),et=h("layout-header",`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 box-sizing: border-box;
 width: 100%;
 background-color: var(--n-color);
 color: var(--n-text-color);
`,[R("absolute-positioned",`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 `),R("bordered",`
 border-bottom: solid 1px var(--n-border-color);
 `)]),ot={position:Ce,inverted:Boolean,bordered:{type:Boolean,default:!1}},tt=A({name:"LayoutHeader",props:Object.assign(Object.assign({},U.props),ot),setup(e){const{mergedClsPrefixRef:o,inlineThemeDisabled:t}=ne(e),a=U("Layout","-layout-header",et,ye,e,o),n=x(()=>{const{common:{cubicBezierEaseInOut:v},self:p}=a.value,d={"--n-bezier":v};return e.inverted?(d["--n-color"]=p.headerColorInverted,d["--n-text-color"]=p.textColorInverted,d["--n-border-color"]=p.headerBorderColorInverted):(d["--n-color"]=p.headerColor,d["--n-text-color"]=p.textColor,d["--n-border-color"]=p.headerBorderColor),d}),s=t?ie("layout-header",x(()=>e.inverted?"a":"b"),n,e):void 0;return{mergedClsPrefix:o,cssVars:t?void 0:n,themeClass:s==null?void 0:s.themeClass,onRender:s==null?void 0:s.onRender}},render(){var e;const{mergedClsPrefix:o}=this;return(e=this.onRender)===null||e===void 0||e.call(this),i("div",{class:[`${o}-layout-header`,this.themeClass,this.position&&`${o}-layout-header--${this.position}-positioned`,this.bordered&&`${o}-layout-header--bordered`],style:this.cssVars},this.$slots)}}),rt=h("layout-sider",`
 flex-shrink: 0;
 box-sizing: border-box;
 position: relative;
 z-index: 1;
 color: var(--n-text-color);
 transition:
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 min-width .3s var(--n-bezier),
 max-width .3s var(--n-bezier),
 transform .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 background-color: var(--n-color);
 display: flex;
 justify-content: flex-end;
`,[R("bordered",[m("border",`
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 width: 1px;
 background-color: var(--n-border-color);
 transition: background-color .3s var(--n-bezier);
 `)]),m("left-placement",[R("bordered",[m("border",`
 right: 0;
 `)])]),R("right-placement",`
 justify-content: flex-start;
 `,[R("bordered",[m("border",`
 left: 0;
 `)]),R("collapsed",[h("layout-toggle-button",[h("base-icon",`
 transform: rotate(180deg);
 `)]),h("layout-toggle-bar",[C("&:hover",[m("top",{transform:"rotate(-12deg) scale(1.15) translateY(-2px)"}),m("bottom",{transform:"rotate(12deg) scale(1.15) translateY(2px)"})])])]),h("layout-toggle-button",`
 left: 0;
 transform: translateX(-50%) translateY(-50%);
 `,[h("base-icon",`
 transform: rotate(0);
 `)]),h("layout-toggle-bar",`
 left: -28px;
 transform: rotate(180deg);
 `,[C("&:hover",[m("top",{transform:"rotate(12deg) scale(1.15) translateY(-2px)"}),m("bottom",{transform:"rotate(-12deg) scale(1.15) translateY(2px)"})])])]),R("collapsed",[h("layout-toggle-bar",[C("&:hover",[m("top",{transform:"rotate(-12deg) scale(1.15) translateY(-2px)"}),m("bottom",{transform:"rotate(12deg) scale(1.15) translateY(2px)"})])]),h("layout-toggle-button",[h("base-icon",`
 transform: rotate(0);
 `)])]),h("layout-toggle-button",`
 transition:
 color .3s var(--n-bezier),
 right .3s var(--n-bezier),
 left .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 cursor: pointer;
 width: 24px;
 height: 24px;
 position: absolute;
 top: 50%;
 right: 0;
 border-radius: 50%;
 display: flex;
 align-items: center;
 justify-content: center;
 font-size: 18px;
 color: var(--n-toggle-button-icon-color);
 border: var(--n-toggle-button-border);
 background-color: var(--n-toggle-button-color);
 box-shadow: 0 2px 4px 0px rgba(0, 0, 0, .06);
 transform: translateX(50%) translateY(-50%);
 z-index: 1;
 `,[h("base-icon",`
 transition: transform .3s var(--n-bezier);
 transform: rotate(180deg);
 `)]),h("layout-toggle-bar",`
 cursor: pointer;
 height: 72px;
 width: 32px;
 position: absolute;
 top: calc(50% - 36px);
 right: -28px;
 `,[m("top, bottom",`
 position: absolute;
 width: 4px;
 border-radius: 2px;
 height: 38px;
 left: 14px;
 transition: 
 background-color .3s var(--n-bezier),
 transform .3s var(--n-bezier);
 `),m("bottom",`
 position: absolute;
 top: 34px;
 `),C("&:hover",[m("top",{transform:"rotate(12deg) scale(1.15) translateY(-2px)"}),m("bottom",{transform:"rotate(-12deg) scale(1.15) translateY(2px)"})]),m("top, bottom",{backgroundColor:"var(--n-toggle-bar-color)"}),C("&:hover",[m("top, bottom",{backgroundColor:"var(--n-toggle-bar-color-hover)"})])]),m("border",`
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 width: 1px;
 transition: background-color .3s var(--n-bezier);
 `),h("layout-sider-scroll-container",`
 flex-grow: 1;
 flex-shrink: 0;
 box-sizing: border-box;
 height: 100%;
 opacity: 0;
 transition: opacity .3s var(--n-bezier);
 max-width: 100%;
 `),R("show-content",[h("layout-sider-scroll-container",{opacity:1})]),R("absolute-positioned",`
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 `)]),nt=A({props:{clsPrefix:{type:String,required:!0},onClick:Function},render(){const{clsPrefix:e}=this;return i("div",{onClick:this.onClick,class:`${e}-layout-toggle-bar`},i("div",{class:`${e}-layout-toggle-bar__top`}),i("div",{class:`${e}-layout-toggle-bar__bottom`}))}}),it=A({name:"LayoutToggleButton",props:{clsPrefix:{type:String,required:!0},onClick:Function},render(){const{clsPrefix:e}=this;return i("div",{class:`${e}-layout-toggle-button`,onClick:this.onClick},i(je,{clsPrefix:e},{default:()=>i(Bo,null)}))}}),lt={position:Ce,bordered:Boolean,collapsedWidth:{type:Number,default:48},width:{type:[Number,String],default:272},contentClass:String,contentStyle:{type:[String,Object],default:""},collapseMode:{type:String,default:"transform"},collapsed:{type:Boolean,default:void 0},defaultCollapsed:Boolean,showCollapsedContent:{type:Boolean,default:!0},showTrigger:{type:[Boolean,String],default:!1},nativeScrollbar:{type:Boolean,default:!0},inverted:Boolean,scrollbarProps:Object,triggerClass:String,triggerStyle:[String,Object],collapsedTriggerClass:String,collapsedTriggerStyle:[String,Object],"onUpdate:collapsed":[Function,Array],onUpdateCollapsed:[Function,Array],onAfterEnter:Function,onAfterLeave:Function,onExpand:[Function,Array],onCollapse:[Function,Array],onScroll:Function},at=A({name:"LayoutSider",props:Object.assign(Object.assign({},U.props),lt),setup(e){const o=Y(Ge),t=K(null),a=K(null),n=K(e.defaultCollapsed),s=fe(re(e,"collapsed"),n),v=x(()=>me(s.value?e.collapsedWidth:e.width)),p=x(()=>e.collapseMode!=="transform"?{}:{minWidth:me(e.width)}),d=x(()=>o?o.siderPlacement:"left");function f(T,S){if(e.nativeScrollbar){const{value:I}=t;I&&(S===void 0?I.scrollTo(T):I.scrollTo(T,S))}else{const{value:I}=a;I&&I.scrollTo(T,S)}}function B(){const{"onUpdate:collapsed":T,onUpdateCollapsed:S,onExpand:I,onCollapse:W}=e,{value:q}=s;S&&D(S,!q),T&&D(T,!q),n.value=!q,q?I&&D(I):W&&D(W)}let N=0,g=0;const $=T=>{var S;const I=T.target;N=I.scrollLeft,g=I.scrollTop,(S=e.onScroll)===null||S===void 0||S.call(e,T)};Le(()=>{if(e.nativeScrollbar){const T=t.value;T&&(T.scrollTop=g,T.scrollLeft=N)}}),J(Ue,{collapsedRef:s,collapseModeRef:re(e,"collapseMode")});const{mergedClsPrefixRef:c,inlineThemeDisabled:u}=ne(e),k=U("Layout","-layout-sider",rt,ye,e,c);function _(T){var S,I;T.propertyName==="max-width"&&(s.value?(S=e.onAfterLeave)===null||S===void 0||S.call(e):(I=e.onAfterEnter)===null||I===void 0||I.call(e))}const L={scrollTo:f},V=x(()=>{const{common:{cubicBezierEaseInOut:T},self:S}=k.value,{siderToggleButtonColor:I,siderToggleButtonBorder:W,siderToggleBarColor:q,siderToggleBarColorHover:de}=S,F={"--n-bezier":T,"--n-toggle-button-color":I,"--n-toggle-button-border":W,"--n-toggle-bar-color":q,"--n-toggle-bar-color-hover":de};return e.inverted?(F["--n-color"]=S.siderColorInverted,F["--n-text-color"]=S.textColorInverted,F["--n-border-color"]=S.siderBorderColorInverted,F["--n-toggle-button-icon-color"]=S.siderToggleButtonIconColorInverted,F.__invertScrollbar=S.__invertScrollbar):(F["--n-color"]=S.siderColor,F["--n-text-color"]=S.textColor,F["--n-border-color"]=S.siderBorderColor,F["--n-toggle-button-icon-color"]=S.siderToggleButtonIconColor),F}),j=u?ie("layout-sider",x(()=>e.inverted?"a":"b"),V,e):void 0;return Object.assign({scrollableElRef:t,scrollbarInstRef:a,mergedClsPrefix:c,mergedTheme:k,styleMaxWidth:v,mergedCollapsed:s,scrollContainerStyle:p,siderPlacement:d,handleNativeElScroll:$,handleTransitionend:_,handleTriggerClick:B,inlineThemeDisabled:u,cssVars:V,themeClass:j==null?void 0:j.themeClass,onRender:j==null?void 0:j.onRender},L)},render(){var e;const{mergedClsPrefix:o,mergedCollapsed:t,showTrigger:a}=this;return(e=this.onRender)===null||e===void 0||e.call(this),i("aside",{class:[`${o}-layout-sider`,this.themeClass,`${o}-layout-sider--${this.position}-positioned`,`${o}-layout-sider--${this.siderPlacement}-placement`,this.bordered&&`${o}-layout-sider--bordered`,t&&`${o}-layout-sider--collapsed`,(!t||this.showCollapsedContent)&&`${o}-layout-sider--show-content`],onTransitionend:this.handleTransitionend,style:[this.inlineThemeDisabled?void 0:this.cssVars,{maxWidth:this.styleMaxWidth,width:me(this.width)}]},this.nativeScrollbar?i("div",{class:[`${o}-layout-sider-scroll-container`,this.contentClass],onScroll:this.handleNativeElScroll,style:[this.scrollContainerStyle,{overflow:"auto"},this.contentStyle],ref:"scrollableElRef"},this.$slots):i(Ee,Object.assign({},this.scrollbarProps,{onScroll:this.onScroll,ref:"scrollbarInstRef",style:this.scrollContainerStyle,contentStyle:this.contentStyle,contentClass:this.contentClass,theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,builtinThemeOverrides:this.inverted&&this.cssVars.__invertScrollbar==="true"?{colorHover:"rgba(255, 255, 255, .4)",color:"rgba(255, 255, 255, .3)"}:void 0}),this.$slots),a?a==="bar"?i(nt,{clsPrefix:o,class:t?this.collapsedTriggerClass:this.triggerClass,style:t?this.collapsedTriggerStyle:this.triggerStyle,onClick:this.handleTriggerClick}):i(it,{clsPrefix:o,class:t?this.collapsedTriggerClass:this.triggerClass,style:t?this.collapsedTriggerStyle:this.triggerStyle,onClick:this.handleTriggerClick}):null,this.bordered?i("div",{class:`${o}-layout-sider__border`}):null)}}),le=ee("n-menu"),Ye=ee("n-submenu"),we=ee("n-menu-item-group"),He=[C("&::before","background-color: var(--n-item-color-hover);"),m("arrow",`
 color: var(--n-arrow-color-hover);
 `),m("icon",`
 color: var(--n-item-icon-color-hover);
 `),h("menu-item-content-header",`
 color: var(--n-item-text-color-hover);
 `,[C("a",`
 color: var(--n-item-text-color-hover);
 `),m("extra",`
 color: var(--n-item-text-color-hover);
 `)])],Me=[m("icon",`
 color: var(--n-item-icon-color-hover-horizontal);
 `),h("menu-item-content-header",`
 color: var(--n-item-text-color-hover-horizontal);
 `,[C("a",`
 color: var(--n-item-text-color-hover-horizontal);
 `),m("extra",`
 color: var(--n-item-text-color-hover-horizontal);
 `)])],st=C([h("menu",`
 background-color: var(--n-color);
 color: var(--n-item-text-color);
 overflow: hidden;
 transition: background-color .3s var(--n-bezier);
 box-sizing: border-box;
 font-size: var(--n-font-size);
 padding-bottom: 6px;
 `,[R("horizontal",`
 max-width: 100%;
 width: 100%;
 display: flex;
 overflow: hidden;
 padding-bottom: 0;
 `,[h("submenu","margin: 0;"),h("menu-item","margin: 0;"),h("menu-item-content",`
 padding: 0 20px;
 border-bottom: 2px solid #0000;
 `,[C("&::before","display: none;"),R("selected","border-bottom: 2px solid var(--n-border-color-horizontal)")]),h("menu-item-content",[R("selected",[m("icon","color: var(--n-item-icon-color-active-horizontal);"),h("menu-item-content-header",`
 color: var(--n-item-text-color-active-horizontal);
 `,[C("a","color: var(--n-item-text-color-active-horizontal);"),m("extra","color: var(--n-item-text-color-active-horizontal);")])]),R("child-active",`
 border-bottom: 2px solid var(--n-border-color-horizontal);
 `,[h("menu-item-content-header",`
 color: var(--n-item-text-color-child-active-horizontal);
 `,[C("a",`
 color: var(--n-item-text-color-child-active-horizontal);
 `),m("extra",`
 color: var(--n-item-text-color-child-active-horizontal);
 `)]),m("icon",`
 color: var(--n-item-icon-color-child-active-horizontal);
 `)]),oe("disabled",[oe("selected, child-active",[C("&:focus-within",Me)]),R("selected",[X(null,[m("icon","color: var(--n-item-icon-color-active-hover-horizontal);"),h("menu-item-content-header",`
 color: var(--n-item-text-color-active-hover-horizontal);
 `,[C("a","color: var(--n-item-text-color-active-hover-horizontal);"),m("extra","color: var(--n-item-text-color-active-hover-horizontal);")])])]),R("child-active",[X(null,[m("icon","color: var(--n-item-icon-color-child-active-hover-horizontal);"),h("menu-item-content-header",`
 color: var(--n-item-text-color-child-active-hover-horizontal);
 `,[C("a","color: var(--n-item-text-color-child-active-hover-horizontal);"),m("extra","color: var(--n-item-text-color-child-active-hover-horizontal);")])])]),X("border-bottom: 2px solid var(--n-border-color-horizontal);",Me)]),h("menu-item-content-header",[C("a","color: var(--n-item-text-color-horizontal);")])])]),oe("responsive",[h("menu-item-content-header",`
 overflow: hidden;
 text-overflow: ellipsis;
 `)]),R("collapsed",[h("menu-item-content",[R("selected",[C("&::before",`
 background-color: var(--n-item-color-active-collapsed) !important;
 `)]),h("menu-item-content-header","opacity: 0;"),m("arrow","opacity: 0;"),m("icon","color: var(--n-item-icon-color-collapsed);")])]),h("menu-item",`
 height: var(--n-item-height);
 margin-top: 6px;
 position: relative;
 `),h("menu-item-content",`
 box-sizing: border-box;
 line-height: 1.75;
 height: 100%;
 display: grid;
 grid-template-areas: "icon content arrow";
 grid-template-columns: auto 1fr auto;
 align-items: center;
 cursor: pointer;
 position: relative;
 padding-right: 18px;
 transition:
 background-color .3s var(--n-bezier),
 padding-left .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[C("> *","z-index: 1;"),C("&::before",`
 z-index: auto;
 content: "";
 background-color: #0000;
 position: absolute;
 left: 8px;
 right: 8px;
 top: 0;
 bottom: 0;
 pointer-events: none;
 border-radius: var(--n-border-radius);
 transition: background-color .3s var(--n-bezier);
 `),R("disabled",`
 opacity: .45;
 cursor: not-allowed;
 `),R("collapsed",[m("arrow","transform: rotate(0);")]),R("selected",[C("&::before","background-color: var(--n-item-color-active);"),m("arrow","color: var(--n-arrow-color-active);"),m("icon","color: var(--n-item-icon-color-active);"),h("menu-item-content-header",`
 color: var(--n-item-text-color-active);
 `,[C("a","color: var(--n-item-text-color-active);"),m("extra","color: var(--n-item-text-color-active);")])]),R("child-active",[h("menu-item-content-header",`
 color: var(--n-item-text-color-child-active);
 `,[C("a",`
 color: var(--n-item-text-color-child-active);
 `),m("extra",`
 color: var(--n-item-text-color-child-active);
 `)]),m("arrow",`
 color: var(--n-arrow-color-child-active);
 `),m("icon",`
 color: var(--n-item-icon-color-child-active);
 `)]),oe("disabled",[oe("selected, child-active",[C("&:focus-within",He)]),R("selected",[X(null,[m("arrow","color: var(--n-arrow-color-active-hover);"),m("icon","color: var(--n-item-icon-color-active-hover);"),h("menu-item-content-header",`
 color: var(--n-item-text-color-active-hover);
 `,[C("a","color: var(--n-item-text-color-active-hover);"),m("extra","color: var(--n-item-text-color-active-hover);")])])]),R("child-active",[X(null,[m("arrow","color: var(--n-arrow-color-child-active-hover);"),m("icon","color: var(--n-item-icon-color-child-active-hover);"),h("menu-item-content-header",`
 color: var(--n-item-text-color-child-active-hover);
 `,[C("a","color: var(--n-item-text-color-child-active-hover);"),m("extra","color: var(--n-item-text-color-child-active-hover);")])])]),R("selected",[X(null,[C("&::before","background-color: var(--n-item-color-active-hover);")])]),X(null,He)]),m("icon",`
 grid-area: icon;
 color: var(--n-item-icon-color);
 transition:
 color .3s var(--n-bezier),
 font-size .3s var(--n-bezier),
 margin-right .3s var(--n-bezier);
 box-sizing: content-box;
 display: inline-flex;
 align-items: center;
 justify-content: center;
 `),m("arrow",`
 grid-area: arrow;
 font-size: 16px;
 color: var(--n-arrow-color);
 transform: rotate(180deg);
 opacity: 1;
 transition:
 color .3s var(--n-bezier),
 transform 0.2s var(--n-bezier),
 opacity 0.2s var(--n-bezier);
 `),h("menu-item-content-header",`
 grid-area: content;
 transition:
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 opacity: 1;
 white-space: nowrap;
 color: var(--n-item-text-color);
 `,[C("a",`
 outline: none;
 text-decoration: none;
 transition: color .3s var(--n-bezier);
 color: var(--n-item-text-color);
 `,[C("&::before",`
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),m("extra",`
 font-size: .93em;
 color: var(--n-group-text-color);
 transition: color .3s var(--n-bezier);
 `)])]),h("submenu",`
 cursor: pointer;
 position: relative;
 margin-top: 6px;
 `,[h("menu-item-content",`
 height: var(--n-item-height);
 `),h("submenu-children",`
 overflow: hidden;
 padding: 0;
 `,[bo({duration:".2s"})])]),h("menu-item-group",[h("menu-item-group-title",`
 margin-top: 6px;
 color: var(--n-group-text-color);
 cursor: default;
 font-size: .93em;
 height: 36px;
 display: flex;
 align-items: center;
 transition:
 padding-left .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)])]),h("menu-tooltip",[C("a",`
 color: inherit;
 text-decoration: none;
 `)]),h("menu-divider",`
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 6px 18px;
 `)]);function X(e,o){return[R("hover",e,o),C("&:hover",e,o)]}const We=A({name:"MenuOptionContent",props:{collapsed:Boolean,disabled:Boolean,title:[String,Function],icon:Function,extra:[String,Function],showArrow:Boolean,childActive:Boolean,hover:Boolean,paddingLeft:Number,selected:Boolean,maxIconSize:{type:Number,required:!0},activeIconSize:{type:Number,required:!0},iconMarginRight:{type:Number,required:!0},clsPrefix:{type:String,required:!0},onClick:Function,tmNode:{type:Object,required:!0},isEllipsisPlaceholder:Boolean},setup(e){const{props:o}=Y(le);return{menuProps:o,style:x(()=>{const{paddingLeft:t}=e;return{paddingLeft:t&&`${t}px`}}),iconStyle:x(()=>{const{maxIconSize:t,activeIconSize:a,iconMarginRight:n}=e;return{width:`${t}px`,height:`${t}px`,fontSize:`${a}px`,marginRight:`${n}px`}})}},render(){const{clsPrefix:e,tmNode:o,menuProps:{renderIcon:t,renderLabel:a,renderExtra:n,expandIcon:s}}=this,v=t?t(o.rawNode):Z(this.icon);return i("div",{onClick:p=>{var d;(d=this.onClick)===null||d===void 0||d.call(this,p)},role:"none",class:[`${e}-menu-item-content`,{[`${e}-menu-item-content--selected`]:this.selected,[`${e}-menu-item-content--collapsed`]:this.collapsed,[`${e}-menu-item-content--child-active`]:this.childActive,[`${e}-menu-item-content--disabled`]:this.disabled,[`${e}-menu-item-content--hover`]:this.hover}],style:this.style},v&&i("div",{class:`${e}-menu-item-content__icon`,style:this.iconStyle,role:"none"},[v]),i("div",{class:`${e}-menu-item-content-header`,role:"none"},this.isEllipsisPlaceholder?this.title:a?a(o.rawNode):Z(this.title),this.extra||n?i("span",{class:`${e}-menu-item-content-header__extra`}," ",n?n(o.rawNode):Z(this.extra)):null),this.showArrow?i(je,{ariaHidden:!0,class:`${e}-menu-item-content__arrow`,clsPrefix:e},{default:()=>s?s(o.rawNode):i(Vo,null)}):null)}}),ce=8;function ke(e){const o=Y(le),{props:t,mergedCollapsedRef:a}=o,n=Y(Ye,null),s=Y(we,null),v=x(()=>t.mode==="horizontal"),p=x(()=>v.value?t.dropdownPlacement:"tmNodes"in e?"right-start":"right"),d=x(()=>{var g;return Math.max((g=t.collapsedIconSize)!==null&&g!==void 0?g:t.iconSize,t.iconSize)}),f=x(()=>{var g;return!v.value&&e.root&&a.value&&(g=t.collapsedIconSize)!==null&&g!==void 0?g:t.iconSize}),B=x(()=>{if(v.value)return;const{collapsedWidth:g,indent:$,rootIndent:c}=t,{root:u,isGroup:k}=e,_=c===void 0?$:c;return u?a.value?g/2-d.value/2:_:s&&typeof s.paddingLeftRef.value=="number"?$/2+s.paddingLeftRef.value:n&&typeof n.paddingLeftRef.value=="number"?(k?$/2:$)+n.paddingLeftRef.value:0}),N=x(()=>{const{collapsedWidth:g,indent:$,rootIndent:c}=t,{value:u}=d,{root:k}=e;return v.value||!k||!a.value?ce:(c===void 0?$:c)+u+ce-(g+u)/2});return{dropdownPlacement:p,activeIconSize:f,maxIconSize:d,paddingLeft:B,iconMarginRight:N,NMenu:o,NSubmenu:n,NMenuOptionGroup:s}}const ze={internalKey:{type:[String,Number],required:!0},root:Boolean,isGroup:Boolean,level:{type:Number,required:!0},title:[String,Function],extra:[String,Function]},ct=A({name:"MenuDivider",setup(){const e=Y(le),{mergedClsPrefixRef:o,isHorizontalRef:t}=e;return()=>t.value?null:i("div",{class:`${o.value}-menu-divider`})}}),Xe=Object.assign(Object.assign({},ze),{tmNode:{type:Object,required:!0},disabled:Boolean,icon:Function,onClick:Function}),dt=xe(Xe),ut=A({name:"MenuOption",props:Xe,setup(e){const o=ke(e),{NSubmenu:t,NMenu:a,NMenuOptionGroup:n}=o,{props:s,mergedClsPrefixRef:v,mergedCollapsedRef:p}=a,d=t?t.mergedDisabledRef:n?n.mergedDisabledRef:{value:!1},f=x(()=>d.value||e.disabled);function B(g){const{onClick:$}=e;$&&$(g)}function N(g){f.value||(a.doSelect(e.internalKey,e.tmNode.rawNode),B(g))}return{mergedClsPrefix:v,dropdownPlacement:o.dropdownPlacement,paddingLeft:o.paddingLeft,iconMarginRight:o.iconMarginRight,maxIconSize:o.maxIconSize,activeIconSize:o.activeIconSize,mergedTheme:a.mergedThemeRef,menuProps:s,dropdownEnabled:pe(()=>e.root&&p.value&&s.mode!=="horizontal"&&!f.value),selected:pe(()=>a.mergedValueRef.value===e.internalKey),mergedDisabled:f,handleClick:N}},render(){const{mergedClsPrefix:e,mergedTheme:o,tmNode:t,menuProps:{renderLabel:a,nodeProps:n}}=this,s=n==null?void 0:n(t.rawNode);return i("div",Object.assign({},s,{role:"menuitem",class:[`${e}-menu-item`,s==null?void 0:s.class]}),i(Ke,{theme:o.peers.Tooltip,themeOverrides:o.peerOverrides.Tooltip,trigger:"hover",placement:this.dropdownPlacement,disabled:!this.dropdownEnabled||this.title===void 0,internalExtraClass:["menu-tooltip"]},{default:()=>a?a(t.rawNode):Z(this.title),trigger:()=>i(We,{tmNode:t,clsPrefix:e,paddingLeft:this.paddingLeft,iconMarginRight:this.iconMarginRight,maxIconSize:this.maxIconSize,activeIconSize:this.activeIconSize,selected:this.selected,title:this.title,extra:this.extra,disabled:this.mergedDisabled,icon:this.icon,onClick:this.handleClick})}))}}),Je=Object.assign(Object.assign({},ze),{tmNode:{type:Object,required:!0},tmNodes:{type:Array,required:!0}}),ht=xe(Je),mt=A({name:"MenuOptionGroup",props:Je,setup(e){const o=ke(e),{NSubmenu:t}=o,a=x(()=>t!=null&&t.mergedDisabledRef.value?!0:e.tmNode.disabled);J(we,{paddingLeftRef:o.paddingLeft,mergedDisabledRef:a});const{mergedClsPrefixRef:n,props:s}=Y(le);return function(){const{value:v}=n,p=o.paddingLeft.value,{nodeProps:d}=s,f=d==null?void 0:d(e.tmNode.rawNode);return i("div",{class:`${v}-menu-item-group`,role:"group"},i("div",Object.assign({},f,{class:[`${v}-menu-item-group-title`,f==null?void 0:f.class],style:[(f==null?void 0:f.style)||"",p!==void 0?`padding-left: ${p}px;`:""]}),Z(e.title),e.extra?i(Fe,null," ",Z(e.extra)):null),i("div",null,e.tmNodes.map(B=>_e(B,s))))}}});function ge(e){return e.type==="divider"||e.type==="render"}function vt(e){return e.type==="divider"}function _e(e,o){const{rawNode:t}=e,{show:a}=t;if(a===!1)return null;if(ge(t))return vt(t)?i(ct,Object.assign({key:e.key},t.props)):null;const{labelField:n}=o,{key:s,level:v,isGroup:p}=e,d=Object.assign(Object.assign({},t),{title:t.title||t[n],extra:t.titleExtra||t.extra,key:s,internalKey:s,level:v,root:v===0,isGroup:p});return e.children?e.isGroup?i(mt,ue(d,ht,{tmNode:e,tmNodes:e.children,key:s})):i(be,ue(d,pt,{key:s,rawNodes:t[o.childrenField],tmNodes:e.children,tmNode:e})):i(ut,ue(d,dt,{key:s,tmNode:e}))}const Qe=Object.assign(Object.assign({},ze),{rawNodes:{type:Array,default:()=>[]},tmNodes:{type:Array,default:()=>[]},tmNode:{type:Object,required:!0},disabled:Boolean,icon:Function,onClick:Function,domId:String,virtualChildActive:{type:Boolean,default:void 0},isEllipsisPlaceholder:Boolean}),pt=xe(Qe),be=A({name:"Submenu",props:Qe,setup(e){const o=ke(e),{NMenu:t,NSubmenu:a}=o,{props:n,mergedCollapsedRef:s,mergedThemeRef:v}=t,p=x(()=>{const{disabled:g}=e;return a!=null&&a.mergedDisabledRef.value||n.disabled?!0:g}),d=K(!1);J(Ye,{paddingLeftRef:o.paddingLeft,mergedDisabledRef:p}),J(we,null);function f(){const{onClick:g}=e;g&&g()}function B(){p.value||(s.value||t.toggleExpand(e.internalKey),f())}function N(g){d.value=g}return{menuProps:n,mergedTheme:v,doSelect:t.doSelect,inverted:t.invertedRef,isHorizontal:t.isHorizontalRef,mergedClsPrefix:t.mergedClsPrefixRef,maxIconSize:o.maxIconSize,activeIconSize:o.activeIconSize,iconMarginRight:o.iconMarginRight,dropdownPlacement:o.dropdownPlacement,dropdownShow:d,paddingLeft:o.paddingLeft,mergedDisabled:p,mergedValue:t.mergedValueRef,childActive:pe(()=>{var g;return(g=e.virtualChildActive)!==null&&g!==void 0?g:t.activePathRef.value.includes(e.internalKey)}),collapsed:x(()=>n.mode==="horizontal"?!1:s.value?!0:!t.mergedExpandedKeysRef.value.includes(e.internalKey)),dropdownEnabled:x(()=>!p.value&&(n.mode==="horizontal"||s.value)),handlePopoverShowChange:N,handleClick:B}},render(){var e;const{mergedClsPrefix:o,menuProps:{renderIcon:t,renderLabel:a}}=this,n=()=>{const{isHorizontal:v,paddingLeft:p,collapsed:d,mergedDisabled:f,maxIconSize:B,activeIconSize:N,title:g,childActive:$,icon:c,handleClick:u,menuProps:{nodeProps:k},dropdownShow:_,iconMarginRight:L,tmNode:V,mergedClsPrefix:j,isEllipsisPlaceholder:T,extra:S}=this,I=k==null?void 0:k(V.rawNode);return i("div",Object.assign({},I,{class:[`${j}-menu-item`,I==null?void 0:I.class],role:"menuitem"}),i(We,{tmNode:V,paddingLeft:p,collapsed:d,disabled:f,iconMarginRight:L,maxIconSize:B,activeIconSize:N,title:g,extra:S,showArrow:!v,childActive:$,clsPrefix:j,icon:c,hover:_,onClick:u,isEllipsisPlaceholder:T}))},s=()=>i(xo,null,{default:()=>{const{tmNodes:v,collapsed:p}=this;return p?null:i("div",{class:`${o}-submenu-children`,role:"menu"},v.map(d=>_e(d,this.menuProps)))}});return this.root?i(Ve,Object.assign({size:"large",trigger:"hover"},(e=this.menuProps)===null||e===void 0?void 0:e.dropdownProps,{themeOverrides:this.mergedTheme.peerOverrides.Dropdown,theme:this.mergedTheme.peers.Dropdown,builtinThemeOverrides:{fontSizeLarge:"14px",optionIconSizeLarge:"18px"},value:this.mergedValue,disabled:!this.dropdownEnabled,placement:this.dropdownPlacement,keyField:this.menuProps.keyField,labelField:this.menuProps.labelField,childrenField:this.menuProps.childrenField,onUpdateShow:this.handlePopoverShowChange,options:this.rawNodes,onSelect:this.doSelect,inverted:this.inverted,renderIcon:t,renderLabel:a}),{default:()=>i("div",{class:`${o}-submenu`,role:"menu","aria-expanded":!this.collapsed,id:this.domId},n(),this.isHorizontal?null:s())}):i("div",{class:`${o}-submenu`,role:"menu","aria-expanded":!this.collapsed,id:this.domId},n(),s())}}),ft=Object.assign(Object.assign({},U.props),{options:{type:Array,default:()=>[]},collapsed:{type:Boolean,default:void 0},collapsedWidth:{type:Number,default:48},iconSize:{type:Number,default:20},collapsedIconSize:{type:Number,default:24},rootIndent:Number,indent:{type:Number,default:32},labelField:{type:String,default:"label"},keyField:{type:String,default:"key"},childrenField:{type:String,default:"children"},disabledField:{type:String,default:"disabled"},defaultExpandAll:Boolean,defaultExpandedKeys:Array,expandedKeys:Array,value:[String,Number],defaultValue:{type:[String,Number],default:null},mode:{type:String,default:"vertical"},watchProps:{type:Array,default:void 0},disabled:Boolean,show:{type:Boolean,default:!0},inverted:Boolean,"onUpdate:expandedKeys":[Function,Array],onUpdateExpandedKeys:[Function,Array],onUpdateValue:[Function,Array],"onUpdate:value":[Function,Array],expandIcon:Function,renderIcon:Function,renderLabel:Function,renderExtra:Function,dropdownProps:Object,accordion:Boolean,nodeProps:Function,dropdownPlacement:{type:String,default:"bottom"},responsive:Boolean,items:Array,onOpenNamesChange:[Function,Array],onSelect:[Function,Array],onExpandedNamesChange:[Function,Array],expandedNames:Array,defaultExpandedNames:Array}),gt=A({name:"Menu",inheritAttrs:!1,props:ft,setup(e){const{mergedClsPrefixRef:o,inlineThemeDisabled:t}=ne(e),a=U("Menu","-menu",st,ko,e,o),n=Y(Ue,null),s=x(()=>{var b;const{collapsed:z}=e;if(z!==void 0)return z;if(n){const{collapseModeRef:r,collapsedRef:y}=n;if(r.value==="width")return(b=y.value)!==null&&b!==void 0?b:!1}return!1}),v=x(()=>{const{keyField:b,childrenField:z,disabledField:r}=e;return he(e.items||e.options,{getIgnored(y){return ge(y)},getChildren(y){return y[z]},getDisabled(y){return y[r]},getKey(y){var O;return(O=y[b])!==null&&O!==void 0?O:y.name}})}),p=x(()=>new Set(v.value.treeNodes.map(b=>b.key))),{watchProps:d}=e,f=K(null);d!=null&&d.includes("defaultValue")?Re(()=>{f.value=e.defaultValue}):f.value=e.defaultValue;const B=re(e,"value"),N=fe(B,f),g=K([]),$=()=>{g.value=e.defaultExpandAll?v.value.getNonLeafKeys():e.defaultExpandedNames||e.defaultExpandedKeys||v.value.getPath(N.value,{includeSelf:!1}).keyPath};d!=null&&d.includes("defaultExpandedKeys")?Re($):$();const c=Ao(e,["expandedNames","expandedKeys"]),u=fe(c,g),k=x(()=>v.value.treeNodes),_=x(()=>v.value.getPath(N.value).keyPath);J(le,{props:e,mergedCollapsedRef:s,mergedThemeRef:a,mergedValueRef:N,mergedExpandedKeysRef:u,activePathRef:_,mergedClsPrefixRef:o,isHorizontalRef:x(()=>e.mode==="horizontal"),invertedRef:re(e,"inverted"),doSelect:L,toggleExpand:j});function L(b,z){const{"onUpdate:value":r,onUpdateValue:y,onSelect:O}=e;y&&D(y,b,z),r&&D(r,b,z),O&&D(O,b,z),f.value=b}function V(b){const{"onUpdate:expandedKeys":z,onUpdateExpandedKeys:r,onExpandedNamesChange:y,onOpenNamesChange:O}=e;z&&D(z,b),r&&D(r,b),y&&D(y,b),O&&D(O,b),g.value=b}function j(b){const z=Array.from(u.value),r=z.findIndex(y=>y===b);if(~r)z.splice(r,1);else{if(e.accordion&&p.value.has(b)){const y=z.findIndex(O=>p.value.has(O));y>-1&&z.splice(y,1)}z.push(b)}V(z)}const T=b=>{const z=v.value.getPath(b??N.value,{includeSelf:!1}).keyPath;if(!z.length)return;const r=Array.from(u.value),y=new Set([...r,...z]);e.accordion&&p.value.forEach(O=>{y.has(O)&&!z.includes(O)&&y.delete(O)}),V(Array.from(y))},S=x(()=>{const{inverted:b}=e,{common:{cubicBezierEaseInOut:z},self:r}=a.value,{borderRadius:y,borderColorHorizontal:O,fontSize:lo,itemHeight:ao,dividerColor:so}=r,l={"--n-divider-color":so,"--n-bezier":z,"--n-font-size":lo,"--n-border-color-horizontal":O,"--n-border-radius":y,"--n-item-height":ao};return b?(l["--n-group-text-color"]=r.groupTextColorInverted,l["--n-color"]=r.colorInverted,l["--n-item-text-color"]=r.itemTextColorInverted,l["--n-item-text-color-hover"]=r.itemTextColorHoverInverted,l["--n-item-text-color-active"]=r.itemTextColorActiveInverted,l["--n-item-text-color-child-active"]=r.itemTextColorChildActiveInverted,l["--n-item-text-color-child-active-hover"]=r.itemTextColorChildActiveInverted,l["--n-item-text-color-active-hover"]=r.itemTextColorActiveHoverInverted,l["--n-item-icon-color"]=r.itemIconColorInverted,l["--n-item-icon-color-hover"]=r.itemIconColorHoverInverted,l["--n-item-icon-color-active"]=r.itemIconColorActiveInverted,l["--n-item-icon-color-active-hover"]=r.itemIconColorActiveHoverInverted,l["--n-item-icon-color-child-active"]=r.itemIconColorChildActiveInverted,l["--n-item-icon-color-child-active-hover"]=r.itemIconColorChildActiveHoverInverted,l["--n-item-icon-color-collapsed"]=r.itemIconColorCollapsedInverted,l["--n-item-text-color-horizontal"]=r.itemTextColorHorizontalInverted,l["--n-item-text-color-hover-horizontal"]=r.itemTextColorHoverHorizontalInverted,l["--n-item-text-color-active-horizontal"]=r.itemTextColorActiveHorizontalInverted,l["--n-item-text-color-child-active-horizontal"]=r.itemTextColorChildActiveHorizontalInverted,l["--n-item-text-color-child-active-hover-horizontal"]=r.itemTextColorChildActiveHoverHorizontalInverted,l["--n-item-text-color-active-hover-horizontal"]=r.itemTextColorActiveHoverHorizontalInverted,l["--n-item-icon-color-horizontal"]=r.itemIconColorHorizontalInverted,l["--n-item-icon-color-hover-horizontal"]=r.itemIconColorHoverHorizontalInverted,l["--n-item-icon-color-active-horizontal"]=r.itemIconColorActiveHorizontalInverted,l["--n-item-icon-color-active-hover-horizontal"]=r.itemIconColorActiveHoverHorizontalInverted,l["--n-item-icon-color-child-active-horizontal"]=r.itemIconColorChildActiveHorizontalInverted,l["--n-item-icon-color-child-active-hover-horizontal"]=r.itemIconColorChildActiveHoverHorizontalInverted,l["--n-arrow-color"]=r.arrowColorInverted,l["--n-arrow-color-hover"]=r.arrowColorHoverInverted,l["--n-arrow-color-active"]=r.arrowColorActiveInverted,l["--n-arrow-color-active-hover"]=r.arrowColorActiveHoverInverted,l["--n-arrow-color-child-active"]=r.arrowColorChildActiveInverted,l["--n-arrow-color-child-active-hover"]=r.arrowColorChildActiveHoverInverted,l["--n-item-color-hover"]=r.itemColorHoverInverted,l["--n-item-color-active"]=r.itemColorActiveInverted,l["--n-item-color-active-hover"]=r.itemColorActiveHoverInverted,l["--n-item-color-active-collapsed"]=r.itemColorActiveCollapsedInverted):(l["--n-group-text-color"]=r.groupTextColor,l["--n-color"]=r.color,l["--n-item-text-color"]=r.itemTextColor,l["--n-item-text-color-hover"]=r.itemTextColorHover,l["--n-item-text-color-active"]=r.itemTextColorActive,l["--n-item-text-color-child-active"]=r.itemTextColorChildActive,l["--n-item-text-color-child-active-hover"]=r.itemTextColorChildActiveHover,l["--n-item-text-color-active-hover"]=r.itemTextColorActiveHover,l["--n-item-icon-color"]=r.itemIconColor,l["--n-item-icon-color-hover"]=r.itemIconColorHover,l["--n-item-icon-color-active"]=r.itemIconColorActive,l["--n-item-icon-color-active-hover"]=r.itemIconColorActiveHover,l["--n-item-icon-color-child-active"]=r.itemIconColorChildActive,l["--n-item-icon-color-child-active-hover"]=r.itemIconColorChildActiveHover,l["--n-item-icon-color-collapsed"]=r.itemIconColorCollapsed,l["--n-item-text-color-horizontal"]=r.itemTextColorHorizontal,l["--n-item-text-color-hover-horizontal"]=r.itemTextColorHoverHorizontal,l["--n-item-text-color-active-horizontal"]=r.itemTextColorActiveHorizontal,l["--n-item-text-color-child-active-horizontal"]=r.itemTextColorChildActiveHorizontal,l["--n-item-text-color-child-active-hover-horizontal"]=r.itemTextColorChildActiveHoverHorizontal,l["--n-item-text-color-active-hover-horizontal"]=r.itemTextColorActiveHoverHorizontal,l["--n-item-icon-color-horizontal"]=r.itemIconColorHorizontal,l["--n-item-icon-color-hover-horizontal"]=r.itemIconColorHoverHorizontal,l["--n-item-icon-color-active-horizontal"]=r.itemIconColorActiveHorizontal,l["--n-item-icon-color-active-hover-horizontal"]=r.itemIconColorActiveHoverHorizontal,l["--n-item-icon-color-child-active-horizontal"]=r.itemIconColorChildActiveHorizontal,l["--n-item-icon-color-child-active-hover-horizontal"]=r.itemIconColorChildActiveHoverHorizontal,l["--n-arrow-color"]=r.arrowColor,l["--n-arrow-color-hover"]=r.arrowColorHover,l["--n-arrow-color-active"]=r.arrowColorActive,l["--n-arrow-color-active-hover"]=r.arrowColorActiveHover,l["--n-arrow-color-child-active"]=r.arrowColorChildActive,l["--n-arrow-color-child-active-hover"]=r.arrowColorChildActiveHover,l["--n-item-color-hover"]=r.itemColorHover,l["--n-item-color-active"]=r.itemColorActive,l["--n-item-color-active-hover"]=r.itemColorActiveHover,l["--n-item-color-active-collapsed"]=r.itemColorActiveCollapsed),l}),I=t?ie("menu",x(()=>e.inverted?"a":"b"),S,e):void 0,W=Co(),q=K(null),de=K(null);let F=!0;const Se=()=>{var b;F?F=!1:(b=q.value)===null||b===void 0||b.sync({showAllItemsBeforeCalculate:!0})};function Ze(){return document.getElementById(W)}const ae=K(-1);function eo(b){ae.value=e.options.length-b}function oo(b){b||(ae.value=-1)}const to=x(()=>{const b=ae.value;return{children:b===-1?[]:e.options.slice(b)}}),ro=x(()=>{const{childrenField:b,disabledField:z,keyField:r}=e;return he([to.value],{getIgnored(y){return ge(y)},getChildren(y){return y[b]},getDisabled(y){return y[z]},getKey(y){var O;return(O=y[r])!==null&&O!==void 0?O:y.name}})}),no=x(()=>he([{}]).treeNodes[0]);function io(){var b;if(ae.value===-1)return i(be,{root:!0,level:0,key:"__ellpisisGroupPlaceholder__",internalKey:"__ellpisisGroupPlaceholder__",title:"···",tmNode:no.value,domId:W,isEllipsisPlaceholder:!0});const z=ro.value.treeNodes[0],r=_.value,y=!!(!((b=z.children)===null||b===void 0)&&b.some(O=>r.includes(O.key)));return i(be,{level:0,root:!0,key:"__ellpisisGroup__",internalKey:"__ellpisisGroup__",title:"···",virtualChildActive:y,tmNode:z,domId:W,rawNodes:z.rawNode.children||[],tmNodes:z.children||[],isEllipsisPlaceholder:!0})}return{mergedClsPrefix:o,controlledExpandedKeys:c,uncontrolledExpanededKeys:g,mergedExpandedKeys:u,uncontrolledValue:f,mergedValue:N,activePath:_,tmNodes:k,mergedTheme:a,mergedCollapsed:s,cssVars:t?void 0:S,themeClass:I==null?void 0:I.themeClass,overflowRef:q,counterRef:de,updateCounter:()=>{},onResize:Se,onUpdateOverflow:oo,onUpdateCount:eo,renderCounter:io,getCounter:Ze,onRender:I==null?void 0:I.onRender,showOption:T,deriveResponsiveState:Se}},render(){const{mergedClsPrefix:e,mode:o,themeClass:t,onRender:a}=this;a==null||a();const n=()=>this.tmNodes.map(d=>_e(d,this.$props)),v=o==="horizontal"&&this.responsive,p=()=>i("div",wo(this.$attrs,{role:o==="horizontal"?"menubar":"menu",class:[`${e}-menu`,t,`${e}-menu--${o}`,v&&`${e}-menu--responsive`,this.mergedCollapsed&&`${e}-menu--collapsed`],style:this.cssVars}),v?i(Oo,{ref:"overflowRef",onUpdateOverflow:this.onUpdateOverflow,getCounter:this.getCounter,onUpdateCount:this.onUpdateCount,updateCounter:this.updateCounter,style:{width:"100%",display:"flex",overflow:"hidden"}},{default:n,counter:this.renderCounter}):n());return v?i(yo,{onResize:this.onResize},{default:p}):p()}}),bt={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},xt=P("path",{d:"M32 32v432a16 16 0 0 0 16 16h432",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),yt=P("rect",{x:"96",y:"224",width:"80",height:"192",rx:"20",ry:"20",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),Ct=P("rect",{x:"240",y:"176",width:"80",height:"240",rx:"20",ry:"20",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),wt=P("rect",{x:"383.64",y:"112",width:"80",height:"304",rx:"20",ry:"20",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),kt=[xt,yt,Ct,wt],zt=A({name:"BarChartOutline",render:function(o,t){return E(),G("svg",bt,kt)}}),_t={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},St=P("path",{d:"M440 432H72a40 40 0 0 1-40-40V120a40 40 0 0 1 40-40h75.89a40 40 0 0 1 22.19 6.72l27.84 18.56a40 40 0 0 0 22.19 6.72H440a40 40 0 0 1 40 40v240a40 40 0 0 1-40 40z",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),It=P("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M32 192h448"},null,-1),Rt=[St,It],Pt=A({name:"FolderOutline",render:function(o,t){return E(),G("svg",_t,Rt)}}),Nt={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},Tt=P("rect",{x:"48",y:"48",width:"176",height:"176",rx:"20",ry:"20",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),$t=P("rect",{x:"288",y:"48",width:"176",height:"176",rx:"20",ry:"20",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),Ot=P("rect",{x:"48",y:"288",width:"176",height:"176",rx:"20",ry:"20",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),At=P("rect",{x:"288",y:"288",width:"176",height:"176",rx:"20",ry:"20",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),Bt=[Tt,$t,Ot,At],Ht=A({name:"GridOutline",render:function(o,t){return E(),G("svg",Nt,Bt)}}),Mt={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},Et=P("path",{d:"M304 336v40a40 40 0 0 1-40 40H104a40 40 0 0 1-40-40V136a40 40 0 0 1 40-40h152c22.09 0 48 17.91 48 40v40",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),Lt=P("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M368 336l80-80l-80-80"},null,-1),jt=P("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M176 256h256"},null,-1),Ft=[Et,Lt,jt],Kt=A({name:"LogOutOutline",render:function(o,t){return E(),G("svg",Mt,Ft)}}),Vt={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},Dt=P("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-miterlimit":"10","stroke-width":"32",d:"M80 160h352"},null,-1),Ut=P("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-miterlimit":"10","stroke-width":"32",d:"M80 256h352"},null,-1),Gt=P("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-miterlimit":"10","stroke-width":"32",d:"M80 352h352"},null,-1),qt=[Dt,Ut,Gt],Yt=A({name:"MenuOutline",render:function(o,t){return E(),G("svg",Vt,qt)}}),Wt={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},Xt=P("path",{d:"M160 136c0-30.62 4.51-61.61 16-88C99.57 81.27 48 159.32 48 248c0 119.29 96.71 216 216 216c88.68 0 166.73-51.57 200-128c-26.39 11.49-57.38 16-88 16c-119.29 0-216-96.71-216-216z",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),Jt=[Xt],Qt=A({name:"MoonOutline",render:function(o,t){return E(),G("svg",Wt,Jt)}}),Zt={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},er=P("path",{d:"M258.9 48C141.92 46.42 46.42 141.92 48 258.9c1.56 112.19 92.91 203.54 205.1 205.1c117 1.6 212.48-93.9 210.88-210.88C462.44 140.91 371.09 49.56 258.9 48zm126.42 327.25a4 4 0 0 1-6.14-.32a124.27 124.27 0 0 0-32.35-29.59C321.37 329 289.11 320 256 320s-65.37 9-90.83 25.34a124.24 124.24 0 0 0-32.35 29.58a4 4 0 0 1-6.14.32A175.32 175.32 0 0 1 80 259c-1.63-97.31 78.22-178.76 175.57-179S432 158.81 432 256a175.32 175.32 0 0 1-46.68 119.25z",fill:"currentColor"},null,-1),or=P("path",{d:"M256 144c-19.72 0-37.55 7.39-50.22 20.82s-19 32-17.57 51.93C191.11 256 221.52 288 256 288s64.83-32 67.79-71.24c1.48-19.74-4.8-38.14-17.68-51.82C293.39 151.44 275.59 144 256 144z",fill:"currentColor"},null,-1),tr=[er,or],rr=A({name:"PersonCircleOutline",render:function(o,t){return E(),G("svg",Zt,tr)}}),nr={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},ir=zo('<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M256 48v48"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M256 416v48"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M403.08 108.92l-33.94 33.94"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M142.86 369.14l-33.94 33.94"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M464 256h-48"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M96 256H48"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M403.08 403.08l-33.94-33.94"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M142.86 142.86l-33.94-33.94"></path><circle cx="256" cy="256" r="80" fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32"></circle>',9),lr=[ir],ar=A({name:"SunnyOutline",render:function(o,t){return E(),G("svg",nr,lr)}}),sr={class:"flex items-center justify-center h-16 border-b border-gray-200/20"},cr={key:1,class:"text-xl font-bold ml-2",style:{color:"#2080F0"}},dr={class:"flex items-center gap-3"},ur={class:"flex items-center gap-2.5 cursor-pointer px-3 py-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 border border-transparent hover:border-gray-200 dark:hover:border-gray-600 group"},hr={class:"flex flex-col leading-tight"},mr={class:"text-sm font-semibold"},vr={class:"text-xs text-gray-400"},Fr=A({__name:"AdminLayout",setup(e){const o=$o(),t=No(),a=_o(),n=So(),s=x(()=>[{label:"工作台",key:"/dashboard",icon:()=>i(Ht),show:n.hasPermission("dashboard")},{label:"数据大屏",key:"/dashboard/data-screen",icon:()=>i(zt),show:n.hasPermission("dashboard:screen")},{label:"学生管理",key:"/student",icon:()=>i(Mo),show:n.hasPermission("student:list")},{label:"教师管理",key:"/teacher",icon:()=>i(Eo),show:n.hasPermission("teacher:list")},{label:"班级管理",key:"/class",icon:()=>i(Lo),show:n.hasPermission("class:list")},{label:"课程管理",key:"/course",icon:()=>i(jo),show:n.hasPermission("course:list")},{label:"成绩管理",key:"/score",icon:()=>i(Oe),show:n.hasPermission("score:list")},{label:"德育管理",key:"/moral",icon:()=>i(ve),show:n.hasPermission("moral:list")},{label:"AI 智能中心",key:"ai-group",icon:()=>i(ve),show:n.hasPermission("ai"),children:[{label:"AI 对话",key:"/ai/chat",icon:()=>i(Fo),show:n.hasPermission("ai:chat")},{label:"AI 分析",key:"/ai",icon:()=>i(ve)}]},{label:"公告管理",key:"/notice",icon:()=>i(Ae),show:n.hasPermission("notice:list")},{label:"操作日志",key:"/oper-log",icon:()=>i(Oe),show:n.hasPermission("operlog:list")},{label:"消息通知",key:"/message",icon:()=>i(Ae),show:n.hasPermission("message:list")},{label:"文件管理",key:"/file",icon:()=>i(Pt),show:n.hasPermission("file:list")},{label:"系统设置",key:"/system",icon:()=>i(Ko),show:n.hasPermission("system:config")}].filter(c=>c.show!==!1)),v=x(()=>{var u;const c=(u=n.userInfo)==null?void 0:u.roles;return!c||c.length===0?"用户":c.includes("ROLE_ADMIN")?"管理员":c.includes("ROLE_TEACHER")?"教师":c.includes("ROLE_STUDENT")?"学生":c[0]}),p=()=>a.darkMode,d=c=>({display:"flex",alignItems:"center",gap:"10px",padding:"8px 12px",borderRadius:"8px",cursor:"pointer",color:c,fontWeight:500,fontSize:"14px",transition:"all 0.15s"}),f=(c,u,k,_)=>({key:u,type:"render",render:()=>i("div",{style:d(_),onClick:()=>g(u),onMouseenter:L=>{L.currentTarget.style.background=p()?"#2a2a3e":"#f0f0f0"},onMouseleave:L=>{L.currentTarget.style.background="transparent"}},[i("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",width:"28px",height:"28px",borderRadius:"8px",background:p()?"#2a2a3e":_==="#d03050"?"#fff1f0":"#f0f5ff",fontSize:"16px",color:_}},[i(k)]),i("span",null,c)])}),B=x(()=>[{key:"header",type:"render",render:()=>{var c,u,k,_;return i("div",{style:{display:"flex",alignItems:"center",gap:"12px",padding:"12px 14px 14px",borderBottom:`1px solid ${p()?"#333":"#efefef"}`,minWidth:"200px"}},[i($e,{round:!0,size:44,src:(c=n.userInfo)==null?void 0:c.avatar,"fallback-src":`https://api.dicebear.com/7.x/avataaars/svg?seed=${(u=n.userInfo)==null?void 0:u.username}`}),i("div",{style:{lineHeight:1.4}},[i("div",{style:{fontWeight:600,fontSize:"15px",color:p()?"#e0e0e0":"#333"}},((k=n.userInfo)==null?void 0:k.realName)||((_=n.userInfo)==null?void 0:_.username)),i("div",{style:{fontSize:"12px",opacity:.5,marginTop:"1px",color:p()?"#aaa":"#666"}},v.value)])])}},{type:"divider",key:"d1",style:{margin:"4px 0"}},f("个人信息","profile",rr,"#2080f0"),{type:"divider",key:"d2",style:{margin:"4px 0"}},f("退出登录","logout",Kt,"#d03050")]),N=c=>{o.push(c)},g=c=>{c==="profile"?o.push("/profile"):c==="logout"&&(n.logout(),o.push("/login"))},$=x(()=>{const c=t.path,u=[{label:"首页",key:"/dashboard"}];return c.includes("student")?u.push({label:"学生管理",key:"student"}):c.includes("teacher")?u.push({label:"教师管理",key:"teacher"}):c.includes("class")?u.push({label:"班级管理",key:"class"}):c.includes("course")?u.push({label:"课程管理",key:"course"}):c.includes("score")?u.push({label:"成绩管理",key:"score"}):c.includes("moral")?u.push({label:"德育管理",key:"moral"}):c.includes("ai/chat")?u.push({label:"AI 对话",key:"ai-chat"}):c.includes("ai")?u.push({label:"AI 智能中心",key:"ai"}):c.includes("notice")?u.push({label:"公告管理",key:"notice"}):c.includes("oper-log")?u.push({label:"操作日志",key:"oper-log"}):c.includes("message")?u.push({label:"消息通知",key:"message"}):c.includes("file")?u.push({label:"文件管理",key:"file"}):c.includes("profile")?u.push({label:"个人中心",key:"profile"}):c.includes("system")?u.push({label:"系统设置",key:"system"}):c.includes("data-screen")&&u.push({label:"数据大屏",key:"data-screen"}),u});return(c,u)=>{const k=Wo,_=To("router-view");return E(),Q(w(Be),{position:"absolute","has-sider":""},{default:M(()=>[H(w(at),{collapsed:w(a).collapsed,"collapse-mode":"width","collapsed-width":64,width:176,"native-scrollbar":!1,bordered:"",style:{background:"var(--n-color)"}},{default:M(()=>[P("div",sr,[w(a).collapsed?Io("",!0):(E(),Q(w(te),{key:0,size:"28",color:"#2080F0"},{default:M(()=>[H(w(Te))]),_:1})),w(a).collapsed?(E(),Q(w(te),{key:2,size:"24",color:"#2080F0"},{default:M(()=>[H(w(Te))]),_:1})):(E(),G("span",cr,"智慧学生管理"))]),H(w(gt),{options:s.value,collapsed:w(a).collapsed,"collapsed-width":64,"collapsed-icon-size":22,value:w(t).path,"onUpdate:value":N},null,8,["options","collapsed","value"])]),_:1},8,["collapsed"]),H(w(Be),null,{default:M(()=>[H(w(tt),{bordered:"",class:"h-16 flex items-center justify-between px-4"},{default:M(()=>[P("div",dr,[H(w(Pe),{tertiary:"",circle:"",onClick:w(a).toggleCollapsed},{icon:M(()=>[H(w(te),null,{default:M(()=>[H(w(Yt))]),_:1})]),_:1},8,["onClick"]),H(w(Go),null,{default:M(()=>[(E(!0),G(Fe,null,Ro($.value,L=>(E(),Q(k,{key:L.key},{default:M(()=>[Ne(se(L.label),1)]),_:2},1024))),128))]),_:1})]),H(w(Ho),{align:"center",size:"large"},{default:M(()=>[H(w(Ke),{trigger:"hover"},{trigger:M(()=>[H(w(Pe),{tertiary:"",circle:"",onClick:w(a).toggleDark},{icon:M(()=>[H(w(te),null,{default:M(()=>[w(a).darkMode?(E(),Q(w(ar),{key:1})):(E(),Q(w(Qt),{key:0}))]),_:1})]),_:1},8,["onClick"])]),default:M(()=>[Ne(" "+se(w(a).darkMode?"浅色模式":"深色模式"),1)]),_:1}),H(w(Ve),{options:B.value,onSelect:g,placement:"bottom-end",trigger:"click"},{default:M(()=>{var L,V,j,T;return[P("div",ur,[H(w($e),{src:(L=w(n).userInfo)==null?void 0:L.avatar,round:"",size:"small","fallback-src":`https://api.dicebear.com/7.x/avataaars/svg?seed=${(V=w(n).userInfo)==null?void 0:V.username}`,class:"ring-2 ring-transparent group-hover:ring-blue-400 transition-all duration-200"},null,8,["src","fallback-src"]),P("div",hr,[P("span",mr,se(((j=w(n).userInfo)==null?void 0:j.realName)||((T=w(n).userInfo)==null?void 0:T.username)),1),P("span",vr,se(v.value),1)]),H(w(te),{size:"14",color:"#999",class:"ml-0.5 transition-transform duration-200 group-hover:rotate-180"},{default:M(()=>[...u[0]||(u[0]=[P("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[P("polyline",{points:"6 9 12 15 18 9"})],-1)])]),_:1})])]}),_:1},8,["options"])]),_:1})]),_:1}),H(w(Zo),{"native-scrollbar":!1,class:"p-6",style:Po({minHeight:"calc(100vh - 64px)",background:w(a).darkMode?"#1a1a2e":"#f5f7fa"})},{default:M(()=>[H(_)]),_:1},8,["style"])]),_:1})]),_:1})}}});export{Fr as default};
