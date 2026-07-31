import styles from "./TextField.module.css";

type InputProps = {
    name: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,

    label: string,
    error?: string,

    type?: string,
    placeholder?: string,
    required?: boolean,
    inputMode?: React.InputHTMLAttributes<HTMLInputElement>['inputMode']

}
export default function TextField({
    name,
    value,
    onChange,
    label,
    error, 
    type,
    placeholder, 
    required,
    inputMode
}: InputProps){
    return(
        <>
        <div className={styles.textFieldContainer}>
            <label className={styles.label}>{label}</label>

            <input 
            className={`${styles.textField} ${error ? styles.errorInput: ""}`}
            type={type}
            name={name}
            value={value} 
            onChange={onChange}
            placeholder={placeholder} 
            required={required}
            inputMode={inputMode}
            >
            </input>
            {error && (
                <span className={styles.errorText}>
                    {error}
                </span>
            )}
        </div>
            

        </>
    )
}