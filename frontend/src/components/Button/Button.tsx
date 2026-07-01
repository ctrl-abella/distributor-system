import "./Button.css"
type ButtonVariant = | "primary" | "danger" | "outline";

type ButtonProps = {
    children: React.ReactNode;
    variant?: ButtonVariant
};


export default function Button({
    children,
    variant = "primary",
}: ButtonProps) {
    return(
        <button className={`btn--${variant}`}>
        {children}
    </button>
    );
    
};