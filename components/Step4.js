import React from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import ReactTooltip from 'react-tooltip'
import Router from 'next/router';

import { PROPERTIES as ALL_PROPERTIES } from '../lib/consts';
import {showError} from '../lib/alerts';
import web3Config from '../lib/web3Utils';
import AbstractStep from './AbstractStep';
import StepLayout from './StepLayout';

import Ringloader,{Boxloader} from '../lib/loader';

@inject('web3Service')
@inject('store')
@observer
export default class Step4 extends AbstractStep {
  constructor(props) {
    super('PUBLISH', props);
    this.runDeploy = this.runDeploy.bind(this);
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

  @observable
  _state = {
    notReady: true,
    deploying: false,
    contractInstance:{},
    deploymentData:{}
  }

  goNext = () => {
    const { props: { store } } = this;
    let that = this;
    const CONTRACT_PROPERTIES = ['transactionHash','newContract']
    const query = CONTRACT_PROPERTIES.reduce((result, name) => {
      result[name] = that._state[name];
      return result;
    }, {});

    Router.push({
      pathname: this.activeStep.nextUrl,
      query,
    });
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

  async runDeploy(eventInst){
    var target = eventInst.target
    const {web3Service} = this.props;
    const {web3} = web3Service;
    if(this.web3Disabled(web3Service) )
      return;
    target.disabled = true;
    this.setState( Object.assign(this._state,{deploying:true}) );
    let newContract;
    try{
      const transaction = await web3Service.deploy( this.fetchData() );
      newContract = await this.contractDeployed(transaction);
      this.setState( Object.assign(this._state,{deploying:false}) );
    }
    catch(e){
      target.disabled = false;
      console.error(e);
      showError('Transaction Failed.');
    }

    this.setState( Object.assign(this._state,{deploying:false,notReady:false}) );

    if(newContract && web3.isAddress(newContract) ){
      this.setState( Object.assign(this._state,{newContract:newContract}) );
      this.goNext();
    }
    else{
      const error = await showError('There was problem deploying the contract. Try again?');

      if(error)
      target.disabled = false;
    }
  }

  async contractDeployed( transaction ){
    const {web3Service,store} = this.props;
    this.setState( Object.assign(this._state,{transactionHash:transaction,notReady:true}) );
    const mined = await this.awaitMined(transaction);
    this.setState( Object.assign(this._state,{transactionReceipt:mined}) );
    const confirmations = await this.checkConfirmations(transaction);
    this.setState( Object.assign(this._state,{notReady:false}) );
    const contract = await web3Service.fetchNewChild(transaction);
    return contract;
  }

  async awaitMined (transaction){
     const {web3Service} = this.props;
     const mined = await web3Service.trackTransaction(transaction);
     return mined;
  }

  async checkConfirmations (transaction){
    const {web3Service} = this.props;
    const confirmations = await web3Service.fetchConfirmations(transaction);
    console.log(confirmations)
    if(confirmations < 1 )
      return await this.checkConfirmations(transaction);
    else{
      this.setState( Object.assign(this._state,{loadingData:true}) );
      return confirmations;
    }
  }

  fetchData(){
    const { props: { store }, activeStep: { propertyKeys } } = this;
    var data = {};
    propertyKeys.map(function(field){
      data[field] = store[field]
    })
    return data;
  }

  render() {

    const {web3Service} = this.props;
    const EXPLORER = web3Config[web3Service.network].EXPLORER;

    return (
      <StepLayout
        activeStepKey={this.activeStepKey}
        onNext={this.runDeploy}
        nextTitle="Deploy"
        web3Disabled = {this.web3Disabled(web3Service) }
      >
        {!this._state.deploying &&
          <div>
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
          </div>
        }
        {this._state.deploying &&
         <div className="input-block-container">
          <Boxloader {...{color:'#123abc',loading: true, size:13,msg:!this._state.transactionHash?'Deploying...':'Awaiting Mining ...'}} />
         </div>
        }
        {this._state.deploying && !this._state.notReady &&
          <div className="input-block-container center text-center">
            <p className='loading_msg' >Successfully deployed ...</p>
          </div>
        }
        {this._state.deploying && this._state.transactionHash &&
          <div className="input-block-container value center text-center">
            <label className="label">Transaction Hash : </label>
            <a target="_blank" href={EXPLORER+'/tx/'+this._state.transactionHash}>{this._state.transactionHash}</a>
          </div>
        }
      </StepLayout>
    );
  }
}
