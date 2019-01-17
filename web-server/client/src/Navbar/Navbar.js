import React, { Component } from 'react';
import Auth from '../Auth/Auth';
import { Link } from 'react-router-dom';
import './Navbar.css';

class Base extends Component {
    render() {
        return (
            <div>
                <nav className="nav-bar indigo lighten-1">
                    <div className="nav-wrapper">
                        <Link to="/" className="brand-logo">&nbsp;Tap News</Link>
                        <ul id="nav-mobile" className="right">
                            {Auth.isUserAuthenticated() ?
                                (<div>
                                    <li>{Auth.getEmail()}</li>
                                    <li><Link to="/logout">Log out</Link></li>
                                </div>)
                                :
                                (<div>
                                    <li><Link to="/login">Log in</Link></li>
                                    <li><Link to="/signup">Sign up</Link></li>
                                </div>)
                            }
                        </ul>
                    </div>
                </nav>
                <br />
            </div>
        );
    }
}

export default Base;