import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Redirect } from 'react-router-dom';

import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import './App.css';

import Content from './Content/Content';
import Navbar from './Navbar/Navbar';
import SignupPage from './Signup/SignupPage';
import LoginPage from './Login/LoginPage';
import Auth from './Auth/Auth';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar />
          {/* <Route path="/" exact 
          render = { () => {
            return (Auth.isUserAuthenticated() ? <Content/> : <Redirect to="/login"/> )
          }}/> */}

          <Route path="/" exact 
          render = { (props) => {
            return (Auth.isUserAuthenticated() ? <Content/> : <LoginPage {...props}/> )
          }}/>

          <Route path="/signup" component={SignupPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/logout" render={() => {
            Auth.deauthenticatedUser();
            return (<Redirect to="/login"/> )
            }}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
