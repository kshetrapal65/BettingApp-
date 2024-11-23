import React, { useState } from "react";
import { Button, Col, Image, Modal, Row } from "react-bootstrap";
import { apiCallNew } from "../Network_Call/apiservices";
import { PulseLoader } from "react-spinners";
import { Link } from "react-router-dom";
import axios from "axios";
import ApiEndPoints from "../Network_Call/ApiEndPoints";

const RecentStory = () => {
  const [newsData, setNewsData] = React.useState([]);
  const [load, setLoad] = React.useState(false);
  const [selectedUrl, setSelectedUrl] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const [loading, setLoading] = useState(true);

  const league = "americanfootball_cfl";

  React.useEffect(() => {
    getRecentNews();
    getTeams();
  }, []);

  const getRecentNews = async () => {
    try {
      setLoad(true);

      const response = await axios.post(ApiEndPoints.GetNews);

      if (response?.data?.success == true) {
        setNewsData(response?.data?.result?.articles);
      } else {
        console.log("Failed to fetch news:", response.statusText);
      }

      setLoad(false);
    } catch (error) {
      console.log("Error fetching news:", error);
      setLoad(false);
    }
  };
  const getTeams = async () => {
    try {
      const response = await axios.get(
        `https://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?l=${league}`
      );
      if (response.data.teams) {
        console.log("getteam", response.data.teams);
        return response.data.teams.map((team) => ({
          name: team.strTeam,
          logo: team.strTeamBadge,
        }));
      } else {
        console.log("No teams found");
      }
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  const handleNewsClick = (url) => {
    if (url) {
      window.open(url, "_blank");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUrl(null);
    setIframeError(false);
    setLoading(true);
  };
  const handleError = () => {
    setLoading(false);
    setIframeError(true);
  };

  const handleLoad = () => {
    setLoading(false);
    setIframeError(false);
  };

  return (
    <>
      {load && (
        <div>
          <PulseLoader loading={load} color="#155239" style={styles.backdrop} />
        </div>
      )}

      <Row className="mt-5 justify-content-around  ">
        <Col className="bg-light p-4 rounded-5" lg={12}>
          <Row>
            <Col>
              <h5 className="fw-bold">Recent Stories</h5>
            </Col>
            <Col className="text-end">
              <h5 className="text-primary">
                <Link to="/recent-news">
                  <span style={{ cursor: "pointer", fontSize: "15px" }}>
                    See All
                  </span>
                </Link>
              </h5>
            </Col>
          </Row>

          <Row className="mt-3 p-3">
            {newsData?.slice(0, 6)?.map((item, index) => (
              <Col lg={6} md={6} sm={12} className="d-flex" key={index}>
                <div
                  className="d-flex mb-3"
                  style={{ width: "100%", cursor: "pointer" }}
                  onClick={() => handleNewsClick(item.url)}
                >
                  <div style={{ flexShrink: 0, width: "120px" }}>
                    <Image
                      style={{
                        width: "100%",
                        height: "auto",
                        objectFit: "cover",
                        aspectRatio: "1/1",
                        borderRadius: "18px",
                      }}
                      src={item.urlToImage}
                    />
                  </div>
                  <div className="d-flex flex-column ms-3" style={{ flex: 1 }}>
                    <div className="title-container">
                      <h5 className="titless">{item.title}</h5>
                    </div>
                    <p
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#6c757d",
                      }}
                    >
                      {item.description}
                    </p>
                    <p style={{ fontSize: "12px" }} className="text-muted">
                      {new Date(item.publishedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Col>
        <Col className="  text-end" lg={4}></Col>
      </Row>
      {/* <Modal
        show={showModal}
        onHide={handleCloseModal}
        size="lg"
        fullscreen
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          {iframeError ? (
            <div>
              <h5>Unable to load the content</h5>
              <p>
                The content cannot be displayed here. Please{" "}
                <a href={selectedUrl} target="_blank" rel="noopener noreferrer">
                  click here to view the article in a new tab
                </a>
                .
              </p>
            </div>
          ) : (
            <iframe
              src={selectedUrl}
              style={{ width: "100%", height: "85vh", border: "none" }}
              onError={handleError}
              onLoad={handleLoad}
              title="News Article"
            />
          )}
        </Modal.Body>
      </Modal> */}
      {/* <Row className="mt-5 justify-content-around  ">
        <Col className="bg-light p-4 rounded-5" lg={12}>
          <Row>
            <Col>
              <h5>Recent Stories</h5>
            </Col>
            <Col className="text-end">
              <h5 className="text-primary">
                <span style={{ cursor: "pointer" }}>See All</span>
              </h5>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col lg={4} className="d-flex ">
              <div className="me-3">
                <Image
                  style={{
                    maxWidth: "100%",
                    objectFit: "cover",
                    aspectRatio: "1",
                    borderRadius: "18px",
                  }}
                  src="https://images.actionnetwork.com/133x117/blog/2024/10/NFL-Pass-or-Play-Week-8.webp"
                />
              </div>
              <div className="d-flex-column">
                <h5 className="">NFL</h5>
                <h6>NFL NFL Picks, Predictions Week 8: Expert</h6>
                <p>Jacob Wayne • 4 hours ago</p>
              </div>
            </Col>
            <Col lg={4} className="d-flex">
              <div className="me-3">
                <Image
                  style={{
                    maxWidth: "100%",
                    objectFit: "cover",
                    aspectRatio: "1",
                    borderRadius: "18px",
                  }}
                  src="https://images.actionnetwork.com/133x117/blog/2024/10/nfl-luck-rankings-picks.webp"
                />
              </div>
              <div className="d-flex-column">
                <h5 className="">NFL</h5>
                <h6>NFL NFL Picks, Predictions Week 8: Expert</h6>
                <p>Jacob Wayne • 4 hours ago</p>
              </div>
            </Col>
            <Col lg={4} className="d-flex">
              <div className="me-3">
                <Image
                  style={{
                    maxWidth: "100%",
                    objectFit: "cover",
                    aspectRatio: "1",
                    borderRadius: "18px",
                  }}
                  src="https://images.actionnetwork.com/133x117/blog/2024/10/juan-soto-2.webp"
                />
              </div>
              <div className="d-flex-column">
                <h5 className="">NFL</h5>
                <h6>NFL NFL Picks, Predictions Week 8: Expert</h6>
                <p>Jacob Wayne • 4 hours ago</p>
              </div>
            </Col>
            <Col lg={4} className="d-flex">
              <div className="me-3">
                <Image
                  style={{
                    maxWidth: "100%",
                    objectFit: "cover",
                    aspectRatio: "1",
                    borderRadius: "18px",
                  }}
                  src="https://images.actionnetwork.com/133x117/blog/2024/10/vikings-vs-rams-parlay.webp"
                />
              </div>
              <div className="d-flex-column">
                <h5 className="">NFL</h5>
                <h6>NFL NFL Picks, Predictions Week 8: Expert</h6>
                <p>Jacob Wayne • 4 hours ago</p>
              </div>
            </Col>
            <Col lg={4} className="d-flex">
              <div className="me-3">
                <Image
                  style={{
                    maxWidth: "100%",
                    objectFit: "cover",
                    aspectRatio: "1",
                    borderRadius: "18px",
                  }}
                  src="https://images.actionnetwork.com/133x117/blog/2024/10/vikings-vs-rams-parlay.webp"
                />
              </div>
              <div className="d-flex-column">
                <h5 className="">NFL</h5>
                <h6>NFL NFL Picks, Predictions Week 8: Expert</h6>
                <p>Jacob Wayne • 4 hours ago</p>
              </div>
            </Col>
            <Col lg={4} className="d-flex">
              <div className="me-3">
                <Image
                  style={{
                    maxWidth: "100%",
                    objectFit: "cover",
                    aspectRatio: "1",
                    borderRadius: "18px",
                  }}
                  src="https://images.actionnetwork.com/133x117/blog/2024/10/vikings-vs-rams-parlay.webp"
                />
              </div>
              <div className="d-flex-column">
                <h5 className="">NFL</h5>
                <h6>NFL NFL Picks, Predictions Week 8: Expert</h6>
                <p>Jacob Wayne • 4 hours ago</p>
              </div>
            </Col>
          </Row>
        </Col>
        <Col className="  text-end" lg={4}></Col>
      </Row> */}
    </>
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

export default RecentStory;
