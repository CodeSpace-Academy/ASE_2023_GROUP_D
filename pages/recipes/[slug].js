import React, { useEffect } from 'react';
import { run } from '@/fetching-data/data'


const Recipe = (props) => {
const recipes = props.recipes
console.log(recipes)

  return (
      <>
     <h1>{recipes.title}</h1>
     <img src={recipes.images[0]} alt={recipes._id} width={200} height={200}/>
     <ul>
      {recipes.instructions.map((res,index) => <li key={index}>{res}</li>)}
     </ul>
      </>
  );

};

export default Recipe;

export async function getStaticProps(context) {
  const recipeId = context.params.slug;
  const docs = await run();
  const recipes1 = docs.find((recipe) => recipe._id === recipeId)

  return {
    props: {
      recipes: recipes1,

    },
  }
}

export async function getStaticPaths() {
  
  const docs = await run();
  const paths =  docs.map((recipe) => ({params: {slug : recipe._id}}));

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

