import { runFilter2, runFav, runCategories } from "@/fetching-data/data";
import RecipeList from "@/components/recipes/recipes-list";
import Navbar from "@/components/header/navbar";
import SearchBar from "@/components/text-search/auto-submission";
import styles from '@/components/header/summary.module.css'
import { useState } from "react";
import { useRouter } from "next/router";

function Search({ filteredCharacters, favRecipes, categories }) {
    const router = useRouter();
    const { search } = router.query
    const [loadmore, setLoadMore] = useState(filteredCharacters.length)
    const [loadData, setLoadData] = useState(20)

    // console.log(search)
    // console.log(filteredCharacters)
    return (
        <>
            <Navbar />
            <SearchBar search={search} categories={categories} />
            {/* Render the 'RecipeList' component, passing in the first 20 items of the 'filteredCharacters' array and 'patcheNo' as a prop. */}
            {filteredCharacters.length > 0 ? <RecipeList recipes={filteredCharacters.slice(0, loadData)} patcheNo={1} favRecipes={favRecipes} /> : <h2>No Matching Recipes Based On Search</h2>}

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


        </>
    )
}

export async function getServerSideProps(context) {

    const finalSearchString = {}

    const searchChar = context.params.search
    const Tags = context.query.Tags
    const Prep = parseInt(context.query.Prep)
    const tagsArray = Tags.split(',');
    // console.log(tagsArray)
    // console.log(Prep)
    {/* Display a list of recipes, showing the first 20 recipes from the search results. */ }
    const filterCharacter = { title: { $regex: searchChar, $options: 'i' }, tags: { $all: tagsArray } }

   
    // context.query.search && { ...finalSearchString, ...{ title: { $regex: searchChar, $options: 'i' } } }
    // context.query.Tags && { ...finalSearchString, ...{ tags: { $all: tagsArray } } }
    const sortCharacter = Prep ? { prep: Prep } : {}
    searchChar ? finalSearchString.title = { $regex: searchChar, $options: 'i' } : undefined
    Tags ? finalSearchString.tags = { $all: tagsArray } : undefined
    
    // This is the list of recipes that were found based on the user's search.
    const filteredCharacters = await runFilter2(1, finalSearchString, sortCharacter)
    const favRecipes = await runFav(1);
    const categories = await runCategories();

    console.log(finalSearchString)
    // Send the list of recipes to be displayed on the webpage.
    return {
        props: {
            filteredCharacters,
            favRecipes,
            categories,
        },
    };
}

export default Search;


