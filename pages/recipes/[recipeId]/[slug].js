import React, { useState } from 'react';
import UpdateDescription from '@/components/recipes/UpdateDescription'; // Make sure to provide the correct path
import { run, run2, runFav } from '../../../fetching-data/data'
import styles from '@/components/recipes/UpdateDescription.module.css'

import RecipesInstructions from '@/components/instructions/instructions'


const Recipe = ({ recipeId, favRecipes, data1, allergens }) => {
  const [favRecipeIds, setFavRecipeIds] = useState(favRecipes.map((recipe) => recipe._id))
  const [favToggle, setFavToggle] = useState(favRecipeIds.includes(recipeId) ? true : false)

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
    const response =  await fetch('/api/favourites', {
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
     else{
      setFavToggle(!favToggle) 
     }
     
 }

 async function removeFromFavourite(recipeId) {
  const response =   await fetch('/api/favourites', {
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
     else if(response.ok){
      setFavToggle(!favToggle) 
     }
 }
  

  return (

    <div className='.recipeDetails'>
      <h1>{recipes.title}</h1>
      <img src={recipes.images[0]} alt={recipes._id} width={200} height={200} />
      { favToggle ? <button onClick={() => removeFromFavourite({ _id: recipeId })}>Rev From Fav</button> : <button onClick={() => addToFavourite(recipeToBeInsertedToFav)}>Add To Fav</button>}

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
      <button  className={styles['update-button']}
      onClick={() => setIsEditingDescription(!isEditingDescription)}>
        {isEditingDescription ? 'Cancel' : 'Update Description'}
      </button>
      <p>Cook Time: {hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''} `: ''} {minutes > 0 ? `${minutes} minute${minutes > 1 ? 's' : ''} `: ''}</p>
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
         <ErrorComponent message="Failed to load tags" />       )} 
      <h2>Ingredients</h2>
      <ul>
        {ingredientsArray.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h2>Instructions</h2>
      <RecipesInstructions instructions={recipes.instructions}/>
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
  );
};
export async function getServerSideProps(context) {
  const recipeId = context.params.slug;
  const recipedataNo = context.params.recipeId;
  const docs2 = await run2();
  const data = await run(recipedataNo)
  const favRecipes = await runFav(1);

  const data1 = data.filter((recipe) => recipe._id === recipeId)[0]


  return {
    props: {
      recipeId,
      favRecipes,
      data1,
      allergens: docs2[0],
    },
  }
}
export default Recipe;












