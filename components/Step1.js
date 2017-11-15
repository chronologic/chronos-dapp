
import React from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';

import AbstractStep from './AbstractStep';
import StepLayout from './StepLayout';

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
    return (
      <StepLayout
        activeStepKey={this.activeStepKey}
        onNext={this.goNext}
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
