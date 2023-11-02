import Link from "next/link";

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
          paddingTop: '30px'
        }}>
        <button className="theme-button">All Recipe</button>
      </Link>

      <SearchBar />
    </>
  )
}


export default Home

