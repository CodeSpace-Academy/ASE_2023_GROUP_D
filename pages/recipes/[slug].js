import React, { useState } from 'react';
import UpdateDescription from '../../components/recipes/UpdateDescription'; // Make sure to provide the correct path
import { run, run2,} from '../../fetching-data/data'
import styles from '../../components/recipes/UpdateDescription.module.css'


const Recipe = (props) => {

  const tagsString = props.recipes.tags.join(', ');

    // Convert the ingredients object into an array of strings.

  const recipes = props.recipes;
  const allergens = props.allergens;
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

  return (
    <div className='.recipeDetails'>
      <h1>{recipes.title}</h1>
      <img src={recipes.images[0]} alt={recipes._id} width={200} height={200} />

      
      {isEditingDescription ? (
        <UpdateDescription
          initialDescription={editedDescription}
          onSave={handleSaveDescription}
        />
      ) : (
        <p>{editedDescription}</p>
      )}

      <button  className={styles['update-button']}
      onClick={() => setIsEditingDescription(!isEditingDescription)}>
        {isEditingDescription ? 'Cancel' : 'Update Description'}
      </button>

      <p>Cook Time: {hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''}` : ''} {minutes > 0 ? `${minutes} minute${minutes > 1 ? 's' : ''}` : ''}</p>

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
      <p>{tagsString}</p>

      <h2>Ingredients</h2>
      <ul>
        {ingredientsArray.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>

      <h2>Instructions</h2>
      <ol>
        {recipes.instructions.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
  );
};

export default Recipe;


export async function getStaticProps(context) {
  const recipeId = context.params.slug;
  const docs = await run();
  const docs2 = await run2();
  const recipes1 = docs.find((recipe) => recipe._id === recipeId)

  return {
    props: {
      recipes: recipes1,
      allergens: docs2[0],
    },
  }
}

// Define a function to specify the paths for pre-rendering
export async function getStaticPaths() {
 // Fetch data using the run function
  const docs = await run();
  // Generate an array of paths based on the recipe IDs
  const paths = docs.map((recipe) => ({ params: { slug: recipe._id } }));

  return {
    paths: paths,
    fallback: false // Specify whether to 404 on paths not returned by getStaticPaths
  }
}
