import React, { Component } from 'react';
import Link from 'next/link';

export default class Header extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="container">
          <p className="rights">2017 ChronoLogic. All rights reserved.</p>
          <Link href="/">
            <a><div className="logo" /></a>
          </Link>
          <div className="socials">
            <a href="https://twitter.com/tbd" className="social social_twitter">
              <div />
            </a>
            <a href="https://tbd" className="social social_web">
              <div />
            </a>
            <a href="https://t.me/tbd" className="social social_telegram">
              <div />
            </a>
            <a href="https://github.com/tbd/" className="social social_github">
              <div />
            </a>
          </div>
        </div>
      </footer>
    );
  }
}
