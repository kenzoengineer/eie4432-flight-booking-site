// array of all flights
export const GET_ALL_FLIGHT_DATA = () => {return "/flights"};

// data about one flight
export const GET_FLIGHT_DATA = (flightId) => {return `/flights/${flightId}`}; 

// create data about flight, should return autoincremented flight id
export const POST_FLIGHT_DATA = () => {return `/flights`};

// update one flight
export const PUT_FLIGHT_DATA = () => {return `/flights`};

// delete one flight
export const DELETE_FLIGHT_DATA = (flightId) => {return `/flights/${flightId}`};



// gets associated seat map data for one flight
// includes stuff like prices and occupancy
export const GET_FLIGHT_SEAT_DATA = (flightId) => {return `/seats/flight/${flightId}`};

// gets seat map data by id
// only has dimensions
export const GET_SEAT_DATA = (seatMapId) => {return `/seats/${seatMapId}`};


// book a seat with given payment info and user info
export const POST_BOOKING = () => {return `/book`};