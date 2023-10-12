import React, { useEffect } from 'react';
import { run } from '@/fetching-data/data'
import RecipesInstructions from '@/components/recipes-instructions';


const Recipe = (props) => {

  useEffect(() => {
    console.log('props.recipes')
  })

  return (
    <RecipesInstructions recipes={props.recipes} />
  );

};

export default Recipe;

export async function getStaticProps(context) {
  const recipeId = context.params.slug;
  const docs = await run();
  const recipes1 = docs[0].find((recipe) => recipe._id === recipeId)

  return {
    props: {
      recipes: recipes1,

    },
  }
}

export async function getStaticPaths() {
  
  const docs = await run();
  const paths =  docs[0].map((recipe) => ({params: {slug : recipe._id}}));

  return {
      paths: paths,
      fallback: false
      }
}

// export async function getServerSideProps(context) {
//   const { slug } = context.query;
//   // const recipe = recipes.find((r) => r._id.toString() === slug);

//   if(slug){
//   return {
//     props: { recipe },
//   };
// }
// }

