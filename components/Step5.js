import React from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import Router from 'next/router';

import { PROPERTIES as ALL_PROPERTIES } from '../lib/consts';
import {showError,showInfo} from '../lib/alerts';
import web3Config from '../lib/web3Utils';
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
    loadingData: false
  }

  _contractFields = ['tokenName', 'symbol',
    'minMintingPower', 'maxMintingPower', 'halvingCycle', 'mintingPeriod',
    'maxAddresses', 'startingId', 'totalMintingId',
    'teamLockPeriod', 'postDeploymentMaxIds', 'minimumBalance']

  componentDidMount() {
    try{
      this.runDeploy();
    }
    catch(e){
      showError('Transaction Failed');
      console.error(e);
    }
  }

  fetchData(){
    const { props: { store } } = this;
    var data = {};
    this._contractFields.map(function(field){
      data[field] = store[field]
    })
    return data;
  }

  async runDeploy(){
      const {web3Service} = this.props;
      const transaction = await web3Service.deploy( this.fetchData() );
      this.contractDeployed(transaction);
  }

  async awaitMined (transaction){
     const {web3Service} = this.props;
     const mined = await web3Service.trackTransaction(transaction);
  }

  async checkConfirmations (transaction){
      const {web3Service} = this.props;
      const confirmations = await web3Service.fetchConfirmations(transaction);
      console.log(confirmations)
      if(confirmations < 1 )
        return await this.checkConfirmations(transaction);
      else if(confirmations > 0){
        this.setState( Object.assign(this._state,{notReady:false}) );
        return transaction;
      }
  }

  async fetchContractData (transaction){
    this.setState( Object.assign(this._state,{loadingData:true}) );

  }

  async contractDeployed(transaction){
    this.setState( Object.assign(this._state,{transactionHash:transaction}) );
    const mined = await this.awaitMined(transaction);
    this.setState( Object.assign(this._state,{transactionReceipt:mined}) );
    const minedTransaction = this.checkConfirmations(transaction);
    await this.fetchContractData(minedTransaction);
  }

  getValidations() {
    return {};
  }

  goNext = () => {
      throw new Error('Implement next stage');
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
    const {web3Service} = this.props;
    const EXPLORER = web3Config[web3Config.active].EXPLORER;

    return (
      <StepLayout
        activeStepKey={this.activeStepKey}
        onNext={this.goNext}
        nextTitle={null}
        web3Disabled = {this.web3Disabled(web3Service) || this._state.notReady}
      >
        {this._state.notReady &&
         <div className="input-block-container">
          <Boxloader {...{color:'#123abc',loading: true, size:13,msg:!this._state.transactionHash?'Deploying...':'Awaiting Minning ...'}} />
         </div>
        }
        {!this._state.notReady && this._state.loadingData &&
          <div className="input-block-container center text-center">
            <p className='loading_msg' >Successfully deployed.<br/> Please wait...</p>
          </div>
        }
        {(this._state.notReady || this._state.loadingData) && this._state.transactionHash &&
          <div className="input-block-container value center text-center">
            <label className="label">Transaction Hash : </label>
            <a target="_blank" href={EXPLORER+'/tx/'+this._state.transactionHash}>{this._state.transactionHash}</a>
          </div>
        }
        <div className="input-block-container">
        </div>
      </StepLayout>
    );
  }
}
