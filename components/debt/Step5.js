import React from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import ReactTooltip from 'react-tooltip'
import Router from 'next/router';

import { PROPERTIES as ALL_PROPERTIES } from '../../lib/consts';
import web3Config from '../../lib/web3Utils';
import AbstractStep from '../AbstractStep';
import StepLayout from '../StepLayout';
import { DEBT_CONTRACT_LABELS } from "../../lib/consts";
import {showError,showInfo,confirmProcess} from "../../lib/alerts";
import {Boxloader} from '../../lib/loader';

const ContractData = data => {
    const explorer = data.explorer;
    data = data.data;
    let Data = [],
        index = 0;
    for(let d in data){
        if(d=='address')
            Data.push(<div className={'col col-3'} key={d}>
                <label className="label">{DEBT_CONTRACT_LABELS[d]+' : '}</label>
                <p className='' ><a target="_blank" href={explorer+'address/'+data[d]}>{ data[d] }</a></p>
            </div>);
        else
            Data.push(<div className={'col col-3'} key={d}>
                <label className="label">{DEBT_CONTRACT_LABELS[d]+' : '}</label>
                <p className='' >{ data[d] }</p>
            </div>);
        index++;
    }
    return (Data);
}

import {Propagatesloader} from "../../lib/loader";

@inject('web3Service')
@inject('store')
@observer
export default class Step5 extends AbstractStep {
    constructor(props) {
        super('DEBT_WATCH', 'debt', props);
    }

    @observable
      _state = {
        loadingData: true
        loadinghistoryData: true,
        contractInstance:{},
        deploymentData:{},
        allocationHistory:{},
        funded:'',
        refunded:'',
        lender:false

      }



    async componentDidMount(){

    }

    async componentWillMount(){
        await this.loadInfo();
    }

async loadInfo(){
    const {props:{store}} =  this;
    let {query:{newContract,transactionHash}} = Router;

    if(!newContract && !transactionHash)
        return false;

    if(newContract){
        this.setState( Object.assign(this._state.contractInstance,{address:newContract}) );
        await this.fetchContractData(newContract);
    }
    if(transactionHash){
        await this.fetchDeploymentData(transactionHash);
        await this.resolveOwnership( newContract );
        await this.fetchAllocationHistory(newContract);
    }
    ReactTooltip.rebuild();
    this.fetchUpdate();
}

async fetchUpdates(){
    const that = this;
    const newContract = this._state.contractInstance.address;
    this.setState({updateFetcher: setInterval( ()=>{
        console.log('updating...')
        that.fetchContractData(newContract);
        that.fetchAllocationHistory(newContract);
    }, 10000)
    });
    this.clearUpdater()
}

async updateInterest(){
    const {web3Service} =  this.props;
    const updated = await web3Service.updateInterest(this._state.contractInstance.address);
    this.setState( Object.assign(this._state,{contractInstance:data,loadingData:false}) );
}

async isLender(){
    const {web3Service} =  this.props;
    const lender = await web3Service.isLender(this._state.contractInstance.address);
    this.setState({lender:true});
}
async fundLoan(){
    const {web3Service} =  this.props;
    const funded = await web3Service.fundLoan(this._state.contractInstance.address);
    this.setState( {funded:funded});
}
    async refundLoan(){
        const {web3Service} =  this.props;
        const refunded = await web3Service.refundLoan(this._state.contractInstance.address);
        this.setState( {refunded:refunded});
    }
    async fetchContractData (contractAddress){
        const {web3Service} = this.props;
        const data = await web3Service.getContractData(contractAddress);
        this.setState( Object.assign(this._state,{contractInstance:data,loadingData:false}) );

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

    clearUpdater(){
        clearInterval(this.state.updateFetcher);
    }

    goNext = () => {
        throw new Error('No passage here!!!');
    };


    render() {
        const {web3Service,store} = this.props;
        const EXPLORER = web3Config[this.activeApp][web3Service.network].EXPLORER;

        return(
            <StepLayout
            activeApp={ this.activeApp}
            activeStepKey={this.activeStepKey}
            onNext={this.goNext}
            nextTitle={null}
            web3Disabled={this.web3Disabled(web3Service) || this._state.notReady}
            >
                <div>
                    {(this._state.loadingData || !this._state.contractInstance ) &&
                    <div className="steps-content bottom-margin">
                        <div className="input-block-container center text-center">
                            <Propagatesloader {...{color:'#123abc',loading: true, size:16,msg:'loading Contract data ...'}}/>
                        </div>

                        <div className="input-block-container value center text-center">
                            <label className="label">Contract :</label>
                            {this._state.contractInstance && this._state.contractInstance.address &&
                            <a target="_blank" href={EXPLORER+'/address/'+this._state.contractInstance.address}>{this._state.contractInstance.address}</a>
                            }
                        </div>
                    </div>
                        }
                    { !this._state.loadingData && this._state.contractInstance &&
                    <div>
                        <div className="input-block-container center text-center">
                            <button className="button button_btn" onClick={this.updateInterest}>UPDATE INTEREST</button>

                            <button className="button button_btn" disabled={true}>SCHEDULE UPDATE</button>&nbsp;&nbsp;&nbsp;&nbsp;
                        </div>
                        <div className="steps-content contract_info">
                            <ContractData {...{data:this._state.contractInstance,explorer:EXPLORER}} />
                            <div className='contract_clear bottom-margin'></div>
                            { this._state.contractInstance && ! this._state.lender &&
                            <button className="button button_fill" onClick={this.fundLoan} disabled={this._state.contractInstance.isLoanFunded} >Fund</button>
                            }

                        </div>

                    </div>

                    }


                </div>
            </StepLayout>
        )
    }
}
