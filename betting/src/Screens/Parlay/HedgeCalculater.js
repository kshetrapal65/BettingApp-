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

const HedgeCalculater = () => {
  const [myOdds, setMyOdds] = useState("");
  const [hedgeOdds, setHedgeOdds] = useState("");
  const [betAmount, setBetAmount] = useState("");
  const [hedgeAmount, setHedgeAmount] = useState("");
  const [totalPayout, setTotalPayout] = useState("");
  const [hedgeProfit, setHedgeProfit] = useState("");

  useEffect(() => {
    calculateHedge();
  }, [myOdds, hedgeOdds, betAmount]);

  const convertToDecimal = (americanOdds) => {
    const odds = parseFloat(americanOdds);
    if (odds > 0) {
      return odds / 100 + 1;
    } else {
      return 100 / Math.abs(odds) + 1;
    }
  };

  const calculateHedge = () => {
    // if (myOdds >= 100 || hedgeOdds >= 100) {
    //   toast.error("Error", "Please fill all input fields!");
    //   return;
    // }

    // Convert American odds to Decimal odds
    const myDecimalOdds = convertToDecimal(myOdds);
    const hedgeDecimalOdds = convertToDecimal(hedgeOdds);
    const bet = parseFloat(betAmount);

    // Calculate hedge amount
    const hedge = (myDecimalOdds * bet) / hedgeDecimalOdds;

    // Total bet amount
    const totalBet = bet + hedge;

    // Total payout
    const payout = myDecimalOdds * bet;

    // Hedge profit
    const profit = payout - totalBet;

    // Set results
    setHedgeAmount(hedge.toFixed(2));
    setTotalPayout(payout.toFixed(2));
    setHedgeProfit(profit.toFixed(2));
  };

  const handleReset = () => {
    setMyOdds("");
    setHedgeOdds("");
    setBetAmount("");
    setHedgeAmount("");
    setTotalPayout("");
    setHedgeProfit("");
  };

  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <h3 className="text-center fw-bold mb-5">Hedging Calculator</h3>
          <Form>
            <Row>
              <Col xs={12} md={6}>
                <Form.Group controlId="betAmount">
                  <Form.Label className="mb-0 text-muted fw-bold">
                    My Odds
                  </Form.Label>
                  <Form.Control
                    type="number"
                    value={myOdds}
                    onChange={(e) => setMyOdds(e.target.value)}
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
                  <Form.Label className="mb-0 mt-2 text-muted fw-bold">
                    Hedge Odds
                  </Form.Label>
                  <Form.Control
                    type="number"
                    value={hedgeOdds}
                    onChange={(e) => setHedgeOdds(e.target.value)}
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group controlId="betAmount">
                  <Form.Label className="mb-0 mt-2 text-muted fw-bold">
                    Hedge Amount
                  </Form.Label>
                  <Form.Control type="number" value={hedgeAmount} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Form.Label className="mt-3 text-muted fw-bold text-center">
                Total Bet Amount{" "}
                <span className="fw-bold text-black ms-3">
                  {(
                    (Number(betAmount) || 0) + (Number(hedgeAmount) || 0)
                  ).toFixed(2)}
                </span>
              </Form.Label>
            </Row>
            <Row className="mt-3">
              <Col>
                <InputGroup>
                  <InputGroup.Text className="fw-bold">
                    Total Payout
                  </InputGroup.Text>
                  <FormControl
                    readOnly
                    value={
                      isNaN(totalPayout) || totalPayout === null
                        ? ""
                        : totalPayout
                    }
                  />
                </InputGroup>
              </Col>
              <Col>
                <InputGroup>
                  <InputGroup.Text className="fw-bold">
                    Hedge Profit
                  </InputGroup.Text>
                  <FormControl
                    readOnly
                    value={
                      isNaN(hedgeProfit) || hedgeProfit === null
                        ? ""
                        : hedgeProfit
                    }
                  />
                </InputGroup>
              </Col>
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

export default HedgeCalculater;
