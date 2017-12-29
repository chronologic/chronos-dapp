import React, { Component } from 'react';
import Router from 'next/router';
import { inject, observer } from 'mobx-react';
import { NAVIGATION_STEPS } from '../lib/consts';
import { confirmFeeWithdraw, showInsufficientBalalnce, showError, showInfo, showContractAddressRequest } from '../lib/alerts';

import web3Config from '../lib/web3Utils.js';

@inject('web3Service')
@observer
export default class Home extends Component {
  constructor(props){
    super(props);

    this.state = {
      MIN_FEE:null,
      needsFaucet: false
    }
    this.getTestnetTokens = this.getTestnetTokens.bind(this);
  }

  onStart = async (eventInst) => {
    if(this.web3Disabled() )
      return;
    var target = eventInst.target
    target.disabled = true;
    const { web3Service } = this.props;
    if(!await web3Service.checkBalance()){
      const preview = await showInsufficientBalalnce( (this.state.MIN_FEE/(1e+18)) );
      if(preview == 'preview')
        return this.start();
      else
        this.setState({needsFaucet:true});
        return target.disabled = false;
    }
    else{
      if (
        await web3Service.checkAllowance() ||
        (await confirmFeeWithdraw(this.state.MIN_FEE) && await this.reserveTokens())
      ) {
        this.start();
      }
      else
        target.disabled = false;
    }
  };

  onWatch = async() =>{
    const val = await showContractAddressRequest();
    if(!val)
      return;
    return this.goWatch(val);
  }

  async goWatch(hash) {
    const { props: { store,web3Service } } = this;
    let watchPageData;
    const CONTRACT_PROPERTIES = ['transactionHash','newContract']
    try{
      watchPageData = await web3Service.prepareWatch(hash);
      console.log(watchPageData)
    }
    catch(e){
      console.error(e);
      return showError('Failed!!!. Kindly check your Input and Network connection')
    }

    let found;
    CONTRACT_PROPERTIES.forEach(p => {
      if(watchPageData[p] == hash)
        return found = true;
    });

    if(!found)
      return showError('Unable to retreive contract');

    const query = CONTRACT_PROPERTIES.reduce((result, name) => {
      result[name] = watchPageData[name];
      return result;
    }, {});

    Router.push({
      pathname: '/step-5',
      query,
    });
  };

  async reserveTokens() {
    const { web3Service } = this.props;
    try {
      const result = await web3Service.approveFee();
      showInfo('Token Release Tx Status', `TxHash ${result}`);
      this.start();
    } catch (err) {
      showError('Could not complete transaction');
    }
  }


  componentDidMount(){
      this.getWeb3Fee();
  }

  async getWeb3Fee(){
    const {web3Service} = this.props;
    const that = this;
    if( typeof web3Service.network !== 'undefined' && web3Service.network !== null)
      return this.setState({MIN_FEE: web3Config[web3Service.network].MIN_FEE });
    setTimeout(function(){
      return that.getWeb3Fee();
    },200)
  }

  async getTestnetTokens (){
    const {web3Service} = this.props;
    try{
      const faucetTx = await web3Service.requestFromFaucet();
      if(faucetTx.status == -1)
        return showError(`Sorry the Faucet is not funded at the moment`);
      else if(faucetTx.status == 0)
        return showError(`You have to wait for another ${ (faucetTx.data/60).toFixed(2)} min(s) to request Tokens.`);
      showInfo('Token Faucet request Tx Status', `TxHash ${faucetTx.data}`);
      this.setState({needsFaucet: false});
    }
    catch(e){
      console.error(e);
      showError('Error Requesting Faucet Tokens');
    }
  }

  web3Disabled (){
    const {web3Service} = this.props;
    return !web3Service.connectedToMetaMask || !(typeof web3Service.accounts !== 'undefined' && web3Service.accounts.length > 0) || !this.state.MIN_FEE
  }

  start() {
    Router.push('/step-1');
  }

  render() {

    return (
      <div>
        <section className="home">
          <div className="crowdsale">
            <div className="container">
              <h1 className="title">Welcome to the Chronologic's DAPP </h1>
              <p className="description">
                This DAPP (Decentralized App) allows anyone to create his/hers own version of
                minting token easily.<br />
              The steps ahead will help you set up the features of your very own version of the
                DAY token.
                <br></br><br></br>
                * Click <a href='#' onClick={this.onWatch}>here</a>, if you already have a deployed contract.
              </p>
              <div className="buttons">
                <button className="button button_fill button_mullayer" onClick={this.onStart} disabled={this.web3Disabled()} >Start</button>
                <br/>
                {this.state.needsFaucet &&
                  <button className="button button_fill button_mullayer" onClick={this.getTestnetTokens} >Get Testnet DAY Tokens</button>
                }
              </div>
              <p className="description">
                *This tool requires <b><a href="https://metamask.io/" target="_blank">MetaMask</a> </b> extension. Besides, the ETH address which will create
                the smart contract has to have an amount of ETH for the contract deployment and
                also {this.state.MIN_FEE/(1e+18)} DAY for fees. For more information read these <a href="https://blog.chronologic.network/chronos-platform/home" target="_blank">articles</a>.
              </p>
            </div>
          </div>
          <div className="process">
            <div className="container">
              {Object.entries(NAVIGATION_STEPS)
                .map(([key, { iconClassName, description, title }]) => (
                  <div className="process-item" key={key}>
                    <div className={`step-icons ${iconClassName}`} />
                    <p className="title">{title}</p>
                    <p className="description">
                      {description}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </div>
    );
  }
}
