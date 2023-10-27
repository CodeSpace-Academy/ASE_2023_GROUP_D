import React, { useState } from 'react';
import styles from './filter.module.css';

function FilterByIngredients({ onFilter }) {
  const [showInput, setShowInput] = useState(false);
  const [filterValue, setFilterValue] = useState('');

  const handleInputChange = (e) => {
    setFilterValue(e.target.value.trim());
    if (e.target.value.trim() !== '') {
      onFilter(e.target.value.trim());
    }
    if (e.target.value.trim() === '') {
      setShowInput(false);
      onFilter(null);
    }
  };

  return (
    <div className="button-container">
      {!showInput && <button onClick={() => setShowInput(true)}>Filter by Ingredients</button>}
      {showInput && (
        <div className="input-container">
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


















// import React, { useState } from 'react';

// function Filter({ onFilter }) {
//   const [filterType, setFilterType] = useState('');
//   const [filterValue, setFilterValue] = useState('');

//   const handleFilterClick = () => {
//     if (filterValue !== '' && filterType !== '') {
//       onFilter(filterType, filterValue);
//     }
//   };

//   return (
//     <div>
//       <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
//         <option value="">Select Filter Type</option>
//         <option value="steps">Filter by Steps</option>
//         <option value="ingredients">Filter by Ingredients</option>
//       </select>
//       <input
//         type="text"
//         value={filterValue}
//         onChange={(e) => setFilterValue(e.target.value)}
//         placeholder="Enter filter value"
//       />
//       <button onClick={handleFilterClick}>Filter</button>
//     </div>
//   );
// }

// export default Filter;
