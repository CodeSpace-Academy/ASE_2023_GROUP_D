import { runFav, runCategories, runFilter2, runHistory } from '@/fetching-data/data';
import RecipeList from '@/components/recipes/recipes-list';
import { useRouter } from 'next/router';
import { useState } from 'react';
import LoadingState from '@/components/Loading/loading-state';
import Navbar from '@/components/header/navbar';
import styles from '@/components/header/summary.module.css'
import Footer from '@/components/footer/footer';
//import { useEffect } from 'react';

/**
 * Recipe Component
 * @param {Object} props - Properties passed to the component
 * @returns {JSX.Element} - Rendered React component
 */

function Recipe({ recipes, favRecipes, categories, patcheNo, searchChar, historyData, tags, ingredients, categoryfilter, steps, instructions, published }) {

  const router = useRouter();
  const { recipeId } = router.query
  const [isSorting, setIsSorting] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const changePathname = (pageNumber) => {
    const { query } = router
    const newUrl = {
      pathname: `/recipes/${pageNumber}`,
      query: { ...query },
    };
    router.push(newUrl)
  };


  useEffect(() => {
    setIsSorting(false)
  }, [router])

  return (
    <>
      {
        isLoading && <LoadingState />
      }

      <Navbar categories={categories} pageNo={patcheNo} searchChar={searchChar} setIsSorting={setIsSorting} isSorting={isSorting} history={historyData} filterByTags={tags} filterByIngredients={ingredients} categoryfilter={categoryfilter} filterBySteps={steps} />

      <div >
        <img className={styles.image} src="/images/food-image - Copy.jpg" alt="logo" width='100%' />

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

      <RecipeList recipes={recipes} patcheNo={recipeId} favRecipes={favRecipes} search={searchChar} setLoading={setLoading}/>

      <div>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>


        </div>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
          {recipeId > 1 && (
            <button onClick={() => changePathname(parseInt(recipeId) - 1)} className={styles.button}> Previous </button>
          )}
          {recipes.length === 100 && (
            <button onClick={() => changePathname(parseInt(recipeId) + 1)} className={styles.button}> Next </button>
          )}
        </div>

      </div>
      <br />
      <Footer />
    </>
  )
}

/**
 * Server-side function to fetch data for the component
 * @param {Object} context - Context object from Next.js
 * @returns {Object} - Props to be passed to the component
 */

export async function getServerSideProps(context) {
  const finalSearchString = {}
  const sort1 = context.query.sort
  const filterByTags = context.query.tags
  const filterByCategories = context.query.categories
  const filterByIngredients = context.query.ingredients
  const filterBySteps = context.query.steps

  const searchChar = context.query.search === undefined ? null : context.query.search
  const sortChar = (sort1 === 'undefined' || sort1 === undefined) ? {} : { [sort1.slice(0, sort1.indexOf('_'))]: sort1.slice(sort1.indexOf('_') + 1, sort1.length) }
  searchChar ? finalSearchString.title = { $regex: searchChar, $options: 'i' } : undefined
  filterByTags ? finalSearchString.tags = { $all: (filterByTags.split(',')) } : undefined
  filterByCategories ? finalSearchString.category = filterByCategories : undefined
  filterByIngredients ? (filterByIngredients.split(',')).map((ingredient) => finalSearchString[`ingredients.${ingredient}`] = { $exists: true }) : undefined
  filterBySteps ? finalSearchString.instructions = { $size: parseInt(filterBySteps) } : undefined

  const patcheNo = context.params.recipeId;
  const favRecipes = await runFav(1);
  const categories = await runCategories();
  const history = await runHistory();
  const filteredCharacters = await runFilter2(patcheNo, finalSearchString, sortChar);
  const historyData = history.map((data) => {
    return data.searchWord
  })

  const recipes = filteredCharacters
  const tags = filterByTags ? filterByTags.split(',') : []
  const ingredients = filterByIngredients ? filterByIngredients.split(',') : []
  const categoryfilter = filterByCategories ? filterByCategories : ''
  const steps = filterBySteps ? filterBySteps : ''

  return {
    props: {
      steps,
      categoryfilter,
      ingredients,
      tags,
      recipes,
      favRecipes,
      categories,
      patcheNo,
      searchChar,
      historyData,
    },
  };
}

export default Recipe;