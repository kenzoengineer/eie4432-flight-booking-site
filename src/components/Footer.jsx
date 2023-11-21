import Container from "./Container";

const Footer = () => {
    return (
        <footer className="bg-gray-100 ">
            <Container>
                <div className="flex items-center py-5 text-sm">
                <div className="mr-5">
                <img src="/imgs/airplane_logo.svg" width={80} />
            </div>
            <div>
                <h1 className="text-2xl font-bold mb-2">Flight Booking System</h1>
                <div>
                    Ken Jiang - 23012932X
                    <br />
                    Anson Yuen - 23012962X
                </div>
            </div>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
