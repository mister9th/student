import{G as S,O as w,J as x,K as p,am as b,aN as g,b as I,cm as R,cx as U,cy as O,aq as P,a5 as M,bD as C,ab as z,a8 as n,bB as T,a9 as j,cE as o,cj as e,f as D,bW as y,bQ as N,ai as l,B as L,ag as V}from"../index--tRDvEJp.js";import{S as $}from"../icons/SettingsOutline-DrEh_ns-.js";import{S as E}from"../icons/SparklesOutline-Cxfd3n7t.js";import{u as F}from"../shared/use-message-CA84aL2c.js";import{N as h}from"../components/Icon-Dfkm-ERd.js";import{a as d,N as K}from"../components/FormItem-CUHxgwMo.js";import{N as f}from"../components/Input-CsR28lpI.js";import{N as k}from"../Switch-CXe2vgp_.js";import{N as A}from"../components/InputNumber-_JuVta3y.js";import"../shared/format-length-B-p6aW7q.js";import"../shared/get-CAtMqXMx.js";import"../components/Suffix-Ddx7DImh.js";import"../shared/use-locale-CZ3YHVoZ.js";import"../shared/use-merged-state-CgcFDSTr.js";import"../Add-hgf4kVu0.js";const W=S("divider",`
 position: relative;
 display: flex;
 width: 100%;
 box-sizing: border-box;
 font-size: 16px;
 color: var(--n-text-color);
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
`,[w("vertical",`
 margin-top: 24px;
 margin-bottom: 24px;
 `,[w("no-title",`
 display: flex;
 align-items: center;
 `)]),x("title",`
 display: flex;
 align-items: center;
 margin-left: 12px;
 margin-right: 12px;
 white-space: nowrap;
 font-weight: var(--n-font-weight);
 `),p("title-position-left",[x("line",[p("left",{width:"28px"})])]),p("title-position-right",[x("line",[p("right",{width:"28px"})])]),p("dashed",[x("line",`
 background-color: #0000;
 height: 0px;
 width: 100%;
 border-style: dashed;
 border-width: 1px 0 0;
 `)]),p("vertical",`
 display: inline-block;
 height: 1em;
 margin: 0 8px;
 vertical-align: middle;
 width: 1px;
 `),x("line",`
 border: none;
 transition: background-color .3s var(--n-bezier), border-color .3s var(--n-bezier);
 height: 1px;
 width: 100%;
 margin: 0;
 `),w("dashed",[x("line",{backgroundColor:"var(--n-color)"})]),p("dashed",[x("line",{borderColor:"var(--n-color)"})]),p("vertical",{backgroundColor:"var(--n-color)"})]),q=Object.assign(Object.assign({},U.props),{titlePlacement:{type:String,default:"center"},dashed:Boolean,vertical:Boolean}),_=b({name:"Divider",props:q,setup(u){const{mergedClsPrefixRef:r,inlineThemeDisabled:v}=R(u),i=U("Divider","-divider",W,P,u,r),c=M(()=>{const{common:{cubicBezierEaseInOut:s},self:{color:t,textColor:a,fontWeight:B}}=i.value;return{"--n-bezier":s,"--n-color":t,"--n-text-color":a,"--n-font-weight":B}}),m=v?O("divider",void 0,c,u):void 0;return{mergedClsPrefix:r,cssVars:v?void 0:c,themeClass:m==null?void 0:m.themeClass,onRender:m==null?void 0:m.onRender}},render(){var u;const{$slots:r,titlePlacement:v,vertical:i,dashed:c,cssVars:m,mergedClsPrefix:s}=this;return(u=this.onRender)===null||u===void 0||u.call(this),g("div",{role:"separator",class:[`${s}-divider`,this.themeClass,{[`${s}-divider--vertical`]:i,[`${s}-divider--no-title`]:!r.default,[`${s}-divider--dashed`]:c,[`${s}-divider--title-position-${v}`]:r.default&&v}],style:m},i?null:g("div",{class:`${s}-divider__line ${s}-divider__line--left`}),!i&&r.default?g(I,null,g("div",{class:`${s}-divider__title`},this.$slots),g("div",{class:`${s}-divider__line ${s}-divider__line--right`})):null)}}),G={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},H=n("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M336 176L225.2 304L176 255.8"},null,-1),J=n("path",{d:"M463.1 112.37C373.68 96.33 336.71 84.45 256 48c-80.71 36.45-117.68 48.33-207.1 64.37C32.7 369.13 240.58 457.79 256 464c15.42-6.21 223.3-94.87 207.1-351.63z",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),Q=[H,J],X=b({name:"ShieldCheckmarkOutline",render:function(r,v){return C(),z("svg",G,Q)}}),Y={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},Z=n("circle",{cx:"368",cy:"256",r:"128",fill:"none",stroke:"currentColor","stroke-linejoin":"round","stroke-width":"32"},null,-1),ee=n("rect",{x:"16",y:"128",width:"480",height:"256",rx:"128",ry:"128",fill:"none",stroke:"currentColor","stroke-linejoin":"round","stroke-width":"32"},null,-1),le=[Z,ee],te=b({name:"ToggleOutline",render:function(r,v){return C(),z("svg",Y,le)}}),ie={class:"flex items-center gap-2"},ae={class:"flex items-center gap-2 mb-4"},oe={class:"flex items-center gap-2 mb-4"},se={class:"flex items-center gap-2 mb-4"},ne={class:"flex items-center gap-2 mb-4"},Ce=b({__name:"SystemConfig",setup(u){const r=F(),v=N(!1),i=N({siteName:"AI 智慧学生管理系统",logo:"",aiProvider:"DeepSeek",aiModel:"deepseek-chat",aiApiKey:"",aiApiUrl:"https://api.deepseek.com/v1",enableRegistration:!0,enableAiChat:!0,enableRiskWarning:!0,sessionTimeout:1800,maxUploadSize:100}),c=async()=>{v.value=!0;try{const s=await y.get("/auth/config");s&&Object.assign(i.value,s)}catch{}finally{v.value=!1}},m=async()=>{try{await y.put("/auth/config",i.value),r.success("保存成功"),await c()}catch(s){r.error(s.message||"保存失败，请检查后端服务是否已启动")}};return T(c),(s,t)=>(C(),j(e(D),{class:"max-w-3xl"},{header:o(()=>[n("div",ie,[l(e(h),{size:"24",color:"#2080F0"},{default:o(()=>[l(e($))]),_:1}),t[11]||(t[11]=n("span",{class:"text-lg font-semibold"},"系统设置",-1))])]),default:o(()=>[l(e(K),{"label-placement":"left","label-width":"150"},{default:o(()=>[n("div",ae,[l(e(h),{size:"20",color:"#2080F0"},{default:o(()=>[l(e($))]),_:1}),t[12]||(t[12]=n("h3",{class:"text-lg font-semibold"},"基本设置",-1))]),l(e(d),{label:"站点名称"},{default:o(()=>[l(e(f),{value:i.value.siteName,"onUpdate:value":t[0]||(t[0]=a=>i.value.siteName=a)},null,8,["value"])]),_:1}),l(e(d),{label:"站点Logo"},{default:o(()=>[l(e(f),{value:i.value.logo,"onUpdate:value":t[1]||(t[1]=a=>i.value.logo=a),placeholder:"Logo URL"},null,8,["value"])]),_:1}),l(e(_)),n("div",oe,[l(e(h),{size:"20",color:"#7C3AED"},{default:o(()=>[l(e(E))]),_:1}),t[13]||(t[13]=n("h3",{class:"text-lg font-semibold"},"AI 设置",-1))]),l(e(d),{label:"AI 提供商"},{default:o(()=>[l(e(f),{value:i.value.aiProvider,"onUpdate:value":t[2]||(t[2]=a=>i.value.aiProvider=a),disabled:""},null,8,["value"])]),_:1}),l(e(d),{label:"AI 模型"},{default:o(()=>[l(e(f),{value:i.value.aiModel,"onUpdate:value":t[3]||(t[3]=a=>i.value.aiModel=a)},null,8,["value"])]),_:1}),l(e(d),{label:"API Key"},{default:o(()=>[l(e(f),{value:i.value.aiApiKey,"onUpdate:value":t[4]||(t[4]=a=>i.value.aiApiKey=a),type:"password","show-password-on":"click",placeholder:"sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"},null,8,["value"])]),_:1}),l(e(d),{label:"API 地址"},{default:o(()=>[l(e(f),{value:i.value.aiApiUrl,"onUpdate:value":t[5]||(t[5]=a=>i.value.aiApiUrl=a),placeholder:"https://api.deepseek.com/v1"},null,8,["value"])]),_:1}),l(e(_)),n("div",se,[l(e(h),{size:"20",color:"#18A058"},{default:o(()=>[l(e(te))]),_:1}),t[14]||(t[14]=n("h3",{class:"text-lg font-semibold"},"功能开关",-1))]),l(e(d),{label:"开放注册"},{default:o(()=>[l(e(k),{value:i.value.enableRegistration,"onUpdate:value":t[6]||(t[6]=a=>i.value.enableRegistration=a)},null,8,["value"])]),_:1}),l(e(d),{label:"AI 智能问答"},{default:o(()=>[l(e(k),{value:i.value.enableAiChat,"onUpdate:value":t[7]||(t[7]=a=>i.value.enableAiChat=a)},null,8,["value"])]),_:1}),l(e(d),{label:"AI 风险预警"},{default:o(()=>[l(e(k),{value:i.value.enableRiskWarning,"onUpdate:value":t[8]||(t[8]=a=>i.value.enableRiskWarning=a)},null,8,["value"])]),_:1}),l(e(_)),n("div",ne,[l(e(h),{size:"20",color:"#D03050"},{default:o(()=>[l(e(X))]),_:1}),t[15]||(t[15]=n("h3",{class:"text-lg font-semibold"},"安全设置",-1))]),l(e(d),{label:"Session 超时(秒)"},{default:o(()=>[l(e(A),{value:i.value.sessionTimeout,"onUpdate:value":t[9]||(t[9]=a=>i.value.sessionTimeout=a),min:60,max:86400},null,8,["value"])]),_:1}),l(e(d),{label:"最大上传(MB)"},{default:o(()=>[l(e(A),{value:i.value.maxUploadSize,"onUpdate:value":t[10]||(t[10]=a=>i.value.maxUploadSize=a),min:1,max:1024},null,8,["value"])]),_:1}),l(e(L),{type:"success",onClick:m,class:"mt-4"},{default:o(()=>[...t[16]||(t[16]=[V("保存配置",-1)])]),_:1})]),_:1})]),_:1}))}});export{Ce as default};
