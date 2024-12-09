import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { apiCallNew } from "../../Network_Call/apiservices";
import ApiEndPoints from "../../Network_Call/ApiEndPoints";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  InputGroup,
  Form,
  Button,
  Modal,
  FormGroup,
} from "react-bootstrap";
import { PulseLoader } from "react-spinners";
import {
  FaArrowLeft,
  FaBackward,
  FaCopy,
  FaLink,
  FaRegCopy,
} from "react-icons/fa";
import ShareableLink from "../../Components/ShareableLink ";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { getUserdata } from "../../Helper/Storage";
import { FaGear } from "react-icons/fa6";

const LeagueDetails = () => {
  const { id, code } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const status = location.state?.status;
  const userData = getUserdata();
  const [league, setLeague] = React.useState([]);
  const [leagueList, setLeagueList] = React.useState([]);
  const [load, setLoad] = React.useState(true);
  const [copy, setCopy] = React.useState(false);
  const [show, setShow] = React.useState(false);

  const shareUrl = ShareableLink(league?.id, league?.invite_code);
  const matchId = leagueList?.find((item) => item.id == id);

  const findInviteUser = league?.league_members?.find(
    (item) => item.member_id == userData?.id
  );
  const currentDate = new Date();
  const seasonStartDate = new Date(league?.season_start_date);

  console.log("status", status);
  useEffect(() => {
    getLeagueDetails();
    getLeagues();
    window.scrollTo(0, 0);
  }, [id, code]);

  setTimeout(() => {
    setCopy(false);
  }, 2000);
  const deleteLeague = async (id) => {
    try {
      const response = await apiCallNew(
        "get",
        {},
        ApiEndPoints.DeleteLeague + id
      );
      if (response.success === true) {
        getLeagues();
        setShow(false);
        navigate("/leagues-list");
      }
    } catch (error) {
      console.log(error);
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

  const getLeagueDetails = async () => {
    try {
      setLoad(true);
      const response = await apiCallNew(
        "post",
        null,
        status == 1
          ? ApiEndPoints.GlobalLeagueDetails + id
          : ApiEndPoints.LeagueDetail + id
      );
      if (response.success === true) {
        setLeague(response.result);
        setLoad(false);
      } else {
        setLoad(false);
      }
    } catch (error) {
      setLoad(false);
      console.error(error);
    }
  };

  const getLeagues = async () => {
    try {
      const response = await apiCallNew("post", null, ApiEndPoints.LeagueList);
      if (response.success === true) {
        setLeagueList(response.result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const confirmLeave = (id) => {
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
        if (status == 1) {
          leaveFromGlobleLeague(id);
        } else {
          leaveFromLeague(id);
        }
      }
    });
  };
  const confirmLeagueInvites = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to accept the invites?",
      icon: "success",
      showCancelButton: true,
      confirmButtonColor: "#155636",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, accept it!",
    }).then((result) => {
      if (result.isConfirmed) {
        if (status == 1) {
          acceptGlobleInvites();
        } else {
          acceptInvites();
        }
      }
    });
  };

  const leaveFromLeague = async (id) => {
    try {
      const response = await apiCallNew(
        "get",
        {},
        ApiEndPoints.LeaveLeague + id
      );
      if (response.success === true) {
        navigate("/leagues-list");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const leaveFromGlobleLeague = async (id) => {
    try {
      const response = await apiCallNew(
        "get",
        {},
        ApiEndPoints.GlobalLeagueLeave + id
      );
      if (response.success === true) {
        navigate("/challanges");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const acceptInvites = async () => {
    const formData = new FormData();
    formData.append("invite_code", code);
    try {
      setLoad(true);
      const response = await apiCallNew(
        "post",
        formData,
        ApiEndPoints.AcceptInvite
      );
      if (response.success === true) {
        navigate("/leagues-list");
        setLoad(false);
      } else {
        toast.error(response.msg);
      }
    } catch (error) {
      console.log(error);
      setLoad(false);
    }
  };

  const acceptGlobleInvites = async () => {
    try {
      setLoad(true);
      const response = await apiCallNew(
        "get",
        null,
        ApiEndPoints.GlobalLeagueJoin + id
      );
      if (response.success === true) {
        navigate("/challanges");
        setLoad(false);
      } else {
        toast.error(response.msg);
        setLoad(false);
      }
    } catch (error) {
      console.log(error);
      setLoad(false);
    }
  };

  const event = [
    {
      title: "Event 1",
      id: 1,
      home_team: "Layne",
      away_team: "Ben",
    },
    {
      title: "Event 1",
      id: 1,
      home_team: "Bailey",
      away_team: "Phil",
    },
    {
      title: "Event 1",
      id: 1,
      home_team: "Tylor",
      away_team: "Jhon",
    },
    {
      title: "Event 1",
      id: 1,
      home_team: "Layne",
      away_team: "Ben",
    },
  ];
  const Betdata = [
    {
      player: "kunal",
      id: 1,
      roi: "16.6%",
      score: "85",
    },
    {
      player: "Tyler",
      id: 1,
      roi: "12.6%",
      score: "36",
    },
    {
      player: "Benley",
      id: 1,
      roi: "19.6%",
      score: "45",
    },
    {
      player: "Phill",
      id: 1,
      roi: "18.6%",
      score: "36",
    },
    {
      player: "Dom",
      id: 1,
      roi: "18.6%",
      score: "36",
    },
    {
      player: "Diwyne",
      id: 1,
      roi: "18.6%",
      score: "36",
    },
    {
      player: "Diwyne",
      id: 1,
      roi: "18.6%",
      score: "36",
    },
    {
      player: "Owens",
      id: 1,
      roi: "18.6%",
      score: "36",
    },
    {
      player: "Owens",
      id: 1,
      roi: "18.6%",
      score: "36",
    },
  ];

  return (
    <Container className="mt-4">
      {load && (
        <div>
          <PulseLoader loading={load} color="#155239" style={styles.backdrop} />
        </div>
      )}
      <Card className="mb-4">
        <Card.Header as="h5" className="fw-bold">
          {" "}
          <Row className="align-items-center justify-content-between mb-3">
            <Col
              xs="12"
              lg="6"
              className="text-center text-lg-start mb-2 mb-lg-0"
            >
              <FaArrowLeft
                onClick={() =>
                  navigate(status == 1 ? "/challanges" : "/leagues-list")
                }
                className="me-3"
                style={{ cursor: "pointer" }}
              />
              {league.name} Details
            </Col>
            <Col
              xs="12"
              lg={5}
              className="d-flex justify-content-center justify-content-lg-end"
            >
              {/* {userData?.id !== league?.user_id && (
                <Button
                  className="ms-lg-2 mb-2 mb-lg-0 me-1"
                  size="sm"
                  variant="#155239"
                  style={{ backgroundColor: "#b50404", color: "white" }}
                  onClick={() => confirmLeave(league.id)}
                >
                  Leave
                </Button>
              )} */}
              {status == 1 ? (
                findInviteUser ? (
                  <>
                    <Button
                      className="ms-lg-2 mb-2 mb-lg-0 me-1"
                      size="sm"
                      variant="#155239"
                      style={{ backgroundColor: "#155239", color: "white" }}
                      onClick={() =>
                        navigate(
                          `/odds/${league?.league_sports[0]?.sport_key}`,
                          {
                            state: { league: league, status: 1 },
                          }
                        )
                      }
                      disabled={currentDate >= seasonStartDate}
                    >
                      Bets on {league.name}
                    </Button>
                  </>
                ) : null
              ) : (
                <>
                  <>
                    {league?.id == matchId?.id ? (
                      <Button
                        className="ms-lg-2 mb-2 mb-lg-0 me-1"
                        size="sm"
                        variant="#155239"
                        style={{ backgroundColor: "#155239", color: "white" }}
                        onClick={() =>
                          navigate(
                            `/odds/${league?.league_sports[0]?.sport_key}`,
                            {
                              state: { league: league, status: 1 },
                            }
                          )
                        }
                        disabled={currentDate >= seasonStartDate}
                      >
                        Bets on {league.name}
                      </Button>
                    ) : null}
                  </>
                </>
              )}

              {status == 1 ? (
                findInviteUser ? null : (
                  <>
                    <Button
                      className="ms-lg-2 mb-2 mb-lg-0"
                      size="sm"
                      variant="#155239"
                      style={{ backgroundColor: "#155239", color: "white" }}
                      onClick={confirmLeagueInvites}
                    >
                      Accept Invitess
                    </Button>
                  </>
                )
              ) : (
                <>
                  {userData?.id === league?.user_id ? null : league?.id ==
                    matchId?.id ? null : (
                    <Button
                      className="ms-lg-2 mb-2 mb-lg-0"
                      size="sm"
                      variant="#155239"
                      style={{ backgroundColor: "#155239", color: "white" }}
                      onClick={confirmLeagueInvites}
                    >
                      Accept Invite
                    </Button>
                  )}
                </>
              )}
            </Col>
            <Col
              xs="12"
              lg={1}
              className="text-center text-lg-center mb-2 mb-lg-0"
            >
              <FaGear
                onClick={() => setShow(true)}
                className=""
                style={{ cursor: "pointer" }}
              />
            </Col>
          </Row>
        </Card.Header>
      </Card>
      <Card className="mb-4">
        {/* <Card.Header
          as="h5"
          className="fw-bold text-white"
          style={{ backgroundColor: "#155239" }}
        >
          {" "}
          <FaArrowLeft
            onClick={() => navigate(-1)}
            className="me-3"
            style={{ cursor: "pointer" }}
          />
          {league.name} Details
        </Card.Header> */}
        <Card.Body>
          <Row>
            <Col md={6}>
              <p>
                <strong>Invite Code:</strong> {league.invite_code}
              </p>
              <p>
                <strong>Start Date:</strong> {league.season_start_date}
              </p>
              <p>
                <strong>End Date:</strong> {league.season_end_date}
              </p>
            </Col>
            <Col md={6}>
              <p>
                <strong>Match Length:</strong> {league.match_length} minutes
              </p>
              <p>
                <strong>Units Issued:</strong> {league.units_issued}
              </p>
              <p>
                <strong>Paid League:</strong> {league.is_paid ? "Yes" : "No"}
              </p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <Card className="mb-4">
        <Card.Header
          as="h5"
          className="text-white"
          style={{ backgroundColor: "#155239" }}
        >
          {status == 1 ? "Sports in season" : "Sports in League"}
        </Card.Header>
        <Card.Body>
          {league?.league_sports?.length > 0 ? (
            <div className="table-responsive">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Sport ID</th>
                    <th>Sport Key</th>
                    <th>Sport Name</th>
                  </tr>
                </thead>
                <tbody>
                  {league.league_sports.map((sport) => (
                    <tr key={sport.id}>
                      <td>{sport.sport_id}</td>
                      <td>{sport.sport_key}</td>
                      <td>{sport.sport_name}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ) : (
            <p>No sports available for this league.</p>
          )}
        </Card.Body>
      </Card>
      <Card className="mb-4">
        <Card.Header
          as="h5"
          className="text-white"
          style={{ backgroundColor: "#155239" }}
        >
          Leadboard
        </Card.Header>
        <Card.Body>
          {league?.league_members?.length > 0 ? (
            <>
              {" "}
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>User</th>
                    <th>Record</th>
                    <th>Total Units</th>
                  </tr>
                </thead>
                <tbody>
                  {league.league_members.map((member) => (
                    <tr key={member.id}>
                      <td>{member.member_id}</td>
                      <td>
                        {member.member_name}
                        {/* <br />
                        <span className="text-primary">@philipin</span> */}
                      </td>
                      <td>2-1-0</td>
                      <td>{member.member_unit}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          ) : (
            <p>No members available for this league.</p>
          )}
        </Card.Body>
      </Card>
      <Row className="mb-2">
        <Col lg={8}>
          <h4 className="fw-bold"> Schedule</h4>
        </Col>
        <Col className="text-end" lg={4}>
          {" "}
          <Form.Group controlId="formSelect ">
            <Form.Select aria-label="Select option">
              <option disabled>select</option>
              <option value="option1">Current Week</option>
              <option value="option2">Last Week</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Card className="mb-4">
        <Card.Body>
          <Row className="rounded-2">
            <Col lg={12}>
              {event.length > 0 ? (
                <div
                  style={{
                    display: "flex",
                    gap: "15px",
                    overflowX: "scroll",
                    overflowY: "hidden",
                    padding: "10px",
                    whiteSpace: "nowrap",
                    scrollBehavior: "smooth",
                  }}
                >
                  {event.map((eventItem) => (
                    <Card
                      key={eventItem.id}
                      className="shadow p-2"
                      style={{
                        minWidth: "300px",
                        borderRadius: "8px",
                        cursor: "pointer",
                      }}
                    >
                      <Card.Body>
                        {/* Teams */}
                        <div className="text-center">
                          {/* Home Team */}
                          <Row className="justify-content-between bg-light rounded">
                            <Col xs={6} lg={5}>
                              {" "}
                              <p className="ms-2 mb-0 text-truncate fw-bold text-dark">
                                {eventItem.home_team || "Not Available"}
                              </p>
                            </Col>
                            <Col xs={6} lg={5}>
                              {" "}
                              <span className="text-muted fw-bold ms-2">
                                34
                              </span>
                            </Col>
                          </Row>

                          <span className="text-muted fs-6">vs</span>

                          {/* Away Team */}
                          <Row className="justify-content-between bg-light rounded">
                            <Col xs={6} lg={5}>
                              {" "}
                              <p className="ms-2 mb-0 text-truncate fw-bold text-dark">
                                {eventItem.away_team || "Not Available"}
                              </p>
                            </Col>
                            <Col xs={6} lg={5}>
                              {" "}
                              <span className="text-muted fw-bold ms-2">
                                45
                              </span>
                            </Col>
                          </Row>
                        </div>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted p-5">
                  No events available.
                </p>
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <Row className="mb-2">
        <Col lg={12}>
          <h4 className="fw-bold">Betslip</h4>
        </Col>
      </Row>
      <Card className="mb-4">
        <Card.Body>
          <Row className="rounded-2">
            <Col lg={12}>
              {Betdata.length > 0 ? (
                <div
                  style={{
                    display: "flex",
                    gap: "15px",
                    overflowX: "scroll",
                    overflowY: "hidden",
                    padding: "10px",
                    whiteSpace: "nowrap",
                    scrollBehavior: "smooth",
                  }}
                >
                  {Betdata.map((eventItem) => (
                    <Card
                      key={eventItem.id}
                      className="shadow p-2"
                      style={{
                        minWidth: "139px",
                        borderRadius: "8px",
                        cursor: "pointer",
                      }}
                    >
                      <Card.Body>
                        {/* Teams */}
                        <div className="text-center">
                          {/* Home Team */}
                          <Row className="justify-content-between   rounded">
                            <Col xs={12} lg={12}>
                              {" "}
                              <h6 className="text-truncate fw-bold text-dark">
                                {eventItem.player || "Not Available"}
                              </h6>
                            </Col>
                            <Col xs={12} lg={12}>
                              {" "}
                              <h5 className="text-muted fw-bold ">
                                {eventItem?.score}
                              </h5>
                            </Col>
                            <Col xs={12} lg={12}>
                              {" "}
                              <span className="text-muted  fw-bold  ">
                                ROI - {eventItem?.roi}
                              </span>
                            </Col>
                          </Row>
                        </div>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted p-5">
                  No events available.
                </p>
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* <Card className="mb-4">
        <Card.Header
          as="h5"
          className="text-white"
          style={{ backgroundColor: "#155239" }}
        >
          League Invites
        </Card.Header>
        <Card.Body>
           
          <InputGroup>
            <InputGroup.Text>
              <FaLink />
            </InputGroup.Text>
            <Form.Control
              type="text"
              readOnly
              value={shareUrl}
              style={{ color: "#007bff", cursor: "pointer" }}
            />
            <InputGroup.Text
              onClick={() => {
                navigator.clipboard.writeText(shareUrl);
                setCopy(true);
              }}
              style={{ cursor: "pointer" }}
            >
              {copy ? <FaCopy /> : <FaRegCopy />}
            </InputGroup.Text>
          </InputGroup>
        </Card.Body>
      </Card> */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton> settings </Modal.Header>
        <Modal.Body>
          <Row>
            <Col className="text-end mb-3" lg={12}>
              {userData?.id == league?.user_id ? (
                <Button
                  className="ms-lg-2 mb-2 mb-lg-0 me-1"
                  size="sm"
                  variant="#155239"
                  style={{ backgroundColor: "#b50404", color: "white" }}
                  onClick={() => confirmDeletion(league.id)}
                >
                  Delete League
                </Button>
              ) : (
                <Button
                  className="ms-lg-2 mb-2 mb-lg-0 me-1"
                  size="sm"
                  variant="#155239"
                  style={{ backgroundColor: "#b50404", color: "white" }}
                  onClick={() => confirmLeave(league.id)}
                >
                  Leave
                </Button>
              )}
            </Col>
          </Row>
          <Card className="mb-4">
            <Card.Body>
              <h5>{status == 1 ? "Season Invites" : "League Invites"}</h5>
              <InputGroup>
                <InputGroup.Text>
                  <FaLink />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  readOnly
                  value={shareUrl}
                  style={{ color: "#007bff", cursor: "pointer" }}
                />
                <InputGroup.Text
                  onClick={() => {
                    navigator.clipboard.writeText(shareUrl);
                    setCopy(true);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {copy ? <FaCopy /> : <FaRegCopy />}
                </InputGroup.Text>
              </InputGroup>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <h5>{status == 1 ? "Season Members" : "League Members"}</h5>
              {league?.league_members?.length > 0 ? (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Member ID</th>
                      <th>Member Name</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {league.league_members.map((member) => (
                      <tr key={member?.id}>
                        <td>{member?.member_id}</td>
                        <td>{member?.member_name}</td>
                        <td>{member?.member_status}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p>No members available for this league.</p>
              )}
            </Card.Body>
          </Card>
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

export default LeagueDetails;
