import Container from "../components/Container";
import BorderedPane from "../components/BorderedPane";
import Form from "../components/Form";
import { useParams } from "react-router-dom";

const PAYMENT_FIELDS = [
    {
        label: "Email Address",
        span: true,
        type: "email",
        required: true,
    },{
        label: "Cardholder Name",
        span: true,
        type: "text",
        required: true,
    },{
        label: "Expiry Date",
        span: false,
        type: "date",
        required: true,
    },{
        label: "CVV",
        span: false,
        type: "number",
        required: true,
    },
];

const Payment = () => {
    // state for payment status
    const {flightid, seatidx} = useParams();
    return (
        <Container title={"Payment"}>
            <BorderedPane>
                <div>
                    <p>{"HKG -> YYZ"}</p>
                    <p>{"11-29-2023 // 00:35 -05:25"}</p>
                    <p>{"Seat C3 // HKD 19,720"}</p>
                </div>
            </BorderedPane>
            <div className="flex flex-col justify-center items-center py-5">
            <Form fields={PAYMENT_FIELDS} cta={"Pay"} onSubmit={console.log} large />
            </div>
        </Container>
    );
};

export default Payment;
