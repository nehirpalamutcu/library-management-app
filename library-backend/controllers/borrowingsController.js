import db from "../db.js";
export const getAllBorrowings = (req, res) => {
    db.query("SELECT * FROM borrowings", (err, results) => {
      if (err) return res.status(500).json({ error: "Error fetching borrowings" });
      res.json(results);
    });
  };
  
  export const getAllBorrowingss = (req, res) => {
    const query = `
      SELECT 
        CONCAT(a.first_name, ' ', IFNULL(a.last_name, '')) AS author,
        a.id AS author_id,
        b.title AS title,
        tbs.description AS description,
        tbs.description AS borrow_status,
        br.borrow_date,
        br.due_date
      FROM borrowings br
      INNER JOIN users u ON u.id = br.user_id
      INNER JOIN books b ON b.id = br.book_id
      INNER JOIN authors a ON a.id = br.author_id
      INNER JOIN t_borrow_status tbs ON tbs.id = br.borrow_status_id
    `;
  
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching borrowings:", err.message);
        return res.status(500).json({ error: "Database error" });
      }
  
      res.json(results);
    });
  };
  
  
  

  export const getBorrowingById = (req, res) => {
    const borrowingId = req.params.id;
    db.query("SELECT * FROM borrowings WHERE id = ?", [borrowingId], (err, results) => {
      if (err) return res.status(500).json({ error: "Error fetching borrowing" });
      if (results.length === 0) return res.status(404).json({ error: "Borrowing not found" });
      res.json(results[0]);
    });
  }
  export const getBorrowingsByUserId = (req, res) => {
    const { user_id } = req.params;
  
    const query = "SELECT * FROM borrowings WHERE user_id = ?";
  
    db.query(query, [user_id], (err, results) => {
      if (err) {
        console.error("Error fetching borrowings:", err.message);
        return res.status(500).json({ error: "Database error" });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ message: "No borrowings found for this user" });
      }
  
      res.json(results);
    });
  };

  
  
  
  
  export const createBorrowing = (req, res) => {
    const { user_id, book_id, author_id, borrow_date, due_date, borrow_status_id } = req.body;
  
    if (!user_id || !book_id || !author_id || !borrow_date || !due_date || !borrow_status_id) {
      return res.status(400).json({ error: "All fields are required." });
    }
  
    const query = `
      INSERT INTO borrowings 
      (user_id, book_id, author_id, borrow_date, due_date, borrow_status_id) 
      VALUES (?, ?, ?, ?, ?, ?)`;
  
    const values = [user_id, book_id, author_id, borrow_date, due_date, borrow_status_id];
  
    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Error creating borrowing:", err.message);
        return res.status(500).json({ error: "Failed to create borrowing" });
      }
  
      res.status(201).json({
        message: "Borrowing created successfully",
        id: result.insertId,
      });
    });
  };
  export const updateBorrowing = (req, res) => {
    const { id, user_id, book_id, author_id, borrow_date, due_date, borrow_status_id } = req.body;
  
    if (!id) {
      return res.status(400).json({ error: "Borrowing ID is required" });
    }
  
    const fields = [];
    const values = [];
  
    if (user_id) {
      fields.push("user_id = ?");
      values.push(user_id);
    }
    if (book_id) {
      fields.push("book_id = ?");
      values.push(book_id);
    }
    if (author_id) {
      fields.push("author_id = ?");
      values.push(author_id);
    }
    if (borrow_date) {
      fields.push("borrow_date = ?");
      values.push(borrow_date);
    }
    if (due_date) {
      fields.push("due_date = ?");
      values.push(due_date);
    }
    if (borrow_status_id) {
      fields.push("borrow_status_id = ?");
      values.push(borrow_status_id);
    }
  
    if (fields.length === 0) {
      return res.status(400).json({ error: "No fields provided for update" });
    }
  
    values.push(id);
  
    const query = `UPDATE borrowings SET ${fields.join(", ")} WHERE id = ?`;
  
    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Error updating borrowing:", err.message);
        return res.status(500).json({ error: "Failed to update borrowing" });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Borrowing not found" });
      }
  
      res.json({ message: "Borrowing updated successfully" });
    });
  };
  export const deleteBorrowing = (req, res) => {
    const { id } = req.body;
  
    if (!id) {
      return res.status(400).json({ error: "Borrowing ID is required" });
    }
  
    const query = "DELETE FROM borrowings WHERE id = ?";
  
    db.query(query, [id], (err, result) => {
      if (err) {
        console.error("Error deleting borrowing:", err.message);
        return res.status(500).json({ error: "Failed to delete borrowing" });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Borrowing not found" });
      }
  
      res.json({ message: "Borrowing deleted successfully" });
    });
  };