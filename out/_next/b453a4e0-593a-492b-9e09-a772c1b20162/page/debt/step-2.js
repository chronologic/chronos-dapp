
          window.__NEXT_REGISTER_PAGE('/debt/step-2', function() {
            var comp = module.exports=webpackJsonp([13],{499:function(e,t,i){e.exports=i(500)},500:function(e,t,i){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=i(9),a=r(n),l=i(10),u=r(l),o=i(13),d=r(o),s=i(6),c=r(s),f=i(4),p=r(f),v=i(5),b=r(v),h=i(7),_=r(h),y=i(8),m=r(y),w=i(0),E=r(w),g=i(20),k=r(g),z=i(501),P=r(z),S=function(e){function t(){return(0,p.default)(this,t),(0,_.default)(this,(t.__proto__||(0,c.default)(t)).apply(this,arguments))}return(0,m.default)(t,e),(0,b.default)(t,[{key:"render",value:function(){return E.default.createElement(k.default,(0,d.default)({},this.props,{activeApp:"debt"}),E.default.createElement(P.default,null))}}],[{key:"getInitialProps",value:function(){function e(e){return t.apply(this,arguments)}var t=(0,u.default)(a.default.mark(function e(t){return a.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",k.default.getInitialProps(t));case 1:case"end":return e.stop()}},e,this)}));return e}()}]),t}(E.default.Component);t.default=S},501:function(e,t,i){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function n(e,t,i,r){i&&(0,c.default)(e,t,{enumerable:i.enumerable,configurable:i.configurable,writable:i.writable,value:i.initializer?i.initializer.call(r):void 0})}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a,l,u,o,d,s=i(16),c=r(s),f=i(6),p=r(f),v=i(4),b=r(v),h=i(5),_=r(h),y=i(7),m=r(y),w=i(8),E=r(w),g=i(0),k=r(g),z=i(15),P=i(14),S=i(27),j=r(S),T=i(28),x=r(T),N=(a=(0,P.inject)("web3Service"),l=(0,P.inject)("store"),a(u=l(u=(0,P.observer)((o=function(e){function t(e){(0,b.default)(this,t);var i=(0,m.default)(this,(t.__proto__||(0,p.default)(t)).call(this,"INTEREST_RATES_SETUP","debt",e));return n(i,"_validations",d,i),i}return(0,E.default)(t,e),(0,_.default)(t,[{key:"getValidations",value:function(){return this._validations}},{key:"render",value:function(){var e=this.props.web3Service;return k.default.createElement(x.default,{activeApp:this.activeApp,activeStepKey:this.activeStepKey,onNext:this.goNext,web3Disabled:this.web3Disabled(e)},k.default.createElement("div",{className:"input-block-container"},this.renderProperty(this.properties.interestRate,{side:"left"}),this.renderProperty(this.properties.interestCycle,{side:"right"})),k.default.createElement("div",{className:"input-block-container"},this.renderProperty(this.properties.loanTerm,{side:"left"})))}}]),t}(j.default),d=function(e,t,i,r,n){var a={};return Object.keys(r).forEach(function(e){a[e]=r[e]}),a.enumerable=!!a.enumerable,a.configurable=!!a.configurable,("value"in a||a.initializer)&&(a.writable=!0),a=i.slice().reverse().reduce(function(i,r){return r(e,t,i)||i},a),n&&void 0!==a.initializer&&(a.value=a.initializer?a.initializer.call(n):void 0,a.initializer=void 0),void 0===a.initializer&&(Object.defineProperty(e,t,a),a=null),a}(o.prototype,"_validations",[z.observable],{enumerable:!0,initializer:function(){return{interestRate:!0,interestCycle:!0,loanTerm:!0}}}),u=o))||u)||u)||u);t.default=N}},[499]);
            return { page: comp.default }
          })
        