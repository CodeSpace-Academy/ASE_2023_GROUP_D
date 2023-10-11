// pages/recipes/[slug].js
import { recipes } from '../../data'; // Import your recipe data
import Recipe from '../../components/recipes';

const RecipePage = ({ recipe }) => {
  return <Recipe recipe={recipe} />;
};

export const getServerSideProps = async (context) => {
  const { slug } = context.query;
  const recipe = recipes.find((r) => r.id.toString() === slug);
  
  return {
    props: { recipe },
  };
};

export default RecipePage;
