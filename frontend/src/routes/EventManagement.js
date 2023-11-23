import Container from "../components/Container";
import Form from "../components/Form";
import Button from "../components/Button"
import { GenerateFakeFlightData } from "../js/utils";

const FLIGHT_DATA = GenerateFakeFlightData(20);

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
        label: "Length (min)",
        span: false,
        type: "number",
        required: true,
    },{
        label: "Stops",
        span: false,
        type: "select",
        options: ["Nonstop", "One", "Two+"],
        required: true,
    },{
        label: "Price (HKD)",
        span: true,
        type: "number",
        required: true,
    },
];

const Card = ({values}) => {
    console.log(values);
    return (
        <div>
            <Form fields={FLIGHT_FIELDS} cta={"Submit"} values={values} medium>
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
            <div className="flex flex-wrap gap-3">
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
