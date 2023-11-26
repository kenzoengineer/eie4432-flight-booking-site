import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import { getLoggedInUser, isAdmin } from "../js/utils";
import { useEffect, useState } from "react";

const NavElement = ({ href, children }) => {
    return (
        <li className="text-gray-600 hover:text-gray-800 py-2 px-5 inline-block">
            {href ? <Link to={href}>{children}</Link> : children}
        </li>
    );
};

const Navbar = () => {
    const navigate = useNavigate();

    const [adminStatus, setAdminStatus] = useState(false);
    const [showNotif, setShowNotif] = useState(false);
    const messages = getLoggedInUser()?.messages ?? [];
    const hasNotif = messages.length > 0;
    const bellSrc = hasNotif ? "/imgs/notif-bell.svg" : "/imgs/bell.svg";

    useEffect(() => {
        const fetchAdminStatus = async () => {
            const res = isAdmin();
            setAdminStatus(res);
        };
        fetchAdminStatus();
    }, []);

    const logOut = () => {
        sessionStorage.removeItem("user");
        localStorage.removeItem("user");
        navigate("/login");
    };
    return (
        <nav className="bg-gray-100 flex justify-center items-center text-lg py-2">
            <ul>
                <NavElement href="/">
                    <img
                        src="/imgs/airplane_logo.svg"
                        width={30}
                        className="inline-block"
                    />
                    <div className="text-black inline-block">FBS</div>
                </NavElement>
                <NavElement href="flights">Flights</NavElement>
                {adminStatus && <NavElement href="admin">Admin</NavElement>}
                <NavElement href="account">Account</NavElement>
                <NavElement href="">
                    <span className="text-sm">
                        <Button
                            text={"Log Out"}
                            onClick={logOut}
                            secondary
                        ></Button>
                    </span>
                </NavElement>
                <li className="py-2 px-5 inline-block ">
                    <div className="relative inline-block">
                        <img
                            src={bellSrc}
                            width={30}
                            className="inline-block hover:cursor-pointer"
                            onClick={() => setShowNotif(!showNotif)}
                        />
                        {showNotif && (
														<div className="absolute mt-4 right-0 z-10 px-5 py-4 w-96 bg-white origin-top-right rounded-md shadow-lg border border-gray-300">
                                <p className="text-lg">Notifications</p>
																<hr className="border-black border-2"/>
                                <div className="max-h-64 overflow-auto divide-y divide-gray-400">
                                    {messages.map((msg, i) => {
                                        return (
                                            <div
                                                className="text-gray-700 px-4 py-2 text-sm"
                                                key={i}
                                            >
                                                {msg}
                                            </div>
                                        );
                                    })}
                                </div>
														</div>
                        )}
                    </div>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
