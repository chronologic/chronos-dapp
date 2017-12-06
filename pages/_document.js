import React from 'react';
import Document, { Main, NextScript } from 'next/document';
import stylesheet from 'styles/index.scss';

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
    return (
      <html lang="en">
        <body>
          <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
          {this.props.customValue}
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
