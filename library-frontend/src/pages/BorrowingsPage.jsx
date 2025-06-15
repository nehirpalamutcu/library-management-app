import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { getAllBorrowingss } from "../services/borrowingsService";
import BorrowingsTable from "../components/BorrowingsTable"; // burası önemli

function BorrowingsPage() {
  const [borrowings, setBorrowings] = useState([]);

  const fetchBorrowings = async () => {
    try {
      const allBorrowingss = await getAllBorrowingss();
      setBorrowings(allBorrowingss);
    } catch (err) {
      console.error("Error fetching Borrowings:", err);
    }
  };

  useEffect(() => {
    fetchBorrowings();
  }, []);

  return (
    <Container className="mt-5">
      <h2>Borrowings Page</h2>
      <BorrowingsTable borrowings={borrowings} />
    </Container>
  );
}

export default BorrowingsPage;
