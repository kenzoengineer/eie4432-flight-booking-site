import Container from "../components/Container";
import Form from "../components/Form";
import Button from "../components/Button"
import { GenerateFakeFlightData } from "../js/utils";

const FLIGHT_DATA = GenerateFakeFlightData(4);

const FLIGHT_FIELDS = [
    {
        label: "Destination",
        span: true,
        type: "text",
        required: true,
    },{
        label: "Date",
        span: true,
        type: "datetime-local",
        required: true,
    },{
        label: "Duration",
        span: false,
        type: "number",
        required: true,
    },{
        label: "Stops",
        span: false,
        type: "text",
        required: true,
    },{
        label: "Price",
        span: true,
        type: "number",
        required: true,
    },
];

const Card = ({values}) => {
    console.log(values);
    return (
        <div className="m-2">
            <Form fields={FLIGHT_FIELDS} cta={"Submit"} values={values}>
                <div className="mt-2">
                    <Button onClick={() => {console.log("DELETE")}} text={"Delete"} secondary></Button>
                </div>
            </Form>
        </div>
    );
};

const EventManagement = () => {
    return (
        <Container title={"Flight Management"}>
            <div className="flex flex-wrap justify-around">
            {
                FLIGHT_DATA.map((x) => {
                    return(<Card
                        values={Object.values(x)}
                    />)
                })
            }
            </div>
        </Container>
    );
};

export default EventManagement;
