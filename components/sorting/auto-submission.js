import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "@/components/sorting/searchBar.module.css"
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass as searchIcon } from "@fortawesome/free-solid-svg-icons";
import FilterByTag from "./filterByTag";
import FilterByIngrediets from "./filterByIngredients";
import FilterByCategory from "./filterByCategory";
import FilterBySteps from "./filterBySteps";
import { Input } from "postcss";

/**
 * 
 * @param {String} categories is a property of recipe object.
 * @param {Number} pageNo controls number of frecipes to be previewed.
 * @param {String} searchChar tracks number of charcters enterd on a search bar for input query.
 * @param {Function} setIsSorting is state function that enables sorting of any selcted
 *  recipe's properties.
 * @param {InputEvent} isSorting that triggers the sorting event of a selected component.
 * @param {String} history stores and displays characters entered on the previous search.
 * @returns 
 */

function SearchBar({ categories, pageNo, searchChar, setIsSorting, isSorting, history, filterByTags, filterByIngredients, categoryfilter, filterBySteps }) {
  const [query, setQuery] = useState();
  const [backUpQuery, setBackUpQuery] = useState(searchChar)
  const [tags, setTags] = useState(filterByTags)
  const [ingredients, setIngredients] = useState(filterByIngredients)
  const [category, setCategory] = useState(categoryfilter)
  const [filterToggle, setFilterToggle] = useState(false)
  const [numSteps, setNumSteps] = useState(filterBySteps)
  const [showSubmitButton, setShowSubmitButton] = useState(false);

  const router = useRouter();
  const { asPath } = router
  const delay = 5000;

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

   useEffect(() => {
    if (query && query.length < 10) {
      setShowSubmitButton(true);

      const navigateToNewPage = () => {
        router.push(`/recipes/1/?search=${query ? query : backUpQuery}`);
      };

      const timeoutId = setTimeout(navigateToNewPage, delay);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [router, query, delay]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div className={styles.searchBar}>
        <FontAwesomeIcon icon={searchIcon} size="lg" color="black" style={{ paddingRight: '10px', paddingTop: '30px' }} />
        <input className={styles.input} onClick={() => setFilterToggle(!filterToggle)} type="text" placeholder="Enter text ..." value={query} onChange={handleInputChange} />
        <select>
          {history.map((data, index) => {
            return <option key={index} value={data}>{data}</option>
          })}
        </select>
        {(query && query.length >= 10) && 
        <Link href={`/recipes/1/?search=${query ? query : backUpQuery}`}>
        <button>Submit </button>
        </Link>
      }
      </div>

      <div className={styles.filters}>
        <FilterBySteps setNumSteps={setNumSteps} numSteps={numSteps} />
        <FilterByTag setTags={setTags} tags={tags} />
        <FilterByCategory categories={categories} category={category} setCategory={setCategory} />
        <FilterByIngrediets setIngredients={setIngredients} ingredients={ingredients} />
      </div>
      
      <div style={{display: 'flex', width: 'fit-content'}}>
      <Link href={`/recipes/1/?${backUpQuery ? `search=${query ? query : backUpQuery}&`: ''}tags=${tags}&categories=${category}&ingredients=${ingredients}&steps=${numSteps}`}>
        <button>filter</button>
      </Link>
      <Link href={`/recipes/1${asPath.includes('?search=')  ? `/?search=${backUpQuery}`: '' }`}>
        <button >Clear All Filters</button>
      </Link>
      </div>
      <button onClick={() => setIsSorting(!isSorting)}>Close</button>
      </div>

    </div>


  );
}

export default SearchBar;
