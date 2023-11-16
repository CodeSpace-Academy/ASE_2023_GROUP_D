function FilterByIngrediets({ setIngredients, ingredients }) {

    function handleIngredients(event) {
        setIngredients((prev) => [...prev, event.target.value])
    }

    function handleDeleteIngredients(event) {
        setIngredients(ingredients.filter((ingredient) => ingredient != event.target.value))
    }

    return (
        <div style={{ display: 'flex' }}>
            <label><h5 style={{color: 'white'}}>FilterByIng : </h5></label>
            <select value={ingredients[ingredients.length - 1]} onChange={handleIngredients}>
                <option value={''}>Choose...</option>
                <option value={'onion'}>onion</option>
                <option value={'garlic'}>garlic</option>
                <option value={'potatoes'}>potatoes</option>
                <option value={'butter'}>butter</option>
                <option value={'milk'}>milk</option>
                <option value={'egg'}>egg</option>
                <option value={'mushrooms'}>mushrooms</option>
                <option value={'salt'}>salt</option>
                <option value={'ricotta cheese'}>ricotta cheese</option>
            </select>

            {ingredients.map((ingredient, index) => {
                return (<button key={index} onClick={handleDeleteIngredients} value={ingredient}>{ingredient}</button>)
            })}
        </div>
    )
}

export default FilterByIngrediets;