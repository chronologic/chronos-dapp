const Ropsten = {
  TOKEN_CONTRACT_ADDRESS : '0x7941bc77E1d6BD4628467b6cD3650F20F745dB06',
  //DEPLOYER_ADDRESS : '0x0B482E31ff16143719414Afa1EF102C6B39178F4',
  DEPLOYER_ADDRESS : '0x9a1b1c65be10d27800b25b33865229afde8db3f8',
  MIN_FEE : '100000000000000000000',
  EXPLORER : 'https://ropsten.etherscan.io/'
}

const Mainnet = {
  TOKEN_CONTRACT_ADDRESS : '',
  DEPLOYER_ADDRESS : '',
  MIN_FEE : '100000000000000000000',
  EXPLORER : 'https://etherscan.io/'
}

export default {
  Ropsten: Ropsten,
  Mainnet:Mainnet,
  active: 'Ropsten'
}
