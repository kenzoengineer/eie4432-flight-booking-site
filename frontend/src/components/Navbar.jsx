import { Link } from "react-router-dom";
import Button from "./Button";

const NavElement = ({ href, children }) => {
  return (
    <li className="text-gray-600 hover:text-gray-800 py-2 px-5 inline-block">
        {
            href ? 
            <Link to={href}>{children}</Link>
            :
            children
        }
      
    </li>
  );
};

const Navbar = () => {
  return (
    <nav className="bg-gray-100 flex justify-center items-center text-lg py-2">
        <ul>
            <NavElement href="/">
                <img src="/imgs/airplane_logo.svg" width={30} className="inline-block"/>
                <div className="text-black inline-block">FBS</div>
            </NavElement>
            <NavElement href="flights">Flights</NavElement>
            <NavElement href="login">Login</NavElement>
            <NavElement href="signup">Sign up</NavElement>
            <NavElement href="payment/1/1">Payment</NavElement>
            <NavElement href="booking/1">Booking</NavElement>
            <NavElement href="admin">Admin</NavElement>
            <NavElement href="eventmanagement">Flight Man.</NavElement>
            <NavElement href="">
                <span className="text-sm">
                <Button text={"Log Out"} onClick={() => console.log("Logged Out")} secondary></Button>
                </span>
            </NavElement>
        </ul>
    </nav>
  );
};

export default Navbar;
