import{H as _,O as g,K as l,G as m,P as A,aT as ne,co as H,cq as G,bR as $,cr as j,Q as V,ae,cg as O,an as N,aO as B,c1 as ie,cz as P,cw as M,cA as K,a6 as T,bO as L,af as D,aC as de,bM as se}from"../index-BuOjXx4e.js";import{u as W}from"../shared/use-merged-state-BM56COzU.js";import{g as le}from"./get-slot-Bk_rJcZu.js";function Re(o,e){if(!o)return;const t=document.createElement("a");t.href=o,e!==void 0&&(t.download=e),document.body.appendChild(t),t.click(),document.body.removeChild(t)}const ce=_("radio",`
 line-height: var(--n-label-line-height);
 outline: none;
 position: relative;
 user-select: none;
 -webkit-user-select: none;
 display: inline-flex;
 align-items: flex-start;
 flex-wrap: nowrap;
 font-size: var(--n-font-size);
 word-break: break-word;
`,[g("checked",[l("dot",`
 background-color: var(--n-color-active);
 `)]),l("dot-wrapper",`
 position: relative;
 flex-shrink: 0;
 flex-grow: 0;
 width: var(--n-radio-size);
 `),_("radio-input",`
 position: absolute;
 border: 0;
 width: 0;
 height: 0;
 opacity: 0;
 margin: 0;
 `),l("dot",`
 position: absolute;
 top: 50%;
 left: 0;
 transform: translateY(-50%);
 height: var(--n-radio-size);
 width: var(--n-radio-size);
 background: var(--n-color);
 box-shadow: var(--n-box-shadow);
 border-radius: 50%;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 `,[m("&::before",`
 content: "";
 opacity: 0;
 position: absolute;
 left: 4px;
 top: 4px;
 height: calc(100% - 8px);
 width: calc(100% - 8px);
 border-radius: 50%;
 transform: scale(.8);
 background: var(--n-dot-color-active);
 transition: 
 opacity .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 transform .3s var(--n-bezier);
 `),g("checked",{boxShadow:"var(--n-box-shadow-active)"},[m("&::before",`
 opacity: 1;
 transform: scale(1);
 `)])]),l("label",`
 color: var(--n-text-color);
 padding: var(--n-label-padding);
 font-weight: var(--n-label-font-weight);
 display: inline-block;
 transition: color .3s var(--n-bezier);
 `),A("disabled",`
 cursor: pointer;
 `,[m("&:hover",[l("dot",{boxShadow:"var(--n-box-shadow-hover)"})]),g("focus",[m("&:not(:active)",[l("dot",{boxShadow:"var(--n-box-shadow-focus)"})])])]),g("disabled",`
 cursor: not-allowed;
 `,[l("dot",{boxShadow:"var(--n-box-shadow-disabled)",backgroundColor:"var(--n-color-disabled)"},[m("&::before",{backgroundColor:"var(--n-dot-color-disabled)"}),g("checked",`
 opacity: 1;
 `)]),l("label",{color:"var(--n-text-color-disabled)"}),_("radio-input",`
 cursor: not-allowed;
 `)])]),ue={name:String,value:{type:[String,Number,Boolean],default:"on"},checked:{type:Boolean,default:void 0},defaultChecked:Boolean,disabled:{type:Boolean,default:void 0},label:String,size:String,onUpdateChecked:[Function,Array],"onUpdate:checked":[Function,Array],checkedValue:{type:Boolean,default:void 0}},q=ae("n-radio-group");function be(o){const e=ne(q,null),{mergedClsPrefixRef:t,mergedComponentPropsRef:d}=H(o),a=G(o,{mergedSize(r){var n,i;const{size:f}=o;if(f!==void 0)return f;if(e){const{mergedSizeRef:{value:I}}=e;if(I!==void 0)return I}if(r)return r.mergedSize.value;const F=(i=(n=d==null?void 0:d.value)===null||n===void 0?void 0:n.Radio)===null||i===void 0?void 0:i.size;return F||"medium"},mergedDisabled(r){return!!(o.disabled||e!=null&&e.disabledRef.value||r!=null&&r.disabled.value)}}),{mergedSizeRef:p,mergedDisabledRef:c}=a,u=$(null),s=$(null),b=$(o.defaultChecked),x=O(o,"checked"),R=W(x,b),h=j(()=>e?e.valueRef.value===o.value:R.value),w=j(()=>{const{name:r}=o;if(r!==void 0)return r;if(e)return e.nameRef.value}),v=$(!1);function k(){if(e){const{doUpdateValue:r}=e,{value:n}=o;V(r,n)}else{const{onUpdateChecked:r,"onUpdate:checked":n}=o,{nTriggerFormInput:i,nTriggerFormChange:f}=a;r&&V(r,!0),n&&V(n,!0),i(),f(),b.value=!0}}function z(){c.value||h.value||k()}function S(){z(),u.value&&(u.value.checked=h.value)}function y(){v.value=!1}function C(){v.value=!0}return{mergedClsPrefix:e?e.mergedClsPrefixRef:t,inputRef:u,labelRef:s,mergedName:w,mergedDisabled:c,renderSafeChecked:h,focus:v,mergedSize:p,handleRadioInputChange:S,handleRadioInputBlur:y,handleRadioInputFocus:C}}const he=Object.assign(Object.assign({},P.props),ue),we=N({name:"Radio",props:he,setup(o){const e=be(o),t=P("Radio","-radio",ce,L,o,e.mergedClsPrefix),d=T(()=>{const{mergedSize:{value:b}}=e,{common:{cubicBezierEaseInOut:x},self:{boxShadow:R,boxShadowActive:h,boxShadowDisabled:w,boxShadowFocus:v,boxShadowHover:k,color:z,colorDisabled:S,colorActive:y,textColor:C,textColorDisabled:r,dotColorActive:n,dotColorDisabled:i,labelPadding:f,labelLineHeight:F,labelFontWeight:I,[D("fontSize",b)]:E,[D("radioSize",b)]:U}}=t.value;return{"--n-bezier":x,"--n-label-line-height":F,"--n-label-font-weight":I,"--n-box-shadow":R,"--n-box-shadow-active":h,"--n-box-shadow-disabled":w,"--n-box-shadow-focus":v,"--n-box-shadow-hover":k,"--n-color":z,"--n-color-active":y,"--n-color-disabled":S,"--n-dot-color-active":n,"--n-dot-color-disabled":i,"--n-font-size":E,"--n-radio-size":U,"--n-text-color":C,"--n-text-color-disabled":r,"--n-label-padding":f}}),{inlineThemeDisabled:a,mergedClsPrefixRef:p,mergedRtlRef:c}=H(o),u=M("Radio",c,p),s=a?K("radio",T(()=>e.mergedSize.value[0]),d,o):void 0;return Object.assign(e,{rtlEnabled:u,cssVars:a?void 0:d,themeClass:s==null?void 0:s.themeClass,onRender:s==null?void 0:s.onRender})},render(){const{$slots:o,mergedClsPrefix:e,onRender:t,label:d}=this;return t==null||t(),B("label",{class:[`${e}-radio`,this.themeClass,this.rtlEnabled&&`${e}-radio--rtl`,this.mergedDisabled&&`${e}-radio--disabled`,this.renderSafeChecked&&`${e}-radio--checked`,this.focus&&`${e}-radio--focus`],style:this.cssVars},B("div",{class:`${e}-radio__dot-wrapper`}," ",B("div",{class:[`${e}-radio__dot`,this.renderSafeChecked&&`${e}-radio__dot--checked`]}),B("input",{ref:"inputRef",type:"radio",class:`${e}-radio-input`,value:this.value,name:this.mergedName,checked:this.renderSafeChecked,disabled:this.mergedDisabled,onChange:this.handleRadioInputChange,onFocus:this.handleRadioInputFocus,onBlur:this.handleRadioInputBlur})),ie(o.default,a=>!a&&!d?null:B("div",{ref:"labelRef",class:`${e}-radio__label`},a||d)))}}),ve=_("radio-group",`
 display: inline-block;
 font-size: var(--n-font-size);
`,[l("splitor",`
 display: inline-block;
 vertical-align: bottom;
 width: 1px;
 transition:
 background-color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 background: var(--n-button-border-color);
 `,[g("checked",{backgroundColor:"var(--n-button-border-color-active)"}),g("disabled",{opacity:"var(--n-opacity-disabled)"})]),g("button-group",`
 white-space: nowrap;
 height: var(--n-height);
 line-height: var(--n-height);
 `,[_("radio-button",{height:"var(--n-height)",lineHeight:"var(--n-height)"}),l("splitor",{height:"var(--n-height)"})]),_("radio-button",`
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
 `,[_("radio-input",`
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
 `),l("state-border",`
 z-index: 1;
 pointer-events: none;
 position: absolute;
 box-shadow: var(--n-button-box-shadow);
 transition: box-shadow .3s var(--n-bezier);
 left: -1px;
 bottom: -1px;
 right: -1px;
 top: -1px;
 `),m("&:first-child",`
 border-top-left-radius: var(--n-button-border-radius);
 border-bottom-left-radius: var(--n-button-border-radius);
 border-left: 1px solid var(--n-button-border-color);
 `,[l("state-border",`
 border-top-left-radius: var(--n-button-border-radius);
 border-bottom-left-radius: var(--n-button-border-radius);
 `)]),m("&:last-child",`
 border-top-right-radius: var(--n-button-border-radius);
 border-bottom-right-radius: var(--n-button-border-radius);
 border-right: 1px solid var(--n-button-border-color);
 `,[l("state-border",`
 border-top-right-radius: var(--n-button-border-radius);
 border-bottom-right-radius: var(--n-button-border-radius);
 `)]),A("disabled",`
 cursor: pointer;
 `,[m("&:hover",[l("state-border",`
 transition: box-shadow .3s var(--n-bezier);
 box-shadow: var(--n-button-box-shadow-hover);
 `),A("checked",{color:"var(--n-button-text-color-hover)"})]),g("focus",[m("&:not(:active)",[l("state-border",{boxShadow:"var(--n-button-box-shadow-focus)"})])])]),g("checked",`
 background: var(--n-button-color-active);
 color: var(--n-button-text-color-active);
 border-color: var(--n-button-border-color-active);
 `),g("disabled",`
 cursor: not-allowed;
 opacity: var(--n-opacity-disabled);
 `)])]);function fe(o,e,t){var d;const a=[];let p=!1;for(let c=0;c<o.length;++c){const u=o[c],s=(d=u.type)===null||d===void 0?void 0:d.name;s==="RadioButton"&&(p=!0);const b=u.props;if(s!=="RadioButton"){a.push(u);continue}if(c===0)a.push(u);else{const x=a[a.length-1].props,R=e===x.value,h=x.disabled,w=e===b.value,v=b.disabled,k=(R?2:0)+(h?0:1),z=(w?2:0)+(v?0:1),S={[`${t}-radio-group__splitor--disabled`]:h,[`${t}-radio-group__splitor--checked`]:R},y={[`${t}-radio-group__splitor--disabled`]:v,[`${t}-radio-group__splitor--checked`]:w},C=k<z?y:S;a.push(B("div",{class:[`${t}-radio-group__splitor`,C]}),u)}}return{children:a,isButtonGroup:p}}const ge=Object.assign(Object.assign({},P.props),{name:String,value:[String,Number,Boolean],defaultValue:{type:[String,Number,Boolean],default:null},size:String,disabled:{type:Boolean,default:void 0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array]}),Ce=N({name:"RadioGroup",props:ge,setup(o){const e=$(null),{mergedSizeRef:t,mergedDisabledRef:d,nTriggerFormChange:a,nTriggerFormInput:p,nTriggerFormBlur:c,nTriggerFormFocus:u}=G(o),{mergedClsPrefixRef:s,inlineThemeDisabled:b,mergedRtlRef:x}=H(o),R=P("Radio","-radio-group",ve,L,o,s),h=$(o.defaultValue),w=O(o,"value"),v=W(w,h);function k(n){const{onUpdateValue:i,"onUpdate:value":f}=o;i&&V(i,n),f&&V(f,n),h.value=n,a(),p()}function z(n){const{value:i}=e;i&&(i.contains(n.relatedTarget)||u())}function S(n){const{value:i}=e;i&&(i.contains(n.relatedTarget)||c())}se(q,{mergedClsPrefixRef:s,nameRef:O(o,"name"),valueRef:v,disabledRef:d,mergedSizeRef:t,doUpdateValue:k});const y=M("Radio",x,s),C=T(()=>{const{value:n}=t,{common:{cubicBezierEaseInOut:i},self:{buttonBorderColor:f,buttonBorderColorActive:F,buttonBorderRadius:I,buttonBoxShadow:E,buttonBoxShadowFocus:U,buttonBoxShadowHover:Q,buttonColor:Y,buttonColorActive:J,buttonTextColor:X,buttonTextColorActive:Z,buttonTextColorHover:ee,opacityDisabled:oe,[D("buttonHeight",n)]:te,[D("fontSize",n)]:re}}=R.value;return{"--n-font-size":re,"--n-bezier":i,"--n-button-border-color":f,"--n-button-border-color-active":F,"--n-button-border-radius":I,"--n-button-box-shadow":E,"--n-button-box-shadow-focus":U,"--n-button-box-shadow-hover":Q,"--n-button-color":Y,"--n-button-color-active":J,"--n-button-text-color":X,"--n-button-text-color-hover":ee,"--n-button-text-color-active":Z,"--n-height":te,"--n-opacity-disabled":oe}}),r=b?K("radio-group",T(()=>t.value[0]),C,o):void 0;return{selfElRef:e,rtlEnabled:y,mergedClsPrefix:s,mergedValue:v,handleFocusout:S,handleFocusin:z,cssVars:b?void 0:C,themeClass:r==null?void 0:r.themeClass,onRender:r==null?void 0:r.onRender}},render(){var o;const{mergedValue:e,mergedClsPrefix:t,handleFocusin:d,handleFocusout:a}=this,{children:p,isButtonGroup:c}=fe(de(le(this)),e,t);return(o=this.onRender)===null||o===void 0||o.call(this),B("div",{onFocusin:d,onFocusout:a,ref:"selfElRef",class:[`${t}-radio-group`,this.rtlEnabled&&`${t}-radio-group--rtl`,this.themeClass,c&&`${t}-radio-group--button-group`],style:this.cssVars},p)}});export{we as N,Ce as a,Re as d};
