import styles from "./CustomerInformation.module.css";
import TextField from "../../../../components/TextField/TextField";
import type { CheckoutFormProps } from "../../../../props/CheckoutFormProps";
export default function CustomerInformation({
    form,
    errors,
    handleChange
}: CheckoutFormProps){
    
    return(
        <div className={styles.customerInformationContainer}>
            <h2>Customer Information</h2>
            <TextField
            label="Full Name"
            name="fullName"
            value={form.fullName}
            error={errors.fullName}
            inputMode="text"
            placeholder="Enter full name"
            onChange={ (e) => handleChange("fullName", e.target.value)}
            >
            </TextField>
            <TextField
            label="Contact No."
            name="contactNumber"
            value={form.contactNumber}
            error={errors.contactNumber}
            inputMode="numeric"
            placeholder="e.g 09278191232"
            onChange={(e) => handleChange("contactNumber", e.target.value)}
            >
            </TextField>
            <TextField
            label="Email"
            name="email"
            value={form.email}
            error={errors.email}
            inputMode="text"
            placeholder="example@domain.com"
            onChange={ (e) => handleChange("email", e.target.value)}
            >
            </TextField>

        </div>
    )
}