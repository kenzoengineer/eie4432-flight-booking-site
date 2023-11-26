import { useEffect, useState } from "react";
import Container from "../components/Container";
import { GET_USER, PATCH_USER, GET_TRANSACTIONS } from "../js/endpoints";
import {
    GenerateFakeTransactionInformation,
    GenerateFakeUser,
    getLoggedInUser,
    isAdmin
} from "../js/utils";
import BorderedPane from "../components/BorderedPane";
import Button from "../components/Button";
import Form from "../components/Form";
import { useNavigate } from "react-router-dom";

const AccountForm = [
    {
        id: "username",
        label: "Username",
        type: "text",
        span: false,
        required: true,
    },
    {
        id: "email",
        label: "Email",
        type: "email",
        span: false,
        required: true,
    },
    {
        id: "password",
        label: "Password",
        type: "password",
        span: false,
        required: true,
    },
    {
        id: "gender",
        label: "Gender",
        type: "text",
        span: false,
        required: true,
    },
    {
        id: "birthdate",
        label: "Birthday",
        type: "date",
        span: false,
        required: true,
    },
    {
        id: "profile_pic",
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

const Transaction = ({ user, dest, date, duration, stops, price, seat }) => {
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
                {user && <div className="">Purchaser: {user}</div>}
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
    const [transactions, setTransactions] = useState([]);
    const [editing, setEditing] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            const res = await fetch(GET_USER(getLoggedInUser().userId));
            let resJson = await res.json();
            delete resJson.password;
            setUser(resJson);
        };
        const getTransactions = async () => {
            const userId = isAdmin() ? "" : getLoggedInUser().userId;
            const res = await fetch(GET_TRANSACTIONS(userId));
            let resJson = await res.json();
            resJson = resJson.map((x) => {
                x.flight.date = new Date(x.flight.date);
                return {
                    ...x,
                };
            });
            setTransactions(resJson);
        };
        getUser();
        getTransactions();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(user);
        const formData = new FormData(e.target);
        try {
            const res = await fetch(PATCH_USER(user._id), {
                method: "PATCH",
                body: formData,
            });
            const resJson = await res.json();
            if (res.status === 400) {
                alert(resJson.message);
                return;
            }
            navigate(0);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Container title={"Account"}>
            <BorderedPane>
                <div className="flex max-lg:flex-col items-center">
                    <div className="h-48 w-48 p-2 flex items-center justify-center border-2 border-gray-500 rounded-md">
                        <img
                            src={user.profile_pic}
                            className="max-h-[11em] max-w-[11em]"
                        ></img>
                    </div>
                    <div className="ml-5 w-96">
                        <span className="text-sm text-gray-500">
                            {" #"}
                            {user._id}
                        </span>
                        <h1 className="text-5xl font-bold mb-1">
                            {user.username}
                        </h1>
                        <p>Email: {user.email}</p>
                        <p>Gender: {user.gender}</p>
                        <p className="mb-2">
                            Birthday:{" "}
                            {(
                                new Date(user.birthdate) ?? new Date()
                            ).toDateString()}
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
                            editing ? "max-lg:h-[27em] lg:h-64" : "opacity-0 h-0 pointer-events-none"
                        } transition-all max-lg:m-5 max-lg:translate-x-3`}
                    >
                        <Form
                            fields={AccountForm}
                            values={user}
                            cta="Complete Edit"
                            onSubmit={onSubmit}
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
                    {transactions.length && transactions.map((x, i) => {
                        return (
                            <Transaction
                                user={x.user ? x.user : null}
                                key={i}
                                dest={x.flight.dest}
                                date={x.flight.date}
                                duration={x.flight.duration}
                                stops={x.flight.stops}
                                price={x.price}
                                seat={x.seat_name}
                            />
                        );
                    })}
                </div>
            </div>
        </Container>
    );
};

export default Account;
