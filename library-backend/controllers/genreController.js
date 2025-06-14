import db from "../db.js";

export const getAllGenres = (req, res) => {
  const query = "SELECT * FROM t_genres";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching genres:", err.message);
      return res.status(500).json({ error: "Failed to fetch genres" });
    }

    res.json(results);
  });
};
