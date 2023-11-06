import { runFav } from '@/fetching-data/data';
import RecipeList from '@/components/recipes/recipes-list';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/header/navbar';


function Recipe({ favRecipes, patcheNo }) {

  const [loadmore, setLoadMore] = useState(favRecipes.length)
  const [loadData, setLoadData] = useState(20)

  return (
    <>
      <Navbar />
      {favRecipes.length > 0 ?
        <>
          <h1>FAVOURITES</h1>

          <RecipeList recipes={favRecipes.slice(0, loadData)} patcheNo={patcheNo} favRecipes={favRecipes} />

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '30px 0' }}>

            {patcheNo > 1 &&
              <Link href={`/favourites/${parseInt(patcheNo) - 1}`}>
                <button onClick={() => {
                  setLoadData(20)
                  setLoadMore(80)
                }} className="maroon-button" >Previous
                </button>
              </Link>}

            <button onClick={() => {
              setLoadMore(loadmore - 20)
              setLoadData(loadData + 20)
            }}
              disabled={loadmore == 0 || favRecipes.length < 100 ? true : false}
              className="maroon-button">Load More {`(${loadmore})`}
            </button>

            {favRecipes.length === 100 && <Link href={`/favourites/${parseInt(patcheNo) + 1}`}>
              <button onClick={() => {
                setLoadData(20)
                setLoadMore(80)
              }} className="maroon-button" >Next
              </button>
            </Link>}
          </div>


        </>
        : <h1>No Favourites Available</h1>
      }
    </>
  )
}

export async function getServerSideProps(context) {
  const patcheNo = context.params.pageNo;
  const favRecipes = await runFav(parseInt(patcheNo));
  return {
    props: {
      patcheNo,
      favRecipes,
    },
  };
}

export default Recipe;