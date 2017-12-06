import React from 'react';
import { inject, observer } from 'mobx-react';
import Router from 'next/router';

import { PROPERTIES as ALL_PROPERTIES } from '../lib/consts';
import AbstractStep from './AbstractStep';
import StepLayout from './StepLayout';

@inject('store')
@observer
export default class Step4 extends AbstractStep {
  constructor(props) {
    super('PUBLISH', props);
  }

  getValidations() {
    return {};
  }

  goNext = () => {
    const validations = ALL_PROPERTIES.reduce((result, property) => {
      result.push(this.validate(property.name));
      return result;
    }, []);
    //console.log(validations,validations.some(validation => !validation))
    if (!validations.some(validation => !validation)) {
      //Router.push('/step-4');
      throw new Error('Implement next stage');
    }
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
    return (
      <StepLayout
        activeStepKey={this.activeStepKey}
        onNext={this.goNext}
        nextTitle="Deploy"
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
