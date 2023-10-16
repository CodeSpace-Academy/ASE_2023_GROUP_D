import React from "react";
import RecipesItems from "./recipes-items";
import styles from './recipes-list.module.css';

function RecipeList(props) {
  const { recipes } = props;
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

}


export default RecipeList;