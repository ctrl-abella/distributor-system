import styles from "./ComboBox.module.css";

type Option = {
    value: string;
    label: string;
};

type ComboBoxProps = {
    label: string;
    name: string;
    value: string;
    options: Option[];
    placeholder?: string;
    error?: string;
    disabled?: boolean;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export default function ComboBox({
    label,
    name,
    value,
    options,
    placeholder = "Select an option",
    error,
    disabled = false,
    onChange,
}: ComboBoxProps) {
    return (
        <div className={styles.container}>
            <label htmlFor={name} className={styles.label}>
                {label}
            </label>

            <select
                id={name}
                name={name}
                value={value}
                disabled={disabled}
                onChange={onChange}
                className={`${styles.select} ${
                    error ? styles.errorBorder : ""
                }`}
            >
                <option value="" disabled>
                    {placeholder}
                </option>

                {options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))}
            </select>

            {error && (
                <span className={styles.error}>
                    {error}
                </span>
            )}
        </div>
    );
}