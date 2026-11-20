import{an as te,cM as me,aR as m,F as Te,n as xe,bl as Ee,S as Se,cH as he,bU as h,cr as Ce,cB as Ie,cK as De,cJ as Re,bD as Oe,cv as Pe,a6 as W,aW as ze,at as fe,Z as Fe,bP as ee,as as je,bL as Me,bs as Ue,G as f,a1 as re,H as B,O as F,K as Y,aE as He,cP as Le,L as Ae,b8 as We,cE as $e,cu as _e,cF as Ye,aA as Xe,Q as X,au as qe,cj as ve,N as Ve,cf as Ke,cq as Ge,bF as Je,ac as Qe,aj as i,cL as c,co as n,f as Ze,i as et,b_ as q,bH as pe,a9 as Q,aa as tt,ah as G,B as j,ab as rt}from"../index-D5EZuPss.js";import{s as ot,E as at}from"../shared/k12-2A-eFUOU.js";import{u as be}from"../shared/use-merged-state-CuGveVIH.js";import{f as ge}from"../shared/format-length-B-p6aW7q.js";import{L as nt}from"../icons/ListOutline-C6GO1RQy.js";import{A as st}from"../icons/AddOutline-CBq3XDpO.js";import{R as it}from"../icons/RefreshOutline-DjgqT-Ws.js";import{S as lt}from"../icons/SearchOutline-B_4YbIhv.js";import{N as dt}from"../components/DatePicker-COLG4Z96.js";import{P as ut}from"../icons/PersonOutline-C8f-1nyQ.js";import{P as ct}from"../icons/PencilOutline-BkF_vGuD.js";import{T as mt}from"../icons/TrashOutline-CSc6tbZE.js";import{u as ft}from"../shared/use-message-BFqoDwUi.js";import{N as Z}from"../components/Icon-R-M1KjAt.js";import{N as ce}from"../components/Space-Bka4I7vV.js";import{a as V}from"../components/Select-Ut4qCZir.js";import{c as ye}from"../components/DataTable-DlmTFzu4.js";import{N as ht}from"../components/FormItem-B_JQtiyF.js";import{N as vt}from"../components/Grid-X9qcpFFQ.js";import{N as K}from"../components/FormItemGridItem-D-1B3nC9.js";import{N as we}from"../components/Input-BKlyi810.js";import{N as pt}from"../components/InputNumber-CJSfDoGJ.js";import{N as bt}from"../components/Popconfirm-BBUxk30X.js";import{N as gt}from"../components/Tag-DnnVD1vs.js";import"../shared/use-locale-BbslFAUH.js";import"../components/Dropdown-ZCiTAE3a.js";import"../components/Popover-GX93JmWJ.js";import"../shared/get-ChuokKCT.js";import"../components/next-frame-once-C5Ksf8W7.js";import"../icons/ChevronRight-l_e88wug.js";import"../shared/happens-in-CM8LO42l.js";import"../shared/create-CQbuanf1.js";import"../components/get-slot-Bk_rJcZu.js";import"../components/Suffix-OZkbWfuz.js";import"../components/Empty-DT7ptvvz.js";import"../components/RadioGroup-CW4u4WLD.js";import"../components/Tooltip-BZkpa0OZ.js";import"../icons/Add-FV6j_eSs.js";const yt=te({name:"NDrawerContent",inheritAttrs:!1,props:{blockScroll:Boolean,show:{type:Boolean,default:void 0},displayDirective:{type:String,required:!0},placement:{type:String,required:!0},contentClass:String,contentStyle:[Object,String],nativeScrollbar:{type:Boolean,required:!0},scrollbarProps:Object,trapFocus:{type:Boolean,default:!0},autoFocus:{type:Boolean,default:!0},showMask:{type:[Boolean,String],required:!0},maxWidth:Number,maxHeight:Number,minWidth:Number,minHeight:Number,resizable:Boolean,onClickoutside:Function,onAfterLeave:Function,onAfterEnter:Function,onEsc:Function},setup(t){const o=h(!!t.show),a=h(null),C=ze(fe);let z=0,w="",p=null;const x=h(!1),b=h(!1),S=W(()=>t.placement==="top"||t.placement==="bottom"),{mergedClsPrefixRef:M,mergedRtlRef:T}=Ce(t),E=Ie("Drawer",T,M),I=d,$=u=>{b.value=!0,z=S.value?u.clientY:u.clientX,w=document.body.style.cursor,document.body.style.cursor=S.value?"ns-resize":"ew-resize",document.body.addEventListener("mousemove",N),document.body.addEventListener("mouseleave",I),document.body.addEventListener("mouseup",d)},R=()=>{p!==null&&(window.clearTimeout(p),p=null),b.value?x.value=!0:p=window.setTimeout(()=>{x.value=!0},300)},U=()=>{p!==null&&(window.clearTimeout(p),p=null),x.value=!1},{doUpdateHeight:H,doUpdateWidth:L}=C,O=u=>{const{maxWidth:v}=t;if(v&&u>v)return v;const{minWidth:y}=t;return y&&u<y?y:u},_=u=>{const{maxHeight:v}=t;if(v&&u>v)return v;const{minHeight:y}=t;return y&&u<y?y:u};function N(u){var v,y;if(b.value)if(S.value){let k=((v=a.value)===null||v===void 0?void 0:v.offsetHeight)||0;const P=z-u.clientY;k+=t.placement==="bottom"?P:-P,k=_(k),H(k),z=u.clientY}else{let k=((y=a.value)===null||y===void 0?void 0:y.offsetWidth)||0;const P=z-u.clientX;k+=t.placement==="right"?P:-P,k=O(k),L(k),z=u.clientX}}function d(){b.value&&(z=0,b.value=!1,document.body.style.cursor=w,document.body.removeEventListener("mousemove",N),document.body.removeEventListener("mouseup",d),document.body.removeEventListener("mouseleave",I))}De(()=>{t.show&&(o.value=!0)}),Re(()=>t.show,u=>{u||d()}),Oe(()=>{d()});const l=W(()=>{const{show:u}=t,v=[[he,u]];return t.showMask||v.push([Fe,t.onClickoutside,void 0,{capture:!0}]),v});function g(){var u;o.value=!1,(u=t.onAfterLeave)===null||u===void 0||u.call(t)}return Pe(W(()=>t.blockScroll&&o.value)),ee(je,a),ee(Me,null),ee(Ue,null),{bodyRef:a,rtlEnabled:E,mergedClsPrefix:C.mergedClsPrefixRef,isMounted:C.isMountedRef,mergedTheme:C.mergedThemeRef,displayed:o,transitionName:W(()=>({right:"slide-in-from-right-transition",left:"slide-in-from-left-transition",top:"slide-in-from-top-transition",bottom:"slide-in-from-bottom-transition"})[t.placement]),handleAfterLeave:g,bodyDirectives:l,handleMousedownResizeTrigger:$,handleMouseenterResizeTrigger:R,handleMouseleaveResizeTrigger:U,isDragging:b,isHoverOnResizeTrigger:x}},render(){const{$slots:t,mergedClsPrefix:o}=this;return this.displayDirective==="show"||this.displayed||this.show?me(m("div",{role:"none"},m(Te,{disabled:!this.showMask||!this.trapFocus,active:this.show,autoFocus:this.autoFocus,onEsc:this.onEsc},{default:()=>m(xe,{name:this.transitionName,appear:this.isMounted,onAfterEnter:this.onAfterEnter,onAfterLeave:this.handleAfterLeave},{default:()=>me(m("div",Ee(this.$attrs,{role:"dialog",ref:"bodyRef","aria-modal":"true",class:[`${o}-drawer`,this.rtlEnabled&&`${o}-drawer--rtl`,`${o}-drawer--${this.placement}-placement`,this.isDragging&&`${o}-drawer--unselectable`,this.nativeScrollbar&&`${o}-drawer--native-scrollbar`]}),[this.resizable?m("div",{class:[`${o}-drawer__resize-trigger`,(this.isDragging||this.isHoverOnResizeTrigger)&&`${o}-drawer__resize-trigger--hover`],onMouseenter:this.handleMouseenterResizeTrigger,onMouseleave:this.handleMouseleaveResizeTrigger,onMousedown:this.handleMousedownResizeTrigger}):null,this.nativeScrollbar?m("div",{class:[`${o}-drawer-content-wrapper`,this.contentClass],style:this.contentStyle,role:"none"},t):m(Se,Object.assign({},this.scrollbarProps,{contentStyle:this.contentStyle,contentClass:[`${o}-drawer-content-wrapper`,this.contentClass],theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar}),t)]),this.bodyDirectives)})})),[[he,this.displayDirective==="if"||this.displayed||this.show]]):null}}),{cubicBezierEaseIn:wt,cubicBezierEaseOut:xt}=re;function St({duration:t="0.3s",leaveDuration:o="0.2s",name:a="slide-in-from-bottom"}={}){return[f(`&.${a}-transition-leave-active`,{transition:`transform ${o} ${wt}`}),f(`&.${a}-transition-enter-active`,{transition:`transform ${t} ${xt}`}),f(`&.${a}-transition-enter-to`,{transform:"translateY(0)"}),f(`&.${a}-transition-enter-from`,{transform:"translateY(100%)"}),f(`&.${a}-transition-leave-from`,{transform:"translateY(0)"}),f(`&.${a}-transition-leave-to`,{transform:"translateY(100%)"})]}const{cubicBezierEaseIn:Ct,cubicBezierEaseOut:zt}=re;function $t({duration:t="0.3s",leaveDuration:o="0.2s",name:a="slide-in-from-left"}={}){return[f(`&.${a}-transition-leave-active`,{transition:`transform ${o} ${Ct}`}),f(`&.${a}-transition-enter-active`,{transition:`transform ${t} ${zt}`}),f(`&.${a}-transition-enter-to`,{transform:"translateX(0)"}),f(`&.${a}-transition-enter-from`,{transform:"translateX(-100%)"}),f(`&.${a}-transition-leave-from`,{transform:"translateX(0)"}),f(`&.${a}-transition-leave-to`,{transform:"translateX(-100%)"})]}const{cubicBezierEaseIn:kt,cubicBezierEaseOut:Nt}=re;function Bt({duration:t="0.3s",leaveDuration:o="0.2s",name:a="slide-in-from-right"}={}){return[f(`&.${a}-transition-leave-active`,{transition:`transform ${o} ${kt}`}),f(`&.${a}-transition-enter-active`,{transition:`transform ${t} ${Nt}`}),f(`&.${a}-transition-enter-to`,{transform:"translateX(0)"}),f(`&.${a}-transition-enter-from`,{transform:"translateX(100%)"}),f(`&.${a}-transition-leave-from`,{transform:"translateX(0)"}),f(`&.${a}-transition-leave-to`,{transform:"translateX(100%)"})]}const{cubicBezierEaseIn:Tt,cubicBezierEaseOut:Et}=re;function It({duration:t="0.3s",leaveDuration:o="0.2s",name:a="slide-in-from-top"}={}){return[f(`&.${a}-transition-leave-active`,{transition:`transform ${o} ${Tt}`}),f(`&.${a}-transition-enter-active`,{transition:`transform ${t} ${Et}`}),f(`&.${a}-transition-enter-to`,{transform:"translateY(0)"}),f(`&.${a}-transition-enter-from`,{transform:"translateY(-100%)"}),f(`&.${a}-transition-leave-from`,{transform:"translateY(0)"}),f(`&.${a}-transition-leave-to`,{transform:"translateY(-100%)"})]}const Dt=f([B("drawer",`
 word-break: break-word;
 line-height: var(--n-line-height);
 position: absolute;
 pointer-events: all;
 box-shadow: var(--n-box-shadow);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 background-color: var(--n-color);
 color: var(--n-text-color);
 box-sizing: border-box;
 `,[Bt(),$t(),It(),St(),F("unselectable",`
 user-select: none; 
 -webkit-user-select: none;
 `),F("native-scrollbar",[B("drawer-content-wrapper",`
 overflow: auto;
 height: 100%;
 `)]),Y("resize-trigger",`
 position: absolute;
 background-color: #0000;
 transition: background-color .3s var(--n-bezier);
 `,[F("hover",`
 background-color: var(--n-resize-trigger-color-hover);
 `)]),B("drawer-content-wrapper",`
 box-sizing: border-box;
 `),B("drawer-content",`
 height: 100%;
 display: flex;
 flex-direction: column;
 `,[F("native-scrollbar",[B("drawer-body-content-wrapper",`
 height: 100%;
 overflow: auto;
 `)]),B("drawer-body",`
 flex: 1 0 0;
 overflow: hidden;
 `),B("drawer-body-content-wrapper",`
 box-sizing: border-box;
 padding: var(--n-body-padding);
 `),B("drawer-header",`
 font-weight: var(--n-title-font-weight);
 line-height: 1;
 font-size: var(--n-title-font-size);
 color: var(--n-title-text-color);
 padding: var(--n-header-padding);
 transition: border .3s var(--n-bezier);
 border-bottom: 1px solid var(--n-divider-color);
 border-bottom: var(--n-header-border-bottom);
 display: flex;
 justify-content: space-between;
 align-items: center;
 `,[Y("main",`
 flex: 1;
 `),Y("close",`
 margin-left: 6px;
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)]),B("drawer-footer",`
 display: flex;
 justify-content: flex-end;
 border-top: var(--n-footer-border-top);
 transition: border .3s var(--n-bezier);
 padding: var(--n-footer-padding);
 `)]),F("right-placement",`
 top: 0;
 bottom: 0;
 right: 0;
 border-top-left-radius: var(--n-border-radius);
 border-bottom-left-radius: var(--n-border-radius);
 `,[Y("resize-trigger",`
 width: 3px;
 height: 100%;
 top: 0;
 left: 0;
 transform: translateX(-1.5px);
 cursor: ew-resize;
 `)]),F("left-placement",`
 top: 0;
 bottom: 0;
 left: 0;
 border-top-right-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `,[Y("resize-trigger",`
 width: 3px;
 height: 100%;
 top: 0;
 right: 0;
 transform: translateX(1.5px);
 cursor: ew-resize;
 `)]),F("top-placement",`
 top: 0;
 left: 0;
 right: 0;
 border-bottom-left-radius: var(--n-border-radius);
 border-bottom-right-radius: var(--n-border-radius);
 `,[Y("resize-trigger",`
 width: 100%;
 height: 3px;
 bottom: 0;
 left: 0;
 transform: translateY(1.5px);
 cursor: ns-resize;
 `)]),F("bottom-placement",`
 left: 0;
 bottom: 0;
 right: 0;
 border-top-left-radius: var(--n-border-radius);
 border-top-right-radius: var(--n-border-radius);
 `,[Y("resize-trigger",`
 width: 100%;
 height: 3px;
 top: 0;
 left: 0;
 transform: translateY(-1.5px);
 cursor: ns-resize;
 `)])]),f("body",[f(">",[B("drawer-container",`
 position: fixed;
 `)])]),B("drawer-container",`
 position: relative;
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 pointer-events: none;
 `,[f("> *",`
 pointer-events: all;
 `)]),B("drawer-mask",`
 background-color: rgba(0, 0, 0, .3);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `,[F("invisible",`
 background-color: rgba(0, 0, 0, 0)
 `),He({enterDuration:"0.2s",leaveDuration:"0.2s",enterCubicBezier:"var(--n-bezier-in)",leaveCubicBezier:"var(--n-bezier-out)"})])]),Rt=Object.assign(Object.assign({},$e.props),{show:Boolean,width:[Number,String],height:[Number,String],placement:{type:String,default:"right"},maskClosable:{type:Boolean,default:!0},showMask:{type:[Boolean,String],default:!0},to:[String,Object],displayDirective:{type:String,default:"if"},nativeScrollbar:{type:Boolean,default:!0},zIndex:Number,onMaskClick:Function,scrollbarProps:Object,contentClass:String,contentStyle:[Object,String],trapFocus:{type:Boolean,default:!0},onEsc:Function,autoFocus:{type:Boolean,default:!0},closeOnEsc:{type:Boolean,default:!0},blockScroll:{type:Boolean,default:!0},maxWidth:Number,maxHeight:Number,minWidth:Number,minHeight:Number,resizable:Boolean,defaultWidth:{type:[Number,String],default:251},defaultHeight:{type:[Number,String],default:251},onUpdateWidth:[Function,Array],onUpdateHeight:[Function,Array],"onUpdate:width":[Function,Array],"onUpdate:height":[Function,Array],"onUpdate:show":[Function,Array],onUpdateShow:[Function,Array],onAfterEnter:Function,onAfterLeave:Function,drawerStyle:[String,Object],drawerClass:String,target:null,onShow:Function,onHide:Function}),Ot=te({name:"Drawer",inheritAttrs:!1,props:Rt,setup(t){const{mergedClsPrefixRef:o,namespaceRef:a,inlineThemeDisabled:C}=Ce(t),z=We(),w=$e("Drawer","-drawer",Dt,qe,t,o),p=h(t.defaultWidth),x=h(t.defaultHeight),b=be(ve(t,"width"),p),S=be(ve(t,"height"),x),M=W(()=>{const{placement:d}=t;return d==="top"||d==="bottom"?"":ge(b.value)}),T=W(()=>{const{placement:d}=t;return d==="left"||d==="right"?"":ge(S.value)}),E=d=>{const{onUpdateWidth:l,"onUpdate:width":g}=t;l&&X(l,d),g&&X(g,d),p.value=d},I=d=>{const{onUpdateHeight:l,"onUpdate:width":g}=t;l&&X(l,d),g&&X(g,d),x.value=d},$=W(()=>[{width:M.value,height:T.value},t.drawerStyle||""]);function R(d){const{onMaskClick:l,maskClosable:g}=t;g&&O(!1),l&&l(d)}function U(d){R(d)}const H=_e();function L(d){var l;(l=t.onEsc)===null||l===void 0||l.call(t),t.show&&t.closeOnEsc&&Xe(d)&&(H.value||O(!1))}function O(d){const{onHide:l,onUpdateShow:g,"onUpdate:show":u}=t;g&&X(g,d),u&&X(u,d),l&&!d&&X(l,d)}ee(fe,{isMountedRef:z,mergedThemeRef:w,mergedClsPrefixRef:o,doUpdateShow:O,doUpdateHeight:I,doUpdateWidth:E});const _=W(()=>{const{common:{cubicBezierEaseInOut:d,cubicBezierEaseIn:l,cubicBezierEaseOut:g},self:{color:u,textColor:v,boxShadow:y,lineHeight:k,headerPadding:P,footerPadding:D,borderRadius:oe,bodyPadding:ae,titleFontSize:ne,titleTextColor:se,titleFontWeight:ie,headerBorderBottom:le,footerBorderTop:de,closeIconColor:ue,closeIconColorHover:r,closeIconColorPressed:e,closeColorHover:s,closeColorPressed:A,closeIconSize:J,closeSize:ke,closeBorderRadius:Ne,resizableTriggerColorHover:Be}}=w.value;return{"--n-line-height":k,"--n-color":u,"--n-border-radius":oe,"--n-text-color":v,"--n-box-shadow":y,"--n-bezier":d,"--n-bezier-out":g,"--n-bezier-in":l,"--n-header-padding":P,"--n-body-padding":ae,"--n-footer-padding":D,"--n-title-text-color":se,"--n-title-font-size":ne,"--n-title-font-weight":ie,"--n-header-border-bottom":le,"--n-footer-border-top":de,"--n-close-icon-color":ue,"--n-close-icon-color-hover":r,"--n-close-icon-color-pressed":e,"--n-close-size":ke,"--n-close-color-hover":s,"--n-close-color-pressed":A,"--n-close-icon-size":J,"--n-close-border-radius":Ne,"--n-resize-trigger-color-hover":Be}}),N=C?Ye("drawer",void 0,_,t):void 0;return{mergedClsPrefix:o,namespace:a,mergedBodyStyle:$,handleOutsideClick:U,handleMaskClick:R,handleEsc:L,mergedTheme:w,cssVars:C?void 0:_,themeClass:N==null?void 0:N.themeClass,onRender:N==null?void 0:N.onRender,isMounted:z}},render(){const{mergedClsPrefix:t}=this;return m(Ae,{to:this.to,show:this.show},{default:()=>{var o;return(o=this.onRender)===null||o===void 0||o.call(this),me(m("div",{class:[`${t}-drawer-container`,this.namespace,this.themeClass],style:this.cssVars,role:"none"},this.showMask?m(xe,{name:"fade-in-transition",appear:this.isMounted},{default:()=>this.show?m("div",{"aria-hidden":!0,class:[`${t}-drawer-mask`,this.showMask==="transparent"&&`${t}-drawer-mask--invisible`],onClick:this.handleMaskClick}):null}):null,m(yt,Object.assign({},this.$attrs,{class:[this.drawerClass,this.$attrs.class],style:[this.mergedBodyStyle,this.$attrs.style],blockScroll:this.blockScroll,contentStyle:this.contentStyle,contentClass:this.contentClass,placement:this.placement,scrollbarProps:this.scrollbarProps,show:this.show,displayDirective:this.displayDirective,nativeScrollbar:this.nativeScrollbar,onAfterEnter:this.onAfterEnter,onAfterLeave:this.onAfterLeave,trapFocus:this.trapFocus,autoFocus:this.autoFocus,resizable:this.resizable,maxHeight:this.maxHeight,minHeight:this.minHeight,maxWidth:this.maxWidth,minWidth:this.minWidth,showMask:this.showMask,onEsc:this.handleEsc,onClickoutside:this.handleOutsideClick}),this.$slots)),[[Le,{zIndex:this.zIndex,enabled:this.show}]])}})}}),Pt={title:String,headerClass:String,headerStyle:[Object,String],footerClass:String,footerStyle:[Object,String],bodyClass:String,bodyStyle:[Object,String],bodyContentClass:String,bodyContentStyle:[Object,String],nativeScrollbar:{type:Boolean,default:!0},scrollbarProps:Object,closable:Boolean},Ft=te({name:"DrawerContent",props:Pt,slots:Object,setup(){const t=ze(fe,null);t||Ke("drawer-content","`n-drawer-content` must be placed inside `n-drawer`.");const{doUpdateShow:o}=t;function a(){o(!1)}return{handleCloseClick:a,mergedTheme:t.mergedThemeRef,mergedClsPrefix:t.mergedClsPrefixRef}},render(){const{title:t,mergedClsPrefix:o,nativeScrollbar:a,mergedTheme:C,bodyClass:z,bodyStyle:w,bodyContentClass:p,bodyContentStyle:x,headerClass:b,headerStyle:S,footerClass:M,footerStyle:T,scrollbarProps:E,closable:I,$slots:$}=this;return m("div",{role:"none",class:[`${o}-drawer-content`,a&&`${o}-drawer-content--native-scrollbar`]},$.header||t||I?m("div",{class:[`${o}-drawer-header`,b],style:S,role:"none"},m("div",{class:`${o}-drawer-header__main`,role:"heading","aria-level":"1"},$.header!==void 0?$.header():t),I&&m(Ve,{onClick:this.handleCloseClick,clsPrefix:o,class:`${o}-drawer-header__close`,absolute:!0})):null,a?m("div",{class:[`${o}-drawer-body`,z],style:w,role:"none"},m("div",{class:[`${o}-drawer-body-content-wrapper`,p],style:x,role:"none"},$)):m(Se,Object.assign({themeOverrides:C.peerOverrides.Scrollbar,theme:C.peers.Scrollbar},E,{class:`${o}-drawer-body`,contentClass:[`${o}-drawer-body-content-wrapper`,p],contentStyle:x}),$),$.footer?m("div",{class:[`${o}-drawer-footer`,M],style:T,role:"none"},$.footer()):null)}}),jt={class:"flex items-center justify-between mb-4"},Mt={class:"flex items-center gap-2"},Ut={class:"flex items-center gap-3 mb-4 flex-wrap"},zr=te({__name:"ScoreList",setup(t){const o=Ge(),a=ft(),C=h([]),z=h(0),w=h(1),p=h(10),x=h(!1),b=h(!1),S=h(null),M=h(null),T=h([]),E=h([]),I=at,$=ot(),R=h(null),U=h(null),H=h(null),L=h(null),O=h(!1),_=h(""),N=h([]),d=h(!1),l=h({studentId:null,subjectId:null,examName:"",examType:3,examDate:null,score:null,comment:""}),g={studentId:{required:!0,type:"number",message:"请选择学生",trigger:["change","blur"]},subjectId:{required:!0,type:"number",message:"请选择科目",trigger:["change","blur"]},examName:{required:!0,message:"请输入考试名称",trigger:["input","blur"]},examType:{required:!0,type:"number",message:"请选择考试类型",trigger:["change","blur"]},examDate:{required:!0,type:"number",message:"请选择考试日期",trigger:["change","blur"]},score:{required:!0,type:"number",message:"请输入分数（0-100）",trigger:["input","blur"]}},u=r=>{const e=new Date(r),s=A=>String(A).padStart(2,"0");return`${e.getFullYear()}-${s(e.getMonth()+1)}-${s(e.getDate())}`},v=r=>{const e=new Date(r);return isNaN(e.getTime())?null:e.getTime()},y=r=>m(gt,{type:r==="优秀"?"success":r==="良好"?"info":r==="合格"?"warning":"error",size:"small"},{default:()=>r}),k=[{title:"学生",key:"studentName",width:100,render:r=>m(j,{text:!0,type:"primary",onClick:()=>ne(r)},{default:()=>r.studentName,icon:()=>m(ut)})},{title:"班级",key:"className",width:110,render:r=>r.className||"-"},{title:"科目",key:"subjectName",width:100},{title:"考试",key:"examName",ellipsis:!0},{title:"日期",key:"examDate",width:100},{title:"分数",key:"score",width:70},{title:"等级",key:"gradeLevel",width:80,render:r=>y(r.gradeLevel)},{title:"操作",key:"actions",width:150,fixed:"right",render:r=>m(ce,{size:4,wrap:!1},{default:()=>[...o.hasPermission("score:edit")?[m(j,{size:"tiny",type:"primary",onClick:()=>ie(r)},{default:()=>"编辑",icon:()=>m(ct)})]:[],...o.hasPermission("score:delete")?[m(bt,{onPositiveClick:()=>de(r.id)},{default:()=>"确认删除该成绩？",trigger:()=>m(j,{size:"tiny",type:"error"},{default:()=>"删除",icon:()=>m(mt)})})]:[]]})}],P=[{title:"考试日期",key:"examDate",width:110},{title:"考试",key:"examName",ellipsis:!0},{title:"科目",key:"subjectName",width:90},{title:"分数",key:"score",width:60},{title:"等级",key:"gradeLevel",width:80,render:r=>y(r.gradeLevel)}],D=async()=>{x.value=!0;try{const r=await q.get("/score/page",{params:{page:w.value,pageSize:p.value,studentId:R.value??void 0,subjectId:U.value??void 0,examType:H.value??void 0,semester:L.value??void 0}});C.value=r.records||[],z.value=r.total||0}catch(r){a.error(r.message)}finally{x.value=!1}},oe=async()=>{try{const r=await q.get("/user/student/list")||[];T.value=r.map(e=>({label:`${e.realName} (${e.studentNo})`,value:e.id}))}catch{T.value=[]}},ae=async()=>{try{const r=await q.get("/course/list")||[];E.value=r.map(e=>({label:e.courseName,value:e.id}))}catch{E.value=[]}},ne=async r=>{_.value=r.studentName,O.value=!0,d.value=!0;try{const s=(await q.get("/score/page",{params:{page:1,pageSize:500,studentId:r.studentId}})).records||[];N.value=[...s].sort((A,J)=>(J.examDate||"").localeCompare(A.examDate||""))}catch(e){a.error(e.message)}finally{d.value=!1}},se=()=>{S.value=null,l.value={studentId:null,subjectId:null,examName:"",examType:3,examDate:Date.now(),score:null,comment:""},b.value=!0},ie=r=>{S.value=r.id,l.value={studentId:r.studentId,subjectId:r.subjectId,examName:r.examName,examType:r.examType,examDate:v(r.examDate),score:r.score,comment:r.comment||""},b.value=!0},le=async()=>{var A;try{await((A=M.value)==null?void 0:A.validate())}catch{return}const{examDate:r,...e}=l.value,s={...e};r&&(s.examDate=u(r));try{S.value?await q.put(`/score/${S.value}`,s):await q.post("/score",s),a.success(S.value?"编辑成功":"新增成功"),b.value=!1,await D()}catch(J){a.error(J.message)}},de=async r=>{try{await q.delete(`/score/${r}`),a.success("删除成功"),await D()}catch(e){a.error(e.message)}},ue=()=>{R.value=null,U.value=null,H.value=null,L.value=null,w.value=1,D()};return Je(async()=>{await Promise.all([D(),oe(),ae()])}),(r,e)=>(pe(),Qe("div",null,[i(n(Ze),null,{default:c(()=>[Q("div",jt,[Q("div",Mt,[i(n(Z),{size:"22",color:"#2080F0"},{default:c(()=>[i(n(nt))]),_:1}),e[15]||(e[15]=Q("h3",{class:"text-lg font-semibold"},"成绩列表",-1))]),i(n(ce),null,{default:c(()=>[n(o).hasPermission("score:add")?(pe(),tt(n(j),{key:0,type:"success",onClick:se},{icon:c(()=>[i(n(Z),null,{default:c(()=>[i(n(st))]),_:1})]),default:c(()=>[e[16]||(e[16]=G(" 新增成绩 ",-1))]),_:1})):rt("",!0),i(n(j),{onClick:D},{icon:c(()=>[i(n(Z),null,{default:c(()=>[i(n(it))]),_:1})]),default:c(()=>[e[17]||(e[17]=G(" 刷新数据 ",-1))]),_:1})]),_:1})]),Q("div",Ut,[i(n(V),{value:R.value,"onUpdate:value":e[0]||(e[0]=s=>R.value=s),options:T.value,placeholder:"按学生筛选",filterable:"",clearable:"",style:{width:"170px"}},null,8,["value","options"]),i(n(V),{value:U.value,"onUpdate:value":e[1]||(e[1]=s=>U.value=s),options:E.value,placeholder:"按科目筛选",filterable:"",clearable:"",style:{width:"150px"}},null,8,["value","options"]),i(n(V),{value:H.value,"onUpdate:value":e[2]||(e[2]=s=>H.value=s),options:n(I),placeholder:"按考试类型",clearable:"",style:{width:"130px"}},null,8,["value","options"]),i(n(V),{value:L.value,"onUpdate:value":e[3]||(e[3]=s=>L.value=s),options:n($),placeholder:"按学期",clearable:"",style:{width:"170px"}},null,8,["value","options"]),i(n(j),{type:"success",onClick:e[4]||(e[4]=s=>{w.value=1,D()})},{icon:c(()=>[i(n(Z),null,{default:c(()=>[i(n(lt))]),_:1})]),default:c(()=>[e[18]||(e[18]=G(" 筛选 ",-1))]),_:1}),i(n(j),{onClick:ue},{default:c(()=>[...e[19]||(e[19]=[G("重置",-1)])]),_:1})]),i(n(ye),{columns:k,data:C.value,loading:x.value,pagination:{page:w.value,pageSize:p.value,pageSizes:[10,20,50,100],showSizePicker:!0,showQuickJumper:!0,prefix:({itemCount:s})=>`共 ${s} 条`,onChange:s=>{w.value=s,D()},onUpdatePageSize:s=>{p.value=s,w.value=1,D()}},bordered:!1,"single-line":!1,"scroll-x":900},null,8,["data","loading","pagination"])]),_:1}),i(n(et),{show:b.value,"onUpdate:show":e[13]||(e[13]=s=>b.value=s),title:S.value?"编辑成绩":"新增成绩",preset:"card",style:{width:"640px"}},{footer:c(()=>[i(n(ce),{justify:"end"},{default:c(()=>[i(n(j),{onClick:e[12]||(e[12]=s=>b.value=!1)},{default:c(()=>[...e[20]||(e[20]=[G("取消",-1)])]),_:1}),i(n(j),{type:"success",onClick:le},{default:c(()=>[...e[21]||(e[21]=[G("保存",-1)])]),_:1})]),_:1})]),default:c(()=>[i(n(ht),{ref_key:"formRef",ref:M,model:l.value,rules:g,"label-placement":"top"},{default:c(()=>[i(n(vt),{cols:2,"x-gap":16},{default:c(()=>[i(n(K),{path:"studentId",label:"学生"},{default:c(()=>[i(n(V),{value:l.value.studentId,"onUpdate:value":e[5]||(e[5]=s=>l.value.studentId=s),options:T.value,filterable:"",placeholder:"请选择学生"},null,8,["value","options"])]),_:1}),i(n(K),{path:"subjectId",label:"科目"},{default:c(()=>[i(n(V),{value:l.value.subjectId,"onUpdate:value":e[6]||(e[6]=s=>l.value.subjectId=s),options:E.value,filterable:"",placeholder:"请选择科目"},null,8,["value","options"])]),_:1}),i(n(K),{path:"examName",label:"考试名称"},{default:c(()=>[i(n(we),{value:l.value.examName,"onUpdate:value":e[7]||(e[7]=s=>l.value.examName=s),placeholder:"如：2025-2026学年第一学期期末考试"},null,8,["value"])]),_:1}),i(n(K),{path:"examType",label:"考试类型"},{default:c(()=>[i(n(V),{value:l.value.examType,"onUpdate:value":e[8]||(e[8]=s=>l.value.examType=s),options:n(I),placeholder:"请选择考试类型"},null,8,["value","options"])]),_:1}),i(n(K),{path:"examDate",label:"考试日期"},{default:c(()=>[i(n(dt),{value:l.value.examDate,"onUpdate:value":e[9]||(e[9]=s=>l.value.examDate=s),type:"date",clearable:"",style:{width:"100%"}},null,8,["value"])]),_:1}),i(n(K),{path:"score",label:"分数（0-100）"},{default:c(()=>[i(n(pt),{value:l.value.score,"onUpdate:value":e[10]||(e[10]=s=>l.value.score=s),placeholder:"0-100",min:0,max:100,style:{width:"100%"}},null,8,["value"])]),_:1}),i(n(K),{path:"comment",label:"评语（选填）",span:2},{default:c(()=>[i(n(we),{value:l.value.comment,"onUpdate:value":e[11]||(e[11]=s=>l.value.comment=s),type:"textarea",rows:2,placeholder:"选填"},null,8,["value"])]),_:1})]),_:1})]),_:1},8,["model"])]),_:1},8,["show","title"]),i(n(Ot),{show:O.value,"onUpdate:show":e[14]||(e[14]=s=>O.value=s),width:620},{default:c(()=>[i(n(Ft),{title:`${_.value} 的全部成绩（按考试日期倒序）`,closable:""},{default:c(()=>[i(n(ye),{columns:P,data:N.value,loading:d.value,bordered:!1,"single-line":!1,size:"small"},null,8,["data","loading"])]),_:1},8,["title"])]),_:1},8,["show"])]))}});export{zr as default};
