import Link from "next/link";
import { useState } from "react";
import styles from "./navbar.module.css"; // Import the CSS module
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass as searchIcon } from "@fortawesome/free-solid-svg-icons";
import style from '@/components/sorting/searchBar.module.css'
import SearchBar from "../sorting/auto-submission";


const Navbar = ({ categories, pageNo, searchChar, setIsSorting, isSorting, history, filterByTags, filterByIngredients, categoryfilter, filterBySteps }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {isSorting &&
        <div className={style.sortSection}>
          <SearchBar categories={categories} pageNo={pageNo} searchChar={searchChar} setIsSorting={setIsSorting} isSorting={isSorting} history={history} filterByTags={filterByTags} filterByIngredients={filterByIngredients} categoryfilter={categoryfilter} filterBySteps={filterBySteps}/>
        </div>}
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <img src="/images/BrandLogo.png" alt="logo" width={400} height={100} />
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

          <FontAwesomeIcon icon={searchIcon} size="lg" color="black" style={{ paddingRight: '10px', paddingTop: '18px' }} />
          <input className={style.input} size={20} value={''} onClick={() => setIsSorting(!isSorting)}  placeholder={"Search ..."}  readOnly/>

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
    </>
  );
};

export default Navbar;
