import styles from './recipes-items.module.css';
import React from 'react';
import Button from '../ui/button/button';
import { useState } from 'react';

function RecipesItems(props) {
    const { id, title, prep, cook, category, servings, published, image, patcheNo, description, favRecipes } = props
    const [favToggle, setFavToggle] = useState(false)
    const [removeFromFav, setRemoveFromFav] = useState(true)

    const favRecipeIds = favRecipes.map((recipe) => recipe._id)

    const publishedDate = new Date(published);
    const formattedPublishedDate = publishedDate.toISOString().split('T')[0];

    const recipeToBeInsertedToFav = {
        _id: id,
        patcheNo: patcheNo,
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
        await fetch('/api/favourites', {
            method: 'POST',
            body: JSON.stringify(recipeData),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                // console.log(data)
                setFavToggle(!favToggle)
            });
    }

    async function removeFromFavourite(recipeData) {
        await fetch(`/api/favourites?id=${id}`, {
            method: 'DELETE',
            body: JSON.stringify(recipeData),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        setFavToggle(!favToggle)
        setRemoveFromFav(false)
    } 

    //   console.log(favRecipes)
    return (
        <>{removeFromFav &&
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
                        {favRecipeIds.includes(id) ? <button onClick={() => removeFromFavourite({ _id: id })}>Rev From Fav</button>
                            : <button onClick={() => addToFavourite(recipeToBeInsertedToFav)}>{favToggle ? 'Rev From Fav' : 'Add To Fav'}</button>}
                    </div>
                </li>
            </div>
        }</>
    )
}

export default RecipesItems; 