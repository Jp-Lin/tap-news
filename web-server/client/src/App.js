import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';

import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import './App.css';

import Content from './Content/Content';
import Navbar from './Navbar/Navbar';
import SignupPage from './Signup/SignupPage';
import LoginPage from './Login/LoginPage';
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar />
          <Route path="/" exact component={Content} />
          <Route path="/signup" component={SignupPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/logout" component={LoginPage} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
