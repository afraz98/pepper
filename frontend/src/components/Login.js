import React, { Component } from "react";
import { Button, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import '../style/login.css'

class Login extends Component {
    constructor(props){
      super(props);
      this.state = {
        email: '',
        password: '',
        validate: {
          emailState: '',
        },
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
                            placeholder="***********"
                            value = { password } 
                            onChange={(e) => this.handleChange(e)}
                            />
                        </FormGroup>
                        <Button color="success"> Login </Button>
                    </Form>
                </div>
              </div>
            </div>
          </main>
        );
      }
}

export default Login