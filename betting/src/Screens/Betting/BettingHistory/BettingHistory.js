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
  const [totalCount, setTotalCount] = useState(0);
  const itemPerPage = 20;

  useEffect(() => {
    getBetHistory(page);
  }, [page]);

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
            <th>League Type</th>
            <th>Market</th>
            <th>Team Name</th>
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
                return (
                  <tr key={detail.id}>
                    {detailIndex === 0 && (
                      <>
                        <td rowSpan={bet.bet_detail.length}>{index + 1}</td>
                        <td rowSpan={bet.bet_detail.length}>{bet.bet_type}</td>
                      </>
                    )}
                    <td>{detail.sport_name}</td>
                    {detailIndex === 0 && (
                      <td rowSpan={bet.bet_detail.length}>
                        {bet?.league_type == 0 || bet?.league_type === null
                          ? "No League"
                          : bet.league_type}
                      </td>
                    )}
                    <td>{detail.market_key}</td>
                    <td>{detail.team_name}</td>
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
                  </tr>
                );
              })}
            </React.Fragment>
          ))}
        </tbody>
      </Table>

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
