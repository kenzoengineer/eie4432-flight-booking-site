import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import { isAdmin } from "../js/utils";
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
    useEffect(() => {
        const fetchAdminStatus = async () => {
            const res = await isAdmin();
            console.log(res);
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
                <NavElement href="payment/1/1">Payment</NavElement>
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
            </ul>
        </nav>
    );
};

export default Navbar;
