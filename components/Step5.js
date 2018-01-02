import React from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import Router from 'next/router';

import { CONTRACT_LABELS} from '../lib/consts';
import {showError,showInfo,confirmProcess} from '../lib/alerts';
import web3Config from '../lib/web3Utils';
import AbstractStep from './AbstractStep';
import StepLayout from './StepLayout';

import ReactTooltip from 'react-tooltip'

const ContractData = data => {
  const explorer = data.explorer;
  data = data.data;
  let Data = [],
  index = 0;
  for(let d in data){
    if(d=='isReleased')continue;
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

const AllocationData = data => {
  const explorer = data.explorer;
  const skip = ['explorer','type'];
  const Titles = {
    'team': 'Allocated Team Member TimeMints',
    'normal': 'Allocated Investor TimeMints',
    'postico': 'Allocated Post-ICO Investor TimeMints'
  }
  let Data = [],
  index = 0;
  for(let d in data){
    if(skip.indexOf(d) > -1)continue;
    Data.push(
      <div  key={'allocationdata'+d}>
        <div className={'title'}>
          {Titles[d]}
        </div>
        <div className={'col col-3'}>
          <label className="label">Transaction Hash</label>
          <p><a target="_blank" href={explorer+'tx/'+data[d].transactionHash}>{ data[d].transactionHash }</a></p>
        </div>
        <div className={'col col-3'}>
          <label className="label">Receiver Address</label>
          <p>{data[d].receiver}</p>
        </div>
        <div className={'col col-3'}>
          <label className="label">TimeMint ID</label>
          <p>{data[d].contributorId}</p>
        </div>
        <div className='contract_clear'></div>
      </div>);
    }
   return (Data);
}

@inject('web3Service')
@inject('store')
@observer
export default class Step5 extends AbstractStep {
  constructor(props) {
    super('WATCH', props);
    this.allocateMints = this.allocateMints.bind(this);
  }

  getValidations (){
    return this._validations;
  }

  @observable
  _validations = {
    receiverAddress: true,
    tokens: true,
    weiAmount: true,
    timemintId: true,
    teamMember: true,
    isTest: true,
  };

  @observable
  _state = {
    loadingData: true,
    contractInstance:{},
    deploymentData:{},
    allocationHistory:{}
  }


  async change(property, event) {
    await super.change(property, event);
    if(property == 'teamMember')
      ReactTooltip.rebuild();
  }

  componentDidMount() {
    this.loadInfo();
  }

  async doRelease (eventInst) {
    const { target } = eventInst;
    const { props: {web3Service} } = this;
    const EXPLORER = web3Config[web3Service.network].EXPLORER;
    const prompt = await confirmProcess('Release Tokens','You won\'t be able to allocate timemints after this!');
    if(!prompt)
      return;
    target.disabled = true;
    try{
      const releaseTxn = await web3Service.releaseTokens();
      showInfo(`Tokens released: \n <a href="${EXPLORER}/tx/${releaseTxn}" >${releaseTxn}</a>`);
    }
    catch(e){
      console.error(e);
      showError("Transaction Failed !!!");
      target.disabled = false;
    }
  }

  async allocateMints (eventInst) {
    const { target } = eventInst;
    const { props: {web3Service,store} } = this;
    const EXPLORER = web3Config[web3Service.network].EXPLORER;

    let fxn,skipValidations = [],allocateData={};
    Object.keys(this.properties).map(property => allocateData[property] = store[property]);

    switch(true){
      case (await this.isReleased()):
        fxn = 'postAllocateAuctionTimeMints';
        skipValidations = ['isTest','weiAmount','tokens'];
        break;
      case (allocateData['teamMember']):
        fxn = 'allocateTeamTimemints';
        skipValidations = ['weiAmount'];
        break;
      default:
        fxn = 'allocateNormalTimeMints';
        skipValidations = ['isTest'];
        break;
    }

    const validated = await this.validateAllocation(skipValidations);
    if(!validated)
      return;

    const prompt = await confirmProcess('Allocate Tokens',`Kindly confirm allocation of timemint ID: ${allocateData['timemintId']} `);
    if(!prompt)
      return;

    target.disabled = true;
    allocateData.contract = this._state.contractInstance.address;

    try{
      const allocateTxn = await web3Service[fxn](allocateData);
      allocateData.forEach( d => {//Clean up fields to avoid doiuble allocation
        console.log(d)
        store[d] = '';
      })
      showInfo(`Tokens allocated: \n <a href="${EXPLORER}/tx/${allocateTxn}" >${allocateTxn}</a>`);
      target.disabled = false;
    }
    catch(e){
      console.error(e);
      showError("Transaction Failed !!!");
      target.disabled = false;
    }
  }

  async loadInfo(){
    const {props:{store}} = this;
    let {query:{newContract,transactionHash}} = Router;

    console.log(newContract,transactionHash)

    if(newContract)
    await this.fetchContractData(newContract);
    if(transactionHash)
      await this.fetchDeploymentData(transactionHash);
    await this.fetchAllocationHistory(newContract);
    ReactTooltip.rebuild()
  }

  async isReleased(){
    const {web3Service} = this.props;
    const released = await web3Service.isTokensReleased(this._state.contractInstance.address);
    this.setState( Object.assign(this._state.contractInstance,{isReleased:released}) );
    return released
  }

  async fetchContractData (contractAddress){
    const {web3Service} = this.props;
    this.setState( Object.assign(this._state.contractInstance,{address:contractAddress}) );
    const data = await web3Service.getContractData(contractAddress);
    this.setState( Object.assign(this._state,{contractInstance:data,loadingData:false}) );
    await this.isReleased();
  }

  async fetchDeploymentData (transaction){
    const {web3Service} = this.props;
    this.setState( Object.assign(this._state.deploymentData,{transactionHash:transaction}) );
    const data = await web3Service.getDeploymentData(transaction);
    this.setState( Object.assign(this._state,{deploymentData:data}) );
  }

  async fetchAllocationHistory (contractAddress){
    const {web3Service} = this.props;
    const history = await web3Service.getAllocationHistory(contractAddress);
    console.log(history,'history')
    this.setState( Object.assign(this._state.allocationHistory,history) );
  }

  validateAllocation = (skipValidation) => {
    const {web3Service} = this.props;
    if(this.web3Disabled(web3Service) )
      return;
    const { props: { store } } = this;
    const validations = Object.keys(this.properties).map(property => skipValidation[property] || this.validate(property));
    return (!validations.some(validation => !validation));
  };

  goNext = () => {
      throw new Error('No passage here!!!');
  };

  render() {
    const {web3Service,store} = this.props;
    const EXPLORER = web3Config[web3Service.network].EXPLORER;

    return (
      <StepLayout
        activeStepKey={this.activeStepKey}
        onNext={this.goNext}
        nextTitle={null}
        web3Disabled = {this.web3Disabled(web3Service) || this._state.notReady}
      >

          <div>
            { (this._state.loadingData || !this._state.contractInstance ) &&
              <div className="steps-content bottom-margin">
                <div className="input-block-container center text-center">
                  <p className='loading_msg' >Loading contract data ...</p>
                </div>
                <div className="input-block-container value center text-center">
                  <label className="label">Contract : </label>
                  <a target="_blank" href={EXPLORER+'/address/'+this._state.contractInstance.address}>{this._state.contractInstance.address}</a>
                </div>
              </div>
            }
            { !this._state.loadingData && this._state.contractInstance &&
              <div>
                <div className="steps-content contract_info">
                  <ContractData {...{data:this._state.contractInstance,explorer:EXPLORER}} />
                  <div className='contract_clear bottom-margin'></div>
                  { !this._state.contractInstance.isReleased &&
                    <button className="button button_secondary_fill button_right button_mullayer" onClick={this.doRelease} >Release Tokens</button>
                  }
                </div>
                <div className="steps-content contract_info">
                  <h2 className="title left">
                    Allocate Time Mints
                  </h2>
                  <div className="input-block-container bottom-margin">
                    {this.renderProperty(this.properties.receiverAddress, {  })}
                  </div>
                  {!this._state.contractInstance.isReleased &&
                    <div className="input-block-container bottom-margin">
                      {this.renderProperty(this.properties.tokens, {  })}
                    </div>
                  }
                  {!store['teamMember'] &&
                     <div className="input-block-container bottom-margin">
                        {this.renderProperty(this.properties.weiAmount, {  })}
                      </div>
                    }
                  <div className="input-block-container bottom-margin">
                    {this.renderProperty(this.properties.timemintId, { side:"" })}
                  </div>
                  <div className="input-block-container bottom-margin">
                    {this.renderProperty(this.properties.teamMember, { side:'left',type:'checkbox' })}
                  </div>
                  {store['teamMember'] &&
                    <div className="input-block-container bottom-margin">
                      {this.renderProperty(this.properties.isTest, { side:'left',type:'checkbox' })}
                    </div>
                  }
                  <div className="input-block-container bottom-margin">
                    <button className="button button_fill " onClick={this.allocateMints} >Allocate</button>
                  </div>
                </div>

                <div>
                  <div className="input-block-container">
                    <h2 className="title left">
                      Transaction <kbd className='small'>history</kbd>
                    </h2>
                  </div>
                  <div className="steps-content contract_info scrollable scrollable_200">
                    <AllocationData {...Object.assign(this._state.allocationHistory,{explorer:EXPLORER})}/>
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
            </div>

          <div className="input-block-container">
          </div>
      </StepLayout>
    );
  }
}
