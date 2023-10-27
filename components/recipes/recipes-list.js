import React, { useState, useEffect } from "react";
import RecipesItems from "./recipes-items";
import FilterBySteps from "../Navbar/Filter/FilterSteps";
import FilterByIngredients from '../Navbar/Filter/filterIngredients';
import styles from './recipes-list.module.css';

function RecipeList({ recipes, patcheNo }) {
  const [filteredRecipes, setFilteredRecipes] = useState(null);
  const [noRecipesMessage, setNoRecipesMessage] = useState(null);
  const [ingredients, setIngredients] = useState([]); // Add state for ingredients

  // Populate ingredients array when recipes change
  useEffect(() => {
    // Use runSearch function to fetch recipes from the server
    const fetchData = async () => {
      try {
        const filter = {}; // Add your specific filter criteria here
        const data = await runSearch(1, filter); // Assuming you're on page 1
        const ingredientsArray = data.map(recipe => (
          ...Object.entries(recipe.ingredients).map(([ingredient, amount]) => ({
            name: ingredient,
            amount: amount
          }))
        ));
        setIngredients(ingredientsArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  

  const handleFilterByIngredients = (ingredients) => {
    if (ingredients) {
      const ingredientList = ingredients.split(',').map(ingredient => ingredient.trim().toLowerCase());
      const filtered = recipes.filter(recipe =>
        ingredientList.every(filterIngredient =>
          Object.entries(recipe.ingredients).some(([name, amount]) =>
            `${name}: ${amount}`.toLowerCase().includes(filterIngredient)
          )
        )
      );
  
      if (filtered.length > 0) {
        setFilteredRecipes(filtered);
        setNoRecipesMessage(null);
      } else {
        setFilteredRecipes(null);
        setNoRecipesMessage(`No recipes with ingredients matching "${ingredients}" found.`);
      }
    } else {
      setFilteredRecipes(null);
      setNoRecipesMessage(null);
    }
  };
  
  

  const handleFilterBySteps = (numSteps) => {
    const filtered = recipes.filter(recipe => recipe.instructions.length === numSteps);
    if (filtered.length > 0) {
      setFilteredRecipes(filtered);
      setNoRecipesMessage(null);
    } else {
      setFilteredRecipes(null);
      setNoRecipesMessage(`No recipes with ${numSteps} steps found.`);
    }
  };

  return (
    <div className={styles.container}>
      <FilterBySteps onFilter={handleFilterBySteps} />
      <FilterByIngredients onFilter={handleFilterByIngredients} />
      {noRecipesMessage && <p>{noRecipesMessage}</p>}
      <ul className={styles.list}>
        {filteredRecipes ? (
          filteredRecipes.map((recipe) => (
            <RecipesItems
              key={recipe._id}
              id={recipe._id}
              patcheNo={patcheNo}
              title={recipe.title}
              image={recipe.images[0]}
              description={recipe.description}
              prep={recipe.prep}
              cook={recipe.cook}
              category={recipe.category}
              servings={recipe.servings}
              published={recipe.published}
              instructions={recipe.instructions}
            />
          ))
        ) : (
          recipes.map((recipe) => (
            <RecipesItems
              key={recipe._id}
              id={recipe._id}
              patcheNo={patcheNo}
              title={recipe.title}
              image={recipe.images[0]}
              description={recipe.description}
              prep={recipe.prep}
              cook={recipe.cook}
              category={recipe.category}
              servings={recipe.servings}
              published={recipe.published}
              instructions={recipe.instructions}
            />
          ))
        )}
      </ul>
    </div>
  );
}

export default RecipeList;

