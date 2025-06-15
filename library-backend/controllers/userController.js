import db from "../db.js";

export const getAllUsers = (req, res) => {
  const query = "select * from users";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching users: ", err.message);
      return res.status(500).json({ error: "Failed to fetch users" });
    }

    res.json(results);
  });
};

export const loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  const query = `
    SELECT uc.id, u.first_name, u.last_name
    FROM user_credentials uc
    JOIN users u ON uc.user_id = u.id
    WHERE u.email = ? AND uc.password = ?
  `;

  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error("Login error:", err);
      return res.status(500).json({ message: "Internal server error." });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    res.status(200).json({
      message: "Login successful",
      user: results[0],
    });
  });
};
