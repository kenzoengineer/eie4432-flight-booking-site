import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./components/Error-page";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Flights from "./routes/Flights";
import Payment from "./routes/Payment";
import Booking from "./routes/Booking";
import Admin from "./routes/Admin";
import EventManagement from "./routes/EventManagement";
import Account from "./routes/Account";
import SeatManagement from "./routes/SeatManagement";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: (<ProtectedRoute>
                <Flights />
                </ProtectedRoute>)
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
            {
                path: "/flights",
                element: (
                    <ProtectedRoute>
                        <Flights />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/payment/:flightid/:seatidx",
                element: (
                    <ProtectedRoute>
                        <Payment />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/booking/:id",
                element: (
                    <ProtectedRoute>
                        <Booking />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/admin",
                element: (
                    <ProtectedRoute admin>
                        <Admin />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/eventmanagement",
                element: (
                    <ProtectedRoute admin>
                        <EventManagement />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/account",
                element: (
                    <ProtectedRoute>
                        <Account />
                    </ProtectedRoute>
                ),
            },
            {
                path: "/seatmanagement",
                element: (
                    <ProtectedRoute admin>
                        <SeatManagement />
                    </ProtectedRoute>
                ),
            },
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
