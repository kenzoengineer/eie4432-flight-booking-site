import { Link, useParams } from "react-router-dom";
import BorderedPane from "../components/BorderedPane";
import Container from "../components/Container";
import { useEffect, useState } from "react";
import { GET_FLIGHT_DATA, GET_FLIGHT_SEAT_DATA } from "../js/endpoints";
import Button from "../components/Button";
import SeatMap from "../components/SeatMap";
import { GenerateFakeFlightData, GenerateFakeSeats } from "../js/utils";

// will be used to draw the plane
const FAKE_FLIGHT_DATA = GenerateFakeFlightData(1)[0];

// seat information (occupied, price)
const FAKE_SEAT_DATA = GenerateFakeSeats(FAKE_FLIGHT_DATA);

const Booking = () => {
    const { id } = useParams();

    const [flightData, setFlightData] = useState({});
    const [seatData, setSeatData] = useState([]);
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
        const fetchFlightAndSeatsData = async () => {
            const res = await fetch(GET_FLIGHT_DATA(id));
            const resJson = await res.json();
            console.log(resJson);
            setFlightData(resJson.flight); 
            setSeatData(resJson.seats);
            //return FAKE_FLIGHT_DATA;
        };
        fetchFlightAndSeatsData();
    }, []);

    return (
        <Container title={"Booking"}>
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
                <div className="text-5xl text-white bg-black mx-2 px-2 -skew-x-12">{"HKD "}{selectedSeat.idx === -1 ? "--" : (
                    selectedSeat.first_class ? flightData.first_class_price : flightData.price
                )}</div>
            </div>
            <div className="flex justify-center mb-5">
                <div className={`${selectedSeat.idx === -1 && "cursor-not-allowed"}`}>
                    <Button href={`/payment/${id}/${selectedSeat.idx}`} text={"Book"} secondary={selectedSeat.idx === -1} disabled={selectedSeat.idx === -1}/>
                </div>
            </div>
        </Container>
    );
};

export default Booking;
