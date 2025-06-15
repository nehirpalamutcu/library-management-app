import React from "react";
import { Form, Button } from "react-bootstrap";

function FilterSidebar({
  minStock,
  maxStock,
  setMinStock,
  setMaxStock,
  minDate,
  maxDate,
  setMinDate,
  setMaxDate,
  selectedGenre,
  setSelectedGenre,
  selectedAuthor,
  setSelectedAuthor,
  genres,
  authors,
  handleFilter,
  handleReset,
}) {
  return (
    <Form className="p-3 bg-light rounded shadow-sm">
      <h5 className="mb-3">Filters</h5>

      <Form.Group className="mb-3">
        <Form.Label>Min Stock</Form.Label>
        <Form.Control
          type="number"
          value={minStock}
          onChange={(e) => setMinStock(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Max Stock</Form.Label>
        <Form.Control
          type="number"
          value={maxStock}
          onChange={(e) => setMaxStock(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Min Release Date</Form.Label>
        <Form.Control
          type="date"
          value={minDate}
          onChange={(e) => setMinDate(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Max Release Date</Form.Label>
        <Form.Control
          type="date"
          value={maxDate}
          onChange={(e) => setMaxDate(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Genre</Form.Label>
        <Form.Select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="">-- Select Genre --</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.description}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Author</Form.Label>
        <Form.Select
          value={selectedAuthor}
          onChange={(e) => setSelectedAuthor(e.target.value)}
        >
          <option value="">-- Select Author --</option>
          {authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.first_name} {author.last_name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <div className="d-flex justify-content-between">
        <Button variant="primary" onClick={handleFilter}>
          Filter
        </Button>
        <Button variant="secondary" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </Form>
  );
}

export default FilterSidebar;
