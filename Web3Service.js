import Web3 from 'web3/index';
import ethers from 'ethers';
import Bb from 'bluebird';
import { action, observable, runInAction } from 'mobx';

import dayTokenABI from './abi/dayTokenABI';
import deployerABI from './abi/deployerABI';
import dayFaucetABI from './abi/dayFaucetABI';
import debtTokenDeployerABI from './abi/debtTokenDeployerABI';

import web3Config from './lib/web3Utils.js'

let instance = null;
let TOKEN_CONTRACT_ADDRESS,
DEPLOYER_ADDRESS,
  //  DEBT_TOKEN_DEPLOYER_ADDRESS,
FAUCET_ADDRESS,
MIN_FEE;

export default class Web3Service {
  initialized = false;
  web3 = null;
  tokenInstance = null;
  deployerInstance = null;
  debtTokenDeployerInstance = null;
  @observable connectedToMetaMask = null;
  @observable accounts = null;
  @observable netId = null;
  @observable network = 'Rinkeby';
  deployerAbis = {
    debt:debtTokenDeployerABI,
    chronos:deployerABI
  }
  childTopics = {
    debt:{
      topic:web3.sha3("DebtTokenCreated(address, address, uint256)")
      params:['address','address','uint256']
    },
    chronos:{
      topic:web3.sha3("LogChildCreated(address,address)"),
      params:['address','address']
    }
  }

  constructor(props) {
    Object.assign(this, props);
  }

  @action
  async init(which) {
    console.log(which);

    if (!this.initialized) {
      await this.connect(which);
      this.initialized = true;
      this.activeApp = which;
      return true;
    } else {
      return false;
    }
  }

