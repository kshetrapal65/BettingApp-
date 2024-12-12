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
import { FaAd, FaPlus } from "react-icons/fa";

const ParlayCalculater = () => {
  const [betAmount, setBetAmount] = useState(10);
  const [parlayOdds, setParlayOdds] = useState(100);
  const [toWin, setToWinValue] = useState(0);
  const [bets, setBets] = useState([
    { id: 1, odds: "" },
    { id: 2, odds: "" },
    { id: 3, odds: "" },
  ]);
  const [status, setStatus] = useState("parlay");
  const [winAmount, setWinAmount] = useState(0);
  const [wagerAmount, setWagerAmount] = useState(0);
  const [odds, setOdds] = useState(0);

  useEffect(() => {
    if (bets.length > 0) {
      calculatePayout();
    }
  }, [bets, betAmount]);

  useEffect(() => {
    Apply();
  }, [betAmount, odds]);

  const Apply = () => {
    const wager =
      odds < 0 ? (betAmount * 100) / odds : (betAmount * Math.abs(odds)) / 100;
    setWinAmount(wager);
    const bet = Math.abs(Number(wager)) + Number(betAmount);
    setWagerAmount(bet);
  };

  const calculatePayout = () => {
    let totalOdds = 1;
    bets.forEach((bet) => {
      const odds = parseFloat(bet.odds);

      if (!isNaN(odds)) {
        if (odds > 0) {
          totalOdds *= 1 + odds / 100;
        } else if (odds < 0) {
          totalOdds *= 1 + 100 / Math.abs(odds);
        }
      }
    });

    const wager = parseFloat(betAmount) || 0;
    const toWin = (totalOdds - 1) * wager;

    setParlayOdds((totalOdds * 100 - 100).toFixed(2));
    setToWinValue(toWin.toFixed(2));
  };

  const handleAddBet = () => {
    const nextBetId = bets.length + 1;
    const newBet = { id: nextBetId, odds: "" };
    setBets([...bets, newBet]);
  };

  const handleBetChange = (id, value) => {
    setBets(bets.map((bet) => (bet.id === id ? { ...bet, odds: value } : bet)));
  };

  const handleReset = () => {
    setBetAmount(10);
    setParlayOdds(100);
    setToWinValue(0);
    setBets([
      { id: 1, odds: "" },
      { id: 2, odds: "" },
      { id: 3, odds: "" },
    ]);
  };

  const handleResetSingle = () => {
    setOdds(0);
    setWinAmount(0);
    setWagerAmount(0);
  };

  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <h3 className="text-center fw-bold mb-2">Parlay Calculator</h3>
          <h6 className="fw-bold mb-5 text-center text-muted">
            A parlay is a bet that combines multiple selections into a single
            wager that has a payout only when all parts win.
          </h6>
          {status === "parlay" ? (
            <Form>
              <Row>
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

                <Col xs={12} md={6}>
                  <Form.Group controlId="betType">
                    <Form.Label className="mb-0 text-muted fw-bold">
                      Bet Type
                    </Form.Label>
                    <Form.Control
                      as="select"
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="parlay">PARLAY</option>
                      <option value="single">SINGLE BET</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              {bets.map((bet, index) => (
                <Col xs={12} md={6}>
                  <Form.Group key={bet.id} controlId={`bet${bet.id}`}>
                    <Form.Label className="mb-0 mt-2 text-muted fw-bold">
                      Bet {bet.id}
                    </Form.Label>
                    <Form.Control
                      type="number"
                      placeholder={`Enter Bet ${bet.id} Odds`}
                      value={bet.odds}
                      onChange={(e) => handleBetChange(bet.id, e.target.value)}
                    />
                  </Form.Group>
                </Col>
              ))}
              <div className="d-flex align-items-center justify-content-end">
                <Button
                  variant="#155236"
                  style={{ backgroundColor: "#155236", color: "white" }}
                  size="sm"
                  onClick={handleAddBet}
                  className="d-flex align-items-center  mt-3"
                >
                  <FaPlus className="me-2" /> Add Bet
                </Button>
              </div>
              <Row className="mt-3">
                <Col>
                  <InputGroup>
                    <InputGroup.Text className="fw-bold">
                      To Win
                    </InputGroup.Text>
                    <FormControl value={`$ ${toWin}`} readOnly />
                  </InputGroup>
                </Col>
              </Row>

              <Button
                variant="#155236"
                style={{ backgroundColor: "#155236", color: "white" }}
                className="mt-4 w-100"
                onClick={handleReset}
              >
                RESET
              </Button>
            </Form>
          ) : (
            <Form>
              <Row>
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

                <Col xs={12} md={6}>
                  <Form.Group controlId="betType">
                    <Form.Label className="mb-0 text-muted fw-bold">
                      Bet Type
                    </Form.Label>
                    <Form.Control
                      as="select"
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="parlay">PARLAY</option>
                      <option value="single">SINGLE BET</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group controlId="betAmount">
                <Form.Label className="mb-0 mt-2 text-muted fw-bold">
                  Odds
                </Form.Label>
                <Form.Control
                  type="number"
                  value={odds}
                  onChange={(e) => setOdds(e.target.value)}
                />
              </Form.Group>
              <Row className="mt-3">
                <Col>
                  <InputGroup>
                    <InputGroup.Text className="fw-bold">
                      To Win
                    </InputGroup.Text>
                    <FormControl
                      value={`$ ${Math.abs(winAmount)?.toFixed(2)}`}
                      readOnly
                    />
                  </InputGroup>
                </Col>
                <Col>
                  <InputGroup>
                    <InputGroup.Text className="fw-bold">
                      Payout
                    </InputGroup.Text>
                    <FormControl
                      value={`$ ${wagerAmount?.toFixed(2)}`}
                      readOnly
                    />
                  </InputGroup>
                </Col>
              </Row>

              <Button
                variant="#155236"
                style={{ backgroundColor: "#155236", color: "white" }}
                className="mt-4 w-100 mb-4"
                onClick={handleResetSingle}
              >
                RESET
              </Button>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ParlayCalculater;
