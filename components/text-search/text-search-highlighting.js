import React, { useState } from "react";
import styles from './search-bar.module.css';
// import RecipeList from '../recipes/recipes-list'; // Import your RecipeList component

// const SearchBar = ({ onSearch, filteredCharacters }) => {
const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [previousSearches, setPreviousSearches] = useState([]);

async function searchF(sead) {
    await   fetch(`/api/searchOpt?filter=${sead}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.recipe.map((rec) => rec.title));
        setPreviousSearches(data.recipe.map((rec) => rec.title));
      })
  }

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
      setTimeout(()=>{
      searchF(event.target.value)
    }, 3000)
  };

  // console.log(searchQuery)
  // const handleSearch = () => {
  //   if (searchQuery.trim() !== "") {
  //     setPreviousSearches([...previousSearches, searchQuery]);
  //     onSearch(searchQuery);
  //   }
  // };

  // const handleClearSearch = () => {
  //   setSearchQuery('');
  // };

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        placeholder="Search recipes..."
        value={searchQuery}
        onChange={handleInputChange}
      />
      {/* <button onClick={searchF}>sejj</button> */}

        <select>
          {previousSearches.length > 0 ?
            previousSearches.map((option, index) => (
              <option key={index} value={option} onClick={()=> setSearchQuery(option)}>{option}</option>
            )) : <option>No record Available</option>
          }
        </select>
          

          {/* <button onClick={handleSearch}>Search</button>
      <button onClick={handleClearSearch}>Clear</button> */}

          {/* RecipeList rendering with highlighted matching words */}
          {/* <div>
        {filteredCharacters.length > 0 ? (
          <RecipeList
            recipes={filteredCharacters.slice(0, 20)}
            patcheNo={1}
            highlightQuery={searchQuery} // Pass the search query to highlight matching words
          />
        ) : (
          <p>No matching recipes found.</p>
        )}
      </div> */}
          {/* 
      <div className={styles.previousSearches}>
        <p>Previous Searches:</p>
        <ul>
          {previousSearches.map((search, index) => (
            <li key={index}>{search}</li>
          ))}
        </ul>
      </div> */}
        </div>
  );
};

      export default SearchBar;
