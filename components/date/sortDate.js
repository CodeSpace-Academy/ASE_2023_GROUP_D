import React, { useState } from 'react';

async function SortPublished({ published }) {
  const [sortOrder, setSortOrder] = useState('ascending');
  const [sortedData, setSortedData] = useState([]);

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const fetchData = async () => {
    try {
        const response = await fetch('/api/DateSort/DateSort', {
            method: 'GET',
        });

        const data = await response.json();

        // Sort the data based on the selected order
        const sorted = [...data].sort((a, b) => {
            const dateA = a.published;
            const dateB = b.published;
        
            return sortOrder === 'ascending' ? dateA - dateB : dateB - dateA;
        });

        setSortedData(sorted);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

  return (
    <div>
      <select onChange={handleSortOrderChange} value={sortOrder}>
        <option value="ascending">Ascending</option>
        <option value="descending">Descending</option>
      </select>
      <button onClick={fetchData}>Sort</button>

      
    </div>
  );
}

export default SortPublished;
