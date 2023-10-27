import { React, useState } from "react";
import RecipesItems from "./recipes-items";
import styles from './recipes-list.module.css'

function RecipeList({ recipes, patcheNo }) {
  const [sortingOption, setSortingOption] = useState("newest-to-oldest");

  function sortByPublishedDate() {
    const sortedRecipes = [...recipes];
    if (sortingOption === "newest-to-oldest") {
      sortedRecipes.sort((a, b) => new Date(b.published) - new Date(a.published));
    } else if (sortingOption === "oldest-to-newest") {
      sortedRecipes.sort((a, b) => new Date(a.published) - new Date(b.published));
    }
    return sortedRecipes;
  
  };
    const sortedRecipes = sortByPublishedDate();

    const handleSortingChange = (e) => {
      setSortingOption(e.target.value);
    };

  return (
    <div className={styles.container}>

      <div>
        <select value={sortingOption} onChange={handleSortingChange}>
          <option value="newest-to-oldest">Newest First</option>
          <option value="oldest-to-newest">Oldest First</option>
        </select>
      </div>

      <ul className={styles.list}>
        {sortedRecipes.map((recipe) => (
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
          />
        ))} 
      </ul>
      
    </div>
  );
}

export default RecipeList;




