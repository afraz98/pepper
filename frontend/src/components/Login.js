// Login functionality adapted from https://saasitive.com/tutorial/react-token-based-authentication-django/

import React, { useContext } from "react";
import { Button, Form, Input, Label } from "reactstrap";
import AuthContext from '../context/AuthContext';
import '../style/login.css';

const Login = () => {
  const { loginUser } = useContext(AuthContext);
  
  const handleSubmit = e => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    username.length > 0 && loginUser(username, password);
  };

  return (
    <main className="container">
      <div className="row">
        <div className="col-md-6 col-sm-10 mx-auto p-0">
          <div className="Login">
              <section>
                <Form onSubmit={handleSubmit}>
                  <h1>Login </h1>
                  <hr />
                  <Label for="username">Username</Label>
                  <Input type="text" id="username" placeholder="user@example.com" />
                  <Label for="password">Password</Label>
                  <Input type="password" id="password" placeholder="Enter Password" />
                  <Button type="submit">Login</Button>
                </Form>
              </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login