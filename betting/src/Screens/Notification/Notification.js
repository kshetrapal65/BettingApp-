import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { apiCallNew } from "../../Network_Call/apiservices";
import ApiEndPoints from "../../Network_Call/ApiEndPoints";
import { Container, Row, Col, Card } from "react-bootstrap";
import moment from "moment";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";

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

  const deleteNotification = async (id) => {
    try {
      const response = await apiCallNew(
        "delete",
        {},
        ApiEndPoints.NotificationDelete + id
      );
      if (response.success === true) {
        getNotification();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const confirmDeletion = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete the notification?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#155636",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteNotification(id);
      }
    });
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
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Card.Title
                      style={{
                        fontSize: "1.3rem",
                        color: "#2c3e50",
                        fontWeight: "bold",
                      }}
                    >
                      {notification.title}
                    </Card.Title>
                    <FaTrash
                      style={{ cursor: "pointer", color: "red" }}
                      onClick={() => confirmDeletion(notification.id)}
                    />
                  </div>
                  <Card.Text>{notification.message}</Card.Text>
                  <small className="text-muted">
                    {moment(notification.created_at).format("YYYY-MM-DD HH:mm")}
                  </small>
                  <br />
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
