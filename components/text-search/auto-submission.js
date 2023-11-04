import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "@/components/text-search/searchBar.module.css"
import Link from "next/link";

function SearchBar({search}) {
  const [query, setQuery] = useState("");
  const [handel, setHandelSS] = useState('')
  const delay = 5000;
  const router = useRouter();

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };
  console.log(query)

  // function searchSubmit (){
  //   const { query, pathname } = router;

  //   // Create a new object by spreading the existing query parameters
  //   const newQuery = { ...query };
  
  //   // Add or update a new query parameter
  //   newQuery.Prep = handel;
  
  //   // Use router.push to navigate to the updated URL with the new query parameter
  //   router.push({
  //     pathname,
  //     query: newQuery,
  //   });
  // }
  // useEffect(() => {

  //   const navigateToNewPage = () => {
  //     router.push(`/Search/${query}`); // Replace '/new-page' with the URL of the new page
  //   };

  //   const timeoutId = setTimeout(navigateToNewPage, delay);

  //   return () => {
  //     clearTimeout(timeoutId); // Clear the timeout if the component unmounts before the delay is reached
  //   };
  // }, [router, query, delay]);

  function handelSS (event){
    setHandelSS(event.target.value)
  }

  return (
    <section>
      <div className={styles.container}>
      <div className={styles.searchBar}>
        <input className={styles.input} type="text" placeholder="Enter text ..." value={query} onChange={handleInputChange}/>
        <button className={styles.button}>Search</button>
      </div>
    </div>
    <select value={handel} onChange={handelSS}>
      <option value={1}>Ascending</option>
      <option value={-1}>Descending</option>
    </select>
    <Link href={`/Search/${query}?Prep=${handel}`}> 
    <button>submit</button>
    </Link>
    </section>
  );
}

export default SearchBar;
