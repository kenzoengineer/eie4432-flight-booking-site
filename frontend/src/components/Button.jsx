import { Link } from "react-router-dom";

const Button = ({text, secondary, onClick, href, disabled}) => {
    const style = secondary ? "text-black border border-black" : "bg-black text-white";

    if (onClick) {
        return (
            <div className={`${style} px-4 py-2 cursor-pointer rounded-sm flex justify-center ${disabled && "pointer-events-none"}`} onClick={onClick}>
                {text}
            </div>
        );
    } else {
        return (
            <div className={`${style} px-4 py-2 cursor-pointer rounded-sm flex justify-center ${disabled && "pointer-events-none"}`}>
                <Link to={href}>{text}</Link>
            </div>
        );
    }
}

export default Button;