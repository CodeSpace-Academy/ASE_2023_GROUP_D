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
      <div className={styles.logo}>
        <Image src="/images/BrandLogo.png" alt="logo" width={400} height={100} />
      </div>

      <button className={`${styles.menuButton} ${isMenuOpen ? styles.open : ""}`} onClick={toggleMenu}>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </button>

      <ul className={`${styles.navLinks} ${isMenuOpen ? styles.open : ""}`}>
        <div className={styles.hamburger} onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>
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
          <Link href="/all-recipes">
            <h2 className={styles.link}>All Recipes</h2>
          </Link>
        </li>
      </ul>

    </nav>
  );
};

export default Navbar;
