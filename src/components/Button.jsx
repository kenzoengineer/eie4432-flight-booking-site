const Button = ({text, secondary, onClick}) => {
    const style = secondary ? "text-black border border-black" : "bg-black text-white";
    return (
        <div className={`${style} px-4 py-2 cursor-pointer rounded-md flex justify-center`} onClick={onClick}>
            {text}
        </div>
    );
}

export default Button;