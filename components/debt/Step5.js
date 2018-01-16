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
        this.runDeploy = this.runDeploy.bind(this);
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









    render() {

    }
}
