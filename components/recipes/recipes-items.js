import styles from './recipes-items.module.css';
import React from 'react';
import Button from '../ui/button/button';

function RecipesItems(props) {
    const { id, title, description, prep, cook, category, servings, published, image } = props

    const viewRecipeLink = `/recipes/${id}`

    return (
        <div className={styles.link}>

            <li className={styles.item}>
                <h2> {title} </h2>
                <img src={image} alt={id} width={400} height={200} className={styles.imageContainer} />
                {/* <div> {description} </div> */}
                <div className={styles.address}>Preparation: {prep} minutes </div>
                <div className={styles.address}>Cook: {cook} minutes </div>
                <div> {category} </div>
                <div> {servings} </div>
                <div className={styles.date}>{published} </div>
                <div className={styles.actions}>
                <Button link={viewRecipeLink}>
                    <span>View Recipe</span>
                </Button>
            </div>
            </li>
            

        </div>
    )
}

export default RecipesItems;