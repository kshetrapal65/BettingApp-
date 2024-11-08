import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <Container
      fluid
      className="login-container d-flex justify-content-center align-items-center"
    >
      <Row className="w-100">
        <Col xs={12} md={6} lg={4} className="mx-auto">
          <Card className="login-card shadow-lg p-4">
            <Card.Body>
              <h2 className="text-center mb-4">Welcome Back</h2>
              <p className="text-center mb-4">Please login to your account</p>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail" className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="custom-input"
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="custom-input"
                  />
                </Form.Group>
                <div className="text-end mt-3 mb-2">
                  <Link to="/forgot-password">
                    <a href="#" className="small forgot-text">
                      Forgot your password?
                    </a>
                  </Link>
                </div>
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 custom-button"
                >
                  Login
                </Button>
              </Form>

              <div className="text-center mt-4">
                <Link to="/register">
                  <a className="small">Don't have an account? Sign up</a>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
