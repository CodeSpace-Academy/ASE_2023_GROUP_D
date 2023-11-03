import React, { useState } from 'react';
import styles from './steps.module.css';

function FilterSteps({ onFilter, isLoading }) {
  const [numSteps, setNumSteps] = useState('');

  const handleFilter = () => {
    if (numSteps.trim() !== '') {
      onFilter(parseInt(numSteps));
    }
  };

  return (
    <div className={styles.filterContainer}>
      <label htmlFor="numSteps">Filter by Steps: </label>
      <input
        type="number"
        id="numSteps"
        value={numSteps}
        onChange={(e) => setNumSteps(e.target.value)}
      />
      <button onClick={handleFilter} disabled={isLoading}>
        Apply
      </button>
      {isLoading && <div className={styles.overlay}>Loading...</div>}
    </div>
  );
}

export default FilterSteps;

