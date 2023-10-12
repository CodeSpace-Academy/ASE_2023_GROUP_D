import Link from 'next/link';
import classes from '../components/recipes'

const recipes1 = [];

const Recipes = (props) => {
  recipes1.push(props.recipes);
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

export async function getRecipeById(id){
  console.log(recipes1)
  console.log(id)
  return await recipes1.find((event) => event._id === id)
}


