import React from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';

import AbstractStep from './AbstractStep';
import StepLayout from './StepLayout';


@inject('web3Service')
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

  render() {

    const {web3Service} = this.props;
    return (
      <StepLayout
        activeStepKey={this.activeStepKey}
        onNext={this.goNext}
        web3Disabled = {this.web3Disabled(web3Service) }
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
