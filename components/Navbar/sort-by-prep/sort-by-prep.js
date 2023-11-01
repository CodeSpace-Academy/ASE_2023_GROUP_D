// SortButton.js
import React from "react";

function SortButton({ onClick, sortOrder, onSortOrderChange }) {
  return (
    <div>
      <label htmlFor="sortOrder">Sort by Prep Time: </label>
      <select
        id="sortOrder"
        value={sortOrder}
        onChange={(e) => onSortOrderChange(e.target.value)}
      >
        <option value="ascending">Ascending</option>
        <option value="descending">Descending</option>
      </select>
      <button onClick={onClick}></button>
    </div>
  );
}

export default SortButton;