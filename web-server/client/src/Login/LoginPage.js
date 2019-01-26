import React, { Component } from 'react';
import Auth from '../Auth/Auth';
import LoginForm from './LoginForm';
import './LoginPage.css';

const SERVER_URL = 'http://192.168.86.225:3000/';
// const SERVER_URL = 'http://localhost:3000/';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            user: {
                email: '',
                password: ''
            }
        };

        this.processForm = this.processForm.bind(this);
        this.changeUser = this.changeUser.bind(this);
    }

    processForm(event) {
        event.preventDefault();
        const email = this.state.user.email;
        const password = this.state.user.password;
        fetch(SERVER_URL + 'auth/login', {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then(response => {
            if (response.status === 200) {
                this.setState({
                    errors: {}
                });
                response.json().then(response => {
                    // console.log(response);
                    Auth.authenticateUser(response.token, email);
                    this.props.history.replace('/');
                })
            } else {
                console.log('Login failed');
                response.json().then(response => {
                    const errors = response.errors ? response.errors : {};
                    errors.summary = response.messge;
                    this.setState({ errors });
                })
            }
        });
    }

    changeUser(event) {
        const field = event.target.name;
        const user = this.state.user;

        user[field] = event.target.value;
        this.setState({ user });
    }

    render() {
        return (
            <LoginForm
                onSubmit={this.processForm}
                onChange={this.changeUser}
                errors={this.state.errors}
                user={this.state.user}
            />
        )
    }
}

export default LoginPage;