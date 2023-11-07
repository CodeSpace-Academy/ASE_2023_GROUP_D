import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faFacebook, faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons";
import styles from "./footer.module.css"; // Import your CSS module
import Link from "next/link";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
      <Link href="/recipes/1">
      <div className={styles.logo}>
        <img src="/images/BrandLogo.png" alt="Logo" width={200} height={50}/>
      </div>
      </Link>
      </div>
      <div className={styles.socialMedia}>
        <a href="https://www.facebook.com">
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a href="https://www.linkedin.com">
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
        <a href="https://www.instagram.com">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href="https://www.youtube.com">
          <FontAwesomeIcon icon={faYoutube} />
        </a>
      </div>
      <div className={styles.connectWithUs}>
        <input type="email" placeholder="Enter your email" />
        <button>Connect with Us</button>
      </div>
    </footer>
  );
}

export default Footer;
