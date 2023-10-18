import Link from "next/link";

function Home(props) {

  return (
    <>
      <img src="images/BrandLogo.png" alt="logo" width={300} height={100} />
      <Link href={`/recipes/1`} >
        <button>All Recipe</button>
      </Link>
    </>
  )
}


export default Home;