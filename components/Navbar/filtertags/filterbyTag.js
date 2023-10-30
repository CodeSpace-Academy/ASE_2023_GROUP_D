import React, { useState } from 'react';
import Link from 'next/link';
import styles from '@/components/Navbar/filtertags/filterByTags.module.css';

function FilterAndSortTags({ recipes }) {
    const [tag, setTag] = useState('');
    const [filteredRecipes, setFilteredRecipes] = useState([]);

    function handleFindTags() {
        // Filter recipes based on the entered tag
        const filtered = recipes.filter(recipe => recipe.tags.includes(tag));
        setFilteredRecipes(filtered);
    }

    return (
        <div className={styles.container}>
          <div>
            <label htmlFor="tag" className={styles.label}>
              Enter Tag:
            </label>
            <input
              type="text"
              id="tagString"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.buttonContainer}>
            <Link href={`/filters/1/${tag}`}>
                <br/>
              <div >
                <button onClick={handleFindTags} className={styles.button}>
                  Find Recipes
                </button>
              </div>
            </Link>
          </div>
        </div>
      );
    };

export default FilterAndSortTags;













