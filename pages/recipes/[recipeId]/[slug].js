import React, { useState } from 'react';
import UpdateDescription from '@/components/recipes/UpdateDescription';
import SuccessNotification from '@/components/Errors/SuccessNotification';
import ErrorNotification from '@/components/Errors/ErrorNotification';
import { run, run2 } from '../../../fetching-data/data';
import styles from '@/components/recipes/UpdateDescription.module.css';
import RecipesInstructions from '@/components/instructions/instructions';
import ErrorComponent from '../../../components/Errors/errors';
import Image from 'next/image';

const Recipe = ({ recipeId, data1, allergens }) => {
  const recipes = data1;
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

  return (
    <div className='recipeDetails'>
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
      <h1>{recipes.title}</h1>
      <img src={recipes.images[0]} alt={recipes._id} width={200} height={200} />
      {isEditingDescription ? (
        <UpdateDescription
          initialDescription={editedDescription}
          onSave={handleSaveDescription}
        />
      ) : (
        editedDescription ? (
          <p>{editedDescription}</p>
        ) : (
          <ErrorComponent message="Failed to load description" />
        )
      )}
      <button className={styles['update-button']}
        onClick={() => setIsEditingDescription(!isEditingDescription)}>
        {isEditingDescription ? 'Cancel' : 'Update Description'}
      </button>
      <p>Cook Time: {hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''} ` : ''} {minutes > 0 ? `${minutes} minute${minutes > 1 ? 's' : ''} ` : ''}</p>
      <h2>Allergens</h2>
      {allergensForRecipe.length > 0 ? (
        <ul>
          {allergensForRecipe.map((allergen, index) => (
            <li key={index}>{allergen}</li>
          ))}
        </ul>
      ) : (
        <p>No allergens present in this recipe.</p>
      )}
      <h2>Tags</h2>
      {tagsString ? (
        <p>{tagsString}</p>
      ) : (
        <ErrorComponent message="Failed to load tags" />
      )}
      <h2>Ingredients</h2>
      <ul>
        {ingredientsArray.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h2>Instructions</h2>
      <RecipesInstructions instructions={recipes.instructions} />
    </div>
  );
};

export async function getServerSideProps(context) {
  const recipeId = context.params.slug;
  const recipedataNo = context.params.recipeId;

  console.log(recipeId)
  console.log(recipedataNo)

  const docs2 = await run2();

  const data = await run(recipedataNo)
  const data1 = data.filter((recipe) => recipe._id === recipeId)[0]
  return {
    props: {
      recipeId,
      data1,
      allergens: docs2 && docs2.length > 0 ? docs2[0] : null,
    },
  }
}
export default Recipe;
