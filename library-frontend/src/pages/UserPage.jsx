// 📄 src/pages/UsersPage.jsx

import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { getAllUsers } from "../services/userService";
import UserTable from "../components/UserTable"; // UserTable bileşenini içe aktar

function UserPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsers(); // API'den kullanıcıları al
        setUsers(data); // state'e yaz
        console.log("Gelen kullanıcılar:", data); // kontrol için
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []); // sayfa yüklendiğinde sadece bir kez çalışır

  return (
    <Container className="mt-5">
      <h2>Users Page</h2>
      <UserTable users  ={users} />
    </Container>
  );
}

export default UserPage;
