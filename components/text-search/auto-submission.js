import { useState } from "react";
import Link from "next/link";
import styles from "./searchBar.module.css";

function SearchBar() {
    // State to store the search query
    const [query, setQuery] = useState('');

    // Function to handle the search button click
    const handleSearch = () => {
        // Call the onSearch function with the current query as an argument
        onSearch(query);
    };
    return (
        <section>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '12vh' }}>
                <div className={styles.searchBar}>
                    <input className={styles.input} type="text"  placeholder=" Enter text ..." onChange={e => setQuery(e.target.value)} />
                    <Link href={`/Search/${query}`}>
                        <button className={styles.button}>Search</button></Link>
                </div>
            </div>
        </section>
    );
}

export default SearchBar;


