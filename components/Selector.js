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
    this.choosePath = this.choosePath.bind(this);

    this.state = {
      selected:'chronos',
    }



    this.routeLabels = {//Order determines how they are displayed
      debt:'Debt-Smart-Contract',
      chronos:'Custom-Day-Token'
    }

    this.cssGroup = {
      debt:'debt-contract',
      chronos:'chronos-dapp'
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

  previewPath = path => event =>{
    if(path != this.state.selected)
      this.setState({selected:path});
  }

  choosePath = path => event =>{
    const available = ['chronos'];
    if(available.indexOf(path) < 0)
      return showInfo('Coming Soon !!!');

    this.start(path);
  }

  start(dapp) {
    Router.push('/'+dapp);
  }

  render() {
    const {cssGroup,routeLabels} = this;
    const {state:{selected}} = this;

    return (
      <div>
        <section className={'selector '+cssGroup[this.state.selected]}>
          <div className='container selector-group'>
            {Object.keys(routeLabels).map( (e,i) =>{
              return(<div key={cssGroup[e]}
                className={'selector-box '+e+' '+
                  (selected==e?'selected':'')+' '+(i%2==0?'left':'right')}
                  onMouseOver={this.previewPath(e)}
                  onClick={this.choosePath(e)}>
                  <div className='icon'></div>
                  <h2 className='label'>{routeLabels[e]}</h2>
              </div>)
            })}
          </div>
        </section>
      </div>
    );
  }
}
