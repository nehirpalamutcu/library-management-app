import React, { useState } from "react";
import { Table, Pagination } from "react-bootstrap";

function BookTable({ books = [] }) {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // Sorting logic
  const sortedBooks = [...books].sort((a, b) => {
    if (!sortConfig.key) return 0;

    let aVal = a[sortConfig.key];
    let bVal = b[sortConfig.key];

    // Handle release_date as date
    if (sortConfig.key === "release_date") {
      aVal = new Date(aVal);
      bVal = new Date(bVal);
    }

    if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
    if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const indexOfLastBook = currentPage * itemsPerPage;
  const indexOfFirstBook = indexOfLastBook - itemsPerPage;
  const currentBooks = sortedBooks.slice(indexOfFirstBook, indexOfLastBook);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(books.length / itemsPerPage);
    let pages = [];
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = `${date.getDate()}`.padStart(2, "0");
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Title</th>
            <th
              style={{ cursor: "pointer" }}
              onClick={() => handleSort("release_date")}
            >
              Release Date{" "}
              {sortConfig.key === "release_date"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : ""}
            </th>
            <th>Author</th>
            <th>Genre</th>
            <th
              style={{ cursor: "pointer" }}
              onClick={() => handleSort("stock")}
            >
              Stock{" "}
              {sortConfig.key === "stock"
                ? sortConfig.direction === "asc"
                  ? "▲"
                  : "▼"
                : ""}
            </th>
          </tr>
        </thead>
        <tbody>
          {currentBooks.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{formatDate(book.release_date)}</td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
              <td>{book.stock}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {renderPagination()}
    </>
  );
}

export default BookTable;
