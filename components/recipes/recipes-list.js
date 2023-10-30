import React, { useState, useEffect } from "react";
import RecipesItems from "./recipes-items";
import FilterBySteps from "../Navbar/Filter/FilterSteps";
import FilterByIngredients from '../Navbar/Filter/filterIngredients';
import styles from './recipes-list.module.css';
import { runFilter } from "@/fetching-data/data";

function RecipeList({ recipes, patcheNo }) {
  const [filteredRecipes, setFilteredRecipes] = useState(null);
  const [noRecipesMessage, setNoRecipesMessage] = useState(null);

  const handleFilterByIngredients = async (ingredients) => {
    if (ingredients) {
      const filter = {
        'ingredients.name': { $regex: ingredients, $options: 'i' } // Case-insensitive search
      };
      const filteredData = await runFilter(1, filter); // Assuming you're on page 1

      if (filteredData.length > 0) {
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
    const filteredData = recipes.filter(recipe => recipe.instructions.length === numSteps);
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
        {(filteredRecipes || recipes).map((recipe) => (
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
        ))}
      </ul>
    </div>
  );
}

export default RecipeList;
