import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Badge,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ApiEndPoints from "../../Network_Call/ApiEndPoints";
import { apiCallNew } from "../../Network_Call/apiservices";
import moment from "moment";
import { PulseLoader } from "react-spinners";
import { FaChevronRight } from "react-icons/fa";
import "./createlegue.css";

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
      {leagues.length === 0 && (
        <div className="d-flex justify-content-center align-items-center">
          <h4 className="fw-bold text-muted m-5">No Leagues Found</h4>
        </div>
      )}
      {leagues.map((league, index) => (
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
                      {league.name}
                    </Card.Title>
                  </Col>
                  <Col xs="auto">
                    <Button
                      variant="#155239"
                      size="sm"
                      className="custom-btns d-flex align-items-center"
                      onClick={() =>
                        navigate(
                          `/league-details/${league?.id}/invite/${league?.invite_code}`
                        )
                      }
                    >
                      View League <FaChevronRight className="ms-2" />
                    </Button>
                  </Col>
                </Row>
                <Row className="mt-4">
                  <Col>
                    <p className="text-muted mb-0">
                      <strong>Ends: </strong>{" "}
                      {moment(league.season_end_date).format("l")}
                    </p>
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
