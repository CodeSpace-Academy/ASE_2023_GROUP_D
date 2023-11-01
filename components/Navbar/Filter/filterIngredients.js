import React, { useState } from 'react';
import styles from './filter.module.css';

function FilterByIngredients({ onFilter }) {
  const [showInput, setShowInput] = useState(false);
  const [filterValue, setFilterValue] = useState('');

  const handleInputChange = (e) => {
    setFilterValue(e.target.value.trim());
    if (e.target.value.trim() !== '') {
      onFilter(e.target.value.trim());
    } else {
      setShowInput(false);
      onFilter(null);
    }
  };

  return (
    <div className={styles.buttonContainer}>
      {!showInput && <button onClick={() => setShowInput(true)}>Filter by Ingredients</button>}
      {showInput && (
        <div className={styles.inputContainer}>
          <input
            type="text"
            value={filterValue}
            onChange={handleInputChange}
            placeholder="Filter by Ingredients"
          />
        </div>
      )}
    </div>
  );
}

export default FilterByIngredients;
