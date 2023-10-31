import { useState, useEffect } from "react";
import { useRouter } from "next/router";

function SearchBar({search}) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const delay = 5000; // Adjust this value to control the delay
  let debounceTimeout;

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setQuery(inputValue);
  };

  useEffect(() => {
    // Clear the previous timeout when the input changes
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    // Set a new timeout to submit the search query
    if (query) {
      debounceTimeout = setTimeout(() => {
        router.push(`/Search/${query}`);
      }, delay);
    }

    // Cleanup: Clear the timeout when the component unmounts
    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [query, router, delay]);

  return (
    <section>
      <div>
        <label htmlFor="search">Search</label>
        <input type="text" placeholder={search} onChange={handleInputChange} value={query} />
      </div>
    </section>
  );
}

export default SearchBar;
