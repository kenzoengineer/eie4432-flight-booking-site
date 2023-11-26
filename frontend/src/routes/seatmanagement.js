import { useEffect, useState } from "react";
import BorderedPane from "../components/BorderedPane";
import Button from "../components/Button";
import Container from "../components/Container";
import SeatMap from "../components/SeatMap";
import { GenerateFakeFlightData, GenerateFakeSeats } from "../js/utils";
import { GET_ALL_FLIGHT_DATA, GET_FLIGHT_DATA, PATCH_SEAT_FIRST_CLASS } from "../js/endpoints";

// will be used to draw the plane
const FAKE_FLIGHT_DATA = GenerateFakeFlightData(3);

const SeatMapEditor = ({flightData, seatData}) => {
    const [seats, setSeats] = useState(seatData);
    const [toggle, setToggle] = useState(new Set());


    const toggleFirstClass = (idx) => {
        console.log("Changing ", idx);
        let newSeats = [...seats];
        newSeats[idx].first_class = !newSeats[idx].first_class;
        setSeats(newSeats);
        
        const newSet = new Set(toggle);
        if (newSet.has(seatData[idx]._id)) {
            newSet.delete(seatData[idx]._id);
        } else {
            newSet.add(seatData[idx]._id);
        }
        setToggle(newSet);
    }

    const submitChanges = async () => {
        const toggleArr = Array.from(toggle);
        const res = await fetch(PATCH_SEAT_FIRST_CLASS(), {
            method: "PATCH",
            headers: {
                "Content-Type": "applications/json",
            },
            body: JSON.stringify({
                seats: toggleArr
            })
        });

    }

    return (
        <BorderedPane>
            <div className="font-bold text-3xl">{`HKG ➔ ${flightData.dest} // ${new Date(flightData.date).toUTCString()}`}</div>
            <SeatMap
                flightData={flightData}
                seatData={seats}
                changeSelectedSeat={x => toggleFirstClass(x)}
                editable
            />
            <div className="w-48 h-10 flex items-center">
                <Button text={"Save Changes"} onClick={submitChanges}></Button>
            </div>
        </BorderedPane>
    );
}

const SeatManagement = () => {
    const [flightData, setFlightData] = useState([]);

    useEffect(() => {
        const fetchFlightData = async () => {
            const allFlightData = await fetch(GET_ALL_FLIGHT_DATA());
            const allFlightDataJson = await allFlightData.json();

            let res = [];
            for (const flight of allFlightDataJson) {
                const flightRes = await fetch(GET_FLIGHT_DATA(flight._id));
                const flightResJson = await flightRes.json();
                res.push(flightResJson);
            }

            setFlightData(res);
        }

        fetchFlightData();
    },[]);    

    return (
        <Container title={"Seat Management"}>
            <BorderedPane>
                <h2 className="text-xl italic">Click a seat to toggle whether it is a First Class Seat or not. Remember to click "Save Changes" in order for them to persist.</h2>
            </BorderedPane>
            {
                flightData.map(x => {
                    return (
                        <SeatMapEditor flightData={x.flight} seatData={x.seats}/>
                    );
                })
            }
        </Container>
    );
};

export default SeatManagement;
