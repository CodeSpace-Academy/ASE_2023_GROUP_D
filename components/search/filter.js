import { useState } from "react";


function Search() {

 

    const [searchedIngredients, setSearchedIngredients] = useState();
    const [ingredientTags, setIngredientTags] = useState("")
    // const one1 = {$exists: true}
    // const on12 = 'ingredients.'+ingredientTags

    // const search = ingredientTags.map((ingre) => {
    //      const on12 = 'ingredients.'+ingre
    //     const one1 = {$exists: true}
    //      oneObject.ingredients = {one1}
    // })
    // const oneObject = {[on12]: one1}
    // console.log(oneObject)

    console.log(searchedIngredients)
    // console.log(ingredientTags)

    async function getdata() {
        await fetch(`/api/search?filter=${searchedIngredients}`)
        .then((response) => response.json())
        .then((data)=> {
           console.log(data.filteredRecipes)
        })
    }

    // async function getdata() {
    //     try {
    //         const response = await fetch(`/api/search`);
    //         if (response.ok) {
    //             const data = await response.json();
    //             const ingredients = data.ingredients; // Extract the ingredients property
    //             console.log(ingredients);
    //         } else {
    //             console.error('Failed to fetch data');
    //         }
    //     } catch (error) {
    //         console.error('An error occurred:', error);
    //     }
    // }
    
   
    

    return (
        <>
            <div>
                <input type='text' value={searchedIngredients}
                    id="ingredientString"
                    onChange={(e) => setSearchedIngredients(e.target.value)}
                />
                {/* <Link href={'/search/1'} > */}
                <button onClick={
                    // if (searchedIngredients.trim() !== '') {
                    //     setIngredientTags([...ingredientTags, searchedIngredients]);
                    //     setSearchedIngredients(''); // Clear the input field after adding the tag
                    // }
                //    setIngredientTags(searchedIngredients)
                   getdata
                
                    //console.log(ingredientTags)
                }>Add Ingredient</button>
                {/* </Link> */}
            </div>
          
        </>
    )
}


export default Search;


