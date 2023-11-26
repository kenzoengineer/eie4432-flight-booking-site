import BorderedPane from "../components/BorderedPane";
import Button from "../components/Button";
import Container from "../components/Container";
import { useEffect, useState } from "react";

import { GET_LOGS } from "../js/endpoints";

const Admin = () => {

    const [logs, setLogs] = useState([]);
    useEffect(() => {
        const getLogs = async () => {
            const res = await fetch(GET_LOGS());
            let resJson = await res.json();
            resJson = resJson.reverse();
            resJson = resJson.map((x) => {
                const date = new Date(x.date);
                x.date = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
                return {
                    ...x,
                };
            });
            setLogs(resJson);
        }
        getLogs()
    },[]);

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
            <div>
                <h1 className="my-5 text-4xl font-bold">Logs.</h1>
                <div className="max-h-64 overflow-auto border border-gray-500 rounded-md p-2">
                    {logs.map((log) => {
                        return (
                            <div className="my-5">
                                <p className="text-gray-500">{log.date + ": " + log.message}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Container>
    );
};

export default Admin;
