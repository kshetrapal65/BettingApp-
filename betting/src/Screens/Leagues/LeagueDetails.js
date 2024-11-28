import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiCallNew } from "../../Network_Call/apiservices";
import ApiEndPoints from "../../Network_Call/ApiEndPoints";
import { Container, Row, Col, Card, Table } from "react-bootstrap";
import { PulseLoader } from "react-spinners";
import { FaArrowLeft, FaBackward } from "react-icons/fa";

const LeagueDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [league, setLeague] = React.useState([]);
  const [load, setLoad] = React.useState(true);

  useEffect(() => {
    getLeagueDetails();
  }, [id]);

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
      }
    } catch (error) {
      setLoad(false);
      console.error("Error fetching profile:", error);
    }
  };

  return (
    <Container className="mt-4">
      {load && (
        <div>
          <PulseLoader loading={load} color="#155239" style={styles.backdrop} />
        </div>
      )}
      {/* League Overview */}
      <Card className="mb-4">
        <Card.Header as="h5" className="fw-bold">
          {" "}
          <FaArrowLeft
            onClick={() => navigate(-1)}
            className="me-3"
            style={{ cursor: "pointer" }}
          />
          {league.name} Details
        </Card.Header>
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

      {/* League Sports */}
      <Card className="mb-4">
        <Card.Header as="h5">Sports in League</Card.Header>
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

      {/* League Members */}
      <Card className="mb-4">
        <Card.Header as="h5">League Members</Card.Header>
        <Card.Body>
          {league?.league_members?.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Member ID</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {league.league_members.map((member) => (
                  <tr key={member.id}>
                    <td>{member.member_id}</td>
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

      {/* League Invites */}
      <Card className="mb-4">
        <Card.Header as="h5">League Invites</Card.Header>
        <Card.Body>
          {league?.league_invites?.length > 0 ? (
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
          )}
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
