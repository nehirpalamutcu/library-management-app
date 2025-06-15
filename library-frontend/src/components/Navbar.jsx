import React from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function AppNavbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="w-100">
      <Container fluid>
        <Navbar.Brand href="/dashboard">Library Management App</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/dashboard">Home</Nav.Link>
            <Nav.Link href="/authors">Authors</Nav.Link>
            <Nav.Link href="/borrowings">Borrowings</Nav.Link>
          </Nav>
          {user && (
            <span className="me-3 text-light">
              {user?.first_name} {user?.last_name}
            </span>
          )}
          <Button variant="outline-light" onClick={handleLogout}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
