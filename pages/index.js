import Link from "next/link";


function Home(props) {

  return (
    <>
      <div className="logo">
        <img src="images/BrandLogo.png" alt="logo" width={400} height={100} />

      </div>

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

