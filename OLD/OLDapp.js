//API KEY
const key = "08dfb21b5071683b73a7d0ef26d300f6";

// Declaring required Class variables
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temp-value p");
const degreeElement = document.querySelector(".temp-value button");
const descElement = document.querySelector(".temp-description p");
const locationElement  = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");
const bgElement = document.querySelector(".bgimg");
const mbgElement = document.querySelector(".mbgimg");


//Weather Data
const weather = {};

weather.temperature = {
    unit : "celsius"
}

const KELVIN = 273;


//Browser Geolocation Support Check
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition,showError);
}
else{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Your Browser Does not Support Geolocation</p>";
}

//Set User Location
function setPosition(position){
    let longitude = position.coords.longitude;
    let latitude  = position.coords.latitude;

    getWeather(longitude, latitude);
}

//Show Geolocation Error
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p class="errNotif"> ${error.message} </p>`;
}

//Fetch Weather from API
function getWeather(longitude, latitude){
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    console.log(api);
    fetch(api)
    .then(function(response){
        let data = response.json();
        return data;
    })
    .then(function(data){
        weather.temperature.value = Math.floor(data.main.temp - KELVIN);
        weather.iconId = data.weather[0].icon;
        weather.description = data.weather[0].description;
        weather.city = data.name;
        weather.country = data.sys.country;
    })
    .then(function(){
        displayWeather();
    });
}


//------------------------------------------------------------------------------------------------------//

//Mannual User Location Search
const searchElement = document.querySelector(".search-location input");
searchElement.addEventListener('keypress', setQuery);

function setQuery(evt){
    if(evt.keyCode == 13){
        getResults(searchElement.value);
    }
}

function getResults (query){
    let api2 = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${key}`;
    console.log(api2);
    fetch (api2)
    .then(function(searchinfo){
        let info = searchinfo.json();
        return info;
    })
    .then(function(info){
        weather.temperature.value = Math.floor(info.main.temp - KELVIN);
        weather.iconId = info.weather[0].icon;
        weather.description = info.weather[0].description;
        weather.city = info.name;
        weather.country = info.sys.country;
    })
    .then(function(){
        displayWeather();
    });
}

//------------------------------------------------------------------------------------------------------//


//Display Weather
function displayWeather(){
    iconElement.innerHTML = `<img src="assets/icons/${weather.iconId}.png"/>`;
    descElement.innerHTML = `${weather.description}`;
    tempElement.innerHTML = `${weather.temperature.value} &deg;<span>C<span>`;
    locationElement.innerHTML = `${weather.city} , ${weather.country}`;
    bgElement.innerHTML = `<img src="assets/${weather.iconId}.jpg"/>`;
    mbgElement.innerHTML = `<img src="assets/mobile/${weather.iconId}.jpg"/>`;
}


// Celcius to Fahrenheit Conversion
// C to F Formula
function CtoF(temperature){
    return (temperature * 9/5) + 32;
}

// Conversion
degreeElement.addEventListener("click", function(){
    if(weather.temperature.value === undefined)
    return;

    if(weather.temperature.unit == "celsius"){
        let fahrenheit = CtoF(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        tempElement.innerHTML = `${fahrenheit}&deg;<span>F<span>`;
        degreeElement.innerHTML = `&deg;<span>F<span>`;
        weather.temperature.unit = "fahrenheit";
    }
    else{
        tempElement.innerHTML = `${weather.temperature.value}&deg;<span>C<span>`;
        degreeElement.innerHTML = `&deg;<span>C<span>`;
        weather.temperature.unit = "celsius"
    }
})

