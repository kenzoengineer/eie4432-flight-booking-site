// Ken Jiang - 23012932X | Anson Yuen - 23012962X
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const CONTENT_ONLY = new Set(["/login", "/signup", "/forgot"]);

function App() {
    return (
        <div className="App flex flex-col">
            {!CONTENT_ONLY.has(useLocation().pathname) && <Navbar />}
            <span id="outlet-content">
                <Outlet />
            </span>
            {!CONTENT_ONLY.has(useLocation().pathname) && <Footer />}
        </div>
    );
}

export default App;
