import styles from './recipes-items.module.css';
import React from 'react';
import Button from '../ui/button/button';
import { useState, useEffect } from 'react';

function RecipesItems(props) {
    const { id, title, prep, cook, category, servings, published, image, patcheNo, description, favRecipes } = props

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

    function addCommentHandler(recipeData) {
        fetch('/api/favourites', {
            method: 'POST',
            body: JSON.stringify(recipeData),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => console.log(data.recipes._id));
    }

//   console.log(favRecipes)
    return (
        <div className={styles.link}>

            <li className={styles.item}>
                <img src={image} alt={id} width={400} height={200} className={styles.imageContainer} />
                <div className={styles.title1}><h2> {title} </h2></div>


                {/* <div className={styles.address}>Preparation: {prep} minutes </div>
                <div className={styles.address}>Cook: {cook} minutes </div> */}
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
                    <button onClick={() => addCommentHandler(recipeToBeInsertedToFav)}>{favRecipeIds.includes(id) ?'Rev From Fav' :'Add To Fav'}</button>
                </div>
            </li>
        </div>
    )
}

export default RecipesItems; 