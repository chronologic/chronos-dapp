import React from 'react';

import Layout from '../../components/Layout';
import Step3 from '../../components/debt/Step3';

export default class Step3Page extends React.Component {
  static async getInitialProps(props) {
    return Layout.getInitialProps(props);
  }

  render() {
    return (
      <Layout {...Object.assign({},this.props,{activeApp:'debt'})}>
        <Step3 />
      </Layout>
    );
  }
}
