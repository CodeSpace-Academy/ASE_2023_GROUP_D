import React from "react";
import RecipesItems from "./recipes-items";
import styles from './recipes-list.module.css';


function RecipeList(props) {
  const { recipes } = props;

  return (

    <ul className={styles.list}>
      {recipes.map((recipe) => (
        <RecipesItems
          key={recipe._id}
          title={recipe.title}
          description={recipe.description}
          prep={recipe.prep}
          cook={recipe.cook}
          category={recipe.category}
          servings={recipe.servings}
          published={recipe.published}
        />

      ))}
    </ul>

  )

}
export default RecipeList




