import React, { useCallback, useMemo, useState } from "react";
import {
  FaCalculator,
  FaPercent,
  FaBalanceScale,
  FaCoins,
  FaChartLine,
} from "react-icons/fa";
import { Card, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const UtilitiesTab = () => {
  const navigate = useNavigate();

  return (
    <div>
      {" "}
      <Card
        className="shadow-sm"
        style={{ borderRadius: "12px", padding: "20px" }}
      >
        <Card.Body>
          <Card.Title className="mb-4">Bet Tools</Card.Title>
          <ListGroup variant="flush" className="">
            <ListGroup.Item className="d-flex justify-content-between align-items-center mb-3">
              <div className="d-flex align-items-center">
                <FaCalculator size={24} className="me-3" />
                <div
                  onClick={() => navigate("/odds-calculater")}
                  style={{ cursor: "pointer" }}
                >
                  <strong>Odds Calculator</strong>
                </div>
              </div>
              <span>{">"}</span>
            </ListGroup.Item>

            <ListGroup.Item className="d-flex justify-content-between align-items-center mb-3">
              <div className="d-flex align-items-center">
                <FaPercent size={24} className="me-3" />
                <div
                  onClick={() => navigate("/parlay-calculater")}
                  style={{ cursor: "pointer" }}
                >
                  <strong>Parlay Calculator</strong>
                </div>
              </div>
              <span>{">"}</span>
            </ListGroup.Item>

            <ListGroup.Item className="d-flex justify-content-between align-items-center mb-3">
              <div className="d-flex align-items-center">
                <FaCoins size={24} className="me-3" />
                <div
                  onClick={() => navigate("/hedge-calculater")}
                  style={{ cursor: "pointer" }}
                >
                  <strong>Hedge/Arb Calculator</strong>
                </div>
              </div>
              <span>{">"}</span>
            </ListGroup.Item>

            <ListGroup.Item className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <FaChartLine size={24} className="me-3" />
                <div
                  onClick={() => navigate("/ev-calculater")}
                  style={{ cursor: "pointer" }}
                >
                  <strong>EV Calculator</strong>
                </div>
              </div>
              <span>{">"}</span>
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UtilitiesTab;
