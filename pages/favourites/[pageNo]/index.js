import { runFav } from '@/fetching-data/data';
import RecipeList from '@/components/recipes/recipes-list';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/header/navbar';
import Footer from '@/components/footer/footer';


function Recipe({ favRecipes, patcheNo }) {

  const [loadmore, setLoadMore] = useState(favRecipes.length)
  const [loadData, setLoadData] = useState(20)
  const [noFavorites, setNoFavorites] = useState(favRecipes.length === 0);

  // Use useEffect to update noFavorites state when favRecipes change
  useEffect(() => {
    setNoFavorites(favRecipes.length === 0);
  }, [favRecipes]);


  return (
    <>
      <Navbar />
      <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '30px 0', fontSize: '36px', fontWeight: 'bold', color: '#333' }}>
        FAVOURITES
      </h1>
      {noFavorites ? ( // Display message when there are no favorites
        <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '100px 0', fontSize: '24px', color: '#999' }}>No Favourites Available</h1>
      ) : (
        <>
          <RecipeList recipes={favRecipes.slice(0, loadData)} patcheNo={patcheNo} favRecipes={favRecipes} />

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '30px 0' }}>
            {patcheNo > 1 && (
              <Link href={`/favourites/${parseInt(patcheNo) - 1}`}>
                <button onClick={() => {
                  setLoadData(20);
                  setLoadMore(80);
                }} className="maroon-button">Previous</button>
              </Link>
            )}

            {/* <button onClick={() => {
                  setLoadMore(loadmore - 20)
                  setLoadData(loadData + 20)
                }}
                  disabled={loadmore == 0 || favRecipes.length < 100 ? true : false}
                  className="maroon-button">Load More {`(${loadmore})`}
                </button> */}

            {favRecipes.length === 100 && (
              <Link href={`/favourites/${parseInt(patcheNo) + 1}`}>
                <button onClick={() => {
                  setLoadData(20);
                  setLoadMore(80);
                }} className="maroon-button">Next</button>
              </Link>
            )}
          </div>
        </>
      )}
    </>
  );
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