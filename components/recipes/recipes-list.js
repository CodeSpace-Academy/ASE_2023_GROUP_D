// RecipeList.js
import React, { useState } from "react";
import RecipesItems from "./recipes-items";
import Sort from "../Navbar/sort-by-prep/sort-by-prep";
import styles from "./recipes-list.module.css";
function RecipeList({ recipes, patcheNo }) {
  const [sortedRecipes, setSortedRecipes] = useState(recipes);
  const [sortOrder, setSortOrder] = useState("ascending");
  const [sortingOption, setSortingOption] = useState("newest-to-oldest");
  const sortRecipesByPrepTime = (newSortOrder) => {
    const sorted = [...sortedRecipes];
    sorted.sort((a, b) => {
      if (newSortOrder === "ascending") {
        return a.prep - b.prep;
      } else {
        return b.prep - a.prep;
      }
    });
    setSortedRecipes(sorted);
    setSortOrder(newSortOrder);
  };

  const filterRecipesByPrepTime = (maxPrepTime) => {
    const filteredRecipes = recipes.filter((recipe) => {
      if (maxPrepTime === "90+") {
        return recipe.prep >= 90;
      }
      return recipe.prep <= maxPrepTime;
    });
    setSortedRecipes(filteredRecipes);
  };

  //sortByPublishedDate
  // function sortByPublishedDate() {
  //   const sortedRecipes = [...recipes];
   
   
  // };

  //  const sortedRecipes = sortByPublishedDate();

  const handleSortingChange = (e) => {
    setSortingOption(e.target.value);
    if (sortingOption === "newest-to-oldest") {
      const newToOld = sortedRecipes.sort((a, b) => new Date(b.published) - new Date(a.published));
      setSortedRecipes(newToOld);
    } else if (sortingOption === "oldest-to-newest") {
     const oldToNew = sortedRecipes.sort((a, b) => new Date(a.published) - new Date(b.published));
      setSortedRecipes(oldToNew);
    }
  };

  return (
    <div className={styles.container}>
      <Sort
        sortOrder={sortOrder}
        onSortOrderChange={sortRecipesByPrepTime}
      />
      <div>
        <button onClick={() => filterRecipesByPrepTime(15)}>{"< 15 min"}</button>
        <button onClick={() => filterRecipesByPrepTime(30)}>{"< 30 min"}</button>
        <button onClick={() => filterRecipesByPrepTime(45)}>{"< 45 min"}</button>
        <button onClick={() => filterRecipesByPrepTime(60)}>{"< 60 min"}</button>
        <button onClick={() => filterRecipesByPrepTime(90)}>{"< 90 min"}</button>
        <button onClick={() => filterRecipesByPrepTime("90+")}>{"> 90 min"}</button>
      </div>


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
    </div>
  );
}

export default RecipeList;