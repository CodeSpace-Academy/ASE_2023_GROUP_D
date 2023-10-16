import React, { useEffect } from 'react';
import { run } from '@/fetching-data/data'
import { run2 } from '@/fetching-data/data';


const Recipe = (props) => {
   // Extract recipes and allergens from the props.
  const recipes = props.recipes
  const allergens = props.allergens

    // Convert the ingredients object into an array of strings.
  const ingredientsArray = Object.entries(recipes.ingredients).map(([ingredient, amount]) => `${ingredient}: ${amount}`);
  console.log(recipes.cook)
  console.log(recipes.cook)

  const hours = Math.floor(recipes.cook / 60)
  const minutes = recipes.cook % 60;

  return (
    <div className='.recipeDetails'>
      <h1>{recipes.title}</h1>
      <img src={recipes.images[0]} alt={recipes._id} width={200} height={200} />
      <p>{recipes.description}</p>
      <p>Cook Time: {hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''}` : ''} {minutes > 0 ? `${minutes} minute${minutes > 1 ? 's' : ''}` : ''}</p>

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