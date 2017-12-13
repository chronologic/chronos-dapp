import Web3 from 'web3/index';
import Bb from 'bluebird';
import { action, observable, runInAction } from 'mobx';

import dayTokenABI from './abi/dayTokenABI';
import deployerABI from './abi/deployerABI';

import web3Config from './lib/web3Utils.js'
const Network = 'Ropsten';

const TOKEN_CONTRACT_ADDRESS = web3Config[web3Config.active].TOKEN_CONTRACT_ADDRESS;
const DEPLOYER_ADDRESS = web3Config[web3Config.active].DEPLOYER_ADDRESS;
const MIN_FEE = web3Config[Network].MIN_FEE;

let instance = null;

export default class Web3Service {
  initialized = false;
  web3 = null;
  tokenInstance = null;
  deployerInstance = null;
  @observable connectedToMetaMask = null;
  @observable accounts = null;
  @observable netId = null;

  constructor(props) {
    Object.assign(this, props);
  }

  @action
  async init() {
    if (!this.initialized) {
      await this.connect();
      this.initialized = true;
      return true;
    } else {
      return false;
    }
  }

  @action
  async connect() {
    let { web3 } = this;
    if (!web3) {
      if (typeof window.web3 !== 'undefined') {
        web3 = new Web3(window.web3.currentProvider);
        this.connectedToMetaMask = true;
      } else {
        web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
        this.connectedToMetaMask = false;
      }
      window.web3 = web3;
      this.web3 = web3;
    }
    if(!this.connectedToMetaMask || !this.web3.isConnected() )//Do not proceed if not connected to metamask
      return;

    this.accounts = web3.eth.accounts;
    web3.eth.defaultAccount = this.accounts[0];
    console.log('accounts', this.accounts);
    const netId =
      await Bb.fromCallback(callback => web3.version.getNetwork(callback));
    runInAction(() => {
      this.netId = netId;
    });
    console.log('netId', this.netId);
    this.tokenInstance = web3.eth.contract(dayTokenABI).at(TOKEN_CONTRACT_ADDRESS);
    this.deployerInstance = web3.eth.contract(deployerABI).at(DEPLOYER_ADDRESS);
  }

  @action
  async checkBalance() {
    const result = await Bb.fromCallback((callback) => {
      this.tokenInstance.balanceOf.call(this.accounts[0], callback);
    });
    return result.valueOf() >= MIN_FEE;
  }

  @action
  async checkAllowance() {
    const result = await Bb.fromCallback((callback) => {
      this.tokenInstance.allowance.call(this.accounts[0], DEPLOYER_ADDRESS, callback);
    });
    return result.valueOf() >= MIN_FEE;
  }

  @action
  async approveFee() {
    const result =  await Bb.fromCallback((callback) => {
      this.tokenInstance.approve(DEPLOYER_ADDRESS, MIN_FEE, callback);
    });
    return result;
  }

  @action
  async fetchGasPrice(){
    const result = await Bb.fromCallback( callback =>
      web3.eth.getGasPrice(callback)
    );
    return result;
  }

  @action
  async deploy(contractData) {
      let {web3,deployerInstance} = this;

      let transactionOptions = {
        gasPrice : (await this.fetchGasPrice()).plus(web3.toWei(2,'gwei')),
      }

      const hash = await Bb.fromCallback((callback)=>{
        deployerInstance.createCustomDayToken(
        contractData.tokenName,
        contractData.symbol,
        contractData.maxAddresses,
        contractData.startingId,
        contractData.totalMintingId,
        contractData.postDeploymentMaxIds,
        contractData.minMintingPower,
        contractData.maxMintingPower,
        contractData.halvingCycle,
        contractData.minimumBalance,
        contractData.mintingPeriod,
        contractData.teamLockPeriod,
        transactionOptions,
        callback
      )
    });
    console.log(hash);
    return hash;
  }

  @action
  async trackTransaction(hash){
    let {deployerInstance,trackTransaction} = this;
    let receipt;
    var that = this;

    if(!(receipt = await this.fetchReceipt(hash)) ){
      let Promises = new Promise((resolve, reject) => {
          setTimeout( async function(){
            resolve(await that.trackTransaction(hash) );
          },2000);
        })
      return  Promises;
    }
    else{
      return receipt;
    }
  }

  async fetchReceipt(hash){
    let {web3} = this;
    let receipt =  await Bb.fromCallback( callback=>
      web3.eth.getTransactionReceipt(hash, callback) );
      return receipt;
  }

  async fetchConfirmations(transaction){
    const mined = await this.trackTransaction(transaction);
    const block = await this.fetchBlockNumber();
    const that = this;
    if(!mined.blockNumber ){
      let Promises = new Promise((resolve, reject) => {
          setTimeout( async function(){
            resolve(await that.fetchConfirmations(transaction) );
          },2000);
        })
      return  Promises;
    }
    else{
      return (block - mined.blockNumber);
    }
  }

  async fetchBlockNumber(){
    let{web3} = this;
    let block = await Bb.fromCallback( callback =>
    web3.eth.getBlockNumber(callback));
    return block;
  }
    /*
    console.log("deploying new token");
    var _tokenName = $("#name").val();
    var _tokenSymbol = $("#symbol").val();
    var _maxAddresses = $("#maxAddresses").val();
    var _firstTeamContributorId = $("#firstTeamContributionId").val();
    var _totalTeamContributorIds = $("#totalTeamContributionId").val();
    var _totalPostIcoContributorIds = $("#totalPostIcoContributorIds").val();
    var _minMintingPower = $("#minMintingPower").val();
    var _maxMintingPower = $("#maxMintingPower").val();
    var _halvingCycle = $("#halvingCycle").val();
    var _DayInSecs = $('#dayLengthinSec').val();
    var _minBalanceToSell = $("#teamLockPeriodInSec").val();
    var _teamLockPeriodInSec = $("#minBalanceToSell").val();
getDeployerInstance().then(function(deployerInstance) {
    var txHash = deployerInstance.createCustomDayToken(_tokenName,_tokenSymbol,_maxAddresses,_firstTeamContributorId,_totalTeamContributorIds,_totalPostIcoContributorIds,_minMintingPower,_maxMintingPower,_halvingCycle,_minBalanceToSell,_DayInSecs, _teamLockPeriodInSec,{
            from: accounts[0],
            gas: 4100000,
            value: 0
        },function(error,result){
            if(result){
                txUrl = baseNetworkURL+"tx/"+result;

                swal({
                title: 'Please wait while the transaction is mined',
                html: '<a target="_blank" href="'+txUrl+'">'+result+'</a>',
                allowOutsideClick:false,
                type: "info",
                showCancelButton: false,
                showConfirmButton: false,
                allowEscapeKey:false
                })
                return awaitBlockConsensus(window.web3, result,2, 200).then(function(result){
                    var obj = result.logs;
                    window.location.replace("watchToken.html?tad="+obj[2].address);

            }, function(error) {
                console.log('Could not fetch new balances', error);
                return Promise.reject(error);
            });
            }
            else
                return;
        });
    }).then(function(result){
        console.log("result",result);
    }, function(error) {
        console.log('Could not fetch new balances', error);
        return Promise.reject(error);
    });*/
}

export function initWeb3Service(isServer, source) {
  if (isServer) {
    return new Web3Service(source);
  } else {
    if (instance === null) {
      instance = new Web3Service(source);
    }
    return instance;
  }
}
