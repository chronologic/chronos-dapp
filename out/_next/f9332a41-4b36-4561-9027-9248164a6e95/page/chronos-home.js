
          window.__NEXT_REGISTER_PAGE('/chronos-home', function() {
            var comp = module.exports=webpackJsonp([21],{317:function(e,t,r){e.exports=r(318)},318:function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=r(9),u=a(n),s=r(10),o=a(s),c=r(12),l=a(c),i=r(6),f=a(i),d=r(4),m=a(d),p=r(5),h=a(p),b=r(7),_=a(b),N=r(8),v=a(N),k="D:\\Matt\\Downloads\\New folder\\work-dont touch\\cdd\\pages\\chronos-home.js?entry",w=r(0),E=a(w),x=r(20),y=a(x),T=r(449),F=a(T),g=function(e){function t(){return(0,m.default)(this,t),(0,_.default)(this,(t.__proto__||(0,f.default)(t)).apply(this,arguments))}return(0,v.default)(t,e),(0,h.default)(t,[{key:"render",value:function(){return E.default.createElement(y.default,(0,l.default)({},this.props,{__source:{fileName:k,lineNumber:13}}),E.default.createElement(F.default,{__source:{fileName:k,lineNumber:14}}))}}],[{key:"getInitialProps",value:function(){function e(e){return t.apply(this,arguments)}var t=(0,o.default)(u.default.mark(function e(t){return u.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",y.default.getInitialProps(t));case 1:case"end":return e.stop()}},e,this)}));return e}()}]),t}(E.default.Component);t.default=g},449:function(e,t,r){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n,u,s,o=r(74),c=a(o),l=r(136),i=a(l),f=r(9),d=a(f),m=r(10),p=a(m),h=r(6),b=a(h),_=r(4),N=a(_),v=r(5),k=a(v),w=r(7),E=a(w),x=r(8),y=a(x),T="D:\\Matt\\Downloads\\New folder\\work-dont touch\\cdd\\components\\ChronosHome.js",F=r(0),g=a(F),M=r(23),S=a(M),I=r(14),D=r(27),C=r(39),A=r(44),W=a(A),P=(n=(0,I.inject)("web3Service"),u=(0,I.inject)("store"),n(s=u(s=(0,I.observer)(s=function(e){function t(e){var r=this;(0,N.default)(this,t);var a=(0,E.default)(this,(t.__proto__||(0,b.default)(t)).call(this,e));a.onStart=function(){var e=(0,p.default)(d.default.mark(function e(t){var n,u,s;return d.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!a.web3Disabled()){e.next=2;break}return e.abrupt("return");case 2:return n=t.target,n.disabled=!0,u=a.props.web3Service,e.next=7,u.checkBalance();case 7:if(e.sent){e.next=19;break}return e.next=10,(0,C.showInsufficientBalalnce)(a.state.MIN_FEE/1e18);case 10:if("preview"!=(s=e.sent)){e.next=15;break}return e.abrupt("return",a.start());case 15:a.setState({needsFaucet:!0});case 16:return e.abrupt("return",n.disabled=!1);case 19:return e.next=21,u.checkAllowance();case 21:if(e.t0=e.sent,e.t0){e.next=31;break}return e.next=25,(0,C.confirmFeeWithdraw)(a.state.MIN_FEE);case 25:if(e.t1=e.sent,!e.t1){e.next=30;break}return e.next=29,a.reserveTokens();case 29:e.t1=e.sent;case 30:e.t0=e.t1;case 31:if(!e.t0){e.next=35;break}a.start(),e.next=36;break;case 35:n.disabled=!1;case 36:case"end":return e.stop()}},e,r)}));return function(t){return e.apply(this,arguments)}}(),a.onWatch=(0,p.default)(d.default.mark(function e(){var t;return d.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,C.showContractAddressRequest)();case 2:if(t=e.sent){e.next=5;break}return e.abrupt("return");case 5:return e.abrupt("return",a.goWatch(t));case 6:case"end":return e.stop()}},e,r)}));var n=a.props.store;return a.state={MIN_FEE:null,needsFaucet:!1},n.activeApp="chronos-home",a.getTestnetTokens=a.getTestnetTokens.bind(a),a}return(0,y.default)(t,e),(0,k.default)(t,[{key:"goWatch",value:function(){function e(e){return t.apply(this,arguments)}var t=(0,p.default)(d.default.mark(function e(t){var r,a,n,u,s,o,c;return d.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return r=this.props,a=r.store,n=r.web3Service,u=void 0,s=["transactionHash","newContract"],e.prev=3,e.next=6,n.prepareWatch(t);case 6:u=e.sent,e.next=13;break;case 9:return e.prev=9,e.t0=e.catch(3),console.error(e.t0),e.abrupt("return",(0,C.showError)("Failed!!!. Kindly check your Input and Network connection"));case 13:if(o=void 0,s.forEach(function(e){if(u[e]==t)return o=!0}),o){e.next=17;break}return e.abrupt("return",(0,C.showError)("Unable to retreive contract"));case 17:c=s.reduce(function(e,t){return e[t]=u[t],e},{}),S.default.push({pathname:"/step-5",query:c});case 19:case"end":return e.stop()}},e,this,[[3,9]])}));return e}()},{key:"reserveTokens",value:function(){function e(){return t.apply(this,arguments)}var t=(0,p.default)(d.default.mark(function e(){var t,r;return d.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=this.props.web3Service,e.prev=1,e.next=4,t.approveFee();case 4:r=e.sent,(0,C.showInfo)("Token Release Tx Status"," "+r),this.start(),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(1),(0,C.showError)("Could not complete transaction");case 12:case"end":return e.stop()}},e,this,[[1,9]])}));return e}()},{key:"componentDidMount",value:function(){this.getWeb3Fee()}},{key:"getWeb3Fee",value:function(){function e(){return t.apply(this,arguments)}var t=(0,p.default)(d.default.mark(function e(){var t,r;return d.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t=this.props.web3Service,r=this,void 0===t.network||null===t.network){e.next=4;break}return e.abrupt("return",this.setState({MIN_FEE:W.default[t.network].MIN_FEE}));case 4:setTimeout(function(){return r.getWeb3Fee()},200);case 5:case"end":return e.stop()}},e,this)}));return e}()},{key:"getTestnetTokens",value:function(){function e(){return t.apply(this,arguments)}var t=(0,p.default)(d.default.mark(function e(){var t,r;return d.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=this.props.web3Service,e.prev=1,e.next=4,t.requestFromFaucet();case 4:if(r=e.sent,-1!=r.status){e.next=9;break}return e.abrupt("return",(0,C.showError)("Sorry the Faucet is not funded at the moment"));case 9:if(0!=r.status){e.next=11;break}return e.abrupt("return",(0,C.showError)("You have to wait for another "+(r.data/60).toFixed(2)+" min(s) to request Tokens."));case 11:(0,C.showInfo)("Token Faucet request Tx Status"," "+r.data),this.setState({needsFaucet:!1}),e.next=19;break;case 15:e.prev=15,e.t0=e.catch(1),console.error(e.t0),(0,C.showError)("Error Requesting Faucet Tokens");case 19:case"end":return e.stop()}},e,this,[[1,15]])}));return e}()},{key:"web3Disabled",value:function(){var e=this.props.web3Service;return!e.connectedToMetaMask||!(void 0!==e.accounts&&e.accounts.length>0)||!this.state.MIN_FEE}},{key:"start",value:function(){S.default.push("/step-1")}},{key:"render",value:function(){return g.default.createElement("div",{__source:{fileName:T,lineNumber:146}},g.default.createElement("section",{className:"home",__source:{fileName:T,lineNumber:147}},g.default.createElement("div",{className:"crowdsale",__source:{fileName:T,lineNumber:148}},g.default.createElement("div",{className:"container",__source:{fileName:T,lineNumber:149}},g.default.createElement("h1",{className:"title",__source:{fileName:T,lineNumber:150}},"Welcome to Chronos DAPP "),g.default.createElement("p",{className:"description",__source:{fileName:T,lineNumber:151}},"This DAPP (Decentralized App) allows anyone to create his/hers own version of minting token easily.",g.default.createElement("br",{__source:{fileName:T,lineNumber:153}}),"The steps ahead will help you set up the features of your very own version of the DAY token.",g.default.createElement("br",{__source:{fileName:T,lineNumber:156}}),g.default.createElement("br",{__source:{fileName:T,lineNumber:156}}),"* Click ",g.default.createElement("a",{href:"#",onClick:this.onWatch,__source:{fileName:T,lineNumber:157}},"here"),", if you already have a deployed contract."),g.default.createElement("div",{className:"buttons",__source:{fileName:T,lineNumber:159}},g.default.createElement("button",{className:"button button_fill button_mullayer",onClick:this.onStart,disabled:this.web3Disabled(),__source:{fileName:T,lineNumber:160}},"Start"),g.default.createElement("br",{__source:{fileName:T,lineNumber:161}}),this.state.needsFaucet&&g.default.createElement("button",{className:"button button_fill button_mullayer",onClick:this.getTestnetTokens,__source:{fileName:T,lineNumber:163}},"Get Testnet DAY Tokens")),g.default.createElement("p",{className:"description",__source:{fileName:T,lineNumber:166}},"*This tool requires ",g.default.createElement("b",{__source:{fileName:T,lineNumber:167}},g.default.createElement("a",{href:"https://metamask.io/",target:"_blank",__source:{fileName:T,lineNumber:167}},"MetaMask")," ")," extension. Besides, the ETH address which will create the smart contract has to have an amount of ETH for the contract deployment and also ",this.state.MIN_FEE/1e18," DAY for fees. For more information read these ",g.default.createElement("a",{href:"https://blog.chronologic.network/chronos-platform/home",target:"_blank",__source:{fileName:T,lineNumber:169}},"articles"),"."))),g.default.createElement("div",{className:"process",__source:{fileName:T,lineNumber:173}},g.default.createElement("div",{className:"container",__source:{fileName:T,lineNumber:174}},(0,i.default)(D.NAVIGATION_STEPS).map(function(e){var t=(0,c.default)(e,2),r=t[0],a=t[1],n=a.iconClassName,u=a.description,s=a.title;return g.default.createElement("div",{className:"process-item",key:r,__source:{fileName:T,lineNumber:177}},g.default.createElement("div",{className:"step-icons "+n,__source:{fileName:T,lineNumber:178}}),g.default.createElement("p",{className:"title",__source:{fileName:T,lineNumber:179}},s),g.default.createElement("p",{className:"description",__source:{fileName:T,lineNumber:180}},u))})))))}}]),t}(F.Component))||s)||s)||s);t.default=P}},[317]);
            return { page: comp.default }
          })
        