  @action
  async connect(which) {
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
      let network;
      if(netId == 1)
        this.network = 'Mainnet';
      else if(netId == 3)
        this.network = 'Ropsten'
      else if(netId == 4)
        this.network = 'Rinkeby';
      else
        this.network = 'Private'
    });
    console.log('netId', this.netId,this.network);

    TOKEN_CONTRACT_ADDRESS = web3Config[which][this.network].TOKEN_CONTRACT_ADDRESS;
    DEPLOYER_ADDRESS = web3Config[which][this.network].DEPLOYER_ADDRESS;
    FAUCET_ADDRESS = web3Config[which][this.network].FAUCET_ADDRESS;
    MIN_FEE = web3Config[which][this.network].MIN_FEE;
    //DEBT_TOKEN_DEPLOYER_ADDRESS = web3Config[which][this.network].DEBT_TOKEN_DEPLOYER_ADDRESS;

    const Active_Deployer_ABI = this.deployerAbis[which];

    this.tokenInstance = web3.eth.contract(dayTokenABI).at(TOKEN_CONTRACT_ADDRESS);
    this.deployerInstance = web3.eth.contract(Active_Deployer_ABI).at(DEPLOYER_ADDRESS);
    //this.deployerInstance = await Bb.fromCallback(callback => web3.eth.contract(deployerABI).at(DEPLOYER_ADDRESS
    //,callback) );
    this.faucetInstance = web3.eth.contract(dayFaucetABI).at(FAUCET_ADDRESS);
    //this.debtTokenDeployerInstance = web3.eth.contract(debtTokenDeployerABI).at(DEBT_TOKEN_DEPLOYER_ADDRESS);

  }


  async approveFee() {
    const result =  await Bb.fromCallback((callback) => {
      this.tokenInstance.approve(DEPLOYER_ADDRESS, MIN_FEE, callback);
    });
    return result;
  }
  async deploy(contractData) {
      let {web3,deployerInstance} = this;

      let transactionOptions = {
        gasPrice : (await this.fetchGasPrice()).plus(web3.toWei(2,'gwei')),
      }
      let hash;

      switch(this.activeApp){
        case 'chronos':
          hash = await Bb.fromCallback((callback)=>{
            deployerInstance.createCustomDayToken(
                contractData.tokenName,
                contractData.symbol,
                contractData.maxAddresses,
                contractData.startingId,
                contractData.totalMintingId,
                contractData.postDeploymentMaxIds,
                this.convertMiningPower(contractData.minMintingPower),
                this.convertMiningPower(contractData.maxMintingPower),
                contractData.halvingCycle,
                contractData.minimumBalance,
                contractData.mintingPeriod,
                contractData.teamLockPeriod,
                transactionOptions,
                callback
            )
        });
        break;
      case 'debt':
          hash = await Bb.fromCallback((callback)=>{
            deployerInstance.createDebtToken(
                contractData.tokenSymbol,
                contractData.initialAmount,
                contractData.exchangeRate,
                contractData.decimalUnits,
                contractData.dayLength,
                contractData.loanTerm,
                contractData.loanCycle,
                contractData.interestRate,
                contractData.debtOwner,
                transactionOptions,
                callback
            )
          });
          break;
      }

    return hash;
  }


  async requestFromFaucet(){
    const tokenBalance = (await Bb.fromCallback( callback => this.faucetInstance.getTokensBalance.call(callback) )).valueOf();
    const waitTime = (await Bb.fromCallback( callback => this.faucetInstance.waitTime.call(callback) )).valueOf();
    const lastRequest = (await Bb.fromCallback( callback => this.faucetInstance.lastRequest.call(this.accounts[0],callback) )).valueOf();
    const now = Math.floor(new Date().getTime()/1000);

    if(tokenBalance < MIN_FEE)
      return {status:-1}

    if( (now - lastRequest) < waitTime)
      return {status:0,data: waitTime - (now - lastRequest) }

    const faucetTxn = await Bb.fromCallback( callback => this.faucetInstance.useFaucet(callback) );
    return {status:1 ,data: faucetTxn };
  }

  convertMiningPower = (value,reverse) => {
    if(reverse)
      return (value/1e+18)*100;
    return (value/100)*1e+18;
  }

  async fetchGasPrice(){
    const result = await Bb.fromCallback( callback =>
      web3.eth.getGasPrice(callback)
    );
    return result;
  }

  async checkBalance() {
    const result = await Bb.fromCallback((callback) => {
      this.tokenInstance.balanceOf.call(this.accounts[0], callback);
    });
    return result.valueOf() >= MIN_FEE;
  }

  async checkAllowance() {
    const result = await Bb.fromCallback((callback) => {
      this.tokenInstance.allowance.call(this.accounts[0], DEPLOYER_ADDRESS, callback);
    });
    return result.valueOf() >= MIN_FEE;
  }

  async trackTransaction(hash){
    //let {deployerInstance,trackTransaction} = this;
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
    const{web3} = this;
    const block = await Bb.fromCallback( callback =>
      web3.eth.getBlockNumber(callback));
    return block;
  }

  async fetchNewChild(hash){
    const{web3} = this;
    const receipt = await this.fetchReceipt(hash);
    const
    let foundLog;
    if(!receipt.logs)
      return false;
    receipt.logs.forEach(function(l){
      if(l.address == DEPLOYER_ADDRESS)
        if(l.topics[0] ==  this.childTopics[this.activeApp].topic)
        foundLog = l.data;
    })
      if(!foundLog)
        return false;
       let result = ethers.Interface.decodeParams(this.childTopics[this.activeApp].params,foundLog);
       console.log('New Contract', result[1] )
       return result[1];
  }

  async getContractData(contract){
    console.log('Contract: ',contract)
    let data;
    switch(this.activeApp){
      case 'chronos':
        const childContract = web3.eth.contract(dayTokenABI).at(contract);
        data = {
          address: contract,
          tokenName: await Bb.fromCallback( callback => childContract.tokenName.call(callback) ),
          symbol: await Bb.fromCallback( callback => childContract.symbol.call(callback) ),
          totalSupply: await Bb.fromCallback( callback => childContract.totalSupply.call(callback) ),
          decimal: await Bb.fromCallback( callback => childContract.decimals.call(callback) ),
          mintingPeriod: await Bb.fromCallback( callback => childContract.mintingPeriod.call(callback) ),
          totalDays: await Bb.fromCallback( callback => childContract.getDayCount.call(callback) ),
          halvingCycle: await Bb.fromCallback( callback => childContract.halvingCycle.call(callback) ),
          dayTokenActivated: await Bb.fromCallback( callback => childContract.isDayTokenActivated.call(callback) ),
          maxAddresses: await Bb.fromCallback( callback => childContract.maxAddresses.call(callback) ),
          firstContributorId : await Bb.fromCallback( callback => childContract.firstContributorId.call(callback) ),
          firstPostIcoContributorId: await Bb.fromCallback( callback => childContract.firstPostIcoContributorId.call(callback) ),
          firstTeamContributorId: await Bb.fromCallback( callback => childContract.firstTeamContributorId.call(callback) ),
          minMintingPower: this.convertMiningPower(await Bb.fromCallback( callback => childContract.minMintingPower.call(callback) ), true ),
          maxMintingPower: this.convertMiningPower(await Bb.fromCallback( callback => childContract.maxMintingPower.call(callback) ), true),
          initialBlockTimestamp: this.convertMiningPower(await Bb.fromCallback( callback => childContract.initialBlockTimestamp.call(callback) ), true),
          teamLockPeriodInSec: await Bb.fromCallback( callback => childContract.teamLockPeriodInSec.call(callback) ),
          totalNormalContributorIds: await Bb.fromCallback( callback => childContract.totalNormalContributorIds.call(callback) ),
          totalNormalContributorIdsAllocated: await Bb.fromCallback( callback => childContract.totalNormalContributorIds.call(callback) ),
          totalTeamContributorIds: await Bb.fromCallback( callback => childContract.totalTeamContributorIds.call(callback) ),
          totalTeamContributorIdsAllocated: await Bb.fromCallback( callback => childContract.totalTeamContributorIdsAllocated.call(callback) ),
          totalPostIcoContributorIds: await Bb.fromCallback( callback => childContract.totalPostIcoContributorIds.call(callback) ),
          totalPostIcoContributorIdsAllocated : await Bb.fromCallback( callback => childContract.totalPostIcoContributorIdsAllocated .call(callback) ),
        }
        break;

    }
    console.log(data)
    return data;
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
