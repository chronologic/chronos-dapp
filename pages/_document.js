import React from 'react';
import Document, { Main, NextScript } from 'next/document';
import stylesheet from 'styles/index.scss';
import Prefix from 'utils/prefixHelper';
import htmlescape from 'htmlescape';

class PrefixedNextScript extends NextScript {
  render() {
    const { __NEXT_DATA__ } = this.context._documentProps;
    const { prefix } = this.props;

    const env = process.env.NODE_ENV;

    // script element contain development js
    let scriptElements = (
      <div>
        <script type="text/javascript" src={`${prefix}/_next/-/manifest.js`} />
        <script type="text/javascript" src={`${prefix}/_next/-/commons.js`} />
        <script type="text/javascript" src={`${prefix}/_next/-/main.js`} />
      </div>
    );

    if (env === 'production') {
      const { buildStats } = __NEXT_DATA__;
      const app = 'app.js';

      // script element contain production js
      scriptElements =
        <script
          type="text/javascript"
          src={`${prefix}/_next/${buildStats[app].hash}/${app}`}
        />
    }

    return (
      <div>
        <script
          dangerouslySetInnerHTML={
            { __html: `__NEXT_DATA__ = ${htmlescape(__NEXT_DATA__)}; module={};` }
          }
        />
        {scriptElements}
      </div>
    );
  }
}

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const {
      html, head, errorHtml, chunks,
    } = renderPage();
    return {
      html, head, errorHtml, chunks,
    };
  }

  render() {
    console.log('config',Prefix)
    return (
      <html lang="en">
        <body>
          <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
          {this.props.customValue}
          <Main />
          <PrefixedNextScript prefix={Prefix} />
        </body>
      </html>
    );
  }
}
