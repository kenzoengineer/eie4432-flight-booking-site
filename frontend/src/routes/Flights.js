import { useEffect, useState } from "react";
import Button from "../components/Button";
import Filter from "../components/Filter";
import Container from "../components/Container";
import { GET_ALL_FLIGHT_DATA } from "../js/endpoints";
import { GenerateFakeFlightData } from "../js/utils";

const FLIGHT_DATA = GenerateFakeFlightData(10);
 
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

const FILTER_DATA = [
    {
        label: "Destination",
        type: "text",
    },
];

const Flight = ({ dest, date, duration, stops, price, id }) => {
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
                <Button text={"Book"} href={`/booking/${id}`} />
            </div>
        </div>
    );
};

const Flights = () => {
    const [flightData, setFlightData] = useState(FLIGHT_DATA);
    const [filteredFlightData, setFilteredFlightData] = useState(flightData);

    const filterFlightData = (filters) => {
        console.log(flightData);
        setFilteredFlightData(
            flightData.filter((x) =>
                x.dest.includes(filters.Destination.toUpperCase())
            )
        );
    };

    useEffect(() => {
        const fetchAllFlightData = () => {
            // return await fetch(GET_ALL_FLIGHT_DATA());
            return FLIGHT_DATA;
        };
        setFlightData(fetchAllFlightData());
    }, []);

    return (
        <Container title={"Flights"}>
            <div className="">
                <Filter filters={FILTER_DATA} filterFn={filterFlightData} />
            </div>
            {filteredFlightData.map((x) => {
                return (
                    <Flight
                        key={x.id}
                        dest={x.dest}
                        date={x.date}
                        duration={x.duration}
                        stops={x.stops}
                        price={x.price}
                        id={x.id}
                    />
                );
            })}
        </Container>
    );
};

export default Flights;
