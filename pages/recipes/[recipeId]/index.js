import { run, run1 } from '@/fetching-data/data';
import RecipeList from '@/components/recipes/recipes-list';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';


function Recipe({ recipes, categories }) {

  const router = useRouter();
  const { recipeId } = router.query

  const [loadmore, setLoadMore] = useState(80)
  const [loadData, setLoadData] = useState(20)

  return (
    <>
      <Image src="/images/BrandLogo.png" alt="logo" width={300} height={100} />

      {recipeId > 1 &&
        <Link href={`/recipes/${parseInt(recipeId) - 1}`}>
          <button onClick={() => {
            setLoadData(20)
            setLoadMore(80)
          }} >Previous</button>
        </Link>}
      <Link href={`/recipes/${parseInt(recipeId) + 1}`}>
        <button onClick={() => {
          setLoadData(20)
          setLoadMore(80)
        }} >Next</button>
      </Link>

      <RecipeList recipes={recipes.slice(0, loadData)} categories={categories} patcheNo={recipeId} />
      <button onClick={() => {
        setLoadMore(loadmore - 20)
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