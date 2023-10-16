import React, { useState } from "react";
import RecipesItems from "./recipes-items";
import LoadMoreButton from "../ui/button/button"; // Import the LoadMoreButton component
import styles from './recipes-list.module.css';

function RecipeList(props) {
  const { recipes } = props;
<<<<<<< HEAD
  return (
<div className={styles.recipeContainer}>
<h1>Make your Own Recipe</h1>
    <ul className={styles.list}>
      
      {recipes.map((recipe) => (
        <RecipesItems
          key={recipe._id}
          id={recipe._id}
          title={recipe.title}
          image={recipe.images[0]}
          description={recipe.description}
          prep={recipe.prep}
          cook={recipe.cook}
          category={recipe.category}
          servings={recipe.servings}
          published={recipe.published}
          images={recipe.images}
        />

      ))}
    </ul>
    </div>

  )

=======
  const [visibleRecipes, setVisibleRecipes] = useState(10); // Show the first 10 recipes
  const [remainingRecipes, setRemainingRecipes] = useState(recipes.length - visibleRecipes);
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = () => {
    setIsLoading(true);
    const batchSize = 10; // Number of recipes to load at a time
    const newVisibleRecipes = visibleRecipes + batchSize;
    const newRemainingRecipes = recipes.length - newVisibleRecipes;
    // Update remaining recipes count
    setRemainingRecipes(newRemainingRecipes);

    // Simulate an API call to fetch more recipes (you can replace this with your actual API call)
    setTimeout(() => {
      setVisibleRecipes(newVisibleRecipes);
      setIsLoading(false);
    }, 1000); // Simulated delay of 1 second
  };

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {recipes.slice(0, visibleRecipes).map((recipe) => (
          <RecipesItems
            key={recipe._id}
            id={recipe._id}
            title={recipe.title}
            image={recipe.images[0]}
            description={recipe.description}
            prep={recipe.prep}
            cook={recipe.cook}
            category={recipe.category}
            servings={recipe.servings}
            published={recipe.published}
          />
        ))}
      </ul>
      {visibleRecipes < recipes.length && (
        <LoadMoreButton onClick={loadMore} remaining={remainingRecipes} />
      )}
      {isLoading && <p>Loading...</p>}
    </div>
  );
>>>>>>> main
}

export default RecipeList;
