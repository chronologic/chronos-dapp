import { observable } from 'mobx';

let store = null;

class Store {
  @observable activeApp = '';

  @observable tokenName = '';
  @observable symbol = '';

  @observable minMintingPower = '';
  @observable maxMintingPower = '';
  @observable halvingCycle = '';
  @observable mintingPeriod = '';

  @observable maxAddresses = '';
  @observable startingId = '';
  @observable totalMintingId = '';
  @observable teamLockPeriod = '';
  @observable postDeploymentMaxIds = '';
  @observable minimumBalance = '';

  @observable receiverAddress = '';
  @observable tokens = '';
  @observable weiAmount = '';
  @observable timemintId = '';
  @observable teamMember = false;
  @observable isTest = false;

  constructor(source) {
    Object.assign(this, source);
  }
}

export function initStore(isServer, source) {
  if (isServer) {
    return new Store(source);
  } else {
    if (store === null) {
      store = new Store(source);
    }
    return store;
  }
}

export default initStore;
