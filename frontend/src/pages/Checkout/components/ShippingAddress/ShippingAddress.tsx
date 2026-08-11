
import styles from "./ShippingAddress.module.css";

import TextField from "../../../../components/TextField/TextField";
import ComboBox from "../../../../components/ComboBox/ComboBox";
import { regions as philippine_regions  } from "../../../../constants/regions";
import { provinces as philippine_provinces } from "../../../../constants/provinces";
import { cities } from "../../../../constants/cities";
import type { CheckoutFormProps } from "../../../../props/CheckoutFormProps";



export default function ShippingAddress({
    form,
    errors,
    handleChange
}: CheckoutFormProps){
    
    const regionOptions =  philippine_regions.map(region => ({
        value: region.code,
        label: region.name
    }));
    const provinceOptions = philippine_provinces
    .filter(province => province.regionCode === form.region)
    .map(province => ({
        value: province.code,
        label: province.name,
    }));
    const cityOptions = cities
    .filter(city => city.provinceCode === form.province)
    .map(city => ({
        value: city.code,
        label: city.name
    }));
    
    return(
        <div className={styles.shippingAddressContainer}>
            <h2>Shipping Address</h2>
            
            <ComboBox
            label="Region"
            name="region"
            value={form.region}
            options={regionOptions}
            onChange={ (e) => handleChange("region", e.target.value)}
            error={errors.region}
            />
            <ComboBox
            label="Province"
            name="province"
            value={form.province}
            options={provinceOptions}
            onChange={ (e) => handleChange("province", e.target.value)}
            error={errors.province}
            />
            <ComboBox
            label="City"
            name="city"
            value={form.city}
            options={cityOptions}
            onChange={ (e) => handleChange("city", e.target.value)}
            error={errors.province}
            />
            
            <TextField
            label="Postal Code"
            name="postalCode"
            value={form.postalCode}
            error={errors.postalCode}
            inputMode="numeric"
            placeholder="Enter postal code"
            onChange={ (e) => handleChange("postalCode", e.target.value)}
            >
            </TextField>
            
        </div>
    )
}