import React, { Component } from 'react';

import Link from 'next/link';
import { NAVIGATION_STEPS } from '../lib/consts';

export default class Home extends Component {
  render() {
    return (
      <div>
        <section className="home">
          <div className="crowdsale">
            <div className="container">
              <h1 className="title">Welcome to the Chronos DAPP</h1>
              <p className="description">
                This DAPP (Descentralized App) allows anyone to create a his/hers own version of
                minting token easily.<br />
                The steps ahead will help you set up all features of your very own version of the
                DAY token.
              </p>
              <div className="buttons">
                <Link href="/step-1">
                  <a className="button button_fill">Start</a>
                </Link>
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
                    <div className={`step-icons ${iconClassName}`}/>
                    <p className="title">{title}</p>
                    <p className="description">
                      {description}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      </div>
    );
  }
}
