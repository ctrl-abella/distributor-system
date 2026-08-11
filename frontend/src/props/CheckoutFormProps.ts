import type { CheckoutForm } from "../types/CheckoutForm";
import type { CheckoutErrors } from "../types/CheckoutErrors";

export type CheckoutFormProps = {

    form: CheckoutForm;
    errors: CheckoutErrors;

    handleChange: (
        field: keyof CheckoutForm,
        value: string
    ) => void;

};