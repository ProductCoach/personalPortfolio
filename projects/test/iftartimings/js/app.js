const TodayDateEnglish = document.querySelector("#todaydateEng");
const previousDateEnglish = document.querySelector("#previousdateEng");
const nextDateEnglish = document.querySelector("#nextdateEng");

const TodayDateRamadan = document.querySelector("#todaydateRamadan");
const PreviousDateRamadan = TodayDateRamadan-1;
const NextDateRamadan = TodayDateRamadan+1;

const TodaySuhoorTime = document.querySelector("#suhoortime");
const previousSuhoorTime = document.querySelector("#suhoortimeprevious");
const nextSuhoorTime = document.querySelector("#suhoortimenext");

const TodayIftarTime = document.querySelector("#iftartime");
const previousIftarTime = document.querySelector("#iftartimeprevious");
const nextIftarTime = document.querySelector("#iftartimenext");

const nextdayselect = document.querySelector(".nextdayselect");
const previousdayselect = document.querySelector(".previousdayselect");

const locationselected = document.querySelector(".subheading")

var cityselected = "Hyderabad" //default city is Hyderabad
var countryselected = "India"
var select = document.getElementById('ddm');

const all_cities = ["Hyderabad", "Bangalore", "Chennai", "Southampton", "Guntur", "Kolkata", "Coimbatore"];

var city_auto = "";
var country_auto = "";

const successfulLookup = async (position) => {
    const { latitude, longitude } = position.coords;
    var result = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=b014fe37100549f9b34e446086fcbce5`)
    .then(response => response.json());

    city_auto = result.results[0].components.city;
    country_auto = result.results[0].components.country;
    console.log(result.results[0].components);
    
    try {
        if (city_auto.includes("Trichy")){
            cityselected = "Trichy";
            countryselected = country_auto;
        } else if (all_cities.includes(city_auto)) {
            cityselected = city_auto;
            countryselected = country_auto;
            console.log(cityselected, RozaNumber);
        } else {
            window.alert(`Sorry, your city ${city_auto} is not available yet. We're working on adding more cities. For now, you can check timings for other cities.`);
        }
        locationselected.textContent = cityselected + ", " + countryselected;
        testMultiCity(RozaNumber, cityselected);
    } catch {
        locationselected.textContent = cityselected + ", " + countryselected;
        testMultiCity(RozaNumber, cityselected);
    }

}

if (window.navigator.geolocation) {
    // Geolocation available
    navigator.geolocation.getCurrentPosition(successfulLookup, console.log("ERROR"));
}

// On changing city from dropdown
select.onchange = function() {
    var input = select.value;
    console.log(input)
    if (input == "Southampton") {
        locationselected.textContent = input + ", UK";
        cityselected = input;
    } else {
        locationselected.textContent = input + ", India";
        cityselected = input;
    }

    testMultiCity(RozaNumber, cityselected);
}

// Initialize date
function setInitialValues() {
    var today = new Date();
    var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    var dd = parseInt(String(today.getDate()).padStart(2, '0'));
    var mm = parseInt(String(today.getMonth() + 1).padStart(2, '0'));
    var yyyy = today.getFullYear();

    RozaNumber = parseInt(TodayDateRamadan.textContent)

    if (yyyy = '2021' && mm <= 4 && dd < 14) 
    {
        RozaNumber = 1;
        updateValues(RozaNumber);
        return RozaNumber
    } else if (yyyy = '2021' && mm >= 5 && dd >= 14) {
        RozaNumber = 30;
        updateValues(RozaNumber);
        return RozaNumber
    } else if (mm == 4) {
        RozaNumber = dd - 13;
        updateValues(RozaNumber);
        return RozaNumber
    } else {
        RozaNumber = dd + 17;
        updateValues(RozaNumber);
        return RozaNumber
    }
}

RozaNumber = setInitialValues()
var RozaNum = 0;

// Set cities
function testMultiCity(RozaNumber, cityselected) {
    switch(cityselected) {
        case "Hyderabad":
            RozaNum = RozaNumber;
            updateValues(RozaNum)
            break;
        case "Bangalore":
            RozaNum = RozaNumber + 30;
            updateValues(RozaNum)
            break;
        case "Chennai":
            RozaNum = RozaNumber + 60;
            updateValues(RozaNum)
            break;
        case "Coimbatore":
            RozaNum = RozaNumber + 90;
            updateValues(RozaNum)
            break;
        case "Guntur":
            RozaNum = RozaNumber + 120;
            updateValues(RozaNum)
            break;
        case "Kolkata":
            RozaNum = RozaNumber + 150;
            updateValues(RozaNum)
            break;
        case "Trichy":
            RozaNum = RozaNumber + 180;
            updateValues(RozaNum)
            break;
        case "Southampton":
            RozaNum = RozaNumber + 211;
            updateValues(RozaNum)
            break;
    }
}


