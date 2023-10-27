import { runSearch } from "@/fetching-data/data";
import RecipeList from "@/components/recipes/recipes-list";

function Search({filteredCharacters}) {
    return (
        <>
        <RecipeList recipes={filteredCharacters.slice(0, 20)}  patcheNo={1} />
        </>
        )
}

export async function getServerSideProps(context) {
   
    const searchChar = context.params.search
    const filterCharacter = { title: {$regex: searchChar, $options: 'i'}}
 
    console.log(filterCharacter)
    const filteredCharacters = await runSearch(1, filterCharacter)
 

    return {
        props: {
            filteredCharacters,
        },
    }
}

export default Search;


