import Link from "next/link";
import { useState } from "react";
import styles from "./navbar.module.css"; // Import the CSS module
import Image from "next/image";


const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <Link href="/">
      <div className={styles.logo}>
        <img src="/images/BrandLogo.png" alt="Logo" width={200} height={50}/>
      </div>
      </Link>
     
      <button className={`${styles.menuButton} ${isMenuOpen ? styles.open : ""}`} onClick={toggleMenu}>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </button>

      <ul className={`${styles.navLinks} ${isMenuOpen ? styles.open : ""}`}>
        
        <li>
          <Link href="/">
            <h2 className={styles.link}>Home</h2>
          </Link>
        </li>
        <li>
          <Link href={'/favourites/1'}>
            <h2 className={styles.link}>Favourites</h2>
          </Link>
        </li>
        <li>
          <Link href="/recipes/1">
            <h2 className={styles.link}>All Recipes</h2>
          </Link>
        </li>
      </ul>

    </nav>
  );
};

export default Navbar;
