import React, { Component } from 'react';
import Link from 'next/link';

export default class Header extends Component {
  render() {
    return (
      <footer className="footer">
        <div className="container">
          <p className="rights"> ChronoLogic. All rights reserved.</p>
          <Link href="/" as={ process.env.BACKEND_URL + '/'}>
            <a><div className="logo" /></a>
          </Link>
          <div className="socials">
            <a href="https://chronologic.network" className="social social_web" title="Website">
              <div />
            </a>
            <a href="https://blog.chronologic.network " className="social social_blog" title="Blog">
              <div />
            </a>
            <a href="https://chronologic.network/paper" className="social social_whitepaper" title="Whitepaper">
              <div />
            </a>
            <a href="https://github.com/chronologic/" className="social social_github" title="Github">
              <div />
            </a>
            <a href="https://blog.chronologic.network/chronos-platform/home" className="social social_help" title="Training and Support">
              <div />
            </a>
          </div>
        </div>
      </footer>
    );
  }
}
