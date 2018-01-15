import React from 'react';
import Router from 'next/router';
import { inject, observer } from 'mobx-react';
import { NAVIGATION_STEPS } from '../../lib/consts';

import AbstractHome from '../AbstractHome';

@inject('web3Service')
@inject('store')
@observer
export default class Home extends AbstractHome {
  constructor(props){
    super(props);

    let {props:{store}} = this;
    store.activeApp = 'debt';
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

    return (
      <div>
        <section className="home">
          <div className="crowdsale">
            <div className="container">
              <h1 className="title">Welcome to Chronos DAPP </h1>
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
