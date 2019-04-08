import React from 'react';

import Layout from '../../components/Layout';
import Step1 from '../../components/daytoken/Step1';

export default class Step1Page extends React.Component {
  static async getInitialProps(props) {
    return Layout.getInitialProps(props);
  }

  render() {
    return (
      <Layout {...Object.assign({},this.props,{activeApp:'daytoken'})}>
        <Step1 />
      </Layout>
    );
  }
}
