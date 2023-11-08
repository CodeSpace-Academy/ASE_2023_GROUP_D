import { run, runFav, runCategories } from '@/fetching-data/data';
import RecipeList from '@/components/recipes/recipes-list';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link';
import SearchBar from '@/components/text-search/auto-submission';
import Navbar from '@/components/header/navbar';
import styles from '@/components/header/summary.module.css'
import Footer from '@/components/footer/footer';
import FilterIngredients from '@/components/Navbar/filterByIngredients/filterByIngredients';
//import MatchCategoryToIngredients from '@/components/Navbar/filterCategoriesToMatch/categoryToMatchIngredients';

function Recipe({ recipes, favRecipes, categories }) {

  const router = useRouter();
  const { recipeId } = router.query

  const [loadmore, setLoadMore] = useState(80)
  const [loadData, setLoadData] = useState(20)

  return (
    <>
      <Navbar />
      <div >
        <img className={styles.image} src="/images/food-image - Copy.jpg" alt="logo" width={1471} height={253} />
        {/* {recipeId > 1 &&
          <Link href={`/recipes/${parseInt(recipeId) - 1}`}>
            <button onClick={() => {
              setLoadData(20)
              setLoadMore(80)
            }} className="maroon-button" >Previous
            </button>
          </Link>} */}

      </div>
      <div className={styles.footer}>
        <h1 className={styles.summaryTitle}>Explore Our Delicious Recipes</h1>
        <p className={styles.summaryText}>
          <span className={styles.italianoFont}>
            {`Indulge in a culinary adventure like never before. Our handpicked selection of recipes caters to every palate,
            from savory delights to sweet temptations.
            Discover the art of cooking and create memorable dining experiences for yourself and your loved ones. Whether you're a seasoned chef or just starting your culinary journey, our recipes are designed to inspire, educate, and satisfy your taste buds.`}
          </span>
        </p>
      </div>

      <div className="search-container">
        <SearchBar categories={categories} />
      </div>

      {/* <div>
        <FilterIngredients recipes={recipes} />
      </div> */}
      {/* <Link href={'/favourites/1'}>
        <button className="maroon-button">Favourites</button>
      </Link> */}
      <RecipeList recipes={recipes.slice(0, loadData)} patcheNo={recipeId} favRecipes={favRecipes} />

      <div>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
          
          <button onClick={() => {
            setLoadMore((prev)=> prev - 20)
            setLoadData((prev)=> prev + 20)
          }}
            disabled={loadmore == 0 ? true : false}
            className={`${styles.button} `}
          >Load More {`(${loadmore})`}
          </button>

        </div>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
          {recipeId > 1 && (
            <Link href={`/recipes/${parseInt(recipeId) - 1}`}>
              <button
                onClick={() => {
                  setLoadData(20);
                  setLoadMore(80);
                }}
                className={styles.button}
              >
                Previous
              </button>
            </Link>
          )}
          <Link href={`/recipes/${parseInt(recipeId) + 1}`}>
            <button
              onClick={() => {
                setLoadData(20);
                setLoadMore(80);
              }}
              className={styles.button}
            >
              Next
            </button>
          </Link>
        </div>

      </div>
      <br />
      <Footer />
    </>
  )
}

export async function getServerSideProps(context) {
  const patcheNo = context.params.recipeId;
  const recipes = await run(patcheNo);
  const favRecipes = await runFav(1);
  const categories = await runCategories();
  return {
    props: {
      recipes,
      favRecipes,
      categories,
    },
  };
}

export default Recipe;