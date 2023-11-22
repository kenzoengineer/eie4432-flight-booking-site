export const GenerateFakeFlightData = (count) => {
    let flightData = [];
    const DESTINATIONS = ["YYZ","NRT","ICN","PEK","HND","YUL","YVR","YYC","SFO","ORD"];
    // crude way to create more data
    for (let i = 0; i < count; i++) {
        flightData.push({
            dest: DESTINATIONS[Math.floor(Math.random() * DESTINATIONS.length)],
            date: new Date(
                Date.UTC(
                    2024,
                    Math.floor(Math.random() * 12)+1,
                    Math.floor(Math.random() * 30)+1,
                    Math.floor(Math.random() * 24),
                    Math.floor(Math.random() * 60)
                )
            ),
            duration: Math.floor(Math.random() * 500) + 60,
            stops: "Nonstop",
            price: Math.floor(Math.random() * 10000) + 3000,
            id: i
        });
    }
    return flightData;
}