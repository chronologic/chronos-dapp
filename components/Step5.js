import React from 'react';
import { observable,whyRun } from 'mobx';
import { inject, observer } from 'mobx-react';
import ReactTooltip from 'react-tooltip'

import { CONTRACT_LABELS} from '../lib/consts';
import {showError,showInfo} from '../lib/alerts';
import web3Config from '../lib/web3Utils';
import AbstractStep from './AbstractStep';
import StepLayout from './StepLayout';

import Ringloader,{Boxloader} from '../lib/loader';

const ContractData = data => {
  const explorer = data.explorer;
  data = data.data;
  let Data = [],
  index = 0;
  for(var d in data){
    if(d=='address')
      Data.push(<div className={'col col-3'} key={d}>
        <label className="label">{CONTRACT_LABELS[d]+' : '}</label>
        <p className='' ><a target="_blank" href={explorer+'address/'+data[d]}>{ data[d] }</a></p>
      </div>);
    else
      Data.push(<div className={'col col-3'} key={d}>
        <label className="label">{CONTRACT_LABELS[d]+' : '}</label>
        <p className='' >{ data[d] }</p>
      </div>);
    index++;
  }
   return (Data);
}

@inject('web3Service')
@inject('store')
@observer
export default class Step5 extends AbstractStep {
  constructor(props) {
    super('WATCH', props);
  }

  getValidations (){
    return this._validations;
  }

  @observable
  _state = {
    notReady: true,
    loadingData: false,
    contractInstance:{},
    deploymentData:{}
  }

  @observable
  _validations = {
    receiverAddress: true,
    tokens: true,
    weiAmount: true,
    timemintId: true,
    teamMember: true
  };

  _contractFields = ['tokenName', 'symbol',
    'minMintingPower', 'maxMintingPower', 'halvingCycle', 'mintingPeriod',
    'maxAddresses', 'startingId', 'totalMintingId',
    'teamLockPeriod', 'postDeploymentMaxIds', 'minimumBalance'];

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

  async isReleased(){
    const {web3Service} = this.props;
    const released = await web3Service.isTokensReleased(this._state.contractInstance.address);
    return released
  }

  async fetchContractData (contractAddress){
    const {web3Service} = this.props;
    const data = await web3Service.getContractData(contractAddress);
    this.setState( Object.assign(this._state,{contractInstance:data,loadingData:false,notReady:false}) );
  }

  async fetchDeploymentData (transaction){
    const {web3Service} = this.props;
    const data = await web3Service.getDeploymentData(transaction);
    this.setState( Object.assign(this._state,{deploymentData:data}) );
  }

  async contractDeployed( transaction ){
    const {web3Service,store} = this.props;
    this.setState( Object.assign(this._state,{transactionHash:transaction}) );
    const mined = await this.awaitMined(transaction);
    this.setState( Object.assign(this._state,{transactionReceipt:mined}) );
    const confirmations = await this.checkConfirmations(transaction);
    this.setState( Object.assign(this._state,{notReady:false}) );
    const contract = await web3Service.fetchNewChild(transaction);
    console.log(contract, confirmations)
    if(contract){
      await this.fetchDeploymentData(transaction);
      await this.fetchContractData(contract);
    }
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
          <div>
            <div className="steps-content contract_info">
              <ContractData {...{data:this._state.contractInstance,explorer:EXPLORER}} />
              <div className='contract_clear'></div>
              <button className="button button_secondary_fill button_right button_mullayer" disabled={!this.isReleased()} >Release Tokens</button>
            </div>
            <div className="steps-content contract_info">
              <h2 className="title left">
                Allocate Time Mints
              </h2>
              <div className="input-block-container bottom-margin">
                {super.renderProperty(this.properties.receiverAddress, { })}
              </div>
              <div className="input-block-container bottom-margin">
                {super.renderProperty(this.properties.tokens, {  })}
              </div>
              <div className="input-block-container bottom-margin">
                {super.renderProperty(this.properties.weiAmount, {  })}
              </div>
              <div className="input-block-container bottom-margin">
                {super.renderProperty(this.properties.timemintId, {  })}
              </div>
              <div className="input-block-container bottom-margin">
                {super.renderProperty(this.properties.teamMember, { side:'left', type:'checkbox' })}
              </div>
              <div className="input-block-container bottom-margin">
                <button className="button button_fill " disabled={true} >Allocate</button>
              </div>
              {ReactTooltip.rebuild()}
            </div>
            <div>
              <div className="input-block-container">
                <h2 className="title left">
                  Transaction <kbd className='small'>history</kbd>
                </h2>
              </div>
              <div className="steps-content contract_info scrollable scrollable_200">
              </div>
            </div>
            <div>
              <div className="input-block-container">
                <h2 className="title left">
                  Contract <span className='small'>details</span>
                </h2>
              </div>
              <div className="steps-content contract_info  scrollable scrollable_600">
                <div className="code">
                  <div className="input-block-container">
                    <h4 className="title left">
                      Contact Deployment code
                    </h4>
                  </div>
                  <pre className="scrollable scrollable_200">
                    {this._state.deploymentData.creationCode}
                  </pre>
                </div>

                <div className="code">
                  <div className="input-block-container">
                    <h4 className="title left">
                      Contact ABI
                    </h4>
                  </div>
                  <pre className="scrollable scrollable_200">
                    {this._state.deploymentData.abi}
                  </pre>
                </div>


              </div>
            </div>
          </div>
        }
        <div className="input-block-container">
        </div>
      </StepLayout>
    );
  }
}
