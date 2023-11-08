import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./seachBar.module.css"
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass as searchIcon } from "@fortawesome/free-solid-svg-icons";

function SearchBar({ search, categories }) {
  const [query, setQuery] = useState(""); //Storing the text entered in the search bar
  const [backUpQuery, setBackUpQuery] = useState(search); // Storing a backup of the search term
  const [prep, setHandlePrep] = useState('') // Storing sorting information
  const [tags, setTags] = useState([]) 
  const [ingredients, setIngredients] = useState([])
  const [category, setCategory] = useState('')
  const router = useRouter();// Using Next.js to manage routing
  const delay = 2000;

  // When someone types in the search bar, this function updates the 'query' variable.
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

    // When a search is performed, this function navigates to the search results page.
  useEffect(() => {

    if (query) {
      const navigateToNewPage = () => {
        router.push(`/Search/${query ? query : backUpQuery}?Prep=${prep}&Tags=${tags}&Categories=${category}&Ingredients=${ingredients}`); // Replace '/new-page' with the URL of the new page
      };

      const timeoutId = setTimeout(navigateToNewPage, delay);

      return () => {
        clearTimeout(timeoutId); // Clear the timeout if the component unmounts before the delay is reached
      };
    }
  }, [router, query, delay]);

  // When the component is unmounted or the route changes, this function clears the search query.
  useEffect(() => {
    return () => {
      setQuery('');
    };
  }, [router]);

  function handelSortByPrep(event) {
    setHandlePrep(event.target.value)
  }

  function handleTag(event) {
    setTags((prev) => [...prev, event.target.value])
  }

  function handleDeleteTag(event) {
    setTags(tags.filter((tag) => tag !== event.target.value))
  }

  function handleIngredients(event) {
    setIngredients((prev) => [...prev, event.target.value])
  }

  function handleDeleteIngredients(event) {
    setIngredients(ingredients.filter((ingredient) => ingredient != event.target.value))
  }

  function handleCategory(event) {
    setCategory(event.target.value)
  }

  function handleDeleteAllFilters(){
    setTags([])
    setCategory('')
    setIngredients([])
    setHandlePrep('')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }} className={styles.container}>
      <div className={styles.container}>
        <div className={styles.searchBar}>
          <FontAwesomeIcon icon={searchIcon} size="lg" color="black" style={{ paddingRight: '10px' }} />
          <input className={styles.input} type="text" placeholder="Search..." value={query} onChange={handleInputChange} />
        </div>
      </div>

      {router.pathname.includes('/Search/') &&
        <>
          <div style={{ display: 'flex' }}>
            <label><h5>SortByTag : </h5></label>
            <select value={tags[tags.length - 1]} onChange={handleTag}>
              <option value={'Beans'}>Beans</option>
              <option value={'Vegetable'}>Vegetable</option>
              <option value={'Oven'}>Oven</option>
              <option value={'Dessert'}>Dessert</option>
              <option value={'Healthy'}>Healthy</option>
              <option value={'Fruit'}>Fruit</option>
            </select>
            {tags.map((tag, index) => {
              return (<button key={index} onClick={handleDeleteTag} value={tag}>{tag}</button>)
            })}
          </div>

          <div style={{ display: 'flex' }}>
            <label><h5>SortByOrd : </h5></label>
            <select value={prep} onChange={handelSortByPrep}>
              <option value={1}>Ascending</option>
              <option value={-1}>Descending</option>
            </select>
          </div>

          <div style={{ display: 'flex' }}>
            <label><h5>SortByCat : </h5></label>
            <select value={category} onChange={handleCategory}>
              {categories[0].map((category, index) => <option key={index} value={category}>{category}</option>)}
            </select>
          </div>

          <div style={{ display: 'flex' }}>
            <label><h5>SortByIng : </h5></label>
            <select value={ingredients[ingredients.length - 1]} onChange={handleIngredients}>
              <option value={'onion'}>onion</option>
              <option value={'garlic'}>garlic</option>
              <option value={'potatoes'}>potatoes</option>
              <option value={'butter'}>butter</option>
              <option value={'milk'}>milk</option>
              <option value={'egg'}>egg</option>
              <option value={'mushrooms'}>mushrooms</option>
              <option value={'salt'}>salt</option>
              <option value={'ricotta cheese'}>ricotta cheese</option>
            </select>
            {ingredients.map((ingredient, index) => {
              return (<button key={index} onClick={handleDeleteIngredients} value={ingredient}>{ingredient}</button>)
            })}
          </div>

          <Link href={`/Search/${search}?Prep=${prep}&Tags=${tags}&Categories=${category}&Ingredients=${ingredients}`}>
            <button>submit</button>
          </Link>
          <Link href={`/Search/${search}?Prep=${prep}&Tags=${tags}&Categories=${category}&Ingredients=${ingredients}`}>
            <button onClick={handleDeleteAllFilters}>Clear All Filters</button>
          </Link>
        </>
      }

    </div>


  );
}

export default SearchBar;
