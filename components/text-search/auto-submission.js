import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "@/components/text-search/searchBar.module.css"
import Link from "next/link";

function SearchBar({ search, categories }) {
  const [query, setQuery] = useState("");
  const [backUpQuery, setBackUpQuery] = useState(search);
  const [handel, setHandelSS] = useState('')
  const [tags, setTags] = useState([])
  const delay = 5000;
  const router = useRouter();
  console.log(categories[0])

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  useEffect(() => {

    if (query) {
      const navigateToNewPage = () => {
        router.push(`/Search/${query ? query : backUpQuery}?Prep=${handel}&Tags=${tags}`); // Replace '/new-page' with the URL of the new page
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

  function handelSS(event) {
    setHandelSS(event.target.value)
  }

  function handleTag(event) {
    setTags((prev) => [...prev, event.target.value])
  }

  function handleDeleteTag(event) {
    setTags(tags.filter((tag) => tag !== event.target.value))
  }

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.searchBar}>
          <input className={styles.input} type="text" placeholder="Enter text ..." value={query} onChange={handleInputChange} />
          <button className={styles.button}>Search</button>
        </div>
      </div>
      <select value={tags[tags.length - 1]} onChange={handleTag}>
        <option value={'Beans'}>Beans</option>
        <option value={'Vegetable'}>Vegetable</option>
        <option value={'Oven'}>Oven</option>
        <option value={'Dessert'}>Dessert</option>
        <option value={'Healthy'}>Healthy</option>
        <option value={'Fruit'}>Fruit</option>
      </select>

      <select value={handel} onChange={handelSS}>
        <option value={1}>Ascending</option>
        <option value={-1}>Descending</option>
      </select>

      <select value={handel} onChange={handelSS}>
        {categories[0].map((category, index)=> <option key={index} value={category}>{category}</option> )}
      </select>
     
      <Link href={`/Search/${query ? query : backUpQuery}?Prep=${handel}&Tags=${tags}`}>
        <button>submit</button>
      </Link>

      {tags.map((tag, index) => {
        return (<button key={index} onClick={handleDeleteTag} value={tag}>{tag}</button>)
      })}
    </div>

    
  );
}

export default SearchBar;
