import React from 'react';

import Layout from '../../components/Layout';
import Step3 from '../../components/chronos/Step3';

export default class Step3Page extends React.Component {
  static async getInitialProps(props) {
    return Layout.getInitialProps(props);
  }

  render() {
    return (
      <Layout {...this.props}>
        <Step3 />
      </Layout>
    );
  }
}
