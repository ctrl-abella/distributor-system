import styles from "./Sidebar.module.css";
import { FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const navigation = [
  { label: "Home", path: "/" },
  { label: "Shop", path: "/shop" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

export default function Sidebar({
  isOpen,
  onClose,
}: SidebarProps) {
  return (
    <>
     
      <div
        className={`${styles.backdrop} ${
          isOpen ? styles.backdropOpen : ""
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={`${styles.sidebar} ${
          isOpen ? styles.sidebarOpen : ""
        }`}
      >
        <div className={styles.sidebarHeader}>
          <button
            className={styles.closeButton}
            onClick={onClose}
          >
            <FaTimes />
          </button>
        </div>

        <nav>
          <ul className={styles.navList}>
            {navigation.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === "/"}
                  className={({ isActive }) =>
                    `${styles.navLink} ${
                      isActive ? styles.navLinkActive : ""
                    }`
                  }
                  onClick={onClose}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}