import { run, run1 } from '@/fetching-data/data';
import RecipeList from '@/components/recipes/recipes-list';
import { useRouter } from 'next/router';
import { useState } from 'react';


function Recipe({recipes, categories}) {

  const router = useRouter();
  const { recipeId } = router.query
  
  const [loadmore, setLoadMore] = useState(80)
  const [loadData, setLoadData] = useState(20)

  const recipes20 = recipes.slice(0, loadData)
  // loadmore == 0 && setLoadMore(80) 
  // loadmore == 0 && setLoadData(20) 
  // console.log(loadmore)
  // console.log(loadData)
  return (
    <>
      <RecipeList recipes={recipes20} categories={categories} patcheNo={recipeId} />
      <button onClick={() => {
       setLoadMore( loadmore - 20)
       setLoadData(loadData + 20)
      }}
        disabled={loadmore == 0 ? true : false}
      >Load More {`(${loadmore})`}</button>

    </>
  )
}

export async function getServerSideProps(context) {
  const patcheNo = context.params.recipeId;
  const recipes = await run(parseInt(patcheNo));
  const categories = await run1();
  return {
    props: {
      recipes,
      categories,
    },
  };
}

export default Recipe;