import styles from './recipes-items.module.css';
import Link from 'next/link';

function RecipesItems(props) {
    const { id, title, description, prep, cook, category, servings, published, image } = props

    return (
        <div className={styles.link}>
            <Link href={`/recipes/${id}`}>
                <li className={styles.item}>
                    <h2> {title} </h2>
                    <img src={image} alt={id} width={400} height={200} className={styles.imageContainer} />
                    {/* <div> {description} </div> */}
                    <div className={styles.address}>Preparation: {prep}minutes </div>
                    <div className={styles.address}>Cook: {cook}minutes </div>
                    <div> {category} </div>
                    <div> {servings} </div>
                    <div className={styles.date}>{published} </div>
                </li>

            </Link>
        </div>
    )
}

export default RecipesItems;