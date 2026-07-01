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
        <div style={{ marginTop: '1rem', height: '12px', backgroundColor: 'blue'}}>

        </div>
        </>
        
    );
}