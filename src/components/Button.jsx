import { Link } from "react-router-dom";

const Button = ({text, secondary, onClick, href}) => {
    const style = secondary ? "text-black border border-black" : "bg-black text-white";

    if (onClick) {
        return (
            <div className={`${style} px-4 py-2 cursor-pointer rounded-md flex justify-center`} onClick={onClick}>
                {text}
            </div>
        );
    } else {
        return (
            <div className={`${style} px-4 py-2 cursor-pointer rounded-md flex justify-center`} onClick={onClick}>
                <Link to={href}>{text}</Link>
            </div>
        );
    }
}

export default Button;