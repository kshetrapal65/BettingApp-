import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Badge,
  Modal,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ApiEndPoints from "../../Network_Call/ApiEndPoints";
import { apiCallNew } from "../../Network_Call/apiservices";
import moment from "moment";
import { PulseLoader } from "react-spinners";
import { FaChevronRight, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import "./createlegue.css";
import { getUserdata } from "../../Helper/Storage";
import axios from "axios";
import toast from "react-hot-toast";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const LeaguesList = () => {
  const navigate = useNavigate();
  const [leagues, setLeagues] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [load, setLoad] = useState(false);
  const [show, setShow] = useState(false);
  const [id, setid] = useState();
  const userData = getUserdata();
  const [formData, setFormData] = useState({
    inputValue: "",
    selectValue: "",
  });
  const [stripOpen, setStripOpen] = React.useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [paymentStatus, setPaymentStatus] = React.useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getLeagues();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchKeyword]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setLoad(true);
      const formdata = new FormData();
      formdata.append("units_issued_type", formData.selectValue);
      formdata.append("units_issued", formData.inputValue);
      const response = await apiCallNew(
        "post",
        formdata,
        ApiEndPoints.UpdateUnit + id
      );
      if (response.success == true) {
        toast.success(response?.msg);
        setShow(false);
        setLoad(false);
        getLeagues();
      } else {
        setLoad(false);
      }
    } catch (error) {
      console.log(error);
      setLoad(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const getLeagues = async () => {
    const formData = new FormData();
    formData.append("page", 0);
    formData.append("keyword", searchKeyword);
    try {
      setLoad(true);
      const response = await apiCallNew(
        "post",
        formData,
        ApiEndPoints.LeagueList
      );
      if (response.success === true) {
        setLeagues(response.result);
        setLoad(false);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setLoad(false);
    }
  };

  const confirmDeletion = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to remove the league?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#155636",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteLeague(id);
      }
    });
  };

  const deleteLeague = async (id) => {
    try {
      const response = await apiCallNew(
        "get",
        {},
        ApiEndPoints.DeleteLeague + id
      );
      if (response.success === true) {
        getLeagues();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    try {
      // Call your backend to create the PaymentIntent and get the clientSecret
      const response = await fetch("http://localhost:4002/payment-sheet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: 3000, currency: "eur" }),
      });
      console.log("res", response);
      const { clientSecret } = await response.json();

      // Now confirm the card payment using the clientSecret
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setPaymentStatus(`Payment failed: ${result.error.message}`);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          setPaymentStatus("Payment successful!");
          console.log("PaymentIntent: ", result.paymentIntent); // Stripe payment intent response
        }
      }
    } catch (error) {
      setPaymentStatus(`Payment failed: ${error.message}`);
      console.error("Error processing payment:", error);
    }
  };

  const handleClose = () => setStripOpen(false);
  const handleOpen = () => setStripOpen(true);
  const cardElementOptions = {
    hidePostalCode: true,
  };
  return (
    <Container>
      {load && (
        <div>
          <PulseLoader loading={load} color="#155239" style={styles.backdrop} />
        </div>
      )}
      <Row className="justify-content-between align-items-center mt-3">
        <Col xs="auto">
          <h4 className="fw-bold">Leagues</h4>
        </Col>
        <Col xs="auto">
          <Link to="/create-leagues">
            <Button
              variant="#155239"
              className="text-decoration-none fw-bold"
              style={{ color: "#155239" }}
            >
              + New League
            </Button>
          </Link>
        </Col>
      </Row>
      <Row className="mt-3 mb-4">
        <Col>
          <Form.Control
            type="search"
            placeholder="Search..."
            value={searchKeyword}
            onChange={handleSearchChange}
          />
        </Col>
      </Row>
      {leagues?.length === 0 && (
        <div className="d-flex justify-content-center align-items-center">
          <h4 className="fw-bold text-muted m-5">No Leagues Found</h4>
        </div>
      )}

      {leagues?.map((league, index) => {
        const startDate = moment(league?.season_start_date).format(
          "YYYY-MM-DD"
        );
        const currentDate = moment(new Date()).format("YYYY-MM-DD");
        const endDate = moment(league?.season_end_date).format("YYYY-MM-DD");
        const leagueStatus =
          currentDate < startDate
            ? "Upcoming"
            : currentDate > endDate
            ? "Completed"
            : "Ongoing";
        const canViewLeague =
          league?.is_paid === 0 || league?.user_id === userData?.id;
        // payment === "done";
        return (
          <Row key={index} className="mb-4">
            <Col>
              <Card className="league-card h-100 shadow-sm">
                <Card.Body className="p-4">
                  <Row className="justify-content-between align-items-center">
                    <Col xs={8}>
                      <Card.Title
                        style={{
                          fontSize: "1.3rem",
                          color: "#2c3e50",
                          fontWeight: "bold",
                        }}
                      >
                        {league.name}{" "}
                        {/* <span
                          className="text-muted"
                          style={{ fontWeight: "normal", fontSize: "14px" }}
                        >
                          (paid)
                        </span> */}
                      </Card.Title>
                    </Col>
                    <Col xs="auto" className="d-flex">
                      {startDate > currentDate &&
                        userData?.id == league?.user_id && (
                          <Button
                            className="ms-lg-2 mb-2 mb-lg-0 me-1"
                            size="sm"
                            variant="#155239"
                            style={{
                              backgroundColor: "#155239",
                              color: "white",
                            }}
                            onClick={() => {
                              setShow(true);
                              setid(league.id);
                            }}
                            disabled={currentDate > endDate}
                          >
                            Update Units
                          </Button>
                        )}
                      {/* {userData?.id == league?.user_id && (
                        <Button
                          className="ms-lg-2 mb-2 mb-lg-0 me-1"
                          size="sm"
                          variant="#155239"
                          style={{ backgroundColor: "#155239", color: "white" }}
                          onClick={() => {
                            setShow(true);
                            setid(league.id);
                          }}
                          disabled={currentDate > endDate}
                        >
                          Update Units
                        </Button>
                      )} */}
                      {canViewLeague ? (
                        <Button
                          variant="#155239"
                          size="sm"
                          className="custom-btns d-flex  align-items-center ms-lg-2 mb-2 mb-lg-0 me-1"
                          onClick={() =>
                            navigate(
                              `/league-details/${league?.id}/invite/${league?.invite_code}`
                            )
                          }
                        >
                          View League <FaChevronRight className="ms-2" />
                        </Button>
                      ) : (
                        <Button
                          variant="#155239"
                          size="sm"
                          className="custom-btns   ms-lg-2 mb-2 mb-lg-0 me-1"
                          onClick={handleOpen}
                        >
                          pay
                        </Button>
                      )}

                      {/* <Button
                        variant="#155239"
                        size="sm"
                        className="custom-btns d-flex  align-items-center ms-lg-2 mb-2 mb-lg-0 me-1"
                        onClick={() =>
                          navigate(
                            `/league-details/${league?.id}/invite/${league?.invite_code}`
                          )
                        }
                      >
                        View League <FaChevronRight className="ms-2" />
                      </Button> */}
                      {/* <Button
                      variant="#155239"
                      size="sm"
                      className="custom-btns ms-2 d-flex align-items-center"
                      onClick={() => confirmDeletion(league.id)}
                    >
                      <FaTrash />
                    </Button> */}
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col>
                      <p className="text-muted mb-0">
                        <strong>Ends: </strong>{" "}
                        {moment(league.season_end_date).format("l")}
                      </p>
                      <p
                        className="mb-0 fw-bold"
                        style={{
                          fontSize: "0.8rem",
                          color: "#155239",
                        }}
                      >
                        {leagueStatus}
                      </p>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        );
      })}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update units</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Units</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter something"
                name="inputValue"
                value={formData.inputValue}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Select Type</Form.Label>
              <Form.Select
                name="selectValue"
                value={formData.selectValue}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  Choose an option
                </option>
                <option value="a_day">A day</option>
                <option value="a_week">A week</option>
                <option value="all_at_once">All at once</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button
            variant="#155239"
            style={{
              backgroundColor: "#155239",
              border: "none",
              color: "white",
            }}
            onClick={handleSave}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      {/* strip pament */}
      <Modal show={stripOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Stripe Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <CardElement options={cardElementOptions} />
            <Button
              className="w-100 fw-bold"
              variant="primary"
              type="submit"
              disabled={!stripe}
              style={{ marginTop: "20px" }}
              // onClick={handleCheckout}
            >
              Pay
            </Button>
            {/* <p>{paymentStatus}</p> */}
          </form>
        </Modal.Body>
      </Modal>
    </Container>
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

export default LeaguesList;
