import { run, run1 } from '@/fetching-data/data';
import RecipeList from '@/components/recipes/recipes-list';
import { useRouter } from 'next/router';


function Recipe(props) {

  const router = useRouter();
  const { recipeId } = router.query
  // console.log(recipeId)

  return (
    <>
      <img src="images/BrandLogo.png" alt="logo" width={300} height={100}/>
      <RecipeList recipes={props.recipes} categories={props.categories} patcheNo={recipeId} />
    </>
  )
}

export async function getServerSideProps(context) {
  const patcheNo = context.params.recipeId;
  const docs = await run(patcheNo);
  const docs1 = await run1();
  return {
    props: {
      recipes: docs,
      categories: docs1,
    },
  };
}

export default Recipe;