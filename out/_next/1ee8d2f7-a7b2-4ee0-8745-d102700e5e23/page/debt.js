
          window.__NEXT_REGISTER_PAGE('/debt', function() {
            var comp = module.exports=webpackJsonp([10],{164:function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(9),u=a(n),s=r(10),o=a(s),c=r(6),l=a(c),i=r(4),f=a(i),d=r(5),p=a(d),h=r(7),v=a(h),m=r(8),b=a(m),k=r(0),w=(a(k),r(21)),E=a(w),_=(r(14),r(26),r(33)),y=r(68),x=a(y),T=function(e){function t(e,r){var a=this;(0,f.default)(this,t);var n=(0,v.default)(this,(t.__proto__||(0,l.default)(t)).call(this,r));return n.onStart=function(){var e=(0,o.default)(u.default.mark(function e(t){var r,s,o;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!n.web3Disabled()){e.next=2;break}return e.abrupt("return");case 2:return r=t.target,r.disabled=!0,s=n.props.web3Service,e.next=7,s.checkBalance();case 7:if(e.sent){e.next=19;break}return e.next=10,(0,_.showInsufficientBalalnce)(n.state.MIN_FEE/1e18);case 10:if("preview"!=(o=e.sent)){e.next=15;break}return e.abrupt("return",n.start());case 15:n.setState({needsFaucet:!0});case 16:return e.abrupt("return",r.disabled=!1);case 19:return e.next=21,s.checkAllowance();case 21:if(e.t0=e.sent,e.t0){e.next=31;break}return e.next=25,(0,_.confirmFeeWithdraw)(n.state.MIN_FEE);case 25:if(e.t1=e.sent,!e.t1){e.next=30;break}return e.next=29,n.reserveTokens();case 29:e.t1=e.sent;case 30:e.t0=e.t1;case 31:if(!e.t0){e.next=35;break}n.start(),e.next=36;break;case 35:r.disabled=!1;case 36:case"end":return e.stop()}},e,a)}));return function(t){return e.apply(this,arguments)}}(),n.state={MIN_FEE:null,needsFaucet:!1},n.activeApp=e,n.getTestnetTokens=n.getTestnetTokens.bind(n),n.onWatch=n.onWatch.bind(n),n}return(0,b.default)(t,e),(0,p.default)(t,[{key:"onWatch",value:function(){function e(e){return t.apply(this,arguments)}var t=(0,o.default)(u.default.mark(function e(t){var r;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,_.showContractAddressRequest)();case 2:if(r=e.sent){e.next=5;break}return e.abrupt("return");case 5:return e.abrupt("return",this.goWatch(r,t));case 6:case"end":return e.stop()}},e,this)}));return e}()},{key:"goWatch",value:function(){function e(e,r){return t.apply(this,arguments)}var t=(0,o.default)(u.default.mark(function e(t,r){var a,n,s,o,c;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!this.web3Disabled()){e.next=2;break}return e.abrupt("return");case 2:return a=this.props.web3Service,n=void 0,s=["transactionHash","newContract"],e.prev=5,e.next=8,a.prepareWatch(t);case 8:n=e.sent,e.next=15;break;case 11:return e.prev=11,e.t0=e.catch(5),console.error(e.t0),e.abrupt("return",(0,_.showError)("Failed!!!. Kindly check your Input and Network connection"));case 15:if(o=void 0,s.forEach(function(e){if(n[e]==t)return o=!0}),o){e.next=19;break}return e.abrupt("return",(0,_.showError)("Unable to retreive contract"));case 19:c=s.reduce(function(e,t){return e[t]=n[t],e},{}),E.default.push({pathname:r,query:c});case 21:case"end":return e.stop()}},e,this,[[5,11]])}));return e}()},{key:"reserveTokens",value:function(){function e(){return t.apply(this,arguments)}var t=(0,o.default)(u.default.mark(function e(){var t,r;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=this.props.web3Service,e.prev=1,e.next=4,t.approveFee();case 4:r=e.sent,(0,_.showInfo)("Token Release Tx Status"," "+r),this.start(),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(1),(0,_.showError)("Could not complete transaction");case 12:case"end":return e.stop()}},e,this,[[1,9]])}));return e}()},{key:"componentDidMount",value:function(){this.getWeb3Fee()}},{key:"getWeb3Fee",value:function(){function e(){return t.apply(this,arguments)}var t=(0,o.default)(u.default.mark(function e(){var t,r;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t=this.props.web3Service,r=this,void 0===t.network||null===t.network){e.next=4;break}return e.abrupt("return",this.setState({MIN_FEE:x.default[this.activeApp][t.network].MIN_FEE}));case 4:setTimeout(function(){return r.getWeb3Fee()},200);case 5:case"end":return e.stop()}},e,this)}));return e}()},{key:"getTestnetTokens",value:function(){function e(){return t.apply(this,arguments)}var t=(0,o.default)(u.default.mark(function e(){var t,r;return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=this.props.web3Service,e.prev=1,e.next=4,t.requestFromFaucet();case 4:if(r=e.sent,-1!=r.status){e.next=9;break}return e.abrupt("return",(0,_.showError)("Sorry the Faucet is not funded at the moment"));case 9:if(0!=r.status){e.next=11;break}return e.abrupt("return",(0,_.showError)("You have to wait for another "+(r.data/60).toFixed(2)+" min(s) to request Tokens."));case 11:(0,_.showInfo)("Token Faucet request Tx Status"," "+r.data),this.setState({needsFaucet:!1}),e.next=19;break;case 15:e.prev=15,e.t0=e.catch(1),console.error(e.t0),(0,_.showError)("Error Requesting Faucet Tokens");case 19:case"end":return e.stop()}},e,this,[[1,15]])}));return e}()},{key:"web3Disabled",value:function(){var e=this.props.web3Service;return!e.connectedToMetaMask||!(void 0!==e.accounts&&e.accounts.length>0)||!this.state.MIN_FEE}},{key:"start",value:function(){throw new Error("Implement me")}},{key:"render",value:function(){throw new Error("Override me")}}]),t}(k.Component);t.default=T},493:function(e,t,r){e.exports=r(494)},494:function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(9),u=a(n),s=r(10),o=a(s),c=r(13),l=a(c),i=r(6),f=a(i),d=r(4),p=a(d),h=r(5),v=a(h),m=r(7),b=a(m),k=r(8),w=a(k),E=r(0),_=a(E),y=r(20),x=a(y),T=r(495),N=a(T),F=function(e){function t(){return(0,p.default)(this,t),(0,b.default)(this,(t.__proto__||(0,f.default)(t)).apply(this,arguments))}return(0,w.default)(t,e),(0,v.default)(t,[{key:"render",value:function(){return _.default.createElement(x.default,(0,l.default)({},this.props,{activeApp:"debt"}),_.default.createElement(N.default,null))}}],[{key:"getInitialProps",value:function(){function e(e){return t.apply(this,arguments)}var t=(0,o.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",x.default.getInitialProps(t));case 1:case"end":return e.stop()}},e,this)}));return e}()}]),t}(_.default.Component);t.default=F},495:function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n,u,s=r(73),o=a(s),c=r(136),l=a(c),i=r(9),f=a(i),d=r(10),p=a(d),h=r(6),v=a(h),m=r(4),b=a(m),k=r(5),w=a(k),E=r(7),_=a(E),y=r(8),x=a(y),T=r(84),N=a(T),F=r(0),M=a(F),g=r(21),S=a(g),D=r(14),I=r(26),W=r(164),A=a(W),C="",P=(n=(0,D.inject)("web3Service"))(u=(0,D.observer)(u=function(e){function t(e){var r=this;(0,b.default)(this,t);var a=(0,_.default)(this,(t.__proto__||(0,v.default)(t)).call(this,"debt",e));return a.onWatch=(0,p.default)(f.default.mark(function e(){return f.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:(0,N.default)(t.prototype.__proto__||(0,v.default)(t.prototype),"onWatch",a).call(a,"/debt/step-5");case 1:case"end":return e.stop()}},e,r)})),C=I.NAVIGATION_STEPS[a.activeApp],a}return(0,x.default)(t,e),(0,w.default)(t,[{key:"componentDidMount",value:function(){(0,N.default)(t.prototype.__proto__||(0,v.default)(t.prototype),"componentDidMount",this).call(this)}},{key:"start",value:function(){S.default.push("/debt/step-1")}},{key:"render",value:function(){return M.default.createElement("div",null,M.default.createElement("section",{className:"home"},M.default.createElement("div",{className:"crowdsale"},M.default.createElement("div",{className:"container"},M.default.createElement("h1",{className:"title"},"Welcome to Debt Contract  DAPP "),M.default.createElement("p",{className:"description"},"This DAPP (Decentralized App) allows anyone to deploy their own Debt Smart Contract easily,",M.default.createElement("br",null),"to serve as mediator between the two parties of a loan agreement..",M.default.createElement("br",null),"The steps ahead will help you set up the features of your very own Debt Dmart Contract.",M.default.createElement("br",null),M.default.createElement("br",null),"* Click ",M.default.createElement("a",{href:"#",onClick:this.onWatch},"here"),", if you already have a deployed contract."),M.default.createElement("div",{className:"buttons"},M.default.createElement("button",{className:"button button_fill button_mullayer",onClick:this.onStart,disabled:this.web3Disabled()},"Start"),M.default.createElement("br",null),this.state.needsFaucet&&M.default.createElement("button",{className:"button button_fill button_mullayer",onClick:this.getTestnetTokens},"Get Testnet DAY Tokens")),M.default.createElement("p",{className:"description"},"*This tool requires ",M.default.createElement("b",null,M.default.createElement("a",{href:"https://metamask.io/",target:"_blank"},"MetaMask")," ")," extension. Besides, the ETH address which will create the smart contract has to have an amount of ETH for the contract deployment and also ",this.state.MIN_FEE/1e18," DAY for fees. For more information read these ",M.default.createElement("a",{href:"https://blog.chronologic.network/chronos-platform/home",target:"_blank"},"articles"),"."))),M.default.createElement("div",{className:"process"},M.default.createElement("div",{className:"container"},(0,l.default)(C).map(function(e){var t=(0,o.default)(e,2),r=t[0],a=t[1],n=a.iconClassName,u=a.description,s=a.title;return M.default.createElement("div",{className:"process-item",key:r},M.default.createElement("div",{className:"step-icons "+n}),M.default.createElement("p",{className:"title"},s),M.default.createElement("p",{className:"description"},u))})))))}}]),t}(A.default))||u)||u;t.default=P},84:function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0;var n=r(6),u=a(n),s=r(94),o=a(s);t.default=function e(t,r,a){null===t&&(t=Function.prototype);var n=(0,o.default)(t,r);if(void 0===n){var s=(0,u.default)(t);return null===s?void 0:e(s,r,a)}if("value"in n)return n.value;var c=n.get;if(void 0!==c)return c.call(a)}}},[493]);
            return { page: comp.default }
          })
        