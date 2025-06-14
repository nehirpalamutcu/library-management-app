import db from "../db.js";

// GET /fines → Get all fines
export const getAllFines = (req, res) => {
  const query = "SELECT * FROM fines";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching fines:", err.message);
      return res.status(500).json({ error: "Failed to fetch fines" });
    }

    res.json(results);
  });
};

// GET /fines/:id → Get fine by ID
export const getFineById = (req, res) => {
  const fineId = req.params.id;

  const query = "SELECT * FROM fines WHERE id = ?";

  db.query(query, [fineId], (err, results) => {
    if (err) {
      console.error("Error fetching fine:", err.message);
      return res.status(500).json({ error: "Failed to fetch fine" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Fine not found" });
    }

    res.json(results[0]);
  });
};
//fines/:amount → Get fines by amount
export const getFinesByAmount = (req, res)=>{
  const {amount }= req.params;
  const query = "SELECT * FROM fines WHERE fine_amount = ?";
  db.query(query, [amount], (err, results) => {
    if (err) {
      console.error("Error fetching fines by amount:", err.message);
      return res.status(500).json({ error: "Failed to fetch fines by amount" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "No fines found with the specified amount" });
    }

    res.json(results);
  } );
};


// POST /fines → Create new fine
export const createFine = (req, res) => {
  const { user_id, borrowing_id, return_date, fine_coef_id, fine_amount } = req.body;

  if (!user_id || !borrowing_id || !return_date || !fine_coef_id || !fine_amount) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const query = `
    INSERT INTO fines (user_id, borrowing_id, return_date, fine_coef_id, fine_amount)
    VALUES (?, ?, ?, ?, ?)`;

  const values = [user_id, borrowing_id, return_date, fine_coef_id, fine_amount];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error creating fine:", err.message);
      return res.status(500).json({ error: "Failed to create fine." });
    }

    res.status(201).json({
      message: "Fine created successfully",
      fine: {
        id: result.insertId,
        user_id,
        borrowing_id,
        return_date,
        fine_coef_id,
        fine_amount,
      },
    });
  });
};

// PATCH /fines/update → Update fine
export const updateFine = (req, res) => {
  const { id, user_id, borrowing_id, return_date, fine_coef_id, fine_amount } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Fine ID is required." });
  }

  if (!user_id && !borrowing_id && !return_date && !fine_coef_id && !fine_amount) {
    return res.status(400).json({ error: "At least one field must be provided for update." });
  }

  const fields = [];
  const values = [];

  if (user_id) {
    fields.push("user_id = ?");
    values.push(user_id);
  }
  if (borrowing_id) {
    fields.push("borrowing_id = ?");
    values.push(borrowing_id);
  }
  if (return_date) {
    fields.push("return_date = ?");
    values.push(return_date);
  }
  if (fine_coef_id) {
    fields.push("fine_coef_id = ?");
    values.push(fine_coef_id);
  }
  if (fine_amount) {
    fields.push("fine_amount = ?");
    values.push(fine_amount);
  }

  values.push(id);

  const query = `UPDATE fines SET ${fields.join(", ")} WHERE id = ?`;

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error updating fine:", err.message);
      return res.status(500).json({ error: "Failed to update fine." });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Fine not found." });
    }

    res.json({ message: "Fine updated successfully." });
  });
};

// DELETE /fines/delete → Delete fine by ID
export const deleteFine = (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Fine ID is required." });
  }

  const query = "DELETE FROM fines WHERE id = ?";

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error deleting fine:", err.message);
      return res.status(500).json({ error: "Failed to delete fine." });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Fine not found." });
    }

    res.json({ message: "Fine deleted successfully." });
  });
};
