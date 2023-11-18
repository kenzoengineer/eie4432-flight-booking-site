import { useState } from "react";
import Button from "../components/Button";
import Filter from "../components/Filter";

let FLIGHT_DATA = [
    {
        dest: "HKG->YYZ",
        date: "11-29-2023",
        time: "00:35 - 5:25",
        duration: "15hr 50min",
        stops: "Nonstop",
        price: "HKD 19,720",
        id: "1",
    },
    {
        dest: "HKG->ICN",
        date: "12-03-2023",
        time: "12:35 - 15:43",
        duration: "3hr 13min",
        stops: "Nonstop",
        price: "HKD 7,310",
        id: "2",
    },
    {
        dest: "HKG->NRT",
        date: "11-30-2023",
        time: "7:10 - 9:30",
        duration: "2hr 20min",
        stops: "Nonstop",
        price: "HKD 4,115",
        id: "3",
    },
];
// crude way to create more data
FLIGHT_DATA = [...FLIGHT_DATA, ...FLIGHT_DATA, ...FLIGHT_DATA];

const FILTER_DATA = [
    {
        label: "Destination",
        type: "text",
    },
];

const Flight = ({ dest, date, time, duration, stops, price, id }) => {
    return (
        <div className="rounded-md border border-grey-200 grid grid-cols-12 px-5 py-3 my-1">
            <div className="flex flex-col justify-center col-span-5">
                <div className="font-bold text-3xl">{dest}</div>
                <div>{date}</div>
            </div>
            <div className="flex flex-col justify-center col-span-2">
                <div>{time}</div>
                <div>{duration}</div>
            </div>
            <div className="flex flex-col justify-center col-span-2">
                {stops}
            </div>
            <div className="flex flex-col justify-center font-bold col-span-2">
                {price}
            </div>
            <div className="flex flex-col justify-center col-span-1">
                <Button text={"Book"} onClick={() => console.log(id)} />
            </div>
        </div>
    );
};

const Flights = () => {
    const [flightData] = useState(FLIGHT_DATA);
    const [filteredFlightData, setFilteredFlightData] = useState(flightData);

    const filterFlightData = (filters) => {
        console.log(filters);
        setFilteredFlightData(
            flightData.filter((x) =>
                x.dest.includes(filters.Destination.toUpperCase())
            )
        );
    };

    return (
        <div className="px-96">
            <h1 className="my-5 text-5xl font-bold">Flights.</h1>
            <div className="">
                <Filter filters={FILTER_DATA} filterFn={filterFlightData} />
            </div>
            {filteredFlightData.map((x) => {
                return (
                    <Flight
                        dest={x.dest}
                        date={x.date}
                        time={x.time}
                        duration={x.duration}
                        stops={x.stops}
                        price={x.price}
                        id={x.id}
                    />
                );
            })}
        </div>
    );
};

export default Flights;
