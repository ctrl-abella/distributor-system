import styles from "./Header.module.css";
import logo from "../../assets/images/Lifestyles-Independent-Distributor-Logo.png";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

export default function Header(){
    return (
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                <div className={styles.logoContainer}>
                    <img src={logo} alt="Independent Distributor Logo" className={styles.logo} />
                </div>

                
                <nav>
                    <ul className={styles.navList}>
                        <li><a href="">Home</a></li>
                        <li><a href="">Shop</a></li>
                        <li><a href="">About</a></li>
                        <li><a href="">Contact</a></li>
                    </ul>
                </nav>
                <div className={styles.headerActions}>
                    <FaHeart className={styles.icon}/>
                    <FaShoppingCart className={styles.icon}/>
                </div>
            </div>
           
        </header>
    )
    
}