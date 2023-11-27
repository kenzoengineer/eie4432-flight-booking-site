// Ken Jiang - 23012932X | Anson Yuen - 23012962X
const BorderedPane = ({children}) => {
    return (
        <div className="border-l-4 border-black pl-3 mb-3">
            {children}
        </div>
    );
}

export default BorderedPane;