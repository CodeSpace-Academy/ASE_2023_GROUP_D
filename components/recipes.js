import Link from 'next/link';
import classes from '../components/recipes.module.css'

const Recipes = (props) => {
  return (
    <div>
      <h1 className={classes.recipes}>Recipes</h1>
      <ul>
        {props.recipes.map((recipe) => (
          <li key={recipe._id}>
            <Link href={`/recipes/${recipe._id}`}>
              {recipe.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recipes;
