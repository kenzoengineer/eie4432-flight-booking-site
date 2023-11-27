// Ken Jiang - 23012932X | Anson Yuen - 23012962X
import { Link } from "react-router-dom";

const Button = ({text, secondary, onClick, href, disabled}) => {
    const style = secondary ? "text-black border border-black hover:bg-black hover:text-white" : "bg-black text-white hover:bg-zinc-600";

    if (onClick) {
        return (
            <div className={`${style} transition-colors px-4 items-center cursor-pointer rounded-sm flex justify-center ${disabled && "pointer-events-none"} select-none`} onClick={onClick}>
                {text}
            </div>
        );
    } else {
        return (
            <Link to={href}>
                <div className={`${style} transition-colors px-4 py-2 cursor-pointer rounded-sm flex justify-center ${disabled && "pointer-events-none"}`}>
                    {text}
                </div>
            </Link>
        );
    }
}

export default Button;