import React from 'react';
import { run } from '@/fetching-data/data'
import { run2 } from '@/fetching-data/data';
import styles from './[slug].module.css'
import RecipeInstructions from '@/components/instructions/instructions';


const Recipe = (props) => {
  const recipes = props.recipes
  const allergens = props.allergens
  //const ingredients = recipes.ingredients



  const ingredientsArray = Object.entries(recipes.ingredients).map(([ingredient, amount]) => `${ingredient}: ${amount}`);
  // console.log(recipes)
  // console.log(recipes.ingredients)

  return (
    <div className={styles.recipePreview}>
      <div className={styles.container1}>
        <div>
          <h1>{recipes.title}</h1>
          <img src={recipes.images[0]} alt={recipes._id} width={200} height={200} />
        </div>


      </div>

      <div className={styles.container2}>
        <div>
          <h3>allergens</h3>
          <ul>
            {allergens.map((allergen, index) => (
              <li key={index}>{allergen}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Ingredients</h3>
          <ul>
            {ingredientsArray.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.instructions}>
        <h3>Instructions</h3>
        <RecipeInstructions instructions={recipes.instructions} />
      </div>

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

// export async function getServerSideProps(context) {
//   const recipeId = context.params.slug;
//   const docs = await run();
//   const docs2 = await run2();
//   const recipe = docs.find((recipe) => recipe._id === recipeId);

//   return {
//     props: {
//       recipe: recipe,
//       allergens: docs2[0],
//     },
//   };
// }