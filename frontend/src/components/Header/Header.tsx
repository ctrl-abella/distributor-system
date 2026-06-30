import styles from "./Header.module.css";
import logo from "../../assets/images/Lifestyles-Independent-Distributor-Logo.png";
import { FaBars, FaHeart, FaShoppingCart } from "react-icons/fa";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <button className={styles.menuButton}>
          <FaBars />
        </button>
        <div className={styles.logoContainer}>
          <img
            src={logo}
            alt="Independent Distributor Logo"
            className={styles.logo}
          />
        </div>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={`${styles.navItem} ${styles.active}`}>
              <a href="">Home</a>
            </li>
            <li className={styles.navItem}>
              <a href="">Shop</a>
            </li>
            <li className={styles.navItem}>
              <a href="">About</a>
            </li>
            <li className={styles.navItem}>
              <a href="">Contact</a>
            </li>
          </ul>
        </nav>
        <div className={styles.headerActions}>
          <FaHeart className={styles.icon} />
          <FaShoppingCart className={styles.icon} />
        </div>
      </div>
    </header>
  );
}
