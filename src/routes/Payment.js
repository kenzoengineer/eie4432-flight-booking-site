import Container from "../components/Container";
import BorderedPane from "../components/BorderedPane";

const Payment = () => {
    // state for payment status
    return (
        <Container>
            <h1 className="my-5 text-5xl font-bold">Payment.</h1>
            <BorderedPane>
                <div>
                    <p>{"HKG -> YYZ"}</p>
                    <p>{"11-29-2023 // 00:35 -05:25"}</p>
                    <p>{"Seat C3 // HKD 19,720"}</p>
                </div>
            </BorderedPane>
        </Container>
    );
};

export default Payment;
