import React from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import Router from 'next/router';

import { PROPERTIES as ALL_PROPERTIES } from '../lib/consts';
import AbstractStep from './AbstractStep';
import StepLayout from './StepLayout';

import Ringloader,{Boxloader} from '../lib/loader';

@inject('web3Service')
@inject('store')
@observer
export default class Step4 extends AbstractStep {
  constructor(props) {
    super('WATCH', props);
  }

  @observable
  _state = {
    notReady: true,
  }

  componentDidMount() {
    const {web3Service} = this.props;
    console.log(this.props)
    const deployer = web3Service.deploy();
  }

  getValidations() {
    return {};
  }

  goNext = () => {

      throw new Error('Implement next stage');
  };

  contractDeployed(){
    return false;
  }

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
        nextTitle=""
        web3Disabled = {this.web3Disabled(web3Service) || this._state.notReady}
      >
        <div className="input-block-container">
          <Boxloader {...{color:'#123abc',loading: true, size:13,msg:'Deploying...'}} />
        </div>
      </StepLayout>
    );
  }
}
