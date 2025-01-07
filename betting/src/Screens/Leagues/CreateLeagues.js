import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  InputGroup,
  Modal,
} from "react-bootstrap";
import {
  FaClipboardList,
  FaFutbol,
  FaUsers,
  FaLink,
  FaCalendarAlt,
  FaRegClipboard,
  FaCopy,
  FaRegCopy,
} from "react-icons/fa";
import SportList from "../../JSON/SportList";
import "./createlegue.css";
import { apiCallNew } from "../../Network_Call/apiservices";
import ApiEndPoints from "../../Network_Call/ApiEndPoints";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import ShareableLink from "../../Components/ShareableLink ";
import { FaUber } from "react-icons/fa6";

const sportsLeagues = SportList;
const CreateLeagues = () => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);
  const [selectedLeagues, setSelectedLeagues] = useState([]);
  const [gameType, setGameType] = useState(null);
  const [leagueName, setLeagueName] = useState("");
  const [unit, setUnit] = useState("");
  const [extraUnit, setExtraUnit] = useState("");
  const [matchLength, setMatchLength] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [unitType, setUnitType] = useState("");
  const [winnigPrize, setWinnigPrize] = useState("");
  const [leagueFees, setLeagueFees] = useState("");
  const [load, setLoad] = useState(false);
  const [linkData, setLinkData] = useState(null);
  const [copy, setCopy] = useState(false);
  const [show, setShow] = useState(false);
  const shareUrl = ShareableLink(linkData?.id, linkData?.invite_code);
  const leaguesToShow = showAll ? sportsLeagues : sportsLeagues.slice(0, 10);

  const currentDateTime = new Date().toISOString().slice(0, 16);

  setTimeout(() => {
    setCopy(false);
  }, 2000);

  const handleGameTypeChange = (type) => {
    setGameType(type);
  };

  const handleLeagueChange = (league) => {
    if (selectedLeagues.some((item) => item.title === league.title)) {
      setSelectedLeagues(
        selectedLeagues.filter((item) => item.title !== league.title)
      );
    } else {
      setSelectedLeagues([...selectedLeagues, league]);
    }
  };

  const getFormattedDateTime = () => {
    if (startDate) {
      const localDateTime = new Date(startDate);
      const utcDateTime = new Date(
        localDateTime.getTime() - localDateTime.getTimezoneOffset() * 60000
      ).toISOString();
      return utcDateTime;
    }
    return "";
  };

  const formattedDateTime = getFormattedDateTime();

  const getFormattedEndDateTime = (e) => {
    if (endDate) {
      const localDateTime = new Date(endDate);
      const utcDateTime = new Date(
        localDateTime.getTime() - localDateTime.getTimezoneOffset() * 60000
      ).toISOString();
      return utcDateTime;
    }
    return "";
  };

  const formattedEndDateTime = getFormattedEndDateTime();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", leagueName);
    formData.append("is_paid", gameType);
    formData.append("entry_fee", leagueFees);
    formData.append("units_issued", unit);
    formData.append("units_issued_type", unitType);
    formData.append("match_length", matchLength);
    formData.append("season_start_date", formattedDateTime);
    formData.append("season_end_date", formattedEndDateTime);
    formData.append("winning_prize", winnigPrize);
    formData.append("extra_unit", extraUnit);
    selectedLeagues.forEach((item, index) => {
      formData.append(`sports[${index}][sport_key]`, item.key);
      formData.append(`sports[${index}][sport_name]`, item.title);
      formData.append(`sports[${index}][sport_id]`, item.group);
    });
    try {
      setLoad(true);
      const response = await apiCallNew(
        "post",
        formData,
        ApiEndPoints.CreateLeague
      );
      if (response.success === true) {
        console.log("response", response);
        toast.success(response.msg);
        setLinkData(response.result);
        setShow(true);

        setLoad(false);
        // navigate("/leagues-list");
      } else {
        setLoad(false);
        if (response.result) {
          Object.keys(response.result).forEach((field, index) => {
            response.result[field].forEach((errorMsg, errorIndex) => {
              setTimeout(() => {
                toast.error(`${errorMsg}`);
              }, (index + errorIndex) * 500);
            });
          });
        }
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
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={12}>
          <h5 className="fw-bold">Create League</h5>
          <Card className="mb-4">
            <Card.Body>
              <Form>
                <Form.Group controlId="leagueName">
                  <Form.Label className="fw-bold">League Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter League Name"
                    value={leagueName}
                    onChange={(e) => setLeagueName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mt-4">
                  <Form.Label className="fw-bold">Select Game Type</Form.Label>

                  {/* Free For All Option */}
                  <div className="mb-2 mt-2">
                    <Form.Check
                      type="switch"
                      label={<span className="fw-bold ms-3">Free For All</span>}
                      id="freeForAll"
                      className="custom-switch"
                      checked={gameType === 0}
                      onChange={() => handleGameTypeChange(0)}
                    />
                    <Form.Text className="text-muted">
                      Player with the most units wins the week.
                    </Form.Text>
                  </div>

                  {/* Match Play Option */}
                  <div>
                    <Form.Check
                      type="switch"
                      label={<span className="fw-bold ms-3">Match Play</span>}
                      id="matchPlay"
                      className="custom-switch"
                      checked={gameType === 1}
                      onChange={() => handleGameTypeChange(1)}
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
                  <Row style={{ maxHeight: "350px", overflowY: "auto" }}>
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
                          checked={selectedLeagues.some(
                            (item) => item.title === league.title
                          )}
                          onChange={() => handleLeagueChange(league)}
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
                </Form.Group>
                {gameType === 1 && (
                  <Col md={6}>
                    <Form.Group controlId="matchLength" className="mt-4">
                      <Form.Label className="fw-bold">Match Fees</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter match fees"
                        value={leagueFees}
                        onChange={(e) => setLeagueFees(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                )}
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="matchLength" className="mt-4">
                      <Form.Label className="fw-bold">Match Length</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter match length"
                        value={matchLength}
                        onChange={(e) => setMatchLength(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="unitsIssued" className="mt-4">
                      <Form.Label className="fw-bold">Units </Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter Units "
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group controlId="seasonLength" className="mt-4">
                  <Form.Label className="fw-bold">Season Length</Form.Label>
                  <Row>
                    <Col>
                      <InputGroup>
                        <InputGroup.Text>
                          <FaCalendarAlt />
                        </InputGroup.Text>
                        <Form.Control
                          type="datetime-local"
                          placeholder="Start Date"
                          value={startDate}
                          min={currentDateTime}
                          onChange={(e) => setStartDate(e.target.value)}
                        />
                      </InputGroup>
                    </Col>
                    <Col>
                      <InputGroup>
                        <InputGroup.Text>
                          <FaCalendarAlt />
                        </InputGroup.Text>
                        <Form.Control
                          type="datetime-local"
                          placeholder="End Date"
                          value={endDate}
                          min={currentDateTime}
                          onChange={(e) => setEndDate(e.target.value)}
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                </Form.Group>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="unitsIssued" className="mt-4">
                      <Form.Label className="fw-bold">Units Type</Form.Label>
                      <Form.Select
                        value={unitType}
                        onChange={(e) => setUnitType(e.target.value)}
                      >
                        <option value="">select type</option>
                        <option value="a_day">A day</option>
                        <option value="a_week">A week</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  {unitType && (
                    <Col md={6}>
                      <Form.Group controlId="unitsIssued" className="mt-4">
                        <Form.Label className="fw-bold">
                          Extra Units{" "}
                        </Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Enter Units "
                          value={extraUnit}
                          onChange={(e) => setExtraUnit(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  )}
                </Row>
                <Form.Group controlId="unitsIssued" className="mt-4">
                  <Form.Label className="fw-bold">Winning Prize </Form.Label>
                  <Form.Control
                    type="text"
                    value={winnigPrize}
                    onChange={(e) => setWinnigPrize(e.target.value)}
                  />
                </Form.Group>

                <Button
                  variant="#155239"
                  style={{ backgroundColor: "#155239", color: "white" }}
                  className="mt-4"
                  onClick={handleSubmit}
                >
                  Create League
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Modal
        show={show}
        onHide={() => {
          setShow(false);
          navigate("/leagues-list");
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Share Link</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="inviteLink">
            <Form.Label className="fw-bold">Share Link</Form.Label>
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
          </Form.Group>
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

export default CreateLeagues;
