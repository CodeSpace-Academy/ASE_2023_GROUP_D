import Link from 'next/link';
import { recipes } from '../data';
import classes from '../components/recipes'

const Recipes = () => {
  return (
    <div>
      <h1 className={classes.recipes}>Recipes</h1>
      <ul>
        {recipes.map((recipe) => (
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
