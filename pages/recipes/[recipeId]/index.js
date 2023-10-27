import { run, run1 } from '@/fetching-data/data';
import RecipeList from '@/components/recipes/recipes-list';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SearchBar from '@/components/text-search/auto-submission';
import Navbar from '@/components/header/navbar';
import styles from '@/components/header/summary.module.css'
import Footer from '@/components/footer/footer';



function Recipe({ recipes, categories }) {

  const router = useRouter();
  const { recipeId } = router.query

  const [loadmore, setLoadMore] = useState(80)
  const [loadData, setLoadData] = useState(20)

  return (
    <>
      <Navbar />
      <div >
        <Image src="/images/food-image - Copy.jpg" alt="logo" width={1471} height={253} />

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
      </div>
      <div className={styles.footer}>
        <h1 className={styles.summaryTitle}>Explore Our Delicious Recipes</h1>
        <p className={styles.summaryText}>
          <span className={styles.italianoFont}>
            Indulge in a culinary adventure like never before. Our handpicked selection of recipes caters to every palate,
            from savory delights to sweet temptations.
          </span> Discover the art of cooking and create memorable dining experiences for yourself and your loved ones. Whether you're a seasoned chef or just starting your culinary journey, our recipes are designed to inspire, educate, and satisfy your taste buds.
        </p>
      </div>

      <RecipeList recipes={recipes.slice(0, loadData)} categories={categories} patcheNo={recipeId} />

      <div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '30px 0' }}>
          <button onClick={() => {
            setLoadMore(loadmore - 20)
            setLoadData(loadData + 20)
          }}
            disabled={loadmore == 0 ? true : false}
            className="maroon-button">Load More {`(${loadmore})`}
          </button>
        </div>
        <div className="button-container">
          {recipeId > 1 && (
            <Link href={`/recipes/${parseInt(recipeId) - 1}`}>
              <button
                onClick={() => {
                  setLoadData(20);
                  setLoadMore(80);
                }}
                className="maroon-button"
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
              className="maroon-button"
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