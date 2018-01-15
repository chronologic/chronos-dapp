import React from 'react';

import Layout from '../../components/Layout';
import Step1 from '../../components/Step1';

export default class Step1Page extends React.Component {
  static async getInitialProps(props) {
    return Layout.getInitialProps(props);
  }

  render() {
    return (
      <Layout {...this.props}>
        <Step1 />
      </Layout>
    );
  }
}
