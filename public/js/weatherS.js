
//list of all the pictograms for weather
const picsList = [
    "../../assets/images/weatherI/rain.png",
    '../../assets/images/weatherI/sunrain.png',
    '../../assets/images/weatherI/cloudy.png',
    '../../assets/images/weatherI/sun(2).png'
];

// for each row it takes a random image form the list
function randImg() {
    const size = picsList.length;
    document.getElementById('i1').src = picsList[Math.floor(size * Math.random())];
    document.getElementById(`i2`).src = picsList[Math.floor(size * Math.random())];
    document.getElementById('i3').src = picsList[Math.floor(size * Math.random())];
    document.getElementById('i4').src = picsList[Math.floor(size * Math.random())];
}

randImg();

//It takes the row you click on and makes it a different color, for rows that are not selected it keeps it original style
highlight_row();

function highlight_row() {
    const table = document.getElementById('weather');
    const cells = table.getElementsByTagName('td');

    for (let i = 0; i < cells.length; i++) {

        const cell = cells[i];

        cell.onclick = function () {

            const rowId = this.parentNode.rowIndex;

            const rowsNotSelected = table.getElementsByTagName('tr');
            for (let row = 0; row < rowsNotSelected.length; row++) {
                rowsNotSelected[row].style.backgroundColor = "";
                rowsNotSelected[row].style.color = "";

            }
            const rowSelected = table.getElementsByTagName('tr')[rowId];
            rowSelected.style.backgroundColor = "dimgrey";
            rowSelected.style.color = "white";


        }
    }

}

function randomMin() {
    const min = 2;
    const max = 8;
    return Math.floor(Math.random() * (+max - +min)) + +min;
}

function randomMax() {
    const min = 9;
    const max = 21;
    return Math.floor(Math.random() * (+max - +min)) + +min;
}

class weatherData {


    constructor(date, minTemp, maxTemp, wind) {
        this.date = date;
        this.minTemp = minTemp;
        this.maxTemp = maxTemp;
        this.wind = wind;
    }

    createRandom(date, averageTemp) {
        const windList = ['ZO', 'ZW', 'NO', 'NW', 'N', 'Z'];
        this.date = date;

        const maxRandom = averageTemp + 2;
        const minRandom = averageTemp - 2;

        this.minTemp = Math.floor(Math.random() * maxRandom) + minRandom;
        this.maxTemp = Math.floor(Math.random() * maxRandom) + this.minTemp;


        const size = windList.length;
        this.wind = windList[Math.floor(size * Math.random())];
    }
}

function init() {
    // set new dates
    const today = new Date();
    const tomorrow = new Date();
    const nextday = new Date();
    const dayAfter = new Date();


    // create weather for today
    const weather1 = new weatherData(Date.now(), randomMin(), randomMax(), "ZO");
    weather1.createRandom(today,(weather1.minTemp + weather1.maxTemp) / 2 )

    // create weather for tomorrow
    tomorrow.setDate(today.getDate() + 1);
    const weather2 = new weatherData(tomorrow, randomMin(), randomMax(), "ZW");
    weather2.createRandom(tomorrow, (weather2.minTemp + weather2.maxTemp) / 2);

    // create weather for next day
    nextday.setDate(today.getDate() + 2);
    const weather3 = new weatherData(nextday, randomMin(), randomMax(), 'ZO');
    weather3.createRandom(nextday, (weather3.minTemp + weather3.maxTemp) / 2);

    // create weather for day after
    dayAfter.setDate(today.getDate() + 3);
    const weather4 = new weatherData(dayAfter, randomMin(), randomMax(), 'NO');
    weather4.createRandom(dayAfter, Math.floor((weather4.minTemp + weather4.maxTemp) / 2));

    let dates = [weather1, weather2, weather3, weather4];

    // loop through the dates to display weather in the table in my html file
    for (let i = 0; i < dates.length; i++) {
        document.getElementById('day' + (i + 1)).innerHTML = dates[i].date.toDateString();
        document.getElementById('n' + (i + 5)).innerHTML = dates[i].maxTemp + '&deg';
        document.getElementById('n' + (i + 1)).innerHTML = dates[i].minTemp + '&deg';
        document.getElementById('w' + (i + 1)).innerHTML = dates[i].wind;


    }
}

init();

