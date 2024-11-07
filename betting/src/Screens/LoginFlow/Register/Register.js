// import React from "react";

// const Register = () => {
//   return <div>Register</div>;
// };

// export default Register;
import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
// import "./signup.css";
import axios from "axios";
import "./Register.css";
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: name,
        email: email,
        password: password,
      };
      const response = await axios.post(
        "http://173.212.250.62/betting/ap-admin/public/api/register",
        payload
      );
      if (response.status === 200) {
        console.log("response", response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container
      fluid
      className="signup-container p-4    d-flex justify-content-center align-items-center"
    >
      <Row className="w-100">
        <Col xs={12} md={6} lg={4} className="mx-auto">
          <Card className="signup-card shadow-lg p-4">
            <Card.Body>
              <h2 className="text-center mb-4">Create Your Account</h2>
              <p className="text-center mb-4">Sign up to get started!</p>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicName" className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="signup-input"
                  />
                </Form.Group>

                <Form.Group controlId="formBasicEmail" className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="signup-input"
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="signup-input"
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 signup-custom-button"
                >
                  Sign Up
                </Button>
              </Form>

              <div className="text-center mt-4">
                <Link to="/login">
                  {" "}
                  <a className="small">Already have an account? Login</a>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
