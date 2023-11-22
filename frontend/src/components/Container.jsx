const Container = ({title, noHeight, children}) => {
    return (
        <div className={`px-10 md:px-32 lg:px-48 xl:px-96 ${!noHeight && "min-h-[calc(100vh-13.2rem)]"}`}>
            {
                title &&
                <h1 className="my-5 text-5xl font-bold">{title}.</h1>
            }
            {children}
        </div>
    );
}

export default Container;