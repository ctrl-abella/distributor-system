import styles from "./TextArea.module.css";

type TextAreaProps = {
    label?: string;
    name?: string;
    value: string;
    placeholder?: string;
    rows?: number;
    disabled?: boolean;
    required?: boolean;
    error?: string;

    onChange: (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => void;
};

export default function TextArea({
    label,
    name,
    value,
    placeholder,
    rows = 5,
    disabled = false,
    required = false,
    error,
    onChange,
}: TextAreaProps) {
    return (
        <div className={styles.container}>
            {label && (
                <label
                    htmlFor={name}
                    className={styles.label}
                >
                    {label}
                </label>
            )}

            <textarea
                id={name}
                name={name}
                value={value}
                rows={rows}
                placeholder={placeholder}
                disabled={disabled}
                required={required}
                onChange={onChange}
                className={`${styles.textArea} ${
                    error ? styles.error : ""
                }`}
            />

            {error && (
                <span className={styles.errorMessage}>
                    {error}
                </span>
            )}
        </div>
    );
}