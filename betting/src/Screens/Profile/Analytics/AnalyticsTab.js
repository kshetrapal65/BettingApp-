import React, { useEffect, useState } from "react";
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
import { apiCallNew } from "../../../Network_Call/apiservices";
import ApiEndPoints from "../../../Network_Call/ApiEndPoints";

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
        // stepSize: 1,
        color: "#4A4A4A",
      },
      beginAtZero: true,
      min: 0,
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
  const [analyticsData, setAnalyticsData] = useState({});
  const [chartType, setChartType] = useState("Line");
  const [dataType, setDataType] = useState("bettingSuccessRate");
  const [status, setStatus] = useState(1);

  console.log("analyticsData", analyticsData);
  // month wise data
  const monthBets = analyticsData?.year_month_bets;
  const months = monthBets?.map((entry) => entry.month_name);
  const winCounts = monthBets?.map((entry) => Number(entry.win_count));
  const lossCounts = monthBets?.map((entry) => Number(entry.loss_count));

  // win or loss
  const betWin = analyticsData?.overoll_win_loss?.bet_win;
  const betLoss = analyticsData?.overoll_win_loss?.bet_loss;
  const betTie = analyticsData?.overoll_win_loss?.bet_tie;
  // market wise
  const marketLabels = analyticsData?.markets_list?.map(
    (item) => item.market_key
  );
  const totalBets = analyticsData?.markets_list?.map((item) =>
    Number(item.total_count)
  );
  const wins = analyticsData?.markets_list?.map((item) =>
    Number(item.win_count)
  );
  // favorite bet
  const getTotalBetsBySport = (bets) => {
    const betCounts = {};

    bets?.forEach((bet) => {
      if (betCounts[bet.sport_name]) {
        betCounts[bet.sport_name] += bet.win_bet_count;
      } else {
        betCounts[bet.sport_name] = bet.win_bet_count;
      }
    });

    return Object.entries(betCounts).map(([sport_name, win_bet_count]) => ({
      sport_name,
      win_bet_count,
    }));
  };

  const sortedBets = getTotalBetsBySport(analyticsData?.favorite_bet).sort(
    (a, b) => b.win_bet_count - a.win_bet_count
  );
  const getColorByIndex = (index) => {
    const colors = ["#28a745", "#FF6384", "#FFCE56"];
    return colors[index] || "#36A2EB";
  };

  useEffect(() => {
    getAnalyticsData();
  }, []);

  const handleSelect = (eventKey) => {
    setChartType(eventKey);
  };

  const handleDataTypeSelect = (eventKey) => {
    setDataType(eventKey);
  };

  const chartData = {
    bettingSuccessRate: {
      labels: ["Wins", "Losses", "Ties"],
      datasets: [
        {
          label: "Betting Success Rate",
          data: [betWin, betLoss, betTie],
          backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
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
      labels: months,
      datasets: [
        {
          label: "Win Count",
          data: winCounts,
          borderColor: "#36A2EB",
          backgroundColor: ["#36A2EB", "#FF6384"],
          fill: true,
          tension: 0.4,
          pointRadius: 6,
        },
        {
          label: "Loss Count",
          data: lossCounts,
          borderColor: "#FF6384",
          backgroundColor: ["#FF6384", "#FF6384"],
          fill: true,
          tension: 0.4,
          pointRadius: 6,
        },
      ],
    },
    betTypeDistribution: {
      labels: marketLabels,
      datasets: [
        {
          fill: true,
          label: "Total Bets",
          data: totalBets,
          backgroundColor: "#36A2EB",
          borderColor: "#4BC0C0",
          barThickness: 120,
          pointRadius: 6,
          tension: 0.4,
        },
        {
          fill: true,
          label: "Wins",
          data: wins,
          backgroundColor: "#FF6384",
          borderColor: "#4BC0C0",
          barThickness: 120,
          pointRadius: 6,
        },
      ],
    },
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

  const getAnalyticsData = async () => {
    try {
      const response = await apiCallNew(
        "post",
        null,
        ApiEndPoints.UserAnalysis
      );
      if (response.success === true) {
        setAnalyticsData(response.result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mb-2">
        <Col xs={12} sm={6} md={4} className="mb-3">
          <Card className="text-center custom-card-ana">
            <Card.Body
              onClick={() => setStatus(1)}
              style={{ cursor: "pointer" }}
            >
              <Card.Title className="anal-title">Last 30</Card.Title>
              <Card.Text>
                <span className="amount">$0.63</span>
                <br />
                <span className="record">
                  {analyticsData?.last_30_days?.bet_total}-
                  {analyticsData?.last_30_days?.bet_win}-
                  {analyticsData?.last_30_days?.bet_loss}
                </span>
                <br />
                <span className="roi">
                  WIN{" "}
                  {analyticsData?.last_30_days?.bet_win_percentage?.toFixed(2)}%
                </span>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} md={4} className="mb-3">
          <Card className="text-center custom-card-ana">
            <Card.Body
              onClick={() => setStatus(0)}
              style={{ cursor: "pointer" }}
            >
              <Card.Title className="anal-title">Today</Card.Title>
              <Card.Text>
                <span className="amount">$0.0</span>
                <br />
                <span className="record">
                  {" "}
                  {analyticsData?.today_data?.bet_total} -{" "}
                  {analyticsData?.today_data?.bet_win} -{" "}
                  {analyticsData?.today_data?.bet_loss}
                </span>
                <br />
                <span className="roi">
                  WIN{" "}
                  {analyticsData?.today_data?.bet_win_percentage?.toFixed(2)}%
                </span>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {status === 1 ? (
        <Row className="mb-3">
          <Col xs={6}>
            <h4 style={{ margin: "0 0 8px", fontSize: "18px" }}>
              Last 30 Days
            </h4>
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
            {/* <div style={{ fontSize: "14px", color: "#757575" }}>
            Wins: <span style={{ color: "#d32f2f" }}>50%</span>
          </div> */}

            <div style={{ fontSize: "14px", color: "#757575" }}>
              WIN:{" "}
              <span style={{ color: "#d32f2f" }}>
                {analyticsData?.last_30_days?.bet_win_percentage?.toFixed(2)}%
              </span>
            </div>

            <div style={{ fontSize: "14px", color: "#757575" }}>
              Record:{" "}
              <span style={{ color: "#d32f2f" }}>
                {analyticsData?.last_30_days?.bet_total}-
                {analyticsData?.last_30_days?.bet_win}-
                {analyticsData?.last_30_days?.bet_loss}
              </span>
            </div>
          </Col>
        </Row>
      ) : (
        <Row className="mb-3">
          <Col xs={6}>
            <h4 style={{ margin: "0 0 8px", fontSize: "18px" }}>Today</h4>
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
              WIN:{" "}
              <span style={{ color: "#d32f2f" }}>
                {analyticsData?.today_data?.bet_win_percentage?.toFixed(2)}%
              </span>
            </div>

            <div style={{ fontSize: "14px", color: "#757575" }}>
              Record:{" "}
              <span style={{ color: "#d32f2f" }}>
                {analyticsData?.today_data?.bet_total}-
                {analyticsData?.today_data?.bet_win}-
                {analyticsData?.today_data?.bet_loss}
              </span>
            </div>
          </Col>
        </Row>
      )}

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

      <Row className="mt-4  bg-light rounded-2">
        <Col lg={12}>
          <div
            style={{
              display: "flex",
              gap: "15px",
              overflowX: "scroll",
              overflowY: "hidden",
              padding: "10px",
              whiteSpace: "nowrap",
            }}
          >
            {analyticsData?.sports_list?.map((item) => (
              <Col xs={12} sm={6} md={4} className="mb-3">
                <Card className="text-center custom-card-ana">
                  <Card.Body>
                    <Card.Title className="anal-title">
                      {item.sport_name}
                    </Card.Title>
                    <Card.Text>
                      <span className="record">
                        {item?.roi?.bet_total}-{item?.roi?.bet_win}-
                        {item?.roi?.bet_loss}
                      </span>
                      <br />
                      <span className="recordss">
                        Win:{item?.roi?.bet_win_percentage}%
                      </span>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </div>
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
            {sortedBets.map((bet, index) => (
              <ProgressBar
                key={index}
                className="mb-3"
                // now={
                //   (bet.win_bet_count / analyticsData?.favorite_bet?.length) *
                //   100
                // }
              >
                <ProgressBar
                  label={bet.sport_name}
                  now={
                    (bet.win_bet_count / analyticsData?.favorite_bet?.length) *
                    100
                  }
                  style={{ backgroundColor: getColorByIndex(index) }}
                />
              </ProgressBar>
            ))}

            <div className="d-flex justify-content-between">
              <small>
                <span
                  style={{
                    backgroundColor: getColorByIndex(0),
                    color: getColorByIndex(0),
                    borderRadius: "50%",
                  }}
                >
                  00
                </span>
                {sortedBets[0]?.sport_name || "Spread"}
              </small>
              <small className="align-items-center">
                <span
                  style={{
                    backgroundColor: getColorByIndex(1),
                    color: getColorByIndex(1),
                    borderRadius: "50%",
                  }}
                >
                  00
                </span>
                {sortedBets[1]?.sport_name || "MoneyLine"}
              </small>
              <small>
                <span
                  style={{
                    backgroundColor: getColorByIndex(2),
                    color: getColorByIndex(2),
                    borderRadius: "50%",
                  }}
                >
                  00
                </span>
                {sortedBets[2]?.sport_name || "Total"}
              </small>
            </div>
          </Card.Body>
        </Card>

        {/* <Row> 
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
        </Card> */}
      </div>
    </Container>
  );
};

export default AnalyticsTab;
