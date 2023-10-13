import styles from './recipes-items.module.css';
import Image from 'next/image';


function RecipesItems(props) {
    const { _id, title, description, prep, cook, category, servings, published, images } = props
   
    return (
        <div>

            <li className={styles.item} key={_id}>
                <div className={styles.content}>
                    <div className={styles.summary}>
                        <h2>{title}</h2>
                        {/* {images.map((image, index) =>
                        <Image key={index} src={image} width={700} height={400} alt='image' />
                        )} */}
                        {/* <Image key={_id} src={images[0]} width={700} height={400} alt='image' /> */}
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

