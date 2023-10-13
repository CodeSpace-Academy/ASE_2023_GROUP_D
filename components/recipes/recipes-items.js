import styles from './recipes-items.module.css';
import React from 'react';



function RecipesItems(props) {
    const { _id, title, prep, cook, category, servings, published, images } = props;

    const totalCookTime = prep + cook;

    // function showImage(index) {
    //     images.map((image) => {
    //         if (images.length > 1) {
    //             let recipeImages = images[0]
    //             if (recipeImages.indexOF() > 1)
    //             recipeImages.indexOF().map(() => { 
    //             return (
    //                 <img key={index} src={image=recipeImages[0]} className={styles.imgContainer} width={700} height={400} alt={`recipe-${_id}`} />
    //             )})

    //         } else {
    //             return (
    //                 <img
    //                     key={0}
    //                     src={image = images[0]}
    //                     className={styles.imgContainer}
    //                     width={700}
    //                     height={400}
    //                     alt={`recipe-${_id}-${recipeIndex}-image-0`}
    //                 />
    //             )
    //         }

    //     })

    // }

    return (
        <div>

            <li className={styles.item} key={_id}>
                <div className={styles.content}>
                    <div className={styles.summary}>
                        <h2>{title}</h2>
                        {images.map((image, index) => 
                        
                        <img key={index} src={image=images[0]} className={styles.imgContainer} width={700} height={400} alt={`recipe-${_id}`} />
                        )}
                        <div className={styles.address}>Preparation: {prep} minutes</div>
                        <div className={styles.address}>Cook: {cook} minutes</div>
                        <div>Total Cooking Time: {totalCookTime} minutes</div>
                        <div>{category}</div>
                        <div>{servings}</div>
                        <div className={styles.date}>{published}</div>

                    </div>
                    {/* <div className={styles.actions}>
                    <Button link={recipeLink}>
                        <span>Preview Recipe</span>
                    </Button>
                </div> */}
                </div>
            </li>
        </div>
    )
}

export default RecipesItems;

