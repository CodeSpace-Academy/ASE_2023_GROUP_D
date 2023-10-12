// pages/[slug].js
// import { recipes } from '../../data';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { getRecipeById } from '@/components/recipes';
import Link from 'next/link';

const Recipe = () => {
 const recipeId = useRouter().query.slug;
 const recipe = getRecipeById(recipeId);
  // const [showIngredients, setShowIngredients] = useState(false);


  // const toggleIngredients = () => {
  //   setShowIngredients(!showIngredients);
  // };

console.log(recipe)
  // const ingredientsArray = Object.values(recipe.ingredients);

  return (
    <div>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>

      {showIngredients && (
        <div>
          <h2>Ingredients for {recipe.title}</h2>
          <ul>
            {ingredientsArray.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
      )}

      <button onClick={toggleIngredients}>
        {showIngredients ? 'Hide Ingredients' : 'View Ingredients'}
      </button>
    </div>
  );
};

export default Recipe;

// export async function getServerSideProps(context) {
//   const { slug } = context.query;
//   // const recipe = recipes.find((r) => r._id.toString() === slug);

//   if(slug){
//   return {
//     props: { recipe },
//   };
// }
// }

