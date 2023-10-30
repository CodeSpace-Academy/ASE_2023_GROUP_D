
import Link from 'next/link';
import React, { useState } from 'react';

function FilterAndSortTags({ recipes }) {
    const [tag, setTag] = useState('');
    const [filteredRecipes, setFilteredRecipes] = useState([]);

    function handleFindTags() {
        // Filter recipes based on the entered tag
        const filtered = recipes.filter(recipe => recipe.tags.includes(tag));
        setFilteredRecipes(filtered);
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
                    <button onClick={handleFindTags}>Find Recipes Tags</button>
                </Link>
            </div>

        </div>
    );
}

export default FilterAndSortTags;













