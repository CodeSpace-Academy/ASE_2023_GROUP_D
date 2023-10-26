import { useState } from "react";
import Link from "next/link";

function SearchBar() {
      // State to store the search query
  const [query, setQuery] = useState('');

  // Function to handle the search button click
  const handleSearch = () => {
    // Call the onSearch function with the current query as an argument
    onSearch(query);
  };
    return (
        <section>
            <div>
                <label htmlFor="search">Search</label>
                <input type="text" onChange={e => setQuery(e.target.value)} />
                <Link href={`/Search/${query}`}><button>Search</button></Link> 
            </div>
        </section>
    );
}
export default SearchBar;