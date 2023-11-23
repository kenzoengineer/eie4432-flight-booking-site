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

const router = createBrowserRouter([{
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage/>,
    children: [
        {
            path: "/login",
            element: <Login/>,
        },{
            path: "/signup",
            element: <Signup/>,
        },{
            path: "/flights",
            element: <Flights/>,
        },{
            path: "/payment/:flightid/:seatidx",
            element: <Payment/>,
        },{
            path: "/booking/:id",
            element: <Booking/>,
        },{
            path: "/admin",
            element: <Admin/>,
        },{
            path: "/eventmanagement",
            element: <EventManagement/>,
        },{
            path: "/account",
            element: <Account/>,
        },
    ],
},]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
