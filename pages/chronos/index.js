import React from 'react';

import Layout from '../../components/Layout';
import ChronosHome from '../../components/chronos/Home';

export default class CHome extends React.Component {
  static async getInitialProps(props) {
    return Layout.getInitialProps(props);
  }

  render() {
    return (
      <Layout {...Object.assign({},this.props,{activeApp:'chronos'})}>
        <ChronosHome />
      </Layout>
    );
  }
}
