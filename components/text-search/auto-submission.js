import { useEffect, useState } from "react";
// import { run } from "@/fetching-data/data";

function SearchBar() {
    const [query, setQuery] = useState('');
    return ( 
        <section>
<div>
    <label htmlFor="search">Search</label>
    <input type="text" onChange={e => setQuery(e.target.value)} />
    <button type="submit">Submit</button>

</div>
        </section>
         );
}

export default SearchBar;