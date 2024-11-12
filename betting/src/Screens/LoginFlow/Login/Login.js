import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import * as Yup from "yup";
import { apiCallNew } from "../../../Network_Call/apiservices";
import ApiEndPoints from "../../../Network_Call/ApiEndPoints";
import toast from "react-hot-toast";
import { PulseLoader } from "react-spinners";
import { setToken, setUserData } from "../../../Helper/Storage";

const validationSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [load, setLoad] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const valid = {
        email: email,
        password: password,
      };
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      await validationSchema.validate(valid, {
        abortEarly: false,
      });
      setLoad(true);
      const response = await apiCallNew("post", formData, ApiEndPoints.Login);
      if (response.success === true) {
        console.log("response", response);
        toast.success(response.msg);
        setToken(response.result.api_token);
        setUserData(response?.result);
        setLoad(false);
        navigate("/");
        window.location.reload();
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
                      type="text"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="custom-input"
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
                      className="custom-input"
                    />
                    {errors.password && (
                      <div className="text-danger small">{errors.password}</div>
                    )}
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

export default Login;
