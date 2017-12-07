import React, { Component } from 'react';
import Router from 'next/router';
import { inject, observer } from 'mobx-react';
import { NAVIGATION_STEPS } from '../lib/consts';
import { confirmFeeWithdraw, showError, showInfo } from '../lib/alerts';

@inject('web3Service')
@observer
export default class Home extends Component {
  onStart = async (eventInst) => {
    if(this.web3Disabled() )
      return;
    eventInst.target.disabled = true;
    const { web3Service } = this.props;
    if (
      await web3Service.checkAllowance() ||
      (await confirmFeeWithdraw() && await this.reserveTokens())
    ) {
      this.start();
    }
    else
      eventInst.target.disabled = false;
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

  web3Disabled (){
    const {web3Service} = this.props;
    return !web3Service.connectedToMetaMask || !(typeof web3Service.accounts !== 'undefined' && web3Service.accounts.length > 0)
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
              <h1 className="title">Welcome to the Chronologic's DAPP</h1>
              <p className="description">
                This DAPP (Descentralized App) allows anyone to create a his/hers own version of
                minting token easily.<br />
                The steps ahead will help you set up all features of your very own version of the
                DAY token.
              </p>
              <div className="buttons">
                <button className="button button_fill" onClick={this.onStart} disabled={this.web3Disabled()} >Start</button>
              </div>
              <p className="description">
                *This tool requires MetaMask extension. Besides, the ETH address which will create
                the smart contract has to have an amount of ETH for the contract deployment and
                also X DAY for fees. For more information read this article.
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
