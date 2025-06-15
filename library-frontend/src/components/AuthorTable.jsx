import React, { useState } from "react";
import { Table, Pagination } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";

const AuthorTable = ({ authors, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAuthors = authors.slice(indexOfFirstItem, indexOfLastItem);

  const renderPagination = () => {
    const totalPages = Math.ceil(authors.length / itemsPerPage);
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

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Bio</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {currentAuthors.map((author) => (
            <tr key={author.id}>
              <td>{author.id}</td>
              <td>{author.first_name}</td>
              <td>{author.last_name ?? " "}</td>
              <td>{author.bio ?? " "}</td>
              <td className="text-center">
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => onDelete(author.id)}
                  title="Delete Author"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-center">{renderPagination()}</div>
    </>
  );
};

export default AuthorTable;
