// import { useState } from "react";

// function Search() {

//     const [searchedIngredients, setSearchedIngredients] = useState();
//     const [ingredientTags, setIngredientTags] = useState("")

//     //console.log(searchedIngredients)

//     async function getdata() {
//         await fetch(`/api/search?filter=${searchedIngredients}`)
//             .then((response) => response.json())
//             .then((data) => {
//                 const recipesData = data.filteredRecipes
//                 console.log(recipesData)
//             })
//     }


//     return (
//         <>
//             <div>
//                 <input type='text' value={searchedIngredients}
//                     id="ingredientString"
//                     onChange={(e) => setSearchedIngredients(e.target.value)}
//                 />
//                 {/* <Link href={'/search/1'} > */}
//                 <button onClick={getdata}>Add Ingredient</button>
//                 {/* </Link> */}
//             </div>

//         </>
//     )
// }

// export default Search;






