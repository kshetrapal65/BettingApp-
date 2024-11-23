import React, { useState } from "react";
import { Col, Image, Modal, Row } from "react-bootstrap";
import { apiCallNew } from "../../Network_Call/apiservices";
import { PulseLoader } from "react-spinners";
import axios from "axios";
import ApiEndPoints from "../../Network_Call/ApiEndPoints";
import "./recentnew.css";

const RecentNews = () => {
  const [newsData, setNewsData] = React.useState([]);
  const [load, setLoad] = React.useState(false);
  const [selectedUrl, setSelectedUrl] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [iframeError, setIframeError] = useState(false);

  React.useEffect(() => {
    getRecentNews();
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

  // const handleNewsClick = (url) => {
  //   if (url) {
  //     window.location.href = url;
  //   }
  // };
  const handleNewsClick = (url) => {
    if (url) {
      window.open(url, "_blank");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUrl(null);
    setIframeError(false);
  };
  const handleError = () => {
    setIframeError(true);
  };

  const handleLoad = () => {
    setIframeError(false);
  };

  return (
    <>
      {load && (
        <div>
          <PulseLoader loading={load} color="#155239" style={styles.backdrop} />
        </div>
      )}

      <Row className="mt-2 justify-content-around pt-0 p-4">
        <Col className="bg-light p-4 rounded-5" lg={12}>
          <Row>
            <Col>
              <h4 className="fw-bold">Recent Stories</h4>
            </Col>
          </Row>

          <Row className="mt-3 p-3">
            {newsData?.map((item, index) => (
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
                        WebkitLineClamp: 3,
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
      <Modal
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
      </Modal>
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

export default RecentNews;
