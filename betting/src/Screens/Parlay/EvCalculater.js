import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";

const EvCalculater = () => {
  const [americanOdds, setAmericanOdds] = useState("");
  const [betAmount, setBetAmount] = useState("");
  const [probability, setProbability] = useState("");
  const [expectedValue, setExpectedValue] = useState("");

  console.log(
    "expectedValue",
    expectedValue,
    "probability",
    probability,
    "betAmount",
    betAmount,
    "americanOdds",
    americanOdds
  );
  useEffect(() => {
    calculateEV();
  }, [americanOdds, betAmount, probability]);

  const convertToDecimal = (americanOdds) => {
    const odds = parseFloat(americanOdds);
    if (odds > 0) {
      return odds / 100 + 1;
    } else {
      return 100 / Math.abs(odds) + 1;
    }
  };

  const calculateEV = () => {
    // if (!americanOdds || !betAmount || !probability) {
    //   Alert.alert("Error", "Please fill all input fields!");
    //   return;
    // }

    const decimalOdds = convertToDecimal(americanOdds);
    const bet = parseFloat(betAmount);
    const winProb = parseFloat(probability) / 100;

    // if (winProb <= 0 || winProb > 1) {
    //   Alert.alert("Error", "Probability must be between 1% and 100%");
    //   return;
    // }
    const profitIfWin = bet * decimalOdds - bet;
    const lossIfLose = bet;
    const ev = winProb * profitIfWin - (1 - winProb) * lossIfLose;
    setExpectedValue(ev.toFixed(2));
  };

  const handleReset = () => {
    setAmericanOdds("");
    setBetAmount("");
    setProbability("");
    setExpectedValue("");
  };

  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <h3 className="text-center fw-bold mb-5">EV Calculator</h3>
          <Form>
            <Row>
              <Col xs={12} md={6}>
                <Form.Group controlId="betAmount">
                  <Form.Label className="mb-0 text-muted fw-bold">
                    My Odds
                  </Form.Label>
                  <Form.Control
                    type="number"
                    value={americanOdds}
                    onChange={(e) => setAmericanOdds(e.target.value)}
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group controlId="betAmount">
                  <Form.Label className="mb-0 text-muted fw-bold">
                    Bet Amount
                  </Form.Label>
                  <Form.Control
                    type="number"
                    value={betAmount}
                    onChange={(e) => setBetAmount(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col xs={12} md={6}>
                <Form.Group controlId="betAmount">
                  <Form.Label className="mb-0 text-muted fw-bold">
                    Probability of winning %
                  </Form.Label>
                  <Form.Control
                    type="number"
                    value={probability}
                    onChange={(e) => setProbability(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Form.Label className="mt-3 text-muted fw-bold text-center">
                Expected Value{" "}
                <span className="fw-bold text-black ms-3">
                  {isNaN(expectedValue) ? "" : expectedValue}
                </span>
              </Form.Label>
            </Row>
            <Button
              variant="#155236"
              style={{ backgroundColor: "#155236", color: "white" }}
              className="mt-4 w-100 mb-4"
              onClick={handleReset}
            >
              RESET
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EvCalculater;
