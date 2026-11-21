import{aX as ee,cs as D,cu as $,bV as k,cx as U,Q as w,af as oe,ck as T,H as V,K as g,O as C,G as _,P as G,ao as te,aG as re,aS as A,cF as H,cC as ne,cG as ae,a7 as P,bS as ie,ag as E,bQ as de}from"../index-DYWs6O1r.js";import{u as N}from"../shared/use-merged-state-Kt_F9tnB.js";import{g as se}from"./get-slot-Bk_rJcZu.js";const he={name:String,value:{type:[String,Number,Boolean],default:"on"},checked:{type:Boolean,default:void 0},defaultChecked:Boolean,disabled:{type:Boolean,default:void 0},label:String,size:String,onUpdateChecked:[Function,Array],"onUpdate:checked":[Function,Array],checkedValue:{type:Boolean,default:void 0}},j=oe("n-radio-group");function ge(e){const o=ee(j,null),{mergedClsPrefixRef:n,mergedComponentPropsRef:d}=D(e),i=$(e,{mergedSize(t){var r,a;const{size:v}=e;if(v!==void 0)return v;if(o){const{mergedSizeRef:{value:I}}=o;if(I!==void 0)return I}if(t)return t.mergedSize.value;const F=(a=(r=d==null?void 0:d.value)===null||r===void 0?void 0:r.Radio)===null||a===void 0?void 0:a.size;return F||"medium"},mergedDisabled(t){return!!(e.disabled||o!=null&&o.disabledRef.value||t!=null&&t.disabled.value)}}),{mergedSizeRef:f,mergedDisabledRef:s}=i,l=k(null),u=k(null),h=k(e.defaultChecked),p=T(e,"checked"),m=N(p,h),c=U(()=>o?o.valueRef.value===e.value:m.value),R=U(()=>{const{name:t}=e;if(t!==void 0)return t;if(o)return o.nameRef.value}),b=k(!1);function z(){if(o){const{doUpdateValue:t}=o,{value:r}=e;w(t,r)}else{const{onUpdateChecked:t,"onUpdate:checked":r}=e,{nTriggerFormInput:a,nTriggerFormChange:v}=i;t&&w(t,!0),r&&w(r,!0),a(),v(),h.value=!0}}function y(){s.value||c.value||z()}function S(){y(),l.value&&(l.value.checked=c.value)}function B(){b.value=!1}function x(){b.value=!0}return{mergedClsPrefix:o?o.mergedClsPrefixRef:n,inputRef:l,labelRef:u,mergedName:R,mergedDisabled:s,renderSafeChecked:c,focus:b,mergedSize:f,handleRadioInputChange:S,handleRadioInputBlur:B,handleRadioInputFocus:x}}const le=V("radio-group",`
 display: inline-block;
 font-size: var(--n-font-size);
`,[g("splitor",`
 display: inline-block;
 vertical-align: bottom;
 width: 1px;
 transition:
 background-color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 background: var(--n-button-border-color);
 `,[C("checked",{backgroundColor:"var(--n-button-border-color-active)"}),C("disabled",{opacity:"var(--n-opacity-disabled)"})]),C("button-group",`
 white-space: nowrap;
 height: var(--n-height);
 line-height: var(--n-height);
 `,[V("radio-button",{height:"var(--n-height)",lineHeight:"var(--n-height)"}),g("splitor",{height:"var(--n-height)"})]),V("radio-button",`
 vertical-align: bottom;
 outline: none;
 position: relative;
 user-select: none;
 -webkit-user-select: none;
 display: inline-block;
 box-sizing: border-box;
 padding-left: 14px;
 padding-right: 14px;
 white-space: nowrap;
 transition:
 background-color .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 background: var(--n-button-color);
 color: var(--n-button-text-color);
 border-top: 1px solid var(--n-button-border-color);
 border-bottom: 1px solid var(--n-button-border-color);
 `,[V("radio-input",`
 pointer-events: none;
 position: absolute;
 border: 0;
 border-radius: inherit;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 opacity: 0;
 z-index: 1;
 `),g("state-border",`
 z-index: 1;
 pointer-events: none;
 position: absolute;
 box-shadow: var(--n-button-box-shadow);
 transition: box-shadow .3s var(--n-bezier);
 left: -1px;
 bottom: -1px;
 right: -1px;
 top: -1px;
 `),_("&:first-child",`
 border-top-left-radius: var(--n-button-border-radius);
 border-bottom-left-radius: var(--n-button-border-radius);
 border-left: 1px solid var(--n-button-border-color);
 `,[g("state-border",`
 border-top-left-radius: var(--n-button-border-radius);
 border-bottom-left-radius: var(--n-button-border-radius);
 `)]),_("&:last-child",`
 border-top-right-radius: var(--n-button-border-radius);
 border-bottom-right-radius: var(--n-button-border-radius);
 border-right: 1px solid var(--n-button-border-color);
 `,[g("state-border",`
 border-top-right-radius: var(--n-button-border-radius);
 border-bottom-right-radius: var(--n-button-border-radius);
 `)]),G("disabled",`
 cursor: pointer;
 `,[_("&:hover",[g("state-border",`
 transition: box-shadow .3s var(--n-bezier);
 box-shadow: var(--n-button-box-shadow-hover);
 `),G("checked",{color:"var(--n-button-text-color-hover)"})]),C("focus",[_("&:not(:active)",[g("state-border",{boxShadow:"var(--n-button-box-shadow-focus)"})])])]),C("checked",`
 background: var(--n-button-color-active);
 color: var(--n-button-text-color-active);
 border-color: var(--n-button-border-color-active);
 `),C("disabled",`
 cursor: not-allowed;
 opacity: var(--n-opacity-disabled);
 `)])]);function ue(e,o,n){var d;const i=[];let f=!1;for(let s=0;s<e.length;++s){const l=e[s],u=(d=l.type)===null||d===void 0?void 0:d.name;u==="RadioButton"&&(f=!0);const h=l.props;if(u!=="RadioButton"){i.push(l);continue}if(s===0)i.push(l);else{const p=i[i.length-1].props,m=o===p.value,c=p.disabled,R=o===h.value,b=h.disabled,z=(m?2:0)+(c?0:1),y=(R?2:0)+(b?0:1),S={[`${n}-radio-group__splitor--disabled`]:c,[`${n}-radio-group__splitor--checked`]:m},B={[`${n}-radio-group__splitor--disabled`]:b,[`${n}-radio-group__splitor--checked`]:R},x=z<y?B:S;i.push(A("div",{class:[`${n}-radio-group__splitor`,x]}),l)}}return{children:i,isButtonGroup:f}}const ce=Object.assign(Object.assign({},H.props),{name:String,value:[String,Number,Boolean],defaultValue:{type:[String,Number,Boolean],default:null},size:String,disabled:{type:Boolean,default:void 0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array]}),pe=te({name:"RadioGroup",props:ce,setup(e){const o=k(null),{mergedSizeRef:n,mergedDisabledRef:d,nTriggerFormChange:i,nTriggerFormInput:f,nTriggerFormBlur:s,nTriggerFormFocus:l}=$(e),{mergedClsPrefixRef:u,inlineThemeDisabled:h,mergedRtlRef:p}=D(e),m=H("Radio","-radio-group",le,ie,e,u),c=k(e.defaultValue),R=T(e,"value"),b=N(R,c);function z(r){const{onUpdateValue:a,"onUpdate:value":v}=e;a&&w(a,r),v&&w(v,r),c.value=r,i(),f()}function y(r){const{value:a}=o;a&&(a.contains(r.relatedTarget)||l())}function S(r){const{value:a}=o;a&&(a.contains(r.relatedTarget)||s())}de(j,{mergedClsPrefixRef:u,nameRef:T(e,"name"),valueRef:b,disabledRef:d,mergedSizeRef:n,doUpdateValue:z});const B=ne("Radio",p,u),x=P(()=>{const{value:r}=n,{common:{cubicBezierEaseInOut:a},self:{buttonBorderColor:v,buttonBorderColorActive:F,buttonBorderRadius:I,buttonBoxShadow:K,buttonBoxShadowFocus:M,buttonBoxShadowHover:O,buttonColor:Q,buttonColorActive:L,buttonTextColor:X,buttonTextColorActive:q,buttonTextColorHover:J,opacityDisabled:W,[E("buttonHeight",r)]:Y,[E("fontSize",r)]:Z}}=m.value;return{"--n-font-size":Z,"--n-bezier":a,"--n-button-border-color":v,"--n-button-border-color-active":F,"--n-button-border-radius":I,"--n-button-box-shadow":K,"--n-button-box-shadow-focus":M,"--n-button-box-shadow-hover":O,"--n-button-color":Q,"--n-button-color-active":L,"--n-button-text-color":X,"--n-button-text-color-hover":J,"--n-button-text-color-active":q,"--n-height":Y,"--n-opacity-disabled":W}}),t=h?ae("radio-group",P(()=>n.value[0]),x,e):void 0;return{selfElRef:o,rtlEnabled:B,mergedClsPrefix:u,mergedValue:b,handleFocusout:S,handleFocusin:y,cssVars:h?void 0:x,themeClass:t==null?void 0:t.themeClass,onRender:t==null?void 0:t.onRender}},render(){var e;const{mergedValue:o,mergedClsPrefix:n,handleFocusin:d,handleFocusout:i}=this,{children:f,isButtonGroup:s}=ue(re(se(this)),o,n);return(e=this.onRender)===null||e===void 0||e.call(this),A("div",{onFocusin:d,onFocusout:i,ref:"selfElRef",class:[`${n}-radio-group`,this.rtlEnabled&&`${n}-radio-group--rtl`,this.themeClass,s&&`${n}-radio-group--button-group`],style:this.cssVars},f)}});export{pe as N,he as r,ge as s};
