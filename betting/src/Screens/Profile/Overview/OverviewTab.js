import React, { useRef, useState } from "react";
import { RiBankFill, RiLogoutBoxLine } from "react-icons/ri";
import {
  Card,
  Col,
  Container,
  Row,
  Form,
  Modal,
  Button,
  Image,
  ButtonGroup,
} from "react-bootstrap";
import { FaHeart, FaHistory } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";
import { apiCallNew } from "../../../Network_Call/apiservices";
import ApiEndPoints from "../../../Network_Call/ApiEndPoints";
import toast from "react-hot-toast";
import { PulseLoader } from "react-spinners";

const OverviewTab = ({ profileData, getProfile }) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showBank, setShowBank] = useState(false);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [load, setLoad] = useState(false);
  const inputFile = useRef(null);
  const [bankData, setBankData] = React.useState({});
  const [teams, setTeams] = useState([]);
  const [games, setGames] = useState([]);
  const [formDatas, setFormDatas] = useState({
    name: "",
    email: "",
  });
  const [bankForm, setBankForm] = useState({
    bank_name: "",
    account_number: "",
    account_name: "",
  });
  const [showFavo, setShowFavo] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [favoriteTeams, setFavoriteTeams] = useState([]);
  const [sportGames, setSportGames] = useState("americanfootball_nfl");
  const [activeSport, setActiveSport] = useState(null);

  console.log("games", games, sportGames);
  React.useEffect(() => {
    if (profileData) {
      setFormDatas({
        name: profileData.name || "",
        email: profileData.email || "",
      });
      setImageUrl(profileData.profile_image || "");
    }
    if (bankData) {
      setBankForm({
        bank_name: bankData.bank_name || "",
        account_number: bankData.account_number || "",
        account_name: bankData.account_name || "",
      });
    }
  }, [profileData, bankData]);

  React.useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getSportTeams();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, sportGames]);

  React.useEffect(() => {
    getSportGames();
    getFavoriteTeams();
  }, []);

  const handleButtonClick = (sport) => {
    setActiveSport(sport?.game_name);
    setSportGames(sport?.game_key);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleBankClose = () => setShowBank(false);
  const handleBankShow = () => setShowBank(true);

  const handleFavoClose = () => setShowFavo(false);
  const handleFavoShow = () => setShowFavo(true);

  const handleAddWishlist = async (id) => {
    try {
      const formData = new FormData();
      formData.append("team_id", id);
      setLoad(true);
      const response = await apiCallNew(
        "post",
        formData,
        ApiEndPoints.addToWishlist
      );
      if (response.success === true) {
        toast.success(response.msg);
        getFavoriteTeams();
        setLoad(false);
      } else {
        setLoad(false);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setLoad(false);
    }
  };

  const handleRemoveTeam = async (id) => {
    try {
      setLoad(true);
      const response = await apiCallNew(
        "delete",
        null,
        ApiEndPoints.deleteWishlist + id
      );
      if (response.success === true) {
        toast.success(response.msg);
        getFavoriteTeams();
        setLoad(false);
      } else {
        setLoad(false);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setLoad(false);
    }
  };

  const handleChange = (e) => {
    setFormDatas({
      ...formDatas,
      [e.target.name]: e.target.value,
    });
  };

  const handleBankChange = (e) => {
    setBankForm({
      ...bankForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangess = async (event) => {
    const { files } = event.target;
    if (files.length > 0) {
      const selectedFile = files[0];
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const updateProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("name", formDatas.name);
      formData.append("profile_image", file);
      setLoad(true);
      const response = await apiCallNew(
        "post",
        formData,
        ApiEndPoints.ProfileUpdate
      );
      if (response.success === true) {
        getProfile();
        handleClose();
        setLoad(false);
        toast.success(response.msg);
      } else {
        toast.error(response?.result?.profile_image[0]);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setLoad(false);
    }
  };

  const getBankInfo = async () => {
    try {
      const response = await apiCallNew("get", null, ApiEndPoints.BankInfo);
      if (response.success === true) {
        setBankData(response.result);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const updateBankInfo = async () => {
    try {
      const formData = new FormData();
      formData.append("bank_name", bankForm.bank_name);
      formData.append("account_number", bankForm.account_number);
      formData.append("account_name", bankForm.account_name);
      setLoad(true);
      const response = await apiCallNew(
        "post",
        formData,
        ApiEndPoints.BankUpdate
      );
      if (response.success === true) {
        getBankInfo();
        handleBankClose();
        setLoad(false);
        toast.success(response.msg);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setLoad(false);
    }
  };

  const getSportTeams = async () => {
    try {
      const formData = new FormData();
      formData.append("keyword", searchTerm);
      const response = await apiCallNew(
        "post",
        formData,
        ApiEndPoints.getTeams + sportGames
      );
      if (response.success === true) {
        setTeams(response.result);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const getSportGames = async () => {
    try {
      const response = await apiCallNew("get", null, ApiEndPoints.getGames);
      if (response.success === true) {
        setGames(response.result);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };
  const getFavoriteTeams = async () => {
    try {
      const response = await apiCallNew("get", null, ApiEndPoints.wishlist);
      if (response.success === true) {
        setFavoriteTeams(response.result);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("@userToken");
    navigate("/login");
  };
  return (
    <Container fluid>
      {load && (
        <div>
          <PulseLoader loading={load} color="#155239" style={styles.backdrop} />
        </div>
      )}
      <Card>
        <Card.Body className="p-0">
          <div className="account-overview mt-2">
            <div className="overview-title">Account Overview</div>
            <div className="overview-options">
              <div className="option">
                <span className="option-icon">
                  <FaUsers />
                </span>
                <span className="small fw-bold" onClick={handleShow}>
                  Personal Information
                </span>
              </div>
              <div className="option">
                <span className="option-icon">
                  <RiBankFill />
                </span>
                <span className="small fw-bold" onClick={handleBankShow}>
                  Bank Information
                </span>
              </div>
              <div className="option">
                <span className="option-icon">
                  <FaHeart />
                </span>
                <span className="small fw-bold" onClick={handleFavoShow}>
                  Favorite Teams
                </span>
              </div>
              <div className="option">
                <span className="option-icon">
                  <FaHistory />
                </span>
                <span
                  className="small fw-bold"
                  onClick={() => navigate("/betting-history")}
                >
                  Betting History
                </span>
              </div>
              <div className="option">
                <span className="option-icon">
                  <RiLogoutBoxLine />
                </span>
                <span className="small fw-bold" onClick={logout}>
                  LogOut
                </span>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Your Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="justify-content-center text-center    mb-4">
              <div className="profile-img-wrapper">
                <Image src={imageUrl} roundedCircle className="profile-img" />
                <div className="edit-icon">
                  <MdModeEdit onClick={() => inputFile.current.click()} />
                </div>
                <input
                  type="file"
                  onChange={handleChangess}
                  ref={inputFile}
                  hidden
                />
              </div>
            </Row>

            <Row>
              <Col xs={12}>
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formDatas.name}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group controlId="formEmail" className="mt-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formDatas.email}
                    onChange={handleChange}
                    readOnly
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="#155239"
            style={{ backgroundColor: "#155239", color: "white" }}
            size="sm"
            type="submit"
            onClick={updateProfile}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* bank info modal */}
      <Modal show={showBank} onHide={handleBankClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Your Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col xs={12}>
                <Form.Group controlId="formName">
                  <Form.Label>Bank Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="bank_name"
                    placeholder="Enter your bank name"
                    value={bankForm.bank_name}
                    onChange={handleBankChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group controlId="formEmail" className="mt-3">
                  <Form.Label>Account Holder Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="account_name"
                    placeholder="Enter your account holder name"
                    value={bankForm.account_name}
                    onChange={handleBankChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group controlId="formEmail" className="mt-3">
                  <Form.Label>Account Number</Form.Label>
                  <Form.Control
                    type="number"
                    name="account_number"
                    placeholder="Enter your account number"
                    value={bankForm.account_number}
                    onChange={handleBankChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={handleBankClose}>
            Close
          </Button>
          <Button
            variant="#155239"
            style={{ backgroundColor: "#155239", color: "white" }}
            size="sm"
            type="submit"
            onClick={updateBankInfo}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* favorite teams modal */}
      <Modal show={showFavo} onHide={handleFavoClose} centered size="lg">
        {load && (
          <div>
            <PulseLoader
              loading={load}
              color="#155239"
              style={styles.backdrop}
            />
          </div>
        )}
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Favorite Teams</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="searchTeam">
              <Form.Control
                type="text"
                placeholder="Search for Team"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>
            <Row>
              <Col xs={12}>
                <div className="scroll-containersss">
                  {games?.map((sport) => (
                    <Button
                      key={sport.id}
                      variant="#155239"
                      size="sm"
                      className={`sbtn ${
                        activeSport === sport?.game_name ? "active" : ""
                      }`}
                      onClick={() => handleButtonClick(sport)}
                    >
                      {sport?.game_name}
                    </Button>
                  ))}
                </div>
              </Col>
            </Row>
            <Row className="my-3">
              <Col xs={12} md={6}>
                <h5 className="fw-bold text-muted">Available Teams</h5>
                <div
                  className="team-list"
                  style={{
                    maxHeight: "280px",
                    overflowY: "auto",
                  }}
                >
                  {teams.map((team) => (
                    <div
                      key={team.id}
                      className="d-flex justify-content-between my-2"
                      style={{ margin: "0px 8px" }}
                    >
                      <span>
                        <span className="fw-bold"> {team.team_name}</span>
                      </span>
                      {team?.team_name && (
                        <Button
                          variant="#155239"
                          onClick={() => handleAddWishlist(team.id)}
                          size="sm"
                          style={{ backgroundColor: "#155239", color: "white" }}
                        >
                          Add
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </Col>
              <Col xs={12} md={6}>
                <h5 className="fw-bold text-muted">My Favorite Teams</h5>
                <div
                  className="team-list"
                  style={{
                    maxHeight: "280px",
                    overflowY: "auto",
                  }}
                >
                  {favoriteTeams.map((team) => (
                    <div
                      key={team.id}
                      className="d-flex justify-content-between my-2"
                      style={{ margin: "0px 8px" }}
                    >
                      <span className="fw-bold">{team.team_name}</span>
                      <Button
                        variant="#155239"
                        onClick={() => handleRemoveTeam(team.wishlist_id)}
                        size="sm"
                        style={{
                          border: "1px solid #155239",
                          color: "#155239",
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              </Col>
            </Row>
          </Form>
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

const sportsss = [
  { id: 1, name: "Chicago Bears", league: "NFL" },
  { id: 2, name: "Golden State Warriors", league: "NBA" },
  { id: 3, name: "Los Angeles Lakers", league: "NBA" },
  { id: 4, name: "New York Yankees", league: "MLB" },
  { id: 5, name: "New England Patriots", league: "NFL" },
  { id: 6, name: "San Francisco 49ers", league: "NFL" },
  { id: 7, name: "Dallas Cowboys", league: "NFL" },
  { id: 8, name: "Boston Red Sox", league: "MLB" },
  { id: 9, name: "Miami Heat", league: "NBA" },
  { id: 10, name: "Houston Astros", league: "MLB" },
];

export default OverviewTab;
