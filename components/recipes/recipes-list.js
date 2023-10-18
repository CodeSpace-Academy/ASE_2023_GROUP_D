import React from "react";
import RecipesItems from "./recipes-items";
//import LoadMoreButton from "../ui/button/button"; // Import the LoadMoreButton component
import styles from './recipes-list.module.css'
import Button from "../ui/button/button";
import Image from "next/image";

function RecipeList(props) {

  const { recipes,patcheNo } = props;

  return (
    <div className={styles.container}>
      <Image src="/images/BrandLogo.png" alt="logo" width={300} height={100} className={styles.logo}/>
      {patcheNo > 1 && <Button link={`/recipes/${parseInt(patcheNo) - 1}`}>Previous</Button>}
      <Button link={`/recipes/${parseInt(patcheNo) + 1}`}>Next</Button>
      <ul className={styles.list}>
        {recipes.map((recipe) => (
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
      {/* {visibleRecipes < recipes.length && (
        <LoadMoreButton onClick={loadMore} remaining={remainingRecipes} />
      )}
      {isLoading && <p>Loading...</p>} */}
    </div>
  );
}

export default RecipeList;




