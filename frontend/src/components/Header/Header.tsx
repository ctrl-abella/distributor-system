import styles from "./Header.module.css";
import logo from "../../assets/images/Lifestyles-Independent-Distributor-Logo.png";
import { FaBars, FaHeart, FaShoppingCart } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import Sidebar  from "./Sidebar";
import { navigation } from "../../constants/navigation";
import { useCart } from "../../hooks/useCart";
import { useNavigate } from "react-router-dom";



export default function Header() {
 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { cart } = useCart();

  const navigate = useNavigate();
  
  const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0 
    );
  const badgeText = totalItems > 99 ? "99+" : totalItems;

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
          <div className={styles.cartContainer}>
            <FaShoppingCart 
            className={styles.icon}
            onClick={() => navigate(`/cart`)}
             />

            {totalItems > 0 && (
              <span className={styles.cartBadge}>
                {badgeText}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
