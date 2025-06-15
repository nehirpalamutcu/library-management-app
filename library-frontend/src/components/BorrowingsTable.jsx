import React, { useState } from "react";
import { Table, Pagination } from "react-bootstrap";

const BorrowingsTable = ({ borrowings }) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // Sayfa hesaplama
  const totalPages = Math.ceil(borrowings.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = borrowings.slice(indexOfFirstItem, indexOfLastItem);

  // Sayfa numaraları
  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    for (let number = 1; number <= totalPages; number++) {
      pages.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => setCurrentPage(number)}
        >
          {number}
        </Pagination.Item>
      );
    }

    return <Pagination>{pages}</Pagination>;
  };

  return (
    <>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Author</th>
            <th>Author ID</th>
            <th>Title</th>
            <th>Borrow Status</th>
            <th>Borrow Date</th>
            <th>Due Date</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((b, index) => (
            <tr key={index}>
              <td>{b.author}</td>
              <td>{b.author_id}</td>
              <td>{b.title}</td>
              <td>{b.borrow_status}</td>
              <td>{b.borrow_date?.slice(0, 10) || "-"}</td>
              <td>{b.due_date?.slice(0, 10) || "-"}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-center mt-3">{renderPagination()}</div>
    </>
  );
};

export default BorrowingsTable;
