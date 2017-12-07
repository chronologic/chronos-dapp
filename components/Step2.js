import React from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';

import AbstractStep from './AbstractStep';
import StepLayout from './StepLayout';

@inject('web3Service')
@inject('store')
@observer
export default class Step2 extends AbstractStep {
  constructor(props) {
    super('TIMEMINT_SETUP', props);
  }

  getValidations() {
    return this._validations;
  }

  @observable
  _validations = {
    minMintingPower: true,
    maxMintingPower: true,
    halvingCycle: true,
    mintingPeriod: true,
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
          {this.renderProperty(this.properties.minMintingPower, { side: 'left' })}
          {this.renderProperty(this.properties.maxMintingPower, { side: 'right' })}
        </div>
        <div className="input-block-container">
          {this.renderProperty(this.properties.halvingCycle, { side: 'left' })}
          {this.renderProperty(this.properties.mintingPeriod, { side: 'right' })}
        </div>
      </StepLayout>
    );
  }
}
