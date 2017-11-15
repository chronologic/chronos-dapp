import React from 'react';
import { Provider } from 'mobx-react';

import { noMetaMaskAlert } from '../lib/alerts';
import { initStore } from '../store';
import Web3Service from '../Web3Service';
import Header from './Header';
import Footer from './Footer';

class Layout extends React.Component {
  static async getInitialProps({ query, req }) {
    const isServer = !!req;
    const store = initStore(isServer, query);
    return { store, isServer };
  }

  constructor(props) {
    super(props);
    this.store = initStore(props.isServer, props.store);
    this.web3Service = new Web3Service(props.store, props.web3Service);
  }

  async componentDidMount() {
    const { web3Service } = this;
    await web3Service.connect();
    if (web3Service.connectedToMetaMask) {
      // noMetaMaskAlert();
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
