export const GenerateFakeFlightData = (count) => {
    let flightData = [];
    const DESTINATIONS = [
        "YYZ",
        "NRT",
        "ICN",
        "PEK",
        "HND",
        "YUL",
        "YVR",
        "YYC",
        "SFO",
        "ORD",
    ];
    const STOPS = ["Nonstop", "One", "Two+"];
    // crude way to create more data
    for (let i = 0; i < count; i++) {
        const R = Math.random();
        flightData.push({
            id: i,
            dest: DESTINATIONS[Math.floor(R * DESTINATIONS.length)],
            date: new Date(
                Date.UTC(
                    2024,
                    Math.floor(R * 12) + 1,
                    Math.floor(R * 30) + 1,
                    Math.floor(R * 24),
                    Math.floor(R * 60)
                )
            ),
            duration: Math.floor(R * 500) + 60,
            stops: STOPS[Math.floor(R * STOPS.length)],
            price: Math.floor(R * 10000) + 3000,
            first_class_price: Math.floor(R * 10000) + 9000,
            rows: Math.floor(Math.random() * 10) + 10,
            sections: Math.floor(Math.random() * 2) + 1,
            columns_per_section: Math.floor(Math.random() * 2) + 2,
        });
    }
    return flightData;
};

export const GenerateFakeSeats = (flightData) => {
    const seats = [];
    for (let i = 0; i < flightData.columns_per_section * flightData.sections * flightData.rows; i++) {
        seats.push({
            occupied: Math.floor(Math.random() * 5) < 2,
            price: Math.floor(Math.random() * 100) + 1000,
            firstClass: Math.floor(Math.random() * 4) === 0
        });
    }
    return seats;
}

export const GenerateFakeTransactionInformation = (count) => {
    let data = GenerateFakeFlightData(count);
    data.forEach(x => {
        x.seat = `${String.fromCharCode(Math.floor(Math.random() * 26) + 65)}${Math.floor(Math.random() * 50) + 1}`
    });
    return data;
}

export const LogInUser = () => {
    localStorage.setItem(
        "user",
        JSON.stringify({
            id: Math.floor(Math.random() * 5) + 1,
            keepLoggedIn: true,
        })
    );
};

export const LogInAdmin = () => {
    localStorage.setItem(
        "user",
        JSON.stringify({
            id: 0,
            keepLoggedIn: true,
        })
    );
};

export const LogOutUser = () => {
    localStorage.removeItem("user");
};

export const GenerateFakeUser = async (id) => {
    const USERNAMES = ["KenzoEngineer", "Ayuen22", "MyUsername", "HelloThere", "JavaScript!"];
    const R = Math.random();
    return {
        id: id,
        username: USERNAMES[Math.floor(R * USERNAMES.length)],
        email: `${USERNAMES[Math.floor(R * USERNAMES.length)]}@gmail.com`,
        password: "password",
        gender: "Male",
        birthday: new Date(
            Date.UTC(
                2002,
                Math.floor(Math.random() * 12) + 1,
                Math.floor(Math.random() * 30) + 1,
                Math.floor(Math.random() * 24),
                Math.floor(Math.random() * 60)
            )
        ),
        photo: "https://cataas.com/cat",
    };
};
