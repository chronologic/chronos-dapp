import React, { Component } from 'react';
import Router from 'next/router';
import { inject, observer } from 'mobx-react';
import { confirmFeeWithdraw, showInsufficientBalalnce, showError, showInfo, showContractAddressRequest } from '../lib/alerts';

const SelectorBox = props =>{
  return(
    <div></div>
  )
}

@observer
export default class Selector extends Component {
  constructor(props){
    super(props);

    this.state = {
      selected:'chronos',
    }

    this.cssGroup = {
      debt:'debt-contract',
      chronos:'chronos-dapp'
    }

    this.appRoutes = {//Order determines how they are displayed
      chronos:'/chronos-home',
      debt:'/',
    }
  }

  onStart = async (eventInst) => {
    var target = eventInst.target
    target.disabled = true;
    if(false){
        this.start();
      }
      else
        target.disabled = false;
  }

  componentDidMount(){
  }

  start(dapp) {

    Router.push(this.appRoutes[dapp]);
  }

  render() {
    const {appRoutes,cssGroup} = this;

    return (
      <div>
        <section className={'selector '+cssGroup[this.state.selected]}>
          <div className='selector-group'>
            {Object.keys(appRoutes).map( e =>{
              return(<div key={appRoutes[e]}
                className={'selector-box '+e+' '+
                  (this.state.selected==e?'selected':'')} >
              </div>)
            })}
          </div>
        </section>
      </div>
    );
  }
}
