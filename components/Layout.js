import React from 'react';
import { Provider } from 'mobx-react';

import { showNoMetaMaskAlert, showNoMetaMaskAccountsAlert, showNetworkInfo } from '../lib/alerts';
import { initStore } from '../store';
import { initWeb3Service } from '../Web3Service';
import Header from './Header';
import Footer from './Footer';

class Layout extends React.Component {
  static async getInitialProps({ query, req }) {
    const isServer = !!req;
    const store = initStore(isServer, query);
    return { store };
  }

  constructor(props) {
    super(props);
    this.store = initStore(false, props.store);
    this.web3Service = initWeb3Service(false, props.web3Service);
  }

  async componentDidMount() {
    const { web3Service,store } = this;
    if (await web3Service.init(store.activeApp)) {
      if (!web3Service.connectedToMetaMask) {
        showNoMetaMaskAlert();
      }
      else if (web3Service.connectedToMetaMask && typeof web3Service.accounts == 'object' && web3Service.accounts.length<1) {
          showNoMetaMaskAccountsAlert();
        }
         else {
        showNetworkInfo(web3Service.netId);
      }
    }
  }

  render() {
    return (
      <Provider store={this.store} web3Service={this.web3Service}>
        <div>
          <Header />
          {this.props.children}
          <Footer />
        </div>
      </Provider>
    );
  }
}

export default Layout;
