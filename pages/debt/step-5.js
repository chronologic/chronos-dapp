import React from 'react';

import Layout from '../../components/Layout';
import Step5 from '../../components/debt/Step5';

export default class Step5Page extends React.Component {
    static async getInitialProps(props) {
        return Layout.getInitialProps(props);
    }

    render() {
        return (
            <Layout {...Object.assign({},this.props,{activeApp:'debt'})}>
                <Step5 />
            </Layout>
        );
    }
}
