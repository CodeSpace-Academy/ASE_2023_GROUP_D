
// import Link from 'next/link';
// import React, { useState } from 'react';

// function FilterAndSortTags({ recipes }) {
//     const [tag, setTag] = useState('');
//     const [filteredRecipes, setFilteredRecipes] = useState([]);


import Link from 'next/link';
import React, { useState } from 'react';

function FilterAndSortTags({ recipes }) {
    const [tag, setTag] = useState('');
    const [loading, setLoading] = useState(false);
    const [filteredRecipes, setFilteredRecipes] = useState([]);

    function handleFindTags() {
        setLoading(true); // Set loading state to true

        setTimeout(() => {
            
            const filtered = recipes.filter(recipe => recipe.tags.includes(tag));
            setFilteredRecipes(filtered);
            setLoading(false); 
        }, 1000); // Simulated 1 second delay (adjust as needed)
    }

    return (
        <div>
            <div>
                <label htmlFor="tag">Enter Tag: </label>
                <input
                    type='text'
                    id="tagString"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                />
            </div>
            <div>
                <Link href={`/filters/1/${tag}`}>
                    <button onClick={handleFindTags} disabled={loading}>
                        {loading ? 'Loading...' : 'Find Recipes Tags'}
                    </button>
                </Link>
                {loading && <p>Loading recipes...</p>}
            </div>
        </div>
    );
}

export default FilterAndSortTags;










