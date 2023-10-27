import Link from "next/link";

function Home(props) {

  return (
    <>
    <img src="images/BrandLogo.png" alt="logo" width={300} height={60} />

      <Link href={`/recipes/1`}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: '30px'
        }}>
        <button className="theme-button">All Recipe</button>
      </Link>
    </>
  )
}


export default Home

