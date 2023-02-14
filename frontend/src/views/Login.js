// Login functionality adapted from https://saasitive.com/tutorial/react-token-based-authentication-django/

import React, { useContext } from "react";
import AuthContext from '../context/AuthContext';
import "../style/login.css";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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
          <div className="login">
              <section>
                <Form onSubmit={handleSubmit}>
                  <h1>Login </h1>
                  <hr />
                  <Form.Group>
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" id="username" placeholder="user.name" />
                  </Form.Group>

                  <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" id="password" placeholder="********" />
                  </Form.Group>
                  
                  <hr/>
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