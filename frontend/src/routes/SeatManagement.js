import { useEffect, useState } from "react";
import BorderedPane from "../components/BorderedPane";
import Button from "../components/Button";
import Container from "../components/Container";
import SeatMap from "../components/SeatMap";
import { GenerateFakeFlightData, GenerateFakeSeats } from "../js/utils";
import { GET_ALL_FLIGHT_DATA, GET_FLIGHT_DATA, PATCH_SEAT_FIRST_CLASS } from "../js/endpoints";
import { useNavigate } from "react-router-dom";
import { isAdmin } from "../js/utils";

const SeatMapEditor = ({flightData, seatData}) => {
    const [seats, setSeats] = useState(seatData);
    const [toggle, setToggle] = useState(new Set()); 
    const [occupied, setOccupied] = useState(null);

    const navigate = useNavigate();

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
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                seats: toggleArr
            })
        });
        const resJson = await res.json();
        if (res.status === 400) {
            alert(resJson.message);
        } else {
            navigate(0);
        }
    }

    return (
        <BorderedPane>
            <div className="font-bold text-3xl">{`HKG ➔ ${flightData.dest} // ${new Date(flightData.date).toUTCString()}`}</div>
                {
                    isAdmin() &&
                    <div className={`ml-5 h-2`}>
                        <div className={`${occupied ? "" : "hidden"}`}>
                            <span>Occupied by: </span>
                            <span className="text-md font-bold">{occupied}</span>
                        </div>
                    </div>
                }
            <SeatMap
                flightData={flightData}
                seatData={seats}
                changeSelectedSeat={x => toggleFirstClass(x)}
                editable
                setOccupied={setOccupied}
            />
            <div className="w-fit flex items-center mt-2">
                <Button text={"Save Changes"} onClick={submitChanges} secondary={!toggle.size} disabled={!toggle.size}></Button>
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
                <h2 className="text-xl italic">Click a seat to toggle whether it is <span className="text-sky-500 font-bold">First Class</span> or <span className="font-bold">Economy</span>.
                To persist your updates, click "Save Changes".</h2>
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
