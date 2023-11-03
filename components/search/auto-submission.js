import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./searchBar.module.css"

function SearchBar({search}) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const delay = 500; // Adjust this value to control the delay
  let debounceTimeout;
  const [loading, setLoading] = useState(false);

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
        setLoading(true);
  
        debounceTimeout = setTimeout(() => {
          router.push(`/Search/${query}`).then(() => {
            setLoading(false);
          });
        }, delay);
      }
  
      // Cleanup: Clear the timeout when the component unmounts
      return () => {
        clearTimeout(debounceTimeout);
      };
    }, [query, router, delay]);
  return (
    <section className={styles.container}>
      <div className={styles.searchBar}>
     <label htmlFor="search">Search</label>
        <input className={styles.input} type="text" placeholder={search} onChange={handleInputChange} value={query} />
        <button className={styles.button}>Search</button>
        </div>
        {loading && <div className={styles.loader}></div>}
    </section>
  );
}

export default SearchBar;
