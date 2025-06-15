import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { getAllFines } from "../services/finesService";
import FinesTable from "../components/FinesTable";

function FinesPage() {
  const [fines, setFines] = useState([]);

  useEffect(() => {
    const fetchFines = async () => {
      try {
        const data = await getAllFines();
        setFines(data);
      } catch (error) {
        console.error("Error fetching fines:", error);
      }
    };

    fetchFines();
  }, []);

  return (
    <Container className="mt-5">
      <h2>Fines Page</h2>
      <FinesTable fines={fines} />
    </Container>
  );
}

export default FinesPage;
