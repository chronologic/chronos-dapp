import React from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import ReactTooltip from 'react-tooltip'
import Router from 'next/router';

import { PROPERTIES as ALL_PROPERTIES } from '../../lib/consts';
import {showError} from '../../lib/alerts';
import web3Config from '../../lib/web3Utils';
import AbstractStep from '../AbstractStep';
import StepLayout from '../StepLayout';
import { DEBT_CONTRACT_LABELS } from "../../lib/consts";
import {showError,showInfo,confirmProcess} from "../../lib/alerts";
import {Boxloader} from '../../lib/loader';

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
        loadingData: true,
        loadinghistoryData: true,
        contractInstance:{},
        deploymentData:{},
        allocationHistory:{}
      }

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
    this.setState( Object.assign(this._state.contractInstance))
}
    async fetchContractData (contractAddress){
        const {web3Service} = this.props;
        const data = await web3Service.getContractData(contractAddress);
        this.setState( Object.assign(this._state,{contractInstance:data,loadingData:false}) );

    }


    clearUpdater(){
        clearInterval(this.state.updateFetcher);
    }



    render() {

    }
}
