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

const ContractData = data => {
  console.log(data)
  return(<div></div>)
  let Data = [];
  for(var d in data){
    Data.push(<div className="input-block-container col-3">
      <label className="label">{d+' : '}</label>
      <p className='loading_msg' >{ this._state.contractInstance[d] }</p>
    </div>)
   }
   return {Data};
}

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
    loadingData: false,
    contractInstance:{}
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
    if(transaction)
    await this.contractDeployed(transaction);
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

  async fetchContractData (contractAddress){
    const {web3Service} = this.props;
    const data = await web3Service.getContractData(contractAddress);
    console.log(data);
    this.setState( Object.assign(this._state,{contractInstance:data,loadingData:false,notReady:false}) );
  }

  async contractDeployed( transaction ){
    const {web3Service,store} = this.props;
    this.setState( Object.assign(this._state,{transactionHash:transaction}) );
    const mined = await this.awaitMined(transaction);
    this.setState( Object.assign(this._state,{transactionReceipt:mined}) );
    const confirmations = await this.checkConfirmations(transaction);
    const contract = await web3Service.fetchNewChild(transaction);
    console.log(contract, confirmations)
    if(contract)
      await this.fetchContractData(contract);
    else{
      const error = await showError('There was problem deploying the contract. Try again?')
      const query = ALL_PROPERTIES.reduce((result, { name }) => {
        result[name] = store[name];
        return result;
      }, {});

      if(error)
      Router.push({
        pathname: this.activeStep.prevUrl,
        query,
      });
    }

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
    const EXPLORER = web3Config[web3Service.network].EXPLORER;

    return (
      <StepLayout
        activeStepKey={this.activeStepKey}
        onNext={this.goNext}
        nextTitle={null}
        web3Disabled = {this.web3Disabled(web3Service) || this._state.notReady}
      >
        {this._state.notReady &&
         <div className="input-block-container">
          <Boxloader {...{color:'#123abc',loading: true, size:13,msg:!this._state.transactionHash?'Deploying...':'Awaiting Mining ...'}} />
         </div>
        }
        {!this._state.notReady && this._state.loadingData &&
          <div className="input-block-container center text-center">
            <p className='loading_msg' >Successfully deployed.<br/> Loading Contract data ...</p>
          </div>
        }
        {(this._state.notReady || this._state.loadingData) && this._state.transactionHash &&
          <div className="input-block-container value center text-center">
            <label className="label">Transaction Hash : </label>
            <a target="_blank" href={EXPLORER+'/tx/'+this._state.transactionHash}>{this._state.transactionHash}</a>
          </div>
        }
        {!this._state.notReady && !this._state.loadingData &&
          <ContractData {...this._state.contractInstance} />
        }
        <div className="input-block-container">
        </div>
      </StepLayout>
    );
  }
}
