
          window.__NEXT_REGISTER_PAGE('/step-2', function() {
            var comp = module.exports=webpackJsonp([6],{258:function(e,t,i){e.exports=i(259)},259:function(e,t,i){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=i(10),a=r(n),l=i(11),u=r(l),o=i(3),d=r(o),s=i(0),f=r(s),c=i(1),p=r(c),v=i(4),h=r(v),g=i(5),m=r(g),b=i(2),P=r(b),y=i(43),_=r(y),w=i(260),M=r(w),k=function(e){function t(){return(0,f.default)(this,t),(0,h.default)(this,(t.__proto__||(0,d.default)(t)).apply(this,arguments))}return(0,m.default)(t,e),(0,p.default)(t,[{key:"render",value:function(){return P.default.createElement(_.default,this.props,P.default.createElement(M.default,null))}}],[{key:"getInitialProps",value:function(){function e(e){return t.apply(this,arguments)}var t=(0,u.default)(a.default.mark(function e(t){return a.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",_.default.getInitialProps(t));case 1:case"end":return e.stop()}},e,this)}));return e}()}]),t}(P.default.Component);t.default=k},260:function(e,t,i){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function n(e,t,i,r){i&&(0,s.default)(e,t,{enumerable:i.enumerable,configurable:i.configurable,writable:i.writable,value:i.initializer?i.initializer.call(r):void 0})}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a,l,u,o,d=i(19),s=r(d),f=i(24),c=r(f),p=i(3),v=r(p),h=i(0),g=r(h),m=i(1),b=r(m),P=i(4),y=r(P),_=i(5),w=r(_),M=i(2),k=r(M),x=i(26),z=i(25),E=i(55),T=r(E),j=i(56),C=r(j),N=(a=(0,z.inject)("store"))(l=(0,z.observer)((u=function(e){function t(e){(0,g.default)(this,t);var i=(0,y.default)(this,(t.__proto__||(0,v.default)(t)).call(this,"TIMEMINT_SETUP",e));return n(i,"_validations",o,i),i.properties=(0,c.default)(i.properties,{minMintingPower:(0,c.default)(i.properties.minMintingPower,{validator:i.validateDigit}),maxMintingPower:(0,c.default)(i.properties.maxMintingPower,{validator:i.isGreaterThanZero}),halvingCycle:(0,c.default)(i.properties.halvingCycle,{validator:i.isGreaterThanZero}),mintingPeriod:(0,c.default)(i.properties.mintingPeriod,{validator:i.isGreaterThanZero})}),i}return(0,w.default)(t,e),(0,b.default)(t,[{key:"getValidations",value:function(){return this._validations}},{key:"render",value:function(){return k.default.createElement(C.default,{activeStepKey:this.activeStepKey,onNext:this.goNext},k.default.createElement("div",{className:"input-block-container"},this.renderProperty(this.properties.minMintingPower,{side:"left"}),this.renderProperty(this.properties.maxMintingPower,{side:"right"})),k.default.createElement("div",{className:"input-block-container"},this.renderProperty(this.properties.halvingCycle,{side:"left"}),this.renderProperty(this.properties.mintingPeriod,{side:"right"})))}}]),t}(T.default),o=function(e,t,i,r,n){var a={};return Object.keys(r).forEach(function(e){a[e]=r[e]}),a.enumerable=!!a.enumerable,a.configurable=!!a.configurable,("value"in a||a.initializer)&&(a.writable=!0),a=i.slice().reverse().reduce(function(i,r){return r(e,t,i)||i},a),n&&void 0!==a.initializer&&(a.value=a.initializer?a.initializer.call(n):void 0,a.initializer=void 0),void 0===a.initializer&&(Object.defineProperty(e,t,a),a=null),a}(u.prototype,"_validations",[x.observable],{enumerable:!0,initializer:function(){return{minMintingPower:!0,maxMintingPower:!0,halvingCycle:!0,mintingPeriod:!0}}}),l=u))||l)||l;t.default=N}},[258]);
            return { page: comp.default }
          })
        