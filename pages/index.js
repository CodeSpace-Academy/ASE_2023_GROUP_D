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

export default Home;