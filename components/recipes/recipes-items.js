import styles from './recipes-items.module.css';
import React from 'react';

function RecipesItems(props) {
    const { _id, title, prep, cook, category, servings, published, images } = props;
    //const [recipeImages] = images

    const totalCookTime = prep + cook;

    return (
        <div>

            <li className={styles.item} key={_id}>
                <div className={styles.content}>
                    <div className={styles.summary}>
                        <h2>{title}</h2>

                        <div className={styles.imageDiv}>
                            {images.length > 1 ? (
                                <img
                                    key={0}
                                    src={images[0]}
                                    className={styles.imgContainer}
                                    width={400}
                                    height={200}
                                    alt={`recipe-${_id}`}
                                />
                            ) : (
                                images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        className={styles.imgContainer}
                                        width={400}
                                        height={200}
                                        alt={`recipe-${_id}`}
                                    />
                                ))
                            )}
                        </div>


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

