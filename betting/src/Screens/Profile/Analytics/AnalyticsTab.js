import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
  ResponsiveContainer,
} from "recharts";
import { Card, Col, Container, Row } from "react-bootstrap";

const data = [
  { name: "Day 1", value: 2 },
  { name: "Day 2", value: 5.5 },
  { name: "Day 3", value: 2 },
  { name: "Day 4", value: 8.5 },
  { name: "Day 5", value: 1.5 },
  { name: "Day 6", value: 5 },
];

const AnalyticsTab = () => {
  return (
    <Container
      fluid
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        fontFamily: "'Arial', sans-serif",
        color: "#333",
        backgroundColor: "#fff",
      }}
    >
      <Row className="justify-content-center mb-2">
        <Col xs={12} sm={6} md={4} className="mb-3">
          <Card className="text-center custom-card-ana">
            <Card.Body>
              <Card.Title className="anal-title">Last 30</Card.Title>
              <Card.Text>
                <span className="amount">$0.63</span>
                <br />
                <span className="record">2-2-0</span>
                <br />
                <span className="roi">ROI -12.67%</span>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} md={4} className="mb-3">
          <Card className="text-center custom-card-ana">
            <Card.Body>
              <Card.Title className="anal-title">All Time</Card.Title>
              <Card.Text>
                <span className="amount">$0.63</span>
                <br />
                <span className="record">2-2-0</span>
                <br />
                <span className="roi">ROI -12.67%</span>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} md={4} className="mb-3">
          <Card className="text-center custom-card-ana">
            <Card.Body>
              <Card.Title className="anal-title">Today</Card.Title>
              <Card.Text>
                <span className="amount">$0.0</span>
                <br />
                <span className="record">0-0-0</span>
                <br />
                <span className="roi">ROI 0%</span>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs={6}>
          <h4 style={{ margin: "0 0 8px", fontSize: "18px" }}>Last 30 Days</h4>
          <div
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#d32f2f",
            }}
          >
            $0.63 <span style={{ fontSize: "14px" }}>▼</span>
          </div>
        </Col>
        <Col xs={6} style={{ textAlign: "right" }}>
          <div style={{ fontSize: "14px", color: "#757575" }}>
            Wins: <span style={{ color: "#d32f2f" }}>50%</span>
          </div>

          <div style={{ fontSize: "14px", color: "#757575" }}>
            ROI: <span style={{ color: "#d32f2f" }}>-12.07%</span>
          </div>

          <div style={{ fontSize: "14px", color: "#757575" }}>
            Record: <span style={{ color: "#d32f2f" }}>2-2-0</span>
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <div style={{ width: "100%", height: "400px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <defs>
                  <linearGradient
                    id="lineGradient"
                    x1="10%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#155239" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#6a994e" stopOpacity={0.8} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#155239"
                  fill="url(#areaGradient)"
                  fillOpacity={0.4}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="url(#lineGradient)"
                  strokeWidth={3}
                  dot={{
                    r: 5,
                    fill: "#155239",
                    stroke: "#fff",
                    strokeWidth: 2,
                  }}
                  activeDot={{
                    r: 8,
                    fill: "#d32f2f",
                    stroke: "#fff",
                    strokeWidth: 3,
                  }}
                  animationDuration={1000}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Col>
      </Row>

      <Row className="justify-content-center mt-4">
        <Col xs={12} sm={6} md={4} className="mb-3">
          <Card className="text-center custom-card-ana">
            <Card.Body>
              <Card.Title className="anal-title">NCAAF</Card.Title>
              <Card.Text>
                <span className="record">2-2-0</span>
                <br />
                <span className="recordss">$0.63</span>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} md={4} className="mb-3">
          <Card className="text-center custom-card-ana">
            <Card.Body>
              <Card.Title className="anal-title">NBA</Card.Title>
              <Card.Text>
                <span className="record">2-2-0</span>
                <br />
                <span className="recordss">$1.70</span>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} md={4} className="mb-3">
          <Card className="text-center custom-card-ana">
            <Card.Body>
              <Card.Title className="anal-title">NFL</Card.Title>
              <Card.Text>
                <span className="record">2-2-0</span>
                <br />
                <span className="recordss">$1.63</span>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AnalyticsTab;
