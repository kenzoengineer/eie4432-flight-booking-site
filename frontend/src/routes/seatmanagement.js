import { useState } from "react";
import BorderedPane from "../components/BorderedPane";
import Button from "../components/Button";
import Container from "../components/Container";
import SeatMap from "../components/SeatMap";
import { GenerateFakeFlightData, GenerateFakeSeats } from "../js/utils";

// will be used to draw the plane
const FAKE_FLIGHT_DATA = GenerateFakeFlightData(3);

const SeatMapEditor = ({flightData, seatData}) => {
    const [seats, setSeats] = useState(seatData);

    const toggleFirstClass = (idx) => {
        console.log("Changing ", idx);
        let newSeats = [...seats];
        newSeats[idx].firstClass = !newSeats[idx].firstClass;
        setSeats(newSeats);
    }

    return (
        <BorderedPane>
            <div className="font-bold text-3xl">{`HKG ➔ ${flightData.dest} // ${flightData.date.toUTCString()}`}</div>
            <SeatMap
                flightData={flightData}
                seatData={seats}
                changeSelectedSeat={x => toggleFirstClass(x)}
                editable
            />
            <div className="w-48 h-10 flex items-center">
                <Button text={"Save Changes"} onClick={() => {}}></Button>
            </div>
        </BorderedPane>
    );
}

const SeatManagement = () => {
    
    return (
        <Container title={"Seat Management"}>
            <BorderedPane>
                <h2 className="text-xl italic">Click a seat to toggle whether it is a First Class Seat or not. Remember to click "Save Changes" in order for them to persist.</h2>
            </BorderedPane>
            {
                FAKE_FLIGHT_DATA.map(x => {
                    return (
                        <SeatMapEditor flightData={x} seatData={GenerateFakeSeats(x)}/>
                    );
                })
            }
        </Container>
    );
};

export default SeatManagement;
