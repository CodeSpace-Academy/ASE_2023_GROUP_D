import React, { useState, useEffect } from "react";
import RecipesItems from "./recipes-items";
import RecipesFavItems from "./recipes-FavItems";
import styles from "./recipes-list.module.css";
import { useRouter } from "next/router";
import SortByOrder from "../sorting/sortByOrder";
import LoadingState from "../Loading/loading-state";


function RecipeList({ recipes, patcheNo, favRecipes, search }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className={styles.container}>

      <div className={styles.container}>
        <br /> 
        <SortByOrder/>
       {/* <LoadingState /> */}
       {recipes.length === 0 && <h5>No Filter Recipes Matching</h5>}
        <ul className={styles.list}>
          {(router.pathname.includes('/recipes/')) ?
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
                favRecipes={favRecipes}
                search={search}
              />
            )) 
            :
            recipes.map((recipe) => (
              <RecipesFavItems
                key={recipe._id}
                id={recipe._id}
                patcheNo={patcheNo}
                title={recipe.title}
                image={recipe.images}
                description={recipe.description}
                prep={recipe.prep}
                cook={recipe.cook}
                category={recipe.category}
                servings={recipe.servings}
                published={recipe.published}
                favRecipes={favRecipes}
              />))}
        </ul>
      </div>
    </div>
  );
}

export default RecipeList;

