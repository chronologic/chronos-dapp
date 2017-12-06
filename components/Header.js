import React, { Component } from 'react';
import Link from 'next/link';

export default class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="container">
          <Link href="/" as={ process.env.BACKEND_URL + '/'}>
            <a className="logo"><div /></a>
          </Link>
        </div>
      </header>
    );
  }
}
