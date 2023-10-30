import { runSearch } from "@/fetching-data/data";
import RecipeList from "@/components/recipes/recipes-list";
import Navbar from "@/components/header/navbar";

function Search({ filteredCharacters }) {
    return (
        <>
            <Navbar />
            {/* Render the 'RecipeList' component, passing in the first 20 items of the 'filteredCharacters' array and 'patcheNo' as a prop. */}
            <RecipeList recipes={filteredCharacters.slice(0, 20)} patcheNo={1} />
        </>
    )
}

export async function getServerSideProps(context) {

    const searchChar = context.params.search
    {/* Display a list of recipes, showing the first 20 recipes from the search results. */ }
    const filterCharacter = { title: { $regex: searchChar, $options: 'i' } }

    console.log(filterCharacter)
    // This is the list of recipes that were found based on the user's search.
    const filteredCharacters = await runSearch(1, filterCharacter)

    // Send the list of recipes to be displayed on the webpage.
    return {
        props: {
            filteredCharacters,
        },
    }
}

export default Search;


