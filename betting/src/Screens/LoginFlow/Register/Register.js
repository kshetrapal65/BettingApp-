import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import ApiEndPoints from "../../../Network_Call/ApiEndPoints";
import { apiCallNew } from "../../../Network_Call/apiservices";
import toast from "react-hot-toast";
import { PulseLoader } from "react-spinners";
import { setToken, setUserData } from "../../../Helper/Storage";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [load, setLoad] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const valid = {
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      };
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      await validationSchema.validate(valid, {
        abortEarly: false,
      });
      setLoad(true);
      const response = await apiCallNew(
        "post",
        formData,
        ApiEndPoints.Register
      );
      if (response.success === true) {
        toast.success(response.msg);
        setToken(response.result.api_token);
        setUserData(response?.result);
        setLoad(false);
        navigate("/");
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
                    {errors.name && (
                      <div className="text-danger small">{errors.name}</div>
                    )}
                  </Form.Group>

                  <Form.Group controlId="formBasicEmail" className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="signup-input"
                    />
                    {errors.email && (
                      <div className="text-danger small">{errors.email}</div>
                    )}
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
                    {errors.password && (
                      <div className="text-danger small">{errors.password}</div>
                    )}
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword" className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter confirmed password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="signup-input"
                    />
                    {errors.confirmPassword && (
                      <div className="text-danger small">
                        {errors.confirmPassword}
                      </div>
                    )}
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

export default Register;
