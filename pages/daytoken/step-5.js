import React from 'react';

import Layout from '../../components/Layout';
import Step4 from '../../components/daytoken/Step5';

export default class Step4Page extends React.Component {
  static async getInitialProps(props) {
    return Layout.getInitialProps(props);
  }

  render() {
    return (
      <Layout {...Object.assign({},this.props,{activeApp:'daytoken'})}>
        <Step4 />
      </Layout>
    );
  }
}
