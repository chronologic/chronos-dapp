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

const Rinkeby = {
  TOKEN_CONTRACT_ADDRESS : '0x01631b703eaaaa402ca5d7fcb6ec71b507f27e9e',
  DEPLOYER_ADDRESS : '0xcda5c14db8d56a373f630294a55587a0670a6f9a',
  MIN_FEE : '100000000000000000000',
  EXPLORER : 'https://rinkeby.etherscan.io/'
}

const Private = {
  TOKEN_CONTRACT_ADDRESS : '',
  DEPLOYER_ADDRESS : '',
  MIN_FEE : '',
  EXPLORER : ''
}

export default {
  Ropsten: Ropsten,
  Mainnet:Mainnet,
  Rinkeby:Rinkeby
}
