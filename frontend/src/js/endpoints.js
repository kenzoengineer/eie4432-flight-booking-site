const DOMAIN = "http://127.0.0.1:8080";

export const POST_LOGIN = () => {return `${DOMAIN}/users/login`};

export const POST_REGISTER = () => {return `${DOMAIN}/users/register`};



// array of all flights
export const GET_ALL_FLIGHT_DATA = () => {return `${DOMAIN}/flights`};

// data about one flight
export const GET_FLIGHT_DATA = (flightId) => {return `${DOMAIN}/flights/${flightId}`}; 

// create data about flight, should return autoincremented flight id
export const POST_FLIGHT_DATA = () => {return `${DOMAIN}/flights`};

// update one flight
export const PATCH_FLIGHT_DATA = (flightId) => {return `${DOMAIN}/flights/${flightId}`};

// delete one flight
export const DELETE_FLIGHT_DATA = (flightId) => {return `${DOMAIN}/flights/${flightId}`};



// gets associated seat map data for one flight
// includes stuff like prices and occupancy
export const GET_FLIGHT_SEAT_DATA = (flightId) => {return `${DOMAIN}/seats/flight/${flightId}`};

// gets seat map data by id
// only has dimensions
export const GET_SEAT_DATA = (seatMapId) => {return `${DOMAIN}/seats/${seatMapId}`};

// update first class
export const PATCH_SEAT_FIRST_CLASS = () => {return`${DOMAIN}/seats`};



// book a seat with given payment info and user info
export const POST_BOOKING = () => {return `${DOMAIN}/book`};



// get all profile information about a user
export const GET_USER = (userId) => {return `${DOMAIN}/users/${userId}`};

// updates user profile information
export const PATCH_USER = (userId) => {return `${DOMAIN}/users/${userId}`};

// get all flights a user has paid for
// returns same as GET_ALL_FLIGHT_DATA except we remove `id` and add `seat`
export const GET_TRANSACTIONS = (userId) => {return `${DOMAIN}/transactions/${userId}`};

export const POST_TRANSACTION = () => {return `${DOMAIN}/transactions`};

export const GET_LOGS = () => {return `${DOMAIN}/logs`};