import React from 'react';

import Layout from '../components/Layout';
import ChronosHome from '../components/ChronosHome';

export default class CHome extends React.Component {
  static async getInitialProps(props) {
    return Layout.getInitialProps(props);
  }

  render() {
    return (
      <Layout {...this.props}>
        <ChronosHome />
      </Layout>
    );
  }
}
