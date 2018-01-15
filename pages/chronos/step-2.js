import React from 'react';

import Layout from '../../components/Layout';
import Step2 from '../../components/chronos/Step2';

export default class Step2Page extends React.Component {
  static async getInitialProps(props) {
    return Layout.getInitialProps(props);
  }

  render() {
    return (
      <Layout {...Object.assign({},this.props,{activeApp:'chronos'})}>
        <Step2 />
      </Layout>
    );
  }
}
