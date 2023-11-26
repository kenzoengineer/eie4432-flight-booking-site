import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const NO_FOOTER = new Set(["/login", "/signup"]);

function App() {
  return (
    <div className="App flex flex-col">
        {
            !NO_FOOTER.has(useLocation().pathname) && 
            <Navbar/>
        }
        <span id="outlet-content">
            <Outlet/>
        </span>
        {
            !NO_FOOTER.has(useLocation().pathname) && 
            <Footer/>
        }
    </div>
  );
}

export default App;
