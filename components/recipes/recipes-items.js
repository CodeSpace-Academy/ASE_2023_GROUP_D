import styles from './recipes-items.module.css';
import React from 'react';
import Button from '../ui/button/button';

function RecipesItems(props) {
    const { id, title, prep, cook, category, servings, published, image } = props

    const publishedDate = new Date(published);
    const formattedPublishedDate = publishedDate.toISOString().split('T')[0];

    const viewRecipeLink = `/recipes/${id}`

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
                    <Button link={viewRecipeLink} className={styles.viewRecipeButton}>
                        <span className={styles.viewRecipeButtonText}>View Recipe</span>
                    </Button>
                </div>
            </li>


        </div>
    )
}

export default RecipesItems;