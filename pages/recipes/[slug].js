import React from 'react';
import { run } from '@/fetching-data/data';

const Recipe = (props) => {
  const { recipes } = props;

  // Convert the ingredients object into an array of strings
  const ingredientsArray = Object.entries(recipes.ingredients).map(([ingredient, amount]) => `${ingredient}: ${amount}`);

  return (
    <>
      <h1>{recipes.title}</h1>
      <img src={recipes.images[0]} alt={recipes._id} width={200} height={200} />
      <p>{recipes.description}</p>
      {recipes.allergens && recipes.allergens.length > 0 && (
        <div>
          <h2>Allergens</h2>
          <ul>
            {recipes.allergens.map((allergen, index) => (
              <li key={index}>{allergen}</li>
            ))}
          </ul>
        </div>
      )}
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
    </>
  );
};

export default Recipe;

export async function getStaticProps(context) {
  const recipeId = context.params.slug;
  const docs = await run();
  const recipes1 = docs.find((recipe) => recipe._id === recipeId);

  return {
    props: {
      recipes: recipes1,
    },
  };
}

export async function getStaticPaths() {
  const docs = await run();
  const paths = docs.map((recipe) => ({ params: { slug: recipe._id } }));

  return {
    paths: paths,
    fallback: false,
  };
}



