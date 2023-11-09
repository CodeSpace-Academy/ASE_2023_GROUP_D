import React, { useState } from 'react';
import UpdateDescription from '@/components/recipes/UpdateDescription'; // Make sure to provide the correct path
import { runFilter, run2, runFav } from '../../../fetching-data/data'
import styles from '@/stylespages/RecipeDetails.module.css'
// import styles from '@/components/recipes/UpdateDescription.module.css'
import RecipesInstructions from '@/components/instructions/instructions'
import ErrorComponent from '../../../components/Errors/errors'

const Recipe = ({ recipeId, favRecipes, data1, allergens }) => {
  const [favRecipeIds, setFavRecipeIds] = useState(favRecipes.map((recipe) => recipe._id))
  const [favToggle, setFavToggle] = useState(favRecipeIds.includes(recipeId) ? true : false)
  const [hoverToggle, setHoverToggle] = useState(false)

  const recipes = data1[0];

  // Convert the ingredients object into an array of strings.

  const ingredientsArray = Object.entries(recipes.ingredients).map(([ingredient, amount]) => `${ingredient}: ${amount}`);
  // Filter allergens based on ingredients
  const allergensForRecipe = allergens.filter(allergen =>
    ingredientsArray.some(ingredient => ingredient.includes(allergen))
  );
  //calculate the number of hours by dividing recipes.cook by 60 and using Math.floor to get the whole number of hours.
  const hours = Math.floor(recipes.cook / 60);
  //calculate the number of remaining minutes by using the modulo operator (%) to get the remainder when dividing by 60.
  const minutes = recipes.cook % 60;

  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editedDescription, setEditedDescription] = useState(recipes.description);
  const handleSaveDescription = (updatedDescription) => {
    // Here, you should implement logic to save the updated description.
    console.log("Updated Description:", updatedDescription);
    setEditedDescription(updatedDescription);
    setIsEditingDescription(false);
  };

  const tagsString = recipes.tags.join(', ');
  const recipeToBeInsertedToFav = {
    _id: recipeId,
    title: recipes.title,
    images: [recipes.images[0]],
    description: recipes.description,
    prep: recipes.prep,
    cook: recipes.cook,
    category: recipes.category,
    servings: recipes.servings,
    published: recipes.published
  }

  async function addToFavourite(recipeData) {
    const response = await fetch('/api/favourites', {
      method: 'POST',
      body: JSON.stringify(recipeData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong!");
    }
    else {
      setFavToggle(!favToggle)
    }

  }

  async function removeFromFavourite(recipeId) {
    const response = await fetch('/api/favourites', {
      method: 'DELETE',
      body: JSON.stringify(recipeId),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Recipe failed to delete");
    }
    else if (response.ok) {
      setFavToggle(!favToggle)
    }
  }


  return (
    <div className={styles.recipeDetails}>
      <div className={styles.leftColumn}>
        <h1 className={styles.recipeTitle}>{recipes.title}</h1>
        <br />
        <img className={styles.recipeImage} src={recipes.images[0]} alt={recipes._id} width={250} height={250} />
        {favToggle ? (
          <button onClick={() => removeFromFavourite({ _id: recipeId })}>Remove From Fav</button>
        ) : (
          <button onClick={() => addToFavourite(recipeToBeInsertedToFav)}>Add To Fav</button>
        )}

        {isEditingDescription ? (
          <UpdateDescription
            initialDescription={editedDescription}
            onSave={handleSaveDescription}
          />
        ) : null}
        <br />
        <h1 className={styles.recipeTitle}>{recipes.title}</h1>
        <br />
        <img className={styles.recipeImage} src={recipes.images[0]} alt={recipes._id} width={200} height={200} />

        <UpdateDescription description={recipes.description} recipeId={recipeId} />

        <p>
          Cooking time: {hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''} ` : ''}{' '}
          {minutes > 0 ? `${minutes} minute${minutes > 1 ? 's' : ''} ` : ''}
        </p>
        <h2 className={styles.allergens}>Allergens</h2>
        {allergensForRecipe.length > 0 ? (
          <ul>
            {allergensForRecipe.map((allergen, index) => (
              <li key={index}>{allergen}</li>
            ))}
          </ul>
        ) : (
          <p>No allergens present in this recipe.</p>
        )}
        <h2 className={styles.tags}>Tags</h2>
        <div className={styles.tagsContainer}>
          {tagsString ? (
            <p className={styles.tagBlock}>{tagsString}</p>
          ) : (
            <ErrorComponent message="Failed to load tags" />
          )}
        </div>
      </div>

      <div className={styles.rightColumn}>
        <div className={styles.rightContentContainer}>
          <h2 className={styles.ingredients}>Ingredients</h2>
          <ul>
            {ingredientsArray.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>

          <h2 className={styles.instructions}>Instructions</h2>
          <RecipesInstructions instructions={recipes.instructions} recipeId={recipeId} />
        </div>
      </div>
    </div>
  );
};


export async function getServerSideProps(context) {
  const recipeId = context.params.slug;
  const recipedataNo = context.params.recipeId;

  const docs2 = await run2();
  const data1 = await runFilter(recipedataNo, { _id: recipeId })
  const favRecipes = await runFav(1);

  return {
    props: {
      recipeId,
      favRecipes,
      data1,
      allergens: docs2 && docs2.length > 0 ? docs2[0] : null,
    },
  }
}
export default Recipe;
