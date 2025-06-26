import React from 'react';
import './Pagination.css'; // We'll create this CSS next
import { Button } from 'react-bootstrap';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination-container">
      <ul className="pagination-list">
        <li className={`pagination-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <Button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-link"
          >
            Previous
          </Button>
        </li>
        {pageNumbers.map(number => (
          <li key={number} className={`pagination-item ${currentPage === number ? 'active' : ''}`}>
            <Button
              onClick={() => onPageChange(number)}
              className="pagination-link"
            >
              {number}
            </Button>
          </li>
        ))}
        <li className={`pagination-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <Button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pagination-link"
          >
            Next
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;