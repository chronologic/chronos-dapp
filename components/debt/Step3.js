import React from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';

import AbstractStep from '../AbstractStep';
import StepLayout from '../StepLayout';

@inject('web3Service')
@inject('store')
@observer
export default class Step3 extends AbstractStep {
  constructor(props) {
    super('LENDER_SETUP', 'debt', props);
  }

  @observable
  _validations = {
    debtOwner:true,
    initialAmount: true,
    exchangeRate: true,
    decimalUnits:true,
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
          {this.renderProperty(this.properties.debtOwner, { side: 'left' })}
          {this.renderProperty(this.properties.initialAmount, { side: 'right' })}
        </div>
        <div className="input-block-container">
          {this.renderProperty(this.properties.exchangeRate, { side: 'left' })}
          {this.renderProperty(this.properties.decimalUnits, { side: 'right' })}
        </div>
      </StepLayout>
    );
  }
}
