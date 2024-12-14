import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Dropdown,
  Card,
  ProgressBar,
  Badge,
} from "react-bootstrap";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar, Pie } from "react-chartjs-2";
import { FaArrowUp, FaDollarSign, FaSnowflake } from "react-icons/fa";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const chartData = {
  bettingSuccessRate: {
    labels: ["Wins", "Losses"],
    datasets: [
      {
        label: "Betting Success Rate",
        data: [60, 40],
        backgroundColor: ["#36A2EB", "#FF6384"],
        fill: true,
        borderColor: "rgba(75, 192, 192, 1)",
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
        tension: 0.4,
        barThickness: 120,
        pointRadius: 6,
      },
    ],
  },
  profitLossOverTime: {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Profit/Loss Over Time",
        data: [500, 200, 800, 100, 600, 300],
        borderColor: "#36A2EB",
        backgroundColor: ["#36A2EB", "#FF6384"],
        fill: true,
        borderColor: "rgba(75, 192, 192, 1)",
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
        tension: 0.4,
        barThickness: 120,
        pointRadius: 6,
      },
    ],
  },
  betTypeDistribution: {
    labels: ["Moneyline", "Point Spread", "Over/Under"],
    datasets: [
      {
        fill: true,
        label: "Total Bets",
        data: [50, 30, 20],
        backgroundColor: "#36A2EB",
        borderColor: "#4BC0C0",
        barThickness: 120,
        pointRadius: 6,
        tension: 0.4,
      },
      {
        fill: true,
        label: "Wins",
        data: [30, 20, 18],
        backgroundColor: "#FF6384",
        borderColor: "#4BC0C0",
        barThickness: 120,
        pointRadius: 6,
      },
    ],
  },
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: {
        color: "rgba(220, 220, 220, 0.3)",
      },
      ticks: {
        color: "#4A4A4A",
      },
    },
    y: {
      grid: {
        color: "rgba(220, 220, 220, 0.3)",
      },
      ticks: {
        color: "#4A4A4A",
      },
    },
  },
  plugins: {
    legend: {
      labels: {
        color: "#4A4A4A",
      },
    },
  },
};

const AnalyticsTab = () => {
  const [chartType, setChartType] = useState("Line");
  const [dataType, setDataType] = useState("bettingSuccessRate");

  const handleSelect = (eventKey) => {
    setChartType(eventKey);
  };

  const handleDataTypeSelect = (eventKey) => {
    setDataType(eventKey);
  };

  const renderChart = () => {
    const selectedData = chartData[dataType];
    switch (chartType) {
      case "Line":
        return <Line data={selectedData} options={chartOptions} />;
      case "Bar":
        return <Bar data={selectedData} options={chartOptions} />;
      case "Pie":
        return <Pie data={selectedData} options={chartOptions} />;
      default:
        return <Line data={selectedData} options={chartOptions} />;
    }
  };

  return (
    <Container>
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

      <Row className="justify-content-center">
        <Col xs={12} md={12}>
          <Dropdown onSelect={handleSelect} className="float-end">
            <Dropdown.Toggle
              style={{
                backgroundColor: "#155239",
                borderColor: "#155239",
                color: "white",
              }}
              size="sm"
            >
              Select Chart Type
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item eventKey="Line">Line Chart</Dropdown.Item>
              <Dropdown.Item eventKey="Bar">Bar Chart</Dropdown.Item>
              <Dropdown.Item eventKey="Pie">Pie Chart</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown onSelect={handleDataTypeSelect} className="float-end me-2">
            <Dropdown.Toggle
              style={{
                backgroundColor: "#1d3b48",
                borderColor: "#1d3b48",
                color: "white",
              }}
              size="sm"
            >
              Select Data Type
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="bettingSuccessRate">
                Betting Success Rate
              </Dropdown.Item>
              <Dropdown.Item eventKey="profitLossOverTime">
                Profit/Loss Over Time
              </Dropdown.Item>
              <Dropdown.Item eventKey="betTypeDistribution">
                Bet Type Distribution
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        {/* <Col xs={12} md={6}>
          <Dropdown onSelect={handleDataTypeSelect} className="float-end">
            <Dropdown.Toggle
              style={{
                backgroundColor: "#1d3b48",
                borderColor: "#1d3b48",
                color: "white",
              }}
              size="sm"
            >
              Select Data Type
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="bettingSuccessRate">
                Betting Success Rate
              </Dropdown.Item>
              <Dropdown.Item eventKey="profitLossOverTime">
                Profit/Loss Over Time
              </Dropdown.Item>
              <Dropdown.Item eventKey="betTypeDistribution">
                Bet Type Distribution
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col> */}
      </Row>
      <Row className="justify-content-center mt-4">
        <Col xs={12} md={12}>
          <div
            className="chart-container"
            style={{
              position: "relative",
              width: "100%",
              height: "400px",
            }}
          >
            {renderChart()}
          </div>
        </Col>
      </Row>

      <Row className="justify-content-center mt-5">
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

      <div className="container py-4">
        {/* Favorite Bets Section */}
        <Card
          className="mb-4 shadow-sm"
          style={{ borderRadius: "12px", padding: "20px" }}
        >
          <Card.Body>
            <Card.Title className="mb-3">
              Favorite Bets <small className="text-muted">⚠️</small>
            </Card.Title>
            <ProgressBar
              className="mb-3"
              now={70}
              label="NCAAF"
              variant="success"
            />
            <ProgressBar
              className="mb-3"
              now={50}
              label="N/A"
              variant="secondary"
            />
            <ProgressBar
              className="mb-3"
              now={30}
              label="N/A"
              variant="secondary"
            />

            {/* Bet Categories */}
            <div className="d-flex justify-content-between">
              <small>Spread</small>
              <small>ML</small>
              <small>Total</small>
              <small>Props</small>
              <small>Futures</small>
            </div>
          </Card.Body>
        </Card>

        <Row>
          {/* Cold Streak Section */}
          <Col md={6} className="mb-3">
            <Card
              className="shadow-sm"
              style={{ borderRadius: "12px", padding: "20px" }}
            >
              <Card.Body>
                <div className="d-flex align-items-center">
                  <FaSnowflake size={24} className="me-3" />
                  <div>
                    <h5>Cold Streak</h5>
                    <span className="text-primary">1 day</span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Best Week Section */}
          <Col md={6} className="mb-3">
            <Card
              className="shadow-sm"
              style={{ borderRadius: "12px", padding: "20px" }}
            >
              <Card.Body>
                <div className="d-flex align-items-center">
                  <FaDollarSign size={24} className="me-3" />
                  <div>
                    <h5>Best Week</h5>
                    <div className="text-success">
                      <FaArrowUp /> $2 <small>Oct 14 - Oct 20</small>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Closing Line Value Section */}
        <Card
          className="shadow-sm"
          style={{ borderRadius: "12px", padding: "20px" }}
        >
          <Card.Body>
            <Card.Title className="mb-3">
              Closing Line Value <small className="text-muted">⚠️</small>
            </Card.Title>
            <Row>
              <Col md={6} className="text-center">
                <Badge bg="success" className="mb-2">
                  +CLV Bets
                </Badge>
                <h6>1 Total</h6>
                <span className="text-success">33.33%</span>
              </Col>
              <Col md={6} className="text-center">
                <Badge bg="danger" className="mb-2">
                  -CLV Bets
                </Badge>
                <h6>2 Total</h6>
                <span className="text-danger">66.67%</span>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default AnalyticsTab;
