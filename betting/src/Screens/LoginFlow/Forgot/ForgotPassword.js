import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import "./forgot.css";
import { apiCallNew } from "../../../Network_Call/apiservices";
import ApiEndPoints from "../../../Network_Call/ApiEndPoints";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { FaArrowLeft } from "react-icons/fa";

const validationSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
});

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [load, setLoad] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const valid = {
        email: email,
      };
      const formData = new FormData();
      formData.append("email", email);
      await validationSchema.validate(valid, {
        abortEarly: false,
      });
      setLoad(true);
      const response = await apiCallNew(
        "post",
        formData,
        ApiEndPoints.ForgotPassword
      );
      if (response.success === true) {
        console.log("response", response);
        toast.success(response.msg);
        setLoad(false);
        navigate("/verify-otp", { state: { email: email } });
      } else {
        setLoad(false);
        toast.error(response.msg);
      }
    } catch (error) {
      const newErrors = {};
      error?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
      setLoad(false);
    }
  };

  return (
    <>
      {load && (
        <div>
          <PulseLoader loading={load} color="#155239" style={styles.backdrop} />
        </div>
      )}
      <Container
        fluid
        className="forgot-password-container d-flex justify-content-center align-items-center"
      >
        <Row className="w-100">
          <Col xs={12} md={6} lg={4} className="mx-auto">
            <Card className="forgot-password-card shadow-lg p-4 ">
              <FaArrowLeft
                onClick={() => navigate(-1)}
                size={20}
                style={{ cursor: "pointer", marginTop: "-10px" }}
              />
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
                    {errors.email && (
                      <div className="text-danger small">{errors.email}</div>
                    )}
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
    </>
  );
};

const styles = {
  backdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#155239",
  },
};

export default ForgotPassword;
