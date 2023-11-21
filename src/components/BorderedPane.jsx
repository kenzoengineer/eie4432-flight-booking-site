const BorderedPane = ({children}) => {
    return (
        <div className="border-l-4 border-black pl-3">
            {children}
        </div>
    );
}

export default BorderedPane;