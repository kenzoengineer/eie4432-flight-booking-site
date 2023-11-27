// Ken Jiang - 23012932X | Anson Yuen - 23012962X
import { useEffect, useState } from "react";
import Button from "../components/Button";
import Filter from "../components/Filter";
import Container from "../components/Container";
import { GET_ALL_FLIGHT_DATA } from "../js/endpoints";
import { DATE_OPTIONS, TIME_OPTIONS, generateTimeString } from "../js/utils";

const FILTER_DATA = [
    {
        label: "Destination",
        type: "text",
    },{
        label: "Date",
        type: "date",
    },{
        label: "Stops",
        type: "select",
        options: ["Nonstop", "One", "Two+"]
    }
];

const Flight = ({ dest, date, duration, stops, price, id, sold }) => {
    return (
        <div className="rounded-md border border-grey-200 max-md:flex flex-col md:grid md:grid-cols-12 px-5 py-3 my-1">
            <div className="flex flex-col justify-center col-span-5">
                <div className="font-bold text-3xl flex items-center">{`HKG ➔ ${dest}`}<span className="text-xs text-zinc-400 ml-1">{`(${sold} sold)`}</span></div>
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

const Header = () => {
    return (
        <div className="border-gray-200 max-md:flex max-md:gap-1 md:grid md:grid-cols-12 px-5 mt-3 text-gray-400">
            <div className="flex col-span-5">
                Destination, Date
            </div>
            <div className="flex col-span-2">
                <span className="md:hidden">{","}</span>Time, Duration
            </div>
            <div className="flex col-span-2">
            <span className="md:hidden">{","}</span># of Stops
            </div>
            <div className="flex col-span-2">
                <span className="md:hidden">{","}</span>Price
            </div>
            <div className="flex col-span-1 max-md:hidden">

            </div>
        </div>
    );
}

const Flights = () => {
    const [flightData, setFlightData] = useState([]);
    const [filteredFlightData, setFilteredFlightData] = useState(flightData);

    const filterFlightData = (filters) => {
        setFilteredFlightData(
            flightData.filter((x) =>
                x.dest.toUpperCase().includes((filters.Destination ?? "").toUpperCase()) &&
                // invalid date (incomplete filtering) shouldn't count
                (new Date(filters.Date).toString() === "Invalid Date" || new Date(filters.Date).toDateString() === new Date(x.date).toDateString()) &&
                x.stops.includes(filters.Stops ?? "")
            )
        );
    };

    useEffect(() => {
        const fetchAllFlightData = async () => {
            try {
                const res = await fetch(GET_ALL_FLIGHT_DATA());
                const resJson = await res.json();
                setFlightData(resJson);
                setFilteredFlightData(resJson); 
            } catch (err) {
                console.error(err);
            }
        };
        fetchAllFlightData();
    }, []);

    return (
        <Container title={"Flights"}>
            <div className="pt-2">
                <Filter filters={FILTER_DATA} filterFn={filterFlightData} />
            </div>
            <Header/>
            {filteredFlightData.map((x) => {
                return (
                    <Flight
                        key={x.id}
                        dest={x.dest}
                        date={new Date(x.date)}
                        duration={x.duration}
                        stops={x.stops}
                        price={x.price}
                        id={x._id}
                        sold={`${Math.round((x.sold/(x.columns_per_section * x.sections * x.rows)) * 100)}%`}
                    />
                );
            })}
        </Container>
    );
};

export default Flights;
