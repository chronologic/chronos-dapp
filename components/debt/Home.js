import React from 'react';
import Router from 'next/router';
import { inject, observer } from 'mobx-react';
import { NAVIGATION_STEPS } from '../../lib/consts';

import web3Config from '../../lib/web3Utils.js';
import AbstractHome from '../AbstractHome';

let STEPS = '';

@inject('web3Service')
@observer
export default class Home extends AbstractHome {
  constructor(props){
    super('debt',props);

    STEPS = NAVIGATION_STEPS[this.activeApp];
  }

  onWatch = async() => {
    super.onWatch('/debt/step-5');
  }

  componentDidMount(){
      super.componentDidMount();
  }

  start() {
    Router.push('/debt/step-1');
  }

  render() {
    const { web3Service } = this.props;
    const MIN_FEE = web3Config[this.activeApp][web3Service.network].MIN_FEE;

    return (
      <div>
        <section className="home">
          <div className="crowdsale">
            <div className="container">
              <h1 className="title">Welcome to Debt Contract  DAPP </h1>
              <p className="description">
                This DAPP (Decentralized App) allows anyone to deploy their own Debt Smart Contract easily,<br></br>
                 to serve as mediator between the two parties of a loan agreement..<br />
               The steps ahead will help you set up the features of your very own Debt Dmart Contract.
                <br></br><br></br>
                * Click <a href='#' onClick={this.onWatch}>here</a>, if you already have a deployed contract.
              </p>
              <div className="buttons">
                <button className="button button_fill button_mullayer" onClick={this.onStart} disabled={this.web3Disabled()} >Start</button>
                <br/>
                {this.state.needsFaucet && this.state.hasFaucet &&
                  <button className="button button_fill button_mullayer" onClick={this.getTestnetTokens} >Get Testnet DAY Tokens</button>
                }
              </div>
              <p className="description">
                *This tool requires <b><a href="https://metamask.io/" target="_blank">MetaMask</a> </b> extension. Besides, the ETH address which will create
                the smart contract has to have an amount of ETH for the contract deployment and
                also {MIN_FEE/(1e+18)} DAY for fees. For more information read these <a href="https://blog.chronologic.network/chronos-platform/home" target="_blank">articles</a>.
              </p>
            </div>
          </div>
          <div className="process">
            <div className="container">
              {Object.entries(STEPS)
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
