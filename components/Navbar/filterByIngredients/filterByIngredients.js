import React, { useState } from 'react';
import styles from './filterByIngredients.module.css'; // Import your CSS module

function FilterByIngredients({ onApplyFilter }) {
  const [showInput, setShowInput] = useState(false);
  const [filterValue, setFilterValue] = useState('');

  const handleApplyFilter = () => {
    setShowInput(true);
  };

  const handleFilterApply = () => {
    onApplyFilter(filterValue.trim());
    setShowInput(true); // Hide the input after applying filter
  };

  const handleInputChange = (e) => {
    setFilterValue(e.target.value);
  };

  return (
    <div className={styles.container}>
      {!showInput && (
        <button className={styles.button} onClick={handleApplyFilter}>
          Filter by Ingredients
        </button>
      )}

      {showInput && (
        <div className={styles.buttonContainer}>
          <input
            className={styles.input}
            type="text"
            placeholder="Enter ingredient"
            value={filterValue}
            onChange={handleInputChange}
          />
          <button className={styles.button} onClick={handleFilterApply}>
            Apply
          </button>
        </div>
      )}
    </div>
  );
}

export default FilterByIngredients;
