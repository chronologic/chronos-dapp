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

import {Boxloader} from '../../lib/loader';

@inject('web3Service')
@inject('store')
@observer
export default class Step5 extends AbstractStep {
    constructor(props) {
        super('DEBT_WATCH', 'debt', props);
        this.runDeploy = this.runDeploy.bind(this);
    }











    render() {
        
    }
}
