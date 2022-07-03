// // call any JSON object, fill at path the rul
async function callJSON(path) {
    let response = await fetch(path, {headers:{'Content-Type': 'application/json', 'Accept': 'application/json'}});
    return response.json();
}


// Call weather object through api
// Access key for weather api: 93b9b24478b1511d0310051e6ff28bd5 max 1000 calls a month, please use static weather for testing.
// link for fetch = http://api.weatherstack.com/current?access_key=93b9b24478b1511d0310051e6ff28bd5&query=dublin

async function callWeather() {

    let response = await fetch("http://api.weatherstack.com/current?access_key=93b9b24478b1511d0310051e6ff28bd5&query=dublin")

    const locationWeather = await response.json();

    return locationWeather;

}

async function showWeather(){

    // weatherOBJ is the json, can be manipulated from here on
    let weatherOBJ = await callWeather();

    document.getElementById('city').innerHTML = weatherOBJ.location.name
    document.getElementById('region').innerHTML = weatherOBJ.location.region
    document.getElementById('country').innerHTML = weatherOBJ.location.country
    document.getElementById('temperature').innerHTML = weatherOBJ.current.temperature + " " + "°C"
    document.getElementById('weather_icon').innerHTML = '<img src="'+weatherOBJ.current.weather_icons+'"' +
        ' alt="image not found">'

}

function showTimeDate(){

    let timeDate = setTimeDate(2, "nl-nl")

    document.getElementById('time').innerHTML = timeDate[0]
    document.getElementById('date').innerHTML = timeDate[1]
}


// Call time, give the UTC for destination & language for rendering

function setTimeDate(UTCOffset, language) {  // example 2 and 'nl-nl' for language in Dutch
    let timeDate;
    let date = new Date();
    // Set time
    let hours = date.getUTCHours()+ UTCOffset;
    let minutes = (date.getUTCMinutes()<10?'0':'')+ date.getUTCMinutes();
    let currentTime = hours + ":" + minutes;
    // Set date
    let day = date.getUTCDate();
    let month = date.toLocaleString(language, {month: 'long'});
    let year = date.getFullYear();
    let fullDate = day + " " + month + " " + year;
    timeDate = [currentTime, fullDate];
    return timeDate;  // index 0 is time, 1 date
}


///// Destination
// Random number, to be used for output gateNumber
function randomiseOutput(range) {
    return Math.floor(Math.random()* range) + 1;  // never to be set to zero
}


//Global variable and array to be called
let arrayDestination = [];
let destinationsTulipAir = ["Amsterdam", "Dublin", "Antwerpen", "paris", "London"];

// Calling destination info, only once then update arrayDestination
async function setDestination(city) {
    let destinationJSON = await callJSON('destination.json')
    let destinationArray = await JSON.parse(JSON.stringify(destinationJSON));
    let i = destinationsTulipAir.indexOf(city);

    let date = new Date();
    let month = date.getMonth() - 1;

    let cityName = destinationArray[i].city;
    let iataNumber = destinationArray[i].iata;
    let gateNum = destinationArray[i].destinationInfo[0].gateNumber;
    let averageTemp = destinationArray[i].destinationInfo[3].temperature[month];  // Calls average temperature

    let gate = randomiseOutput(gateNum);
    arrayDestination = [cityName, iataNumber, gate, averageTemp];
    setTemperature();
    return arrayDestination;
}

// Setting destination info into html by info in arrayDestination and id
function setHtml() {
    const ID_ARRAY = ['#R1', '#R2', '#R3', 3, '#R5', '#R6'];  //Id's to render info into HTML


    // The arrayDestination is called by for loop below to set data in HTML
    for (let i = 0; i < ID_ARRAY.length; i++) {
        if (i === 3){ continue;
        }
        document.querySelector(ID_ARRAY[i]).innerHTML = arrayDestination[i];
    }

}

// Set the time in HTML
function setTimeHTML() {  // '#R4', 2, 'nl-nl'
    let setHTML = document.querySelector('#R4');
    setHTML.innerHTML = setTimeDate(2,'nl-nl')[0];
}

setInterval(setTimeHTML, 1000);  // Sets the time at an interval
setInterval(showTimeDate, 1000);  // Sets the time at an interval
setTimeout(setDestination('Dublin'), 1000);  // Sets the destination to Dublin
setInterval(setHtml, 5000);  // Renders the destination info into the id tags in HTML
setTimeout(showWeather, 5000);  // Renders the destination info into the id tags in HTML
restTimeFlight(30);


// Picks random min and max temp weather based on an averageTemp
function setTemperature() {
    let temp1, temp2;
    let averageTemp = arrayDestination[3];
    let x = averageTemp * 2;
    temp1 = randomiseOutput(x);
    temp2 = x - temp1;

    if (temp1 === temp2) {
        setTemperature();
    } else if (temp1 > temp2) {  // Checks which variable has received the min and max and sets them
        maxTemp = temp1;
        minTemp = temp2;
    } else {
        maxTemp = temp2;
        minTemp = temp1;
    }
    arrayDestination.push(minTemp);
    arrayDestination.push(maxTemp);
}

function restTimeFlight(min) {

    setInterval(reRunInterval, 16*5000);

    function reRunInterval() {
        clearInterval(interval);
        restTimeFlight(15);
    }

    let interval = setInterval(function () {
        let t1 = document.getElementById('t1');
        let t2 = document.getElementById('t2');
        let t3 = document.getElementById('t3');

        let currentTime = new Date (),
            arrivalTime = new Date ( currentTime );
        arrivalTime.setMinutes ( currentTime.getMinutes() + min );

        t1.innerHTML = 'Current Time: ' + currentTime.toLocaleTimeString();
        t2.innerHTML = 'Remaining FlightDuration: ' + min;
        t3.innerHTML = 'Expected time of arrival: ' + arrivalTime.toLocaleTimeString();
        min--;
    }, 5000);
}
