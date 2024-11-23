import React, { useRef, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  Modal,
  Row,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./profile.css";
import {
  FaEdit,
  FaHistory,
  FaPiggyBank,
  FaRegMehBlank,
  FaUsers,
} from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { RiBankFill, RiLogoutBoxLine } from "react-icons/ri";
import { apiCallNew } from "../../Network_Call/apiservices";
import ApiEndPoints from "../../Network_Call/ApiEndPoints";
import { formatCapital } from "../../Components/formatCapitalize";
import { PulseLoader } from "react-spinners";
import toast from "react-hot-toast";

const Profile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = React.useState({});
  const [bankData, setBankData] = React.useState({});
  const [show, setShow] = useState(false);
  const [showBank, setShowBank] = useState(false);
  const [formDatas, setFormDatas] = useState({
    name: "",
    email: "",
  });
  const [bankForm, setBankForm] = useState({
    bank_name: "",
    account_number: "",
    account_name: "",
  });
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [load, setLoad] = useState(false);
  const inputFile = useRef(null);

  React.useEffect(() => {
    getProfile();
    getBankInfo();
  }, []);

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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleBankClose = () => setShowBank(false);
  const handleBankShow = () => setShowBank(true);

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

  const getProfile = async () => {
    try {
      const response = await apiCallNew("get", null, ApiEndPoints.ProfileGet);
      if (response.success === true) {
        setProfileData(response.result);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
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
  const logout = () => {
    localStorage.removeItem("@userToken");
    navigate("/login");
  };

  return (
    <div>
      {load && (
        <div>
          <PulseLoader loading={load} color="#155239" style={styles.backdrop} />
        </div>
      )}
      <Container className="py-4">
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8}>
            <Card className="profile-card mb-4">
              <Row className="align-items-center p-4">
                {/* <Col
                  xs={4}
                  md={2}
                  className="d-flex justify-content-center"
                  style={{ alignItems: "center" }}
                >
                  <p
                    className="rounded-circle profile-imgss bg-dark"
                    style={{
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      fontSize: "26px",
                      fontWeight: "bold",
                      textAlign: "center",
                      margin: 0,
                    }}
                  >
                    {formatCapital(profileData?.name?.slice(0, 1))}
                  </p>
                </Col> */}
                <Col xs={4} md={2} className="d-flex justify-content-center">
                  <img
                    src={profileData?.profile_image}
                    alt="Profile"
                    className="rounded-circle profile-imgss bg-light"
                  />
                </Col>
                <Col xs={8} md={9}>
                  <h5 className="mb-0 fw-bold">
                    {formatCapital(profileData?.name)}
                  </h5>
                </Col>
              </Row>
              <Card.Body className=" ">
                <div className="account-overview mt-2">
                  <div className="overview-title">Account Overview</div>
                  <div className="overview-options">
                    <div className="option">
                      <span className="option-icon">
                        <FaUsers />
                      </span>
                      <span onClick={handleShow}>Personal Information</span>
                    </div>
                    <div className="option">
                      <span className="option-icon">
                        <RiBankFill />
                      </span>
                      <span onClick={handleBankShow}>Bank Information</span>
                    </div>
                    <div className="option">
                      <span className="option-icon">
                        <FaHistory />
                      </span>
                      <span onClick={() => navigate("/betting-history")}>
                        Betting History
                      </span>
                    </div>
                    <div className="option">
                      <span className="option-icon">
                        <RiLogoutBoxLine />
                      </span>
                      <span onClick={logout}>LogOut</span>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
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
    </div>
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

export default Profile;
