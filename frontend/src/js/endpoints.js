// Ken Jiang - 23012932X | Anson Yuen - 23012962X
//const DOMAIN = "https://eie4432-flight-booking-site.onrender.com";

const DOMAIN = "http://127.0.0.1:8080"

const queryParams = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const authkey = urlParams.get("authkey");
    if (authkey) {
        return `?authkey=${authkey}`;
    }
    return "";
}

export const BASE = () => {return `${DOMAIN}${queryParams()}`};

// attempt to login
export const POST_LOGIN = () => {return `${DOMAIN}/users/login${queryParams()}`};

// create account
export const POST_REGISTER = () => {return `${DOMAIN}/users/register${queryParams()}`};

// forgot my password
export const POST_FORGOT = () => {return `${DOMAIN}/users/forgot${queryParams()}`};

// array of all flights
export const GET_ALL_FLIGHT_DATA = () => {return `${DOMAIN}/flights${queryParams()}`};

// data about one flight
export const GET_FLIGHT_DATA = (flightId) => {return `${DOMAIN}/flights/${flightId}${queryParams()}`}; 

// create data about flight, should return autoincremented flight id
export const POST_FLIGHT_DATA = () => {return `${DOMAIN}/flights${queryParams()}`};

// update one flight
export const PATCH_FLIGHT_DATA = (flightId) => {return `${DOMAIN}/flights/${flightId}${queryParams()}`};

// delete one flight
export const DELETE_FLIGHT_DATA = (flightId) => {return `${DOMAIN}/flights/${flightId}${queryParams()}`};



// gets associated seat map data for one flight
// includes stuff like prices and occupancy
export const GET_FLIGHT_SEAT_DATA = (flightId) => {return `${DOMAIN}/seats/flight/${flightId}${queryParams()}`};

// gets seat map data by id
// only has dimensions
export const GET_SEAT_DATA = (seatMapId) => {return `${DOMAIN}/seats/${seatMapId}${queryParams()}`};

// update first class
export const PATCH_SEAT_FIRST_CLASS = () => {return`${DOMAIN}/seats${queryParams()}`};



// book a seat with given payment info and user info
export const POST_BOOKING = () => {return `${DOMAIN}/book${queryParams()}`};



// get all profile information about a user
export const GET_USER = (userId) => {return `${DOMAIN}/users/${userId}${queryParams()}`};

// updates user profile information
export const PATCH_USER = (userId) => {return `${DOMAIN}/users/${userId}${queryParams()}`};

// get all flights a user has paid for
// returns same as GET_ALL_FLIGHT_DATA except we remove `id` and add `seat`
export const GET_TRANSACTIONS = (userId) => {return `${DOMAIN}/transactions/${userId}${queryParams()}`};

// create a new transaction
export const POST_TRANSACTION = () => {return `${DOMAIN}/transactions${queryParams()}`};

// get all logs for admin
export const GET_LOGS = () => {return `${DOMAIN}/logs${queryParams()}`};