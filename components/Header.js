import React, { Component } from 'react';
import Link from 'next/link';

export default class Header extends Component {
  render() {
    let { activeApp } = this.props;
    activeApp = (typeof activeApp === 'undefined' || !activeApp)?'':activeApp;
    return (
      <header className="header">
        <div className="container">
          <Link href={"/"+activeApp} as={ process.env.BACKEND_URL + '/'+activeApp } >
            <a className="logo"><div /></a>
          </Link>
        </div>
      </header>
    );
  }
}
