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

const LeagueDetails = () => {
  const { id, code } = useParams();
  const navigate = useNavigate();
  const userData = getUserdata();
  const [league, setLeague] = React.useState([]);
  const [leagueList, setLeagueList] = React.useState([]);
  const [load, setLoad] = React.useState(true);
  const [copy, setCopy] = React.useState(false);
  const shareUrl = ShareableLink(league?.id, league?.invite_code);
  const matchId = leagueList?.find((item) => item.id == id);

  useEffect(() => {
    getLeagueDetails();
    getLeagues();
    window.scrollTo(0, 0);
  }, [id, code]);

  setTimeout(() => {
    setCopy(false);
  }, 2000);

  const getLeagueDetails = async () => {
    try {
      setLoad(true);
      const response = await apiCallNew(
        "post",
        null,
        ApiEndPoints.LeagueDetail + id
      );
      if (response.success === true) {
        setLeague(response.result);
        setLoad(false);
      } else {
        setLoad(false);
      }
    } catch (error) {
      setLoad(false);
      console.error("Error fetching profile:", error);
    }
  };

  const getLeagues = async () => {
    try {
      const response = await apiCallNew("post", null, ApiEndPoints.LeagueList);
      if (response.success === true) {
        setLeagueList(response.result);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
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
        leaveFromLeague(id);
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
        acceptInvites();
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
                onClick={() => navigate("/leagues-list")}
                className="me-3"
                style={{ cursor: "pointer" }}
              />
              {league.name} Details
            </Col>
            <Col
              xs="12"
              lg="6"
              className="d-flex justify-content-center justify-content-lg-end"
            >
              {userData?.id !== league?.user_id && (
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

              <Button
                className="ms-lg-2 mb-2 mb-lg-0 me-1"
                size="sm"
                variant="#155239"
                style={{ backgroundColor: "#155239", color: "white" }}
              >
                Bets on {league.name}
              </Button>
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
          Sports in League
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
          League Members
        </Card.Header>
        <Card.Body>
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
                  <tr key={member.id}>
                    <td>{member.member_id}</td>
                    <td>{member.member_name}</td>
                    <td>{member.member_status}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No members available for this league.</p>
          )}
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Header
          as="h5"
          className="text-white"
          style={{ backgroundColor: "#155239" }}
        >
          League Invites
        </Card.Header>
        <Card.Body>
          {/* {league?.league_invites?.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Invite ID</th>
                </tr>
              </thead>
              <tbody>
                {league.league_invites.map((invite, index) => (
                  <tr key={index}>
                    <td>{invite.id}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No invites available for this league.</p>
          )} */}
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
