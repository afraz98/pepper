// Login functionality adapted from https://saasitive.com/tutorial/react-token-based-authentication-django/

import React, { Component } from "react";
import { Button, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";
import { setAxiosAuthToken, setToken, getCurrentUser, unsetCurrentUser } from "./LoginAction";
import '../style/login.css'

class Login extends Component {
    constructor(props){
      super(props);
      this.state = {
        email: '',
        password: '',
      }
    }

    handleChange = (event) => {
      const { target } = event;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const { name } = target;

      this.setState({
        [name]: value,
      });
    }

    login = (userData, redirectTo) => dispatch => {
      axios.post("http://localhost:8000/api/token/login/", userData).then(response => {
          const { auth_token } = response.data;
          console.log(auth_token)
          setAxiosAuthToken(auth_token);
          dispatch(setToken(auth_token));
          dispatch(getCurrentUser(redirectTo));
        })
        .catch(error => {
          dispatch(unsetCurrentUser());
          console.log(error);
        });
    };

    onLoginClick = () => {
      const userData = {
        email: this.state.email, 
        password: this.state.password
      }
      console.log("Attempting login")
      this.login(userData, "/dashboard")
    }

    render() {
      const { email, password } = this.state;
        return (
          <main className="container">
            <div className="row">
              <div className="col-md-6 col-sm-10 mx-auto p-0">
                <div className="Login">
                    <h1>Login</h1>
                    <Form>
                        <FormGroup>
                            <Label for="email-entry">Email</Label>
                            <Input 
                            type="email" 
                            id="email-entry" 
                            name="email" 
                            placeholder="user@example.com"
                            value = { email }
                            onChange = { 
                              (e) => {
                                this.handleChange(e);
                              }
                            }
                            />

                          <FormFeedback> Invalid email. </FormFeedback>
                          <FormFeedback valid> Looks good! </FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password-entry">Password</Label>
                            <Input 
                            type="password" 
                            id="password-entry" 
                            name="password"
                            placeholder="***********"
                            value = { password } 
                            onChange={(e) => this.handleChange(e)}
                            />
                        </FormGroup>
                        <Button color="success" onClick={this.onLoginClick}> Login </Button>
                    </Form>
                </div>
              </div>
            </div>
          </main>
        );
      }
}

export default Login