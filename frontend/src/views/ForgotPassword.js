import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import "../style/forgot_password.css"

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement password recovery routine.
    // (1) Send an email to the email associated with the user
    // (2) Have the user click this link
    // (3) Update user password, store in user data
    setShowAlert(true);
  }

  return (
    <main className="container">
      <div className="row">
        <div className="col-md-6 col-sm-10 mx-auto p-0">
          <div className="forgot-password">
              <section>
                <Container className="mt-5">
                <h1>Forgot Password</h1>
                {
                    showAlert && <Alert variant="success" onClose={() => setShowAlert(false)} dismissible> Password reset email sent to {email}.</Alert>
                }
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" className="bg-dark text-white" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Form.Text className="text-muted">
                        We'll send you a password reset link to this email.
                    </Form.Text>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                    Send Password Reset Email
                    </Button>
                </Form>
                </Container>
              </section>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ForgotPassword;
