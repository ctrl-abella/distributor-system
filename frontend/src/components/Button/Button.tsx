import type { ButtonHTMLAttributes } from "react";
import "./Button.css"
type ButtonVariant = | "primary" | "danger" | "outline"| "icon";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant
};


export default function Button({
    children,
    variant = "primary",
    ...props
}: ButtonProps) {
    return(
        <button 
        className={`btn--${variant}`}
        {...props}
        >
        {children}
    </button>
    );
    
};