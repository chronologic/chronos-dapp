
          window.__NEXT_REGISTER_PAGE('/debt/step-3', function() {
            var comp = module.exports=webpackJsonp([12],{502:function(e,t,i){e.exports=i(503)},503:function(e,t,i){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=i(9),a=r(n),u=i(10),l=r(u),o=i(13),d=r(o),c=i(6),f=r(c),s=i(4),p=r(s),v=i(5),b=r(v),h=i(7),_=r(h),m=i(8),y=r(m),w=i(0),g=r(w),k=i(20),z=r(k),E=i(504),P=r(E),x=function(e){function t(){return(0,p.default)(this,t),(0,_.default)(this,(t.__proto__||(0,f.default)(t)).apply(this,arguments))}return(0,y.default)(t,e),(0,b.default)(t,[{key:"render",value:function(){return g.default.createElement(z.default,(0,d.default)({},this.props,{activeApp:"debt"}),g.default.createElement(P.default,null))}}],[{key:"getInitialProps",value:function(){function e(e){return t.apply(this,arguments)}var t=(0,l.default)(a.default.mark(function e(t){return a.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",z.default.getInitialProps(t));case 1:case"end":return e.stop()}},e,this)}));return e}()}]),t}(g.default.Component);t.default=x},504:function(e,t,i){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function n(e,t,i,r){i&&(0,f.default)(e,t,{enumerable:i.enumerable,configurable:i.configurable,writable:i.writable,value:i.initializer?i.initializer.call(r):void 0})}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a,u,l,o,d,c=i(15),f=r(c),s=i(6),p=r(s),v=i(4),b=r(v),h=i(5),_=r(h),m=i(7),y=r(m),w=i(8),g=r(w),k=i(0),z=r(k),E=i(16),P=i(14),x=i(27),j=r(x),O=i(28),A=r(O),N=(a=(0,P.inject)("web3Service"),u=(0,P.inject)("store"),a(l=u(l=(0,P.observer)((o=function(e){function t(e){(0,b.default)(this,t);var i=(0,y.default)(this,(t.__proto__||(0,p.default)(t)).call(this,"LENDER_SETUP","debt",e));return n(i,"_validations",d,i),i}return(0,g.default)(t,e),(0,_.default)(t,[{key:"getValidations",value:function(){return this._validations}},{key:"render",value:function(){var e=this.props.web3Service;return z.default.createElement(A.default,{activeApp:this.activeApp,activeStepKey:this.activeStepKey,onNext:this.goNext,web3Disabled:this.web3Disabled(e)},z.default.createElement("div",{className:"input-block-container"},this.renderProperty(this.properties.debtOwner,{side:"left"}),this.renderProperty(this.properties.initialAmount,{side:"right"})),z.default.createElement("div",{className:"input-block-container"},this.renderProperty(this.properties.exchangeRate,{side:"left"})))}}]),t}(j.default),d=function(e,t,i,r,n){var a={};return Object.keys(r).forEach(function(e){a[e]=r[e]}),a.enumerable=!!a.enumerable,a.configurable=!!a.configurable,("value"in a||a.initializer)&&(a.writable=!0),a=i.slice().reverse().reduce(function(i,r){return r(e,t,i)||i},a),n&&void 0!==a.initializer&&(a.value=a.initializer?a.initializer.call(n):void 0,a.initializer=void 0),void 0===a.initializer&&(Object.defineProperty(e,t,a),a=null),a}(o.prototype,"_validations",[E.observable],{enumerable:!0,initializer:function(){return{debtOwner:!0,initialAmount:!0,exchangeRate:!0,decimalUnits:!0}}}),l=o))||l)||l)||l);t.default=N}},[502]);
            return { page: comp.default }
          })
        