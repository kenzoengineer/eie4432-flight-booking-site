// Ken Jiang - 23012932X | Anson Yuen - 23012962X
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useEffect } from "react";
import { BASE } from "./js/endpoints";

const CONTENT_ONLY = new Set(["/login", "/signup", "/forgot"]);

function App() {
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const authkey = urlParams.get("authkey");
        if (authkey) {
            fetch(`${BASE()}?authkey=${authkey}`);
        }
    }, []);
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
