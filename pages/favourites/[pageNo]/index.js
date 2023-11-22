import { runFav, runCategories } from '@/fetching-data/data';
import RecipeList from '@/components/recipes/recipes-list';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/header/navbar';

function Recipe({ favRecipes, patcheNo, categories }) {

  const [noFavorites, setNoFavorites] = useState(favRecipes.length === 0);
  const [isSorting, setIsSorting] = useState(false);

  // Use useEffect to update noFavorites state when favRecipes change
  useEffect(() => {
    setNoFavorites(favRecipes.length === 0);
  }, [favRecipes]);


  return (
    <>
      <Navbar categories={categories} setIsSorting={setIsSorting} isSorting={isSorting} />
      <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '30px 0', fontSize: '36px', fontWeight: 'bold', color: '#333' }}>
        FAVOURITES
      </h1>
      {noFavorites ? ( // Display message when there are no favorites
        <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '100px 0', fontSize: '24px', color: '#999' }}>No Favourites Available</h1>
      ) : (
        <>
          <RecipeList recipes={favRecipes} patcheNo={patcheNo} favRecipes={favRecipes} />

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '30px 0' }}>
            {patcheNo > 1 && (
              <Link href={`/favourites/${parseInt(patcheNo) - 1}`}>
                <button className="maroon-button">Previous</button>
              </Link>
            )}

            {favRecipes.length === 100 && (
              <Link href={`/favourites/${parseInt(patcheNo) + 1}`}>
                <button className="maroon-button">Next</button>
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
  const categories = await runCategories();

  return {
    props: {
      categories,
      patcheNo,
      favRecipes,
    },
  };
}

export default Recipe;