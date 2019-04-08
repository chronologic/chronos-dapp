import React from 'react';

import Layout from '../../components/Layout';
import DayTokenHome from '../../components/daytoken/Home';

export default class CHome extends React.Component {
  static async getInitialProps(props) {
    return Layout.getInitialProps(props);
  }

  render() {
    return (
      <Layout {...Object.assign({},this.props,{activeApp:'daytoken'})}>
        <DayTokenHome />
      </Layout>
    );
  }
}
