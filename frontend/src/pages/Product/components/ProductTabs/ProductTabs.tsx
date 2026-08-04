import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import styles from ".//ProductTabs.module.css";
import type { ProductProps } from "../../../../props/ProductProps";



const tabs = [
    "Description",
    "Benefits",
    "Instruction"
];


export default function ProductTabs({ 
    product
}: ProductProps){
    const [activeTab, setActiveTab] = useState("Description");

    return(
        <>
        <div className={styles.tabContainer}>
            {tabs.map((tab) => (
                    <button
                        key={tab}
                        className={`${styles.tab} ${
                            activeTab === tab
                                ? styles.tabActive
                                : ""
                        }`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
        </div>
        <div className={styles.content}>
                {activeTab === "Description" && (
                    <p>{product?.fullDescription ?? "No description available."}</p>
                )}

                {activeTab === "Benefits" && (
                    <ul className={styles.keyBenefits}>
                        {product?.keyBenefits &&
                        Object.keys(product.keyBenefits).length > 0 ? (
                            Object.entries(product.keyBenefits).map(
                                ([title, description]) => (
                                    <li key={title}>
                                        <FaCheckCircle className={styles.checkIcon} />
                                        <p>
                                            <strong>{title}</strong>: {description}
                                        </p>
                                    </li>
                                )
                            )
                        ) : (
                            <p>No key benefits available.</p>
                        )}
                    </ul>
                )}
                {activeTab === "Instruction" && (
                    <p>{product?.instruction ?? "No instruction available"}</p>
                )}

            </div>
    </>
    );
}