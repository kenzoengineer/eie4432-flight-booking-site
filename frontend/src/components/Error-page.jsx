import Button from "./Button";

const ErrorPage = () => {
    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <h1 className="font-bold text-3xl mb-3">
            You have tried to access a page that does not exist.
            </h1>
            <div className="w-96">
                <Button href={"/flights"} text={"Return to Flights page."}/>
            </div>
        </div>
    );
}

export default ErrorPage;