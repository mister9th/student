import{aY as ne,am as oe,bY as se,G as m,J as p,ak as F,aK as v,bS as R,c9 as G,ck as D,ch as le,cl as ee,b_ as re,a5 as K,K as I,D as O,ac as ae,bB as ce,bQ as H,b$ as de,aP as ue,ad as j,bt as x,aa as A,a7 as t,c8 as me,cm as fe,br as ve,c0 as _,c6 as e,ah as i,cr as n,bG as b,bM as Y,f as z,a8 as $,b as q,bI as J,af as Q,a9 as ge,cg as pe}from"./index-ZKhPo1kY.js";import{e as he}from"./ai-BQ7q17AS.js";import{a as U,N as P}from"./Grid-DcFa--8N.js";import{P as xe}from"./PeopleOutline-4hfHqPVP.js";import{P as be}from"./PersonOutline-BKGBgtpS.js";import{B as _e}from"./BookOutline-3u24ansa.js";import{S as ze}from"./SchoolOutline-CQwGOqS5.js";import{A as ye}from"./AnalyticsOutline-DjXAbinq.js";import{N as Ce}from"./Spin-Zc-Wehkq.js";import{A as W}from"./AlertCircleOutline-WRNdhRPq.js";import{N as M}from"./Empty-krKgyrq5.js";import{N as Se}from"./Tag-DlJk7rAe.js";import{f as we}from"./format-length-B-p6aW7q.js";import{L as ke}from"./ListOutline-C8x-ZhrG.js";import{N as y}from"./Icon-D30fLxkR.js";import"./get-slot-Bk_rJcZu.js";import"./next-frame-once-C5Ksf8W7.js";import"./use-locale-BDt1xl5_.js";let X=!1;function $e(){if(ne&&window.CSS&&!X&&(X=!0,"registerProperty"in(window==null?void 0:window.CSS)))try{CSS.registerProperty({name:"--n-color-start",syntax:"<color>",inherits:!1,initialValue:"#0000"}),CSS.registerProperty({name:"--n-color-end",syntax:"<color>",inherits:!1,initialValue:"#0000"})}catch{}}function Ne(o){const{textColor3:s,infoColor:d,errorColor:a,successColor:r,warningColor:f,textColor1:c,textColor2:h,railColor:C,fontWeightStrong:S,fontSize:w}=o;return Object.assign(Object.assign({},se),{contentFontSize:w,titleFontWeight:S,circleBorder:`2px solid ${s}`,circleBorderInfo:`2px solid ${d}`,circleBorderError:`2px solid ${a}`,circleBorderSuccess:`2px solid ${r}`,circleBorderWarning:`2px solid ${f}`,iconColor:s,iconColorInfo:d,iconColorError:a,iconColorSuccess:r,iconColorWarning:f,titleTextColor:c,contentTextColor:h,metaTextColor:s,lineColor:C})}const Te={common:oe,self:Ne},Pe=m("statistic",[p("label",`
 font-weight: var(--n-label-font-weight);
 transition: .3s color var(--n-bezier);
 font-size: var(--n-label-font-size);
 color: var(--n-label-text-color);
 `),m("statistic-value",`
 margin-top: 4px;
 font-weight: var(--n-value-font-weight);
 `,[p("prefix",`
 margin: 0 4px 0 0;
 font-size: var(--n-value-font-size);
 transition: .3s color var(--n-bezier);
 color: var(--n-value-prefix-text-color);
 `,[m("icon",{verticalAlign:"-0.125em"})]),p("content",`
 font-size: var(--n-value-font-size);
 transition: .3s color var(--n-bezier);
 color: var(--n-value-text-color);
 `),p("suffix",`
 margin: 0 0 0 4px;
 font-size: var(--n-value-font-size);
 transition: .3s color var(--n-bezier);
 color: var(--n-value-suffix-text-color);
 `,[m("icon",{verticalAlign:"-0.125em"})])])]),Re=Object.assign(Object.assign({},D.props),{tabularNums:Boolean,label:String,value:[String,Number]}),E=F({name:"Statistic",props:Re,slots:Object,setup(o){const{mergedClsPrefixRef:s,inlineThemeDisabled:d,mergedRtlRef:a}=G(o),r=D("Statistic","-statistic",Pe,re,o,s),f=le("Statistic",a,s),c=K(()=>{const{self:{labelFontWeight:C,valueFontSize:S,valueFontWeight:w,valuePrefixTextColor:N,labelTextColor:T,valueSuffixTextColor:k,valueTextColor:B,labelFontSize:L},common:{cubicBezierEaseInOut:g}}=r.value;return{"--n-bezier":g,"--n-label-font-size":L,"--n-label-font-weight":C,"--n-label-text-color":T,"--n-value-font-weight":w,"--n-value-font-size":S,"--n-value-prefix-text-color":N,"--n-value-suffix-text-color":k,"--n-value-text-color":B}}),h=d?ee("statistic",void 0,c,o):void 0;return{rtlEnabled:f,mergedClsPrefix:s,cssVars:d?void 0:c,themeClass:h==null?void 0:h.themeClass,onRender:h==null?void 0:h.onRender}},render(){var o;const{mergedClsPrefix:s,$slots:{default:d,label:a,prefix:r,suffix:f}}=this;return(o=this.onRender)===null||o===void 0||o.call(this),v("div",{class:[`${s}-statistic`,this.themeClass,this.rtlEnabled&&`${s}-statistic--rtl`],style:this.cssVars},R(a,c=>v("div",{class:`${s}-statistic__label`},this.label||c)),v("div",{class:`${s}-statistic-value`,style:{fontVariantNumeric:this.tabularNums?"tabular-nums":""}},R(r,c=>c&&v("span",{class:`${s}-statistic-value__prefix`},c)),this.value!==void 0?v("span",{class:`${s}-statistic-value__content`},this.value):R(d,c=>c&&v("span",{class:`${s}-statistic-value__content`},c)),R(f,c=>c&&v("span",{class:`${s}-statistic-value__suffix`},c))))}}),Z=1.25,Be=m("timeline",`
 position: relative;
 width: 100%;
 display: flex;
 flex-direction: column;
 line-height: ${Z};
`,[I("horizontal",`
 flex-direction: row;
 `,[O(">",[m("timeline-item",`
 flex-shrink: 0;
 padding-right: 40px;
 `,[I("dashed-line-type",[O(">",[m("timeline-item-timeline",[p("line",`
 background-image: linear-gradient(90deg, var(--n-color-start), var(--n-color-start) 50%, transparent 50%, transparent 100%);
 background-size: 10px 1px;
 `)])])]),O(">",[m("timeline-item-content",`
 margin-top: calc(var(--n-icon-size) + 12px);
 `,[O(">",[p("meta",`
 margin-top: 6px;
 margin-bottom: unset;
 `)])]),m("timeline-item-timeline",`
 width: 100%;
 height: calc(var(--n-icon-size) + 12px);
 `,[p("line",`
 left: var(--n-icon-size);
 top: calc(var(--n-icon-size) / 2 - 1px);
 right: 0px;
 width: unset;
 height: 2px;
 `)])])])])]),I("right-placement",[m("timeline-item",[m("timeline-item-content",`
 text-align: right;
 margin-right: calc(var(--n-icon-size) + 12px);
 `),m("timeline-item-timeline",`
 width: var(--n-icon-size);
 right: 0;
 `)])]),I("left-placement",[m("timeline-item",[m("timeline-item-content",`
 margin-left: calc(var(--n-icon-size) + 12px);
 `),m("timeline-item-timeline",`
 left: 0;
 `)])]),m("timeline-item",`
 position: relative;
 `,[O("&:last-child",[m("timeline-item-timeline",[p("line",`
 display: none;
 `)]),m("timeline-item-content",[p("meta",`
 margin-bottom: 0;
 `)])]),m("timeline-item-content",[p("title",`
 margin: var(--n-title-margin);
 font-size: var(--n-title-font-size);
 transition: color .3s var(--n-bezier);
 font-weight: var(--n-title-font-weight);
 color: var(--n-title-text-color);
 `),p("content",`
 transition: color .3s var(--n-bezier);
 font-size: var(--n-content-font-size);
 color: var(--n-content-text-color);
 `),p("meta",`
 transition: color .3s var(--n-bezier);
 font-size: 12px;
 margin-top: 6px;
 margin-bottom: 20px;
 color: var(--n-meta-text-color);
 `)]),I("dashed-line-type",[m("timeline-item-timeline",[p("line",`
 --n-color-start: var(--n-line-color);
 transition: --n-color-start .3s var(--n-bezier);
 background-color: transparent;
 background-image: linear-gradient(180deg, var(--n-color-start), var(--n-color-start) 50%, transparent 50%, transparent 100%);
 background-size: 1px 10px;
 `)])]),m("timeline-item-timeline",`
 width: calc(var(--n-icon-size) + 12px);
 position: absolute;
 top: calc(var(--n-title-font-size) * ${Z} / 2 - var(--n-icon-size) / 2);
 height: 100%;
 `,[p("circle",`
 border: var(--n-circle-border);
 transition:
 background-color .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 width: var(--n-icon-size);
 height: var(--n-icon-size);
 border-radius: var(--n-icon-size);
 box-sizing: border-box;
 `),p("icon",`
 color: var(--n-icon-color);
 font-size: var(--n-icon-size);
 height: var(--n-icon-size);
 width: var(--n-icon-size);
 display: flex;
 align-items: center;
 justify-content: center;
 `),p("line",`
 transition: background-color .3s var(--n-bezier);
 position: absolute;
 top: var(--n-icon-size);
 left: calc(var(--n-icon-size) / 2 - 1px);
 bottom: 0px;
 width: 2px;
 background-color: var(--n-line-color);
 `)])])]),Le=Object.assign(Object.assign({},D.props),{horizontal:Boolean,itemPlacement:{type:String,default:"left"},size:{type:String,default:"medium"},iconSize:Number}),te=ae("n-timeline"),Ie=F({name:"Timeline",props:Le,setup(o,{slots:s}){const{mergedClsPrefixRef:d}=G(o),a=D("Timeline","-timeline",Be,Te,o,d);return ce(te,{props:o,mergedThemeRef:a,mergedClsPrefixRef:d}),()=>{const{value:r}=d;return v("div",{class:[`${r}-timeline`,o.horizontal&&`${r}-timeline--horizontal`,`${r}-timeline--${o.size}-size`,!o.horizontal&&`${r}-timeline--${o.itemPlacement}-placement`]},s)}}}),Oe={time:[String,Number],title:String,content:String,color:String,lineType:{type:String,default:"default"},type:{type:String,default:"default"}},je=F({name:"TimelineItem",props:Oe,slots:Object,setup(o){const s=ue(te);s||de("timeline-item","`n-timeline-item` must be placed inside `n-timeline`."),$e();const{inlineThemeDisabled:d}=G(),a=K(()=>{const{props:{size:f,iconSize:c},mergedThemeRef:h}=s,{type:C}=o,{self:{titleTextColor:S,contentTextColor:w,metaTextColor:N,lineColor:T,titleFontWeight:k,contentFontSize:B,[j("iconSize",f)]:L,[j("titleMargin",f)]:g,[j("titleFontSize",f)]:l,[j("circleBorder",C)]:V,[j("iconColor",C)]:u},common:{cubicBezierEaseInOut:ie}}=h.value;return{"--n-bezier":ie,"--n-circle-border":V,"--n-icon-color":u,"--n-content-font-size":B,"--n-content-text-color":w,"--n-line-color":T,"--n-meta-text-color":N,"--n-title-font-size":l,"--n-title-font-weight":k,"--n-title-margin":g,"--n-title-text-color":S,"--n-icon-size":we(c)||L}}),r=d?ee("timeline-item",K(()=>{const{props:{size:f,iconSize:c}}=s,{type:h}=o;return`${f[0]}${c||"a"}${h[0]}`}),a,s.props):void 0;return{mergedClsPrefix:s.mergedClsPrefixRef,cssVars:d?void 0:a,themeClass:r==null?void 0:r.themeClass,onRender:r==null?void 0:r.onRender}},render(){const{mergedClsPrefix:o,color:s,onRender:d,$slots:a}=this;return d==null||d(),v("div",{class:[`${o}-timeline-item`,this.themeClass,`${o}-timeline-item--${this.type}-type`,`${o}-timeline-item--${this.lineType}-line-type`],style:this.cssVars},v("div",{class:`${o}-timeline-item-timeline`},v("div",{class:`${o}-timeline-item-timeline__line`}),R(a.icon,r=>r?v("div",{class:`${o}-timeline-item-timeline__icon`,style:{color:s}},r):v("div",{class:`${o}-timeline-item-timeline__circle`,style:{borderColor:s}}))),v("div",{class:`${o}-timeline-item-content`},R(a.header,r=>r||this.title?v("div",{class:`${o}-timeline-item-content__title`},r||this.title):null),v("div",{class:`${o}-timeline-item-content__content`},H(a.default,()=>[this.content])),v("div",{class:`${o}-timeline-item-content__meta`},H(a.footer,()=>[this.time]))))}}),Ae={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},Fe=t("path",{d:"M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192s192-86 192-192z",fill:"none",stroke:"currentColor","stroke-miterlimit":"10","stroke-width":"32"},null,-1),Ve=t("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M352 176L217.6 336L160 272"},null,-1),Ee=[Fe,Ve],De=F({name:"CheckmarkCircleOutline",render:function(s,d){return x(),A("svg",Ae,Ee)}}),We={class:"mb-6"},Me={class:"text-2xl font-bold"},Ke={class:"text-gray-500 mt-1"},Ge={class:"flex items-center justify-between"},He={class:"flex items-center justify-between"},Ye={class:"flex items-center justify-between"},qe={class:"flex items-center justify-between"},Je={class:"flex items-center gap-2"},Qe={class:"grid grid-cols-2 gap-4"},Ue={class:"bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4"},Xe={class:"text-2xl font-bold text-blue-600"},Ze={class:"bg-green-50 dark:bg-green-900/20 rounded-xl p-4"},et={class:"text-2xl font-bold text-green-600"},tt={class:"bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4"},it={class:"text-2xl font-bold text-orange-600"},nt={class:"bg-red-50 dark:bg-red-900/20 rounded-xl p-4"},ot={class:"text-2xl font-bold text-red-600"},st={class:"flex items-center gap-2"},lt={class:"flex items-center gap-3 py-4"},rt={class:"flex items-center gap-2"},at={class:"flex items-center gap-2"},ct={class:"font-medium"},dt={class:"text-sm text-gray-500 ml-2"},ut={class:"flex items-center gap-2"},mt={class:"flex items-center gap-2"},ft={class:"flex items-center gap-2"},Bt=F({__name:"Workbench",setup(o){const s=pe(),d=me();fe();const a=b(null),r=b(!1),f=b(!1),c=b(0),h=b(0),C=b(0),S=b(0),w=b(0),N=b(0),T=b(0),k=b([]),B=async()=>{try{const g=await Y.get("/user/dashboard/stats");c.value=g.studentCount||0,h.value=g.teacherCount||0,C.value=g.courseCount||0,S.value=g.classCount||0,w.value=g.todayLogins||0,N.value=g.activeTeachers||0,T.value=g.onlineStudents||0}catch{}},L=async()=>{try{k.value=await Y.get("/user/dashboard/activities")||[]}catch{}};return ve(async()=>{await Promise.all([B(),L()]),f.value=!0,he().then(g=>{a.value=g,r.value=!1}).catch(()=>{r.value=!0}).finally(()=>{f.value=!1})}),(g,l)=>{var V;return x(),A("div",null,[t("div",We,[t("h2",Me,_((V=e(d).userInfo)==null?void 0:V.realName)+"，欢迎回来！",1),t("p",Ke,"今天是 "+_(new Date().toLocaleDateString("zh-CN",{year:"numeric",month:"long",day:"numeric",weekday:"long"})),1)]),i(e(U),{cols:4,"x-gap":16,"y-gap":16,class:"mb-6"},{default:n(()=>[i(e(P),null,{default:n(()=>[i(e(z),{bordered:!0,class:"hover:shadow-lg transition-shadow cursor-pointer",onClick:l[0]||(l[0]=u=>e(s).push("/student/list"))},{default:n(()=>[t("div",Ge,[t("div",null,[i(e(E),{title:"学生总数",value:c.value.toLocaleString()},null,8,["value"])]),i(e(y),{size:"36",color:"#2080F0"},{default:n(()=>[i(e(xe))]),_:1})])]),_:1})]),_:1}),i(e(P),null,{default:n(()=>[i(e(z),{bordered:!0,class:"hover:shadow-lg transition-shadow cursor-pointer",onClick:l[1]||(l[1]=u=>e(s).push("/teacher/list"))},{default:n(()=>[t("div",He,[t("div",null,[i(e(E),{title:"教师总数",value:h.value.toLocaleString()},null,8,["value"])]),i(e(y),{size:"36",color:"#18A058"},{default:n(()=>[i(e(be))]),_:1})])]),_:1})]),_:1}),i(e(P),null,{default:n(()=>[i(e(z),{bordered:!0,class:"hover:shadow-lg transition-shadow cursor-pointer",onClick:l[2]||(l[2]=u=>e(s).push("/course/list"))},{default:n(()=>[t("div",Ye,[t("div",null,[i(e(E),{title:"课程数量",value:C.value.toLocaleString()},null,8,["value"])]),i(e(y),{size:"36",color:"#F0A020"},{default:n(()=>[i(e(_e))]),_:1})])]),_:1})]),_:1}),i(e(P),null,{default:n(()=>[i(e(z),{bordered:!0,class:"hover:shadow-lg transition-shadow cursor-pointer",onClick:l[3]||(l[3]=u=>e(s).push("/class/list"))},{default:n(()=>[t("div",qe,[t("div",null,[i(e(E),{title:"班级数量",value:S.value.toLocaleString()},null,8,["value"])]),i(e(y),{size:"36",color:"#D03050"},{default:n(()=>[i(e(ze))]),_:1})])]),_:1})]),_:1})]),_:1}),i(e(U),{cols:2,"x-gap":16},{default:n(()=>[i(e(P),null,{default:n(()=>[i(e(z),{class:"mb-4"},{header:n(()=>[t("div",Je,[i(e(y),{size:"20",color:"#2080F0"},{default:n(()=>[i(e(ye))]),_:1}),l[4]||(l[4]=t("span",{class:"font-semibold"},"数据概览",-1))])]),default:n(()=>{var u;return[t("div",Qe,[t("div",Ue,[l[5]||(l[5]=t("div",{class:"text-sm text-gray-500"},"今日登录",-1)),t("div",Xe,_(w.value.toLocaleString()),1)]),t("div",Ze,[l[6]||(l[6]=t("div",{class:"text-sm text-gray-500"},"活跃教师",-1)),t("div",et,_(N.value.toLocaleString()),1)]),t("div",tt,[l[7]||(l[7]=t("div",{class:"text-sm text-gray-500"},"在线学生",-1)),t("div",it,_(T.value.toLocaleString()),1)]),t("div",nt,[l[8]||(l[8]=t("div",{class:"text-sm text-gray-500"},"风险预警",-1)),t("div",ot,_(((u=a.value)==null?void 0:u.totalRisks)||0),1)])])]}),_:1}),f.value?(x(),$(e(z),{key:0,class:"mb-4"},{header:n(()=>[t("div",st,[i(e(y),{size:"20",color:"#D03050"},{default:n(()=>[i(e(W))]),_:1}),l[9]||(l[9]=t("span",{class:"font-semibold"},"AI 风险预警",-1))])]),default:n(()=>[t("div",lt,[i(e(Ce),{size:"small"}),l[10]||(l[10]=t("span",{class:"text-gray-500"},"AI 正在分析全体学生数据，请稍候...",-1))])]),_:1})):r.value?(x(),$(e(z),{key:1,class:"mb-4"},{header:n(()=>[t("div",rt,[i(e(y),{size:"20",color:"#D03050"},{default:n(()=>[i(e(W))]),_:1}),l[11]||(l[11]=t("span",{class:"font-semibold"},"AI 风险预警",-1))])]),default:n(()=>[i(e(M),{description:"AI 服务暂不可用，请检查 ai-service 是否已启动"})]),_:1})):a.value&&a.value.totalRisks>0?(x(),$(e(z),{key:2},{header:n(()=>[t("div",at,[i(e(y),{size:"20",color:"#D03050"},{default:n(()=>[i(e(W))]),_:1}),l[12]||(l[12]=t("span",{class:"font-semibold"},"AI 风险预警",-1))])]),default:n(()=>[(x(!0),A(q,null,J(a.value.riskItems.slice(0,3),u=>(x(),A("div",{key:u.studentId,class:"flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0"},[t("div",null,[t("span",ct,_(u.studentName),1),t("span",dt,_(u.className),1)]),t("div",ut,[i(e(Se),{type:u.riskLevel==="high"?"error":u.riskLevel==="medium"?"warning":"info",size:"small"},{default:n(()=>[Q(_(u.riskType),1)]),_:2},1032,["type"])])]))),128))]),_:1})):a.value&&a.value.totalRisks===0?(x(),$(e(z),{key:3,class:"mb-4"},{header:n(()=>[t("div",mt,[i(e(y),{size:"20",color:"#18A058"},{default:n(()=>[i(e(De))]),_:1}),l[13]||(l[13]=t("span",{class:"font-semibold"},"AI 风险预警",-1))])]),default:n(()=>[i(e(M),{description:"暂无风险预警，所有学生学习情况良好"})]),_:1})):ge("",!0)]),_:1}),i(e(P),null,{default:n(()=>[i(e(z),null,{header:n(()=>[t("div",ft,[i(e(y),{size:"20",color:"#18A058"},{default:n(()=>[i(e(ke))]),_:1}),l[14]||(l[14]=t("span",{class:"font-semibold"},"最近动态",-1))])]),default:n(()=>[k.value.length?(x(),$(e(Ie),{key:0},{default:n(()=>[(x(!0),A(q,null,J(k.value,u=>(x(),$(e(je),{key:u.content+u.time,time:u.time,type:u.type},{default:n(()=>[Q(_(u.content),1)]),_:2},1032,["time","type"]))),128))]),_:1})):(x(),$(e(M),{key:1,description:"暂无动态"}))]),_:1})]),_:1})]),_:1})])}}});export{Bt as default};
