import styles from "./Header.module.css";
import logo from "../../assets/images/Lifestyles-Independent-Distributor-Logo.png";
import { FaBars, FaHeart, FaShoppingCart } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import Sidebar  from "./Sidebar";
import { navigation } from "../../constants/navigation";



export default function Header() {
 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <header className={styles.header}>
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <div className={styles.headerContainer}>
        <button 
        className={styles.menuButton}
        onClick={()=> setIsSidebarOpen(true)}
        >
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
            {navigation.map((item) => (
        <li key={item.path} className={styles.navItem}>
            <NavLink
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                    `${styles.navLink} ${
                        isActive ? styles.navLinkActive : ""
                    }`
                }
            >
                {item.label}
            </NavLink>
        </li>
    ))}
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
