// pages/[slug].js
import { recipes } from '../../data';
import React, {useState} from 'react';
import Link from 'next/link';

const Recipe = ({ recipe }) => {
  const [showIngredients, setShowIngredients] = useState(false);

  const toggleIngredients = () => {
    setShowIngredients(!showIngredients);
  };

  return (
    <div>
    <h1>{recipe.title}</h1>
    <p>{recipe.description}</p>
    <button onClick={toggleIngredients}>
      {showIngredients ? 'Hide Ingredients' : 'View Ingredients'}
    </button>
    {showIngredients && (
      <div>
        <h2>Ingredients for {recipe.title}</h2>
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
    )}
  </div>
  );
};

export default Recipe;

export async function getServerSideProps(context) {
  const { slug } = context.query;
  const recipe = recipes.find((r) => r._id.toString() === slug);

  return {
    props: { recipe }, 
  };
}
