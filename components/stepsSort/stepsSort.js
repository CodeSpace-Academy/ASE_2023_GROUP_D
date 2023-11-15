import React, { useState, useEffect } from "react";

function SortInstructionsByLength() {
  const [order, setOrder] = useState('ascending');
  const [sortingStatus, setSortingStatus] = useState(null);
  const [sortedRecipes, setSortedRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setSortingStatus('Sorting...');

        const response = await fetch(`/api/sortBySteps/sortBySteps?instructions=${encodeURIComponent(JSON.stringify(['step1', 'step2']))}`);
        const result = await response.json();
        //console.log(result)

        if (result.success) {
          setSortedRecipes(result.recipes);
          setSortingStatus(console.log('Instructions sorted successfully.'));
        } else {
          setSortingStatus('An error occurred while sorting instructions.');
        }
      } catch (error) {
        setSortingStatus('An error occurred while sorting instructions.');
        console.error('An error occurred while sorting instructions:', error);
        // Handle error if needed
      }
    };

    fetchData();
  }, [order]);


  const handleChangeOrder = (event) => {
    setOrder(event.target.value);
  };
  
  return (
    <div>
      <label htmlFor="sortOrder">Sort by steps:</label>
      <select id="sortOrder" value={order} onChange={handleChangeOrder}>
        <option value="ascending">Ascending</option>
        <option value="descending">Descending</option>
      </select>
      {sortingStatus && <p>{sortingStatus}</p>}
    </div>
  );
}

export default SortInstructionsByLength;
