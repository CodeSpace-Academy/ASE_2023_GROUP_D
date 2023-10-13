import styles from './recipes-items.module.css';

function RecipesItems(props) {
    const { id, title, description, prep, cook, category, servings, published, images } = props

    //const recipeLink = `/recipes/${id}`;

    return (
        <div>
            <li className={styles.item}>
            {/* <img src={'/' + image} alt={title} /> */}
            <div className={styles.content}>
                <div className={styles.summary}>
                    <h1>{title}</h1>
                    <img src={images} />
                    <div>{description}</div>
                    <div className={styles.address}>Preparation: {prep}minutes</div>
                    <div className={styles.address}>Cook: {cook}minutes</div>
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