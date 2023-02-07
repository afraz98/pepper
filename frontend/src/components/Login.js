import React, { Component } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import '../style/login.css'

class Login extends Component {
    render() {
        return (
          <main className="container">
            <div className="row">
              <div className="col-md-6 col-sm-10 mx-auto p-0">
                <div className="Login">
                    <Form>
                        <FormGroup>
                            <Label for="username-entry">Username</Label>
                            <Input type="text" id="username-entry" name="username" placeholder="Username" />
                        </FormGroup>
                
                        <FormGroup>
                            <Label for="password-entry">Password</Label>
                            <Input type="password" id="password-entry" name="password" />
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