const Container = ({children}) => {
    return (
        <div className="px-10 md:px-32 lg:px-48 xl:px-96">
            {children}
        </div>
    );
}

export default Container;