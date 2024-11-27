import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  InputGroup,
} from "react-bootstrap";
import {
  FaClipboardList,
  FaFutbol,
  FaUsers,
  FaLink,
  FaCalendarAlt,
  FaRegClipboard,
} from "react-icons/fa";
import SportList from "../../JSON/SportList";
import "./createlegue.css";

const sportsLeagues = SportList;
const CreateLeagues = () => {
  const [showAll, setShowAll] = useState(false);
  const [selectedLeagues, setSelectedLeagues] = useState([]);
  const leaguesToShow = showAll ? sportsLeagues : sportsLeagues.slice(0, 10);

  const handleLeagueChange = (league) => {
    if (selectedLeagues.includes(league)) {
      setSelectedLeagues(selectedLeagues.filter((item) => item !== league));
    } else {
      setSelectedLeagues([...selectedLeagues, league]);
    }
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={12}>
          <h5 className="fw-bold">Create League</h5>
          <Card className="mb-4">
            <Card.Body>
              <Form>
                <Form.Group controlId="leagueName">
                  <Form.Label className="fw-bold">League Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter League Name" />
                </Form.Group>

                <Form.Group className="mt-4">
                  <Form.Label className="fw-bold">Select Game Type</Form.Label>
                  <div className="mb-2 mt-2">
                    <Form.Check
                      type="switch"
                      label={<span className="fw-bold ms-3">Free For All</span>}
                      id="freeForAll"
                      className="custom-switch"
                    />
                    <Form.Text className="text-muted">
                      Player with the most units wins the week.
                    </Form.Text>
                  </div>
                  <div>
                    <Form.Check
                      type="switch"
                      label={<span className="fw-bold ms-3">Match Play</span>}
                      id="matchPlay"
                      className="custom-switch"
                    />
                    <Form.Text className="text-muted">
                      1v1 weekly matches. Player with the most wins at the end
                      of the season wins.
                    </Form.Text>
                  </div>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>

          <h5 className="fw-bold">Game Settings</h5>
          <Card className="mb-4">
            <Card.Body>
              <Form>
                <Form.Group controlId="sportsLeagues">
                  <Form.Label className="fw-bold">
                    Select Sports Leagues
                  </Form.Label>
                  <Row>
                    {leaguesToShow?.map((league, index) => (
                      <Col
                        xs={5}
                        md={4}
                        lg={3}
                        key={index}
                        className="m-2 p-1"
                        style={{ boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)" }}
                      >
                        <Form.Check
                          type="checkbox"
                          label={league.title}
                          name="league"
                          id={league?.title?.toLowerCase()}
                          checked={selectedLeagues.includes(league.title)}
                          onChange={() => handleLeagueChange(league.title)}
                          className="custom-checkbox"
                        />
                      </Col>
                    ))}
                  </Row>

                  <Button
                    variant="link"
                    onClick={() => setShowAll(!showAll)}
                    className="mt-3"
                  >
                    {showAll ? "Show Less" : "Show All"}
                  </Button>
                  <div className="mt-3">
                    <strong>Selected Leagues: </strong>
                    {selectedLeagues.join(", ")}
                  </div>
                </Form.Group>

                <Form.Group controlId="matchLength" className="mt-4">
                  <Form.Label className="fw-bold">Match Length</Form.Label>
                  <Form.Control as="select">
                    <option>7 Days</option>
                    <option>14 Days</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="seasonLength" className="mt-4">
                  <Form.Label className="fw-bold">Season Length</Form.Label>
                  <Row>
                    <Col>
                      <InputGroup>
                        <InputGroup.Text>
                          <FaCalendarAlt />
                        </InputGroup.Text>
                        <Form.Control type="date" placeholder="Start Date" />
                      </InputGroup>
                    </Col>
                    <Col>
                      <InputGroup>
                        <InputGroup.Text>
                          <FaCalendarAlt />
                        </InputGroup.Text>
                        <Form.Control type="date" placeholder="End Date" />
                      </InputGroup>
                    </Col>
                  </Row>
                </Form.Group>

                <Form.Group controlId="unitsIssued" className="mt-4">
                  <Form.Label className="fw-bold">Units Issued</Form.Label>
                  <Form.Control as="select">
                    <option>100 Units</option>
                    <option>200 Units</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
          <h5 className="fw-bold">Invite Friends</h5>
          <Card className="mb-4">
            <Card.Body>
              <Form>
                <Form.Group controlId="inviteLink">
                  <Form.Label className="fw-bold">Share Link</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <FaLink />
                    </InputGroup.Text>

                    <Form.Control
                      type="text"
                      readOnly
                      value="joingroup.com/abcdefg/invite"
                      style={{ color: "#007bff", cursor: "pointer" }}
                    />

                    <InputGroup.Text
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        navigator.clipboard.writeText(
                          "joingroup.com/abcdefg/invite"
                        )
                      }
                    >
                      <FaRegClipboard />
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>

                {/* Contacts */}
                <Form.Group controlId="inviteContacts" className="mt-4">
                  <Form.Label className="fw-bold">Contacts</Form.Label>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span
                      className="text-muted fw-bold"
                      style={{ fontSize: "15px" }}
                    >
                      Aaron Centifonte
                    </span>
                    <Button variant="outline-primary" size="sm">
                      Invite
                    </Button>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span
                      className="text-muted fw-bold"
                      style={{ fontSize: "15px" }}
                    >
                      Ben
                    </span>
                    <Button variant="outline-primary" size="sm">
                      Invite
                    </Button>
                  </div>
                </Form.Group>

                <Button
                  variant="#155239"
                  style={{ backgroundColor: "#155239", color: "white" }}
                  className="mt-4"
                >
                  Create League
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateLeagues;
