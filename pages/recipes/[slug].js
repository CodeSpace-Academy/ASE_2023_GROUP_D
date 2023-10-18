import React, { useState } from 'react';
import UpdateDescription from '../../components/recipes/UpdateDescription'; // Make sure to provide the correct path
import { run, run2,} from '../../fetching-data/data'
const Recipe = (props) => {

  const recipes = props.recipes;
  const allergens = props.allergens;
  const ingredientsArray = Object.entries(recipes.ingredients).map(([ingredient, amount]) => `${ingredient}: ${amount}`);

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

      <button onClick={() => setIsEditingDescription(!isEditingDescription)}>
        {isEditingDescription ? 'Cancel' : 'Update Description'}
      </button>

      <h2>allergens</h2>
      <ul>
        {allergens.map((allergen, index) => (
          <li key={index}>{allergen}</li>
        ))}
      </ul>

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

export async function getStaticPaths() {

  const docs = await run();
  const paths = docs.map((recipe) => ({ params: { slug: recipe._id } }));

  return {
    paths: paths,
    fallback: false
  }
}
