import React from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';

import AbstractStep from './AbstractStep';
import StepLayout from './StepLayout';


@inject('store')
@observer
export default class Step3 extends AbstractStep {
  constructor(props) {
    super('CONTRACT_SETUP', props);
  }

  getValidations() {
    return this._validations;
  }

  @observable
  _validations = {
    maxAddresses: true,
    startingId: true,
    totalMintingId: true,
    teamLockPeriod: true,
    postDeploymentMaxIds: true,
    minimumBalance: true,
  };

  properties = Object.assign(this.properties,{
    maxAddresses: Object.assign(this.properties.maxAddresses,{
        validator: this.isGreaterThanZero
    }),
    startingId: Object.assign(this.properties.startingId,{
        validator: this.validateDigit
    }),
   totalMintingId: Object.assign(this.properties.totalMintingId,{
       validator: this.validateDigit
   }),
   teamLockPeriod: Object.assign(this.properties.teamLockPeriod,{
       validator: this.validateDigit
   }),
   postDeploymentMaxIds: Object.assign(this.properties.postDeploymentMaxIds,{
       validator: this.validateDigit
   }),
   minimumBalance: Object.assign(this.properties.minimumBalance,{
       validator: this.validateDigit
   }),
 })

  render() {
    
    return (
      <StepLayout
        activeStepKey={this.activeStepKey}
        onNext={this.goNext}
      >
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
