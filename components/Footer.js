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
            <a href="https://chronologic.network" className="social social_web">
              <div />
            </a>
            <a href="https://blog.chronologic.network " className="social social_blog">
              <div />
            </a>
            <a href="https://chronologic.network/paper" className="social social_whitepaper">
              <div />
            </a>
            <a href="https://github.com/chronologic/" className="social social_github">
              <div />
            </a>
          </div>
        </div>
      </footer>
    );
  }
}
