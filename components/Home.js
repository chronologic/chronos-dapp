import React, { Component } from 'react';
import Router from 'next/router';
import { inject, observer } from 'mobx-react';
import { NAVIGATION_STEPS } from '../lib/consts';
import { confirmFeeWithdraw, showInsufficientBalalnce, showError, showInfo } from '../lib/alerts';

import web3Config from '../lib/web3Utils.js';

@inject('web3Service')
@observer
export default class Home extends Component {
  state = {MIN_FEE:null}

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
    console.log(web3Service.network)
    if( typeof web3Service.network !== 'undefined' && web3Service.network !== null)
      return this.setState({MIN_FEE: web3Config[web3Service.network].MIN_FEE });
    setTimeout(function(){
      return that.getWeb3Fee();
    })
  }

  web3Disabled (){
    const {web3Service} = this.props;
    return !web3Service.connectedToMetaMask || !(typeof web3Service.accounts !== 'undefined' && web3Service.accounts.length > 0) || !this.state.MIN_FEE
  }

  start() {
    Router.push('/step-1');
  }

  render() {
    console.log(this.state.MIN_FEE)

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
              </p>
              <div className="buttons">
                <button className="button button_fill" onClick={this.onStart} disabled={this.web3Disabled()} >Start</button>
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
