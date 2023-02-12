import { useState, useContext } from "react";
import { Button, Form, FormGroup, FormFeedback, Input, Label } from "reactstrap";
import AuthContext from "../context/AuthContext";
import '../style/register.css'

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
                      <FormGroup>
                          <Label for="username-entry">Username</Label>
                          <Input 
                          type="text" 
                          id="username-entry" 
                          name="username" 
                          placeholder="user.name"
                          onChange={e => setUsername(e.target.value)}
                          />
                      </FormGroup>

                      <FormGroup>
                          <Label for="password-entry">Password</Label>
                          <Input 
                          type="password" 
                          id="password-entry"
                          name="password"
                          placeholder="******" 
                          onChange={e => setPassword(e.target.value)}
                        />
                      </FormGroup>


                      <FormGroup>
                          <Label for="repeat-password-entry">Repeat Password</Label>
                          <Input 
                          type="password" 
                          id="repeat-password-entry"
                          name="repeat-password"
                          placeholder="******" 
                          invalid = { password !== password2 }
                          onChange={e => setPassword2(e.target.value)}
                          />
                        <FormFeedback> Passwords do not match. </FormFeedback>
                      </FormGroup>

                      <Button color="success"> Register </Button>
                  </Form>
              </div>
            </div>
          </div>
        </main>
  );
}


export default Register