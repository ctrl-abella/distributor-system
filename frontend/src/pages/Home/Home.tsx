import styles from "../Home/Home.module.css";
import Button from "../../components/Button/Button.tsx";


export default function Home(){
    return(
        <>
        <div className={styles.titleSection}>
            <h1>Your Gateway to Holistic Wellness</h1>
            <p>At Intra Health Essentials Philippines, we are dedicated to helping you achieve a healthier, more vibrant lifestyle through the trusted power of Lifestyles products</p>
        </div>
        <Button variant="primary">Shop Now &#128722;</Button>
        <div className={styles.featuredProductsSection}>
            <h1>Featured Products</h1>
            <p  >Your Daily Dose of Wellness, Exclusively from Intra Health Essentials Philippines</p>
        </div>

        </>
        
    );
}