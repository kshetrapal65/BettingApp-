import React, { useRef, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Image,
  Modal,
  Row,
  Tab,
  Tabs,
} from "react-bootstrap";
import "./profile.css";
import OverviewTab from "./Overview/OverviewTab";
import AnalyticsTab from "./Analytics/AnalyticsTab";
import UtilitiesTab from "./Utility/UtilitiesTab";
import { useNavigate } from "react-router-dom";
import { apiCallNew } from "../../Network_Call/apiservices";
import ApiEndPoints from "../../Network_Call/ApiEndPoints";
import toast from "react-hot-toast";
import { MdModeEdit } from "react-icons/md";
import { formatCapital } from "../../Components/formatCapitalize";
import { PulseLoader } from "react-spinners";

const Profile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = React.useState({});
  const [load, setLoad] = useState(false);
  const [tabKey, setTabKey] = React.useState("overview");

  React.useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const response = await apiCallNew("get", null, ApiEndPoints.ProfileGet);
      if (response.success === true) {
        setProfileData(response.result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelect = (key) => {
    setTabKey(key);
  };
  return (
    <Container className="my-4">
      {load && (
        <div>
          <PulseLoader loading={load} color="#155239" style={styles.backdrop} />
        </div>
      )}
      <Row className="align-items-center">
        <Col xs={12} className="d-flex align-items-center">
          <Image
            src={profileData?.profile_image}
            roundedCircle
            width="120"
            style={{ backgroundColor: "#ccc", height: "120px" }}
          />
          <div className="ms-5">
            <h5 className="mb-0 fw-bold">{formatCapital(profileData?.name)}</h5>
            <p className="text-muted mt-1">
              Wallet Unit: <strong> {profileData?.wallet?.toFixed(2)}</strong>
            </p>
          </div>
        </Col>
      </Row>
      <Row className="  mb-3 mt-3">
        <Col xs={12}>
          <Tabs
            defaultActiveKey="tip"
            activeKey={tabKey}
            id="profile-tabs"
            className="profile-tab-bar-new mb-3"
            onSelect={handleSelect}
          >
            <Tab eventKey="overview" title="Overview">
              {tabKey == "overview" && (
                <OverviewTab
                  profileData={profileData}
                  getProfile={getProfile}
                />
              )}
            </Tab>
            <Tab eventKey="analysis" title="Analysis">
              <AnalyticsTab />
            </Tab>
            <Tab eventKey="utilities" title="Utilities">
              <UtilitiesTab />
            </Tab>
          </Tabs>
        </Col>
      </Row>
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
export default Profile;
