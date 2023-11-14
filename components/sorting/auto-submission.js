import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "@/components/sorting/searchBar.module.css"
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass as searchIcon } from "@fortawesome/free-solid-svg-icons";
import FilterByTag from "./filterByTag";
import FilterByIngrediets from "./filterByIngredients";
import FilterByCategory from "./filterByCategory";

function SearchBar({ categories, pageNo, searchChar, setIsSorting, isSorting, history }) {
  const [query, setQuery] = useState();
  const [backUpQuery, setBackUpQuery] = useState(searchChar)
  const [tags, setTags] = useState([])
  const [ingredients, setIngredients] = useState([])
  const [category, setCategory] = useState('')
  const [filterToggle, setFilterToggle] = useState(false)
  const router = useRouter();
  const delay = 5000;

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  useEffect(() => {

    if (query) {
      const navigateToNewPage = () => {
        router.push(`/recipes/${pageNo}/?search=${query ? query : backUpQuery}`); // Replace '/new-page' with the URL of the new page
      };

      const timeoutId = setTimeout(navigateToNewPage, delay);

      return () => {
        clearTimeout(timeoutId); // Clear the timeout if the component unmounts before the delay is reached
      };
    }
  }, [router, query, delay]);

  useEffect(() => {
    return () => {
      setQuery('');
    };
  }, [router]);


  function handleDeleteAllFilters() {
    setTags([])
    setCategory('')
    setIngredients([])
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div className={styles.searchBar}>
        <FontAwesomeIcon icon={searchIcon} size="lg" color="black" style={{ paddingRight: '10px', paddingTop: '30px' }} />
        <input className={styles.input} onClick={() => setFilterToggle(!filterToggle)} type="text" placeholder="Enter text ..." value={query} onChange={handleInputChange} />
        <select>
         {history.map((data, index)=> {
            return <option key={index} value={data}>{data}</option>
         })}
        </select>
      </div>

      <>
        <FilterByTag setTags={setTags} tags={tags} />
        <FilterByIngrediets setIngredients={setIngredients} ingredients={ingredients} />
        <FilterByCategory categories={categories} category={category} setCategory={setCategory} />
      </>
      <button onClick={()=> setIsSorting(!isSorting)}>Close</button>
               
          <Link href={`/recipes/${pageNo}/?${backUpQuery && 'search='}${query ? query : backUpQuery}&tags=${tags}&categories=${category}&ingredients=${ingredients}`}>
            <button>filter</button>
          </Link>
          {/* <Link href={`/recipes/${pageNo}/?Prep=${prep}&Tags=${tags}&Categories=${category}&Ingredients=${ingredients}`}>
            <button onClick={handleDeleteAllFilters}>Clear All Filters</button>
          </Link> */}
    </div>


  );
}

export default SearchBar;
