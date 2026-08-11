import type { ReactNode } from "react";
import styles from "./RadiorCard.module.css"

type RadioCardProps = {
    value: string;
    selected: boolean;
    icon: ReactNode;
    title: string;
    description?: string;
    onChange: (value: string) => void;
};

export default function RadioCard({
    value,
    selected,
    icon,
    title,
    description,
    onChange,
}: RadioCardProps) {
    return (
        <button
            type="button"
            className={`${styles.card} ${
                selected ? styles.selected : ""
            }`}
            onClick={() => onChange(value)}
            aria-pressed={selected}
        >
            <div className={styles.icon}>
                {icon}
            </div>

            <div className={styles.content}>
                <span className={styles.title}>
                    {title}
                </span>

                {description && (
                    <span className={styles.description}>
                        {description}
                    </span>
                )}
            </div>

            <span
                className={`${styles.radio} ${
                    selected ? styles.radioSelected : ""
                }`}
                aria-hidden="true"
            >
                {selected && (
                    <span className={styles.radioDot} />
                )}
            </span>
        </button>
    );
}