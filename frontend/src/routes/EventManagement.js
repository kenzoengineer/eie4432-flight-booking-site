// Ken Jiang - 23012932X | Anson Yuen - 23012962X
import Container from "../components/Container";
import BorderedPane from "../components/BorderedPane";
import Form from "../components/Form";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import { GET_ALL_FLIGHT_DATA, POST_FLIGHT_DATA, PATCH_FLIGHT_DATA, DELETE_FLIGHT_DATA } from "../js/endpoints";
import { useNavigate } from "react-router-dom";

const FLIGHT_FIELDS = [
    {
        id: "dest",
        label: "Destination",
        span: true,
        type: "text",
        required: true,
    },
    {
        id: "date",
        label: "Date",
        span: true,
        type: "datetime-local",
        required: true,
    },
    {
        id: "duration",
        label: "Length (min)",
        span: false,
        type: "number",
        required: true,
    },
    {
        id: "stops",
        label: "Stops",
        span: false,
        type: "select",
        options: ["Nonstop", "One", "Two+"],
        required: true,
    },
    {
        id: "price",
        label: "Price",
        span: false,
        type: "number",
        required: true,
    },
    {
        id: "first_class_price",
        label: "1st Class Price",
        span: false,
        type: "number",
        required: true,
    },
];

const NEW_EVENT_FORM = [
    ...FLIGHT_FIELDS,
    {
        id: "rows",
        label: "Rows of Seats",
        span: false,
        type: "number",
        required: true,
    },
    {
        id: "sections",
        label: "# of Sections",
        span: false,
        type: "number",
        required: true,
    },
    {
        id: "columns_per_section",
        label: "Width per Section",
        span: true,
        type: "number",
        required: true,
    },
];

const Card = ({ fields, cta, values, children }) => {
    const navigate = useNavigate();
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData(e.target);
            const res = await fetch(PATCH_FLIGHT_DATA(values["_id"]),{
                method: "PATCH",  
                body: formData
            }); 
            const resJson = await res.json();

            if (res.status === 400) {
                alert(`Error editing flight: ${resJson.message}`);
                return;
            }

            navigate(0);
        } catch (err) {
            console.error(err);
            alert("Fatal error editing flight.")
        }
    }
    return (
        <div>
            <Form fields={fields} cta={cta} values={values} onSubmit={onSubmit} medium>
                <div className="mt-2">{children}</div>
            </Form>
        </div>
    );
};

const NewFlight = () => {
    const navigate = useNavigate();
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData(e.target);
            const res = await fetch(POST_FLIGHT_DATA(),{
                method: "POST",
                body: formData
            });
            const resJson = await res.json();
            if (res.status === 400) {
                alert(`Error creating flight: ${resJson.message}`);
                return;
            }

            navigate(0);
        } catch (err) {
            console.error(err);
            alert("Fatal error creating new flight.");
        }
    }
    return (
        <div>
            <Form fields={NEW_EVENT_FORM} cta={"Create New Flight"} onSubmit={onSubmit} large />
        </div>
    );
};

const EventManagement = () => {
    const [flights, setFlights] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getFlights = async () => {
            try {
                const res = await fetch(GET_ALL_FLIGHT_DATA());
                const resJson = await res.json();
                setFlights(resJson);
            } catch (err) {
                console.error(err);
            }
        }
        getFlights();
    }, []);

    const deleteFlight = async (id) => {
        try {
            const res = await fetch(DELETE_FLIGHT_DATA(id), {
                method: "DELETE"
            });
            const resJson = await res.json();
            if (res.status === 400) {
                alert(`Failed to delete flight: ${resJson.message}`);
            } else {
                alert(`Successfully deleted flight ${id}.`);
                navigate(0);
            }
        } catch (err) {
            console.error("Error: ", err);
            alert("Failed to delete flight");
        }
    }

    return (
        <Container title={"Flight Management"}>
            <BorderedPane>
                <h1 className="text-3xl font-bold">Create a New Flight:</h1>
            </BorderedPane>
            <div className="w-[27em]">
                <NewFlight />
            </div>
            <div className="mt-10">
                <BorderedPane>
                    <h1 className="text-3xl font-bold">Current Flights:</h1>
                </BorderedPane>
            </div>
            <div className="flex flex-wrap gap-3 mb-10">
                {flights.map((x,i) => {
                    return (
                        <Card key={i} fields={FLIGHT_FIELDS} cta={"Submit"} values={x}>
                            <Button
                                onClick={() => {deleteFlight(x._id)}}
                                text={"Delete"}
                                secondary
                            ></Button>
                        </Card>
                    );
                })}
            </div>
        </Container>
    );
};

export default EventManagement;
