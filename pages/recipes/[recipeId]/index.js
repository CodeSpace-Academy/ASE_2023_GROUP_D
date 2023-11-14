import { run, runFav, runCategories, runFilter2 } from '@/fetching-data/data';
import RecipeList from '@/components/recipes/recipes-list';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/header/navbar';
import styles from '@/components/header/summary.module.css'
import Footer from '@/components/footer/footer';
import { useEffect } from 'react';

function Recipe({ recipes, favRecipes, categories, patcheNo, searchChar }) {

  const router = useRouter();
  const { recipeId } = router.query
  const [isSorting, setIsSorting] = useState(false);

  useEffect(() => {
    setIsSorting(false)
  }, [router])

  return (
    <>
      <Navbar categories={categories} pageNo={patcheNo} searchChar={searchChar} setIsSorting={setIsSorting} isSorting={isSorting} />

      <div >
        <img src="/images/food-image - Copy.jpg" alt="logo" width={1471} height={253} />

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

      <RecipeList recipes={recipes} patcheNo={recipeId} favRecipes={favRecipes} search={searchChar} />

      <div>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>


        </div>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
          {recipeId > 1 && (
            <Link href={`/recipes/${parseInt(recipeId) - 1}`}>
              <button className={styles.button}> Previous </button>
            </Link>
          )}
          <Link href={`/recipes/${parseInt(recipeId) + 1}`}>
            <button className={styles.button}> Next </button>
          </Link>
        </div>

      </div>
      <br />
      <Footer />
    </>
  )
}

export async function getServerSideProps(context) {
  const finalSearchString = {}
  const sort1 = context.query.sort
  const Tags = context.query.tags
  const Categories = context.query.categories
  const Ingredients = context.query.ingredients

  const searchChar = context.query.search === undefined ? null : context.query.search
  const sortChar = sort1 === undefined ? {} : { [sort1.slice(0, sort1.indexOf('_'))]: sort1.slice(sort1.indexOf('_') + 1, sort1.length) }
  searchChar ? finalSearchString.title = { $regex: searchChar, $options: 'i' } : undefined
  Tags ? finalSearchString.tags = { $all: (Tags.split(',')) } : undefined
  Categories ? finalSearchString.category = Categories : undefined
  Ingredients ? (Ingredients.split(',')).map((ingredient)=> finalSearchString[`ingredients.${ingredient}`] = {$exists: true}) : undefined

  const patcheNo = context.params.recipeId;
  const data = await run(patcheNo);
  const favRecipes = await runFav(1);
  const categories = await runCategories();
  const filteredCharacters = await runFilter2(1, finalSearchString, sortChar);


  const recipes = filteredCharacters

  return {
    props: {
      recipes,
      favRecipes,
      categories,
      patcheNo,
      searchChar,
    },
  };
}

export default Recipe;