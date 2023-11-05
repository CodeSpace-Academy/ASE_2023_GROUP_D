import { runFilter } from "@/fetching-data/data";
import RecipeList from "@/components/recipes/recipes-list";
import { useState } from "react";
import Link from "next/link";

function FilteredRecipesIngredients({ recipesfiltered, pageNo }) {
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState('');

  function handleAddIngredient() {
    if (newIngredient.trim() !== '') {
      setIngredients([...ingredients, newIngredient]);
      setNewIngredient(''); // Clear the input field after adding the tag
    }
  }

  function handleRemoveIngredient(ingredientToRemove) {
    const updatedIngredients = ingredients.filter(ingredient => ingredient !== ingredientToRemove);
    setIngredients(updatedIngredients);
  }

  const filteredRecipes = recipesfiltered.filter(recipe => {
    
    return Object.keys(ingredients).every(ingredient => recipe.ingredients.hasOwnProperty(ingredient));
});

  //console.log(filteredRecipes);

  return (
    <>
      <div>
        <label htmlFor="ingredient">Add Another Ingredient: </label>
        <input
          type="text"
          id="ingredientString"
          value={newIngredient}
          onChange={(e) => setNewIngredient(e.target.value)}
        />
        <button onClick={handleAddIngredient}>Add ingredient</button>
        <Link href={`/recipes/${pageNo}`}>
          <button>Back</button>
        </Link>
      </div>

      {ingredients.map((ingredient, index) => (
        <div key={index}>
          <button onClick={() => handleRemoveIngredient(ingredient)} key={ingredient}>{ingredient}</button>
          <RecipeList recipes={filteredRecipes} pageNo={pageNo} />
        </div>
      ))}

      <RecipeList recipes={filteredRecipes} pageNo={pageNo} />
    </>
  );
}

export async function getServerSideProps(context) {
    const pageNo = context.params.pageNumber;
    const tagIngredient = context.params.tagIngredient;
    const filteredRecipes2 = { ingredients: tagIngredient };
    console.log(pageNo);
    // console.log(filteredRecipes2);
    const recipesfiltered = await runFilter(pageNo, filteredRecipes2);
  
    return {
      props: {
        recipesfiltered,
        pageNo,
      },
    };
  }

  export default FilteredRecipesIngredients;