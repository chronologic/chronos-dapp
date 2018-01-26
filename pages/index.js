import React from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';

import Selector from '../components/Selector';

export default class Index extends React.Component {
  /*static async getInitialProps(props) {
    return super.getInitialProps(props);
  }*/

  render() {
    return (
      <div>
        <Header {...this.props} />
          <Selector />
        <Footer />
      </div>
    );
  }
}