function updateValues(RozaNumber) {
    
    if (RozaNumber % 30 == 0) {
        TodayDateRamadan.textContent = 30;
    } else {
        TodayDateRamadan.textContent = (RozaNumber % 30);
    }

    if (RozaNumber % 30 == 1) {
            // Main Card Update
        TodayDateEnglish.textContent = ramadan21timings[RozaNumber-1].Date; 
        TodaySuhoorTime.textContent = ramadan21timings[RozaNumber-1].Sehri;
        TodayIftarTime.textContent = ramadan21timings[RozaNumber-1].Iftar;

        // Previous Day Timings Update
        previousDateEnglish.textContent = ramadan21timings[RozaNumber-1].Date; 
        previousSuhoorTime.textContent = ramadan21timings[RozaNumber-1].Sehri;
        previousIftarTime.textContent = ramadan21timings[RozaNumber-1].Iftar;

        // Next Day Timings Update
        nextDateEnglish.textContent = ramadan21timings[RozaNumber].Date; 
        nextSuhoorTime.textContent = ramadan21timings[RozaNumber].Sehri;
        nextIftarTime.textContent = ramadan21timings[RozaNumber].Iftar;

        //disable Previous Day button
        previousdayselect.classList.add('disabled')
        previousdayselect.classList.add('disablebutton')

    }
    else if (RozaNumber % 30 == 0) {
        // Main Card Update
        TodayDateEnglish.textContent = ramadan21timings[RozaNumber-1].Date; 
        TodaySuhoorTime.textContent = ramadan21timings[RozaNumber-1].Sehri;
        TodayIftarTime.textContent = ramadan21timings[RozaNumber-1].Iftar;

        // Previous Day Timings Update
        previousDateEnglish.textContent = ramadan21timings[RozaNumber-2].Date; 
        previousSuhoorTime.textContent = ramadan21timings[RozaNumber-2].Sehri;
        previousIftarTime.textContent = ramadan21timings[RozaNumber-2].Iftar;

        // Next Day Timings Update
        nextDateEnglish.textContent = ramadan21timings[RozaNumber-1].Date; 
        nextSuhoorTime.textContent = ramadan21timings[RozaNumber-1].Sehri;
        nextIftarTime.textContent = ramadan21timings[RozaNumber-1].Iftar;

        //disable Previous Day button
        nextdayselect.classList.add('disabled')
        nextdayselect.classList.add('disablebutton')

    } else {

        nextdayselect.classList.remove('disabled')
        nextdayselect.classList.remove('disablebutton')
        previousdayselect.classList.remove('disabled')
        previousdayselect.classList.remove('disablebutton')

        TodayDateEnglish.textContent = ramadan21timings[RozaNumber-1].Date; 
        TodaySuhoorTime.textContent = ramadan21timings[RozaNumber-1].Sehri;
        TodayIftarTime.textContent = ramadan21timings[RozaNumber-1].Iftar;
    
        previousDateEnglish.textContent = ramadan21timings[RozaNumber-2].Date; 
        previousSuhoorTime.textContent = ramadan21timings[RozaNumber-2].Sehri;
        previousIftarTime.textContent = ramadan21timings[RozaNumber-2].Iftar;
    
        nextDateEnglish.textContent = ramadan21timings[RozaNumber].Date; 
        nextSuhoorTime.textContent = ramadan21timings[RozaNumber].Sehri;
        nextIftarTime.textContent = ramadan21timings[RozaNumber].Iftar;

    }
}

nextdayselect.addEventListener('click', function() {
    if (RozaNumber < 30) {
        RozaNumber += 1;
        testMultiCity(RozaNumber, cityselected)
    }
})

previousdayselect.addEventListener('click', function() {
    if (RozaNumber > 1) {
        RozaNumber = RozaNumber - 1;
        TodayDateRamadan.textContent = RozaNumber;
        testMultiCity(RozaNumber, cityselected)
    }
})
