import React, { useState } from "react";
import { Container, Row, Col, Dropdown } from "react-bootstrap";
import {
  Chart as ChartJS,
  CategoryScale, // Add this
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement, // Required for Pie chart
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar, Pie } from "react-chartjs-2";

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
  labels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  datasets: [
    {
      label: "Sales Data",
      data: [65, 30, 59, 80, 30, 56, 55, 40, 50, 15, 78, 40],
      backgroundColor: "rgba(75, 192, 192, 0.6)", // Bar and Pie background color
      borderColor: "rgba(75, 192, 192, 1)", // Border color for all chart types
      borderWidth: 3, // Border width for all chart types
      pointBackgroundColor: "rgba(255, 99, 132, 1)", // Line chart point color
      tension: 0.4, // Smooth line for Line chart
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      grid: {
        color: "rgba(220, 220, 220, 0.3)", // X-axis gridline color
      },
      ticks: {
        color: "#4A4A4A", // X-axis label color
      },
    },
    y: {
      grid: {
        color: "rgba(220, 220, 220, 0.3)", // Y-axis gridline color
      },
      ticks: {
        color: "#4A4A4A", // Y-axis label color
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
const UtilitiesTab = () => {
  const [chartType, setChartType] = useState("Line");

  const handleSelect = (eventKey) => {
    setChartType(eventKey);
  };

  const renderChart = () => {
    switch (chartType) {
      case "Line":
        return <Line data={chartData} options={chartOptions} />;
      case "Bar":
        return <Bar data={chartData} options={chartOptions} />;
      case "Pie":
        return <Pie data={chartData} options={chartOptions} />;
      default:
        return <Line data={chartData} options={chartOptions} />;
    }
  };

  return (
    <Container>
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
    </Container>
  );
};

export default UtilitiesTab;
