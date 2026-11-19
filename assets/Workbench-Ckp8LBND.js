import{aX as ne,al as oe,bW as se,G as m,J as p,aj as F,aJ as v,bR as P,c7 as K,ch as D,ce as le,ci as ee,bY as re,a4 as H,K as B,D as O,ab as ae,bA as ce,bP as G,bZ as de,aO as ue,ac as A,bs as x,a9 as I,a6 as t,c6 as me,cj as fe,bq as ve,b_ as _,c4 as e,ag as i,co as n,bF as b,bL as q,f as z,a7 as $,b as J,bH as X,ae as Y,a8 as ge,cd as pe}from"./index-B86aop0i.js";import{e as he}from"./ai-Cj-HuGJK.js";import{a as Z,N as R}from"./Grid-ZyILXSpU.js";import{P as xe}from"./PeopleOutline-BgUOLRd9.js";import{P as be}from"./PersonOutline-BjZ9vVxf.js";import{B as _e}from"./BookOutline-UikycJZr.js";import{S as ze}from"./SchoolOutline-D8d3V0Aa.js";import{A as ye}from"./AnalyticsOutline-CPl2LNyV.js";import{N as Ce}from"./Spin-Cf_y2Ufr.js";import{A as W}from"./AlertCircleOutline-CksWvECL.js";import{N as M}from"./Empty-Cz_Y6xEC.js";import{N as Se}from"./Tag-Biyc0lgt.js";import{f as we}from"./format-length-B-p6aW7q.js";import{L as ke}from"./ListOutline-Urc4yZL4.js";import{N as y}from"./Icon-BuxFsen4.js";import"./get-slot-Bk_rJcZu.js";import"./next-frame-once-C5Ksf8W7.js";import"./use-locale-CnkUiGkb.js";let Q=!1;function $e(){if(ne&&window.CSS&&!Q&&(Q=!0,"registerProperty"in(window==null?void 0:window.CSS)))try{CSS.registerProperty({name:"--n-color-start",syntax:"<color>",inherits:!1,initialValue:"#0000"}),CSS.registerProperty({name:"--n-color-end",syntax:"<color>",inherits:!1,initialValue:"#0000"})}catch{}}function Ne(o){const{textColor3:s,infoColor:d,errorColor:a,successColor:r,warningColor:f,textColor1:c,textColor2:h,railColor:C,fontWeightStrong:S,fontSize:w}=o;return Object.assign(Object.assign({},se),{contentFontSize:w,titleFontWeight:S,circleBorder:`2px solid ${s}`,circleBorderInfo:`2px solid ${d}`,circleBorderError:`2px solid ${a}`,circleBorderSuccess:`2px solid ${r}`,circleBorderWarning:`2px solid ${f}`,iconColor:s,iconColorInfo:d,iconColorError:a,iconColorSuccess:r,iconColorWarning:f,titleTextColor:c,contentTextColor:h,metaTextColor:s,lineColor:C})}const Te={common:oe,self:Ne},Re=m("statistic",[p("label",`
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
 `,[m("icon",{verticalAlign:"-0.125em"})])])]),Pe=Object.assign(Object.assign({},D.props),{tabularNums:Boolean,label:String,value:[String,Number]}),E=F({name:"Statistic",props:Pe,slots:Object,setup(o){const{mergedClsPrefixRef:s,inlineThemeDisabled:d,mergedRtlRef:a}=K(o),r=D("Statistic","-statistic",Re,re,o,s),f=le("Statistic",a,s),c=H(()=>{const{self:{labelFontWeight:C,valueFontSize:S,valueFontWeight:w,valuePrefixTextColor:N,labelTextColor:T,valueSuffixTextColor:k,valueTextColor:L,labelFontSize:j},common:{cubicBezierEaseInOut:g}}=r.value;return{"--n-bezier":g,"--n-label-font-size":j,"--n-label-font-weight":C,"--n-label-text-color":T,"--n-value-font-weight":w,"--n-value-font-size":S,"--n-value-prefix-text-color":N,"--n-value-suffix-text-color":k,"--n-value-text-color":L}}),h=d?ee("statistic",void 0,c,o):void 0;return{rtlEnabled:f,mergedClsPrefix:s,cssVars:d?void 0:c,themeClass:h==null?void 0:h.themeClass,onRender:h==null?void 0:h.onRender}},render(){var o;const{mergedClsPrefix:s,$slots:{default:d,label:a,prefix:r,suffix:f}}=this;return(o=this.onRender)===null||o===void 0||o.call(this),v("div",{class:[`${s}-statistic`,this.themeClass,this.rtlEnabled&&`${s}-statistic--rtl`],style:this.cssVars},P(a,c=>v("div",{class:`${s}-statistic__label`},this.label||c)),v("div",{class:`${s}-statistic-value`,style:{fontVariantNumeric:this.tabularNums?"tabular-nums":""}},P(r,c=>c&&v("span",{class:`${s}-statistic-value__prefix`},c)),this.value!==void 0?v("span",{class:`${s}-statistic-value__content`},this.value):P(d,c=>c&&v("span",{class:`${s}-statistic-value__content`},c)),P(f,c=>c&&v("span",{class:`${s}-statistic-value__suffix`},c))))}}),U=1.25,Le=m("timeline",`
 position: relative;
 width: 100%;
 display: flex;
 flex-direction: column;
 line-height: ${U};
`,[B("horizontal",`
 flex-direction: row;
 `,[O(">",[m("timeline-item",`
 flex-shrink: 0;
 padding-right: 40px;
 `,[B("dashed-line-type",[O(">",[m("timeline-item-timeline",[p("line",`
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
 `)])])])])]),B("right-placement",[m("timeline-item",[m("timeline-item-content",`
 text-align: right;
 margin-right: calc(var(--n-icon-size) + 12px);
 `),m("timeline-item-timeline",`
 width: var(--n-icon-size);
 right: 0;
 `)])]),B("left-placement",[m("timeline-item",[m("timeline-item-content",`
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
 `)]),B("dashed-line-type",[m("timeline-item-timeline",[p("line",`
 --n-color-start: var(--n-line-color);
 transition: --n-color-start .3s var(--n-bezier);
 background-color: transparent;
 background-image: linear-gradient(180deg, var(--n-color-start), var(--n-color-start) 50%, transparent 50%, transparent 100%);
 background-size: 1px 10px;
 `)])]),m("timeline-item-timeline",`
 width: calc(var(--n-icon-size) + 12px);
 position: absolute;
 top: calc(var(--n-title-font-size) * ${U} / 2 - var(--n-icon-size) / 2);
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
 `)])])]),je=Object.assign(Object.assign({},D.props),{horizontal:Boolean,itemPlacement:{type:String,default:"left"},size:{type:String,default:"medium"},iconSize:Number}),te=ae("n-timeline"),Be=F({name:"Timeline",props:je,setup(o,{slots:s}){const{mergedClsPrefixRef:d}=K(o),a=D("Timeline","-timeline",Le,Te,o,d);return ce(te,{props:o,mergedThemeRef:a,mergedClsPrefixRef:d}),()=>{const{value:r}=d;return v("div",{class:[`${r}-timeline`,o.horizontal&&`${r}-timeline--horizontal`,`${r}-timeline--${o.size}-size`,!o.horizontal&&`${r}-timeline--${o.itemPlacement}-placement`]},s)}}}),Oe={time:[String,Number],title:String,content:String,color:String,lineType:{type:String,default:"default"},type:{type:String,default:"default"}},Ae=F({name:"TimelineItem",props:Oe,slots:Object,setup(o){const s=ue(te);s||de("timeline-item","`n-timeline-item` must be placed inside `n-timeline`."),$e();const{inlineThemeDisabled:d}=K(),a=H(()=>{const{props:{size:f,iconSize:c},mergedThemeRef:h}=s,{type:C}=o,{self:{titleTextColor:S,contentTextColor:w,metaTextColor:N,lineColor:T,titleFontWeight:k,contentFontSize:L,[A("iconSize",f)]:j,[A("titleMargin",f)]:g,[A("titleFontSize",f)]:l,[A("circleBorder",C)]:V,[A("iconColor",C)]:u},common:{cubicBezierEaseInOut:ie}}=h.value;return{"--n-bezier":ie,"--n-circle-border":V,"--n-icon-color":u,"--n-content-font-size":L,"--n-content-text-color":w,"--n-line-color":T,"--n-meta-text-color":N,"--n-title-font-size":l,"--n-title-font-weight":k,"--n-title-margin":g,"--n-title-text-color":S,"--n-icon-size":we(c)||j}}),r=d?ee("timeline-item",H(()=>{const{props:{size:f,iconSize:c}}=s,{type:h}=o;return`${f[0]}${c||"a"}${h[0]}`}),a,s.props):void 0;return{mergedClsPrefix:s.mergedClsPrefixRef,cssVars:d?void 0:a,themeClass:r==null?void 0:r.themeClass,onRender:r==null?void 0:r.onRender}},render(){const{mergedClsPrefix:o,color:s,onRender:d,$slots:a}=this;return d==null||d(),v("div",{class:[`${o}-timeline-item`,this.themeClass,`${o}-timeline-item--${this.type}-type`,`${o}-timeline-item--${this.lineType}-line-type`],style:this.cssVars},v("div",{class:`${o}-timeline-item-timeline`},v("div",{class:`${o}-timeline-item-timeline__line`}),P(a.icon,r=>r?v("div",{class:`${o}-timeline-item-timeline__icon`,style:{color:s}},r):v("div",{class:`${o}-timeline-item-timeline__circle`,style:{borderColor:s}}))),v("div",{class:`${o}-timeline-item-content`},P(a.header,r=>r||this.title?v("div",{class:`${o}-timeline-item-content__title`},r||this.title):null),v("div",{class:`${o}-timeline-item-content__content`},G(a.default,()=>[this.content])),v("div",{class:`${o}-timeline-item-content__meta`},G(a.footer,()=>[this.time]))))}}),Ie={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},Fe=t("path",{d:"M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192s192-86 192-192z",fill:"none",stroke:"currentColor","stroke-miterlimit":"10","stroke-width":"32"},null,-1),Ve=t("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M352 176L217.6 336L160 272"},null,-1),Ee=[Fe,Ve],De=F({name:"CheckmarkCircleOutline",render:function(s,d){return x(),I("svg",Ie,Ee)}}),We={class:"mb-6"},Me={class:"text-2xl font-bold"},He={class:"text-gray-500 mt-1"},Ke={class:"flex items-center justify-between"},Ge={class:"flex items-center justify-between"},qe={class:"flex items-center justify-between"},Je={class:"flex items-center justify-between"},Xe={class:"flex items-center gap-2"},Ye={class:"grid grid-cols-2 gap-4"},Ze={class:"bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4"},Qe={class:"text-2xl font-bold text-blue-600"},Ue={class:"bg-green-50 dark:bg-green-900/20 rounded-xl p-4"},et={class:"text-2xl font-bold text-green-600"},tt={class:"bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4"},it={class:"text-2xl font-bold text-orange-600"},nt={class:"bg-red-50 dark:bg-red-900/20 rounded-xl p-4"},ot={class:"text-2xl font-bold text-red-600"},st={class:"flex items-center gap-2"},lt={class:"flex items-center gap-3 py-4"},rt={class:"flex items-center gap-2"},at={class:"flex items-center gap-2"},ct={class:"font-medium"},dt={class:"text-sm text-gray-500 ml-2"},ut={class:"flex items-center gap-2"},mt={class:"flex items-center gap-2"},ft={class:"flex items-center gap-2"},Lt=F({__name:"Workbench",setup(o){const s=pe(),d=me();fe();const a=b(null),r=b(!1),f=b(!1),c=b(0),h=b(0),C=b(0),S=b(0),w=b(0),N=b(0),T=b(0),k=b([]),L=async()=>{try{const g=await q.get("/user/dashboard/stats");c.value=g.studentCount||0,h.value=g.teacherCount||0,C.value=g.courseCount||0,S.value=g.classCount||0,w.value=g.todayLogins||0,N.value=g.activeTeachers||0,T.value=g.onlineStudents||0}catch{}},j=async()=>{try{k.value=await q.get("/user/dashboard/activities")||[]}catch{}};return ve(async()=>{await Promise.all([L(),j()]),f.value=!0,he().then(g=>{a.value=g,r.value=!1}).catch(()=>{r.value=!0}).finally(()=>{f.value=!1})}),(g,l)=>{var V;return x(),I("div",null,[t("div",We,[t("h2",Me,_((V=e(d).userInfo)==null?void 0:V.realName)+"，欢迎回来！",1),t("p",He,"今天是 "+_(new Date().toLocaleDateString("zh-CN",{year:"numeric",month:"long",day:"numeric",weekday:"long"})),1)]),i(e(Z),{cols:4,"x-gap":16,"y-gap":16,class:"mb-6"},{default:n(()=>[i(e(R),null,{default:n(()=>[i(e(z),{bordered:!0,class:"hover:shadow-lg transition-shadow cursor-pointer",onClick:l[0]||(l[0]=u=>e(s).push("/student/list"))},{default:n(()=>[t("div",Ke,[t("div",null,[i(e(E),{title:"学生总数",value:c.value.toLocaleString()},null,8,["value"])]),i(e(y),{size:"36",color:"#2080F0"},{default:n(()=>[i(e(xe))]),_:1})])]),_:1})]),_:1}),i(e(R),null,{default:n(()=>[i(e(z),{bordered:!0,class:"hover:shadow-lg transition-shadow cursor-pointer",onClick:l[1]||(l[1]=u=>e(s).push("/teacher/list"))},{default:n(()=>[t("div",Ge,[t("div",null,[i(e(E),{title:"教师总数",value:h.value.toLocaleString()},null,8,["value"])]),i(e(y),{size:"36",color:"#18A058"},{default:n(()=>[i(e(be))]),_:1})])]),_:1})]),_:1}),i(e(R),null,{default:n(()=>[i(e(z),{bordered:!0,class:"hover:shadow-lg transition-shadow cursor-pointer",onClick:l[2]||(l[2]=u=>e(s).push("/course/list"))},{default:n(()=>[t("div",qe,[t("div",null,[i(e(E),{title:"课程数量",value:C.value.toLocaleString()},null,8,["value"])]),i(e(y),{size:"36",color:"#F0A020"},{default:n(()=>[i(e(_e))]),_:1})])]),_:1})]),_:1}),i(e(R),null,{default:n(()=>[i(e(z),{bordered:!0,class:"hover:shadow-lg transition-shadow cursor-pointer",onClick:l[3]||(l[3]=u=>e(s).push("/class/list"))},{default:n(()=>[t("div",Je,[t("div",null,[i(e(E),{title:"班级数量",value:S.value.toLocaleString()},null,8,["value"])]),i(e(y),{size:"36",color:"#D03050"},{default:n(()=>[i(e(ze))]),_:1})])]),_:1})]),_:1})]),_:1}),i(e(Z),{cols:2,"x-gap":16},{default:n(()=>[i(e(R),null,{default:n(()=>[i(e(z),{class:"mb-4"},{header:n(()=>[t("div",Xe,[i(e(y),{size:"20",color:"#2080F0"},{default:n(()=>[i(e(ye))]),_:1}),l[4]||(l[4]=t("span",{class:"font-semibold"},"数据概览",-1))])]),default:n(()=>{var u;return[t("div",Ye,[t("div",Ze,[l[5]||(l[5]=t("div",{class:"text-sm text-gray-500"},"今日登录",-1)),t("div",Qe,_(w.value.toLocaleString()),1)]),t("div",Ue,[l[6]||(l[6]=t("div",{class:"text-sm text-gray-500"},"活跃教师",-1)),t("div",et,_(N.value.toLocaleString()),1)]),t("div",tt,[l[7]||(l[7]=t("div",{class:"text-sm text-gray-500"},"在线学生",-1)),t("div",it,_(T.value.toLocaleString()),1)]),t("div",nt,[l[8]||(l[8]=t("div",{class:"text-sm text-gray-500"},"风险预警",-1)),t("div",ot,_(((u=a.value)==null?void 0:u.totalRisks)||0),1)])])]}),_:1}),f.value?(x(),$(e(z),{key:0,class:"mb-4"},{header:n(()=>[t("div",st,[i(e(y),{size:"20",color:"#D03050"},{default:n(()=>[i(e(W))]),_:1}),l[9]||(l[9]=t("span",{class:"font-semibold"},"AI 风险预警",-1))])]),default:n(()=>[t("div",lt,[i(e(Ce),{size:"small"}),l[10]||(l[10]=t("span",{class:"text-gray-500"},"AI 正在分析全体学生数据，请稍候...",-1))])]),_:1})):r.value?(x(),$(e(z),{key:1,class:"mb-4"},{header:n(()=>[t("div",rt,[i(e(y),{size:"20",color:"#D03050"},{default:n(()=>[i(e(W))]),_:1}),l[11]||(l[11]=t("span",{class:"font-semibold"},"AI 风险预警",-1))])]),default:n(()=>[i(e(M),{description:"AI 服务暂不可用，请检查 ai-service 是否已启动"})]),_:1})):a.value&&a.value.totalRisks>0?(x(),$(e(z),{key:2},{header:n(()=>[t("div",at,[i(e(y),{size:"20",color:"#D03050"},{default:n(()=>[i(e(W))]),_:1}),l[12]||(l[12]=t("span",{class:"font-semibold"},"AI 风险预警",-1))])]),default:n(()=>[(x(!0),I(J,null,X(a.value.riskItems.slice(0,3),u=>(x(),I("div",{key:u.studentId,class:"flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0"},[t("div",null,[t("span",ct,_(u.studentName),1),t("span",dt,_(u.className),1)]),t("div",ut,[i(e(Se),{type:u.riskLevel==="high"?"error":u.riskLevel==="medium"?"warning":"info",size:"small"},{default:n(()=>[Y(_(u.riskType),1)]),_:2},1032,["type"])])]))),128))]),_:1})):a.value&&a.value.totalRisks===0?(x(),$(e(z),{key:3,class:"mb-4"},{header:n(()=>[t("div",mt,[i(e(y),{size:"20",color:"#18A058"},{default:n(()=>[i(e(De))]),_:1}),l[13]||(l[13]=t("span",{class:"font-semibold"},"AI 风险预警",-1))])]),default:n(()=>[i(e(M),{description:"暂无风险预警，所有学生学习情况良好"})]),_:1})):ge("",!0)]),_:1}),i(e(R),null,{default:n(()=>[i(e(z),null,{header:n(()=>[t("div",ft,[i(e(y),{size:"20",color:"#18A058"},{default:n(()=>[i(e(ke))]),_:1}),l[14]||(l[14]=t("span",{class:"font-semibold"},"最近动态",-1))])]),default:n(()=>[k.value.length?(x(),$(e(Be),{key:0},{default:n(()=>[(x(!0),I(J,null,X(k.value,u=>(x(),$(e(Ae),{key:u.content+u.time,time:u.time,type:u.type},{default:n(()=>[Y(_(u.content),1)]),_:2},1032,["time","type"]))),128))]),_:1})):(x(),$(e(M),{key:1,description:"暂无动态"}))]),_:1})]),_:1})]),_:1})])}}});export{Lt as default};
