import { run, run1 } from '@/fetching-data/data';
import RecipeList from '@/components/recipes/recipes-list';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SearchBar from '@/components/text-search/auto-submission';


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
          }} className="maroon-button" >Previous
          </button>
        </Link>}
      <Link href={`/recipes/${parseInt(recipeId) + 1}`}>
        <button onClick={() => {
          setLoadData(20)
          setLoadMore(80)
        }} className="maroon-button" >Next
        </button>
      </Link>
      <SearchBar />
      <RecipeList recipes={recipes.slice(0, loadData)} categories={categories} patcheNo={recipeId} />

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '30px 0' }}>
        <button onClick={() => {
          setLoadMore(loadmore - 20)
          setLoadData(loadData + 20)
        }}
          disabled={loadmore == 0 ? true : false}
          className="maroon-button">Load More {`(${loadmore})`}
        </button>
      </div>


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