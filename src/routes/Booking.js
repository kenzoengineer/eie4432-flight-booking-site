import { useParams } from "react-router-dom";
import BorderedPane from "../components/BorderedPane";
import Container from "../components/Container";
import { useEffect, useState } from "react";
import { GET_FLIGHT_DATA, GET_ALL_SEAT_DATA } from "../js/endpoints";

const SEAT_DIAMETER = 50;
const SEAT_RADIUS = SEAT_DIAMETER / 2;

// will be used to draw the plane
const FAKE_FLIGHT_DATA = {
    dest: "YYZ",
    seatsPerColumn: 2,
    columnsPerPlane: 2,
    rowsPerPlane: 7,
};

// seat information (occupied, price)
const FAKE_SEAT_DATA = [];
// generate fake seat data
for (
    let i = 0;
    i <
    FAKE_FLIGHT_DATA.seatsPerColumn *
        FAKE_FLIGHT_DATA.columnsPerPlane *
        FAKE_FLIGHT_DATA.rowsPerPlane;
    i++
) {
    FAKE_SEAT_DATA.push({
        occupied: Math.floor(Math.random() * 5) < 2,
        price: Math.floor(Math.random() * 100) + 1000,
    });
}

const Seat = ({ x, y, row, col, totalCols, seatData, changeSelectedSeat }) => {
    const currSeat = seatData[col + (row - 1) * totalCols];
    const label = `${String.fromCharCode(65 + col)}${row}`;
    const fill = `${currSeat.occupied ? "fill-red-200" : "fill-white"}`;
    return (
        <>
            <rect
                onClick={() => {
                    if (!currSeat.occupied)
                        changeSelectedSeat(col + (row - 1) * totalCols, label);
                }}
                id={`s${col + (row - 1) * totalCols}`}
                className={`${fill} stroke-black stroke-[3px] ${
                    currSeat.occupied && "cursor-not-allowed"
                }`}
                x={x}
                y={y}
                width={SEAT_DIAMETER}
                height={SEAT_DIAMETER}
                rx="10"
                ry="10"
            ></rect>
            <text
                className="pointer-events-none select-none"
                x={x + SEAT_RADIUS}
                y={y + SEAT_RADIUS}
                fill="black"
                textAnchor="middle"
                alignmentBaseline="central"
            >
                {label}
            </text>
        </>
    );
};

const SeatMap = ({ flightData, seatData, changeSelectedSeat }) => {
    const seatElements = [];

    const TOTAL_COLUMNS =
        flightData.columnsPerPlane * flightData.seatsPerColumn;
    // count down columns. we subtract 1 so the last column is 0
    for (let col = TOTAL_COLUMNS - 1; col >= 0; col--) {
        // count up rows
        for (let row = 1; row <= flightData.rowsPerPlane; row++) {
            // insert space between columns
            const gap = Math.floor(
                (TOTAL_COLUMNS - 1 - col) / flightData.seatsPerColumn
            );
            seatElements.push(
                <Seat
                    x={SEAT_RADIUS + SEAT_DIAMETER * (row - 1)}
                    y={
                        SEAT_RADIUS +
                        (SEAT_DIAMETER * (TOTAL_COLUMNS - 1 - col) +
                            SEAT_RADIUS * gap)
                    }
                    row={row}
                    col={col}
                    totalCols={TOTAL_COLUMNS}
                    seatData={seatData}
                    changeSelectedSeat={changeSelectedSeat}
                />
            );
        }
    }

    return (
        <svg width={`${(flightData.rowsPerPlane + 1) * SEAT_DIAMETER}px`} height={`${(flightData.columnsPerPlane * flightData.seatsPerColumn + 1) * SEAT_DIAMETER + 25 * flightData.columnsPerPlane}px`}>
            {seatElements}
        </svg>
    );
};

const Booking = () => {
    const { id } = useParams();

    const [flightData, setFlightData] = useState(FAKE_FLIGHT_DATA);
    const [seatData, setSeatData] = useState(FAKE_SEAT_DATA);
    const [selectedSeat, setSelectedSeat] = useState({idx: -1, label: ""});

    const changeSelectedSeat = (idx, label) => {
        if (selectedSeat.idx === idx) {
            document
                .querySelector(`#s${selectedSeat.idx}`)
                .classList.remove("selected-seat");
            setSelectedSeat({idx: -1, label: ""});
            return;
        }
        if (selectedSeat.idx !== -1) {
            document
                .querySelector(`#s${selectedSeat.idx}`)
                .classList.remove("selected-seat");
        }
        setSelectedSeat({idx: idx, label: label});
        document.querySelector(`#s${idx}`).classList.add("selected-seat");
    };

    useEffect(() => {
        const fetchFlightData = () => {
            // return await fetch(GET_FLIGHT_DATA(id))
            return FAKE_FLIGHT_DATA;
        };
        const fetchSeatData = () => {
            // return await fetch(GET_FLIGHT_DATA(id))
            return FAKE_SEAT_DATA;
        };
        setFlightData(fetchFlightData);
        setSeatData(fetchSeatData);
    }, []);

    return (
        <Container>
            <h1 className="my-5 text-5xl font-bold">Payment.</h1>
            <BorderedPane>
                <div>
                    <p>Selecting seats for:</p>
                    <p className="text-lg font-bold">{"HKG -> YYZ"}</p>
                </div>
            </BorderedPane>
            <div className="flex justify-center">
                <SeatMap
                    flightData={flightData}
                    seatData={seatData}
                    changeSelectedSeat={changeSelectedSeat}
                ></SeatMap>
            </div>
            <div className="flex text-lg justify-center items-center font-bold mb-5">
                <p>Selected seat:</p>
                <div className="text-5xl text-white bg-black mx-2 px-2 -skew-x-12">{selectedSeat.idx === -1 ? "--" : selectedSeat.label}</div>
                <p>For:</p>
                <div className="text-5xl text-white bg-black mx-2 px-2 -skew-x-12">{"HKD "}{selectedSeat.idx === -1 ? "--" : seatData[selectedSeat.idx].price}</div>
            </div>
        </Container>
    );
};

export default Booking;
