import db from "../db.js";

export const getAllFineCoefficients = (req, res) => {
  const query = "SELECT * FROM t_fine_coefficients";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching fine coefficients:", err.message);
      return res
        .status(500)
        .json({ error: "Failed to fetch fine coefficients." });
    }

    res.json(results);
  });
};
