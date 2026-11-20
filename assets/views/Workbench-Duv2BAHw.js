import{b4 as ie,aq as ne,cb as oe,H as d,O as T,G as L,K as v,ao as R,cs as Y,cF as Z,aS as _,af as se,bQ as le,c5 as W,c3 as M,cg as re,cG as ae,a7 as H,aX as ce,ag as B,bI as p,ad as I,aa as t,cr as de,cH as me,bG as ue,cj as h,cp as e,ak as i,cM as n,bV as g,b$ as G,f as x,ab as k,b as K,bX as q,ai as X,ac as fe,cB as ve}from"../index-CbGdLzDn.js";import{d as pe}from"../shared/ai-BSD-4mtR.js";import{N as Q,_ as $}from"../components/Grid-i9wjVEKL.js";import{N as O}from"../components/Statistic-v_s19bLq.js";import{P as ge}from"../icons/PeopleOutline-BNh6xPgG.js";import{P as he}from"../icons/PersonOutline-DCp330GD.js";import{B as xe}from"../icons/BookOutline-DrWtGI75.js";import{S as be}from"../icons/SchoolOutline-BkHDFwCB.js";import{A as _e}from"../icons/AnalyticsOutline-CbHg5FJg.js";import{N as ye}from"../components/Spin-YTvxDJi1.js";import{A as D}from"../icons/AlertCircleOutline-C0L6JG6H.js";import{N as E}from"../components/Empty-_Wx-nN5S.js";import{N as ze}from"../components/Tag-CVfJIDNY.js";import{f as Ce}from"../shared/format-length-B-p6aW7q.js";import{L as ke}from"../icons/ListOutline-D7wDqeaa.js";import{N as b}from"../components/Icon-dLEsHIkO.js";import"../components/get-slot-Bk_rJcZu.js";import"../components/next-frame-once-C5Ksf8W7.js";import"../shared/use-locale-Ba2e3Nfp.js";let J=!1;function we(){if(ie&&window.CSS&&!J&&(J=!0,"registerProperty"in(window==null?void 0:window.CSS)))try{CSS.registerProperty({name:"--n-color-start",syntax:"<color>",inherits:!1,initialValue:"#0000"}),CSS.registerProperty({name:"--n-color-end",syntax:"<color>",inherits:!1,initialValue:"#0000"})}catch{}}function Se(s){const{textColor3:a,infoColor:m,errorColor:c,successColor:l,warningColor:f,textColor1:y,textColor2:z,railColor:C,fontWeightStrong:w,fontSize:S}=s;return Object.assign(Object.assign({},oe),{contentFontSize:S,titleFontWeight:w,circleBorder:`2px solid ${a}`,circleBorderInfo:`2px solid ${m}`,circleBorderError:`2px solid ${c}`,circleBorderSuccess:`2px solid ${l}`,circleBorderWarning:`2px solid ${f}`,iconColor:a,iconColorInfo:m,iconColorError:c,iconColorSuccess:l,iconColorWarning:f,titleTextColor:y,contentTextColor:z,metaTextColor:a,lineColor:C})}const $e={common:ne,self:Se},U=1.25,Ne=d("timeline",`
 position: relative;
 width: 100%;
 display: flex;
 flex-direction: column;
 line-height: ${U};
`,[T("horizontal",`
 flex-direction: row;
 `,[L(">",[d("timeline-item",`
 flex-shrink: 0;
 padding-right: 40px;
 `,[T("dashed-line-type",[L(">",[d("timeline-item-timeline",[v("line",`
 background-image: linear-gradient(90deg, var(--n-color-start), var(--n-color-start) 50%, transparent 50%, transparent 100%);
 background-size: 10px 1px;
 `)])])]),L(">",[d("timeline-item-content",`
 margin-top: calc(var(--n-icon-size) + 12px);
 `,[L(">",[v("meta",`
 margin-top: 6px;
 margin-bottom: unset;
 `)])]),d("timeline-item-timeline",`
 width: 100%;
 height: calc(var(--n-icon-size) + 12px);
 `,[v("line",`
 left: var(--n-icon-size);
 top: calc(var(--n-icon-size) / 2 - 1px);
 right: 0px;
 width: unset;
 height: 2px;
 `)])])])])]),T("right-placement",[d("timeline-item",[d("timeline-item-content",`
 text-align: right;
 margin-right: calc(var(--n-icon-size) + 12px);
 `),d("timeline-item-timeline",`
 width: var(--n-icon-size);
 right: 0;
 `)])]),T("left-placement",[d("timeline-item",[d("timeline-item-content",`
 margin-left: calc(var(--n-icon-size) + 12px);
 `),d("timeline-item-timeline",`
 left: 0;
 `)])]),d("timeline-item",`
 position: relative;
 `,[L("&:last-child",[d("timeline-item-timeline",[v("line",`
 display: none;
 `)]),d("timeline-item-content",[v("meta",`
 margin-bottom: 0;
 `)])]),d("timeline-item-content",[v("title",`
 margin: var(--n-title-margin);
 font-size: var(--n-title-font-size);
 transition: color .3s var(--n-bezier);
 font-weight: var(--n-title-font-weight);
 color: var(--n-title-text-color);
 `),v("content",`
 transition: color .3s var(--n-bezier);
 font-size: var(--n-content-font-size);
 color: var(--n-content-text-color);
 `),v("meta",`
 transition: color .3s var(--n-bezier);
 font-size: 12px;
 margin-top: 6px;
 margin-bottom: 20px;
 color: var(--n-meta-text-color);
 `)]),T("dashed-line-type",[d("timeline-item-timeline",[v("line",`
 --n-color-start: var(--n-line-color);
 transition: --n-color-start .3s var(--n-bezier);
 background-color: transparent;
 background-image: linear-gradient(180deg, var(--n-color-start), var(--n-color-start) 50%, transparent 50%, transparent 100%);
 background-size: 1px 10px;
 `)])]),d("timeline-item-timeline",`
 width: calc(var(--n-icon-size) + 12px);
 position: absolute;
 top: calc(var(--n-title-font-size) * ${U} / 2 - var(--n-icon-size) / 2);
 height: 100%;
 `,[v("circle",`
 border: var(--n-circle-border);
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 width: var(--n-icon-size);
 height: var(--n-icon-size);
 border-radius: var(--n-icon-size);
 box-sizing: border-box;
 `),v("icon",`
 color: var(--n-icon-color);
 font-size: var(--n-icon-size);
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 display: flex;
 align-items: center;
 justify-content: center;
 `),v("line",`
 transition: background-color .3s var(--n-bezier);
 position: absolute;
 top: var(--n-icon-size);
 left: calc(var(--n-icon-size) / 2 - 1px);
 bottom: 0px;
 width: 2px;
 background-color: var(--n-line-color);
 `)])])]),Te=Object.assign(Object.assign({},Z.props),{horizontal:Boolean,itemPlacement:{type:String,default:"left"},size:{type:String,default:"medium"},iconSize:Number}),ee=se("n-timeline"),Le=R({name:"Timeline",props:Te,setup(s,{slots:a}){const{mergedClsPrefixRef:m}=Y(s),c=Z("Timeline","-timeline",Ne,$e,s,m);return le(ee,{props:s,mergedThemeRef:c,mergedClsPrefixRef:m}),()=>{const{value:l}=m;return _("div",{class:[`${l}-timeline`,s.horizontal&&`${l}-timeline--horizontal`,`${l}-timeline--${s.size}-size`,!s.horizontal&&`${l}-timeline--${s.itemPlacement}-placement`]},a)}}}),Be={time:[String,Number],title:String,content:String,color:String,lineType:{type:String,default:"default"},type:{type:String,default:"default"}},Ie=R({name:"TimelineItem",props:Be,slots:Object,setup(s){const a=ce(ee);a||re("timeline-item","`n-timeline-item` must be placed inside `n-timeline`."),we();const{inlineThemeDisabled:m}=Y(),c=H(()=>{const{props:{size:f,iconSize:y},mergedThemeRef:z}=a,{type:C}=s,{self:{titleTextColor:w,contentTextColor:S,metaTextColor:P,lineColor:j,titleFontWeight:N,contentFontSize:F,[B("iconSize",f)]:V,[B("titleMargin",f)]:u,[B("titleFontSize",f)]:o,[B("circleBorder",C)]:A,[B("iconColor",C)]:r},common:{cubicBezierEaseInOut:te}}=z.value;return{"--n-bezier":te,"--n-circle-border":A,"--n-icon-color":r,"--n-content-font-size":F,"--n-content-text-color":S,"--n-line-color":j,"--n-meta-text-color":P,"--n-title-font-size":o,"--n-title-font-weight":N,"--n-title-margin":u,"--n-title-text-color":w,"--n-icon-size":Ce(y)||V}}),l=m?ae("timeline-item",H(()=>{const{props:{size:f,iconSize:y}}=a,{type:z}=s;return`${f[0]}${y||"a"}${z[0]}`}),c,a.props):void 0;return{mergedClsPrefix:a.mergedClsPrefixRef,cssVars:m?void 0:c,themeClass:l==null?void 0:l.themeClass,onRender:l==null?void 0:l.onRender}},render(){const{mergedClsPrefix:s,color:a,onRender:m,$slots:c}=this;return m==null||m(),_("div",{class:[`${s}-timeline-item`,this.themeClass,`${s}-timeline-item--${this.type}-type`,`${s}-timeline-item--${this.lineType}-line-type`],style:this.cssVars},_("div",{class:`${s}-timeline-item-timeline`},_("div",{class:`${s}-timeline-item-timeline__line`}),W(c.icon,l=>l?_("div",{class:`${s}-timeline-item-timeline__icon`,style:{color:a}},l):_("div",{class:`${s}-timeline-item-timeline__circle`,style:{borderColor:a}}))),_("div",{class:`${s}-timeline-item-content`},W(c.header,l=>l||this.title?_("div",{class:`${s}-timeline-item-content__title`},l||this.title):null),_("div",{class:`${s}-timeline-item-content__content`},M(c.default,()=>[this.content])),_("div",{class:`${s}-timeline-item-content__meta`},M(c.footer,()=>[this.time]))))}}),Pe={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},je=t("path",{d:"M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192s192-86 192-192z",fill:"none",stroke:"currentColor","stroke-miterlimit":"10","stroke-width":"32"},null,-1),Ae=t("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M352 176L217.6 336L160 272"},null,-1),Oe=[je,Ae],Re=R({name:"CheckmarkCircleOutline",render:function(a,m){return p(),I("svg",Pe,Oe)}}),Fe={class:"mb-6"},Ve={class:"text-2xl font-bold"},De={class:"text-gray-500 mt-1"},Ee={class:"flex items-center justify-between"},We={class:"flex items-center justify-between"},Me={class:"flex items-center justify-between"},He={class:"flex items-center justify-between"},Ge={class:"flex items-center gap-2"},Ke={class:"grid grid-cols-2 gap-4"},qe={class:"bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4"},Xe={class:"text-2xl font-bold text-blue-600"},Qe={class:"bg-green-50 dark:bg-green-900/20 rounded-xl p-4"},Je={class:"text-2xl font-bold text-green-600"},Ue={class:"bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4"},Ye={class:"text-2xl font-bold text-orange-600"},Ze={class:"bg-red-50 dark:bg-red-900/20 rounded-xl p-4"},et={class:"text-2xl font-bold text-red-600"},tt={class:"flex items-center gap-2"},it={class:"flex items-center gap-3 py-4"},nt={class:"flex items-center gap-2"},ot={class:"flex items-center gap-2"},st={class:"font-medium"},lt={class:"text-sm text-gray-500 ml-2"},rt={class:"flex items-center gap-2"},at={class:"flex items-center gap-2"},ct={class:"flex items-center gap-2"},Tt=R({__name:"Workbench",setup(s){const a=ve(),m=de();me();const c=g(null),l=g(!1),f=g(!1),y=g(0),z=g(0),C=g(0),w=g(0),S=g(0),P=g(0),j=g(0),N=g([]),F=async()=>{try{const u=await G.get("/user/dashboard/stats");y.value=u.studentCount||0,z.value=u.teacherCount||0,C.value=u.courseCount||0,w.value=u.classCount||0,S.value=u.todayLogins||0,P.value=u.activeTeachers||0,j.value=u.onlineStudents||0}catch{}},V=async()=>{try{N.value=await G.get("/user/dashboard/activities")||[]}catch{}};return ue(async()=>{await Promise.all([F(),V()]),f.value=!0,pe().then(u=>{c.value=u,l.value=!1}).catch(()=>{l.value=!0}).finally(()=>{f.value=!1})}),(u,o)=>{var A;return p(),I("div",null,[t("div",Fe,[t("h2",Ve,h((A=e(m).userInfo)==null?void 0:A.realName)+"，欢迎回来！",1),t("p",De,"今天是 "+h(new Date().toLocaleDateString("zh-CN",{year:"numeric",month:"long",day:"numeric",weekday:"long"})),1)]),i(e(Q),{cols:4,"x-gap":16,"y-gap":16,class:"mb-6"},{default:n(()=>[i(e($),null,{default:n(()=>[i(e(x),{bordered:!0,class:"hover:shadow-lg transition-shadow cursor-pointer",onClick:o[0]||(o[0]=r=>e(a).push("/student"))},{default:n(()=>[t("div",Ee,[t("div",null,[i(e(O),{title:"学生总数",value:y.value.toLocaleString()},null,8,["value"])]),i(e(b),{size:"36",color:"#2080F0"},{default:n(()=>[i(e(ge))]),_:1})])]),_:1})]),_:1}),i(e($),null,{default:n(()=>[i(e(x),{bordered:!0,class:"hover:shadow-lg transition-shadow cursor-pointer",onClick:o[1]||(o[1]=r=>e(a).push("/teacher"))},{default:n(()=>[t("div",We,[t("div",null,[i(e(O),{title:"教师总数",value:z.value.toLocaleString()},null,8,["value"])]),i(e(b),{size:"36",color:"#18A058"},{default:n(()=>[i(e(he))]),_:1})])]),_:1})]),_:1}),i(e($),null,{default:n(()=>[i(e(x),{bordered:!0,class:"hover:shadow-lg transition-shadow cursor-pointer",onClick:o[2]||(o[2]=r=>e(a).push("/course"))},{default:n(()=>[t("div",Me,[t("div",null,[i(e(O),{title:"课程数量",value:C.value.toLocaleString()},null,8,["value"])]),i(e(b),{size:"36",color:"#F0A020"},{default:n(()=>[i(e(xe))]),_:1})])]),_:1})]),_:1}),i(e($),null,{default:n(()=>[i(e(x),{bordered:!0,class:"hover:shadow-lg transition-shadow cursor-pointer",onClick:o[3]||(o[3]=r=>e(a).push("/class"))},{default:n(()=>[t("div",He,[t("div",null,[i(e(O),{title:"班级数量",value:w.value.toLocaleString()},null,8,["value"])]),i(e(b),{size:"36",color:"#D03050"},{default:n(()=>[i(e(be))]),_:1})])]),_:1})]),_:1})]),_:1}),i(e(Q),{cols:2,"x-gap":16},{default:n(()=>[i(e($),null,{default:n(()=>[i(e(x),{class:"mb-4"},{header:n(()=>[t("div",Ge,[i(e(b),{size:"20",color:"#2080F0"},{default:n(()=>[i(e(_e))]),_:1}),o[4]||(o[4]=t("span",{class:"font-semibold"},"数据概览",-1))])]),default:n(()=>{var r;return[t("div",Ke,[t("div",qe,[o[5]||(o[5]=t("div",{class:"text-sm text-gray-500"},"今日登录",-1)),t("div",Xe,h(S.value.toLocaleString()),1)]),t("div",Qe,[o[6]||(o[6]=t("div",{class:"text-sm text-gray-500"},"活跃教师",-1)),t("div",Je,h(P.value.toLocaleString()),1)]),t("div",Ue,[o[7]||(o[7]=t("div",{class:"text-sm text-gray-500"},"在线学生",-1)),t("div",Ye,h(j.value.toLocaleString()),1)]),t("div",Ze,[o[8]||(o[8]=t("div",{class:"text-sm text-gray-500"},"风险预警",-1)),t("div",et,h(((r=c.value)==null?void 0:r.totalRisks)||0),1)])])]}),_:1}),f.value?(p(),k(e(x),{key:0,class:"mb-4"},{header:n(()=>[t("div",tt,[i(e(b),{size:"20",color:"#D03050"},{default:n(()=>[i(e(D))]),_:1}),o[9]||(o[9]=t("span",{class:"font-semibold"},"AI 风险预警",-1))])]),default:n(()=>[t("div",it,[i(e(ye),{size:"small"}),o[10]||(o[10]=t("span",{class:"text-gray-500"},"AI 正在分析全体学生数据，请稍候...",-1))])]),_:1})):l.value?(p(),k(e(x),{key:1,class:"mb-4"},{header:n(()=>[t("div",nt,[i(e(b),{size:"20",color:"#D03050"},{default:n(()=>[i(e(D))]),_:1}),o[11]||(o[11]=t("span",{class:"font-semibold"},"AI 风险预警",-1))])]),default:n(()=>[i(e(E),{description:"AI 服务暂不可用，请检查 ai-service 是否已启动"})]),_:1})):c.value&&c.value.totalRisks>0?(p(),k(e(x),{key:2},{header:n(()=>[t("div",ot,[i(e(b),{size:"20",color:"#D03050"},{default:n(()=>[i(e(D))]),_:1}),o[12]||(o[12]=t("span",{class:"font-semibold"},"AI 风险预警",-1))])]),default:n(()=>[(p(!0),I(K,null,q(c.value.riskItems.slice(0,3),r=>(p(),I("div",{key:r.studentId,class:"flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0"},[t("div",null,[t("span",st,h(r.studentName),1),t("span",lt,h(r.className),1)]),t("div",rt,[i(e(ze),{type:r.riskLevel==="high"?"error":r.riskLevel==="medium"?"warning":"info",size:"small"},{default:n(()=>[X(h(r.riskType),1)]),_:2},1032,["type"])])]))),128))]),_:1})):c.value&&c.value.totalRisks===0?(p(),k(e(x),{key:3,class:"mb-4"},{header:n(()=>[t("div",at,[i(e(b),{size:"20",color:"#18A058"},{default:n(()=>[i(e(Re))]),_:1}),o[13]||(o[13]=t("span",{class:"font-semibold"},"AI 风险预警",-1))])]),default:n(()=>[i(e(E),{description:"暂无风险预警，所有学生学习情况良好"})]),_:1})):fe("",!0)]),_:1}),i(e($),null,{default:n(()=>[i(e(x),null,{header:n(()=>[t("div",ct,[i(e(b),{size:"20",color:"#18A058"},{default:n(()=>[i(e(ke))]),_:1}),o[14]||(o[14]=t("span",{class:"font-semibold"},"最近动态",-1))])]),default:n(()=>[N.value.length?(p(),k(e(Le),{key:0},{default:n(()=>[(p(!0),I(K,null,q(N.value,r=>(p(),k(e(Ie),{key:r.content+r.time,time:r.time,type:r.type},{default:n(()=>[X(h(r.content),1)]),_:2},1032,["time","type"]))),128))]),_:1})):(p(),k(e(E),{key:1,description:"暂无动态"}))]),_:1})]),_:1})]),_:1})])}}});export{Tt as default};
