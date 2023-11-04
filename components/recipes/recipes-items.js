import styles from './recipes-items.module.css';
import React from 'react';
import Button from '../ui/button/button';
import { useState } from 'react';
import { useRouter } from 'next/router';

function RecipesItems(props) {
    const router = useRouter();
    // console.log(router.pathname);
    const { id, title, prep, cook, category, servings, published, image, patcheNo, description, favRecipes } = props
    const [favRecipeIds, setFavRecipeIds] = useState(favRecipes.map((recipe) => recipe._id))
    const [favToggle, setFavToggle] = useState(favRecipeIds.includes(id) ? true : false)
   

    // const favRecipeIds = favRecipes.map((recipe) => recipe._id)

    const publishedDate = new Date(published);
    const formattedPublishedDate = publishedDate.toISOString().split('T')[0];

    const recipeToBeInsertedToFav = {
        _id: id,
        title: title,
        images: [image],
        description: description,
        prep: prep,
        cook: cook,
        category: category,
        servings: servings,
        published: published
    }

    async function addToFavourite(recipeData) {
       const response =  await fetch('/api/favourites', {
            method: 'POST',
            body: JSON.stringify(recipeData),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Something went wrong!");
        }
        else{
         setFavToggle(!favToggle) 
        }
        
    }

    async function removeFromFavourite(recipeId) {
     const response =   await fetch('/api/favourites', {
            method: 'DELETE',
            body: JSON.stringify(recipeId),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Recipe failed to delete");
        }
        else if(response.ok){
         setFavToggle(!favToggle) 
        }
    }

    return (
        <>{
            <div className={styles.link}>

                <li className={styles.item}>
                    <img src={image} alt={id} width={400} height={200} className={styles.imageContainer} />
                    <div className={styles.title1}><h2> {title} </h2></div>

                    <div className={styles.cookingContainer}>
                        <div >
                            <div className={styles.cookingTime}>
                                <div className={styles.label}>Preparation:</div>
                                <div className={styles.label}>Cooking time:</div>
                            </div>
                            <div className={styles.cookingTime}>
                                <div className={styles.value}>{prep} mins</div>
                                <div className={styles.value}>{cook} mins</div>

                            </div>
                        </div>
                    </div>
                    <div> {category} </div>
                    <div> {servings} </div>
                    <div className={styles.date}>{formattedPublishedDate} </div>
                    <div className={styles.actions}>
                        <Button link={`/recipes/${patcheNo}/${id}`} className={styles.viewRecipeButton}>
                            <span className={styles.viewRecipeButtonText}>View Recipe</span>
                        </Button>
                        { favToggle ? <button onClick={() => removeFromFavourite({ _id: id })}>Rev From Fav</button> : <button onClick={() => addToFavourite(recipeToBeInsertedToFav)}>Add To Fav</button>}

                    </div>
                </li>
            </div>
        }</>
    )
}

export default RecipesItems; 