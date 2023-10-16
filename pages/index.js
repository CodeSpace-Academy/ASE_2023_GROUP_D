import { run, run1 } from '@/fetching-data/data';
import RecipeList from '@/components/recipes/recipes-list'

function Home(props) {
  //console.log(props.recipes) // recipes data
  // console.log(props.categories) // categories data

  return (
    <>
   <RecipeList recipes={props.recipes} categories={props.categories}/>
   </>
  )
}

export async function getStaticProps() {

  const docs = await run();
  const docs1 = await run1();

  return {
    props: {
      recipes: docs,
      categories: docs1,
    },
    revalidate: 1800,
  }
}

export default Home;





