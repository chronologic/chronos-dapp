
          window.__NEXT_REGISTER_PAGE('/step-4', function() {
            var comp = module.exports=webpackJsonp([4],{264:function(e,t,r){e.exports=r(265)},265:function(e,t,r){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(10),s=i(n),a=r(11),l=i(a),o=r(3),u=i(o),d=r(0),p=i(d),c=r(1),f=i(c),h=r(4),m=i(h),v=r(5),y=i(v),P=r(2),g=i(P),_=r(43),k=i(_),E=r(266),b=i(E),N=function(e){function t(){return(0,p.default)(this,t),(0,m.default)(this,(t.__proto__||(0,u.default)(t)).apply(this,arguments))}return(0,y.default)(t,e),(0,f.default)(t,[{key:"render",value:function(){return g.default.createElement(k.default,this.props,g.default.createElement(b.default,null))}}],[{key:"getInitialProps",value:function(){function e(e){return t.apply(this,arguments)}var t=(0,l.default)(s.default.mark(function e(t){return s.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",k.default.getInitialProps(t));case 1:case"end":return e.stop()}},e,this)}));return e}()}]),t}(g.default.Component);t.default=N},266:function(e,t,r){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n,s,a=r(3),l=i(a),o=r(0),u=i(o),d=r(1),p=i(d),c=r(4),f=i(c),h=r(5),m=i(h),v=r(2),y=i(v),P=r(25),g=r(23),_=i(g),k=r(34),E=r(55),b=i(E),N=r(56),x=i(N),M=(n=(0,P.inject)("store"))(s=(0,P.observer)(s=function(e){function t(e){(0,u.default)(this,t);var r=(0,f.default)(this,(t.__proto__||(0,l.default)(t)).call(this,"PUBLISH",e));return r.goNext=function(){k.PROPERTIES.reduce(function(e,t){return e.push(r.validate(t)),e},[]).some(function(e){return!e})||_.default.push("/step-4")},r}return(0,m.default)(t,e),(0,p.default)(t,[{key:"getValidations",value:function(){return this._validations}},{key:"renderProperty",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=this.props.store,i=e.name,n=e.title;return y.default.createElement("div",{className:t.side},y.default.createElement("span",{className:"values"},n+": "+r[i]))}},{key:"render",value:function(){return y.default.createElement(x.default,{activeStepKey:this.activeStepKey,onNext:this.goNext,nextTitle:"Deploy"},y.default.createElement("div",{className:"input-block-container"},this.renderProperty(this.properties.tokenName,{side:"left"}),this.renderProperty(this.properties.symbol,{side:"right"})),y.default.createElement("div",{className:"input-block-container"},this.renderProperty(this.properties.minMintingPower,{side:"left"}),this.renderProperty(this.properties.maxMintingPower,{side:"right"})),y.default.createElement("div",{className:"input-block-container"},this.renderProperty(this.properties.halvingCycle,{side:"left"}),this.renderProperty(this.properties.mintingPeriod,{side:"right"})),y.default.createElement("div",{className:"input-block-container"},this.renderProperty(this.properties.maxAddresses,{side:"left"}),this.renderProperty(this.properties.startingId,{side:"right"})),y.default.createElement("div",{className:"input-block-container"},this.renderProperty(this.properties.totalMintingId,{side:"left"}),this.renderProperty(this.properties.teamLockPeriod,{side:"right"})),y.default.createElement("div",{className:"input-block-container"},this.renderProperty(this.properties.postDeploymentMaxIds,{side:"left"}),this.renderProperty(this.properties.minimumBalance,{side:"right"})))}}]),t}(b.default))||s)||s;t.default=M}},[264]);
            return { page: comp.default }
          })
        