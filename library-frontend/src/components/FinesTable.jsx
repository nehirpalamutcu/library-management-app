import React, { useState } from "react";
import { Table, Pagination } from "react-bootstrap";

const FinesTable = ({ fines }) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(fines.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFines = fines.slice(indexOfFirstItem, indexOfLastItem);

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages || i === 1; i++) {
      pages.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </Pagination.Item>
      );
    }

    return (
      <div className="d-flex justify-content-center mt-3">
        <Pagination>{pages}</Pagination>
      </div>
    );
  };

  return (
    <>
      <Table striped bordered hover responsive className="mt-4">
        <thead>
          <tr>
            <th>User</th>
            <th>Due Date</th>
            <th>Return Date</th>
            <th>Fine Amount</th>
          </tr>
        </thead>
        <tbody>
          {currentFines.map((fine, index) => (
            <tr key={index}>
              <td>{fine.user}</td>
              <td>{fine.due_date?.slice(0, 10)}</td>
              <td>{fine.return_date?.slice(0, 10)}</td>
              <td>{fine.fine_amount}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {renderPagination()}
    </>
  );
};

export default FinesTable;
