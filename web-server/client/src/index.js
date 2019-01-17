import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import * as serviceWorker from './serviceWorker';
import SignupPage from './Signup/SignupPage';
import LoginPage from './Login/LoginPage';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
ReactDOM.render(
    <BrowserRouter>
        <div>
            <Route path="/" exact component={App} />
            <Route path="/signup" component={SignupPage} />
            <Route path="/login" component={LoginPage} />
        </div>
    </BrowserRouter>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
