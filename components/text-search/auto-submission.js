import React from 'react';

const Search = () => {
  const handleSearch = () => {
    console.log('Search button clicked!');
    // Implement your search logic here, such as fetching data from an API or database
  };

  return (
    <div>
      <h1>Search Page</h1>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;
