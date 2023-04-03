// Login functionality adapted from https://saasitive.com/tutorial/react-token-based-authentication-django/

import React, { useContext } from "react";
import AuthContext from '../context/AuthContext';

import { Button, Form } from "react-bootstrap";
import "../style/login.css";

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
                  <Form.Control className="bg-dark text-white" type="text" id="username" placeholder="user.name" />
                  </Form.Group>

                  <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control className="bg-dark text-white" type="password" id="password" placeholder="********" />
                  </Form.Group>
                  
                  <hr/>
                  <div className="d-flex justify-content-center">
                    <Button className="mx-auto" variant="danger" type="submit">Login</Button>
                  </div>
                  <a href="/forgot-password" className="text-white"> Forgot password? </a>
                  <p> Need an account? <a href="/register" className="text-white">Register here</a></p>
                </Form>
              </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login