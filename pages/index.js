import Link from "next/link";
import Image from "next/image";
import styles from "../pages/index.module.css"
import { useState} from "react";
import LoadingState from "@/components/Loading/loading-state";

//Landing Page
function Home(props) {
  const [loading, setLoading] = useState(false)
  
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
    <div>
       {loading && <LoadingState />}
      <div className={styles.view}>

        <Image src="/images/WhiteLogo.png" alt="logo" width={300} height={80} />

        <Link href={`/recipes/1`} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '30px' }}>
          <button style={buttonStyles} onClick={() => setLoading(true)}>All Recipe</button>
        </Link>
     
        {/* Login and Sign Up buttons with links */}
        <Link href="/login" style={{ textDecoration: 'none' }}>
          <button style={buttonStyles}>Login</button>
        </Link>
        <Link href="/signup" style={{ textDecoration: 'none' }}>
          <button style={buttonStyles}>Sign Up</button>
        </Link>
       
      </div>
      <div className={styles.background}
        style={{
          backgroundImage: 'url("/images/homepage-pic.jpg")',
        }}
      >

      </div>
    </div>
  );

}

export default Home;