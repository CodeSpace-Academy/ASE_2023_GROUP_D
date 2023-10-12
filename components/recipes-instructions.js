import { useState } from "react";

function RecipeInstruction (props){
const [showIngredients, setShowIngredients] = useState(false);
const recipes = props.recipes
    const toggleIngredients = () => {
      setShowIngredients(!showIngredients);
    };

return (
    <div>
      <h1>{recipes.title}</h1>
      <p>{recipes.description}</p>

      {/* {showIngredients && (
        <div>
          <h2>Ingredients for {recipes.title}</h2>
          <ul>
            {ingredientsArray.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
      )} */}

      <button onClick={toggleIngredients}>
        {showIngredients ? 'Hide Ingredients' : 'View Ingredients'}
      </button>
    </div>
)
}

export default RecipeInstruction()