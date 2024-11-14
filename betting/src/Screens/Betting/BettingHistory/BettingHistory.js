import { useEffect, useState } from "react";
import { Card, Col, Container, Row, Table } from "react-bootstrap";
import { apiCallNew } from "../../../Network_Call/apiservices";
import ApiEndPoints from "../../../Network_Call/ApiEndPoints";
import { PulseLoader } from "react-spinners";

const BettingHistory = () => {
  const [betHistoryData, setBetHistoryData] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    getBetHistory();
  }, []);

  const getBetHistory = async () => {
    try {
      setLoad(true);
      const response = await apiCallNew(
        "post",
        null,
        ApiEndPoints.BettingHistory
      );
      if (response.success === true) {
        setBetHistoryData(response.result);
        setLoad(false);
      } else {
        setLoad(false);
      }
    } catch (error) {
      console.log(error);
      setLoad(false);
    }
  };
  return (
    <Container fluid className="p-4">
      {load && (
        <div>
          <PulseLoader loading={load} color="#155239" style={styles.backdrop} />
        </div>
      )}
      <h4 className="fw-bold">Betting History</h4>
      <Table striped bordered hover responsive className="mt-1 ">
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
      </Table>
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
