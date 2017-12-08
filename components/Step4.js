import React from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import Router from 'next/router';

import { PROPERTIES as ALL_PROPERTIES } from '../lib/consts';
import AbstractStep from './AbstractStep';
import StepLayout from './StepLayout';

@inject('web3Service')
@inject('store')
@observer
export default class Step4 extends AbstractStep {
  constructor(props) {
    super('PUBLISH', props);
  }

  getValidations() {
    return this._validations;
  }

  @observable
  _validations = {
    tokenName: true,
    symbol: true,
    minMintingPower: true,
    maxMintingPower: true,
    halvingCycle: true,
    mintingPeriod: true,
    maxAddresses: true,
    startingId: true,
    totalMintingId: true,
    teamLockPeriod: true,
    postDeploymentMaxIds: true,
    minimumBalance: true,
  };

  renderProperty(propertyData, otherProps = {}) {
    const { props: { store } } = this;
    const {
      name,
      title,
    } = propertyData;
    return (
      <div className={otherProps.side}>
        <span className="values">{`${title}: ${store[name]}`}</span>
      </div>
    );
  }

  render() {

    const {web3Service} = this.props;
    return (
      <StepLayout
        activeStepKey={this.activeStepKey}
        onNext={this.goNext}
        nextTitle="Deploy"
        web3Disabled = {this.web3Disabled(web3Service) }
      >
        <div className="input-block-container">
          {this.renderProperty(this.properties.tokenName, { side: 'left' })}
          {this.renderProperty(this.properties.symbol, { side: 'right' })}
        </div>
        <div className="input-block-container">
          {this.renderProperty(this.properties.minMintingPower, { side: 'left' })}
          {this.renderProperty(this.properties.maxMintingPower, { side: 'right' })}
        </div>
        <div className="input-block-container">
          {this.renderProperty(this.properties.halvingCycle, { side: 'left' })}
          {this.renderProperty(this.properties.mintingPeriod, { side: 'right' })}
        </div>
        <div className="input-block-container">
          {this.renderProperty(this.properties.maxAddresses, { side: 'left' })}
          {this.renderProperty(this.properties.startingId, { side: 'right' })}
        </div>
        <div className="input-block-container">
          {this.renderProperty(this.properties.totalMintingId, { side: 'left' })}
          {this.renderProperty(this.properties.teamLockPeriod, { side: 'right' })}
        </div>
        <div className="input-block-container">
          {this.renderProperty(this.properties.postDeploymentMaxIds, { side: 'left' })}
          {this.renderProperty(this.properties.minimumBalance, { side: 'right' })}
        </div>
      </StepLayout>
    );
  }
}
