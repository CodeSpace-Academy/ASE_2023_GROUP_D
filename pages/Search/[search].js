import { runFilter2, runFav } from "@/fetching-data/data";
import RecipeList from "@/components/recipes/recipes-list";
import Navbar from "@/components/header/navbar";
import SearchBar from "@/components/text-search/auto-submission";
import { useRouter } from "next/router";

function Search({ filteredCharacters, favRecipes}) {
    const router = useRouter();
    const {search} = router.query

    console.log(search)
    console.log(filteredCharacters)
    return (
        <>
            <Navbar />
            <SearchBar  search={search} />
            {/* Render the 'RecipeList' component, passing in the first 20 items of the 'filteredCharacters' array and 'patcheNo' as a prop. */}
            {filteredCharacters.length > 0 ? <RecipeList recipes={filteredCharacters.slice(0, 20)} patcheNo={1} favRecipes={favRecipes}/>: <h2>No Matching Recipes Based On Search</h2>}
        </>
    )
}

export async function getServerSideProps(context) {

    const searchChar = context.params.search
    const Prep = parseInt(context.query.Prep)
    {/* Display a list of recipes, showing the first 20 recipes from the search results. */ }
    const filterCharacter = { title: { $regex: searchChar, $options: 'i' }}
    const sortCharacter = Prep ? {prep: Prep } : {}

    // This is the list of recipes that were found based on the user's search.
    const filteredCharacters = await runFilter2(1, filterCharacter, sortCharacter)
    const favRecipes = await runFav(1);

    // Send the list of recipes to be displayed on the webpage.
    return {
        props: {
            filteredCharacters,
            favRecipes,
        },
    };
}

export default Search;


