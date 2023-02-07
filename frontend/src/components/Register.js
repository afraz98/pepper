import React, { Component } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import '../style/register.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
          modal: false,
          activeItem: {
            title: "",
            description: "",
            completed: false,
            assignee: "",
            priority: "",
            reporter: "",
            date: "",
          }
        };
    }

    render() {
        return (
          <main className="container">
            <div className="row">
              <div className="col-md-6 col-sm-10 mx-auto p-0">
                <div className="Register">
                    <Form>
                        <FormGroup>
                            <Label for="username-entry">Username</Label>
                            <Input type="text" id="username-entry" name="username" placeholder="Username" />
                        </FormGroup>

                        <FormGroup>
                            <Label for="email-entry">Email</Label>
                            <Input type="text" id="email-entry" name="email" placeholder="user@example.com" />
                        </FormGroup>

                        <FormGroup>
                            <Label for="password-entry">Password</Label>
                            <Input type="password" id="password-entry" name="password" />
                        </FormGroup>

                        <Button color="success"> Register </Button>
                    </Form>
                </div>
              </div>
            </div>
          </main>
        );
      }
}

export default Login