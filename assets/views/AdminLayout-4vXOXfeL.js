import{ao as A,aS as i,H as h,G as C,O as R,K as m,cs as ie,cF as U,cG as le,w as ho,a7 as x,af as ee,bQ as Q,ck as ne,bV as K,bG as mo,bH as vo,b4 as po,c3 as fo,aX as Y,aj as go,c9 as bo,aq as xo,a6 as Re,S as je,cz as Fe,d as Ke,Q as D,P as oe,aD as yo,bW as J,bj as ye,cx as fe,b as Ve,bi as me,g as Co,V as wo,cL as Pe,ae as ko,bm as zo,bl as _o,bI as E,ad as G,aa as P,ah as So,cH as Io,cr as Ro,ab as Z,cM as M,cp as w,ak as H,ac as Po,B as Ne,bX as No,ai as Te,cj as ce,by as To,cA as Oo,c1 as $o,cB as Ao}from"../index-CbGdLzDn.js";import{S as Oe}from"../icons/SchoolSharp-B0Z8MXEW.js";import{N as De}from"../components/Tooltip-DS8TJWY6.js";import{N as Ue}from"../components/Dropdown-RI8BgRsO.js";import{u as ge}from"../shared/use-merged-state-Dx0cecVT.js";import{V as Bo,a as ve}from"../shared/create-BpDegLUA.js";import{u as Ho}from"../components/Tag-CVfJIDNY.js";import{C as Mo}from"../icons/ChevronRight-D8x2eX3I.js";import{f as pe}from"../shared/format-length-B-p6aW7q.js";import{N as Eo}from"../components/Space-Bt5yF8Rb.js";import{N as $e}from"../components/Avatar-CuElldSY.js";import{P as Ae}from"../icons/PeopleOutline-BNh6xPgG.js";import{P as Lo}from"../icons/PersonOutline-DCp330GD.js";import{S as Be}from"../icons/SchoolOutline-BkHDFwCB.js";import{B as jo}from"../icons/BookOutline-DrWtGI75.js";import{C as Fo}from"../icons/CalendarOutline-C0HbanC5.js";import{D as de,C as Ko}from"../icons/DocumentTextOutline-C6L88O4n.js";import{S as te}from"../icons/SparklesOutline-DMF4ErcU.js";import{F as Vo}from"../icons/FlagOutline-Kmz-3tSO.js";import{R as Do}from"../icons/RocketOutline-CgXkd3gY.js";import{N as He}from"../icons/NotificationsOutline-BeK6BrHv.js";import{S as Uo}from"../icons/SettingsOutline-BnyM6rTG.js";import{N as re}from"../components/Icon-dLEsHIkO.js";import"../components/Popover-DB3OkIZH.js";import"../shared/get-j2FYCKlf.js";import"../components/next-frame-once-C5Ksf8W7.js";import"../shared/happens-in-CM8LO42l.js";import"../components/get-slot-Bk_rJcZu.js";import"../shared/utils-Dpoooess.js";const Go=A({name:"ChevronDownFilled",render(){return i("svg",{viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg"},i("path",{d:"M3.20041 5.73966C3.48226 5.43613 3.95681 5.41856 4.26034 5.70041L8 9.22652L11.7397 5.70041C12.0432 5.41856 12.5177 5.43613 12.7996 5.73966C13.0815 6.0432 13.0639 6.51775 12.7603 6.7996L8.51034 10.7996C8.22258 11.0668 7.77743 11.0668 7.48967 10.7996L3.23966 6.7996C2.93613 6.51775 2.91856 6.0432 3.20041 5.73966Z",fill:"currentColor"}))}}),qo=h("breadcrumb",`
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
 `)])])]),Ge=ee("n-breadcrumb"),Yo=Object.assign(Object.assign({},U.props),{separator:{type:String,default:"/"}}),Wo=A({name:"Breadcrumb",props:Yo,setup(e){const{mergedClsPrefixRef:o,inlineThemeDisabled:t}=ie(e),s=U("Breadcrumb","-breadcrumb",qo,ho,e,o);Q(Ge,{separatorRef:ne(e,"separator"),mergedClsPrefixRef:o});const n=x(()=>{const{common:{cubicBezierEaseInOut:v},self:{separatorColor:p,itemTextColor:u,itemTextColorHover:f,itemTextColorPressed:B,itemTextColorActive:N,fontSize:g,fontWeightActive:O,itemBorderRadius:l,itemColorHover:d,itemColorPressed:k,itemLineHeight:_}}=s.value;return{"--n-font-size":g,"--n-bezier":v,"--n-item-text-color":u,"--n-item-text-color-hover":f,"--n-item-text-color-pressed":B,"--n-item-text-color-active":N,"--n-separator-color":p,"--n-item-color-hover":d,"--n-item-color-pressed":k,"--n-item-border-radius":l,"--n-font-weight-active":O,"--n-item-line-height":_}}),c=t?le("breadcrumb",void 0,n,e):void 0;return{mergedClsPrefix:o,cssVars:t?void 0:n,themeClass:c==null?void 0:c.themeClass,onRender:c==null?void 0:c.onRender}},render(){var e;return(e=this.onRender)===null||e===void 0||e.call(this),i("nav",{class:[`${this.mergedClsPrefix}-breadcrumb`,this.themeClass],style:this.cssVars,"aria-label":"Breadcrumb"},i("ul",null,this.$slots))}});function Xo(e=po?window:null){const o=()=>{const{hash:n,host:c,hostname:v,href:p,origin:u,pathname:f,port:B,protocol:N,search:g}=(e==null?void 0:e.location)||{};return{hash:n,host:c,hostname:v,href:p,origin:u,pathname:f,port:B,protocol:N,search:g}},t=K(o()),s=()=>{t.value=o()};return mo(()=>{e&&(e.addEventListener("popstate",s),e.addEventListener("hashchange",s))}),vo(()=>{e&&(e.removeEventListener("popstate",s),e.removeEventListener("hashchange",s))}),t}const Qo={separator:String,href:String,clickable:{type:Boolean,default:!0},showSeparator:{type:Boolean,default:!0},onClick:Function},Zo=A({name:"BreadcrumbItem",props:Qo,slots:Object,setup(e,{slots:o}){const t=Y(Ge,null);if(!t)return()=>null;const{separatorRef:s,mergedClsPrefixRef:n}=t,c=Xo(),v=x(()=>e.href?"a":"span"),p=x(()=>c.value.href===e.href?"location":null);return()=>{const{value:u}=n;return i("li",{class:[`${u}-breadcrumb-item`,e.clickable&&`${u}-breadcrumb-item--clickable`]},i(v.value,{class:`${u}-breadcrumb-item__link`,"aria-current":p.value,href:e.href,onClick:e.onClick},o),e.showSeparator&&i("span",{class:`${u}-breadcrumb-item__separator`,"aria-hidden":"true"},fo(o.separator,()=>{var f;return[(f=e.separator)!==null&&f!==void 0?f:s.value]})))}}});function Jo(e){const{baseColor:o,textColor2:t,bodyColor:s,cardColor:n,dividerColor:c,actionColor:v,scrollbarColor:p,scrollbarColorHover:u,invertedColor:f}=e;return{textColor:t,textColorInverted:"#FFF",color:s,colorEmbedded:v,headerColor:n,headerColorInverted:f,footerColor:v,footerColorInverted:f,headerBorderColor:c,headerBorderColorInverted:f,footerBorderColor:c,footerBorderColorInverted:f,siderBorderColor:c,siderBorderColorInverted:f,siderColor:n,siderColorInverted:f,siderToggleButtonBorder:`1px solid ${c}`,siderToggleButtonColor:o,siderToggleButtonIconColor:t,siderToggleButtonIconColorInverted:t,siderToggleBarColor:Re(s,p),siderToggleBarColorHover:Re(s,u),__invertScrollbar:"true"}}const Ce=go({name:"Layout",common:xo,peers:{Scrollbar:bo},self:Jo}),qe=ee("n-layout-sider"),we={type:String,default:"static"},et=h("layout",`
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
 `)]),ot={embedded:Boolean,position:we,nativeScrollbar:{type:Boolean,default:!0},scrollbarProps:Object,onScroll:Function,contentClass:String,contentStyle:{type:[String,Object],default:""},hasSider:Boolean,siderPlacement:{type:String,default:"left"}},Ye=ee("n-layout");function We(e){return A({name:e?"LayoutContent":"Layout",props:Object.assign(Object.assign({},U.props),ot),setup(o){const t=K(null),s=K(null),{mergedClsPrefixRef:n,inlineThemeDisabled:c}=ie(o),v=U("Layout","-layout",et,Ce,o,n);function p(d,k){if(o.nativeScrollbar){const{value:_}=t;_&&(k===void 0?_.scrollTo(d):_.scrollTo(d,k))}else{const{value:_}=s;_&&_.scrollTo(d,k)}}Q(Ye,o);let u=0,f=0;const B=d=>{var k;const _=d.target;u=_.scrollLeft,f=_.scrollTop,(k=o.onScroll)===null||k===void 0||k.call(o,d)};Fe(()=>{if(o.nativeScrollbar){const d=t.value;d&&(d.scrollTop=f,d.scrollLeft=u)}});const N={display:"flex",flexWrap:"nowrap",width:"100%",flexDirection:"row"},g={scrollTo:p},O=x(()=>{const{common:{cubicBezierEaseInOut:d},self:k}=v.value;return{"--n-bezier":d,"--n-color":o.embedded?k.colorEmbedded:k.color,"--n-text-color":k.textColor}}),l=c?le("layout",x(()=>o.embedded?"e":""),O,o):void 0;return Object.assign({mergedClsPrefix:n,scrollableElRef:t,scrollbarInstRef:s,hasSiderStyle:N,mergedTheme:v,handleNativeElScroll:B,cssVars:c?void 0:O,themeClass:l==null?void 0:l.themeClass,onRender:l==null?void 0:l.onRender},g)},render(){var o;const{mergedClsPrefix:t,hasSider:s}=this;(o=this.onRender)===null||o===void 0||o.call(this);const n=s?this.hasSiderStyle:void 0,c=[this.themeClass,e&&`${t}-layout-content`,`${t}-layout`,`${t}-layout--${this.position}-positioned`];return i("div",{class:c,style:this.cssVars},this.nativeScrollbar?i("div",{ref:"scrollableElRef",class:[`${t}-layout-scroll-container`,this.contentClass],style:[this.contentStyle,n],onScroll:this.handleNativeElScroll},this.$slots):i(je,Object.assign({},this.scrollbarProps,{onScroll:this.onScroll,ref:"scrollbarInstRef",theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,contentClass:this.contentClass,contentStyle:[this.contentStyle,n]}),this.$slots))}})}const Me=We(!1),tt=We(!0),rt=h("layout-header",`
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
 `)]),nt={position:we,inverted:Boolean,bordered:{type:Boolean,default:!1}},it=A({name:"LayoutHeader",props:Object.assign(Object.assign({},U.props),nt),setup(e){const{mergedClsPrefixRef:o,inlineThemeDisabled:t}=ie(e),s=U("Layout","-layout-header",rt,Ce,e,o),n=x(()=>{const{common:{cubicBezierEaseInOut:v},self:p}=s.value,u={"--n-bezier":v};return e.inverted?(u["--n-color"]=p.headerColorInverted,u["--n-text-color"]=p.textColorInverted,u["--n-border-color"]=p.headerBorderColorInverted):(u["--n-color"]=p.headerColor,u["--n-text-color"]=p.textColor,u["--n-border-color"]=p.headerBorderColor),u}),c=t?le("layout-header",x(()=>e.inverted?"a":"b"),n,e):void 0;return{mergedClsPrefix:o,cssVars:t?void 0:n,themeClass:c==null?void 0:c.themeClass,onRender:c==null?void 0:c.onRender}},render(){var e;const{mergedClsPrefix:o}=this;return(e=this.onRender)===null||e===void 0||e.call(this),i("div",{class:[`${o}-layout-header`,this.themeClass,this.position&&`${o}-layout-header--${this.position}-positioned`,this.bordered&&`${o}-layout-header--bordered`],style:this.cssVars},this.$slots)}}),lt=h("layout-sider",`
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
 `)]),at=A({props:{clsPrefix:{type:String,required:!0},onClick:Function},render(){const{clsPrefix:e}=this;return i("div",{onClick:this.onClick,class:`${e}-layout-toggle-bar`},i("div",{class:`${e}-layout-toggle-bar__top`}),i("div",{class:`${e}-layout-toggle-bar__bottom`}))}}),st=A({name:"LayoutToggleButton",props:{clsPrefix:{type:String,required:!0},onClick:Function},render(){const{clsPrefix:e}=this;return i("div",{class:`${e}-layout-toggle-button`,onClick:this.onClick},i(Ke,{clsPrefix:e},{default:()=>i(Mo,null)}))}}),ct={position:we,bordered:Boolean,collapsedWidth:{type:Number,default:48},width:{type:[Number,String],default:272},contentClass:String,contentStyle:{type:[String,Object],default:""},collapseMode:{type:String,default:"transform"},collapsed:{type:Boolean,default:void 0},defaultCollapsed:Boolean,showCollapsedContent:{type:Boolean,default:!0},showTrigger:{type:[Boolean,String],default:!1},nativeScrollbar:{type:Boolean,default:!0},inverted:Boolean,scrollbarProps:Object,triggerClass:String,triggerStyle:[String,Object],collapsedTriggerClass:String,collapsedTriggerStyle:[String,Object],"onUpdate:collapsed":[Function,Array],onUpdateCollapsed:[Function,Array],onAfterEnter:Function,onAfterLeave:Function,onExpand:[Function,Array],onCollapse:[Function,Array],onScroll:Function},dt=A({name:"LayoutSider",props:Object.assign(Object.assign({},U.props),ct),setup(e){const o=Y(Ye),t=K(null),s=K(null),n=K(e.defaultCollapsed),c=ge(ne(e,"collapsed"),n),v=x(()=>pe(c.value?e.collapsedWidth:e.width)),p=x(()=>e.collapseMode!=="transform"?{}:{minWidth:pe(e.width)}),u=x(()=>o?o.siderPlacement:"left");function f(T,S){if(e.nativeScrollbar){const{value:I}=t;I&&(S===void 0?I.scrollTo(T):I.scrollTo(T,S))}else{const{value:I}=s;I&&I.scrollTo(T,S)}}function B(){const{"onUpdate:collapsed":T,onUpdateCollapsed:S,onExpand:I,onCollapse:W}=e,{value:q}=c;S&&D(S,!q),T&&D(T,!q),n.value=!q,q?I&&D(I):W&&D(W)}let N=0,g=0;const O=T=>{var S;const I=T.target;N=I.scrollLeft,g=I.scrollTop,(S=e.onScroll)===null||S===void 0||S.call(e,T)};Fe(()=>{if(e.nativeScrollbar){const T=t.value;T&&(T.scrollTop=g,T.scrollLeft=N)}}),Q(qe,{collapsedRef:c,collapseModeRef:ne(e,"collapseMode")});const{mergedClsPrefixRef:l,inlineThemeDisabled:d}=ie(e),k=U("Layout","-layout-sider",lt,Ce,e,l);function _(T){var S,I;T.propertyName==="max-width"&&(c.value?(S=e.onAfterLeave)===null||S===void 0||S.call(e):(I=e.onAfterEnter)===null||I===void 0||I.call(e))}const L={scrollTo:f},V=x(()=>{const{common:{cubicBezierEaseInOut:T},self:S}=k.value,{siderToggleButtonColor:I,siderToggleButtonBorder:W,siderToggleBarColor:q,siderToggleBarColorHover:he}=S,F={"--n-bezier":T,"--n-toggle-button-color":I,"--n-toggle-button-border":W,"--n-toggle-bar-color":q,"--n-toggle-bar-color-hover":he};return e.inverted?(F["--n-color"]=S.siderColorInverted,F["--n-text-color"]=S.textColorInverted,F["--n-border-color"]=S.siderBorderColorInverted,F["--n-toggle-button-icon-color"]=S.siderToggleButtonIconColorInverted,F.__invertScrollbar=S.__invertScrollbar):(F["--n-color"]=S.siderColor,F["--n-text-color"]=S.textColor,F["--n-border-color"]=S.siderBorderColor,F["--n-toggle-button-icon-color"]=S.siderToggleButtonIconColor),F}),j=d?le("layout-sider",x(()=>e.inverted?"a":"b"),V,e):void 0;return Object.assign({scrollableElRef:t,scrollbarInstRef:s,mergedClsPrefix:l,mergedTheme:k,styleMaxWidth:v,mergedCollapsed:c,scrollContainerStyle:p,siderPlacement:u,handleNativeElScroll:O,handleTransitionend:_,handleTriggerClick:B,inlineThemeDisabled:d,cssVars:V,themeClass:j==null?void 0:j.themeClass,onRender:j==null?void 0:j.onRender},L)},render(){var e;const{mergedClsPrefix:o,mergedCollapsed:t,showTrigger:s}=this;return(e=this.onRender)===null||e===void 0||e.call(this),i("aside",{class:[`${o}-layout-sider`,this.themeClass,`${o}-layout-sider--${this.position}-positioned`,`${o}-layout-sider--${this.siderPlacement}-placement`,this.bordered&&`${o}-layout-sider--bordered`,t&&`${o}-layout-sider--collapsed`,(!t||this.showCollapsedContent)&&`${o}-layout-sider--show-content`],onTransitionend:this.handleTransitionend,style:[this.inlineThemeDisabled?void 0:this.cssVars,{maxWidth:this.styleMaxWidth,width:pe(this.width)}]},this.nativeScrollbar?i("div",{class:[`${o}-layout-sider-scroll-container`,this.contentClass],onScroll:this.handleNativeElScroll,style:[this.scrollContainerStyle,{overflow:"auto"},this.contentStyle],ref:"scrollableElRef"},this.$slots):i(je,Object.assign({},this.scrollbarProps,{onScroll:this.onScroll,ref:"scrollbarInstRef",style:this.scrollContainerStyle,contentStyle:this.contentStyle,contentClass:this.contentClass,theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,builtinThemeOverrides:this.inverted&&this.cssVars.__invertScrollbar==="true"?{colorHover:"rgba(255, 255, 255, .4)",color:"rgba(255, 255, 255, .3)"}:void 0}),this.$slots),s?s==="bar"?i(at,{clsPrefix:o,class:t?this.collapsedTriggerClass:this.triggerClass,style:t?this.collapsedTriggerStyle:this.triggerStyle,onClick:this.handleTriggerClick}):i(st,{clsPrefix:o,class:t?this.collapsedTriggerClass:this.triggerClass,style:t?this.collapsedTriggerStyle:this.triggerStyle,onClick:this.handleTriggerClick}):null,this.bordered?i("div",{class:`${o}-layout-sider__border`}):null)}}),ae=ee("n-menu"),Xe=ee("n-submenu"),ke=ee("n-menu-item-group"),Ee=[C("&::before","background-color: var(--n-item-color-hover);"),m("arrow",`
 color: var(--n-arrow-color-hover);
 `),m("icon",`
 color: var(--n-item-icon-color-hover);
 `),h("menu-item-content-header",`
 color: var(--n-item-text-color-hover);
 `,[C("a",`
 color: var(--n-item-text-color-hover);
 `),m("extra",`
 color: var(--n-item-text-color-hover);
 `)])],Le=[m("icon",`
 color: var(--n-item-icon-color-hover-horizontal);
 `),h("menu-item-content-header",`
 color: var(--n-item-text-color-hover-horizontal);
 `,[C("a",`
 color: var(--n-item-text-color-hover-horizontal);
 `),m("extra",`
 color: var(--n-item-text-color-hover-horizontal);
 `)])],ut=C([h("menu",`
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
 `)]),oe("disabled",[oe("selected, child-active",[C("&:focus-within",Le)]),R("selected",[X(null,[m("icon","color: var(--n-item-icon-color-active-hover-horizontal);"),h("menu-item-content-header",`
 color: var(--n-item-text-color-active-hover-horizontal);
 `,[C("a","color: var(--n-item-text-color-active-hover-horizontal);"),m("extra","color: var(--n-item-text-color-active-hover-horizontal);")])])]),R("child-active",[X(null,[m("icon","color: var(--n-item-icon-color-child-active-hover-horizontal);"),h("menu-item-content-header",`
 color: var(--n-item-text-color-child-active-hover-horizontal);
 `,[C("a","color: var(--n-item-text-color-child-active-hover-horizontal);"),m("extra","color: var(--n-item-text-color-child-active-hover-horizontal);")])])]),X("border-bottom: 2px solid var(--n-border-color-horizontal);",Le)]),h("menu-item-content-header",[C("a","color: var(--n-item-text-color-horizontal);")])])]),oe("responsive",[h("menu-item-content-header",`
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
 `)]),oe("disabled",[oe("selected, child-active",[C("&:focus-within",Ee)]),R("selected",[X(null,[m("arrow","color: var(--n-arrow-color-active-hover);"),m("icon","color: var(--n-item-icon-color-active-hover);"),h("menu-item-content-header",`
 color: var(--n-item-text-color-active-hover);
 `,[C("a","color: var(--n-item-text-color-active-hover);"),m("extra","color: var(--n-item-text-color-active-hover);")])])]),R("child-active",[X(null,[m("arrow","color: var(--n-arrow-color-child-active-hover);"),m("icon","color: var(--n-item-icon-color-child-active-hover);"),h("menu-item-content-header",`
 color: var(--n-item-text-color-child-active-hover);
 `,[C("a","color: var(--n-item-text-color-child-active-hover);"),m("extra","color: var(--n-item-text-color-child-active-hover);")])])]),R("selected",[X(null,[C("&::before","background-color: var(--n-item-color-active-hover);")])]),X(null,Ee)]),m("icon",`
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
 `,[yo({duration:".2s"})])]),h("menu-item-group",[h("menu-item-group-title",`
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
 `)]);function X(e,o){return[R("hover",e,o),C("&:hover",e,o)]}const Qe=A({name:"MenuOptionContent",props:{collapsed:Boolean,disabled:Boolean,title:[String,Function],icon:Function,extra:[String,Function],showArrow:Boolean,childActive:Boolean,hover:Boolean,paddingLeft:Number,selected:Boolean,maxIconSize:{type:Number,required:!0},activeIconSize:{type:Number,required:!0},iconMarginRight:{type:Number,required:!0},clsPrefix:{type:String,required:!0},onClick:Function,tmNode:{type:Object,required:!0},isEllipsisPlaceholder:Boolean},setup(e){const{props:o}=Y(ae);return{menuProps:o,style:x(()=>{const{paddingLeft:t}=e;return{paddingLeft:t&&`${t}px`}}),iconStyle:x(()=>{const{maxIconSize:t,activeIconSize:s,iconMarginRight:n}=e;return{width:`${t}px`,height:`${t}px`,fontSize:`${s}px`,marginRight:`${n}px`}})}},render(){const{clsPrefix:e,tmNode:o,menuProps:{renderIcon:t,renderLabel:s,renderExtra:n,expandIcon:c}}=this,v=t?t(o.rawNode):J(this.icon);return i("div",{onClick:p=>{var u;(u=this.onClick)===null||u===void 0||u.call(this,p)},role:"none",class:[`${e}-menu-item-content`,{[`${e}-menu-item-content--selected`]:this.selected,[`${e}-menu-item-content--collapsed`]:this.collapsed,[`${e}-menu-item-content--child-active`]:this.childActive,[`${e}-menu-item-content--disabled`]:this.disabled,[`${e}-menu-item-content--hover`]:this.hover}],style:this.style},v&&i("div",{class:`${e}-menu-item-content__icon`,style:this.iconStyle,role:"none"},[v]),i("div",{class:`${e}-menu-item-content-header`,role:"none"},this.isEllipsisPlaceholder?this.title:s?s(o.rawNode):J(this.title),this.extra||n?i("span",{class:`${e}-menu-item-content-header__extra`}," ",n?n(o.rawNode):J(this.extra)):null),this.showArrow?i(Ke,{ariaHidden:!0,class:`${e}-menu-item-content__arrow`,clsPrefix:e},{default:()=>c?c(o.rawNode):i(Go,null)}):null)}}),ue=8;function ze(e){const o=Y(ae),{props:t,mergedCollapsedRef:s}=o,n=Y(Xe,null),c=Y(ke,null),v=x(()=>t.mode==="horizontal"),p=x(()=>v.value?t.dropdownPlacement:"tmNodes"in e?"right-start":"right"),u=x(()=>{var g;return Math.max((g=t.collapsedIconSize)!==null&&g!==void 0?g:t.iconSize,t.iconSize)}),f=x(()=>{var g;return!v.value&&e.root&&s.value&&(g=t.collapsedIconSize)!==null&&g!==void 0?g:t.iconSize}),B=x(()=>{if(v.value)return;const{collapsedWidth:g,indent:O,rootIndent:l}=t,{root:d,isGroup:k}=e,_=l===void 0?O:l;return d?s.value?g/2-u.value/2:_:c&&typeof c.paddingLeftRef.value=="number"?O/2+c.paddingLeftRef.value:n&&typeof n.paddingLeftRef.value=="number"?(k?O/2:O)+n.paddingLeftRef.value:0}),N=x(()=>{const{collapsedWidth:g,indent:O,rootIndent:l}=t,{value:d}=u,{root:k}=e;return v.value||!k||!s.value?ue:(l===void 0?O:l)+d+ue-(g+d)/2});return{dropdownPlacement:p,activeIconSize:f,maxIconSize:u,paddingLeft:B,iconMarginRight:N,NMenu:o,NSubmenu:n,NMenuOptionGroup:c}}const _e={internalKey:{type:[String,Number],required:!0},root:Boolean,isGroup:Boolean,level:{type:Number,required:!0},title:[String,Function],extra:[String,Function]},ht=A({name:"MenuDivider",setup(){const e=Y(ae),{mergedClsPrefixRef:o,isHorizontalRef:t}=e;return()=>t.value?null:i("div",{class:`${o.value}-menu-divider`})}}),Ze=Object.assign(Object.assign({},_e),{tmNode:{type:Object,required:!0},disabled:Boolean,icon:Function,onClick:Function}),mt=ye(Ze),vt=A({name:"MenuOption",props:Ze,setup(e){const o=ze(e),{NSubmenu:t,NMenu:s,NMenuOptionGroup:n}=o,{props:c,mergedClsPrefixRef:v,mergedCollapsedRef:p}=s,u=t?t.mergedDisabledRef:n?n.mergedDisabledRef:{value:!1},f=x(()=>u.value||e.disabled);function B(g){const{onClick:O}=e;O&&O(g)}function N(g){f.value||(s.doSelect(e.internalKey,e.tmNode.rawNode),B(g))}return{mergedClsPrefix:v,dropdownPlacement:o.dropdownPlacement,paddingLeft:o.paddingLeft,iconMarginRight:o.iconMarginRight,maxIconSize:o.maxIconSize,activeIconSize:o.activeIconSize,mergedTheme:s.mergedThemeRef,menuProps:c,dropdownEnabled:fe(()=>e.root&&p.value&&c.mode!=="horizontal"&&!f.value),selected:fe(()=>s.mergedValueRef.value===e.internalKey),mergedDisabled:f,handleClick:N}},render(){const{mergedClsPrefix:e,mergedTheme:o,tmNode:t,menuProps:{renderLabel:s,nodeProps:n}}=this,c=n==null?void 0:n(t.rawNode);return i("div",Object.assign({},c,{role:"menuitem",class:[`${e}-menu-item`,c==null?void 0:c.class]}),i(De,{theme:o.peers.Tooltip,themeOverrides:o.peerOverrides.Tooltip,trigger:"hover",placement:this.dropdownPlacement,disabled:!this.dropdownEnabled||this.title===void 0,internalExtraClass:["menu-tooltip"]},{default:()=>s?s(t.rawNode):J(this.title),trigger:()=>i(Qe,{tmNode:t,clsPrefix:e,paddingLeft:this.paddingLeft,iconMarginRight:this.iconMarginRight,maxIconSize:this.maxIconSize,activeIconSize:this.activeIconSize,selected:this.selected,title:this.title,extra:this.extra,disabled:this.mergedDisabled,icon:this.icon,onClick:this.handleClick})}))}}),Je=Object.assign(Object.assign({},_e),{tmNode:{type:Object,required:!0},tmNodes:{type:Array,required:!0}}),pt=ye(Je),ft=A({name:"MenuOptionGroup",props:Je,setup(e){const o=ze(e),{NSubmenu:t}=o,s=x(()=>t!=null&&t.mergedDisabledRef.value?!0:e.tmNode.disabled);Q(ke,{paddingLeftRef:o.paddingLeft,mergedDisabledRef:s});const{mergedClsPrefixRef:n,props:c}=Y(ae);return function(){const{value:v}=n,p=o.paddingLeft.value,{nodeProps:u}=c,f=u==null?void 0:u(e.tmNode.rawNode);return i("div",{class:`${v}-menu-item-group`,role:"group"},i("div",Object.assign({},f,{class:[`${v}-menu-item-group-title`,f==null?void 0:f.class],style:[(f==null?void 0:f.style)||"",p!==void 0?`padding-left: ${p}px;`:""]}),J(e.title),e.extra?i(Ve,null," ",J(e.extra)):null),i("div",null,e.tmNodes.map(B=>Se(B,c))))}}});function be(e){return e.type==="divider"||e.type==="render"}function gt(e){return e.type==="divider"}function Se(e,o){const{rawNode:t}=e,{show:s}=t;if(s===!1)return null;if(be(t))return gt(t)?i(ht,Object.assign({key:e.key},t.props)):null;const{labelField:n}=o,{key:c,level:v,isGroup:p}=e,u=Object.assign(Object.assign({},t),{title:t.title||t[n],extra:t.titleExtra||t.extra,key:c,internalKey:c,level:v,root:v===0,isGroup:p});return e.children?e.isGroup?i(ft,me(u,pt,{tmNode:e,tmNodes:e.children,key:c})):i(xe,me(u,bt,{key:c,rawNodes:t[o.childrenField],tmNodes:e.children,tmNode:e})):i(vt,me(u,mt,{key:c,tmNode:e}))}const eo=Object.assign(Object.assign({},_e),{rawNodes:{type:Array,default:()=>[]},tmNodes:{type:Array,default:()=>[]},tmNode:{type:Object,required:!0},disabled:Boolean,icon:Function,onClick:Function,domId:String,virtualChildActive:{type:Boolean,default:void 0},isEllipsisPlaceholder:Boolean}),bt=ye(eo),xe=A({name:"Submenu",props:eo,setup(e){const o=ze(e),{NMenu:t,NSubmenu:s}=o,{props:n,mergedCollapsedRef:c,mergedThemeRef:v}=t,p=x(()=>{const{disabled:g}=e;return s!=null&&s.mergedDisabledRef.value||n.disabled?!0:g}),u=K(!1);Q(Xe,{paddingLeftRef:o.paddingLeft,mergedDisabledRef:p}),Q(ke,null);function f(){const{onClick:g}=e;g&&g()}function B(){p.value||(c.value||t.toggleExpand(e.internalKey),f())}function N(g){u.value=g}return{menuProps:n,mergedTheme:v,doSelect:t.doSelect,inverted:t.invertedRef,isHorizontal:t.isHorizontalRef,mergedClsPrefix:t.mergedClsPrefixRef,maxIconSize:o.maxIconSize,activeIconSize:o.activeIconSize,iconMarginRight:o.iconMarginRight,dropdownPlacement:o.dropdownPlacement,dropdownShow:u,paddingLeft:o.paddingLeft,mergedDisabled:p,mergedValue:t.mergedValueRef,childActive:fe(()=>{var g;return(g=e.virtualChildActive)!==null&&g!==void 0?g:t.activePathRef.value.includes(e.internalKey)}),collapsed:x(()=>n.mode==="horizontal"?!1:c.value?!0:!t.mergedExpandedKeysRef.value.includes(e.internalKey)),dropdownEnabled:x(()=>!p.value&&(n.mode==="horizontal"||c.value)),handlePopoverShowChange:N,handleClick:B}},render(){var e;const{mergedClsPrefix:o,menuProps:{renderIcon:t,renderLabel:s}}=this,n=()=>{const{isHorizontal:v,paddingLeft:p,collapsed:u,mergedDisabled:f,maxIconSize:B,activeIconSize:N,title:g,childActive:O,icon:l,handleClick:d,menuProps:{nodeProps:k},dropdownShow:_,iconMarginRight:L,tmNode:V,mergedClsPrefix:j,isEllipsisPlaceholder:T,extra:S}=this,I=k==null?void 0:k(V.rawNode);return i("div",Object.assign({},I,{class:[`${j}-menu-item`,I==null?void 0:I.class],role:"menuitem"}),i(Qe,{tmNode:V,paddingLeft:p,collapsed:u,disabled:f,iconMarginRight:L,maxIconSize:B,activeIconSize:N,title:g,extra:S,showArrow:!v,childActive:O,clsPrefix:j,icon:l,hover:_,onClick:d,isEllipsisPlaceholder:T}))},c=()=>i(Co,null,{default:()=>{const{tmNodes:v,collapsed:p}=this;return p?null:i("div",{class:`${o}-submenu-children`,role:"menu"},v.map(u=>Se(u,this.menuProps)))}});return this.root?i(Ue,Object.assign({size:"large",trigger:"hover"},(e=this.menuProps)===null||e===void 0?void 0:e.dropdownProps,{themeOverrides:this.mergedTheme.peerOverrides.Dropdown,theme:this.mergedTheme.peers.Dropdown,builtinThemeOverrides:{fontSizeLarge:"14px",optionIconSizeLarge:"18px"},value:this.mergedValue,disabled:!this.dropdownEnabled,placement:this.dropdownPlacement,keyField:this.menuProps.keyField,labelField:this.menuProps.labelField,childrenField:this.menuProps.childrenField,onUpdateShow:this.handlePopoverShowChange,options:this.rawNodes,onSelect:this.doSelect,inverted:this.inverted,renderIcon:t,renderLabel:s}),{default:()=>i("div",{class:`${o}-submenu`,role:"menu","aria-expanded":!this.collapsed,id:this.domId},n(),this.isHorizontal?null:c())}):i("div",{class:`${o}-submenu`,role:"menu","aria-expanded":!this.collapsed,id:this.domId},n(),c())}}),xt=Object.assign(Object.assign({},U.props),{options:{type:Array,default:()=>[]},collapsed:{type:Boolean,default:void 0},collapsedWidth:{type:Number,default:48},iconSize:{type:Number,default:20},collapsedIconSize:{type:Number,default:24},rootIndent:Number,indent:{type:Number,default:32},labelField:{type:String,default:"label"},keyField:{type:String,default:"key"},childrenField:{type:String,default:"children"},disabledField:{type:String,default:"disabled"},defaultExpandAll:Boolean,defaultExpandedKeys:Array,expandedKeys:Array,value:[String,Number],defaultValue:{type:[String,Number],default:null},mode:{type:String,default:"vertical"},watchProps:{type:Array,default:void 0},disabled:Boolean,show:{type:Boolean,default:!0},inverted:Boolean,"onUpdate:expandedKeys":[Function,Array],onUpdateExpandedKeys:[Function,Array],onUpdateValue:[Function,Array],"onUpdate:value":[Function,Array],expandIcon:Function,renderIcon:Function,renderLabel:Function,renderExtra:Function,dropdownProps:Object,accordion:Boolean,nodeProps:Function,dropdownPlacement:{type:String,default:"bottom"},responsive:Boolean,items:Array,onOpenNamesChange:[Function,Array],onSelect:[Function,Array],onExpandedNamesChange:[Function,Array],expandedNames:Array,defaultExpandedNames:Array}),yt=A({name:"Menu",inheritAttrs:!1,props:xt,setup(e){const{mergedClsPrefixRef:o,inlineThemeDisabled:t}=ie(e),s=U("Menu","-menu",ut,_o,e,o),n=Y(qe,null),c=x(()=>{var b;const{collapsed:z}=e;if(z!==void 0)return z;if(n){const{collapseModeRef:r,collapsedRef:y}=n;if(r.value==="width")return(b=y.value)!==null&&b!==void 0?b:!1}return!1}),v=x(()=>{const{keyField:b,childrenField:z,disabledField:r}=e;return ve(e.items||e.options,{getIgnored(y){return be(y)},getChildren(y){return y[z]},getDisabled(y){return y[r]},getKey(y){var $;return($=y[b])!==null&&$!==void 0?$:y.name}})}),p=x(()=>new Set(v.value.treeNodes.map(b=>b.key))),{watchProps:u}=e,f=K(null);u!=null&&u.includes("defaultValue")?Pe(()=>{f.value=e.defaultValue}):f.value=e.defaultValue;const B=ne(e,"value"),N=ge(B,f),g=K([]),O=()=>{g.value=e.defaultExpandAll?v.value.getNonLeafKeys():e.defaultExpandedNames||e.defaultExpandedKeys||v.value.getPath(N.value,{includeSelf:!1}).keyPath};u!=null&&u.includes("defaultExpandedKeys")?Pe(O):O();const l=Ho(e,["expandedNames","expandedKeys"]),d=ge(l,g),k=x(()=>v.value.treeNodes),_=x(()=>v.value.getPath(N.value).keyPath);Q(ae,{props:e,mergedCollapsedRef:c,mergedThemeRef:s,mergedValueRef:N,mergedExpandedKeysRef:d,activePathRef:_,mergedClsPrefixRef:o,isHorizontalRef:x(()=>e.mode==="horizontal"),invertedRef:ne(e,"inverted"),doSelect:L,toggleExpand:j});function L(b,z){const{"onUpdate:value":r,onUpdateValue:y,onSelect:$}=e;y&&D(y,b,z),r&&D(r,b,z),$&&D($,b,z),f.value=b}function V(b){const{"onUpdate:expandedKeys":z,onUpdateExpandedKeys:r,onExpandedNamesChange:y,onOpenNamesChange:$}=e;z&&D(z,b),r&&D(r,b),y&&D(y,b),$&&D($,b),g.value=b}function j(b){const z=Array.from(d.value),r=z.findIndex(y=>y===b);if(~r)z.splice(r,1);else{if(e.accordion&&p.value.has(b)){const y=z.findIndex($=>p.value.has($));y>-1&&z.splice(y,1)}z.push(b)}V(z)}const T=b=>{const z=v.value.getPath(b??N.value,{includeSelf:!1}).keyPath;if(!z.length)return;const r=Array.from(d.value),y=new Set([...r,...z]);e.accordion&&p.value.forEach($=>{y.has($)&&!z.includes($)&&y.delete($)}),V(Array.from(y))},S=x(()=>{const{inverted:b}=e,{common:{cubicBezierEaseInOut:z},self:r}=s.value,{borderRadius:y,borderColorHorizontal:$,fontSize:so,itemHeight:co,dividerColor:uo}=r,a={"--n-divider-color":uo,"--n-bezier":z,"--n-font-size":so,"--n-border-color-horizontal":$,"--n-border-radius":y,"--n-item-height":co};return b?(a["--n-group-text-color"]=r.groupTextColorInverted,a["--n-color"]=r.colorInverted,a["--n-item-text-color"]=r.itemTextColorInverted,a["--n-item-text-color-hover"]=r.itemTextColorHoverInverted,a["--n-item-text-color-active"]=r.itemTextColorActiveInverted,a["--n-item-text-color-child-active"]=r.itemTextColorChildActiveInverted,a["--n-item-text-color-child-active-hover"]=r.itemTextColorChildActiveInverted,a["--n-item-text-color-active-hover"]=r.itemTextColorActiveHoverInverted,a["--n-item-icon-color"]=r.itemIconColorInverted,a["--n-item-icon-color-hover"]=r.itemIconColorHoverInverted,a["--n-item-icon-color-active"]=r.itemIconColorActiveInverted,a["--n-item-icon-color-active-hover"]=r.itemIconColorActiveHoverInverted,a["--n-item-icon-color-child-active"]=r.itemIconColorChildActiveInverted,a["--n-item-icon-color-child-active-hover"]=r.itemIconColorChildActiveHoverInverted,a["--n-item-icon-color-collapsed"]=r.itemIconColorCollapsedInverted,a["--n-item-text-color-horizontal"]=r.itemTextColorHorizontalInverted,a["--n-item-text-color-hover-horizontal"]=r.itemTextColorHoverHorizontalInverted,a["--n-item-text-color-active-horizontal"]=r.itemTextColorActiveHorizontalInverted,a["--n-item-text-color-child-active-horizontal"]=r.itemTextColorChildActiveHorizontalInverted,a["--n-item-text-color-child-active-hover-horizontal"]=r.itemTextColorChildActiveHoverHorizontalInverted,a["--n-item-text-color-active-hover-horizontal"]=r.itemTextColorActiveHoverHorizontalInverted,a["--n-item-icon-color-horizontal"]=r.itemIconColorHorizontalInverted,a["--n-item-icon-color-hover-horizontal"]=r.itemIconColorHoverHorizontalInverted,a["--n-item-icon-color-active-horizontal"]=r.itemIconColorActiveHorizontalInverted,a["--n-item-icon-color-active-hover-horizontal"]=r.itemIconColorActiveHoverHorizontalInverted,a["--n-item-icon-color-child-active-horizontal"]=r.itemIconColorChildActiveHorizontalInverted,a["--n-item-icon-color-child-active-hover-horizontal"]=r.itemIconColorChildActiveHoverHorizontalInverted,a["--n-arrow-color"]=r.arrowColorInverted,a["--n-arrow-color-hover"]=r.arrowColorHoverInverted,a["--n-arrow-color-active"]=r.arrowColorActiveInverted,a["--n-arrow-color-active-hover"]=r.arrowColorActiveHoverInverted,a["--n-arrow-color-child-active"]=r.arrowColorChildActiveInverted,a["--n-arrow-color-child-active-hover"]=r.arrowColorChildActiveHoverInverted,a["--n-item-color-hover"]=r.itemColorHoverInverted,a["--n-item-color-active"]=r.itemColorActiveInverted,a["--n-item-color-active-hover"]=r.itemColorActiveHoverInverted,a["--n-item-color-active-collapsed"]=r.itemColorActiveCollapsedInverted):(a["--n-group-text-color"]=r.groupTextColor,a["--n-color"]=r.color,a["--n-item-text-color"]=r.itemTextColor,a["--n-item-text-color-hover"]=r.itemTextColorHover,a["--n-item-text-color-active"]=r.itemTextColorActive,a["--n-item-text-color-child-active"]=r.itemTextColorChildActive,a["--n-item-text-color-child-active-hover"]=r.itemTextColorChildActiveHover,a["--n-item-text-color-active-hover"]=r.itemTextColorActiveHover,a["--n-item-icon-color"]=r.itemIconColor,a["--n-item-icon-color-hover"]=r.itemIconColorHover,a["--n-item-icon-color-active"]=r.itemIconColorActive,a["--n-item-icon-color-active-hover"]=r.itemIconColorActiveHover,a["--n-item-icon-color-child-active"]=r.itemIconColorChildActive,a["--n-item-icon-color-child-active-hover"]=r.itemIconColorChildActiveHover,a["--n-item-icon-color-collapsed"]=r.itemIconColorCollapsed,a["--n-item-text-color-horizontal"]=r.itemTextColorHorizontal,a["--n-item-text-color-hover-horizontal"]=r.itemTextColorHoverHorizontal,a["--n-item-text-color-active-horizontal"]=r.itemTextColorActiveHorizontal,a["--n-item-text-color-child-active-horizontal"]=r.itemTextColorChildActiveHorizontal,a["--n-item-text-color-child-active-hover-horizontal"]=r.itemTextColorChildActiveHoverHorizontal,a["--n-item-text-color-active-hover-horizontal"]=r.itemTextColorActiveHoverHorizontal,a["--n-item-icon-color-horizontal"]=r.itemIconColorHorizontal,a["--n-item-icon-color-hover-horizontal"]=r.itemIconColorHoverHorizontal,a["--n-item-icon-color-active-horizontal"]=r.itemIconColorActiveHorizontal,a["--n-item-icon-color-active-hover-horizontal"]=r.itemIconColorActiveHoverHorizontal,a["--n-item-icon-color-child-active-horizontal"]=r.itemIconColorChildActiveHorizontal,a["--n-item-icon-color-child-active-hover-horizontal"]=r.itemIconColorChildActiveHoverHorizontal,a["--n-arrow-color"]=r.arrowColor,a["--n-arrow-color-hover"]=r.arrowColorHover,a["--n-arrow-color-active"]=r.arrowColorActive,a["--n-arrow-color-active-hover"]=r.arrowColorActiveHover,a["--n-arrow-color-child-active"]=r.arrowColorChildActive,a["--n-arrow-color-child-active-hover"]=r.arrowColorChildActiveHover,a["--n-item-color-hover"]=r.itemColorHover,a["--n-item-color-active"]=r.itemColorActive,a["--n-item-color-active-hover"]=r.itemColorActiveHover,a["--n-item-color-active-collapsed"]=r.itemColorActiveCollapsed),a}),I=t?le("menu",x(()=>e.inverted?"a":"b"),S,e):void 0,W=ko(),q=K(null),he=K(null);let F=!0;const Ie=()=>{var b;F?F=!1:(b=q.value)===null||b===void 0||b.sync({showAllItemsBeforeCalculate:!0})};function oo(){return document.getElementById(W)}const se=K(-1);function to(b){se.value=e.options.length-b}function ro(b){b||(se.value=-1)}const no=x(()=>{const b=se.value;return{children:b===-1?[]:e.options.slice(b)}}),io=x(()=>{const{childrenField:b,disabledField:z,keyField:r}=e;return ve([no.value],{getIgnored(y){return be(y)},getChildren(y){return y[b]},getDisabled(y){return y[z]},getKey(y){var $;return($=y[r])!==null&&$!==void 0?$:y.name}})}),lo=x(()=>ve([{}]).treeNodes[0]);function ao(){var b;if(se.value===-1)return i(xe,{root:!0,level:0,key:"__ellpisisGroupPlaceholder__",internalKey:"__ellpisisGroupPlaceholder__",title:"···",tmNode:lo.value,domId:W,isEllipsisPlaceholder:!0});const z=io.value.treeNodes[0],r=_.value,y=!!(!((b=z.children)===null||b===void 0)&&b.some($=>r.includes($.key)));return i(xe,{level:0,root:!0,key:"__ellpisisGroup__",internalKey:"__ellpisisGroup__",title:"···",virtualChildActive:y,tmNode:z,domId:W,rawNodes:z.rawNode.children||[],tmNodes:z.children||[],isEllipsisPlaceholder:!0})}return{mergedClsPrefix:o,controlledExpandedKeys:l,uncontrolledExpanededKeys:g,mergedExpandedKeys:d,uncontrolledValue:f,mergedValue:N,activePath:_,tmNodes:k,mergedTheme:s,mergedCollapsed:c,cssVars:t?void 0:S,themeClass:I==null?void 0:I.themeClass,overflowRef:q,counterRef:he,updateCounter:()=>{},onResize:Ie,onUpdateOverflow:ro,onUpdateCount:to,renderCounter:ao,getCounter:oo,onRender:I==null?void 0:I.onRender,showOption:T,deriveResponsiveState:Ie}},render(){const{mergedClsPrefix:e,mode:o,themeClass:t,onRender:s}=this;s==null||s();const n=()=>this.tmNodes.map(u=>Se(u,this.$props)),v=o==="horizontal"&&this.responsive,p=()=>i("div",zo(this.$attrs,{role:o==="horizontal"?"menubar":"menu",class:[`${e}-menu`,t,`${e}-menu--${o}`,v&&`${e}-menu--responsive`,this.mergedCollapsed&&`${e}-menu--collapsed`],style:this.cssVars}),v?i(Bo,{ref:"overflowRef",onUpdateOverflow:this.onUpdateOverflow,getCounter:this.getCounter,onUpdateCount:this.onUpdateCount,updateCounter:this.updateCounter,style:{width:"100%",display:"flex",overflow:"hidden"}},{default:n,counter:this.renderCounter}):n());return v?i(wo,{onResize:this.onResize},{default:p}):p()}}),Ct={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},wt=P("path",{d:"M32 32v432a16 16 0 0 0 16 16h432",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),kt=P("rect",{x:"96",y:"224",width:"80",height:"192",rx:"20",ry:"20",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),zt=P("rect",{x:"240",y:"176",width:"80",height:"240",rx:"20",ry:"20",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),_t=P("rect",{x:"383.64",y:"112",width:"80",height:"304",rx:"20",ry:"20",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),St=[wt,kt,zt,_t],It=A({name:"BarChartOutline",render:function(o,t){return E(),G("svg",Ct,St)}}),Rt={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},Pt=P("path",{d:"M440 432H72a40 40 0 0 1-40-40V120a40 40 0 0 1 40-40h75.89a40 40 0 0 1 22.19 6.72l27.84 18.56a40 40 0 0 0 22.19 6.72H440a40 40 0 0 1 40 40v240a40 40 0 0 1-40 40z",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),Nt=P("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M32 192h448"},null,-1),Tt=[Pt,Nt],Ot=A({name:"FolderOutline",render:function(o,t){return E(),G("svg",Rt,Tt)}}),$t={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},At=P("rect",{x:"48",y:"48",width:"176",height:"176",rx:"20",ry:"20",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),Bt=P("rect",{x:"288",y:"48",width:"176",height:"176",rx:"20",ry:"20",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),Ht=P("rect",{x:"48",y:"288",width:"176",height:"176",rx:"20",ry:"20",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),Mt=P("rect",{x:"288",y:"288",width:"176",height:"176",rx:"20",ry:"20",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),Et=[At,Bt,Ht,Mt],Lt=A({name:"GridOutline",render:function(o,t){return E(),G("svg",$t,Et)}}),jt={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},Ft=P("path",{d:"M304 336v40a40 40 0 0 1-40 40H104a40 40 0 0 1-40-40V136a40 40 0 0 1 40-40h152c22.09 0 48 17.91 48 40v40",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),Kt=P("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M368 336l80-80l-80-80"},null,-1),Vt=P("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M176 256h256"},null,-1),Dt=[Ft,Kt,Vt],Ut=A({name:"LogOutOutline",render:function(o,t){return E(),G("svg",jt,Dt)}}),Gt={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},qt=P("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-miterlimit":"10","stroke-width":"32",d:"M80 160h352"},null,-1),Yt=P("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-miterlimit":"10","stroke-width":"32",d:"M80 256h352"},null,-1),Wt=P("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-miterlimit":"10","stroke-width":"32",d:"M80 352h352"},null,-1),Xt=[qt,Yt,Wt],Qt=A({name:"MenuOutline",render:function(o,t){return E(),G("svg",Gt,Xt)}}),Zt={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},Jt=P("path",{d:"M160 136c0-30.62 4.51-61.61 16-88C99.57 81.27 48 159.32 48 248c0 119.29 96.71 216 216 216c88.68 0 166.73-51.57 200-128c-26.39 11.49-57.38 16-88 16c-119.29 0-216-96.71-216-216z",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),er=[Jt],or=A({name:"MoonOutline",render:function(o,t){return E(),G("svg",Zt,er)}}),tr={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},rr=P("path",{d:"M258.9 48C141.92 46.42 46.42 141.92 48 258.9c1.56 112.19 92.91 203.54 205.1 205.1c117 1.6 212.48-93.9 210.88-210.88C462.44 140.91 371.09 49.56 258.9 48zm126.42 327.25a4 4 0 0 1-6.14-.32a124.27 124.27 0 0 0-32.35-29.59C321.37 329 289.11 320 256 320s-65.37 9-90.83 25.34a124.24 124.24 0 0 0-32.35 29.58a4 4 0 0 1-6.14.32A175.32 175.32 0 0 1 80 259c-1.63-97.31 78.22-178.76 175.57-179S432 158.81 432 256a175.32 175.32 0 0 1-46.68 119.25z",fill:"currentColor"},null,-1),nr=P("path",{d:"M256 144c-19.72 0-37.55 7.39-50.22 20.82s-19 32-17.57 51.93C191.11 256 221.52 288 256 288s64.83-32 67.79-71.24c1.48-19.74-4.8-38.14-17.68-51.82C293.39 151.44 275.59 144 256 144z",fill:"currentColor"},null,-1),ir=[rr,nr],lr=A({name:"PersonCircleOutline",render:function(o,t){return E(),G("svg",tr,ir)}}),ar={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},sr=So('<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M256 48v48"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M256 416v48"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M403.08 108.92l-33.94 33.94"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M142.86 369.14l-33.94 33.94"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M464 256h-48"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M96 256H48"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M403.08 403.08l-33.94-33.94"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M142.86 142.86l-33.94-33.94"></path><circle cx="256" cy="256" r="80" fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32"></circle>',9),cr=[sr],dr=A({name:"SunnyOutline",render:function(o,t){return E(),G("svg",ar,cr)}}),ur={class:"flex items-center justify-center h-16 border-b border-gray-200/20"},hr={key:1,class:"text-xl font-bold ml-2",style:{color:"#2080F0"}},mr={class:"flex items-center gap-3"},vr={class:"flex items-center gap-2.5 cursor-pointer px-3 py-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 border border-transparent hover:border-gray-200 dark:hover:border-gray-600 group"},pr={class:"flex flex-col leading-tight"},fr={class:"text-sm font-semibold"},gr={class:"text-xs text-gray-400"},qr=A({__name:"AdminLayout",setup(e){const o=Ao(),t=Oo(),s=Io(),n=Ro(),c=x(()=>[{label:"工作台",key:"/dashboard",icon:()=>i(Lt),show:n.hasPermission("dashboard")},{label:"数据大屏",key:"/dashboard/data-screen",icon:()=>i(It),show:n.hasPermission("dashboard:screen")},{label:"学生管理",key:"/student",icon:()=>i(Ae),show:n.hasPermission("student:list")},{label:"教师管理",key:"/teacher",icon:()=>i(Lo),show:n.hasPermission("teacher:list")},{label:"班级管理",key:"/class",icon:()=>i(Be),show:n.hasPermission("class:list")},{label:"课程管理",key:"/course",icon:()=>i(jo),show:n.hasPermission("course:list")},{label:"考试管理",key:"/exam",icon:()=>i(Fo),show:n.hasPermission("exam:list")},{label:"成绩管理",key:"/score",icon:()=>i(de),show:n.hasPermission("score:list")},{label:"德育管理",key:"moral-group",icon:()=>i(te),show:["moral:list","group:list","inspection:list","redflag:list","grade:list","fiveedu:list"].some(l=>n.hasPermission(l)),children:[{label:"德育记录",key:"/moral",icon:()=>i(te),show:n.hasPermission("moral:list")},{label:"评分规则",key:"/moral/rules",icon:()=>i(de),show:n.hasPermission("moral:list")},{label:"小组管理",key:"/moral/groups",icon:()=>i(Ae),show:n.hasPermission("group:list")},{label:"班级检查",key:"/moral/inspections",icon:()=>i(Be),show:n.hasPermission("inspection:list")},{label:"流动红旗",key:"/moral/redflag",icon:()=>i(Vo),show:n.hasPermission("redflag:list")},{label:"年段工作",key:"/moral/grade",icon:()=>i(Do),show:n.hasPermission("grade:list")},{label:"五育综评",key:"/moral/fiveedu",icon:()=>i(te),show:n.hasPermission("fiveedu:list")}]},{label:"AI 智能中心",key:"ai-group",icon:()=>i(te),show:["ai","ai:chat","termcomment:list"].some(l=>n.hasPermission(l)),children:[{label:"AI 对话",key:"/ai/chat",icon:()=>i(Ko),show:n.hasPermission("ai:chat")},{label:"AI 分析",key:"/ai",icon:()=>i(te)},{label:"学期评语",key:"/ai/term-comment",icon:()=>i(de),show:n.hasPermission("termcomment:list")}]},{label:"公告管理",key:"/notice",icon:()=>i(He),show:n.hasPermission("notice:list")},{label:"操作日志",key:"/oper-log",icon:()=>i(de),show:n.hasPermission("operlog:list")},{label:"消息通知",key:"/message",icon:()=>i(He),show:n.hasPermission("message:list")},{label:"文件管理",key:"/file",icon:()=>i(Ot),show:n.hasPermission("file:list")},{label:"系统设置",key:"/system",icon:()=>i(Uo),show:n.hasPermission("system:config")}].map(l=>l.children?{...l,children:l.children.filter(d=>d.show!==!1)}:l).filter(l=>l.show!==!1)),v=x(()=>{var d;const l=(d=n.userInfo)==null?void 0:d.roles;return!l||l.length===0?"用户":l.includes("ROLE_ADMIN")?"管理员":l.includes("ROLE_TEACHER")?"教师":l.includes("ROLE_GRADE_LEADER")?"年级组长":l.includes("ROLE_STUDENT")?"学生":l[0]}),p=()=>s.darkMode,u=l=>({display:"flex",alignItems:"center",gap:"10px",padding:"8px 12px",borderRadius:"8px",cursor:"pointer",color:l,fontWeight:500,fontSize:"14px",transition:"all 0.15s"}),f=(l,d,k,_)=>({key:d,type:"render",render:()=>i("div",{style:u(_),onClick:()=>g(d),onMouseenter:L=>{L.currentTarget.style.background=p()?"#2a2a3e":"#f0f0f0"},onMouseleave:L=>{L.currentTarget.style.background="transparent"}},[i("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",width:"28px",height:"28px",borderRadius:"8px",background:p()?"#2a2a3e":_==="#d03050"?"#fff1f0":"#f0f5ff",fontSize:"16px",color:_}},[i(k)]),i("span",null,l)])}),B=x(()=>[{key:"header",type:"render",render:()=>{var l,d,k,_;return i("div",{style:{display:"flex",alignItems:"center",gap:"12px",padding:"12px 14px 14px",borderBottom:`1px solid ${p()?"#333":"#efefef"}`,minWidth:"200px"}},[i($e,{round:!0,size:44,src:(l=n.userInfo)==null?void 0:l.avatar,"fallback-src":`https://api.dicebear.com/7.x/avataaars/svg?seed=${(d=n.userInfo)==null?void 0:d.username}`}),i("div",{style:{lineHeight:1.4}},[i("div",{style:{fontWeight:600,fontSize:"15px",color:p()?"#e0e0e0":"#333"}},((k=n.userInfo)==null?void 0:k.realName)||((_=n.userInfo)==null?void 0:_.username)),i("div",{style:{fontSize:"12px",opacity:.5,marginTop:"1px",color:p()?"#aaa":"#666"}},v.value)])])}},{type:"divider",key:"d1",style:{margin:"4px 0"}},f("个人信息","profile",lr,"#2080f0"),{type:"divider",key:"d2",style:{margin:"4px 0"}},f("退出登录","logout",Ut,"#d03050")]),N=l=>{o.push(l)},g=l=>{l==="profile"?o.push("/profile"):l==="logout"&&(n.logout(),o.push("/login"))},O=x(()=>{const l=t.path,d=[{label:"首页",key:"/dashboard"}];if(l.includes("student"))d.push({label:"学生管理",key:"student"});else if(l.includes("teacher"))d.push({label:"教师管理",key:"teacher"});else if(l.includes("class"))d.push({label:"班级管理",key:"class"});else if(l.includes("course"))d.push({label:"课程管理",key:"course"});else if(l.includes("exam"))d.push({label:"考试管理",key:"exam"});else if(l.includes("score"))d.push({label:"成绩管理",key:"score"});else if(l.includes("moral")){d.push({label:"德育管理",key:"moral"});const k={"/moral/rules":"评分规则","/moral/groups":"小组管理","/moral/inspections":"班级检查","/moral/redflag":"流动红旗","/moral/grade":"年段工作","/moral/fiveedu":"五育综评"};k[l]&&d.push({label:k[l],key:l})}else l.includes("ai/chat")?d.push({label:"AI 对话",key:"ai-chat"}):l.includes("ai/term-comment")?d.push({label:"学期评语",key:"ai-term-comment"}):l.includes("ai")?d.push({label:"AI 智能中心",key:"ai"}):l.includes("notice")?d.push({label:"公告管理",key:"notice"}):l.includes("oper-log")?d.push({label:"操作日志",key:"oper-log"}):l.includes("message")?d.push({label:"消息通知",key:"message"}):l.includes("file")?d.push({label:"文件管理",key:"file"}):l.includes("profile")?d.push({label:"个人中心",key:"profile"}):l.includes("system")?d.push({label:"系统设置",key:"system"}):l.includes("data-screen")&&d.push({label:"数据大屏",key:"data-screen"});return d});return(l,d)=>{const k=Zo,_=$o("router-view");return E(),Z(w(Me),{position:"absolute","has-sider":""},{default:M(()=>[H(w(dt),{collapsed:w(s).collapsed,"collapse-mode":"width","collapsed-width":64,width:176,"native-scrollbar":!1,bordered:"",style:{background:"var(--n-color)"}},{default:M(()=>[P("div",ur,[w(s).collapsed?Po("",!0):(E(),Z(w(re),{key:0,size:"28",color:"#2080F0"},{default:M(()=>[H(w(Oe))]),_:1})),w(s).collapsed?(E(),Z(w(re),{key:2,size:"24",color:"#2080F0"},{default:M(()=>[H(w(Oe))]),_:1})):(E(),G("span",hr,"智慧学生管理"))]),H(w(yt),{options:c.value,collapsed:w(s).collapsed,"collapsed-width":64,"collapsed-icon-size":22,value:w(t).path,"onUpdate:value":N},null,8,["options","collapsed","value"])]),_:1},8,["collapsed"]),H(w(Me),null,{default:M(()=>[H(w(it),{bordered:"",class:"h-16 flex items-center justify-between px-4"},{default:M(()=>[P("div",mr,[H(w(Ne),{tertiary:"",circle:"",onClick:w(s).toggleCollapsed},{icon:M(()=>[H(w(re),null,{default:M(()=>[H(w(Qt))]),_:1})]),_:1},8,["onClick"]),H(w(Wo),null,{default:M(()=>[(E(!0),G(Ve,null,No(O.value,L=>(E(),Z(k,{key:L.key},{default:M(()=>[Te(ce(L.label),1)]),_:2},1024))),128))]),_:1})]),H(w(Eo),{align:"center",size:"large"},{default:M(()=>[H(w(De),{trigger:"hover"},{trigger:M(()=>[H(w(Ne),{tertiary:"",circle:"",onClick:w(s).toggleDark},{icon:M(()=>[H(w(re),null,{default:M(()=>[w(s).darkMode?(E(),Z(w(dr),{key:1})):(E(),Z(w(or),{key:0}))]),_:1})]),_:1},8,["onClick"])]),default:M(()=>[Te(" "+ce(w(s).darkMode?"浅色模式":"深色模式"),1)]),_:1}),H(w(Ue),{options:B.value,onSelect:g,placement:"bottom-end",trigger:"click"},{default:M(()=>{var L,V,j,T;return[P("div",vr,[H(w($e),{src:(L=w(n).userInfo)==null?void 0:L.avatar,round:"",size:"small","fallback-src":`https://api.dicebear.com/7.x/avataaars/svg?seed=${(V=w(n).userInfo)==null?void 0:V.username}`,class:"ring-2 ring-transparent group-hover:ring-blue-400 transition-all duration-200"},null,8,["src","fallback-src"]),P("div",pr,[P("span",fr,ce(((j=w(n).userInfo)==null?void 0:j.realName)||((T=w(n).userInfo)==null?void 0:T.username)),1),P("span",gr,ce(v.value),1)]),H(w(re),{size:"14",color:"#999",class:"ml-0.5 transition-transform duration-200 group-hover:rotate-180"},{default:M(()=>[...d[0]||(d[0]=[P("svg",{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[P("polyline",{points:"6 9 12 15 18 9"})],-1)])]),_:1})])]}),_:1},8,["options"])]),_:1})]),_:1}),H(w(tt),{"native-scrollbar":!1,class:"p-6",style:To({minHeight:"calc(100vh - 64px)",background:w(s).darkMode?"#1a1a2e":"#f5f7fa"})},{default:M(()=>[H(_)]),_:1},8,["style"])]),_:1})]),_:1})}}});export{qr as default};
