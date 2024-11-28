import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ApiEndPoints from "../../Network_Call/ApiEndPoints";
import { apiCallNew } from "../../Network_Call/apiservices";
import moment from "moment";
import { PulseLoader } from "react-spinners";

const LeaguesList = () => {
  const navigate = useNavigate();
  const [leagues, setLeagues] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    getLeagues();
  }, []);

  const getLeagues = async () => {
    try {
      setLoad(true);
      const response = await apiCallNew("post", null, ApiEndPoints.LeagueList);
      if (response.success === true) {
        setLeagues(response.result);
        setLoad(false);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setLoad(false);
    }
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
            <Button variant="link" className="text-decoration-none fw-bold">
              + New League
            </Button>
          </Link>
        </Col>
      </Row>
      <Row className="mt-3 mb-4">
        <Col>
          <Form.Control type="search" placeholder="Search..." />
        </Col>
      </Row>
      {leagues.map((league, index) => (
        <Row key={index} className="mb-3">
          <Col>
            <Card>
              <Card.Body>
                <Row className="justify-content-between">
                  <Col xs={8}>
                    <Card.Title
                      style={{ fontSize: "1.2rem", color: "#343434" }}
                    >
                      {league.name}
                    </Card.Title>
                    {/* <Card.Text>{league.members}</Card.Text> */}
                  </Col>
                  <Col xs="auto" className="text-end">
                    <Button
                      variant="link"
                      className="text-primary"
                      onClick={() => navigate(`/league-details/${league.id}`)}
                    >
                      View League
                    </Button>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col>
                    <small className="">
                      Ends {moment(league.season_end_date).format("l")}{" "}
                    </small>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ))}
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
