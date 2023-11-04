import styles from './recipes-items.module.css';
import React from 'react';
import Button from '../ui/button/button';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart} from '@fortawesome/free-solid-svg-icons';
import { faHeadphones } from '@fortawesome/free-solid-svg-icons';

function RecipesFavItems(props) {
    const { id, title, prep, cook, category, servings, published, image, patcheNo } = props
    const [removeFromFav, setRemoveFromFav] = useState(true)

    const publishedDate = new Date(published);
    const formattedPublishedDate = publishedDate.toISOString().split('T')[0];

    async function removeFromFavourite(recipeId) {
        console.log(recipeId)
        const response = await fetch('/api/favourites', {
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
            setRemoveFromFav(false)
        }
    }

    return (
        <>
            {removeFromFav &&
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
                            {/* <button className={styles.favoriteButton} onClick={() => removeFromFavourite({ _id: id })}> */}
                           <FontAwesomeIcon icon={faHeadphones} className={styles.heartIcon} size="2x" color="red" onClick={() => removeFromFavourite({ _id: id })} />
                            {/* </button> */}
                        </div>
                    </li>
                </div>
            }
        </>
    )
}

export default RecipesFavItems; 