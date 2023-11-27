// Ken Jiang - 23012932X | Anson Yuen - 23012962X

// date format options
export const DATE_OPTIONS = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
};

// time format options
export const TIME_OPTIONS = {
    timeZone: "UTC",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
};

/**
 * Gets the currently logged in user from web storage
 * @returns a user object {userId: string, messages: string[], isAdmin: boolean}, or null if not logged in
 */
export const getLoggedInUser = () => {
    const localUser = localStorage.getItem("user");
    if (localUser) return JSON.parse(localUser);
    
    const sessionUser = sessionStorage.getItem("user");
    if (sessionUser) return JSON.parse(sessionUser);

    return null;
}

/**
 * Determines whether or not the currently logged in user is admin
 * @returns false if they are not logged in or they are not an admin, true otherwise
 */
export const isAdmin = () => {
    const loggedInUser = getLoggedInUser();
    if (!loggedInUser)
        return false;
    return loggedInUser.isAdmin;
}

/**
 * Generates an ending time given the start date and duration
 * @param {*} date A javascript date object representing the start time 
 * @param {*} duration An integer number of minutes to add to the start time 
 * @returns A time string sum of the date and duration
 */
export const generateTimeString = (date, duration) => {
    const endTime = new Date(date.getTime() + duration * 60000);
    return endTime.toLocaleTimeString("cn-HK", {
        ...TIME_OPTIONS,
        timeZoneName: "short",
    });
};

/**
 * Generates a seat label e.g. E3
 * @param {*} cols The number of columns in the plane
 * @param {*} idx The 0-indexed seat index
 * @returns A string label
 */
export const seatLabelFromIndex = (cols, idx) => {
    return `${String.fromCharCode(65 + idx % cols)}${Math.floor(idx / cols) + 1}`
}