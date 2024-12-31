import React, { useEffect, useState } from "react";
import { apiCallNew } from "../../Network_Call/apiservices";
import ApiEndPoints from "../../Network_Call/ApiEndPoints";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import moment from "moment";

const Notification = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getNotification();
  }, []);
  const getNotification = async () => {
    try {
      const response = await apiCallNew(
        "post",
        null,
        ApiEndPoints.Notifications
      );
      if (response.success === true) {
        setData(response.result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <h3
            className="text-center mb-4 mt-3"
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            Notifications
          </h3>
          {data.length > 0 ? (
            data.map((notification) => (
              <Card key={notification.id} className="mb-3 shadow-sm">
                <Card.Body>
                  <Card.Title
                    style={{
                      fontSize: "1.3rem",
                      color: "#2c3e50",
                      fontWeight: "bold",
                    }}
                  >
                    {notification.title}
                  </Card.Title>
                  <Card.Text>{notification.message}</Card.Text>
                  <small className="text-muted">
                    {moment(notification.created_at).format("YYYY-MM-DD HH:mm")}
                  </small>
                  <br />
                  {/* {notification.read_at ? (
                    <small className="text-success">Read</small>
                  ) : (
                    <small className="text-danger">Unread</small>
                  )} */}
                </Card.Body>
              </Card>
            ))
          ) : (
            <p className="text-center text-muted mt-5">
              No notifications available.
            </p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Notification;
