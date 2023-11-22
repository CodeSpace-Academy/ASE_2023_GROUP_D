import styles from "./searchBar.module.css"

import { useState } from "react";


/**
 * 
 * @param {String} categories recipes property from recipes collection.
 * @param {Function} setCategory is state function it eanbles categories to be filtered.
 * @returns selection element to be filtered by category.
 */

function FilterByCategory({ categories, setCategory, category }) {
    const [chosenValue, setChosenValue] = useState(category)

    function handleCategory(event) {
        setCategory(event.target.value)
        setChosenValue(event.target.value)
    }

    return (
        <div style={{ display: 'flex' }}>
            <label><h5 style={{ color: 'white' }}>Filter By Category: </h5></label>
            <div className={styles.catdropdown}>
                <select className={styles.dropdown} value={chosenValue} onChange={handleCategory} className={styles.filters}>
                    <option value={''}>Choose...</option>
                    {categories[0].map((category, index) => {
                        return <option key={index} value={category}>{category}</option>
                    })
                    }
                </select>
            </div>
        </div>
    )
}

export default FilterByCategory;