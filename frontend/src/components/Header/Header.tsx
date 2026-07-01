import styles from "./Header.module.css";
import logo from "../../assets/images/Lifestyles-Independent-Distributor-Logo.png";
import { FaBars, FaHeart, FaShoppingCart } from "react-icons/fa";
import { NavLink } from "react-router-dom";

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
              <NavLink 
              to="/" 
              end
              className={({ isActive }) =>
                `${styles.navLink} ${
                  isActive ? styles.navLinkActive : ""
                }`
              }>
              Home
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink 
              to="/shop"
              className={({ isActive }) =>
                `${styles.navLink} ${
                  isActive ? styles.navLinkActive : ""
                }`
              }
              >
                Shop
                </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink 
              to="/about"
              className={({ isActive }) =>
                `${styles.navLink} ${
                  isActive ? styles.navLinkActive : ""
                }`
              }
              >About</NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink 
              to="/contact"
              className={({ isActive }) =>
                `${styles.navLink} ${
                  isActive ? styles.navLinkActive : ""
                }`
              }
              >
                Contact
                </NavLink>
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
