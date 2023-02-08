import React, { Component } from "react";
import { Button, Form, FormGroup, FormFeedback, Input, Label } from "reactstrap";
import axios from "axios";
import '../style/register.css';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
          username: '',
          email: '',
          password: '',
          validate: {
            emailState: '',
          },
        };
    }

    handleChange = (event) => {
      const { target } = event;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const { name } = target;

      this.setState({
        [name]: value,
      });
    }

    signUp(userData){
      axios.post("http://localhost:8000/api/users/", userData).catch(error => {
        if(error.response){
          console.log(JSON.stringify(error.response.data));
        } else if(error.message){
          console.log(JSON.stringify(error.message))
        } else {
          console.log(JSON.stringify(error))
        }
      });
    }

    onRegisterClick = () => {
      const userData = {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
      };

      this.signUp(userData);
    }

    validateEmail(email) {
      const email_regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const { validate } = this.state;

      if (email_regex.test(email.target.value)) {
        validate.emailState = 'has-success';
      } else {
        validate.emailState = 'has-danger';
      }
    
      this.setState({ validate });
    }

    render() {
      const { username, email, password } = this.state;
        return (
          <main className="container">
            <div className="row">
              <div className="col-md-6 col-sm-10 mx-auto p-0">
                <div className="Register">
                  <h1>Register</h1>
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
                            <Label for="email-entry">Email</Label>
                            <Input 
                            type="email" 
                            id="email-entry" 
                            name="email" 
                            placeholder="user@example.com"
                            valid = { this.state.validate.emailState === 'has-success' }
                            invalid = { this.state.validate.emailState === 'has-danger' }
                            value = { email }
                            onChange = { 
                              (e) => {
                                this.validateEmail(e);
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
                            placeholder="******" 
                            value = { password } 
                            onChange={(e) => this.handleChange(e)}
                          />
                        </FormGroup>

                        <Button color="success" onClick={this.onRegisterClick}> Register </Button>
                    </Form>
                </div>
              </div>
            </div>
          </main>
        );
      }
}

export default Register