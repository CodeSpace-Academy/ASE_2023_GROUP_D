function FilterByTag({setTags, tags}) {

    function handleTag(event) {
        setTags((prev) => [...prev, event.target.value])
    }

    function handleDeleteTag(event) {
        setTags(tags.filter((tag) => tag !== event.target.value))
      }

    return (
        <div style={{ display: 'flex'}}>
            <label><h5 style={{color: 'white'}}>FilterByTag : </h5></label>
            <select value={tags[tags.length - 1]} onChange={handleTag}>
                <option value={''}>Choose...</option>
                <option value={'Beans'}>Beans</option>
                <option value={'Vegetable'}>Vegetable</option>
                <option value={'Oven'}>Oven</option>
                <option value={'Dessert'}>Dessert</option>
                <option value={'Healthy'}>Healthy</option>
                <option value={'Fruit'}>Fruit</option>
            </select>
            {tags.map((tag, index) => {
                return (<button key={index} onClick={handleDeleteTag} value={tag}>{tag}</button>)
            })}
        </div>
    )
}

export default FilterByTag;