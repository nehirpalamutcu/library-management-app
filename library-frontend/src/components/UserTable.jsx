// 📄 src/components/UsersTable.jsx

import React, { useState } from "react";
import { Table, Pagination } from "react-bootstrap";

// Bileşen dışarıdan "users" prop'u alıyor
const UserTable = ({ users }) => {
  const itemsPerPage = 10; // her sayfada 10 kayıt gösterilecek
  const [currentPage, setCurrentPage] = useState(1); // aktif sayfa

  // Sayfalama hesaplamaları
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

  // Sayfa numarası oluşturma
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
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <tr key={index}>
              <td>{user.id}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
              <td>{user.phone_number}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {renderPagination()}
    </>
  );
};

export default UserTable;
