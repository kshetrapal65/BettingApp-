import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import "./reset.css"; // Optional for custom styling
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { apiCallNew } from "../../../Network_Call/apiservices";
import ApiEndPoints from "../../../Network_Call/ApiEndPoints";
import toast from "react-hot-toast";
import { PulseLoader } from "react-spinners";
import { FaArrowLeft } from "react-icons/fa";

const validationSchema = Yup.object({
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const ResetPassword = () => {
  const location = useLocation();
  const data = location.state;
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();

  console.log("erorooror", errors);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const valid = {
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      };
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("reset_otp", data.otp);
      formData.append("password", newPassword);
      await validationSchema.validate(valid, {
        abortEarly: false,
      });
      setLoad(true);
      const response = await apiCallNew(
        "post",
        formData,
        ApiEndPoints.ResetPassword
      );
      if (response.success === true) {
        console.log("response", response);
        toast.success(response.msg);
        setLoad(false);
        navigate("/login");
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
        className="reset-password-container d-flex justify-content-center align-items-center"
      >
        <Row className="w-100">
          <Col xs={12} md={6} lg={4} className="mx-auto">
            <Card className="reset-password-card shadow-lg p-4">
              <FaArrowLeft
                onClick={() => navigate(-1)}
                size={20}
                style={{ cursor: "pointer", marginTop: "-10px" }}
              />
              <Card.Body>
                <h2 className="text-center mb-4">Reset Password</h2>
                <p className="text-center mb-4">Set your new password below.</p>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formBasicNewPassword" className="mb-3">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="reset-password-input"
                    />
                    {errors.newPassword && (
                      <div className="text-danger small">
                        {errors.newPassword}
                      </div>
                    )}
                  </Form.Group>

                  <Form.Group
                    controlId="formBasicConfirmPassword"
                    className="mb-3"
                  >
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="reset-password-input"
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
                    className="w-100 reset-password-button"
                  >
                    Reset Password
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

export default ResetPassword;
