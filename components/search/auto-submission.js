import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./searchBar.module.css";

function SearchBar({ search }) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  let debounceTimeout;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delay = setTimeout(() => {
      router.push(`/Search/${query}`)
    }, 5000) // Set the delay to 5 seconds (5000 milliseconds)
    // Clear the previous timeout when the input changes
    // if (debounceTimeout) {
    //   clearTimeout(debounceTimeout);
    // }

    // Set a new timeout to submit the search query after 5 seconds of inactivity
    // if (query) {
    //   setLoading(false); // Clear loading state
    //   debounceTimeout = setTimeout(() => {
    //     setLoading(true); // Start loading after 5 seconds
    //     router.push(`/Search/${query}`)
    //       .then(() => {
    //         setLoading(false); // Stop loading after fetching data
    //       });
    //   }, [delay, query]);
    // }

    // Cleanup: Clear the timeout when the component unmounts
    return () => {
      clearTimeout(delay);
    }}, [query])
    

  return (
    <section className={styles.container}>
      <div className={styles.searchBar}>
        <label htmlFor="search">Search</label>
        <input
          className={styles.input}
          type="text"
          placeholder={search}
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
        <button className={styles.button}>Search</button>
        {loading && <div className={styles.loader}></div>}
      </div>
    </section>
  );
}

export default SearchBar;
