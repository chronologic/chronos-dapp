
          window.__NEXT_REGISTER_PAGE('/', function() {
            var comp = module.exports=webpackJsonp([9],{251:function(e,t,a){e.exports=a(252)},252:function(e,t,a){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=a(15),l=r(n),s=a(17),u=r(s),o=a(18),i=r(o),c=a(4),f=r(c),d=a(1),m=r(d),p=a(2),h=r(p),_=a(5),N=r(_),b=a(6),v=r(b),k="D:\\Matt\\Downloads\\New folder\\work-dont touch\\cdd\\pages\\index.js?entry",w=a(0),E=r(w),y=a(47),x=r(y),D=a(338),g=r(D),T=function(e){function t(){return(0,m.default)(this,t),(0,N.default)(this,(t.__proto__||(0,f.default)(t)).apply(this,arguments))}return(0,v.default)(t,e),(0,h.default)(t,[{key:"render",value:function(){return E.default.createElement(x.default,(0,i.default)({},this.props,{__source:{fileName:k,lineNumber:13}}),E.default.createElement(g.default,{__source:{fileName:k,lineNumber:14}}))}}],[{key:"getInitialProps",value:function(){function e(e){return t.apply(this,arguments)}var t=(0,u.default)(l.default.mark(function e(t){return l.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",x.default.getInitialProps(t));case 1:case"end":return e.stop()}},e,this)}));return e}()}]),t}(E.default.Component);t.default=T},338:function(e,t,a){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n,l,s=a(44),u=r(s),o=a(150),i=r(o),c=a(15),f=r(c),d=a(17),m=r(d),p=a(4),h=r(p),_=a(1),N=r(_),b=a(2),v=r(b),k=a(5),w=r(k),E=a(6),y=r(E),x="D:\\Matt\\Downloads\\New folder\\work-dont touch\\cdd\\components\\Home.js",D=a(0),g=r(D),T=a(30),M=r(T),A=a(31),S=a(37),P=a(102),C=a(107),I=r(C),j=(n=(0,A.inject)("web3Service"))(l=(0,A.observer)(l=function(e){function t(){var e,a,r,n,l=this;(0,N.default)(this,t);for(var s=arguments.length,u=Array(s),o=0;o<s;o++)u[o]=arguments[o];return a=r=(0,w.default)(this,(e=t.__proto__||(0,h.default)(t)).call.apply(e,[this].concat(u))),r.onStart=function(){var e=(0,m.default)(f.default.mark(function e(t){var a,n,s;return f.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!r.web3Disabled()){e.next=2;break}return e.abrupt("return");case 2:return a=t.target,a.disabled=!0,n=r.props.web3Service,s=I.default[I.default.active].MIN_FEE,e.next=8,n.checkBalance();case 8:if(e.sent){e.next=11;break}return(0,P.showError)("You need to have at least "+(s/10^18)+" DAY tokens to use this Dapp"),e.abrupt("return",a.disabled=!1);case 11:return e.next=13,n.checkAllowance();case 13:if(e.t0=e.sent,e.t0){e.next=23;break}return e.next=17,(0,P.confirmFeeWithdraw)();case 17:if(e.t1=e.sent,!e.t1){e.next=22;break}return e.next=21,r.reserveTokens();case 21:e.t1=e.sent;case 22:e.t0=e.t1;case 23:if(!e.t0){e.next=27;break}r.start(),e.next=28;break;case 27:a.disabled=!1;case 28:case"end":return e.stop()}},e,l)}));return function(t){return e.apply(this,arguments)}}(),n=a,(0,w.default)(r,n)}return(0,y.default)(t,e),(0,v.default)(t,[{key:"reserveTokens",value:function(){function e(){return t.apply(this,arguments)}var t=(0,m.default)(f.default.mark(function e(){var t,a;return f.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=this.props.web3Service,e.prev=1,e.next=4,t.approveFee();case 4:a=e.sent,console.log(a),(0,P.showInfo)("Token Release Tx Status","TxHash "+a),this.start(),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(1),(0,P.showError)("Could not complete transaction");case 13:case"end":return e.stop()}},e,this,[[1,10]])}));return e}()},{key:"web3Disabled",value:function(){var e=this.props.web3Service;return!e.connectedToMetaMask||!(void 0!==e.accounts&&e.accounts.length>0)}},{key:"start",value:function(){M.default.push("/step-1")}},{key:"render",value:function(){return g.default.createElement("div",{__source:{fileName:x,lineNumber:58}},g.default.createElement("section",{className:"home",__source:{fileName:x,lineNumber:59}},g.default.createElement("div",{className:"crowdsale",__source:{fileName:x,lineNumber:60}},g.default.createElement("div",{className:"container",__source:{fileName:x,lineNumber:61}},g.default.createElement("h1",{className:"title",__source:{fileName:x,lineNumber:62}},"Welcome to the Chronologic's DAPP"),g.default.createElement("p",{className:"description",__source:{fileName:x,lineNumber:63}},"This DAPP (Decentralized App) allows anyone to create a his/hers own version of minting token easily.",g.default.createElement("br",{__source:{fileName:x,lineNumber:65}}),"The steps ahead will help you set up all features of your very own version of the DAY token."),g.default.createElement("div",{className:"buttons",__source:{fileName:x,lineNumber:69}},g.default.createElement("button",{className:"button button_fill",onClick:this.onStart,disabled:this.web3Disabled(),__source:{fileName:x,lineNumber:70}},"Start")),g.default.createElement("p",{className:"description",__source:{fileName:x,lineNumber:72}},"*This tool requires ",g.default.createElement("b",{__source:{fileName:x,lineNumber:73}},g.default.createElement("a",{href:"https://metamask.io/",target:"_blank",__source:{fileName:x,lineNumber:73}},"MetaMask")," ")," extension. Besides, the ETH address which will create the smart contract has to have an amount of ETH for the contract deployment and also X DAY for fees. For more information read these ",g.default.createElement("a",{href:"https://blog.chronologic.network/chronos-platform/home",target:"_blank",__source:{fileName:x,lineNumber:75}},"articles"),"."))),g.default.createElement("div",{className:"process",__source:{fileName:x,lineNumber:79}},g.default.createElement("div",{className:"container",__source:{fileName:x,lineNumber:80}},(0,i.default)(S.NAVIGATION_STEPS).map(function(e){var t=(0,u.default)(e,2),a=t[0],r=t[1],n=r.iconClassName,l=r.description,s=r.title;return g.default.createElement("div",{className:"process-item",key:a,__source:{fileName:x,lineNumber:83}},g.default.createElement("div",{className:"step-icons "+n,__source:{fileName:x,lineNumber:84}}),g.default.createElement("p",{className:"title",__source:{fileName:x,lineNumber:85}},s),g.default.createElement("p",{className:"description",__source:{fileName:x,lineNumber:86}},l))})))))}}]),t}(D.Component))||l)||l;t.default=j}},[251]);
            return { page: comp.default }
          })
        