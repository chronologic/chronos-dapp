
          window.__NEXT_REGISTER_PAGE('/step-4', function() {
            var comp = module.exports=webpackJsonp([4],{264:function(e,t,r){e.exports=r(265)},265:function(e,t,r){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(10),a=i(n),s=r(11),o=i(s),l=r(16),u=i(l),d=r(3),c=i(d),f=r(0),p=i(f),m=r(1),h=i(m),_=r(4),N=i(_),v=r(5),y=i(v),P=r(2),b=i(P),g=r(43),k=i(g),E=r(266),w=i(E),x="D:\\Matt\\Downloads\\New folder\\work-dont touch\\cdd\\pages\\step-4.js?entry",M=function(e){function t(){return(0,p.default)(this,t),(0,N.default)(this,(t.__proto__||(0,c.default)(t)).apply(this,arguments))}return(0,y.default)(t,e),(0,h.default)(t,[{key:"render",value:function(){return b.default.createElement(k.default,(0,u.default)({},this.props,{__source:{fileName:x,lineNumber:13}}),b.default.createElement(w.default,{__source:{fileName:x,lineNumber:14}}))}}],[{key:"getInitialProps",value:function(){function e(e){return t.apply(this,arguments)}var t=(0,o.default)(a.default.mark(function e(t){return a.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",k.default.getInitialProps(t));case 1:case"end":return e.stop()}},e,this)}));return e}()}]),t}(b.default.Component);t.default=M},266:function(e,t,r){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n,a,s=r(3),o=i(s),l=r(0),u=i(l),d=r(1),c=i(d),f=r(4),p=i(f),m=r(5),h=i(m),_=r(2),N=i(_),v=r(25),y=r(24),P=(i(y),r(34)),b=r(55),g=i(b),k=r(56),E=i(k),w="D:\\Matt\\Downloads\\New folder\\work-dont touch\\cdd\\components\\Step4.js",x=(n=(0,v.inject)("store"))(a=(0,v.observer)(a=function(e){function t(e){(0,u.default)(this,t);var r=(0,p.default)(this,(t.__proto__||(0,o.default)(t)).call(this,"PUBLISH",e));return r.goNext=function(){if(!P.PROPERTIES.reduce(function(e,t){return e.push(r.validate(t.name)),e},[]).some(function(e){return!e}))throw new Error("Implement next stage")},r}return(0,h.default)(t,e),(0,c.default)(t,[{key:"getValidations",value:function(){return{}}},{key:"renderProperty",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=this.props.store,i=e.name,n=e.title;return N.default.createElement("div",{className:t.side,__source:{fileName:w,lineNumber:39}},N.default.createElement("span",{className:"values",__source:{fileName:w,lineNumber:40}},n+": "+r[i]))}},{key:"render",value:function(){return N.default.createElement(E.default,{activeStepKey:this.activeStepKey,onNext:this.goNext,nextTitle:"Deploy",__source:{fileName:w,lineNumber:47}},N.default.createElement("div",{className:"input-block-container",__source:{fileName:w,lineNumber:52}},this.renderProperty(this.properties.tokenName,{side:"left"}),this.renderProperty(this.properties.symbol,{side:"right"})),N.default.createElement("div",{className:"input-block-container",__source:{fileName:w,lineNumber:56}},this.renderProperty(this.properties.minMintingPower,{side:"left"}),this.renderProperty(this.properties.maxMintingPower,{side:"right"})),N.default.createElement("div",{className:"input-block-container",__source:{fileName:w,lineNumber:60}},this.renderProperty(this.properties.halvingCycle,{side:"left"}),this.renderProperty(this.properties.mintingPeriod,{side:"right"})),N.default.createElement("div",{className:"input-block-container",__source:{fileName:w,lineNumber:64}},this.renderProperty(this.properties.maxAddresses,{side:"left"}),this.renderProperty(this.properties.startingId,{side:"right"})),N.default.createElement("div",{className:"input-block-container",__source:{fileName:w,lineNumber:68}},this.renderProperty(this.properties.totalMintingId,{side:"left"}),this.renderProperty(this.properties.teamLockPeriod,{side:"right"})),N.default.createElement("div",{className:"input-block-container",__source:{fileName:w,lineNumber:72}},this.renderProperty(this.properties.postDeploymentMaxIds,{side:"left"}),this.renderProperty(this.properties.minimumBalance,{side:"right"})))}}]),t}(g.default))||a)||a;t.default=x}},[264]);
            return { page: comp.default }
          })
        