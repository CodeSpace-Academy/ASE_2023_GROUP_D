import { runFilter } from "@/fetching-data/data";
import RecipeList from "@/components/recipes/recipes-list";
import Navbar from "@/components/header/navbar";
import SearchBar from "@/components/text-search/auto-submission";
import { useRouter } from "next/router";

function Search({ filteredCharacters }) {
    const router = useRouter();
    const {search} = router.query
    return (
        <>
            <Navbar />
            <SearchBar  search={search} />
            {/* Render the 'RecipeList' component, passing in the first 20 items of the 'filteredCharacters' array and 'patcheNo' as a prop. */}
            <RecipeList recipes={filteredCharacters.slice(0, 20)} patcheNo={1} />
        </>
    )
}

export async function getServerSideProps(context) {

    const searchChar = context.params.search
    console.log(searchChar)
    {/* Display a list of recipes, showing the first 20 recipes from the search results. */ }
    const filterCharacter = { title: { $regex: searchChar, $options: 'i' } }

    console.log(filterCharacter)
    const filteredCharacters = await runFilter(1, filterCharacter)
 

    return {
        props: {
            filteredCharacters,
        },
    }
}

export default Search;


