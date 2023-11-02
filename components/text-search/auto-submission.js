import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "@/components/text-search/searchBar.module.css"
import Link from "next/link";

function SearchBar({ search }) {
  // const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [previousSearches, setPreviousSearches] = useState([]);
  // const router = useRouter();
  // const delay = 5000; // Adjust this value to control the delay
  // let debounceTimeout;

  async function searchF(sead) {
    try {
      await   fetch(`/api/searchOpt?filter=${sead}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.recipe.map((rec) => rec.title));
        setPreviousSearches(data.recipe.map((rec) => rec.title));
      })
    } catch (error) {
      return ''
    }
  }

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
      setTimeout(()=>{
      searchF(event.target.value)
    }, 1000)
  };

  const selectOption = (event) => {
    setSearchQuery(event.target.value)
  }

  // const handleInputChange = (e) => {
  //   const inputValue = e.target.value;
  //   setQuery(inputValue);
  // };

  // useEffect(() => {
  //   // Clear the previous timeout when the input changes
  //   if (debounceTimeout) {
  //     clearTimeout(debounceTimeout);
  //   }

    // // Set a new timeout to submit the search query
    // if (query) {
    //   debounceTimeout = setTimeout(() => {
    //     router.push(`/Search/${query}`);
    //   }, delay);
    // }

    // Cleanup: Clear the timeout when the component unmounts
  //   return () => {
  //     clearTimeout(debounceTimeout);
  //   };
  // }, [query, router, delay]);

  return (
    <section>
      <div className={styles.container}>
        <div className={styles.searchBar}>
          <input className={styles.input}
            type="text"
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={handleInputChange} />
          <Link href={`/Search/${searchQuery}`}>
          <button className={styles.button}>Search</button>
          </Link>
        </div>
      </div>
      <select onChange={selectOption}>
        {previousSearches.length > 0 ?
          previousSearches.map((option, index) => (
            <option key={index} value={option} onClick={() => setSearchQuery(option)}>{option}</option>
          )) : <option>No record Available</option>
        }
      </select>
    </section>
  );
}

export default SearchBar;
