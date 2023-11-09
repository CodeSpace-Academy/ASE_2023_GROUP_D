import Link from "next/link";
import Image from "next/image";

//Landing Page
function Home(props) {
  const buttonStyles = {
    backgroundColor: '#ff0000',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '5px',
  };

  return (
    <div
      style={{
        position: 'relative', // Container for relative positioning
        height: '100vh',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '50%', // Take up 50% of the width on the left
          height: '100%',
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',

          zIndex: 2, // Ensure buttons are on top of the background
        }}
      >
        <Image src="/images/WhiteLogo.png" alt="logo" width={300} height={80} /> 
        <Link href={`/recipes/1`} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '30px' }}>
          <button style={buttonStyles}>All Recipe</button>
        </Link>
        {/* Login and Sign Up buttons with links */}
        <Link href="/login" style={{ textDecoration: 'none' }}>
          <button style={buttonStyles}>Login</button>
        </Link>
        <Link href="/signup" style={{ textDecoration: 'none' }}>
          <button style={buttonStyles}>Sign Up</button>
        </Link>
      </div>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '0%', // Take up the right 50% of the width
          width: '100%', // Take up 50% of the width on the right
          height: '100%',
          zIndex: 1,
          backgroundImage: 'url("/images/homepage-pic.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          //backgroundColor: 'black',
        }}
      >

      </div>
    </div>
  );

}

export default Home;