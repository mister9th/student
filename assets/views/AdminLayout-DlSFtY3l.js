import{ao as O,aS as n,H as h,G as C,O as P,K as m,cs as le,cF as G,cG as ae,w as vo,a7 as x,af as te,bQ as Z,ck as ie,bV as V,bG as po,bH as fo,b4 as go,c3 as bo,aX as W,aj as xo,c9 as yo,aq as Co,a6 as Pe,S as Ke,cz as Ve,d as De,Q as D,P as re,aD as wo,bW as oe,bj as ye,cx as fe,b as Ue,bi as me,g as ko,V as zo,cL as Re,ae as _o,bm as So,bl as Io,bI as j,ad as U,aa as I,ah as Po,cH as Ro,cr as To,ab as J,cM as E,cp as w,ak as M,ac as No,B as Te,bX as Oo,ai as Ne,cj as de,by as $o,cA as Ao,c1 as Bo,cB as Ho}from"../index-C0_nDWpt.js";import{S as Oe}from"../icons/SchoolSharp-CvSJST9t.js";import{N as Ge}from"../components/Tooltip-DrVYZLVC.js";import{N as qe}from"../components/Dropdown-B0iqyO_h.js";import{u as ge}from"../shared/use-merged-state-Btfra8ZO.js";import{V as Mo,a as ve}from"../shared/create-D_0OoVxc.js";import{u as Eo}from"../components/Tag-DU0gTkl-.js";import{C as Lo}from"../icons/ChevronRight-D5ZFzkkv.js";import{f as pe}from"../shared/format-length-B-p6aW7q.js";import{N as jo}from"../components/Space-Dq_9ah40.js";import{N as $e}from"../components/Avatar-DVQgADpP.js";import{P as Ae}from"../icons/PeopleOutline-C67cYavh.js";import{P as Fo}from"../icons/PersonOutline-Cc7cVwLN.js";import{S as Be}from"../icons/SchoolOutline-BTk_kAhB.js";import{B as He}from"../icons/BookOutline-DuwoB72n.js";import{C as Ko}from"../icons/CalendarOutline-BsjMSpox.js";import{D as Y}from"../icons/DocumentTextOutline-DfhXReIN.js";import{S as ee}from"../icons/SparklesOutline-CMAqNl3d.js";import{F as Vo}from"../icons/FlagOutline-BvQ5Q2Sy.js";import{R as Do}from"../icons/RocketOutline-DW3VSuYy.js";import{C as Uo}from"../icons/ChatbubblesOutline-DBmWSSdc.js";import{N as Me}from"../icons/NotificationsOutline-CbF_dG9k.js";import{S as Go}from"../icons/SettingsOutline-B4SlpseH.js";import{N as ne}from"../components/Icon-DKl3d89x.js";import"../components/Popover-D1iap9CV.js";import"../shared/get-M2nFAXB1.js";import"../components/next-frame-once-C5Ksf8W7.js";import"../shared/happens-in-CM8LO42l.js";import"../components/get-slot-Bk_rJcZu.js";import"../shared/utils-Zkpp_1nw.js";const qo=O({name:"ChevronDownFilled",render(){return n("svg",{viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg"},n("path",{d:"M3.20041 5.73966C3.48226 5.43613 3.95681 5.41856 4.26034 5.70041L8 9.22652L11.7397 5.70041C12.0432 5.41856 12.5177 5.43613 12.7996 5.73966C13.0815 6.0432 13.0639 6.51775 12.7603 6.7996L8.51034 10.7996C8.22258 11.0668 7.77743 11.0668 7.48967 10.7996L3.23966 6.7996C2.93613 6.51775 2.91856 6.0432 3.20041 5.73966Z",fill:"currentColor"}))}}),Yo=h("breadcrumb",`
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
 `),C("&:not(:last-child)",[P("clickable",[m("link",`
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
 `)])])]),Ye=te("n-breadcrumb"),Wo=Object.assign(Object.assign({},G.props),{separator:{type:String,default:"/"}}),Xo=O({name:"Breadcrumb",props:Wo,setup(e){const{mergedClsPrefixRef:o,inlineThemeDisabled:t}=le(e),s=G("Breadcrumb","-breadcrumb",Yo,vo,e,o);Z(Ye,{separatorRef:ie(e,"separator"),mergedClsPrefixRef:o});const r=x(()=>{const{common:{cubicBezierEaseInOut:v},self:{separatorColor:p,itemTextColor:u,itemTextColorHover:f,itemTextColorPressed:B,itemTextColorActive:R,fontSize:b,fontWeightActive:$,itemBorderRadius:T,itemColorHover:S,itemColorPressed:l,itemLineHeight:d}}=s.value;return{"--n-font-size":b,"--n-bezier":v,"--n-item-text-color":u,"--n-item-text-color-hover":f,"--n-item-text-color-pressed":B,"--n-item-text-color-active":R,"--n-separator-color":p,"--n-item-color-hover":S,"--n-item-color-pressed":l,"--n-item-border-radius":T,"--n-font-weight-active":$,"--n-item-line-height":d}}),c=t?ae("breadcrumb",void 0,r,e):void 0;return{mergedClsPrefix:o,cssVars:t?void 0:r,themeClass:c==null?void 0:c.themeClass,onRender:c==null?void 0:c.onRender}},render(){var e;return(e=this.onRender)===null||e===void 0||e.call(this),n("nav",{class:[`${this.mergedClsPrefix}-breadcrumb`,this.themeClass],style:this.cssVars,"aria-label":"Breadcrumb"},n("ul",null,this.$slots))}});function Qo(e=go?window:null){const o=()=>{const{hash:r,host:c,hostname:v,href:p,origin:u,pathname:f,port:B,protocol:R,search:b}=(e==null?void 0:e.location)||{};return{hash:r,host:c,hostname:v,href:p,origin:u,pathname:f,port:B,protocol:R,search:b}},t=V(o()),s=()=>{t.value=o()};return po(()=>{e&&(e.addEventListener("popstate",s),e.addEventListener("hashchange",s))}),fo(()=>{e&&(e.removeEventListener("popstate",s),e.removeEventListener("hashchange",s))}),t}const Zo={separator:String,href:String,clickable:{type:Boolean,default:!0},showSeparator:{type:Boolean,default:!0},onClick:Function},Jo=O({name:"BreadcrumbItem",props:Zo,slots:Object,setup(e,{slots:o}){const t=W(Ye,null);if(!t)return()=>null;const{separatorRef:s,mergedClsPrefixRef:r}=t,c=Qo(),v=x(()=>e.href?"a":"span"),p=x(()=>c.value.href===e.href?"location":null);return()=>{const{value:u}=r;return n("li",{class:[`${u}-breadcrumb-item`,e.clickable&&`${u}-breadcrumb-item--clickable`]},n(v.value,{class:`${u}-breadcrumb-item__link`,"aria-current":p.value,href:e.href,onClick:e.onClick},o),e.showSeparator&&n("span",{class:`${u}-breadcrumb-item__separator`,"aria-hidden":"true"},bo(o.separator,()=>{var f;return[(f=e.separator)!==null&&f!==void 0?f:s.value]})))}}});function et(e){const{baseColor:o,textColor2:t,bodyColor:s,cardColor:r,dividerColor:c,actionColor:v,scrollbarColor:p,scrollbarColorHover:u,invertedColor:f}=e;return{textColor:t,textColorInverted:"#FFF",color:s,colorEmbedded:v,headerColor:r,headerColorInverted:f,footerColor:v,footerColorInverted:f,headerBorderColor:c,headerBorderColorInverted:f,footerBorderColor:c,footerBorderColorInverted:f,siderBorderColor:c,siderBorderColorInverted:f,siderColor:r,siderColorInverted:f,siderToggleButtonBorder:`1px solid ${c}`,siderToggleButtonColor:o,siderToggleButtonIconColor:t,siderToggleButtonIconColorInverted:t,siderToggleBarColor:Pe(s,p),siderToggleBarColorHover:Pe(s,u),__invertScrollbar:"true"}}const Ce=xo({name:"Layout",common:Co,peers:{Scrollbar:yo},self:et}),We=te("n-layout-sider"),we={type:String,default:"static"},ot=h("layout",`
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
 `),P("absolute-positioned",`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),tt={embedded:Boolean,position:we,nativeScrollbar:{type:Boolean,default:!0},scrollbarProps:Object,onScroll:Function,contentClass:String,contentStyle:{type:[String,Object],default:""},hasSider:Boolean,siderPlacement:{type:String,default:"left"}},Xe=te("n-layout");function Qe(e){return O({name:e?"LayoutContent":"Layout",props:Object.assign(Object.assign({},G.props),tt),setup(o){const t=V(null),s=V(null),{mergedClsPrefixRef:r,inlineThemeDisabled:c}=le(o),v=G("Layout","-layout",ot,Ce,o,r);function p(S,l){if(o.nativeScrollbar){const{value:d}=t;d&&(l===void 0?d.scrollTo(S):d.scrollTo(S,l))}else{const{value:d}=s;d&&d.scrollTo(S,l)}}Z(Xe,o);let u=0,f=0;const B=S=>{var l;const d=S.target;u=d.scrollLeft,f=d.scrollTop,(l=o.onScroll)===null||l===void 0||l.call(o,S)};Ve(()=>{if(o.nativeScrollbar){const S=t.value;S&&(S.scrollTop=f,S.scrollLeft=u)}});const R={display:"flex",flexWrap:"nowrap",width:"100%",flexDirection:"row"},b={scrollTo:p},$=x(()=>{const{common:{cubicBezierEaseInOut:S},self:l}=v.value;return{"--n-bezier":S,"--n-color":o.embedded?l.colorEmbedded:l.color,"--n-text-color":l.textColor}}),T=c?ae("layout",x(()=>o.embedded?"e":""),$,o):void 0;return Object.assign({mergedClsPrefix:r,scrollableElRef:t,scrollbarInstRef:s,hasSiderStyle:R,mergedTheme:v,handleNativeElScroll:B,cssVars:c?void 0:$,themeClass:T==null?void 0:T.themeClass,onRender:T==null?void 0:T.onRender},b)},render(){var o;const{mergedClsPrefix:t,hasSider:s}=this;(o=this.onRender)===null||o===void 0||o.call(this);const r=s?this.hasSiderStyle:void 0,c=[this.themeClass,e&&`${t}-layout-content`,`${t}-layout`,`${t}-layout--${this.position}-positioned`];return n("div",{class:c,style:this.cssVars},this.nativeScrollbar?n("div",{ref:"scrollableElRef",class:[`${t}-layout-scroll-container`,this.contentClass],style:[this.contentStyle,r],onScroll:this.handleNativeElScroll},this.$slots):n(Ke,Object.assign({},this.scrollbarProps,{onScroll:this.onScroll,ref:"scrollbarInstRef",theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,contentClass:this.contentClass,contentStyle:[this.contentStyle,r]}),this.$slots))}})}const Ee=Qe(!1),rt=Qe(!0),nt=h("layout-header",`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 box-sizing: border-box;
 width: 100%;
 background-color: var(--n-color);
 color: var(--n-text-color);
`,[P("absolute-positioned",`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 `),P("bordered",`
 border-bottom: solid 1px var(--n-border-color);
 `)]),it={position:we,inverted:Boolean,bordered:{type:Boolean,default:!1}},lt=O({name:"LayoutHeader",props:Object.assign(Object.assign({},G.props),it),setup(e){const{mergedClsPrefixRef:o,inlineThemeDisabled:t}=le(e),s=G("Layout","-layout-header",nt,Ce,e,o),r=x(()=>{const{common:{cubicBezierEaseInOut:v},self:p}=s.value,u={"--n-bezier":v};return e.inverted?(u["--n-color"]=p.headerColorInverted,u["--n-text-color"]=p.textColorInverted,u["--n-border-color"]=p.headerBorderColorInverted):(u["--n-color"]=p.headerColor,u["--n-text-color"]=p.textColor,u["--n-border-color"]=p.headerBorderColor),u}),c=t?ae("layout-header",x(()=>e.inverted?"a":"b"),r,e):void 0;return{mergedClsPrefix:o,cssVars:t?void 0:r,themeClass:c==null?void 0:c.themeClass,onRender:c==null?void 0:c.onRender}},render(){var e;const{mergedClsPrefix:o}=this;return(e=this.onRender)===null||e===void 0||e.call(this),n("div",{class:[`${o}-layout-header`,this.themeClass,this.position&&`${o}-layout-header--${this.position}-positioned`,this.bordered&&`${o}-layout-header--bordered`],style:this.cssVars},this.$slots)}}),at=h("layout-sider",`
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
`,[P("bordered",[m("border",`
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 width: 1px;
 background-color: var(--n-border-color);
 transition: background-color .3s var(--n-bezier);
 `)]),m("left-placement",[P("bordered",[m("border",`
 right: 0;
 `)])]),P("right-placement",`
 justify-content: flex-start;
 `,[P("bordered",[m("border",`
 left: 0;
 `)]),P("collapsed",[h("layout-toggle-button",[h("base-icon",`
 transform: rotate(180deg);
 `)]),h("layout-toggle-bar",[C("&:hover",[m("top",{transform:"rotate(-12deg) scale(1.15) translateY(-2px)"}),m("bottom",{transform:"rotate(12deg) scale(1.15) translateY(2px)"})])])]),h("layout-toggle-button",`
 left: 0;
 transform: translateX(-50%) translateY(-50%);
 `,[h("base-icon",`
 transform: rotate(0);
 `)]),h("layout-toggle-bar",`
 left: -28px;
 transform: rotate(180deg);
 `,[C("&:hover",[m("top",{transform:"rotate(12deg) scale(1.15) translateY(-2px)"}),m("bottom",{transform:"rotate(-12deg) scale(1.15) translateY(2px)"})])])]),P("collapsed",[h("layout-toggle-bar",[C("&:hover",[m("top",{transform:"rotate(-12deg) scale(1.15) translateY(-2px)"}),m("bottom",{transform:"rotate(12deg) scale(1.15) translateY(2px)"})])]),h("layout-toggle-button",[h("base-icon",`
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
 `),P("show-content",[h("layout-sider-scroll-container",{opacity:1})]),P("absolute-positioned",`
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 `)]),st=O({props:{clsPrefix:{type:String,required:!0},onClick:Function},render(){const{clsPrefix:e}=this;return n("div",{onClick:this.onClick,class:`${e}-layout-toggle-bar`},n("div",{class:`${e}-layout-toggle-bar__top`}),n("div",{class:`${e}-layout-toggle-bar__bottom`}))}}),ct=O({name:"LayoutToggleButton",props:{clsPrefix:{type:String,required:!0},onClick:Function},render(){const{clsPrefix:e}=this;return n("div",{class:`${e}-layout-toggle-button`,onClick:this.onClick},n(De,{clsPrefix:e},{default:()=>n(Lo,null)}))}}),dt={position:we,bordered:Boolean,collapsedWidth:{type:Number,default:48},width:{type:[Number,String],default:272},contentClass:String,contentStyle:{type:[String,Object],default:""},collapseMode:{type:String,default:"transform"},collapsed:{type:Boolean,default:void 0},defaultCollapsed:Boolean,showCollapsedContent:{type:Boolean,default:!0},showTrigger:{type:[Boolean,String],default:!1},nativeScrollbar:{type:Boolean,default:!0},inverted:Boolean,scrollbarProps:Object,triggerClass:String,triggerStyle:[String,Object],collapsedTriggerClass:String,collapsedTriggerStyle:[String,Object],"onUpdate:collapsed":[Function,Array],onUpdateCollapsed:[Function,Array],onAfterEnter:Function,onAfterLeave:Function,onExpand:[Function,Array],onCollapse:[Function,Array],onScroll:Function},ut=O({name:"LayoutSider",props:Object.assign(Object.assign({},G.props),dt),setup(e){const o=W(Xe),t=V(null),s=V(null),r=V(e.defaultCollapsed),c=ge(ie(e,"collapsed"),r),v=x(()=>pe(c.value?e.collapsedWidth:e.width)),p=x(()=>e.collapseMode!=="transform"?{}:{minWidth:pe(e.width)}),u=x(()=>o?o.siderPlacement:"left");function f(N,k){if(e.nativeScrollbar){const{value:z}=t;z&&(k===void 0?z.scrollTo(N):z.scrollTo(N,k))}else{const{value:z}=s;z&&z.scrollTo(N,k)}}function B(){const{"onUpdate:collapsed":N,onUpdateCollapsed:k,onExpand:z,onCollapse:X}=e,{value:q}=c;k&&D(k,!q),N&&D(N,!q),r.value=!q,q?z&&D(z):X&&D(X)}let R=0,b=0;const $=N=>{var k;const z=N.target;R=z.scrollLeft,b=z.scrollTop,(k=e.onScroll)===null||k===void 0||k.call(e,N)};Ve(()=>{if(e.nativeScrollbar){const N=t.value;N&&(N.scrollTop=b,N.scrollLeft=R)}}),Z(We,{collapsedRef:c,collapseModeRef:ie(e,"collapseMode")});const{mergedClsPrefixRef:T,inlineThemeDisabled:S}=le(e),l=G("Layout","-layout-sider",at,Ce,e,T);function d(N){var k,z;N.propertyName==="max-width"&&(c.value?(k=e.onAfterLeave)===null||k===void 0||k.call(e):(z=e.onAfterEnter)===null||z===void 0||z.call(e))}const F={scrollTo:f},L=x(()=>{const{common:{cubicBezierEaseInOut:N},self:k}=l.value,{siderToggleButtonColor:z,siderToggleButtonBorder:X,siderToggleBarColor:q,siderToggleBarColorHover:he}=k,K={"--n-bezier":N,"--n-toggle-button-color":z,"--n-toggle-button-border":X,"--n-toggle-bar-color":q,"--n-toggle-bar-color-hover":he};return e.inverted?(K["--n-color"]=k.siderColorInverted,K["--n-text-color"]=k.textColorInverted,K["--n-border-color"]=k.siderBorderColorInverted,K["--n-toggle-button-icon-color"]=k.siderToggleButtonIconColorInverted,K.__invertScrollbar=k.__invertScrollbar):(K["--n-color"]=k.siderColor,K["--n-text-color"]=k.textColor,K["--n-border-color"]=k.siderBorderColor,K["--n-toggle-button-icon-color"]=k.siderToggleButtonIconColor),K}),H=S?ae("layout-sider",x(()=>e.inverted?"a":"b"),L,e):void 0;return Object.assign({scrollableElRef:t,scrollbarInstRef:s,mergedClsPrefix:T,mergedTheme:l,styleMaxWidth:v,mergedCollapsed:c,scrollContainerStyle:p,siderPlacement:u,handleNativeElScroll:$,handleTransitionend:d,handleTriggerClick:B,inlineThemeDisabled:S,cssVars:L,themeClass:H==null?void 0:H.themeClass,onRender:H==null?void 0:H.onRender},F)},render(){var e;const{mergedClsPrefix:o,mergedCollapsed:t,showTrigger:s}=this;return(e=this.onRender)===null||e===void 0||e.call(this),n("aside",{class:[`${o}-layout-sider`,this.themeClass,`${o}-layout-sider--${this.position}-positioned`,`${o}-layout-sider--${this.siderPlacement}-placement`,this.bordered&&`${o}-layout-sider--bordered`,t&&`${o}-layout-sider--collapsed`,(!t||this.showCollapsedContent)&&`${o}-layout-sider--show-content`],onTransitionend:this.handleTransitionend,style:[this.inlineThemeDisabled?void 0:this.cssVars,{maxWidth:this.styleMaxWidth,width:pe(this.width)}]},this.nativeScrollbar?n("div",{class:[`${o}-layout-sider-scroll-container`,this.contentClass],onScroll:this.handleNativeElScroll,style:[this.scrollContainerStyle,{overflow:"auto"},this.contentStyle],ref:"scrollableElRef"},this.$slots):n(Ke,Object.assign({},this.scrollbarProps,{onScroll:this.onScroll,ref:"scrollbarInstRef",style:this.scrollContainerStyle,contentStyle:this.contentStyle,contentClass:this.contentClass,theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,builtinThemeOverrides:this.inverted&&this.cssVars.__invertScrollbar==="true"?{colorHover:"rgba(255, 255, 255, .4)",color:"rgba(255, 255, 255, .3)"}:void 0}),this.$slots),s?s==="bar"?n(st,{clsPrefix:o,class:t?this.collapsedTriggerClass:this.triggerClass,style:t?this.collapsedTriggerStyle:this.triggerStyle,onClick:this.handleTriggerClick}):n(ct,{clsPrefix:o,class:t?this.collapsedTriggerClass:this.triggerClass,style:t?this.collapsedTriggerStyle:this.triggerStyle,onClick:this.handleTriggerClick}):null,this.bordered?n("div",{class:`${o}-layout-sider__border`}):null)}}),se=te("n-menu"),Ze=te("n-submenu"),ke=te("n-menu-item-group"),Le=[C("&::before","background-color: var(--n-item-color-hover);"),m("arrow",`
 color: var(--n-arrow-color-hover);
 `),m("icon",`
 color: var(--n-item-icon-color-hover);
 `),h("menu-item-content-header",`
 color: var(--n-item-text-color-hover);
 `,[C("a",`
 color: var(--n-item-text-color-hover);
 `),m("extra",`
 color: var(--n-item-text-color-hover);
 `)])],je=[m("icon",`
 color: var(--n-item-icon-color-hover-horizontal);
 `),h("menu-item-content-header",`
 color: var(--n-item-text-color-hover-horizontal);
 `,[C("a",`
 color: var(--n-item-text-color-hover-horizontal);
 `),m("extra",`
 color: var(--n-item-text-color-hover-horizontal);
 `)])],ht=C([h("menu",`
 background-color: var(--n-color);
 color: var(--n-item-text-color);
 overflow: hidden;
 transition: background-color .3s var(--n-bezier);
 box-sizing: border-box;
 font-size: var(--n-font-size);
 padding-bottom: 6px;
 `,[P("horizontal",`
 max-width: 100%;
 width: 100%;
 display: flex;
 overflow: hidden;
 padding-bottom: 0;
 `,[h("submenu","margin: 0;"),h("menu-item","margin: 0;"),h("menu-item-content",`
 padding: 0 20px;
 border-bottom: 2px solid #0000;
 `,[C("&::before","display: none;"),P("selected","border-bottom: 2px solid var(--n-border-color-horizontal)")]),h("menu-item-content",[P("selected",[m("icon","color: var(--n-item-icon-color-active-horizontal);"),h("menu-item-content-header",`
 color: var(--n-item-text-color-active-horizontal);
 `,[C("a","color: var(--n-item-text-color-active-horizontal);"),m("extra","color: var(--n-item-text-color-active-horizontal);")])]),P("child-active",`
 border-bottom: 2px solid var(--n-border-color-horizontal);
 `,[h("menu-item-content-header",`
 color: var(--n-item-text-color-child-active-horizontal);
 `,[C("a",`
 color: var(--n-item-text-color-child-active-horizontal);
 `),m("extra",`
 color: var(--n-item-text-color-child-active-horizontal);
 `)]),m("icon",`
 color: var(--n-item-icon-color-child-active-horizontal);
 `)]),re("disabled",[re("selected, child-active",[C("&:focus-within",je)]),P("selected",[Q(null,[m("icon","color: var(--n-item-icon-color-active-hover-horizontal);"),h("menu-item-content-header",`
 color: var(--n-item-text-color-active-hover-horizontal);
 `,[C("a","color: var(--n-item-text-color-active-hover-horizontal);"),m("extra","color: var(--n-item-text-color-active-hover-horizontal);")])])]),P("child-active",[Q(null,[m("icon","color: var(--n-item-icon-color-child-active-hover-horizontal);"),h("menu-item-content-header",`
 color: var(--n-item-text-color-child-active-hover-horizontal);
 `,[C("a","color: var(--n-item-text-color-child-active-hover-horizontal);"),m("extra","color: var(--n-item-text-color-child-active-hover-horizontal);")])])]),Q("border-bottom: 2px solid var(--n-border-color-horizontal);",je)]),h("menu-item-content-header",[C("a","color: var(--n-item-text-color-horizontal);")])])]),re("responsive",[h("menu-item-content-header",`
 overflow: hidden;
 text-overflow: ellipsis;
 `)]),P("collapsed",[h("menu-item-content",[P("selected",[C("&::before",`
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
 `),P("disabled",`
 opacity: .45;
 cursor: not-allowed;
 `),P("collapsed",[m("arrow","transform: rotate(0);")]),P("selected",[C("&::before","background-color: var(--n-item-color-active);"),m("arrow","color: var(--n-arrow-color-active);"),m("icon","color: var(--n-item-icon-color-active);"),h("menu-item-content-header",`
 color: var(--n-item-text-color-active);
 `,[C("a","color: var(--n-item-text-color-active);"),m("extra","color: var(--n-item-text-color-active);")])]),P("child-active",[h("menu-item-content-header",`
 color: var(--n-item-text-color-child-active);
 `,[C("a",`
 color: var(--n-item-text-color-child-active);
 `),m("extra",`
 color: var(--n-item-text-color-child-active);
 `)]),m("arrow",`
 color: var(--n-arrow-color-child-active);
 `),m("icon",`
 color: var(--n-item-icon-color-child-active);
 `)]),re("disabled",[re("selected, child-active",[C("&:focus-within",Le)]),P("selected",[Q(null,[m("arrow","color: var(--n-arrow-color-active-hover);"),m("icon","color: var(--n-item-icon-color-active-hover);"),h("menu-item-content-header",`
 color: var(--n-item-text-color-active-hover);
 `,[C("a","color: var(--n-item-text-color-active-hover);"),m("extra","color: var(--n-item-text-color-active-hover);")])])]),P("child-active",[Q(null,[m("arrow","color: var(--n-arrow-color-child-active-hover);"),m("icon","color: var(--n-item-icon-color-child-active-hover);"),h("menu-item-content-header",`
 color: var(--n-item-text-color-child-active-hover);
 `,[C("a","color: var(--n-item-text-color-child-active-hover);"),m("extra","color: var(--n-item-text-color-child-active-hover);")])])]),P("selected",[Q(null,[C("&::before","background-color: var(--n-item-color-active-hover);")])]),Q(null,Le)]),m("icon",`
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
 `,[wo({duration:".2s"})])]),h("menu-item-group",[h("menu-item-group-title",`
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
 `)]);function Q(e,o){return[P("hover",e,o),C("&:hover",e,o)]}const Je=O({name:"MenuOptionContent",props:{collapsed:Boolean,disabled:Boolean,title:[String,Function],icon:Function,extra:[String,Function],showArrow:Boolean,childActive:Boolean,hover:Boolean,paddingLeft:Number,selected:Boolean,maxIconSize:{type:Number,required:!0},activeIconSize:{type:Number,required:!0},iconMarginRight:{type:Number,required:!0},clsPrefix:{type:String,required:!0},onClick:Function,tmNode:{type:Object,required:!0},isEllipsisPlaceholder:Boolean},setup(e){const{props:o}=W(se);return{menuProps:o,style:x(()=>{const{paddingLeft:t}=e;return{paddingLeft:t&&`${t}px`}}),iconStyle:x(()=>{const{maxIconSize:t,activeIconSize:s,iconMarginRight:r}=e;return{width:`${t}px`,height:`${t}px`,fontSize:`${s}px`,marginRight:`${r}px`}})}},render(){const{clsPrefix:e,tmNode:o,menuProps:{renderIcon:t,renderLabel:s,renderExtra:r,expandIcon:c}}=this,v=t?t(o.rawNode):oe(this.icon);return n("div",{onClick:p=>{var u;(u=this.onClick)===null||u===void 0||u.call(this,p)},role:"none",class:[`${e}-menu-item-content`,{[`${e}-menu-item-content--selected`]:this.selected,[`${e}-menu-item-content--collapsed`]:this.collapsed,[`${e}-menu-item-content--child-active`]:this.childActive,[`${e}-menu-item-content--disabled`]:this.disabled,[`${e}-menu-item-content--hover`]:this.hover}],style:this.style},v&&n("div",{class:`${e}-menu-item-content__icon`,style:this.iconStyle,role:"none"},[v]),n("div",{class:`${e}-menu-item-content-header`,role:"none"},this.isEllipsisPlaceholder?this.title:s?s(o.rawNode):oe(this.title),this.extra||r?n("span",{class:`${e}-menu-item-content-header__extra`}," ",r?r(o.rawNode):oe(this.extra)):null),this.showArrow?n(De,{ariaHidden:!0,class:`${e}-menu-item-content__arrow`,clsPrefix:e},{default:()=>c?c(o.rawNode):n(qo,null)}):null)}}),ue=8;function ze(e){const o=W(se),{props:t,mergedCollapsedRef:s}=o,r=W(Ze,null),c=W(ke,null),v=x(()=>t.mode==="horizontal"),p=x(()=>v.value?t.dropdownPlacement:"tmNodes"in e?"right-start":"right"),u=x(()=>{var b;return Math.max((b=t.collapsedIconSize)!==null&&b!==void 0?b:t.iconSize,t.iconSize)}),f=x(()=>{var b;return!v.value&&e.root&&s.value&&(b=t.collapsedIconSize)!==null&&b!==void 0?b:t.iconSize}),B=x(()=>{if(v.value)return;const{collapsedWidth:b,indent:$,rootIndent:T}=t,{root:S,isGroup:l}=e,d=T===void 0?$:T;return S?s.value?b/2-u.value/2:d:c&&typeof c.paddingLeftRef.value=="number"?$/2+c.paddingLeftRef.value:r&&typeof r.paddingLeftRef.value=="number"?(l?$/2:$)+r.paddingLeftRef.value:0}),R=x(()=>{const{collapsedWidth:b,indent:$,rootIndent:T}=t,{value:S}=u,{root:l}=e;return v.value||!l||!s.value?ue:(T===void 0?$:T)+S+ue-(b+S)/2});return{dropdownPlacement:p,activeIconSize:f,maxIconSize:u,paddingLeft:B,iconMarginRight:R,NMenu:o,NSubmenu:r,NMenuOptionGroup:c}}const _e={internalKey:{type:[String,Number],required:!0},root:Boolean,isGroup:Boolean,level:{type:Number,required:!0},title:[String,Function],extra:[String,Function]},mt=O({name:"MenuDivider",setup(){const e=W(se),{mergedClsPrefixRef:o,isHorizontalRef:t}=e;return()=>t.value?null:n("div",{class:`${o.value}-menu-divider`})}}),eo=Object.assign(Object.assign({},_e),{tmNode:{type:Object,required:!0},disabled:Boolean,icon:Function,onClick:Function}),vt=ye(eo),pt=O({name:"MenuOption",props:eo,setup(e){const o=ze(e),{NSubmenu:t,NMenu:s,NMenuOptionGroup:r}=o,{props:c,mergedClsPrefixRef:v,mergedCollapsedRef:p}=s,u=t?t.mergedDisabledRef:r?r.mergedDisabledRef:{value:!1},f=x(()=>u.value||e.disabled);function B(b){const{onClick:$}=e;$&&$(b)}function R(b){f.value||(s.doSelect(e.internalKey,e.tmNode.rawNode),B(b))}return{mergedClsPrefix:v,dropdownPlacement:o.dropdownPlacement,paddingLeft:o.paddingLeft,iconMarginRight:o.iconMarginRight,maxIconSize:o.maxIconSize,activeIconSize:o.activeIconSize,mergedTheme:s.mergedThemeRef,menuProps:c,dropdownEnabled:fe(()=>e.root&&p.value&&c.mode!=="horizontal"&&!f.value),selected:fe(()=>s.mergedValueRef.value===e.internalKey),mergedDisabled:f,handleClick:R}},render(){const{mergedClsPrefix:e,mergedTheme:o,tmNode:t,menuProps:{renderLabel:s,nodeProps:r}}=this,c=r==null?void 0:r(t.rawNode);return n("div",Object.assign({},c,{role:"menuitem",class:[`${e}-menu-item`,c==null?void 0:c.class]}),n(Ge,{theme:o.peers.Tooltip,themeOverrides:o.peerOverrides.Tooltip,trigger:"hover",placement:this.dropdownPlacement,disabled:!this.dropdownEnabled||this.title===void 0,internalExtraClass:["menu-tooltip"]},{default:()=>s?s(t.rawNode):oe(this.title),trigger:()=>n(Je,{tmNode:t,clsPrefix:e,paddingLeft:this.paddingLeft,iconMarginRight:this.iconMarginRight,maxIconSize:this.maxIconSize,activeIconSize:this.activeIconSize,selected:this.selected,title:this.title,extra:this.extra,disabled:this.mergedDisabled,icon:this.icon,onClick:this.handleClick})}))}}),oo=Object.assign(Object.assign({},_e),{tmNode:{type:Object,required:!0},tmNodes:{type:Array,required:!0}}),ft=ye(oo),gt=O({name:"MenuOptionGroup",props:oo,setup(e){const o=ze(e),{NSubmenu:t}=o,s=x(()=>t!=null&&t.mergedDisabledRef.value?!0:e.tmNode.disabled);Z(ke,{paddingLeftRef:o.paddingLeft,mergedDisabledRef:s});const{mergedClsPrefixRef:r,props:c}=W(se);return function(){const{value:v}=r,p=o.paddingLeft.value,{nodeProps:u}=c,f=u==null?void 0:u(e.tmNode.rawNode);return n("div",{class:`${v}-menu-item-group`,role:"group"},n("div",Object.assign({},f,{class:[`${v}-menu-item-group-title`,f==null?void 0:f.class],style:[(f==null?void 0:f.style)||"",p!==void 0?`padding-left: ${p}px;`:""]}),oe(e.title),e.extra?n(Ue,null," ",oe(e.extra)):null),n("div",null,e.tmNodes.map(B=>Se(B,c))))}}});function be(e){return e.type==="divider"||e.type==="render"}function bt(e){return e.type==="divider"}function Se(e,o){const{rawNode:t}=e,{show:s}=t;if(s===!1)return null;if(be(t))return bt(t)?n(mt,Object.assign({key:e.key},t.props)):null;const{labelField:r}=o,{key:c,level:v,isGroup:p}=e,u=Object.assign(Object.assign({},t),{title:t.title||t[r],extra:t.titleExtra||t.extra,key:c,internalKey:c,level:v,root:v===0,isGroup:p});return e.children?e.isGroup?n(gt,me(u,ft,{tmNode:e,tmNodes:e.children,key:c})):n(xe,me(u,xt,{key:c,rawNodes:t[o.childrenField],tmNodes:e.children,tmNode:e})):n(pt,me(u,vt,{key:c,tmNode:e}))}const to=Object.assign(Object.assign({},_e),{rawNodes:{type:Array,default:()=>[]},tmNodes:{type:Array,default:()=>[]},tmNode:{type:Object,required:!0},disabled:Boolean,icon:Function,onClick:Function,domId:String,virtualChildActive:{type:Boolean,default:void 0},isEllipsisPlaceholder:Boolean}),xt=ye(to),xe=O({name:"Submenu",props:to,setup(e){const o=ze(e),{NMenu:t,NSubmenu:s}=o,{props:r,mergedCollapsedRef:c,mergedThemeRef:v}=t,p=x(()=>{const{disabled:b}=e;return s!=null&&s.mergedDisabledRef.value||r.disabled?!0:b}),u=V(!1);Z(Ze,{paddingLeftRef:o.paddingLeft,mergedDisabledRef:p}),Z(ke,null);function f(){const{onClick:b}=e;b&&b()}function B(){p.value||(c.value||t.toggleExpand(e.internalKey),f())}function R(b){u.value=b}return{menuProps:r,mergedTheme:v,doSelect:t.doSelect,inverted:t.invertedRef,isHorizontal:t.isHorizontalRef,mergedClsPrefix:t.mergedClsPrefixRef,maxIconSize:o.maxIconSize,activeIconSize:o.activeIconSize,iconMarginRight:o.iconMarginRight,dropdownPlacement:o.dropdownPlacement,dropdownShow:u,paddingLeft:o.paddingLeft,mergedDisabled:p,mergedValue:t.mergedValueRef,childActive:fe(()=>{var b;return(b=e.virtualChildActive)!==null&&b!==void 0?b:t.activePathRef.value.includes(e.internalKey)}),collapsed:x(()=>r.mode==="horizontal"?!1:c.value?!0:!t.mergedExpandedKeysRef.value.includes(e.internalKey)),dropdownEnabled:x(()=>!p.value&&(r.mode==="horizontal"||c.value)),handlePopoverShowChange:R,handleClick:B}},render(){var e;const{mergedClsPrefix:o,menuProps:{renderIcon:t,renderLabel:s}}=this,r=()=>{const{isHorizontal:v,paddingLeft:p,collapsed:u,mergedDisabled:f,maxIconSize:B,activeIconSize:R,title:b,childActive:$,icon:T,handleClick:S,menuProps:{nodeProps:l},dropdownShow:d,iconMarginRight:F,tmNode:L,mergedClsPrefix:H,isEllipsisPlaceholder:N,extra:k}=this,z=l==null?void 0:l(L.rawNode);return n("div",Object.assign({},z,{class:[`${H}-menu-item`,z==null?void 0:z.class],role:"menuitem"}),n(Je,{tmNode:L,paddingLeft:p,collapsed:u,disabled:f,iconMarginRight:F,maxIconSize:B,activeIconSize:R,title:b,extra:k,showArrow:!v,childActive:$,clsPrefix:H,icon:T,hover:d,onClick:S,isEllipsisPlaceholder:N}))},c=()=>n(ko,null,{default:()=>{const{tmNodes:v,collapsed:p}=this;return p?null:n("div",{class:`${o}-submenu-children`,role:"menu"},v.map(u=>Se(u,this.menuProps)))}});return this.root?n(qe,Object.assign({size:"large",trigger:"hover"},(e=this.menuProps)===null||e===void 0?void 0:e.dropdownProps,{themeOverrides:this.mergedTheme.peerOverrides.Dropdown,theme:this.mergedTheme.peers.Dropdown,builtinThemeOverrides:{fontSizeLarge:"14px",optionIconSizeLarge:"18px"},value:this.mergedValue,disabled:!this.dropdownEnabled,placement:this.dropdownPlacement,keyField:this.menuProps.keyField,labelField:this.menuProps.labelField,childrenField:this.menuProps.childrenField,onUpdateShow:this.handlePopoverShowChange,options:this.rawNodes,onSelect:this.doSelect,inverted:this.inverted,renderIcon:t,renderLabel:s}),{default:()=>n("div",{class:`${o}-submenu`,role:"menu","aria-expanded":!this.collapsed,id:this.domId},r(),this.isHorizontal?null:c())}):n("div",{class:`${o}-submenu`,role:"menu","aria-expanded":!this.collapsed,id:this.domId},r(),c())}}),yt=Object.assign(Object.assign({},G.props),{options:{type:Array,default:()=>[]},collapsed:{type:Boolean,default:void 0},collapsedWidth:{type:Number,default:48},iconSize:{type:Number,default:20},collapsedIconSize:{type:Number,default:24},rootIndent:Number,indent:{type:Number,default:32},labelField:{type:String,default:"label"},keyField:{type:String,default:"key"},childrenField:{type:String,default:"children"},disabledField:{type:String,default:"disabled"},defaultExpandAll:Boolean,defaultExpandedKeys:Array,expandedKeys:Array,value:[String,Number],defaultValue:{type:[String,Number],default:null},mode:{type:String,default:"vertical"},watchProps:{type:Array,default:void 0},disabled:Boolean,show:{type:Boolean,default:!0},inverted:Boolean,"onUpdate:expandedKeys":[Function,Array],onUpdateExpandedKeys:[Function,Array],onUpdateValue:[Function,Array],"onUpdate:value":[Function,Array],expandIcon:Function,renderIcon:Function,renderLabel:Function,renderExtra:Function,dropdownProps:Object,accordion:Boolean,nodeProps:Function,dropdownPlacement:{type:String,default:"bottom"},responsive:Boolean,items:Array,onOpenNamesChange:[Function,Array],onSelect:[Function,Array],onExpandedNamesChange:[Function,Array],expandedNames:Array,defaultExpandedNames:Array}),Ct=O({name:"Menu",inheritAttrs:!1,props:yt,setup(e){const{mergedClsPrefixRef:o,inlineThemeDisabled:t}=le(e),s=G("Menu","-menu",ht,Io,e,o),r=W(We,null),c=x(()=>{var g;const{collapsed:_}=e;if(_!==void 0)return _;if(r){const{collapseModeRef:i,collapsedRef:y}=r;if(i.value==="width")return(g=y.value)!==null&&g!==void 0?g:!1}return!1}),v=x(()=>{const{keyField:g,childrenField:_,disabledField:i}=e;return ve(e.items||e.options,{getIgnored(y){return be(y)},getChildren(y){return y[_]},getDisabled(y){return y[i]},getKey(y){var A;return(A=y[g])!==null&&A!==void 0?A:y.name}})}),p=x(()=>new Set(v.value.treeNodes.map(g=>g.key))),{watchProps:u}=e,f=V(null);u!=null&&u.includes("defaultValue")?Re(()=>{f.value=e.defaultValue}):f.value=e.defaultValue;const B=ie(e,"value"),R=ge(B,f),b=V([]),$=()=>{b.value=e.defaultExpandAll?v.value.getNonLeafKeys():e.defaultExpandedNames||e.defaultExpandedKeys||v.value.getPath(R.value,{includeSelf:!1}).keyPath};u!=null&&u.includes("defaultExpandedKeys")?Re($):$();const T=Eo(e,["expandedNames","expandedKeys"]),S=ge(T,b),l=x(()=>v.value.treeNodes),d=x(()=>v.value.getPath(R.value).keyPath);Z(se,{props:e,mergedCollapsedRef:c,mergedThemeRef:s,mergedValueRef:R,mergedExpandedKeysRef:S,activePathRef:d,mergedClsPrefixRef:o,isHorizontalRef:x(()=>e.mode==="horizontal"),invertedRef:ie(e,"inverted"),doSelect:F,toggleExpand:H});function F(g,_){const{"onUpdate:value":i,onUpdateValue:y,onSelect:A}=e;y&&D(y,g,_),i&&D(i,g,_),A&&D(A,g,_),f.value=g}function L(g){const{"onUpdate:expandedKeys":_,onUpdateExpandedKeys:i,onExpandedNamesChange:y,onOpenNamesChange:A}=e;_&&D(_,g),i&&D(i,g),y&&D(y,g),A&&D(A,g),b.value=g}function H(g){const _=Array.from(S.value),i=_.findIndex(y=>y===g);if(~i)_.splice(i,1);else{if(e.accordion&&p.value.has(g)){const y=_.findIndex(A=>p.value.has(A));y>-1&&_.splice(y,1)}_.push(g)}L(_)}const N=g=>{const _=v.value.getPath(g??R.value,{includeSelf:!1}).keyPath;if(!_.length)return;const i=Array.from(S.value),y=new Set([...i,..._]);e.accordion&&p.value.forEach(A=>{y.has(A)&&!_.includes(A)&&y.delete(A)}),L(Array.from(y))},k=x(()=>{const{inverted:g}=e,{common:{cubicBezierEaseInOut:_},self:i}=s.value,{borderRadius:y,borderColorHorizontal:A,fontSize:uo,itemHeight:ho,dividerColor:mo}=i,a={"--n-divider-color":mo,"--n-bezier":_,"--n-font-size":uo,"--n-border-color-horizontal":A,"--n-border-radius":y,"--n-item-height":ho};return g?(a["--n-group-text-color"]=i.groupTextColorInverted,a["--n-color"]=i.colorInverted,a["--n-item-text-color"]=i.itemTextColorInverted,a["--n-item-text-color-hover"]=i.itemTextColorHoverInverted,a["--n-item-text-color-active"]=i.itemTextColorActiveInverted,a["--n-item-text-color-child-active"]=i.itemTextColorChildActiveInverted,a["--n-item-text-color-child-active-hover"]=i.itemTextColorChildActiveInverted,a["--n-item-text-color-active-hover"]=i.itemTextColorActiveHoverInverted,a["--n-item-icon-color"]=i.itemIconColorInverted,a["--n-item-icon-color-hover"]=i.itemIconColorHoverInverted,a["--n-item-icon-color-active"]=i.itemIconColorActiveInverted,a["--n-item-icon-color-active-hover"]=i.itemIconColorActiveHoverInverted,a["--n-item-icon-color-child-active"]=i.itemIconColorChildActiveInverted,a["--n-item-icon-color-child-active-hover"]=i.itemIconColorChildActiveHoverInverted,a["--n-item-icon-color-collapsed"]=i.itemIconColorCollapsedInverted,a["--n-item-text-color-horizontal"]=i.itemTextColorHorizontalInverted,a["--n-item-text-color-hover-horizontal"]=i.itemTextColorHoverHorizontalInverted,a["--n-item-text-color-active-horizontal"]=i.itemTextColorActiveHorizontalInverted,a["--n-item-text-color-child-active-horizontal"]=i.itemTextColorChildActiveHorizontalInverted,a["--n-item-text-color-child-active-hover-horizontal"]=i.itemTextColorChildActiveHoverHorizontalInverted,a["--n-item-text-color-active-hover-horizontal"]=i.itemTextColorActiveHoverHorizontalInverted,a["--n-item-icon-color-horizontal"]=i.itemIconColorHorizontalInverted,a["--n-item-icon-color-hover-horizontal"]=i.itemIconColorHoverHorizontalInverted,a["--n-item-icon-color-active-horizontal"]=i.itemIconColorActiveHorizontalInverted,a["--n-item-icon-color-active-hover-horizontal"]=i.itemIconColorActiveHoverHorizontalInverted,a["--n-item-icon-color-child-active-horizontal"]=i.itemIconColorChildActiveHorizontalInverted,a["--n-item-icon-color-child-active-hover-horizontal"]=i.itemIconColorChildActiveHoverHorizontalInverted,a["--n-arrow-color"]=i.arrowColorInverted,a["--n-arrow-color-hover"]=i.arrowColorHoverInverted,a["--n-arrow-color-active"]=i.arrowColorActiveInverted,a["--n-arrow-color-active-hover"]=i.arrowColorActiveHoverInverted,a["--n-arrow-color-child-active"]=i.arrowColorChildActiveInverted,a["--n-arrow-color-child-active-hover"]=i.arrowColorChildActiveHoverInverted,a["--n-item-color-hover"]=i.itemColorHoverInverted,a["--n-item-color-active"]=i.itemColorActiveInverted,a["--n-item-color-active-hover"]=i.itemColorActiveHoverInverted,a["--n-item-color-active-collapsed"]=i.itemColorActiveCollapsedInverted):(a["--n-group-text-color"]=i.groupTextColor,a["--n-color"]=i.color,a["--n-item-text-color"]=i.itemTextColor,a["--n-item-text-color-hover"]=i.itemTextColorHover,a["--n-item-text-color-active"]=i.itemTextColorActive,a["--n-item-text-color-child-active"]=i.itemTextColorChildActive,a["--n-item-text-color-child-active-hover"]=i.itemTextColorChildActiveHover,a["--n-item-text-color-active-hover"]=i.itemTextColorActiveHover,a["--n-item-icon-color"]=i.itemIconColor,a["--n-item-icon-color-hover"]=i.itemIconColorHover,a["--n-item-icon-color-active"]=i.itemIconColorActive,a["--n-item-icon-color-active-hover"]=i.itemIconColorActiveHover,a["--n-item-icon-color-child-active"]=i.itemIconColorChildActive,a["--n-item-icon-color-child-active-hover"]=i.itemIconColorChildActiveHover,a["--n-item-icon-color-collapsed"]=i.itemIconColorCollapsed,a["--n-item-text-color-horizontal"]=i.itemTextColorHorizontal,a["--n-item-text-color-hover-horizontal"]=i.itemTextColorHoverHorizontal,a["--n-item-text-color-active-horizontal"]=i.itemTextColorActiveHorizontal,a["--n-item-text-color-child-active-horizontal"]=i.itemTextColorChildActiveHorizontal,a["--n-item-text-color-child-active-hover-horizontal"]=i.itemTextColorChildActiveHoverHorizontal,a["--n-item-text-color-active-hover-horizontal"]=i.itemTextColorActiveHoverHorizontal,a["--n-item-icon-color-horizontal"]=i.itemIconColorHorizontal,a["--n-item-icon-color-hover-horizontal"]=i.itemIconColorHoverHorizontal,a["--n-item-icon-color-active-horizontal"]=i.itemIconColorActiveHorizontal,a["--n-item-icon-color-active-hover-horizontal"]=i.itemIconColorActiveHoverHorizontal,a["--n-item-icon-color-child-active-horizontal"]=i.itemIconColorChildActiveHorizontal,a["--n-item-icon-color-child-active-hover-horizontal"]=i.itemIconColorChildActiveHoverHorizontal,a["--n-arrow-color"]=i.arrowColor,a["--n-arrow-color-hover"]=i.arrowColorHover,a["--n-arrow-color-active"]=i.arrowColorActive,a["--n-arrow-color-active-hover"]=i.arrowColorActiveHover,a["--n-arrow-color-child-active"]=i.arrowColorChildActive,a["--n-arrow-color-child-active-hover"]=i.arrowColorChildActiveHover,a["--n-item-color-hover"]=i.itemColorHover,a["--n-item-color-active"]=i.itemColorActive,a["--n-item-color-active-hover"]=i.itemColorActiveHover,a["--n-item-color-active-collapsed"]=i.itemColorActiveCollapsed),a}),z=t?ae("menu",x(()=>e.inverted?"a":"b"),k,e):void 0,X=_o(),q=V(null),he=V(null);let K=!0;const Ie=()=>{var g;K?K=!1:(g=q.value)===null||g===void 0||g.sync({showAllItemsBeforeCalculate:!0})};function ro(){return document.getElementById(X)}const ce=V(-1);function no(g){ce.value=e.options.length-g}function io(g){g||(ce.value=-1)}const lo=x(()=>{const g=ce.value;return{children:g===-1?[]:e.options.slice(g)}}),ao=x(()=>{const{childrenField:g,disabledField:_,keyField:i}=e;return ve([lo.value],{getIgnored(y){return be(y)},getChildren(y){return y[g]},getDisabled(y){return y[_]},getKey(y){var A;return(A=y[i])!==null&&A!==void 0?A:y.name}})}),so=x(()=>ve([{}]).treeNodes[0]);function co(){var g;if(ce.value===-1)return n(xe,{root:!0,level:0,key:"__ellpisisGroupPlaceholder__",internalKey:"__ellpisisGroupPlaceholder__",title:"···",tmNode:so.value,domId:X,isEllipsisPlaceholder:!0});const _=ao.value.treeNodes[0],i=d.value,y=!!(!((g=_.children)===null||g===void 0)&&g.some(A=>i.includes(A.key)));return n(xe,{level:0,root:!0,key:"__ellpisisGroup__",internalKey:"__ellpisisGroup__",title:"···",virtualChildActive:y,tmNode:_,domId:X,rawNodes:_.rawNode.children||[],tmNodes:_.children||[],isEllipsisPlaceholder:!0})}return{mergedClsPrefix:o,controlledExpandedKeys:T,uncontrolledExpanededKeys:b,mergedExpandedKeys:S,uncontrolledValue:f,mergedValue:R,activePath:d,tmNodes:l,mergedTheme:s,mergedCollapsed:c,cssVars:t?void 0:k,themeClass:z==null?void 0:z.themeClass,overflowRef:q,counterRef:he,updateCounter:()=>{},onResize:Ie,onUpdateOverflow:io,onUpdateCount:no,renderCounter:co,getCounter:ro,onRender:z==null?void 0:z.onRender,showOption:N,deriveResponsiveState:Ie}},render(){const{mergedClsPrefix:e,mode:o,themeClass:t,onRender:s}=this;s==null||s();const r=()=>this.tmNodes.map(u=>Se(u,this.$props)),v=o==="horizontal"&&this.responsive,p=()=>n("div",So(this.$attrs,{role:o==="horizontal"?"menubar":"menu",class:[`${e}-menu`,t,`${e}-menu--${o}`,v&&`${e}-menu--responsive`,this.mergedCollapsed&&`${e}-menu--collapsed`],style:this.cssVars}),v?n(Mo,{ref:"overflowRef",onUpdateOverflow:this.onUpdateOverflow,getCounter:this.getCounter,onUpdateCount:this.onUpdateCount,updateCounter:this.updateCounter,style:{width:"100%",display:"flex",overflow:"hidden"}},{default:r,counter:this.renderCounter}):r());return v?n(zo,{onResize:this.onResize},{default:p}):p()}}),wt={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},kt=I("path",{d:"M32 32v432a16 16 0 0 0 16 16h432",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),zt=I("rect",{x:"96",y:"224",width:"80",height:"192",rx:"20",ry:"20",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),_t=I("rect",{x:"240",y:"176",width:"80",height:"240",rx:"20",ry:"20",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),St=I("rect",{x:"383.64",y:"112",width:"80",height:"304",rx:"20",ry:"20",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),It=[kt,zt,_t,St],Fe=O({name:"BarChartOutline",render:function(o,t){return j(),U("svg",wt,It)}}),Pt={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},Rt=I("path",{d:"M440 432H72a40 40 0 0 1-40-40V120a40 40 0 0 1 40-40h75.89a40 40 0 0 1 22.19 6.72l27.84 18.56a40 40 0 0 0 22.19 6.72H440a40 40 0 0 1 40 40v240a40 40 0 0 1-40 40z",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),Tt=I("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M32 192h448"},null,-1),Nt=[Rt,Tt],Ot=O({name:"FolderOutline",render:function(o,t){return j(),U("svg",Pt,Nt)}}),$t={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},At=I("rect",{x:"48",y:"48",width:"176",height:"176",rx:"20",ry:"20",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),Bt=I("rect",{x:"288",y:"48",width:"176",height:"176",rx:"20",ry:"20",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),Ht=I("rect",{x:"48",y:"288",width:"176",height:"176",rx:"20",ry:"20",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),Mt=I("rect",{x:"288",y:"288",width:"176",height:"176",rx:"20",ry:"20",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),Et=[At,Bt,Ht,Mt],Lt=O({name:"GridOutline",render:function(o,t){return j(),U("svg",$t,Et)}}),jt={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},Ft=I("path",{d:"M304 336v40a40 40 0 0 1-40 40H104a40 40 0 0 1-40-40V136a40 40 0 0 1 40-40h152c22.09 0 48 17.91 48 40v40",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),Kt=I("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M368 336l80-80l-80-80"},null,-1),Vt=I("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M176 256h256"},null,-1),Dt=[Ft,Kt,Vt],Ut=O({name:"LogOutOutline",render:function(o,t){return j(),U("svg",jt,Dt)}}),Gt={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},qt=I("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-miterlimit":"10","stroke-width":"32",d:"M80 160h352"},null,-1),Yt=I("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-miterlimit":"10","stroke-width":"32",d:"M80 256h352"},null,-1),Wt=I("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-miterlimit":"10","stroke-width":"32",d:"M80 352h352"},null,-1),Xt=[qt,Yt,Wt],Qt=O({name:"MenuOutline",render:function(o,t){return j(),U("svg",Gt,Xt)}}),Zt={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},Jt=I("path",{d:"M160 136c0-30.62 4.51-61.61 16-88C99.57 81.27 48 159.32 48 248c0 119.29 96.71 216 216 216c88.68 0 166.73-51.57 200-128c-26.39 11.49-57.38 16-88 16c-119.29 0-216-96.71-216-216z",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),er=[Jt],or=O({name:"MoonOutline",render:function(o,t){return j(),U("svg",Zt,er)}}),tr={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},rr=I("path",{d:"M258.9 48C141.92 46.42 46.42 141.92 48 258.9c1.56 112.19 92.91 203.54 205.1 205.1c117 1.6 212.48-93.9 210.88-210.88C462.44 140.91 371.09 49.56 258.9 48zm126.42 327.25a4 4 0 0 1-6.14-.32a124.27 124.27 0 0 0-32.35-29.59C321.37 329 289.11 320 256 320s-65.37 9-90.83 25.34a124.24 124.24 0 0 0-32.35 29.58a4 4 0 0 1-6.14.32A175.32 175.32 0 0 1 80 259c-1.63-97.31 78.22-178.76 175.57-179S432 158.81 432 256a175.32 175.32 0 0 1-46.68 119.25z",fill:"currentColor"},null,-1),nr=I("path",{d:"M256 144c-19.72 0-37.55 7.39-50.22 20.82s-19 32-17.57 51.93C191.11 256 221.52 288 256 288s64.83-32 67.79-71.24c1.48-19.74-4.8-38.14-17.68-51.82C293.39 151.44 275.59 144 256 144z",fill:"currentColor"},null,-1),ir=[rr,nr],lr=O({name:"PersonCircleOutline",render:function(o,t){return j(),U("svg",tr,ir)}}),ar={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},sr=Po('<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M256 48v48"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M256 416v48"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M403.08 108.92l-33.94 33.94"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M142.86 369.14l-33.94 33.94"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M464 256h-48"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M96 256H48"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M403.08 403.08l-33.94-33.94"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M142.86 142.86l-33.94-33.94"></path><circle cx="256" cy="256" r="80" fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32"></circle>',9),cr=[sr],dr=O({name:"SunnyOutline",render:function(o,t){return j(),U("svg",ar,cr)}}),ur={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},hr=I("path",{d:"M256 64C150 64 64 150 64 256s86 192 192 192s192-86 192-192S362 64 256 64z",fill:"none",stroke:"currentColor","stroke-miterlimit":"10","stroke-width":"32"},null,-1),mr=I("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M256 128v144h96"},null,-1),vr=[hr,mr],pr=O({name:"TimeOutline",render:function(o,t){return j(),U("svg",ur,vr)}}),fr={class:"flex items-center justify-center h-16 border-b border-gray-200/20"},gr={key:1,class:"text-xl font-bold ml-2",style:{color:"#2080F0"}},br={class:"flex items-center gap-3"},xr={class:"flex items-center gap-2.5 cursor-pointer px-3 py-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 border border-transparent hover:border-gray-200 dark:hover:border-gray-600 group"},yr={class:"flex flex-col leading-tight"},Cr={class:"text-sm font-semibold"},wr={class:"text-xs text-gray-400"},Jr=O({__name:"AdminLayout",setup(e){const o=Ho(),t=Ao(),s=Ro(),r=To(),c=x(()=>[{label:"工作台",key:"/dashboard",icon:()=>n(Lt),show:r.hasPermission("dashboard")},{label:"数据大屏",key:"/dashboard/data-screen",icon:()=>n(Fe),show:r.hasPermission("dashboard:screen")},{label:"学生管理",key:"/student",icon:()=>n(Ae),show:r.hasPermission("student:list")&&!p.value},{label:"教师管理",key:"/teacher",icon:()=>n(Fo),show:r.hasPermission("teacher:list")},{label:"班级管理",key:"/class",icon:()=>n(Be),show:r.hasPermission("class:list")},{label:"课程管理",key:"/course",icon:()=>n(He),show:r.hasPermission("course:list")},{label:"考试管理",key:"/exam",icon:()=>n(Ko),show:r.hasPermission("exam:list")},{label:"作业管理",key:"homework-group",icon:()=>n(Y),show:r.hasPermission("homework:list")&&!p.value,children:[{label:"作业管理",key:"/homework",icon:()=>n(Y),show:r.hasPermission("homework:list")},{label:"我的作业",key:"/homework/mine",icon:()=>n(Y),show:r.hasPermission("homework:list")}]},{label:"我的作业",key:"/homework/mine",icon:()=>n(Y),show:r.hasPermission("homework:list")&&p.value},{label:"课表管理",key:"/timetable",icon:()=>n(pr),show:r.hasPermission("timetable:list")},{label:"成绩管理",key:"/score",icon:()=>n(Y),show:r.hasPermission("score:list")},{label:"选科走班",key:"selection-group",icon:()=>n(He),show:["selection:list","assign-score"].some(l=>r.hasPermission(l)),children:[{label:"选科意愿",key:"/selection",icon:()=>n(ee),show:r.hasPermission("selection:list")&&(p.value||u.value)},{label:"组合统计",key:"/selection/combos",icon:()=>n(Fe),show:r.hasPermission("selection:list")&&!p.value},{label:"赋分管理",key:"/selection/assign-score",icon:()=>n(Y),show:r.hasPermission("assign-score")}]},{label:"德育管理",key:"moral-group",icon:()=>n(ee),show:["moral:list","group:list","inspection:list","redflag:list","grade:list","fiveedu:list"].some(l=>r.hasPermission(l)),children:[{label:"德育记录",key:"/moral",icon:()=>n(ee),show:r.hasPermission("moral:list")},{label:"评分规则",key:"/moral/rules",icon:()=>n(Y),show:r.hasPermission("moral:list")},{label:"小组管理",key:"/moral/groups",icon:()=>n(Ae),show:r.hasPermission("group:list")},{label:"班级检查",key:"/moral/inspections",icon:()=>n(Be),show:r.hasPermission("inspection:list")},{label:"流动红旗",key:"/moral/redflag",icon:()=>n(Vo),show:r.hasPermission("redflag:list")},{label:"年段工作",key:"/moral/grade",icon:()=>n(Do),show:r.hasPermission("grade:list")},{label:"五育综评",key:"/moral/fiveedu",icon:()=>n(ee),show:r.hasPermission("fiveedu:list")}]},{label:"AI 智能中心",key:"ai-group",icon:()=>n(ee),show:["ai","ai:chat","termcomment:list"].some(l=>r.hasPermission(l)),children:[{label:"AI 对话",key:"/ai/chat",icon:()=>n(Uo),show:r.hasPermission("ai:chat")},{label:"AI 分析",key:"/ai",icon:()=>n(ee)},{label:"学期评语",key:"/ai/term-comment",icon:()=>n(Y),show:r.hasPermission("termcomment:list")}]},{label:"公告管理",key:"/notice",icon:()=>n(Me),show:r.hasPermission("notice")},{label:"操作日志",key:"/oper-log",icon:()=>n(Y),show:r.hasPermission("system:config")},{label:"消息通知",key:"/message",icon:()=>n(Me),show:r.hasPermission("message:list")},{label:"文件管理",key:"/file",icon:()=>n(Ot),show:r.hasPermission("file:list")},{label:"系统设置",key:"/system",icon:()=>n(Go),show:r.hasPermission("system:config")}].map(l=>l.children?{...l,children:l.children.filter(d=>d.show!==!1)}:l).filter(l=>l.show!==!1)),v=x(()=>{var d;const l=(d=r.userInfo)==null?void 0:d.roles;return!l||l.length===0?"用户":l.includes("ROLE_ADMIN")?"管理员":l.includes("ROLE_TEACHER")?"教师":l.includes("ROLE_GRADE_LEADER")?"年级组长":l.includes("ROLE_STUDENT")?"学生":l[0]}),p=x(()=>r.roles.includes("ROLE_STUDENT")),u=x(()=>r.roles.includes("ROLE_ADMIN")),f=()=>s.darkMode,B=l=>({display:"flex",alignItems:"center",gap:"10px",padding:"8px 12px",borderRadius:"8px",cursor:"pointer",color:l,fontWeight:500,fontSize:"14px",transition:"all 0.15s"}),R=(l,d,F,L)=>({key:d,type:"render",render:()=>n("div",{style:B(L),onClick:()=>T(d),onMouseenter:H=>{H.currentTarget.style.background=f()?"#2a2a3e":"#f0f0f0"},onMouseleave:H=>{H.currentTarget.style.background="transparent"}},[n("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",width:"28px",height:"28px",borderRadius:"8px",background:f()?"#2a2a3e":L==="#d03050"?"#fff1f0":"#f0f5ff",fontSize:"16px",color:L}},[n(F)]),n("span",null,l)])}),b=x(()=>[{key:"header",type:"render",render:()=>{var l,d,F,L;return n("div",{style:{display:"flex",alignItems:"center",gap:"12px",padding:"12px 14px 14px",borderBottom:`1px solid ${f()?"#333":"#efefef"}`,minWidth:"200px"}},[n($e,{round:!0,size:44,src:(l=r.userInfo)==null?void 0:l.avatar,"fallback-src":`https://api.dicebear.com/7.x/avataaars/svg?seed=${(d=r.userInfo)==null?void 0:d.username}`}),n("div",{style:{lineHeight:1.4}},[n("div",{style:{fontWeight:600,fontSize:"15px",color:f()?"#e0e0e0":"#333"}},((F=r.userInfo)==null?void 0:F.realName)||((L=r.userInfo)==null?void 0:L.username)),n("div",{style:{fontSize:"12px",opacity:.5,marginTop:"1px",color:f()?"#aaa":"#666"}},v.value)])])}},{type:"divider",key:"d1",style:{margin:"4px 0"}},R("个人信息","profile",lr,"#2080f0"),{type:"divider",key:"d2",style:{margin:"4px 0"}},R("退出登录","logout",Ut,"#d03050")]),$=l=>{o.push(l)},T=l=>{l==="profile"?o.push("/profile"):l==="logout"&&(r.logout(),o.push("/login"))},S=x(()=>{const l=t.path,d=[{label:"首页",key:"/dashboard"}];if(l.includes("student"))d.push({label:"学生管理",key:"student"});else if(l.includes("teacher"))d.push({label:"教师管理",key:"teacher"});else if(l.includes("class"))d.push({label:"班级管理",key:"class"});else if(l.includes("course"))d.push({label:"课程管理",key:"course"});else if(l.includes("exam"))d.push({label:"考试管理",key:"exam"});else if(l.includes("selection"))d.push({label:"选科走班",key:"selection"}),l.includes("combos")?d.push({label:"组合统计",key:l}):l.includes("assign-score")?d.push({label:"赋分管理",key:l}):d.push({label:"选科意愿",key:l});else if(l.includes("score"))d.push({label:"成绩管理",key:"score"});else if(l.includes("homework"))l.includes("mine")?d.push({label:"我的作业",key:l}):d.push({label:"作业管理",key:l});else if(l.includes("timetable"))d.push({label:"课表管理",key:l});else if(l.includes("moral")){d.push({label:"德育管理",key:"moral"});const F={"/moral/rules":"评分规则","/moral/groups":"小组管理","/moral/inspections":"班级检查","/moral/redflag":"流动红旗","/moral/grade":"年段工作","/moral/fiveedu":"五育综评"};F[l]&&d.push({label:F[l],key:l})}else l.includes("ai/chat")?d.push({label:"AI 对话",key:"ai-chat"}):l.includes("ai/term-comment")?d.push({label:"学期评语",key:"ai-term-comment"}):l.includes("ai")?d.push({label:"AI 智能中心",key:"ai"}):l.includes("notice")?d.push({label:"公告管理",key:"notice"}):l.includes("oper-log")?d.push({label:"操作日志",key:"oper-log"}):l.includes("message")?d.push({label:"消息通知",key:"message"}):l.includes("profile")?d.push({label:"个人中心",key:"profile"}):l.includes("file")?d.push({label:"文件管理",key:"file"}):l.includes("system")?d.push({label:"系统设置",key:"system"}):l.includes("data-screen")&&d.push({label:"数据大屏",key:"data-screen"});return d});return(l,d)=>{const F=Jo,L=Bo("router-view");return j(),J(w(Ee),{position:"absolute","has-sider":""},{default:E(()=>[M(w(ut),{collapsed:w(s).collapsed,"collapse-mode":"width","collapsed-width":64,width:176,"native-scrollbar":!1,bordered:"",style:{background:"var(--n-color)"}},{default:E(()=>[I("div",fr,[w(s).collapsed?No("",!0):(j(),J(w(ne),{key:0,size:"28",color:"#2080F0"},{default:E(()=>[M(w(Oe))]),_:1})),w(s).collapsed?(j(),J(w(ne),{key:2,size:"24",color:"#2080F0"},{default:E(()=>[M(w(Oe))]),_:1})):(j(),U("span",gr,"智慧学生管理"))]),M(w(Ct),{options:c.value,collapsed:w(s).collapsed,"collapsed-width":64,"collapsed-icon-size":22,value:w(t).path,"onUpdate:value":$},null,8,["options","collapsed","value"])]),_:1},8,["collapsed"]),M(w(Ee),null,{default:E(()=>[M(w(lt),{bordered:"",class:"h-16 flex items-center justify-between px-4"},{default:E(()=>[I("div",br,[M(w(Te),{tertiary:"",circle:"",onClick:w(s).toggleCollapsed},{icon:E(()=>[M(w(ne),null,{default:E(()=>[M(w(Qt))]),_:1})]),_:1},8,["onClick"]),M(w(Xo),null,{default:E(()=>[(j(!0),U(Ue,null,Oo(S.value,H=>(j(),J(F,{key:H.key},{default:E(()=>[Ne(de(H.label),1)]),_:2},1024))),128))]),_:1})]),M(w(jo),{align:"center",size:"large"},{default:E(()=>[M(w(Ge),{trigger:"hover"},{trigger:E(()=>[M(w(Te),{tertiary:"",circle:"",onClick:w(s).toggleDark},{icon:E(()=>[M(w(ne),null,{default:E(()=>[w(s).darkMode?(j(),J(w(dr),{key:1})):(j(),J(w(or),{key:0}))]),_:1})]),_:1},8,["onClick"])]),default:E(()=>[Ne(" "+de(w(s).darkMode?"浅色模式":"深色模式"),1)]),_:1}),M(w(qe),{options:b.value,onSelect:T,placement:"bottom-end",trigger:"click"},{default:E(()=>{var H,N,k,z;return[I("div",xr,[M(w($e),{src:(H=w(r).userInfo)==null?void 0:H.avatar,round:"",size:"small","fallback-src":`https://api.dicebear.com/7.x/avataaars/svg?seed=${(N=w(r).userInfo)==null?void 0:N.username}`,class:"ring-2 ring-transparent group-hover:ring-blue-400 transition-all duration-200"},null,8,["src","fallback-src"]),I("div",yr,[I("span",Cr,de(((k=w(r).userInfo)==null?void 0:k.realName)||((z=w(r).userInfo)==null?void 0:z.username)),1),I("span",wr,de(v.value),1)]),M(w(ne),{size:"14",color:"#999",class:"ml-0.5 transition-transform duration-200 group-hover:rotate-180"},{default:E(()=>[...d[0]||(d[0]=[I("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[I("polyline",{points:"6 9 12 15 18 9"})],-1)])]),_:1})])]}),_:1},8,["options"])]),_:1})]),_:1}),M(w(rt),{"native-scrollbar":!1,class:"p-6",style:$o({minHeight:"calc(100vh - 64px)",background:w(s).darkMode?"#1a1a2e":"#f5f7fa"})},{default:E(()=>[M(L)]),_:1},8,["style"])]),_:1})]),_:1})}}});export{Jr as default};
