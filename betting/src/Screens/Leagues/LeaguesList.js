import React from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const leagues = [
  {
    name: "The boys",
    members: "Layne, Ben, Bailey and 3 more",
    ends: "2/19/2024",
  },
  { name: "Baseball League", members: "Josh and Layne", ends: "1/11/2024" },
  {
    name: "One Day season",
    members: "Ben, Layne, Phil and 10 more",
    ends: "1/11/2024",
  },
  {
    name: "The boys",
    members: "Ben, Layne, Phil and 10 more",
    ends: "1/11/2024",
  },
  {
    name: "Season One",
    members: "Ben, Layne, Phil and 10 more",
    ends: "1/11/2024",
  },
];
const LeaguesList = () => {
  const navigate = useNavigate();

  return (
    <Container>
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
                    <Button variant="link" className="text-primary">
                      View League
                    </Button>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col>
                    <small className="">Ends {league.ends}</small>
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

export default LeaguesList;
