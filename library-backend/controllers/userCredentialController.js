import db from "../db.js";

export const getAllUserCredentials = (req, res) => {
  const query = `
    SELECT uc.id, uc.user_id, u.name_of_user
    FROM user_credentials uc
    JOIN users u ON uc.user_id = u.id
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching user credentials:", err.message);
      return res
        .status(500)
        .json({ error: "Failed to fetch user credentials." });
    }

    res.json(results);
  });
};
