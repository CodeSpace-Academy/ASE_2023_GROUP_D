import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

function SearchBar() {
      // State to store the search query
  const [query, setQuery] = useState('');
  const router = useRouter(); // Use the useRouter hook

  useEffect(() => {
    // perform automatic search here, by using the query state
    //we're redirecting to the search page when the query changes.
    if (query) {
      router.push(`/Search/${query}`);
    }
  }, [query]);

  return (
    <section>
      <div>
        <label htmlFor="search">Search</label>
        <input type="text" onChange={e => setQuery(e.target.value)} />
      </div>
    </section>
  );
}

export default SearchBar;
