import{b4 as ie,aq as ne,cb as oe,H as d,O as T,G as I,K as v,ao as E,cs as Y,cF as Z,aS as _,af as se,bQ as le,c5 as W,c3 as H,cg as re,cG as ae,a7 as M,aX as ce,ag as P,cr as de,cH as me,bG as ue,ad as j,aa as t,cj as h,cp as e,ak as i,cM as n,bV as p,b$ as G,bI as g,f as x,ab as S,b as K,bX as q,ai as X,ac as fe,cB as ve}from"../index-DYWs6O1r.js";import{d as pe}from"../shared/ai-B3ED5Yyw.js";import{N as Q,_ as $}from"../components/Grid-DJrG0IsY.js";import{N as O}from"../components/Statistic-BMHbYaEK.js";import{P as ge}from"../icons/PeopleOutline-B3vdoTX-.js";import{P as he}from"../icons/PersonOutline-BLMm-baA.js";import{B as xe}from"../icons/BookOutline-D67TJ3nv.js";import{S as be}from"../icons/SchoolOutline-DKbdqpYs.js";import{A as _e}from"../icons/AnalyticsOutline-BFuMrLGg.js";import{N as ye}from"../components/Spin-UxmldCEG.js";import{A as V}from"../icons/AlertCircleOutline-01MfVBqL.js";import{N as D}from"../components/Empty-DIVx_qBD.js";import{N as ze}from"../components/Tag-lYZrRC-W.js";import{C as Ce}from"../icons/CheckmarkCircleOutline-D5fanYKv.js";import{f as Se}from"../shared/format-length-B-p6aW7q.js";import{L as ke}from"../icons/ListOutline-DQna32E1.js";import{N as b}from"../components/Icon-Dac491N0.js";import"../components/get-slot-Bk_rJcZu.js";import"../components/next-frame-once-C5Ksf8W7.js";import"../shared/use-locale-BrcmAeeW.js";let J=!1;function we(){if(ie&&window.CSS&&!J&&(J=!0,"registerProperty"in(window==null?void 0:window.CSS)))try{CSS.registerProperty({name:"--n-color-start",syntax:"<color>",inherits:!1,initialValue:"#0000"}),CSS.registerProperty({name:"--n-color-end",syntax:"<color>",inherits:!1,initialValue:"#0000"})}catch{}}function $e(s){const{textColor3:c,infoColor:m,errorColor:a,successColor:l,warningColor:f,textColor1:y,textColor2:z,railColor:C,fontWeightStrong:k,fontSize:w}=s;return Object.assign(Object.assign({},oe),{contentFontSize:w,titleFontWeight:k,circleBorder:`2px solid ${c}`,circleBorderInfo:`2px solid ${m}`,circleBorderError:`2px solid ${a}`,circleBorderSuccess:`2px solid ${l}`,circleBorderWarning:`2px solid ${f}`,iconColor:c,iconColorInfo:m,iconColorError:a,iconColorSuccess:l,iconColorWarning:f,titleTextColor:y,contentTextColor:z,metaTextColor:c,lineColor:C})}const Ne={common:ne,self:$e},U=1.25,Te=d("timeline",`
 position: relative;
 width: 100%;
 display: flex;
 flex-direction: column;
 line-height: ${U};
`,[T("horizontal",`
 flex-direction: row;
 `,[I(">",[d("timeline-item",`
 flex-shrink: 0;
 padding-right: 40px;
 `,[T("dashed-line-type",[I(">",[d("timeline-item-timeline",[v("line",`
 background-image: linear-gradient(90deg, var(--n-color-start), var(--n-color-start) 50%, transparent 50%, transparent 100%);
 background-size: 10px 1px;
 `)])])]),I(">",[d("timeline-item-content",`
 margin-top: calc(var(--n-icon-size) + 12px);
 `,[I(">",[v("meta",`
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
 `,[I("&:last-child",[d("timeline-item-timeline",[v("line",`
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
 `)])])]),Ie=Object.assign(Object.assign({},Z.props),{horizontal:Boolean,itemPlacement:{type:String,default:"left"},size:{type:String,default:"medium"},iconSize:Number}),ee=se("n-timeline"),Pe=E({name:"Timeline",props:Ie,setup(s,{slots:c}){const{mergedClsPrefixRef:m}=Y(s),a=Z("Timeline","-timeline",Te,Ne,s,m);return le(ee,{props:s,mergedThemeRef:a,mergedClsPrefixRef:m}),()=>{const{value:l}=m;return _("div",{class:[`${l}-timeline`,s.horizontal&&`${l}-timeline--horizontal`,`${l}-timeline--${s.size}-size`,!s.horizontal&&`${l}-timeline--${s.itemPlacement}-placement`]},c)}}}),Be={time:[String,Number],title:String,content:String,color:String,lineType:{type:String,default:"default"},type:{type:String,default:"default"}},Le=E({name:"TimelineItem",props:Be,slots:Object,setup(s){const c=ce(ee);c||re("timeline-item","`n-timeline-item` must be placed inside `n-timeline`."),we();const{inlineThemeDisabled:m}=Y(),a=M(()=>{const{props:{size:f,iconSize:y},mergedThemeRef:z}=c,{type:C}=s,{self:{titleTextColor:k,contentTextColor:w,metaTextColor:B,lineColor:L,titleFontWeight:N,contentFontSize:R,[P("iconSize",f)]:F,[P("titleMargin",f)]:u,[P("titleFontSize",f)]:o,[P("circleBorder",C)]:A,[P("iconColor",C)]:r},common:{cubicBezierEaseInOut:te}}=z.value;return{"--n-bezier":te,"--n-circle-border":A,"--n-icon-color":r,"--n-content-font-size":R,"--n-content-text-color":w,"--n-line-color":L,"--n-meta-text-color":B,"--n-title-font-size":o,"--n-title-font-weight":N,"--n-title-margin":u,"--n-title-text-color":k,"--n-icon-size":Se(y)||F}}),l=m?ae("timeline-item",M(()=>{const{props:{size:f,iconSize:y}}=c,{type:z}=s;return`${f[0]}${y||"a"}${z[0]}`}),a,c.props):void 0;return{mergedClsPrefix:c.mergedClsPrefixRef,cssVars:m?void 0:a,themeClass:l==null?void 0:l.themeClass,onRender:l==null?void 0:l.onRender}},render(){const{mergedClsPrefix:s,color:c,onRender:m,$slots:a}=this;return m==null||m(),_("div",{class:[`${s}-timeline-item`,this.themeClass,`${s}-timeline-item--${this.type}-type`,`${s}-timeline-item--${this.lineType}-line-type`],style:this.cssVars},_("div",{class:`${s}-timeline-item-timeline`},_("div",{class:`${s}-timeline-item-timeline__line`}),W(a.icon,l=>l?_("div",{class:`${s}-timeline-item-timeline__icon`,style:{color:c}},l):_("div",{class:`${s}-timeline-item-timeline__circle`,style:{borderColor:c}}))),_("div",{class:`${s}-timeline-item-content`},W(a.header,l=>l||this.title?_("div",{class:`${s}-timeline-item-content__title`},l||this.title):null),_("div",{class:`${s}-timeline-item-content__content`},H(a.default,()=>[this.content])),_("div",{class:`${s}-timeline-item-content__meta`},H(a.footer,()=>[this.time]))))}}),Ae={class:"mb-6"},je={class:"text-2xl font-bold"},Oe={class:"text-gray-500 mt-1"},Re={class:"flex items-center justify-between"},Fe={class:"flex items-center justify-between"},Ve={class:"flex items-center justify-between"},De={class:"flex items-center justify-between"},Ee={class:"flex items-center gap-2"},We={class:"grid grid-cols-2 gap-4"},He={class:"bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4"},Me={class:"text-2xl font-bold text-blue-600"},Ge={class:"bg-green-50 dark:bg-green-900/20 rounded-xl p-4"},Ke={class:"text-2xl font-bold text-green-600"},qe={class:"bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4"},Xe={class:"text-2xl font-bold text-orange-600"},Qe={class:"bg-red-50 dark:bg-red-900/20 rounded-xl p-4"},Je={class:"text-2xl font-bold text-red-600"},Ue={class:"flex items-center gap-2"},Ye={class:"flex items-center gap-3 py-4"},Ze={class:"flex items-center gap-2"},et={class:"flex items-center gap-2"},tt={class:"font-medium"},it={class:"text-sm text-gray-500 ml-2"},nt={class:"flex items-center gap-2"},ot={class:"flex items-center gap-2"},st={class:"flex items-center gap-2"},wt=E({__name:"Workbench",setup(s){const c=ve(),m=de();me();const a=p(null),l=p(!1),f=p(!1),y=p(0),z=p(0),C=p(0),k=p(0),w=p(0),B=p(0),L=p(0),N=p([]),R=async()=>{try{const u=await G.get("/user/dashboard/stats");y.value=u.studentCount||0,z.value=u.teacherCount||0,C.value=u.courseCount||0,k.value=u.classCount||0,w.value=u.todayLogins||0,B.value=u.activeTeachers||0,L.value=u.onlineStudents||0}catch{}},F=async()=>{try{N.value=await G.get("/user/dashboard/activities")||[]}catch{}};return ue(async()=>{await Promise.all([R(),F()]),f.value=!0,pe().then(u=>{a.value=u,l.value=!1}).catch(()=>{l.value=!0}).finally(()=>{f.value=!1})}),(u,o)=>{var A;return g(),j("div",null,[t("div",Ae,[t("h2",je,h((A=e(m).userInfo)==null?void 0:A.realName)+"，欢迎回来！",1),t("p",Oe,"今天是 "+h(new Date().toLocaleDateString("zh-CN",{year:"numeric",month:"long",day:"numeric",weekday:"long"})),1)]),i(e(Q),{cols:4,"x-gap":16,"y-gap":16,class:"mb-6"},{default:n(()=>[i(e($),null,{default:n(()=>[i(e(x),{bordered:!0,class:"hover:shadow-lg transition-shadow cursor-pointer",onClick:o[0]||(o[0]=r=>e(c).push("/student"))},{default:n(()=>[t("div",Re,[t("div",null,[i(e(O),{title:"学生总数",value:y.value.toLocaleString()},null,8,["value"])]),i(e(b),{size:"36",color:"#2080F0"},{default:n(()=>[i(e(ge))]),_:1})])]),_:1})]),_:1}),i(e($),null,{default:n(()=>[i(e(x),{bordered:!0,class:"hover:shadow-lg transition-shadow cursor-pointer",onClick:o[1]||(o[1]=r=>e(c).push("/teacher"))},{default:n(()=>[t("div",Fe,[t("div",null,[i(e(O),{title:"教师总数",value:z.value.toLocaleString()},null,8,["value"])]),i(e(b),{size:"36",color:"#18A058"},{default:n(()=>[i(e(he))]),_:1})])]),_:1})]),_:1}),i(e($),null,{default:n(()=>[i(e(x),{bordered:!0,class:"hover:shadow-lg transition-shadow cursor-pointer",onClick:o[2]||(o[2]=r=>e(c).push("/course"))},{default:n(()=>[t("div",Ve,[t("div",null,[i(e(O),{title:"课程数量",value:C.value.toLocaleString()},null,8,["value"])]),i(e(b),{size:"36",color:"#F0A020"},{default:n(()=>[i(e(xe))]),_:1})])]),_:1})]),_:1}),i(e($),null,{default:n(()=>[i(e(x),{bordered:!0,class:"hover:shadow-lg transition-shadow cursor-pointer",onClick:o[3]||(o[3]=r=>e(c).push("/class"))},{default:n(()=>[t("div",De,[t("div",null,[i(e(O),{title:"班级数量",value:k.value.toLocaleString()},null,8,["value"])]),i(e(b),{size:"36",color:"#D03050"},{default:n(()=>[i(e(be))]),_:1})])]),_:1})]),_:1})]),_:1}),i(e(Q),{cols:2,"x-gap":16},{default:n(()=>[i(e($),null,{default:n(()=>[i(e(x),{class:"mb-4"},{header:n(()=>[t("div",Ee,[i(e(b),{size:"20",color:"#2080F0"},{default:n(()=>[i(e(_e))]),_:1}),o[4]||(o[4]=t("span",{class:"font-semibold"},"数据概览",-1))])]),default:n(()=>{var r;return[t("div",We,[t("div",He,[o[5]||(o[5]=t("div",{class:"text-sm text-gray-500"},"今日登录",-1)),t("div",Me,h(w.value.toLocaleString()),1)]),t("div",Ge,[o[6]||(o[6]=t("div",{class:"text-sm text-gray-500"},"活跃教师",-1)),t("div",Ke,h(B.value.toLocaleString()),1)]),t("div",qe,[o[7]||(o[7]=t("div",{class:"text-sm text-gray-500"},"在线学生",-1)),t("div",Xe,h(L.value.toLocaleString()),1)]),t("div",Qe,[o[8]||(o[8]=t("div",{class:"text-sm text-gray-500"},"风险预警",-1)),t("div",Je,h(((r=a.value)==null?void 0:r.totalRisks)||0),1)])])]}),_:1}),f.value?(g(),S(e(x),{key:0,class:"mb-4"},{header:n(()=>[t("div",Ue,[i(e(b),{size:"20",color:"#D03050"},{default:n(()=>[i(e(V))]),_:1}),o[9]||(o[9]=t("span",{class:"font-semibold"},"AI 风险预警",-1))])]),default:n(()=>[t("div",Ye,[i(e(ye),{size:"small"}),o[10]||(o[10]=t("span",{class:"text-gray-500"},"AI 正在分析全体学生数据，请稍候...",-1))])]),_:1})):l.value?(g(),S(e(x),{key:1,class:"mb-4"},{header:n(()=>[t("div",Ze,[i(e(b),{size:"20",color:"#D03050"},{default:n(()=>[i(e(V))]),_:1}),o[11]||(o[11]=t("span",{class:"font-semibold"},"AI 风险预警",-1))])]),default:n(()=>[i(e(D),{description:"AI 服务暂不可用，请检查 ai-service 是否已启动"})]),_:1})):a.value&&a.value.totalRisks>0?(g(),S(e(x),{key:2},{header:n(()=>[t("div",et,[i(e(b),{size:"20",color:"#D03050"},{default:n(()=>[i(e(V))]),_:1}),o[12]||(o[12]=t("span",{class:"font-semibold"},"AI 风险预警",-1))])]),default:n(()=>[(g(!0),j(K,null,q(a.value.riskItems.slice(0,3),r=>(g(),j("div",{key:r.studentId,class:"flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0"},[t("div",null,[t("span",tt,h(r.studentName),1),t("span",it,h(r.className),1)]),t("div",nt,[i(e(ze),{type:r.riskLevel==="high"?"error":r.riskLevel==="medium"?"warning":"info",size:"small"},{default:n(()=>[X(h(r.riskType),1)]),_:2},1032,["type"])])]))),128))]),_:1})):a.value&&a.value.totalRisks===0?(g(),S(e(x),{key:3,class:"mb-4"},{header:n(()=>[t("div",ot,[i(e(b),{size:"20",color:"#18A058"},{default:n(()=>[i(e(Ce))]),_:1}),o[13]||(o[13]=t("span",{class:"font-semibold"},"AI 风险预警",-1))])]),default:n(()=>[i(e(D),{description:"暂无风险预警，所有学生学习情况良好"})]),_:1})):fe("",!0)]),_:1}),i(e($),null,{default:n(()=>[i(e(x),null,{header:n(()=>[t("div",st,[i(e(b),{size:"20",color:"#18A058"},{default:n(()=>[i(e(ke))]),_:1}),o[14]||(o[14]=t("span",{class:"font-semibold"},"最近动态",-1))])]),default:n(()=>[N.value.length?(g(),S(e(Pe),{key:0},{default:n(()=>[(g(!0),j(K,null,q(N.value,r=>(g(),S(e(Le),{key:r.content+r.time,time:r.time,type:r.type},{default:n(()=>[X(h(r.content),1)]),_:2},1032,["time","type"]))),128))]),_:1})):(g(),S(e(D),{key:1,description:"暂无动态"}))]),_:1})]),_:1})]),_:1})])}}});export{wt as default};
