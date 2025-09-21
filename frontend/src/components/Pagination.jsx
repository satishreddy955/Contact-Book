import React from "react";

export default function Pagination({ page, pages, onPageChange }) {
  if (pages <= 1) return null;

  const prev = () => onPageChange(Math.max(1, page - 1));
  const next = () => onPageChange(Math.min(pages, page + 1));

  return (
    <div className="pagination">
      <button onClick={prev} disabled={page <= 1}>
        Prev
      </button>
      <span>
        Page {page} of {pages}
      </span>
      <button onClick={next} disabled={page >= pages}>
        Next
      </button>
    </div>
  );
}
