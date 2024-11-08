import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import "./forgot.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle forgot password logic here (e.g., sending reset email)
    console.log("Email:", email);
  };

  return (
    <Container
      fluid
      className="forgot-password-container d-flex justify-content-center align-items-center"
    >
      <Row className="w-100">
        <Col xs={12} md={6} lg={4} className="mx-auto">
          <Card className="forgot-password-card shadow-lg p-4 ">
            <Card.Body>
              <h2 className="text-center mb-4">Forgot Password?</h2>
              <p className="text-center mb-4">
                Enter your email to receive a password reset link.
              </p>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail" className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="forgot-password-input"
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 forgot-password-button"
                >
                  Send
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPassword;
