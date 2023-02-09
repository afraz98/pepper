// Login functionality adapted from https://saasitive.com/tutorial/react-token-based-authentication-django/

import React, { Component } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import axios from "axios";
import '../style/login.css'

class Login extends Component {
    constructor(props){
      super(props);
      this.state = {
        username: '',
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


    setAxiosAuthToken = (token) => {
      if (typeof token !== "undefined" && token) {
        // Apply for every request
        axios.defaults.headers.common["Authorization"] = "Token " + token;
      } else {
        // Delete auth header
        delete axios.defaults.headers.common["Authorization"];
      }
    };


    onLoginClick = () => {
      const userData = {
        username: this.state.username, 
        password: this.state.password
      }
      
      axios.post("http://localhost:8000/api/token/login/", userData).then(response => {
        const { auth_token } = response.data;
        console.log(auth_token)
        this.setAxiosAuthToken(auth_token)
      })
      .catch(error => {
        console.log(error);
      });
    }

    render() {
      const { username, password } = this.state;
        return (
          <main className="container">
            <div className="row">
              <div className="col-md-6 col-sm-10 mx-auto p-0">
                <div className="Login">
                    <h1>Login</h1>
                    <Form>
                        <FormGroup>
                        <Label for="username-entry">Username</Label>
                            <Input 
                            type="text" 
                            id="username-entry" 
                            name="username" 
                            placeholder="Username"
                            value = { username } 
                            onChange={(e) => this.handleChange(e)} 
                            />

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