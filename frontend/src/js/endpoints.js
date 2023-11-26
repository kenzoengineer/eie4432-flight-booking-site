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
export const PUT_FLIGHT_DATA = () => {return `${DOMAIN}/flights`};

// delete one flight
export const DELETE_FLIGHT_DATA = (flightId) => {return `${DOMAIN}/flights/${flightId}`};



// gets associated seat map data for one flight
// includes stuff like prices and occupancy
export const GET_FLIGHT_SEAT_DATA = (flightId) => {return `${DOMAIN}/seats/flight/${flightId}`};

// gets seat map data by id
// only has dimensions
export const GET_SEAT_DATA = (seatMapId) => {return `${DOMAIN}/seats/${seatMapId}`};



// book a seat with given payment info and user info
export const POST_BOOKING = () => {return `${DOMAIN}/book`};



// get all profile information about a user
export const GET_USER = (userId) => {return `${DOMAIN}/users/${userId}`};

// updates user profile information
export const PUT_USER = (userId) => {return `${DOMAIN}/users/${userId}`};

// returns whether or not the currently logged in user is an admin
export const GET_ADMIN = (userId) => {return `${DOMAIN}/users/admin/${userId}`};


// get all flights a user has paid for
// returns same as GET_ALL_FLIGHT_DATA except we remove `id` and add `seat`
export const GET_TRANSACTIONS = (userId) => {return `${DOMAIN}/transactions/${userId}`};