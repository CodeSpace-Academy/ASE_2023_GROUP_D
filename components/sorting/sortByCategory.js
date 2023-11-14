function SortByCategory({ categories, setCategory, category }) {


    function handleCategory(event) {
        setCategory(event.target.value)
    }

    return (
        <div style={{ display: 'flex' }}>
            <label><h5 style={{color: 'white'}}>SortByCat : </h5></label>
            <select value={category} onChange={handleCategory}>
                {categories[0].map((category, index) => <option key={index} value={category}>{category}</option>)}
            </select>
        </div>
    )
}

export default SortByCategory;