import React, { useEffect, useState } from "react";
import { apiCallNew } from "../../Network_Call/apiservices";
import ApiEndPoints from "../../Network_Call/ApiEndPoints";
import { Container, Pagination, Table } from "react-bootstrap";
import { PulseLoader } from "react-spinners";

const TransactionHistory = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [load, setLoad] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const itemPerPage = 20;

  useEffect(() => {
    getTransactionHistory(page);
  }, [page]);

  const getTransactionHistory = async (page) => {
    const formData = new FormData();
    formData.append("page", page - 1);
    try {
      setLoad(true);
      const response = await apiCallNew(
        "post",
        formData,
        ApiEndPoints.TransactionHistory
      );
      if (response.success === true) {
        setData(response.result);
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
    <Container fluid className="p-4 ">
      {load && (
        <div>
          <PulseLoader loading={load} color="#155239" style={styles.backdrop} />
        </div>
      )}
      <h4 className="fw-bold">Transaction History</h4>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Sr No.</th>
            <th>League Name</th>
            <th>Pay For</th>
            <th>Entry Fee</th>
            <th>Transaction ID</th>
            <th>Payment Status</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((transaction, index) => (
            <tr key={transaction.id}>
              <td>{index + 1}</td>
              <td>{transaction.pay_for_name}</td>
              <td>{transaction.pay_for}</td>
              <td>{transaction.entry_fee}</td>
              <td>{transaction.transaction_id}</td>
              <td>{transaction.payment_status}</td>
              <td>{new Date(transaction.created_at).toLocaleString()}</td>
            </tr>
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

export default TransactionHistory;
