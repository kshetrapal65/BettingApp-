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
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { apiCallNew } from "../../Network_Call/apiservices";
import ApiEndPoints from "../../Network_Call/ApiEndPoints";
import { PulseLoader } from "react-spinners";
import { formatCapital } from "../../Components/formatCapitalize";
import { FaChevronRight } from "react-icons/fa";
import { getUserdata } from "../../Helper/Storage";

const ChallangesList = () => {
  const navigate = useNavigate();
  const userData = getUserdata();
  const [leagues, setLeagues] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [load, setLoad] = useState(false);
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    getLeagues();
  }, []);

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);

    const searchData = leagues?.filter((item) => {
      return item.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setFilterData(searchData);
  };

  const getLeagues = async () => {
    const payload = {
      page: 0,
    };
    try {
      setLoad(true);
      const response = await apiCallNew(
        "post",
        payload,
        ApiEndPoints.GlobalLeagues
      );
      if (response.success === true) {
        setLeagues(response.result);
        setFilterData(response.result);
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
          <h4 className="fw-bold">Challenges</h4>
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

      {filterData?.map((league, index) => {
        const findInviteUser = league?.league_members?.find(
          (item) => item.member_id === userData?.id
        );
        const startDate = moment(league?.season_start_date).format(
          "YYYY-MM-DD"
        );
        const currentDate = moment(new Date()).format("YYYY-MM-DD");
        const endDate = moment(league?.season_end_date).format("YYYY-MM-DD");
        const permit =
          currentDate < startDate
            ? "Upcoming"
            : currentDate > endDate
            ? "Completed"
            : "Ongoing";
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
                      </Card.Title>
                    </Col>
                    <Col xs="auto" className="d-flex">
                      {findInviteUser ? (
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
                      )}

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
                        {permit}
                      </p>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        );
      })}
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
