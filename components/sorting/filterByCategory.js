import { useState } from "react";

function FilterByCategory({ categories, setCategory, category }) {
    const [chosenValue, setChosenValue] = useState(category)

    function handleCategory(event) {
        setCategory(event.target.value)
        setChosenValue(event.target.value)
    }

    return (
        <div style={{ display: 'flex' }}>
            <label><h5 style={{ color: 'white' }}>FilterByCat : </h5></label>
            <select value={chosenValue} onChange={handleCategory}>
                <option value={undefined}>Choose...</option>
                {categories[0].map((category, index) => {
                    return <option key={index} value={category}>{category}</option>
                })
                }
            </select>
        </div>
    )
}

export default FilterByCategory;