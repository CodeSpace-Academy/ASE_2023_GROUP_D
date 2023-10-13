import React, { useEffect } from 'react';
import { run,run2 } from '@/fetching-data/data'


const Recipe = (props) => {
const recipes = props.recipes
const allergens = props.allergens
console.log(recipes)

  return (
     <div className='.recipeDetails'>
     <h1>{recipes.title}</h1>
     <img src={recipes.images[0]} alt={recipes._id} width={200} height={200}/>
     <ol>
      {recipes.instructions.map((res,index) => <li key={index}>{res}</li>)}
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
      allergens : docs2,
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

