
import { run, run1 } from '@/fetching-data/data'
import Recipes from '@/components/recipes'




function Home(props) {
  console.log(props.recipes) // recipes data
  console.log(props.categories) // categories data

  return (
    <>

        <Recipes recipes={props.recipes} categories={props.categories}/>
       
    </>
  )
}

export async function getStaticProps() {
  const docs = await run();

  // const filePath = path.join(process.cwd())
  // await fs.readFile();

  const docs1 = await run1();
  return {
    props: {
      recipes: docs,
      categories: docs1,
    },
    revalidate: 1800,
  }
}

export default Home;