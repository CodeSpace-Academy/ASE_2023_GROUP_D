import { run } from '@/fetching-data/data';
import RecipeList from '@/components/recipes/recipes-list'

function Home({initialData}) {

  return (
    <>
      {<RecipeList recipes={initialData} />} 
      <button>Load more</button>
    </>
  )
}

export async function getServerSideProps() {
  const initialData = await run(1);
  return {
    props: {
      initialData,
    }
  }
}

// export async function getServerSideProps() {
//   const docs = await run();
//   const docs1 = await run1();
//   return {
//     props: {
//       recipes: docs,
//       categories: docs1,
//     },
//   };
// }

export default Home;