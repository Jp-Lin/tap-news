import React, { Component } from 'react';
import logo from '../logo.png';
import './App.css';

import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import NewsPanel from '../NewsPanel/NewsPanel';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className="container">
             <NewsPanel />
        </div>
      </div>
    );
  }
}

export default App;
