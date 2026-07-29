import styles from "./ProductModal.module.css";
import { FaTimes, FaMinus, FaPlus, FaCheckCircle } from "react-icons/fa";
import { useState } from "react";
import { useCart } from "../../hooks/useCart";
import type { Product } from "../../types/Product";
import Button  from "../Button/Button";

type ProductModalProps = {
    product: Product | null;
    onClose: () => void;
}

export default function ProductModal({
    product,
    onClose,
}: ProductModalProps){
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    if(!product) return null;

    const benefits = Array.isArray(product.benefits) ? (product.benefits as string[]) : [];

    return(
        <>
            <div
                className={styles["backdrop"]}
                onClick={onClose}
            />
            <div className={styles["modal"]}>
                <button
                    className={styles["closeButton"]}
                    onClick={onClose}
                >
                    <FaTimes></FaTimes>
                </button>
                <div className={styles["content"]}>
                    <div className={styles["imageSection"]}>
                        <img 
                        src={`http://localhost:3000${product.imageUrl}`} 
                        alt={product.name}
                        className={styles["image"]} 
                        />
                    </div>
                    <div className={styles["details"]}>
                        <span className={styles["category"]}>
                            {product.category.name}
                        </span>
                        <h2>{product.name}</h2>
                        <p className={styles["price"]}>
                            ₱{product.price}
                        </p>
                        <p className={styles.description}>
                            {product.description}
                        </p>

                            <div className={styles.benefits}>
                            <h3>Benefits</h3>

                            <ul className={styles["benefitsList"]}>
                                {benefits.map((benefit) => (
                                
                                <li key={benefit}>
                                    <FaCheckCircle className={styles["checkIcon"]}/>
                                    <span>{benefit}</span>
                                </li>
                                ))}
                            </ul>
                            </div>

                            <div className={styles.quantity}>
                            <button
                                onClick={() =>
                                setQuantity((q) => Math.max(1, q - 1))
                                }
                            >
                                <FaMinus />
                            </button>

                            <span>{quantity}</span>

                            <button
                                onClick={() => setQuantity((q) => q + 1)}
                            >
                                <FaPlus />
                            </button>
                            </div>

                            <Button
                            onClick={() => addToCart(product, quantity)}
                            >Add to Cart</Button>
                    </div>
                </div>
            </div>
        </>
    )
}