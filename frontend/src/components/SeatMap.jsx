import { isAdmin } from "../js/utils";

const SEAT_DIAMETER = 50;
const SEAT_RADIUS = SEAT_DIAMETER / 2;

const Seat = ({ x, y, row, col, totalCols, seatData, changeSelectedSeat, editable, setOccupied }) => {
    const currSeat = seatData[col + (row - 1) * totalCols];
    const label = `${String.fromCharCode(65 + col)}${row}`;
    const fill = `${currSeat.occupied ? "fill-red-200" : "fill-white"}`;
    return (
        <>
            <rect
                onClick={() => {
                    if (!currSeat.occupied || editable){
                        changeSelectedSeat(col + (row - 1) * totalCols, label);
                        return;
                    }
                }}
                id={`s${col + (row - 1) * totalCols}`}
                className={`${fill} ${currSeat.first_class ? "stroke-sky-500" : "stroke-black"} stroke-[3px] 
                ${(currSeat.occupied && !editable) && !isAdmin() && "cursor-not-allowed"}`}
                x={x}
                y={y}
                width={SEAT_DIAMETER}
                height={SEAT_DIAMETER}
                rx="10"
                ry="10"
                onMouseOver={() => {
                    if(setOccupied && currSeat.occupied) {
                        setOccupied(currSeat.occupied);
                    }
                }}
                onMouseOut={() => {
                    if(setOccupied) {
                        setOccupied(null);
                    }
                }}
            ></rect>
            <text
                className="pointer-events-none select-none"
                x={x + SEAT_RADIUS}
                y={y + SEAT_RADIUS}
                fill={currSeat.first_class ? "#0ea5e9" : "#000"}
                textAnchor="middle"
                alignmentBaseline="central"
            >
                {label}
            </text>
        </>
    );
};

const SeatMap = ({ flightData, seatData, changeSelectedSeat, editable, setOccupied }) => {
    const seatElements = [];

    const TOTAL_COLUMNS =
        flightData.sections * flightData.columns_per_section;
    // count down columns. we subtract 1 so the last column is 0
    for (let col = TOTAL_COLUMNS - 1; col >= 0; col--) {
        // count up rows
        for (let row = 1; row <= flightData.rows; row++) {
            // insert space between columns
            const gap = Math.floor(
                (TOTAL_COLUMNS - 1 - col) / flightData.columns_per_section
            );
            seatElements.push(
                <Seat
                    key={`${row}${col}`}
                    x={SEAT_RADIUS + (SEAT_DIAMETER + 5) * (row - 1)}
                    y={
                        SEAT_RADIUS +
                        ((SEAT_DIAMETER + 5) * (TOTAL_COLUMNS - 1 - col) +
                            SEAT_RADIUS * gap)
                    }
                    row={row}
                    col={col}
                    totalCols={TOTAL_COLUMNS}
                    seatData={seatData}
                    changeSelectedSeat={changeSelectedSeat}
                    editable={editable}
                    setOccupied={setOccupied}
                />
            );
        }
    }

    return (
        <div className="overflow-x-auto">
            <svg width={`${(Number(flightData.rows) + 1) * (SEAT_DIAMETER + 5)}px`} height={`${(flightData.sections * flightData.columns_per_section) * (SEAT_DIAMETER + 5) + 25 * flightData.sections}px`}>
                {seatElements}
            </svg>
        </div>
    );
};

export default SeatMap;