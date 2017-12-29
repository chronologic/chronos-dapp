import React from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import Router from 'next/router';

import { CONTRACT_LABELS} from '../lib/consts';
import {showError,showInfo,confirmTokenRelease} from '../lib/alerts';
import web3Config from '../lib/web3Utils';
import AbstractStep from './AbstractStep';
import StepLayout from './StepLayout';

import ReactTooltip from 'react-tooltip'

const ContractData = data => {
  const explorer = data.explorer;
  data = data.data;
  let Data = [],
  index = 0;
  for(var d in data){
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
    deploymentData:{}
  }


  async change(property, event) {
    await super.change(property, event);
    if(property == 'teamMember')
      ReactTooltip.rebuild();
  }

  componentDidMount() {
    this.loadInfo();
  }

  doRelease = async(eventInst) => {
    const { target } = eventInst;
    const { props: {web3Service} } = this;
    const EXPLORER = web3Config[web3Service.network].EXPLORER;
    const prompt = await confirmTokenRelease();
    console.log(prompt);
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

  async loadInfo(){
    const {props:{store}} = this;
    let {query:{newContract,transactionHash}} = Router;

    console.log(newContract,transactionHash)

    if(newContract)
    await this.fetchContractData(newContract);
    if(transactionHash)
      await this.fetchDeploymentData(transactionHash);
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
                  <div className="input-block-container bottom-margin">
                    {this.renderProperty(this.properties.tokens, {  })}
                  </div>
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
                    <button className="button button_fill " disabled={true} >Allocate</button>
                  </div>
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
            </div>

          <div className="input-block-container">
          </div>
      </StepLayout>
    );
  }
}
