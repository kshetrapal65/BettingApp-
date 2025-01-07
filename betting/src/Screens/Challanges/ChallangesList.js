import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Badge,
  Dropdown,
  FormSelect,
  Modal,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { apiCallNew } from "../../Network_Call/apiservices";
import ApiEndPoints from "../../Network_Call/ApiEndPoints";
import { PulseLoader } from "react-spinners";
import { formatCapital } from "../../Components/formatCapitalize";
import { FaChevronRight } from "react-icons/fa";
import { getUserdata } from "../../Helper/Storage";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";

const ChallangesList = () => {
  const navigate = useNavigate();
  const userData = getUserdata();
  const [leagues, setLeagues] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [load, setLoad] = useState(false);
  const [leagueType, setLeagueType] = useState("season");
  const [leagueId, setLeagueId] = useState(0);
  const [stripOpen, setStripOpen] = React.useState(false);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getLeagues();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchKeyword, leagueType]);

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const getLeagues = async () => {
    const formData = new FormData();
    formData.append("page", 0);
    formData.append("keyword", searchKeyword);
    formData.append("league_type", leagueType);
    try {
      setLoad(true);
      const response = await apiCallNew(
        "post",
        formData,
        ApiEndPoints.GlobalLeagues
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.error("Stripe has not loaded yet.");
      return;
    }
    setLoad(true);
    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error("[PaymentMethod Error]", error);
      setLoad(false);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      const { id: cardId } = paymentMethod.card;
      const tokenResponse = await stripe.createToken(cardElement);
      if (tokenResponse) {
        stripSubmit(tokenResponse.token.id);
      }
    }
  };

  const stripSubmit = async (token) => {
    try {
      setLoad(true);
      const formData = new FormData();
      formData.append("intent_token", token);
      formData.append("amount", leagueId?.entry_fee);
      formData.append("league_id", leagueId?.id);

      const response = await apiCallNew(
        "post",
        formData,
        ApiEndPoints.StripeChargeGlobal
      );
      if (response.success === true) {
        getLeagues();
        stripPaymentStatus(response?.result);
        setLoad(false);
        handleClose();
      } else {
        setLoad(false);
        toast.error(response?.msg);
      }
    } catch (error) {
      console.log(error);
      setLoad(false);
    }
  };
  const stripPaymentStatus = async (res) => {
    try {
      const formData = new FormData();
      formData.append("payment_status", res?.status);
      formData.append("transaction_id", res?.balance_transaction);
      formData.append("league_id", leagueId?.id);

      const response = await apiCallNew(
        "post",
        formData,
        ApiEndPoints.StripePayStatusGlobal
      );
      if (response.success === true) {
        getLeagues();
        toast.success(response?.msg);
      } else {
        setLoad(false);
        toast.error(response?.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  const handleClose = () => setStripOpen(false);
  const handleOpen = (item) => {
    setLeagueId(item);
    setStripOpen(true);
  };
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
          <h4 className="fw-bold">Challenges</h4>
        </Col>
        <Col xs="auto">
          <FormSelect
            value={leagueType}
            onChange={(e) => setLeagueType(e.target.value)}
          >
            <option value="tournament">Tournament</option>
            <option value="season">Season</option>
          </FormSelect>
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
          <h4 className="fw-bold text-muted m-5">No Challenges Found</h4>
        </div>
      )}

      {leagues?.map((league, index) => {
        const findInviteUser = league?.league_members?.find(
          (item) => item.member_id === userData?.id
        );
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
          league?.is_paid === 1 && league?.payment_status !== "succeeded";
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
                        {formatCapital(league.name)}
                        <span
                          className=" "
                          style={{
                            fontWeight: "normal",
                            fontSize: "14px",
                            color: "#155239",
                          }}
                        >
                          {league?.is_paid == 0
                            ? "(free)"
                            : league?.payment_status == "succeeded"
                            ? "(paid)"
                            : "(unpaid)"}
                        </span>
                      </Card.Title>
                    </Col>
                    <Col xs="auto" className="d-flex">
                      {/* {findInviteUser ? (
                        <Button
                          variant="#155239"
                          size="sm"
                          className="d-flex align-items-center"
                          style={{ backgroundColor: "#155239", color: "white" }}
                          onClick={() =>
                            navigate(
                              `/league-details/${league?.id}/invite/${league?.invite_code}`,
                              {
                                state: {
                                  status: 1,
                                },
                              }
                            )
                          }
                        >
                          View Challenges <FaChevronRight className="ms-2" />
                        </Button>
                      ) : (
                        <Button
                          variant="#155239"
                          size="sm"
                          className="custom-btns d-flex align-items-center"
                          onClick={() =>
                            navigate(
                              `/league-details/${league?.id}/invite/${league?.invite_code}`,
                              {
                                state: {
                                  status: 1,
                                },
                              }
                            )
                          }
                        >
                          Join Challenge <FaChevronRight className="ms-2" />
                        </Button>
                      )} */}

                      {canViewLeague ? (
                        findInviteUser ? (
                          <Button
                            variant="#155239"
                            size="sm"
                            className="custom-btns   ms-lg-2 mb-2 mb-lg-0 me-1"
                            onClick={() => handleOpen(league)}
                          >
                            pay
                          </Button>
                        ) : (
                          <Button
                            variant="#155239"
                            size="sm"
                            className="custom-btns d-flex  align-items-center ms-lg-2 mb-2 mb-lg-0 me-1"
                            onClick={() =>
                              navigate(
                                `/league-details/${league?.id}/invite/${
                                  league?.invite_code
                                }/${1}`
                              )
                            }
                          >
                            Join <FaChevronRight className="ms-2" />
                          </Button>
                        )
                      ) : leagueStatus == "Completed" ? (
                        <Button
                          variant="#155239"
                          size="sm"
                          className="custom-btns d-flex  align-items-center ms-lg-2 mb-2 mb-lg-0 me-1"
                          onClick={() =>
                            navigate(
                              `/league-details/${league?.id}/invite/${
                                league?.invite_code
                              }/${1}`
                            )
                          }
                        >
                          View <FaChevronRight className="ms-2" />
                        </Button>
                      ) : (
                        <Button
                          variant="#155239"
                          size="sm"
                          className="custom-btns d-flex  align-items-center ms-lg-2 mb-2 mb-lg-0 me-1"
                          onClick={() =>
                            navigate(
                              `/league-details/${league?.id}/invite/${
                                league?.invite_code
                              }/${1}`
                            )
                          }
                        >
                          Bet <FaChevronRight className="ms-2" />
                        </Button>
                      )}
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <Col>
                      <p className="text-muted mb-0">
                        <strong>End: </strong>{" "}
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
      {/* strip pament */}
      <Modal show={stripOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold fs-4">Stripe Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {load && (
            <div>
              <PulseLoader
                loading={load}
                color="#155239"
                style={styles.backdrop}
              />
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <p className="mb-4" style={{ fontSize: "0.8rem", color: "gray" }}>
              For betting on this league you need to pay the entry fee of{" "}
              <span style={{ color: "#155239", fontWeight: "bold" }}>
                ${leagueId?.entry_fee}
              </span>{" "}
              then you can bet on this league, if you win you will get the earn
              amount and will be credited to your account.
            </p>
            <CardElement options={cardElementOptions} />
            <Button
              className="w-100 fw-bold"
              variant="#155239"
              type="submit"
              disabled={!stripe}
              style={{
                marginTop: "25px",
                backgroundColor: "#155239",
                color: "white",
              }}
            >
              Pay
            </Button>
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

export default ChallangesList;
