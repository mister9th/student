import{G as ee,O as j,J as l,K as b,ak as D,aK as c,b as $e,c9 as re,ck as K,cl as se,ao as Re,a5 as O,am as ze,a3 as Be,Q as Ve,aN as oe,D as X,b6 as Y,bS as R,h as Ne,e as Ae,cb as Ue,bG as T,P as q,ad as z,bC as J,al as w,c1 as Fe,bt as te,aa as de,a7 as m,br as Pe,a8 as Oe,cr as u,c6 as o,f as je,bM as ae,ah as a,B as Te,af as De}from"../index-Dze7ZNIq.js";import{S as le}from"../icons/SettingsOutline-7TdUjakJ.js";import{S as Ie}from"../icons/SparklesOutline-DxiWKmE-.js";import{u as Me}from"../shared/use-merged-state-BJ1Kz0TI.js";import{u as Ke}from"../shared/use-message-Bw3fMj-Z.js";import{N as F}from"../components/Icon-CYVO1TUn.js";import{a as p,N as We}from"../components/FormItem-yRC5rO7n.js";import{N}from"../components/Input-DmbZvjy0.js";import{N as ne}from"../components/InputNumber-CrhFHuNw.js";import"../shared/format-length-B-p6aW7q.js";import"../shared/get-Chytv-Fl.js";import"../components/Suffix-DKrXHKlx.js";import"../shared/use-locale-DTJrW513.js";import"../Add-D45qcJFE.js";const Le=ee("divider",`
 position: relative;
 display: flex;
 width: 100%;
 box-sizing: border-box;
 font-size: 16px;
 color: var(--n-text-color);
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
`,[j("vertical",`
 margin-top: 24px;
 margin-bottom: 24px;
 `,[j("no-title",`
 display: flex;
 align-items: center;
 `)]),l("title",`
 display: flex;
 align-items: center;
 margin-left: 12px;
 margin-right: 12px;
 white-space: nowrap;
 font-weight: var(--n-font-weight);
 `),b("title-position-left",[l("line",[b("left",{width:"28px"})])]),b("title-position-right",[l("line",[b("right",{width:"28px"})])]),b("dashed",[l("line",`
 background-color: #0000;
 height: 0px;
 width: 100%;
 border-style: dashed;
 border-width: 1px 0 0;
 `)]),b("vertical",`
 display: inline-block;
 height: 1em;
 margin: 0 8px;
 vertical-align: middle;
 width: 1px;
 `),l("line",`
 border: none;
 transition: background-color .3s var(--n-bezier), border-color .3s var(--n-bezier);
 height: 1px;
 width: 100%;
 margin: 0;
 `),j("dashed",[l("line",{backgroundColor:"var(--n-color)"})]),b("dashed",[l("line",{borderColor:"var(--n-color)"})]),b("vertical",{backgroundColor:"var(--n-color)"})]),Ee=Object.assign(Object.assign({},K.props),{titlePlacement:{type:String,default:"center"},dashed:Boolean,vertical:Boolean}),Q=D({name:"Divider",props:Ee,setup(e){const{mergedClsPrefixRef:d,inlineThemeDisabled:h}=re(e),i=K("Divider","-divider",Le,Re,e,d),g=O(()=>{const{common:{cubicBezierEaseInOut:s},self:{color:t,textColor:n,fontWeight:B}}=i.value;return{"--n-bezier":s,"--n-color":t,"--n-text-color":n,"--n-font-weight":B}}),v=h?se("divider",void 0,g,e):void 0;return{mergedClsPrefix:d,cssVars:h?void 0:g,themeClass:v==null?void 0:v.themeClass,onRender:v==null?void 0:v.onRender}},render(){var e;const{$slots:d,titlePlacement:h,vertical:i,dashed:g,cssVars:v,mergedClsPrefix:s}=this;return(e=this.onRender)===null||e===void 0||e.call(this),c("div",{role:"separator",class:[`${s}-divider`,this.themeClass,{[`${s}-divider--vertical`]:i,[`${s}-divider--no-title`]:!d.default,[`${s}-divider--dashed`]:g,[`${s}-divider--title-position-${h}`]:d.default&&h}],style:v},i?null:c("div",{class:`${s}-divider__line ${s}-divider__line--left`}),!i&&d.default?c($e,null,c("div",{class:`${s}-divider__title`},this.$slots),c("div",{class:`${s}-divider__line ${s}-divider__line--right`})):null)}});function He(e){const{primaryColor:d,opacityDisabled:h,borderRadius:i,textColor3:g}=e;return Object.assign(Object.assign({},Be),{iconColor:g,textColor:"white",loadingColor:d,opacityDisabled:h,railColor:"rgba(0, 0, 0, .14)",railColorActive:d,buttonBoxShadow:"0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)",buttonColor:"#FFF",railBorderRadiusSmall:i,railBorderRadiusMedium:i,railBorderRadiusLarge:i,buttonBorderRadiusSmall:i,buttonBorderRadiusMedium:i,buttonBorderRadiusLarge:i,boxShadowFocus:`0 0 0 2px ${Ve(d,{alpha:.2})}`})}const Ge={common:ze,self:He},Xe=ee("switch",`
 height: var(--n-height);
 min-width: var(--n-width);
 vertical-align: middle;
 user-select: none;
 -webkit-user-select: none;
 display: inline-flex;
 outline: none;
 justify-content: center;
 align-items: center;
`,[l("children-placeholder",`
 height: var(--n-rail-height);
 display: flex;
 flex-direction: column;
 overflow: hidden;
 pointer-events: none;
 visibility: hidden;
 `),l("rail-placeholder",`
 display: flex;
 flex-wrap: none;
 `),l("button-placeholder",`
 width: calc(1.75 * var(--n-rail-height));
 height: var(--n-rail-height);
 `),ee("base-loading",`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 font-size: calc(var(--n-button-width) - 4px);
 color: var(--n-loading-color);
 transition: color .3s var(--n-bezier);
 `,[oe({left:"50%",top:"50%",originalTransform:"translateX(-50%) translateY(-50%)"})]),l("checked, unchecked",`
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 box-sizing: border-box;
 position: absolute;
 white-space: nowrap;
 top: 0;
 bottom: 0;
 display: flex;
 align-items: center;
 line-height: 1;
 `),l("checked",`
 right: 0;
 padding-right: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),l("unchecked",`
 left: 0;
 justify-content: flex-end;
 padding-left: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `),X("&:focus",[l("rail",`
 box-shadow: var(--n-box-shadow-focus);
 `)]),b("round",[l("rail","border-radius: calc(var(--n-rail-height) / 2);",[l("button","border-radius: calc(var(--n-button-height) / 2);")])]),j("disabled",[j("icon",[b("rubber-band",[b("pressed",[l("rail",[l("button","max-width: var(--n-button-width-pressed);")])]),l("rail",[X("&:active",[l("button","max-width: var(--n-button-width-pressed);")])]),b("active",[b("pressed",[l("rail",[l("button","left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));")])]),l("rail",[X("&:active",[l("button","left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));")])])])])])]),b("active",[l("rail",[l("button","left: calc(100% - var(--n-button-width) - var(--n-offset))")])]),l("rail",`
 overflow: hidden;
 height: var(--n-rail-height);
 min-width: var(--n-rail-width);
 border-radius: var(--n-rail-border-radius);
 cursor: pointer;
 position: relative;
 transition:
 opacity .3s var(--n-bezier),
 background .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-rail-color);
 `,[l("button-icon",`
 color: var(--n-icon-color);
 transition: color .3s var(--n-bezier);
 font-size: calc(var(--n-button-height) - 4px);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 display: flex;
 justify-content: center;
 align-items: center;
 line-height: 1;
 `,[oe()]),l("button",`
 align-items: center; 
 top: var(--n-offset);
 left: var(--n-offset);
 height: var(--n-button-height);
 width: var(--n-button-width-pressed);
 max-width: var(--n-button-width);
 border-radius: var(--n-button-border-radius);
 background-color: var(--n-button-color);
 box-shadow: var(--n-button-box-shadow);
 box-sizing: border-box;
 cursor: inherit;
 content: "";
 position: absolute;
 transition:
 background-color .3s var(--n-bezier),
 left .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 max-width .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 `)]),b("active",[l("rail","background-color: var(--n-rail-color-active);")]),b("loading",[l("rail",`
 cursor: wait;
 `)]),b("disabled",[l("rail",`
 cursor: not-allowed;
 opacity: .5;
 `)])]),Ye=Object.assign(Object.assign({},K.props),{size:String,value:{type:[String,Number,Boolean],default:void 0},loading:Boolean,defaultValue:{type:[String,Number,Boolean],default:!1},disabled:{type:Boolean,default:void 0},round:{type:Boolean,default:!0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],checkedValue:{type:[String,Number,Boolean],default:!0},uncheckedValue:{type:[String,Number,Boolean],default:!1},railStyle:Function,rubberBand:{type:Boolean,default:!0},spinProps:Object,onChange:[Function,Array]});let P;const Z=D({name:"Switch",props:Ye,slots:Object,setup(e){P===void 0&&(typeof CSS<"u"?typeof CSS.supports<"u"?P=CSS.supports("width","max(1px)"):P=!1:P=!0);const{mergedClsPrefixRef:d,inlineThemeDisabled:h,mergedComponentPropsRef:i}=re(e),g=K("Switch","-switch",Xe,Ge,e,d),v=Ue(e,{mergedSize(r){var k,y;if(e.size!==void 0)return e.size;if(r)return r.mergedSize.value;const $=(y=(k=i==null?void 0:i.value)===null||k===void 0?void 0:k.Switch)===null||y===void 0?void 0:y.size;return $||"medium"}}),{mergedSizeRef:s,mergedDisabledRef:t}=v,n=T(e.defaultValue),B=Fe(e,"value"),S=Me(B,n),I=O(()=>S.value===e.checkedValue),f=T(!1),x=T(!1),A=O(()=>{const{railStyle:r}=e;if(r)return r({focused:x.value,checked:I.value})});function M(r){const{"onUpdate:value":k,onChange:y,onUpdateValue:$}=e,{nTriggerFormInput:W,nTriggerFormChange:L}=v;k&&q(k,r),$&&q($,r),y&&q(y,r),n.value=r,W(),L()}function ue(){const{nTriggerFormFocus:r}=v;r()}function ce(){const{nTriggerFormBlur:r}=v;r()}function he(){e.loading||t.value||(S.value!==e.checkedValue?M(e.checkedValue):M(e.uncheckedValue))}function ve(){x.value=!0,ue()}function fe(){x.value=!1,ce(),f.value=!1}function be(r){e.loading||t.value||r.key===" "&&(S.value!==e.checkedValue?M(e.checkedValue):M(e.uncheckedValue),f.value=!1)}function ge(r){e.loading||t.value||r.key===" "&&(r.preventDefault(),f.value=!0)}const ie=O(()=>{const{value:r}=s,{self:{opacityDisabled:k,railColor:y,railColorActive:$,buttonBoxShadow:W,buttonColor:L,boxShadowFocus:me,loadingColor:pe,textColor:xe,iconColor:we,[z("buttonHeight",r)]:C,[z("buttonWidth",r)]:ke,[z("buttonWidthPressed",r)]:ye,[z("railHeight",r)]:_,[z("railWidth",r)]:U,[z("railBorderRadius",r)]:Ce,[z("buttonBorderRadius",r)]:_e},common:{cubicBezierEaseInOut:Se}}=g.value;let E,H,G;return P?(E=`calc((${_} - ${C}) / 2)`,H=`max(${_}, ${C})`,G=`max(${U}, calc(${U} + ${C} - ${_}))`):(E=J((w(_)-w(C))/2),H=J(Math.max(w(_),w(C))),G=w(_)>w(C)?U:J(w(U)+w(C)-w(_))),{"--n-bezier":Se,"--n-button-border-radius":_e,"--n-button-box-shadow":W,"--n-button-color":L,"--n-button-width":ke,"--n-button-width-pressed":ye,"--n-button-height":C,"--n-height":H,"--n-offset":E,"--n-opacity-disabled":k,"--n-rail-border-radius":Ce,"--n-rail-color":y,"--n-rail-color-active":$,"--n-rail-height":_,"--n-rail-width":U,"--n-width":G,"--n-box-shadow-focus":me,"--n-loading-color":pe,"--n-text-color":xe,"--n-icon-color":we}}),V=h?se("switch",O(()=>s.value[0]),ie,e):void 0;return{handleClick:he,handleBlur:fe,handleFocus:ve,handleKeyup:be,handleKeydown:ge,mergedRailStyle:A,pressed:f,mergedClsPrefix:d,mergedValue:S,checked:I,mergedDisabled:t,cssVars:h?void 0:ie,themeClass:V==null?void 0:V.themeClass,onRender:V==null?void 0:V.onRender}},render(){const{mergedClsPrefix:e,mergedDisabled:d,checked:h,mergedRailStyle:i,onRender:g,$slots:v}=this;g==null||g();const{checked:s,unchecked:t,icon:n,"checked-icon":B,"unchecked-icon":S}=v,I=!(Y(n)&&Y(B)&&Y(S));return c("div",{role:"switch","aria-checked":h,class:[`${e}-switch`,this.themeClass,I&&`${e}-switch--icon`,h&&`${e}-switch--active`,d&&`${e}-switch--disabled`,this.round&&`${e}-switch--round`,this.loading&&`${e}-switch--loading`,this.pressed&&`${e}-switch--pressed`,this.rubberBand&&`${e}-switch--rubber-band`],tabindex:this.mergedDisabled?void 0:0,style:this.cssVars,onClick:this.handleClick,onFocus:this.handleFocus,onBlur:this.handleBlur,onKeyup:this.handleKeyup,onKeydown:this.handleKeydown},c("div",{class:`${e}-switch__rail`,"aria-hidden":"true",style:i},R(s,f=>R(t,x=>f||x?c("div",{"aria-hidden":!0,class:`${e}-switch__children-placeholder`},c("div",{class:`${e}-switch__rail-placeholder`},c("div",{class:`${e}-switch__button-placeholder`}),f),c("div",{class:`${e}-switch__rail-placeholder`},c("div",{class:`${e}-switch__button-placeholder`}),x)):null)),c("div",{class:`${e}-switch__button`},R(n,f=>R(B,x=>R(S,A=>c(Ne,null,{default:()=>this.loading?c(Ae,Object.assign({key:"loading",clsPrefix:e,strokeWidth:20},this.spinProps)):this.checked&&(x||f)?c("div",{class:`${e}-switch__button-icon`,key:x?"checked-icon":"icon"},x||f):!this.checked&&(A||f)?c("div",{class:`${e}-switch__button-icon`,key:A?"unchecked-icon":"icon"},A||f):null})))),R(s,f=>f&&c("div",{key:"checked",class:`${e}-switch__checked`},f)),R(t,f=>f&&c("div",{key:"unchecked",class:`${e}-switch__unchecked`},f)))))}}),qe={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},Je=m("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M336 176L225.2 304L176 255.8"},null,-1),Qe=m("path",{d:"M463.1 112.37C373.68 96.33 336.71 84.45 256 48c-80.71 36.45-117.68 48.33-207.1 64.37C32.7 369.13 240.58 457.79 256 464c15.42-6.21 223.3-94.87 207.1-351.63z",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),Ze=[Je,Qe],et=D({name:"ShieldCheckmarkOutline",render:function(d,h){return te(),de("svg",qe,Ze)}}),tt={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},it=m("circle",{cx:"368",cy:"256",r:"128",fill:"none",stroke:"currentColor","stroke-linejoin":"round","stroke-width":"32"},null,-1),ot=m("rect",{x:"16",y:"128",width:"480",height:"256",rx:"128",ry:"128",fill:"none",stroke:"currentColor","stroke-linejoin":"round","stroke-width":"32"},null,-1),at=[it,ot],lt=D({name:"ToggleOutline",render:function(d,h){return te(),de("svg",tt,at)}}),nt={class:"flex items-center gap-2"},rt={class:"flex items-center gap-2 mb-4"},st={class:"flex items-center gap-2 mb-4"},dt={class:"flex items-center gap-2 mb-4"},ut={class:"flex items-center gap-2 mb-4"},St=D({__name:"SystemConfig",setup(e){const d=Ke(),h=T(!1),i=T({siteName:"AI 智慧学生管理系统",logo:"",aiProvider:"DeepSeek",aiModel:"deepseek-chat",aiApiKey:"",aiApiUrl:"https://api.deepseek.com/v1",enableRegistration:!0,enableAiChat:!0,enableRiskWarning:!0,sessionTimeout:1800,maxUploadSize:100}),g=async()=>{h.value=!0;try{const s=await ae.get("/auth/config");s&&Object.assign(i.value,s)}catch{}finally{h.value=!1}},v=async()=>{try{await ae.put("/auth/config",i.value),d.success("保存成功"),await g()}catch(s){d.error(s.message||"保存失败，请检查后端服务是否已启动")}};return Pe(g),(s,t)=>(te(),Oe(o(je),{class:"max-w-3xl"},{header:u(()=>[m("div",nt,[a(o(F),{size:"24",color:"#2080F0"},{default:u(()=>[a(o(le))]),_:1}),t[11]||(t[11]=m("span",{class:"text-lg font-semibold"},"系统设置",-1))])]),default:u(()=>[a(o(We),{"label-placement":"left","label-width":"150"},{default:u(()=>[m("div",rt,[a(o(F),{size:"20",color:"#2080F0"},{default:u(()=>[a(o(le))]),_:1}),t[12]||(t[12]=m("h3",{class:"text-lg font-semibold"},"基本设置",-1))]),a(o(p),{label:"站点名称"},{default:u(()=>[a(o(N),{value:i.value.siteName,"onUpdate:value":t[0]||(t[0]=n=>i.value.siteName=n)},null,8,["value"])]),_:1}),a(o(p),{label:"站点Logo"},{default:u(()=>[a(o(N),{value:i.value.logo,"onUpdate:value":t[1]||(t[1]=n=>i.value.logo=n),placeholder:"Logo URL"},null,8,["value"])]),_:1}),a(o(Q)),m("div",st,[a(o(F),{size:"20",color:"#7C3AED"},{default:u(()=>[a(o(Ie))]),_:1}),t[13]||(t[13]=m("h3",{class:"text-lg font-semibold"},"AI 设置",-1))]),a(o(p),{label:"AI 提供商"},{default:u(()=>[a(o(N),{value:i.value.aiProvider,"onUpdate:value":t[2]||(t[2]=n=>i.value.aiProvider=n),disabled:""},null,8,["value"])]),_:1}),a(o(p),{label:"AI 模型"},{default:u(()=>[a(o(N),{value:i.value.aiModel,"onUpdate:value":t[3]||(t[3]=n=>i.value.aiModel=n)},null,8,["value"])]),_:1}),a(o(p),{label:"API Key"},{default:u(()=>[a(o(N),{value:i.value.aiApiKey,"onUpdate:value":t[4]||(t[4]=n=>i.value.aiApiKey=n),type:"password","show-password-on":"click",placeholder:"sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"},null,8,["value"])]),_:1}),a(o(p),{label:"API 地址"},{default:u(()=>[a(o(N),{value:i.value.aiApiUrl,"onUpdate:value":t[5]||(t[5]=n=>i.value.aiApiUrl=n),placeholder:"https://api.deepseek.com/v1"},null,8,["value"])]),_:1}),a(o(Q)),m("div",dt,[a(o(F),{size:"20",color:"#18A058"},{default:u(()=>[a(o(lt))]),_:1}),t[14]||(t[14]=m("h3",{class:"text-lg font-semibold"},"功能开关",-1))]),a(o(p),{label:"开放注册"},{default:u(()=>[a(o(Z),{value:i.value.enableRegistration,"onUpdate:value":t[6]||(t[6]=n=>i.value.enableRegistration=n)},null,8,["value"])]),_:1}),a(o(p),{label:"AI 智能问答"},{default:u(()=>[a(o(Z),{value:i.value.enableAiChat,"onUpdate:value":t[7]||(t[7]=n=>i.value.enableAiChat=n)},null,8,["value"])]),_:1}),a(o(p),{label:"AI 风险预警"},{default:u(()=>[a(o(Z),{value:i.value.enableRiskWarning,"onUpdate:value":t[8]||(t[8]=n=>i.value.enableRiskWarning=n)},null,8,["value"])]),_:1}),a(o(Q)),m("div",ut,[a(o(F),{size:"20",color:"#D03050"},{default:u(()=>[a(o(et))]),_:1}),t[15]||(t[15]=m("h3",{class:"text-lg font-semibold"},"安全设置",-1))]),a(o(p),{label:"Session 超时(秒)"},{default:u(()=>[a(o(ne),{value:i.value.sessionTimeout,"onUpdate:value":t[9]||(t[9]=n=>i.value.sessionTimeout=n),min:60,max:86400},null,8,["value"])]),_:1}),a(o(p),{label:"最大上传(MB)"},{default:u(()=>[a(o(ne),{value:i.value.maxUploadSize,"onUpdate:value":t[10]||(t[10]=n=>i.value.maxUploadSize=n),min:1,max:1024},null,8,["value"])]),_:1}),a(o(Te),{type:"success",onClick:v,class:"mt-4"},{default:u(()=>[...t[16]||(t[16]=[De("保存配置",-1)])]),_:1})]),_:1})]),_:1}))}});export{St as default};
