import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import "./verifyotp.css";
const VerifyOtp = () => {
  const [otp, setOtp] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("OTP:", otp);
  };

  return (
    <Container
      fluid
      className="otp-container d-flex justify-content-center align-items-center"
    >
      <Row className="w-100">
        <Col xs={12} md={6} lg={4} className="mx-auto">
          <Card className="otp-card shadow-lg p-4">
            <Card.Body>
              <h2 className="text-center mb-4">OTP Verification</h2>
              <p className="text-center mb-4">
                Enter the OTP sent to your email or phone.
              </p>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicOtp" className="mb-3">
                  <Form.Label>OTP</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="otp-input"
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 otp-button"
                >
                  Verify OTP
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default VerifyOtp;
