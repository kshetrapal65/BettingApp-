import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Badge,
  Modal,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ApiEndPoints from "../../Network_Call/ApiEndPoints";
import { apiCallNew } from "../../Network_Call/apiservices";
import moment from "moment";
import { PulseLoader } from "react-spinners";
import { FaChevronRight, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import "./createlegue.css";
import { getUserdata } from "../../Helper/Storage";
import axios from "axios";
import toast from "react-hot-toast";

const LeaguesList = () => {
  const navigate = useNavigate();
  const [leagues, setLeagues] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [load, setLoad] = useState(false);
  const [show, setShow] = useState(false);
  const [id, setid] = useState();
  const [filterData, setFilterData] = useState([]);
  const userData = getUserdata();
  const [formData, setFormData] = useState({
    inputValue: "",
    selectValue: "",
  });

  useEffect(() => {
    getLeagues();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setLoad(true);
      const formdata = new FormData();
      formdata.append("units_issued_type", formData.selectValue);
      formdata.append("units_issued", formData.inputValue);
      const response = await apiCallNew(
        "post",
        formdata,
        ApiEndPoints.UpdateUnit + id
      );
      if (response.success == true) {
        toast.success(response?.msg);
        setShow(false);
        setLoad(false);
        getLeagues();
      } else {
        setLoad(false);
      }
    } catch (error) {
      console.log(error);
      setLoad(false);
    }
  };

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
        ApiEndPoints.LeagueList
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

  const deleteLeague = async (id) => {
    try {
      const response = await apiCallNew(
        "get",
        {},
        ApiEndPoints.DeleteLeague + id
      );
      if (response.success === true) {
        getLeagues();
      }
    } catch (error) {
      console.log(error);
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
            <Button
              variant="#155239"
              className="text-decoration-none fw-bold"
              style={{ color: "#155239" }}
            >
              + New League
            </Button>
          </Link>
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
          <h4 className="fw-bold text-muted m-5">No Leagues Found</h4>
        </div>
      )}

      {filterData?.map((league, index) => {
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
                        {league.name}
                      </Card.Title>
                    </Col>
                    <Col xs="auto" className="d-flex">
                      {userData?.id == league?.user_id && (
                        <Button
                          className="ms-lg-2 mb-2 mb-lg-0 me-1"
                          size="sm"
                          variant="#155239"
                          style={{ backgroundColor: "#155239", color: "white" }}
                          onClick={() => {
                            setShow(true);
                            setid(league.id);
                          }}
                        >
                          Update Units
                        </Button>
                      )}
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
                        <strong>Ends: </strong>{" "}
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
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update units</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Units</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter something"
                name="inputValue"
                value={formData.inputValue}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Select Type</Form.Label>
              <Form.Select
                name="selectValue"
                value={formData.selectValue}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  Choose an option
                </option>
                <option value="a_day">A day</option>
                <option value="a_week">A week</option>
                <option value="all_at_once">All at once</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button
            variant="#155239"
            style={{
              backgroundColor: "#155239",
              border: "none",
              color: "white",
            }}
            onClick={handleSave}
          >
            Save
          </Button>
        </Modal.Footer>
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

export default LeaguesList;
