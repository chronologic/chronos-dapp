import React from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';

import AbstractStep from '../AbstractStep';
import StepLayout from '../StepLayout';

@inject('web3Service')
@inject('store')
@observer
export default class Step2 extends AbstractStep {
  constructor(props) {
    super('INTEREST_RATES_SETUP', 'debt', props);
  }

  @observable
  _validations = {
    interestRate: true,
    interestCycle: true,
    loanTerm:true,
  };

  getValidations() {
    return this._validations;
  }

  render() {

    const {web3Service} = this.props;
    return (
      <StepLayout
        activeApp = {this.activeApp}
        activeStepKey={this.activeStepKey}
        onNext={this.goNext}
        web3Disabled = {this.web3Disabled(web3Service) }
      >
        <div className="input-block-container">
          {this.renderProperty(this.properties.interestRate, { side: 'left' })}
          {this.renderProperty(this.properties.interestCycle, { side: 'right' })}
        </div>
        <div className="input-block-container">
          {this.renderProperty(this.properties.loanTerm, { side: 'left' })}
        </div>
      </StepLayout>
    );
  }
}
