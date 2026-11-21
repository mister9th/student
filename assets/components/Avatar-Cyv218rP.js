import{i as M,o as G}from"../shared/utils-I3fIfIok.js";import{t as N}from"./Tag-C2JvlPo0.js";import{af as V,H,aZ as W,G as P,a_ as _,K as T,ao as K,c3 as A,aS as p,c5 as X,V as D,ct as U,cG as w,cH as Y,a7 as y,bV as O,bG as Z,cM as q,bE as J,cL as Q,aX as k,t as ee,ag as re,a0 as oe}from"../index-BgKidx7_.js";const te=V("n-avatar-group"),ne=H("avatar",`
 width: var(--n-merged-size);
 height: var(--n-merged-size);
 color: #FFF;
 font-size: var(--n-font-size);
 display: inline-flex;
 position: relative;
 overflow: hidden;
 text-align: center;
 border: var(--n-border);
 border-radius: var(--n-border-radius);
 --n-merged-color: var(--n-color);
 background-color: var(--n-merged-color);
 transition:
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
`,[W(P("&","--n-merged-color: var(--n-color-modal);")),_(P("&","--n-merged-color: var(--n-color-popover);")),P("img",`
 width: 100%;
 height: 100%;
 `),T("text",`
 white-space: nowrap;
 display: inline-block;
 position: absolute;
 left: 50%;
 top: 50%;
 `),H("icon",`
 vertical-align: bottom;
 font-size: calc(var(--n-merged-size) - 6px);
 `),T("text","line-height: 1.25")]),ae=Object.assign(Object.assign({},w.props),{size:[String,Number],src:String,circle:{type:Boolean,default:void 0},objectFit:String,round:{type:Boolean,default:void 0},bordered:{type:Boolean,default:void 0},onError:Function,fallbackSrc:String,intersectionObserverOptions:Object,lazy:Boolean,onLoad:Function,renderPlaceholder:Function,renderFallback:Function,imgProps:Object,color:String}),de=K({name:"Avatar",props:ae,slots:Object,setup(o){const{mergedClsPrefixRef:l,inlineThemeDisabled:m}=U(o),g=O(!1);let d=null;const c=O(null),s=O(null),x=()=>{const{value:e}=c;if(e&&(d===null||d!==e.innerHTML)){d=e.innerHTML;const{value:r}=s;if(r){const{offsetWidth:t,offsetHeight:a}=r,{offsetWidth:n,offsetHeight:S}=e,R=.9,j=Math.min(t/n*R,a/S*R,1);e.style.transform=`translateX(-50%) translateY(-50%) scale(${j})`}}},b=k(te,null),i=y(()=>{const{size:e}=o;if(e)return e;const{size:r}=b||{};return r||"medium"}),u=w("Avatar","-avatar",ne,ee,o,l),z=k(N,null),f=y(()=>{if(b)return!0;const{round:e,circle:r}=o;return e!==void 0||r!==void 0?e||r:z?z.roundRef.value:!1}),v=y(()=>b?!0:o.bordered||!1),F=y(()=>{const e=i.value,r=f.value,t=v.value,{color:a}=o,{self:{borderRadius:n,fontSize:S,color:R,border:j,colorModal:B,colorPopover:$},common:{cubicBezierEaseInOut:I}}=u.value;let E;return typeof e=="number"?E=`${e}px`:E=u.value.self[re("height",e)],{"--n-font-size":S,"--n-border":t?j:"none","--n-border-radius":r?"50%":n,"--n-color":a||R,"--n-color-modal":a||B,"--n-color-popover":a||$,"--n-bezier":I,"--n-merged-size":`var(--n-avatar-size-override, ${E})`}}),h=m?Y("avatar",y(()=>{const e=i.value,r=f.value,t=v.value,{color:a}=o;let n="";return e&&(typeof e=="number"?n+=`a${e}`:n+=e[0]),r&&(n+="b"),t&&(n+="c"),a&&(n+=oe(a)),n}),F,o):void 0,L=O(!o.lazy);Z(()=>{if(o.lazy&&o.intersectionObserverOptions){let e;const r=q(()=>{e==null||e(),e=void 0,o.lazy&&(e=G(s.value,o.intersectionObserverOptions,L))});J(()=>{r(),e==null||e()})}}),Q(()=>{var e;return o.src||((e=o.imgProps)===null||e===void 0?void 0:e.src)},()=>{g.value=!1});const C=O(!o.lazy);return{textRef:c,selfRef:s,mergedRoundRef:f,mergedClsPrefix:l,fitTextTransform:x,cssVars:m?void 0:F,themeClass:h==null?void 0:h.themeClass,onRender:h==null?void 0:h.onRender,hasLoadError:g,shouldStartLoading:L,loaded:C,mergedOnError:e=>{if(!L.value)return;g.value=!0;const{onError:r,imgProps:{onError:t}={}}=o;r==null||r(e),t==null||t(e)},mergedOnLoad:e=>{const{onLoad:r,imgProps:{onLoad:t}={}}=o;r==null||r(e),t==null||t(e),C.value=!0}}},render(){var o,l;const{$slots:m,src:g,mergedClsPrefix:d,lazy:c,onRender:s,loaded:x,hasLoadError:b,imgProps:i={}}=this;s==null||s();let u;const z=!x&&!b&&(this.renderPlaceholder?this.renderPlaceholder():(l=(o=this.$slots).placeholder)===null||l===void 0?void 0:l.call(o));return this.hasLoadError?u=this.renderFallback?this.renderFallback():A(m.fallback,()=>[p("img",{src:this.fallbackSrc,style:{objectFit:this.objectFit}})]):u=X(m.default,f=>{if(f)return p(D,{onResize:this.fitTextTransform},{default:()=>p("span",{ref:"textRef",class:`${d}-avatar__text`},f)});if(g||i.src){const v=this.src||i.src;return p("img",Object.assign(Object.assign({},i),{loading:M&&!this.intersectionObserverOptions&&c?"lazy":"eager",src:c&&this.intersectionObserverOptions?this.shouldStartLoading?v:void 0:v,"data-image-src":v,onLoad:this.mergedOnLoad,onError:this.mergedOnError,style:[i.style||"",{objectFit:this.objectFit},z?{height:"0",width:"0",visibility:"hidden",position:"absolute"}:""]}))}}),p("span",{ref:"selfRef",class:[`${d}-avatar`,this.themeClass],style:this.cssVars},u,c&&z)}});export{de as N};
