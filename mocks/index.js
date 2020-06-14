const getRandomNumber = (length) => {
    var result = "";
    var characters = "0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return result;
};

const airlineCode = {
    Indigo: "IN",
    "Spice Jet": "SP",
    "Air India": "AI",
    "Air Asia": "AA",
};

const getRandonAirline = () => {
    const airlines = ["Indigo", "Spice Jet", "Air India", "Air Asia"];
    return airlines[Math.floor(Math.random() * airlines.length)];
};

const getRandomTime = () => {
    const hours = Math.floor(Math.random() * 12);
    const minutes = Math.floor(Math.random() * 60);
    const AmPm = ["AM", "PM"];
    const amOrPm = AmPm[Math.floor(Math.random() * 2)];
    return `${hours}:${minutes < 10 ? "0" + minutes : minutes} ${amOrPm}`;
};

const parseTime = (t) => {
    var d = new Date();
    var time = t.match(/(\d+)(?::(\d\d))?\s*(p?)/);
    d.setHours(parseInt(time[1]) + (time[3] ? 12 : 0));
    d.setMinutes(parseInt(time[2]) || 0);
    return d;
};

const addTime = (date, hours, min) => {
    let dt = new Date(date);
    dt.setHours(dt.getHours() + hours);
    dt.setMinutes(dt.getMinutes() + min);
    return dt;
};

const formatAMPM = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
};

const generateRandomFlights = (from, to) => {
    const numberOfFlights = Math.floor(Math.random() * 50);
    const flights = [];
    for (let i = 0; i < numberOfFlights; i++) {
        const airlineName = getRandonAirline();
        const randomdepartTime = getRandomTime();
        const date = parseTime(randomdepartTime);
        const hours = Math.floor(Math.random() * 6);
        const minutes = Math.floor(Math.random() * 60);
        const arrivalTime = formatAMPM(addTime(date, hours, minutes));
        const flightNumber = airlineCode[airlineName] + getRandomNumber(3);
        flights.push({
            from,
            to,
            flightNumber: flightNumber,
            airlineName: airlineName,
            duration: `${hours}h ${minutes}m`,
            departureTime: randomdepartTime,
            arrivalTime: arrivalTime,
            price: 1000 + Math.floor(Math.random() * 10000),
            stops: Math.floor(Math.random() * 3),
        });
    }

    return flights;
};

module.exports = () => {
    let locations = ["New Delhi", "Mumbai", "Bangalore", "Hyderabad", "Pune"];

    let generateFlights = () => {
        let flights = [];
        for (let i = 0; i < locations.length; i++) {
            for (let j = 0; j < locations.length; j++) {
                if (i !== j) {
                    flights = flights.concat(
                        generateRandomFlights(locations[i], locations[j])
                    );
                }
            }
        }

        return flights;
    };
    const flights = generateFlights();
    return {
        locations: locations,
        flights: flights,
    };
};
