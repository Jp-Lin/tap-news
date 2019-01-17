import React, { Component } from 'react';
import logo from '../logo.png';
import './Content.css';

import NewsPanel from '../NewsPanel/NewsPanel';
class Content extends Component {
  render() {
    return (
        <div className="Content">
          <header className="Content-header">
            <img src={logo} className="Content-logo" alt="content-logo" />
          </header>
          <div className="container">
            <NewsPanel />
          </div>
        </div>
    );
  }
}

export default Content;
