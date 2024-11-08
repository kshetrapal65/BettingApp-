import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import "./verifyotp.css";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { apiCallNew } from "../../../Network_Call/apiservices";
import ApiEndPoints from "../../../Network_Call/ApiEndPoints";
import toast from "react-hot-toast";
import { PulseLoader } from "react-spinners";
import { FaArrowLeft } from "react-icons/fa";

const validationSchema = Yup.object({
  otp: Yup.string().required("OTP is required"),
});

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState({});
  const [load, setLoad] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const valid = {
        otp: otp,
      };
      const formData = new FormData();
      formData.append("email", email);
      formData.append("otp", otp);
      await validationSchema.validate(valid, {
        abortEarly: false,
      });
      setLoad(true);
      const response = await apiCallNew(
        "post",
        formData,
        ApiEndPoints.VerifyOtp
      );
      if (response.success === true) {
        console.log("response", response);
        toast.success(response.msg);
        setLoad(false);
        navigate("/reset-password", { state: { email: email, otp: otp } });
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
        className="otp-container d-flex justify-content-center align-items-center"
      >
        <Row className="w-100">
          <Col xs={12} md={6} lg={4} className="mx-auto">
            <Card className="otp-card shadow-lg p-4">
              <FaArrowLeft
                onClick={() => navigate(-1)}
                size={20}
                style={{ cursor: "pointer", marginTop: "-10px" }}
              />
              <Card.Body>
                <h2 className="text-center mb-4">OTP Verification</h2>
                <p className="text-center mb-4">
                  Enter the OTP sent to your email.
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
                    {errors.otp && (
                      <div className="text-danger small">{errors.otp}</div>
                    )}
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

export default VerifyOtp;
