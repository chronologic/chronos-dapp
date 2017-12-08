import React from 'react';

import Layout from '../components/Layout';
import Home from '../components/Home';

export default class Index extends React.Component {
  static async getInitialProps(props) {
    return Layout.getInitialProps(props);
  }

  render() {
    return (
      <Layout {...this.props}>
        <Home />
      </Layout>
    );
  }
}
