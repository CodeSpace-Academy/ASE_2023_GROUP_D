import React, { useState, useEffect } from "react";
import RecipesItems from "./recipes-items";
import Sort from "../Navbar/sort-by-prep/sort-by-prep";
import styles from "./recipes-list.module.css";;
import FilterSteps from "../Navbar/Filter/filterBySteps";
function RecipeList({ recipes, patcheNo }) {
  const [sortedRecipes, setSortedRecipes] = useState(recipes);
  const [sortOrder, setSortOrder] = useState("ascending");
  const [sortingOption, setSortingOption] = useState("default"); 
  const [defaultSortOrder, setDefaultSortOrder] = useState("ascending"); 

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
    setSortingOption("default");
    setDefaultSortOrder(newSortOrder);
  };

  const filterRecipesByPrepTime = (maxPrepTime) => {
    const filteredRecipes = recipes.filter((recipe) => {
      if (maxPrepTime === "90+") {
        return recipe.prep >= 90;
      }
      return recipe.prep <= maxPrepTime;
    });
    setSortedRecipes(filteredRecipes);
    setSortingOption("default");
  };

  const handleSortingChange = (e) => {
    const selectedOption = e.target.value;
    setSortingOption(selectedOption);

    if (selectedOption === "default") {
      const sorted = [...recipes];
      if (defaultSortOrder === "ascending") {
        sorted.sort((a, b) => new Date(a.published) - new Date(b.published));
      } else {
        sorted.sort((a, b) => new Date(b.published) - new Date(a.published));
      }
      setSortedRecipes(sorted);
      setSortOrder(defaultSortOrder);
    } else if (selectedOption === "newest-to-oldest") {
      const newToOld = [...sortedRecipes];
      newToOld.sort((a, b) => new Date(b.published) - new Date(a.published));
      setSortedRecipes(newToOld);

    } else if (selectedOption === "oldest-to-newest") {
      const oldToNew = [...sortedRecipes];
      oldToNew.sort((a, b) => new Date(a.published) - new Date(b.published));
      setSortedRecipes(oldToNew);
    }
  };

  const [filteredRecipes, setFilteredRecipes] = useState(null);
  const [noRecipesMessage, setNoRecipesMessage] = useState(null);
  const [numSteps, setNumSteps] = useState('');
const [isLoading, setIsLoading] = useState(false);

  const handleFilterBySteps = async (numSteps) => {
    try {
      setIsLoading(true);
  
      const res = await fetch(`/api/filterBySteps?numSteps=${numSteps}`);
      const filteredData = await res.json();
  
      if (filteredData.length > 0) {
        setSortedRecipes(filteredData);
        setNoRecipesMessage(null);
      } else {
        setSortedRecipes([]);
        setNoRecipesMessage(`No recipes with ${numSteps} steps found.`);
      }
    } catch (error) {
      console.error('Error filtering by steps:', error);
      setSortedRecipes([]);
      setNoRecipesMessage('An error occurred while filtering recipes.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
<FilterSteps onFilter={handleFilterBySteps} isLoading={isLoading} />
      <Sort sortOrder={sortOrder} onSortOrderChange={sortRecipesByPrepTime} />
      <div>
        <button onClick={() => filterRecipesByPrepTime(15)}>{"< 15 min"}</button>
        <button onClick={() => filterRecipesByPrepTime(30)}>{"< 30 min"}</button>
        <button onClick={() => filterRecipesByPrepTime(45)}>{"< 45 min"}</button>
        <button onClick={() => filterRecipesByPrepTime(60)}>{"< 60 min"}</button>
        <button onClick={() => filterRecipesByPrepTime(90)}>{"< 90 min"}</button>
        <button onClick={() => filterRecipesByPrepTime("90+")}>{"> 90 min"}</button>
      </div>

      <div className={styles.container}>
        <br />
        <div>
          <label htmlFor="sortOrder">Sort by Date: </label>
          <select value={sortingOption} onChange={handleSortingChange}>
            <option value="default">Default Sorting</option>
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

