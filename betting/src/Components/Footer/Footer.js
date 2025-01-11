import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import "./Footer.css";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer mt-auto py-4 bg-dark text-white">
      <Container>
        <Row className="">
          <Image
            // src={Images.logo}
            alt="Company Logo"
            className="img-fluid mb-4"
            style={{ width: "180px" }}
          />
        </Row>
        <Row className="">
          {/* Company Section */}
          <Col md={3} xs={6} className="mb-3">
            <h6 className="font-weight-bold text-white">Company</h6>
            <ul className="list-unstyled">
              <li>
                <Link to="/">
                  {" "}
                  <a href="#">Home</a>
                </Link>
              </li>
              <li>
                <a href="#">About us</a>
              </li>
              <li>
                <Link to="/term-and-condition">
                  <a href="#">Terms & conditions</a>
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy">
                  <a href="#">Privacy policy</a>
                </Link>
              </li>
            </ul>
          </Col>

          {/* For Customers Section */}
          <Col md={3} xs={6} className="mb-3">
            <h6 className="font-weight-bold text-white">Sports</h6>
            <ul className="list-unstyled">
              <li>
                <a href="#">NFL Picks & Analysis</a>
              </li>
              <li>
                <a href="#">NBA Picks & Analysis</a>
              </li>

              <li>
                <Link to="/contact-us">
                  <a href="#">Contact us</a>
                </Link>
              </li>
            </ul>
          </Col>

          {/* For Partners Section */}
          <Col md={3} xs={6} className="mb-3">
            <h6 className="font-weight-bold text-white">Sports Betting Odds</h6>
            <ul className="list-unstyled">
              <li>
                <a href="#">NFL Odds & Betting Lines</a>
              </li>
              <li>
                <a href="#">NBA Odds & Betting Lines</a>
              </li>

              <li>
                <a href="#">NHL Odds & Betting Lines</a>
              </li>
            </ul>
          </Col>

          <Col md={3} xs={6} className=" text-md-left mb-3">
            <h6 className="font-weight-bold text-white">Social links</h6>
            <div className="d-flex justify-content-start justify-content-md-start mb-3 gap-3">
              <a href="#" className="text-white mr-3">
                <FaXTwitter size={25} />
              </a>
              <a href="#" className="text-white mr-3">
                <FaFacebook size={25} />
              </a>
              <a href="#" className="text-white mr-3">
                <FaInstagram size={25} />
              </a>
              <a href="#" className="text-white">
                <FaLinkedin size={25} />
              </a>
            </div>
          </Col>
        </Row>
        <Row className="pt-4 border-top mt-4">
          <Col className="text-center">
            <small>
              © Copyright 2024 Action. All rights reserved. | CIN:
              U74140DL8585PTC274413
            </small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
