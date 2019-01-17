import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';

import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import './App.css';

import Content from './Content/Content';

class App extends Component {
  render() {
    return (
        <div className="App">
        <Content/>
        </div>
    );
  }
}

export default App;
