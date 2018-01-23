const Private = {
  TOKEN_CONTRACT_ADDRESS : '',
  DEPLOYER_ADDRESS : '',
  FAUCET_ADDRESS: "",
  MIN_FEE : '',
  EXPLORER : ''
}
const Ropsten_TOKEN_CONTRACT_ADDRESS = '0x7941bc77E1d6BD4628467b6cD3650F20F745dB06';
const Ropsten_FAUCET_ADDRESS = '0xfc5c1dc438411dce1cee4971fa333ecd3c3fa7d3';

const Chronos= {
   Ropsten : {
    TOKEN_CONTRACT_ADDRESS : Ropsten_TOKEN_CONTRACT_ADDRESS,
    DEPLOYER_ADDRESS : '0x0B482E31ff16143719414Afa1EF102C6B39178F4',
    //DEPLOYER_ADDRESS : '0x9a1b1c65be10d27800b25b33865229afde8db3f8',
    FAUCET_ADDRESS: Ropsten_FAUCET_ADDRESS,
    MIN_FEE : '100000000000000000000',
    EXPLORER : 'https://ropsten.etherscan.io/'
  },
  Mainnet : {
    TOKEN_CONTRACT_ADDRESS : '',
    DEPLOYER_ADDRESS : '',
    MIN_FEE : '100000000000000000000',
    EXPLORER : 'https://etherscan.io/'
  },
  Rinkeby : {
    TOKEN_CONTRACT_ADDRESS : '',
    DEPLOYER_ADDRESS : '',
    FAUCET_ADDRESS: "",
    MIN_FEE : '100000000000000000000',
    EXPLORER : 'https://rinkeby.etherscan.io/'
  },
  Private: Private
}

const Debt= {
   Ropsten : {
    TOKEN_CONTRACT_ADDRESS : Ropsten_TOKEN_CONTRACT_ADDRESS,
    DEPLOYER_ADDRESS : '0x9d396156594b6a665fe28397e7bff3679dc24283',
    FAUCET_ADDRESS: Ropsten_FAUCET_ADDRESS,
    MIN_FEE : '100000000000000000000',
    EXPLORER : 'https://ropsten.etherscan.io/'
  },
  Mainnet : {
    TOKEN_CONTRACT_ADDRESS : '',
    DEPLOYER_ADDRESS : '',
    MIN_FEE : '100000000000000000000',
    EXPLORER : 'https://etherscan.io/'
  },
  Rinkeby : {
    TOKEN_CONTRACT_ADDRESS : '',
    DEPLOYER_ADDRESS : '',
    FAUCET_ADDRESS: "",
    MIN_FEE : '100000000000000000000',
    EXPLORER : 'https://rinkeby.etherscan.io/'
  },
  Private: Private
}



export default {
  chronos: Chronos,
  debt:Debt,
}
