
import React, { useState } from 'react';
import UpdateDescription from '@/components/recipes/UpdateDescription'; // Make sure to provide the correct path
import { run, run2 } from '../../../fetching-data/data'
import styles from '@/stylespages/RecipeDetails.module.css'
import RecipesInstructions from '@/components/instructions/instructions'


const Recipe = ({ recipeId, data1, allergens }) => {

  const recipes = data1;
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


  return (

    <div className={styles.recipeDetails}>
      <div className={styles.leftColumn}>
        <h1 className={styles.recipeTitle}>{recipes.title}</h1>
        <br/>
        <img className={styles.recipeImage} src={recipes.images[0]} alt={recipes._id} width={250} height={250} />
        {isEditingDescription ? (
          <UpdateDescription
            initialDescription={editedDescription}
            onSave={handleSaveDescription}
          />
        ) : (
          editedDescription ? (
            <p className={styles.description}>{editedDescription}</p>
          ) : (
            <ErrorComponent message="Failed to load description" />
          )
        )}
        <button className={styles.updateButton}
          onClick={() => setIsEditingDescription(!isEditingDescription)}>
          {isEditingDescription ? 'Cancel' : 'Update Description'}
        </button>
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
            <p className={styles.tagBlock} >{tagsString}</p>
          ) : (
            <ErrorComponent message="Failed to load tags" />)}

        </div>

      </div>
      <div className={styles.rightColumn}>
        <div className={styles.rightContentContainer}>
          <p>Cook Time: {hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''} ` : ''} {minutes > 0 ? `${minutes} minute${minutes > 1 ? 's' : ''} ` : ''}</p>
          <h2 className={styles.ingredients}>Ingredients</h2>
          <ul>
            {ingredientsArray.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <h2 className={styles.instructions}>Instructions</h2>
          <RecipesInstructions instructions={recipes.instructions} />
          {/* {recipes.instructions.length > 0 ? (
         <ol>
           {recipes.instructions.map((step, index) => (
             <li key={index}>{step}</li>
           ))}
         </ol>
     ) : (
        <ErrorComponent message="Failed to load instructions" />
      )} */}
        </div>
      </div>
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
      allergens: docs2[0],
    },
  }
}
export default Recipe;
