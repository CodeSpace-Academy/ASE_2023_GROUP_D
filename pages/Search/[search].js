import { runFilter2, runFav, runCategories } from "@/fetching-data/data";
import RecipeList from "@/components/recipes/recipes-list";
import Navbar from "@/components/header/navbar";
import SearchBar from "@/components/text-search/auto-submission";
import styles from '@/components/header/summary.module.css'
import { useState } from "react";
import { useRouter } from "next/router";
import Footer from "@/components/footer/footer";


function Search({ filteredCharacters, favRecipes, categories }) {
    const router = useRouter();
    const { search } = router.query
    const [loadmore, setLoadMore] = useState(filteredCharacters.length)
    const [loadData, setLoadData] = useState(20)

    return (
        <>
            <Navbar />
            <SearchBar search={search} categories={categories} />
            {/* Render the 'RecipeList' component, passing in the first 20 items of the 'filteredCharacters' array and 'patcheNo' as a prop. */}
            {filteredCharacters.length > 0 ? <RecipeList recipes={filteredCharacters.slice(0, loadData)} patcheNo={1} favRecipes={favRecipes} search={search} /> : <h2>No Matching Recipes Based On Search</h2>}

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button onClick={() => {
                    setLoadMore(loadmore - 20)
                    setLoadData(loadData + 20)
                }}
                    disabled={loadmore == 0 ? true : false}
                    className={`${styles.button} `}
                >Load More {`(${loadmore})`}
                </button>
            </div>
         <Footer />
        </>
    )
}

export async function getServerSideProps(context) {

    const finalSearchString = {}

    const searchChar = context.params.search
    const Tags = context.query.Tags
    const Prep = parseInt(context.query.Prep)
    const Categories = context.query.Categories
    const Ingredients = context.query.Ingredients
    const tagsArray = Tags.split(',');
    const ingredientsArray = Ingredients.split(',');
  
    const sortCharacter = Prep ? { prep: Prep } : {}
    searchChar ? finalSearchString.title = { $regex: searchChar, $options: 'i' } : undefined
    Tags ? finalSearchString.tags = { $all: tagsArray } : undefined
    Categories ? finalSearchString.category = Categories : undefined
    Ingredients ? ingredientsArray.map((ingredient)=> finalSearchString[`ingredients.${ingredient}`] = {$exists: true}) : undefined

    const filteredCharacters = await runFilter2(1, finalSearchString, sortCharacter)
    const favRecipes = await runFav(1);
    const categories = await runCategories();

    return {
        props: {
            filteredCharacters,
            favRecipes,
            categories,
        },
    };
}

export default Search;


