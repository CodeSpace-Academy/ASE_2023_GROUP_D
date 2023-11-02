// import React, { useState } from 'react';
// import Link from 'next/link';
// import styles from '@/components/Navbar/filtertags/filterByTags.module.css';


// function FilterIngredients({ recipes }) {
//     const [ingredient, setIngredient] = useState('');
//     const [filteredRecipes, setFilteredRecipes] = useState([]);

//     function handleFilterIngredients() {
//         // Filter recipes based on the entered tag
//         const filtered = recipes.filter(recipe => recipe.ingredients.includes(ingredient));
//         console.log(filtered)
//         setFilteredRecipes(filtered);
//     }

//     return (

//         <div className={styles.container}>
//           <div>
//             <label htmlFor="ingredient" className={styles.label}>
//               Enter Ingredient:
//             </label>
//             <input
//               type="text"
//               id="ingredientString"
//               value={ingredient}
//               onChange={(e) => setIngredient(e.target.value)}
//               className={styles.input}
//             />
//           </div>
//           <div className={styles.buttonContainer}>
//             {/* <Link href={`/filteringIngredients/1/${ingredient}`}> */}
//                 <br/>
//               <div >
//                 <button onClick={handleFilterIngredients} className={styles.button}>
//                   Find Ingredients
//                 </button>
//               </div>
//               <ul className={styles.filteredIngredientList}>
//                 {filteredRecipes.map((recipe, index) => (
//                     <li key={index}>{recipe.name} - Ingredients: {recipe.ingredients.join(', ')}</li>
//                 ))}
//             </ul>
//             {/* </Link> */}
//           </div>

//         </div>
//       );
//     };

// export default FilterIngredients;

import React, { useState } from 'react';
import styles from '@/components/Navbar/filtertags/filterByTags.module.css';
import Link from 'next/link';

function FilterIngredients({ recipes }) {
    const [ingredient, setIngredient] = useState('');
    const [filteredRecipes, setFilteredRecipes] = useState([]);

    function handleFilterIngredients() {
        // Filter recipes based on the entered ingredient
        const filtered = recipes.filter(recipe => {
            // Check if the ingredient exists in the values of the ingredients object
            return Object.values(recipe.ingredients).some(value => value.includes(ingredient));
        });
        setFilteredRecipes(filtered);
    }

    return (
        <div className={styles.container}>
            <div>
                <label htmlFor="ingredient" className={styles.label}>
                    Enter Ingredient:
                </label>
                <input
                    type="text"
                    id="ingredientString"
                    value={ingredient}
                    onChange={(e) => setIngredient(e.target.value)}
                    className={styles.input}
                />
            </div>
            <div className={styles.buttonContainer}>
                <Link href={`/filterIngredients/1/${ingredient}`}>
                    <button onClick={handleFilterIngredients} className={styles.button}>
                        Find Ingredients
                    </button>
                </Link>
            </div>

            {/* <ul className={styles.filteredIngredientList}>
                {filteredRecipes.map((recipe, index) => (
                    <li key={index}>{recipe.title}</li>
                ))}
            </ul> */}
        </div>
    );
}

export default FilterIngredients;
