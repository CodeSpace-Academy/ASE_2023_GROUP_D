import styles from './recipes-items.module.css';
import React from 'react';
import Button from '../ui/button/button';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart, faHeart as regularHeart, faHeartBroken as brokenHeart } from '@fortawesome/free-solid-svg-icons';
import Highlighter from 'react-highlight-words';

/**
 * Component for displaying individual recipe items.
 * @param {Object} props - Properties passed to the component.
 * @param {string} props.id - The unique identifier of the recipe.
 * @param {string} props.title - The title of the recipe.
 * @param {number} props.prep - The preparation time of the recipe in minutes.
 * @param {number} props.cook - The cooking time of the recipe in minutes.
 * @param {string} props.category - The category of the recipe.
 * @param {number} props.servings - The number of servings the recipe yields.
 * @param {string} props.published - The publication date of the recipe.
 * @param {string} props.image - The URL of the recipe image.
 * @param {string} props.patcheNo - The patch number of the recipe.
 * @param {string} props.description - The description of the recipe.
 * @param {Array} props.favRecipes - The list of favorite recipes.
 * @param {string} props.search - The search string for highlighting.
 * @returns {JSX.Element} - Rendered React component.
 */

function RecipesItems(props) {
    const router = useRouter();
    const { id, title, prep, cook, category, servings, published, image, patcheNo, description, favRecipes, search } = props
    const [favRecipeIds, setFavRecipeIds] = useState(favRecipes.map((recipe) => recipe._id))
    const [favToggle, setFavToggle] = useState(favRecipeIds.includes(id) ? true : false)
    const [hoverToggle, setHoverToggle] = useState(false)

    const publishedDate = new Date(published);
    const totalTime = prep + cook
    const formattedPublishedDate = publishedDate.toISOString().split('T')[0];

    const recipeToBeInsertedToFav = {
        _id: id,
        title: title,
        images: [image],
        description: description,
        prep: prep,
        cook: cook,
        category: category,
        servings: servings,
        published: published
    }

    const hours = Math.floor(cook / 60);
    const minutes = cook % 60;

    const prepHours = Math.floor(prep / 60);
    const prepMinutes = prep % 60;

    // Calculate total hours and total minutes
    const totalHours = prepHours + hours;
    const totalMinutes = prepMinutes + minutes;


    async function addToFavourite(recipeData) {
        const response = await fetch('/api/favourites', {
            method: 'POST',
            body: JSON.stringify(recipeData),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Something went wrong!");
        }
        else {
            setFavToggle(!favToggle)
        }

    }

    async function removeFromFavourite(recipeId) {
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
        else if (response.ok) {
            setFavToggle(!favToggle)
        }
    }



    return (
        <>{
            <div className={styles.link}>

                <li className={styles.item}>
                    <div className={styles.heartIcon}>
                        {favToggle ? (
                            <>
                                {!hoverToggle && (
                                    <FontAwesomeIcon onMouseEnter={() => setHoverToggle(!hoverToggle)} icon={solidHeart} size="2x" color="red"  />
                                )}
                                {hoverToggle && (
                                    <FontAwesomeIcon
                                        onMouseLeave={() => setHoverToggle(!hoverToggle)}
                                        icon={brokenHeart}
                                        size="2x"
                                        color="red"
                                        onClick={() => removeFromFavourite({ _id: id })}
                                        shake
                                    />
                                )}
                            </>
                        ) : (
                            <FontAwesomeIcon icon={regularHeart} size="2x" color="grey" onClick={() => addToFavourite(recipeToBeInsertedToFav)} />
                        )}
                    </div>
                    <img src={image} alt={id} width={400} height={200} className={styles.imageContainer} />
                    {search ? <h2><Highlighter
                        highlightClassName="YourHighlightClass"
                        searchWords={[search]}
                        autoEscape={true}
                        textToHighlight={title}
                    /></h2> : <h2>{title}</h2>}

                    <div >

                        <div className={styles.cookingTime}>
                            <div>
                                <div className={styles.cookingTimeLabel}>
                                    Preparation: 
                                    <br/>
                                    {prepHours > 0 ? `${prepHours} hr${prepHours > 1 ? 's' : ''} ` : ''}
                                    {prepMinutes > 0 ? `${prepMinutes} min${prepMinutes > 1 ? 's' : ''}` : (prepHours === 0 ? '0 min' : '')}
                                </div>
                                <div className={styles.cookingTimeLabel}>
                                    Cooking time: 
                                    <br/>
                                    {hours > 0 ? `${hours} hr${hours > 1 ? 's' : ''} ` : ''}
                                    {minutes > 0 ? `${minutes > 59 ? `${Math.floor(minutes / 60)} hr${minutes % 60 !== 0 ? ' ' : ''}${minutes % 60 !== 0 ? `${minutes % 60} min` : ''}` : `${minutes} min`}` : (hours === 0 ? '0 min' : '0 min')}
                                </div>
                                <div className={styles.cookingTimeLabel}>
                                    Total Time: 
                                    <br/>{totalHours + Math.floor(totalMinutes / 60)} hr{totalHours + Math.floor(totalMinutes / 60) > 1 ? 's' : ''}
                                    {totalMinutes % 60 !== 0 ? ` ${totalMinutes % 60} min` : ''}
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className={styles.category}> {category} </div>
                    <div className={styles.servings}> Servings: {servings} </div>
                    <div className={styles.date}>Published: {formattedPublishedDate} </div>
                    <div className={styles.actions}>
                        <Button link={`/recipes/${patcheNo}/${id}`} className={styles.viewRecipeButton}>
                            <span className={styles.viewRecipeButtonText}>View Recipe</span>
                        </Button>
                    </div>
                </li>

            </div>
        }</>
    )
}

export default RecipesItems;
