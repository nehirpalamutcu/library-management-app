import db from "../db.js";

export const getAllRoles = (req, res) => {
  const query = "SELECT * FROM t_roles";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching roles:", err.message);
      return res.status(500).json({ error: "Failed to fetch roles." });
    }

    res.json(results);
  });
};
