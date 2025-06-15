import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import "./LoginPage.css"; // Arka plan ve stil için
import { loginUser } from "../services/authService";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setValidated(true);
      return;
    }
    console.log("Logging in with:", { email, password });

    try {
      const data = await loginUser(email, password);
      console.log("Login successful:", data);

      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = "/dashboard";
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="login-bg">
      <div className="login-form">
        <h2 className="mb-4">Library Management App</h2>
        {errorMessage && (
          <div className="alert alert-danger text-center">{errorMessage}</div>
        )}

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group
            className="mb-3"
            style={{ textAlign: "left" }}
            controlId="formEmail"
          >
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={validated && !email}
            />
            <Form.Control.Feedback type="invalid">
              Please enter your email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="formPassword"
            style={{ textAlign: "left" }}
          >
            <Form.Label>Password</Form.Label>
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              isInvalid={validated && !password}
            />
            <Form.Control.Feedback type="invalid">
              Please enter your password.
            </Form.Control.Feedback>

            <Form.Check
              type="checkbox"
              label="Show Password"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
              className="mb-3 mt-2 text-start"
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Login
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;
