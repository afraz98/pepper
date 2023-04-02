import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Button, Form} from 'react-bootstrap';

import '../style/register.css';

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const { registerUser } = useContext(AuthContext);
  
  const handleSubmit = async e => {
    e.preventDefault();
    registerUser(username, password, password2);
  };

    return (
        <main className="container">
          <div className="row">
            <div className="col-md-6 col-sm-10 mx-auto p-0">
              <div className="register">
                <h1>Register</h1>
                <hr />
                  <Form onSubmit={handleSubmit}>
                      <Form.Group>
                          <Form.Label>Username</Form.Label>
                          <Form.Control 
                          type="text" 
                          id="username-entry" 
                          name="username" 
                          placeholder="user.name"
                          onChange={e => setUsername(e.target.value)}
                          />
                      </Form.Group>

                      <Form.Group>
                          <Form.Label>Password</Form.Label>
                          <Form.Control 
                          type="password" 
                          id="password-entry"
                          name="password"
                          placeholder="******" 
                          onChange={e => setPassword(e.target.value)}
                        />
                      </Form.Group>


                      <Form.Group>
                          <Form.Label>Repeat Password</Form.Label>
                          <Form.Control 
                          type="password" 
                          id="repeat-password-entry"
                          name="repeat-password"
                          placeholder="******" 
                          invalid = { password !== password2 }
                          onChange={e => setPassword2(e.target.value)}
                          />
                      </Form.Group>
                      <hr/>
                      <Button variant="danger" type="submit"> Register </Button>
                  </Form>
              </div>
            </div>
          </div>
        </main>
  );
}


export default Register;