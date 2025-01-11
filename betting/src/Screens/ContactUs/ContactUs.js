import React, { useEffect, useState } from "react";
import ApiEndPoints from "../../Network_Call/ApiEndPoints";
import { apiCallNew } from "../../Network_Call/apiservices";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import toast from "react-hot-toast";
import { PulseLoader } from "react-spinners";

const ContactUs = () => {
  const [formDatas, setFormDatas] = useState({
    name: "",
    email: "",
    subject: "",
    mobile_number: "",
    message: "",
  });
  const [load, setLoad] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormDatas({
      ...formDatas,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoad(true);
      const formData = new FormData();
      formData.append("name", formDatas.name);
      formData.append("email", formDatas.email);
      formData.append("subject", formDatas.subject);
      formData.append("message", formDatas.message);
      formData.append("mobile_number", formDatas.mobile_number);

      const response = await apiCallNew(
        "post",
        formData,
        ApiEndPoints.ContactsUs
      );
      console.log("rererer", response);
      if (response.success == true) {
        toast.success(response.msg);
        setLoad(false);
        setFormDatas({
          name: "",
          email: "",
          subject: "",
          message: "",
          mobile_number: "",
        });
      } else {
        toast.error(response.msg);
        setLoad(false);
      }
    } catch (error) {
      console.log(error);
      setLoad(false);
    }
  };

  return (
    <div>
      {load && (
        <div>
          <PulseLoader loading={load} color="#155239" style={styles.backdrop} />
        </div>
      )}
      <Container>
        <Row className="justify-content-center my-3">
          <Col xs={12} md={8} lg={6}>
            <h4 className="fw-bold mb-4 text-center">Contact Us</h4>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="name" className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formDatas.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  required
                />
              </Form.Group>

              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  value={formDatas.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                />
              </Form.Group>
              <Form.Group controlId="mobile_number" className="mb-3">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  type="number"
                  name="mobile_number"
                  value={formDatas.mobile_number}
                  onChange={handleInputChange}
                  placeholder="Enter your mobile number"
                  required
                />
              </Form.Group>

              <Form.Group controlId="subject" className="mb-3">
                <Form.Label>Subject</Form.Label>
                <Form.Control
                  type="text"
                  name="subject"
                  value={formDatas.subject}
                  onChange={handleInputChange}
                  placeholder="Enter subject"
                  required
                />
              </Form.Group>

              <Form.Group controlId="message" className="mb-3">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="message"
                  value={formDatas.message}
                  onChange={handleInputChange}
                  placeholder="Enter your message"
                  required
                />
              </Form.Group>

              <Button
                type="submit"
                className="w-100 mt-3"
                style={{
                  backgroundColor: "#155239",
                  color: "#fff",
                  border: "none",
                }}
              >
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
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

export default ContactUs;
