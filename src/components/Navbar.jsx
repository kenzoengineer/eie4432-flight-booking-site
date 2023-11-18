import { Link } from "react-router-dom";
import Button from "./Button";

const NavElement = ({ href, children }) => {
  return (
    <div className="text-gray-600 hover:text-gray-800 py-2 px-5">
        {
            href ? 
            <Link to={href}>{children}</Link>
            :
            children
        }
      
    </div>
  );
};

const Navbar = () => {
  return (
    <nav className="bg-gray-100 flex justify-center items-center text-lg py-2">
        <NavElement href="/">
            <div className="flex">
                <img src="../imgs/airplane_logo.svg" width={30}/>
                <div className="text-black">FBS</div>
            </div>
        </NavElement>
        <NavElement href="flights">Flights</NavElement>
        <NavElement href="login">Login</NavElement>
        <NavElement href="signup">Sign up</NavElement>
        <NavElement href="">
            <span className="text-sm">
            <Button text={"Log Out"} onClick={() => console.log("Logged Out")} secondary></Button>
            </span>
        </NavElement>
    </nav>
  );
};

export default Navbar;
