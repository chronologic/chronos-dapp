import React from 'react';

import Layout from '../../components/Layout';
import Step4 from '../../components/chronos/Step4';

export default class Step4Page extends React.Component {
  static async getInitialProps(props) {
    return Layout.getInitialProps(props);
  }

  render() {
    return (
      <Layout {...Object.assign({},this.props,{activeApp:'chronos'})}>
        <Step4 />
      </Layout>
    );
  }
}
