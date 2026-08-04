import styles from "../Footer/Footer.module.css";
import { FaPhoneAlt, FaMapMarkerAlt, FaClock, FaRegEnvelope, FaCaretRight } from "react-icons/fa";
import logo from "../../assets/images/Lifestyles-Independent-Distributor-Logo.png";

export default function Footer() {
    return(
        <footer className={styles.footer}>
            <div className={styles.footerGrid}>
                <div className={styles.contactGrid}>
                    <div className={styles.contactItem}>
                        <img src={logo} alt="Intra Logo" className={styles.logo} />
                    </div>
                    <div className={styles.contactItem}>
                        <FaPhoneAlt className={styles.icon}/>
                        <span>+63 917 374 4284</span>
                    </div>
                    <div className={styles.contactItem}>
                        <FaMapMarkerAlt className={styles.icon}/>
                        <span>Quezon City, Philippines</span>
                    </div>
                    <div className={styles.contactItem}>
                        <FaRegEnvelope className={styles.icon}/>
                        <span>example@domain.com</span>
                    </div>
                    <div className={styles.contactItem}>
                        <FaClock className={styles.icon}/>
                        <span>Monday to Sunday</span>
                    </div>
                </div>
                <div className={styles.linksGrid}>
                    
                    <ul className={styles.linksList}>
                        <h1>Useful Links</h1>
                        <li><a href=""><FaCaretRight/>Join Now</a></li>
                        <li><a href=""><FaCaretRight/>About</a></li>
                        <li><a href=""><FaCaretRight/>Privacy Policy</a></li>
                        <li><a href=""><FaCaretRight/>Terms and Conditions</a></li>
                        <li><a href=""><FaCaretRight/> Policy</a></li>
                        <li><a href=""><FaCaretRight/>Sitemap</a></li>
                    </ul>
                </div>
                <div className={styles.linksGrid}>
                    <ul className={styles.linksList}>
                        <h1>Shop products</h1>
                        <li><a href=""><FaCaretRight className={styles.icon}/>Intra</a></li>
                        <li><a href=""><FaCaretRight/>Nutria Plus</a></li>
                        <li><a href=""><FaCaretRight/>Cardio Life</a></li>
                        <li><a href=""><FaCaretRight/>FibreLife</a></li>
                        <li><a href=""><FaCaretRight/>Better Together Kit</a></li>
                        <li><a href=""><FaCaretRight/>Shop All</a></li>
                    </ul>
                </div>
                <div className={styles.disclaimerGrid}>
                    <h1>Disclaimer:</h1>
                    <p>This website is independently owned and operated by Jocelyn Martinez, a licensed distributor of Lifestyles Philippines.
                        This is not the official web page of Lifestyles Philippines or Lifestyles Global Network</p>
                </div>
            </div>
            
        </footer>
    )
}