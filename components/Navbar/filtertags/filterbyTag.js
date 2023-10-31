
// import Link from 'next/link';
// import React, { useState } from 'react';

// function FilterAndSortTags({ recipes }) {
//     const [tag, setTag] = useState('');
//     const [filteredRecipes, setFilteredRecipes] = useState([]);

//     function handleFindTags() {
//         // Filter recipes based on the entered tag
//         const filtered = recipes.filter(recipe => recipe.tags.includes(tag));
//         setFilteredRecipes(filtered);  
//     }

//     return (
//         <div>
//             <div>
//                 <label htmlFor="tag">Enter Tag: </label>
//                 <input
//                     type='text'
//                     id="tagString"
//                     value={tag}
//                     onChange={(e) => setTag(e.target.value)}
//                 />
//             </div>
//             <div>
//                 <Link href={`/filters/1/${tag}`}>
//                     <button onClick={handleFindTags}>Find Recipes Tags</button>
//                 </Link>
//             </div>

//         </div>
//     );
// }

// export default FilterAndSortTags;

import Link from 'next/link';
import React, { useState } from 'react';

function FilterAndSortTags({ recipes }) {
    const [tag, setTag] = useState('');
    const [loading, setLoading] = useState(false);
    const [filteredRecipes, setFilteredRecipes] = useState([]);

    function handleFindTags() {
        setLoading(true); // Set loading state to true

        // Simulate a delay to mimic a loading state (you can replace this with your actual filtering logic)
        setTimeout(() => {
            // Filter recipes based on the entered tag
            const filtered = recipes.filter(recipe => recipe.tags.includes(tag));
            setFilteredRecipes(filtered);
            setLoading(false); // Set loading state to false after filtering
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










