import BorderedPane from "../components/BorderedPane";
import Button from "../components/Button";
import Container from "../components/Container";

const Admin = () => {
    return (
        <Container title={"Admin"}>
            <BorderedPane>
                <div className="w-48">
                    <Button
                        href={"/seatmanagement"}
                        text={"Change Seat Maps"}
                        secondary
                    />
                </div>
            </BorderedPane>
            <BorderedPane>
                <div className="w-48">
                    <Button
                        href={"/eventmanagement"}
                        text={"Update Flight Listings"}
                        secondary
                    />
                </div>
            </BorderedPane>
        </Container>
    );
};

export default Admin;
