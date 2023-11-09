import React from "react";


function SortPrep({ prep }) {
  return (
    <div>
      <label htmlFor="sortOrder">Sort Prep: </label>
      <select
        id="sortOrder"
        value={prep}
      
      >
        <option value={1}>Ascending</option>
        <option value={-1}>Descending</option>

        <option value="less-than-15">{"Below 15 min"}</option>
        <option value="15-30">15 - 30 min</option>
        <option value="30-45">30 - 45 min</option>
        <option value="45-75">45 - 75 min</option>
        <option value="75-90">75 - 90 min</option>
        <option value="greater-than-100">{" 100 min & over"}</option>
     

      </select>
      
    </div>
  );
}

export default SortPrep;




