import React, { useState } from 'react';
import UpdateDescription from '@/components/description/description';
import SuccessNotification from '@/components/Errors/SuccessNotification';
import ErrorNotification from '@/components/Errors/ErrorNotification';
import { run2, runFilter, runFav } from '../../../fetching-data/data';
import styles from '@/stylespages/RecipeDetails.module.css';
import RecipesInstructions from '@/components/instructions/instructions';
import ErrorComponent from '../../../components/Errors/errors';


const Recipe = ({ recipeId, favRecipes, data1, allergens }) => {
  const [favRecipeIds, setFavRecipeIds] = useState(favRecipes.map((recipe) => recipe._id))
  const [favToggle, setFavToggle] = useState(favRecipeIds.includes(recipeId) ? true : false)
  const recipes = data1[0];
  // Convert the ingredients object into an array of strings.

  const ingredientsArray = Object.entries(recipes.ingredients).map(([ingredient, amount]) => `${ingredient}: ${amount}`);
  const allergensForRecipe = allergens ? allergens.filter(allergen =>
    ingredientsArray.some(ingredient => ingredient.includes(allergen))
  ) : [];
  const hours = Math.floor(recipes.cook / 60);
  const minutes = recipes.cook % 60;

  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editedDescription, setEditedDescription] = useState(recipes.description);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [showErrorNotification, setShowErrorNotification] = useState(false);

  const handleSaveDescription = async (updatedDescription) => {
    try {
      if (!updatedDescription.trim()) {
        setEmptyDescriptionError(true);
        return; // Do not proceed if the description is empty
      }

      // If the update is successful, show the success notification.
      console.log("Updated Description:", updatedDescription);
      setEditedDescription(updatedDescription);
      setIsEditingDescription(false);
      setShowSuccessNotification(true);

      // Simulate closing the success notification after a few seconds (you can adjust the duration)
      setTimeout(() => {
        setShowSuccessNotification(false);
      }, 5000);
    } catch (error) {
      console.error("Error updating description:", error);
      setShowErrorNotification(true);
    }
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
        {showSuccessNotification && (
          <SuccessNotification
            message="Description updated successfully."
            onClose={() => setShowSuccessNotification(false)}
          />
        )}
        {showErrorNotification && (
          <ErrorNotification
            message="Failed to update description. Please try again later."
            onClose={() => setShowErrorNotification(false)}
          />
        )}
        <br/>
        <h1 className={styles.recipeTitle}>{recipes.title}</h1>
        <br/>
        <img className={styles.recipeImage} src={recipes.images[0]} alt={recipes._id} width={200} height={200} />
        
        <UpdateDescription description={recipes.description} recipeId={recipeId}/>

        <p>Cooking time: {hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''} ` : ''} {minutes > 0 ? `${minutes} minute${minutes > 1 ? 's' : ''} ` : ''}</p>
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
          <RecipesInstructions instructions={recipes.instructions} recipeId={recipeId}/>
          

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
