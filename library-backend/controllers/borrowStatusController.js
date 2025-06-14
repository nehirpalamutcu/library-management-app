import db from "../db.js";

export const getAllBorrowStatuses = (req, res) => {
  const query = "SELECT * FROM t_borrow_status";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching borrow statuses:", err.message);
      return res.status(500).json({ error: "Failed to fetch borrow statuses" });
    }

    res.json(results);
  });
};
