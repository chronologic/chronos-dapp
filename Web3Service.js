import Bb from 'bluebird';
import { action, observable, runInAction } from 'mobx';

import dayTokenABI from './abi/dayTokenABI';

const TOKEN_CONTRACT_ADDRESS = '0x7941bc77E1d6BD4628467b6cD3650F20F745dB06';
const DEPLOYER_ADDRESS = '0x0B482E31ff16143719414Afa1EF102C6B39178F4';
const MIN_FEE = '100000000000000000000';

let instance = null;

export default class Web3Service {
  initialized = false;
  web3 = null;
  tokenInstance = null;
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
        web3 = new window.Web3(window.web3.currentProvider);
        this.connectedToMetaMask = true;
      } else {
        web3 = new window.Web3(new window.Web3.providers.HttpProvider('http://localhost:8545'));
        this.connectedToMetaMask = false;
      }
      window.web3 = web3;
      this.web3 = web3;
    }
    this.accounts = web3.eth.accounts;
    console.log('accounts', this.accounts);
    const netId =
      await Bb.fromCallback(callback => web3.version.getNetwork(callback));
    runInAction(() => {
      this.netId = netId;
    });
    console.log('netId', this.netId);
    this.tokenInstance = web3.eth.contract(dayTokenABI).at(TOKEN_CONTRACT_ADDRESS);
  }

  @action
  async checkAllowance() {
    const result = await Bb.fromCallback((callback) => {
      this.tokenInstance.allowance.call(this.accounts[0], DEPLOYER_ADDRESS, callback);
    });
    return result.valueOf() >= MIN_FEE;
  }

  @action
  approveFee() {
    return Bb.fromCallback((callback) => {
      this.tokenInstance.approve(DEPLOYER_ADDRESS, MIN_FEE, callback);
    });
  }
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
