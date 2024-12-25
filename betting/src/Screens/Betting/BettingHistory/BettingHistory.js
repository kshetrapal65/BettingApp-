import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Pagination,
  Row,
  Table,
} from "react-bootstrap";
import { apiCallNew } from "../../../Network_Call/apiservices";
import ApiEndPoints from "../../../Network_Call/ApiEndPoints";
import { PulseLoader } from "react-spinners";

const BettingHistory = () => {
  const [betHistoryData, setBetHistoryData] = useState([]);
  const [load, setLoad] = useState(false);
  const [page, setPage] = useState(1);
  const [event, setEvent] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const itemPerPage = 20;

  useEffect(() => {
    getBetHistory(page);
  }, [page]);

  const checkSpreadBet = (bet, scores) => {
    const { sport_key, outcomes_odds_point1, sport_id } = bet;

    const match = scores.find((score) => score.id === sport_id);
    if (match?.completed) {
      return true;
    } else {
      return false;
    }

    // if (!match) return "Pending";
    // if (!match.completed || !match.scores) return "Pending";

    // const homeScore = parseInt(
    //   match.scores.find((s) => s.name === match.home_team).score
    // );
    // const awayScore = parseInt(
    //   match.scores.find((s) => s.name === match.away_team).score
    // );

    // const pointSpread = outcomes_odds_point1;

    // if (match.home_team === bet.sport_name) {
    //   return homeScore - awayScore > pointSpread ? "Win" : "Loss";
    // } else if (match.away_team === bet.sport_name) {
    //   return awayScore - homeScore > pointSpread ? "Win" : "Loss";
    // }

    // return "Loss";
  };

  const checkTotalBet = (bet, scores) => {
    const { sport_key, outcomes_odds_point1, sport_id } = bet;

    const match = scores.find((score) => score.id === sport_id);

    if (!match) return "Pending"; // No match found
    if (!match.completed || !match.scores) return "Pending"; // Match not completed or scores unavailable

    const homeScore = parseInt(
      match.scores.find((s) => s.name === match.home_team).score
    );
    const awayScore = parseInt(
      match.scores.find((s) => s.name === match.away_team).score
    );

    const totalPoints = homeScore + awayScore;

    return totalPoints > outcomes_odds_point1 ? "Win" : "Loss";
  };
  const checkMoneylineBet = (bet, scores) => {
    const { sport_key, sport_name, sport_id } = bet;

    // Find the matching score data
    const match = scores.find((score) => score.id === sport_id);

    if (!match) return "Pending"; // No match found
    if (!match.completed || !match.scores) return "Pending"; // Match not completed or scores unavailable

    const homeScore = parseInt(
      match.scores.find((s) => s.name === match.home_team).score
    );
    const awayScore = parseInt(
      match.scores.find((s) => s.name === match.away_team).score
    );

    // Moneyline logic (compare scores)
    if (match.home_team === sport_name) {
      return homeScore > awayScore ? "Win" : "Loss";
    } else if (match.away_team === sport_name) {
      return awayScore > homeScore ? "Win" : "Loss";
    }

    return "Loss"; // Fallback
  };

  const getBetHistory = async (page) => {
    const formData = new FormData();
    formData.append("page", page - 1);
    try {
      setLoad(true);
      const response = await apiCallNew(
        "post",
        formData,
        ApiEndPoints.BettingHistory
      );
      if (response.success === true) {
        setBetHistoryData(response.result);
        setTotalCount(response.count);
        setLoad(false);
      } else {
        setLoad(false);
      }
    } catch (error) {
      console.log(error);
      setLoad(false);
    }
  };
  // const fetchEvent = async () => {
  //   try {
  //     const response = await fetch(
  //       // `https://api.the-odds-api.com/v4/sports/${sport}/events/?apiKey=${ApiEndPoints.ApiKey}`,
  //       `https://api.the-odds-api.com/v4/sports/americanfootball_nfl/scores/?&daysFrom=3&apiKey=${ApiEndPoints.ApiKey}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     setEvent(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <Container fluid className="p-4">
      {load && (
        <div>
          <PulseLoader loading={load} color="#155239" style={styles.backdrop} />
        </div>
      )}
      <h4 className="fw-bold">Betting History</h4>
      <Table striped bordered hover responsive className="mt-1">
        <thead>
          <tr>
            <th>No.</th>
            <th>Bet Type</th>
            <th>Sport</th>
            <th>Market</th>
            <th>Amount</th>
            <th>Win Amount</th>
            <th>Bet Status</th>
            <th>Bookmaker</th>
            <th>Date</th>
            {/* <th>Settlement </th> */}
          </tr>
        </thead>
        <tbody>
          {betHistoryData?.map((bet, index) => (
            <React.Fragment key={bet.id}>
              {bet.bet_detail?.map((detail, detailIndex) => {
                // if (detail.market_key === "spread") {
                //   result = checkSpreadBet(detail, event);
                // } else if (detail.market_key === "total") {
                //   result = checkTotalBet(detail, event);
                // } else if (detail.market_key === "moneyline") {
                //   result = checkMoneylineBet(detail, event);
                // }

                return (
                  <tr key={detail.id}>
                    {detailIndex === 0 && (
                      <>
                        <td rowSpan={bet.bet_detail.length}>{index + 1}</td>
                        <td rowSpan={bet.bet_detail.length}>{bet.bet_type}</td>
                      </>
                    )}
                    <td>{detail.sport_name}</td>
                    <td>{detail.market_key}</td>
                    {(bet.bet_type === "Parlay" && detailIndex === 0) ||
                    (bet.bet_type === "Teaser" && detailIndex === 0) ? (
                      <>
                        <td rowSpan={bet.bet_detail.length}>
                          {bet.total_amount}
                        </td>
                        <td rowSpan={bet.bet_detail.length}>
                          {bet.bet_win_amount}
                        </td>
                      </>
                    ) : bet.bet_type !== "Parlay" &&
                      bet.bet_type !== "Teaser" ? (
                      <>
                        <td>{detail.amount}</td>
                        <td>{detail.win_amount}</td>
                      </>
                    ) : null}
                    <td>{detail.bet_status}</td>
                    <td>{detail.bookmaker_name}</td>
                    <td>{new Date(detail.created_at).toLocaleDateString()}</td>
                    {/* <td className="text-center">
                      {result ? (
                        <Button>Settle</Button>
                      ) : (
                        <Button disabled>Settle</Button>
                      )}
                    </td> */}
                  </tr>
                );
              })}
            </React.Fragment>
          ))}
        </tbody>
      </Table>

      {/* <Table striped bordered hover responsive className="mt-1 ">
        <thead>
          <tr>
            <th>No.</th>
            <th>Sport</th>
            <th>Market</th>
            <th>Amount</th>
            <th>Win Amount</th>
            <th>Bet Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {betHistoryData?.length === 0 && (
            <tr className="p-5">
              <td colSpan={7} className="text-center ">
                No Data Found
              </td>
            </tr>
          )}
          {betHistoryData?.map((bet, index) => (
            <tr key={bet.id}>
              <td>{index + 1}</td>
              <td>{bet.sport_name}</td>
              <td>{bet.market_key}</td>
              <td>{bet.amount}</td>
              <td>{bet.win_amount}</td>
              <td>{bet.bet_status === 0 ? "Pending" : "Completed"}</td>
              <td>{new Date(bet.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </Table> */}
      {/* Pagination Component */}
      <Pagination className="mt-3 justify-content-center">
        <Pagination.First
          onClick={() => handlePageChange(1)}
          disabled={page === 1}
        />
        <Pagination.Prev
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        />
        {[...Array(Math.ceil(totalCount / itemPerPage)).keys()].map(
          (pageIndex) => (
            <Pagination.Item
              key={pageIndex + 1}
              active={pageIndex + 1 === page}
              onClick={() => handlePageChange(pageIndex + 1)}
            >
              {pageIndex + 1}
            </Pagination.Item>
          )
        )}
        <Pagination.Next
          onClick={() => handlePageChange(page + 1)}
          disabled={page === Math.ceil(totalCount / itemPerPage)}
        />
        <Pagination.Last
          onClick={() => handlePageChange(Math.ceil(totalCount / itemPerPage))}
          disabled={page === Math.ceil(totalCount / itemPerPage)}
        />
      </Pagination>
    </Container>
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

export default BettingHistory;
