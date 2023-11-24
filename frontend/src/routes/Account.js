import { useEffect, useState } from "react";
import Container from "../components/Container";
import { GET_USER } from "../js/endpoints";
import {
    GenerateFakeTransactionInformation,
    GenerateFakeUser,
} from "../js/utils";
import BorderedPane from "../components/BorderedPane";
import Button from "../components/Button";
import Form from "../components/Form";

const AccountForm = [
    {
        label: "Username",
        type: "text",
        span: false,
        required: true,
    },
    {
        label: "Email",
        type: "email",
        span: false,
        required: true,
    },
    {
        label: "Password",
        type: "password",
        span: false,
        required: true,
    },
    {
        label: "Gender",
        type: "text",
        span: false,
        required: true,
    },
    {
        label: "Birthday",
        type: "date",
        span: false,
        required: true,
    },
    {
        label: "Profile Picture (Link)",
        type: "text",
        span: false,
        required: true,
    },
];

const DATE_OPTIONS = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
};

const TIME_OPTIONS = {
    timeZone: "UTC",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
};

const FAKE_TRANSACTIONS = [];

const Header = () => {
    return (
        <div className="grid grid-cols-12 px-5 mt-3 text-gray-400">
            <div className="flex col-span-5">Destination, Date</div>
            <div className="flex col-span-2">Time, Duration</div>
            <div className="flex col-span-2"># of Stops</div>
            <div className="flex col-span-2">Price</div>
            <div className="flex col-span-1">Seat</div>
        </div>
    );
};

const Transaction = ({ dest, date, duration, stops, price, seat }) => {
    const generateTimeString = (date, duration) => {
        const endTime = new Date(date.getTime() + duration * 60000);
        return endTime.toLocaleTimeString("cn-HK", {
            ...TIME_OPTIONS,
            timeZoneName: "short",
        });
    };
    return (
        <div className="rounded-md border border-grey-200 grid grid-cols-12 px-5 py-3 my-1">
            <div className="flex flex-col justify-center col-span-5">
                <div className="font-bold text-3xl">{`HKG ➔ ${dest}`}</div>
                <div>{date.toLocaleDateString("cn-HK", DATE_OPTIONS)}</div>
            </div>
            <div className="flex flex-col justify-center col-span-2">
                <div>{`${date.toLocaleTimeString(
                    "cn-HK",
                    TIME_OPTIONS
                )} - ${generateTimeString(date, duration)}`}</div>
                <div className="italic">{`${
                    Math.floor(duration / 60) > 9 ? "" : "0"
                }${Math.floor(duration / 60)}h ${duration % 60}m`}</div>
            </div>
            <div className="flex flex-col justify-center col-span-2">
                {stops}
            </div>
            <div className="flex flex-col justify-center font-bold col-span-2">
                {`HKD ${price}`}
            </div>
            <div className="flex flex-col justify-center col-span-1">
                {seat}
            </div>
        </div>
    );
};

const Account = () => {
    const [user, setUser] = useState("");
    const [transactions, setTransactions] = useState(FAKE_TRANSACTIONS);
    const [editing, setEditing] = useState(false);
    const userDataWithoutId = () => {
        let newUser = { ...user };
        delete newUser.id;
        return newUser;
    };
    useEffect(() => {
        const getUser = async () => {
            // return fetch(GET_USER(localStorage.getItem("user")));
            setUser(
                await GenerateFakeUser(
                    JSON.parse(localStorage.getItem("user")).id
                )
            );
        };
        const getTransactions = async () => {
            // return fetch(GET_TRANSACTIONS(localStorage.getItem("user")));
            setTransactions(GenerateFakeTransactionInformation(5));
        };
        getUser();
        getTransactions();
    }, []);
    return (
        <Container title={"Account"}>
            <BorderedPane>
                <div className="flex items-center h-64">
                    <div className="h-48 w-48 p-2 flex items-center justify-center border-2 border-gray-500 rounded-md">
                        <img
                            src={user.photo}
                            className="max-h-[11em] max-w-[11em]"
                        ></img>
                    </div>
                    <div className="ml-5 w-96">
                        <h1 className="text-5xl font-bold mb-1">
                            {user.username}
                            <span className="text-sm text-gray-500">
                                {" #"}
                                {user.id}
                            </span>
                        </h1>
                        <p>Email: {user.email}</p>
                        <p>Gender: {user.gender}</p>
                        <p className="mb-2">
                            Birthday:{" "}
                            {(user.birthday ?? new Date()).toDateString()}
                        </p>
                        <div className="w-24">
                            <Button
                                text={editing ? "Cancel" : "Edit"}
                                onClick={() => {
                                    setEditing(!editing);
                                }}
                                secondary
                            ></Button>
                        </div>
                    </div>
                    <div
                        id={"edit-form"}
                        className={`${
                            !editing && "opacity-0 pointer-events-none"
                        } transition-opacity`}
                    >
                        <Form
                            fields={AccountForm}
                            values={Object.values(userDataWithoutId())}
                            cta="Complete Edit"
                            onSubmit={() => {
                                alert("hey");
                            }}
                            large
                        />
                    </div>
                </div>
            </BorderedPane>
            <div className="mt-10">
                <BorderedPane>
                    <h1 className="text-3xl font-bold">Transaction History:</h1>
                </BorderedPane>
                <div className="flex-col">
                    <Header />
                    {transactions.map((x, i) => {
                        return (
                            <Transaction
                                key={i}
                                dest={x.dest}
                                date={x.date}
                                duration={x.duration}
                                stops={x.stops}
                                price={x.price}
                                seat={x.seat}
                            />
                        );
                    })}
                </div>
            </div>
        </Container>
    );
};

export default Account;
