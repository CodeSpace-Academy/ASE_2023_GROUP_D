// import React from "react";
// import RecipesItems from "./recipes-items";
// //import LoadMoreButton from "../ui/button/button"; // Import the LoadMoreButton component
// import styles from './recipes-list.module.css'

// function RecipeList({ recipes, patcheNo }) {

//   return (
//     <div className={styles.container}>
//       <ul className={styles.list}>
//         {recipes.map((recipe) => (
//           <RecipesItems
//             key={recipe._id}
//             id={recipe._id}
//             patcheNo={patcheNo}
//             title={recipe.title}
//             image={recipe.images[0]} 
//             description={recipe.description}
//             prep={recipe.prep}
//             cook={recipe.cook}
//             category={recipe.category}
//             servings={recipe.servings}
//             published={recipe.published}
//           />
//         ))} 
//       </ul>
//       {/* {visibleRecipes < recipes.length && (
//         <LoadMoreButton onClick={loadMore} remaining={remainingRecipes} />
//       )}
//       {isLoading && <p>Loading...</p>} */}
//     </div>
//   );
// }

// export default RecipeList;



import React, { useState } from "react";
import RecipesItems from "./recipes-items";
import SearchBar from "../text-search/text-search-highlighting"; // Import the SearchBar component
import styles from './recipes-list.module.css';

function RecipeList({ recipes, patcheNo }) {
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);

  const handleSearch = (searchQuery) => {
    // Filter the recipes based on the search query
    const filtered = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredRecipes(filtered);
  };

  return (
    <div className={styles.container}>
      <SearchBar onSearch={handleSearch} /> {/* Pass the onSearch function */}
      <ul className={styles.list}>
        {filteredRecipes.map((recipe) => (
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

