import React from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';

import AbstractStep from './AbstractStep';
import StepLayout from './StepLayout';

@inject('web3Service')
@inject('store')
@observer
export default class Step1 extends AbstractStep {
  constructor(props) {
    super('TOKEN_SETUP', props);
  }

  @observable
  _validations = {
    tokenName: true,
    symbol: true,
  };

  getValidations() {
    return this._validations;
  }

  render() {
    
    const {web3Service} = this.props;
    return (
      <StepLayout
        activeStepKey={this.activeStepKey}
        onNext={this.goNext}
        web3Disabled = {this.web3Disabled(web3Service) }
      >
        <div className="input-block-container">
          {this.renderProperty(this.properties.tokenName, { side: 'left' })}
        </div>
        <div className="input-block-container">
          {this.renderProperty(this.properties.symbol, { side: 'left' })}
        </div>
      </StepLayout>
    );
  }
}
