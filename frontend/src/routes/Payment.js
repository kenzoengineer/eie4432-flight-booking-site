import Container from "../components/Container";
import BorderedPane from "../components/BorderedPane";
import Form from "../components/Form";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { GET_FLIGHT_DATA, GET_USER, POST_TRANSACTION } from "../js/endpoints";
import {
    DATE_OPTIONS,
    TIME_OPTIONS,
    generateTimeString,
    getLoggedInUser,
    seatLabelFromIndex,
} from "../js/utils";
import Ticket from "../components/Ticket";
import Button from "../components/Button";

const PAYMENT_FIELDS = [
    {
        id: "cardholder",
        label: "Cardholder Name",
        span: true,
        type: "text",
        required: true,
    },
    {
        id: "cardnumber",
        label: "Card Number",
        span: true,
        type: "text",
        required: true,
    },
    {
        id: "expirydate",
        label: "Expiry Date",
        span: false,
        type: "date",
        required: true,
    },
    {
        id: "cvv",
        label: "CVV",
        span: false,
        type: "number",
        required: true,
    },
];

const Payment = () => {
    // state for payment status
    const { flightid, seatidx } = useParams();
    const [flightData, setFlightData] = useState({
        flight: {
            dest: "",
            date: new Date(),
            duration: 0,
        },
        seats: [],
    });

    const [user, setUser] = useState({});

    const [paid, setPaid] = useState(false);

    useEffect(() => {
        const fetchFlightData = async () => {
            const res = await fetch(GET_FLIGHT_DATA(flightid));
            const resJson = await res.json();
            setFlightData(resJson);
        };

        const fetchUser = async () => {
            const res = await fetch(GET_USER(getLoggedInUser().userId));
            setUser(await res.json());
        };

        fetchFlightData();
        fetchUser();
    }, [flightid]);

    const onSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(POST_TRANSACTION(), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(
                {
                    // user flight seat
                    user: getLoggedInUser().userId,
                    flight: flightData.flight._id,
                    seat: flightData.seats[seatidx]._id,
                    seat_name: seatLabelFromIndex(flightData.flight.sections * flightData.flight.columns_per_section, seatidx),
                    price: flightData.seats[seatidx]?.first_class ? flightData.flight.first_class_price : flightData.flight.price
                }
            )
        });

        if (res.status !== 400) {
            setPaid(true);
        } else {
            alert((await res.json()).message);
        }
    }

    return (
        <Container title={"Payment"}>
            <BorderedPane>
                <div>
                    <p>{`HKG ➔ ${flightData.flight.dest}`}</p>
                    <p>
                        {new Date(flightData.flight.date).toLocaleDateString(
                            "cn-HK",
                            DATE_OPTIONS
                        )}
                    </p>
                    <p>{`${new Date(flightData.flight.date).toLocaleTimeString(
                        "cn-HK",
                        TIME_OPTIONS
                    )} - ${generateTimeString(
                        new Date(flightData.flight.date),
                        flightData.flight.duration
                    )}`}</p>
                    <p>
                        {seatLabelFromIndex(
                            flightData.flight.sections *
                                flightData.flight.columns_per_section,
                            seatidx
                        )}
                        {` // `}
                        {`HKD ${
                            flightData.seats[seatidx]?.first_class
                                ? flightData.flight.first_class_price
                                : flightData.flight.price
                        }`}
                    </p>
                </div>
            </BorderedPane>
            <div className="flex flex-col justify-center items-center py-5">
                <Form
                    fields={PAYMENT_FIELDS}
                    cta={"Pay"}
                    onSubmit={onSubmit}
                    large
                >
                    <div className="mt-3">Payment Status: {
                        paid ? 
                        <span className="text-emerald-400 font-bold">Success</span>
                        :
                        <span className="text-red-500 font-bold">Pending</span>
                    }</div>
                </Form>
                <div className={`mt-5 ${paid ? "h-96" : "h-0 opacity-0"} overflow-hidden transition-all`}>
                    <Ticket
                        dest={flightData.flight.dest}
                        name={user.username}
                        date={new Date(
                            flightData.flight.date
                        ).toLocaleDateString("cn-HK", DATE_OPTIONS)}
                        time={new Date(
                            flightData.flight.date
                        ).toLocaleTimeString("cn-HK", TIME_OPTIONS)}
                        seat={seatLabelFromIndex(
                            flightData.flight.sections *
                                flightData.flight.columns_per_section,
                            seatidx
                        )}
                    />
                    <div className="italic text-zinc-400 text-center my-2">Please save the above ticket for your own reference.</div>
                    <Button href={"/flights"} text={"Back to Flight Listings"}/>
                </div>
            </div>
        </Container>
    );
};

export default Payment;
