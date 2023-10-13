import styles from './recipes-items.module.css';



function RecipesItems(props) {
    const { _id, title, description, prep, cook, category, servings, published, images } = props
   
    return (
        <div>

            <li className={styles.item} key={_id}>
                <div className={styles.content}>
                    <div className={styles.summary}>
                        <h2>{title}</h2>
                        {images.map((image, index) => 
                        <img key={index} src={image=images[0]} className={styles.imgContainer} width={700} height={400} alt={`recipe-${_id}`} />
                        )}
                        
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

