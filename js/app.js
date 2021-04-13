//API KEY
const key = "08dfb21b5071683b73a7d0ef26d300f6";

// Declaring required Class variables
const Alert = document.querySelector(".alert");
const Loc = document.querySelector(".location");
const Degbtn = document.querySelector(".deg button");
const Icon = document.querySelector(".weatherIcon");
const TempValue = document.querySelector(".tempValue p");
const MainDesc = document.querySelector(".descMain");
const Desc = document.querySelector(".descSub");
const bgElement = document.querySelector(".bgimg");
const mbgElement = document.querySelector(".mbgimg");

const Lon = document.querySelector(".lon");
const Lat = document.querySelector(".lat");
const Rise = document.querySelector(".sunUp");
const Seet = document.querySelector(".sunDown");
const MinT = document.querySelector(".minTemp");
const MaxT = document.querySelector(".maxTemp");
const Press = document.querySelector(".press");
const Humid = document.querySelector(".humid");
const WindSpd = document.querySelector(".windSpd");
const WindDir = document.querySelector(".windDir");

//Brave Error Fix
// ethereum.autoRefreshOnNetworkChange = false;

//Weather Data
const weather = {};

weather.temperature = {
  unit: "celsius",
};
weather.minTemp = {
  unit: "celsius",
};
weather.maxTemp = {
  unit: "celsius",
};

const KELVIN = 273;

//Browser Geolocation Support Check
// window.onload = getLocation();
function getLocation() {
  // if (navigator.geolocation) {
  if ("geolocation" in navigator) {
    // navigator.geolocation.watchPosition(setPosition, showError);
    console.log("Checking Geo");
    navigator.geolocation.getCurrentPosition(setPosition, showError);
  } else {
    console.log("Failed Geo");
    Alert.style.display = "block";
    Alert.innerHTML = `Geolocation is not supported by this browser.  <a href="javascript:void(0)" class="closeAlert" onclick="closeAlert()"
    >&times;
  </a>`;
  }
}

//Set User Location
function setPosition(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  console.log("Getting Geo");
  getWeather(longitude, latitude);
}

// Show Geolocation Error
function showError(error) {
  Alert.style.display = "block";

  switch (error.code) {
    case error.PERMISSION_DENIED:
      Alert.innerHTML = `User denied Geolocation. <a href="javascript:void(0)" class="closeAlert" onclick="closeAlert()"
  >&times;</a>`;
      break;

    case error.POSITION_UNAVAILABLE:
      Alert.innerHTML = `Location info is unavailable. <a href="javascript:void(0)" class="closeAlert" onclick="closeAlert()"
  >&times;</a>`;
      break;

    case error.TIMEOUT:
      Alert.innerHTML = `Request Timed Out <a href="javascript:void(0)" class="closeAlert" onclick="closeAlert()"
  >&times;</a>`;
      break;

    case error.UNKNOWN_ERROR:
      Alert.innerHTML = `An unknown error occurred. <a href="javascript:void(0)" class="closeAlert" onclick="closeAlert()"
  >&times;</a>`;
      break;

    default:
      Alert.innerHTML = `Unable to access Location on this Browser <a href="javascript:void(0)" class="closeAlert" onclick="closeAlert()"
    >&times;</a>`;
  }

  // Alert.innerHTML = `<p class="errNotif"> ${error.message} </p>`;
}

function closeAlert() {
  Alert.style.display = "none";
}

//Fetch Weather from API
function getWeather(longitude, latitude) {
  Alert.style.display = "none";
  let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
  console.log(api);
  fetch(api)
    .then(function (response) {
      let data = response.json();
      return data;
    })
    .then(function (data) {
      weather.temperature.value = Math.floor(data.main.temp - KELVIN);
      weather.iconId = data.weather[0].icon;
      weather.mainDesc = data.weather[0].main;
      weather.description = data.weather[0].description;
      weather.city = data.name;
      weather.country = data.sys.country;

      weather.lon = data.coord.lon;
      weather.lat = data.coord.lat;
      weather.rise = data.sys.sunrise;
      weather.set = data.sys.sunset;
      weather.minTemp.value = Math.floor(data.main.temp_min - KELVIN);
      weather.maxTemp.value = Math.floor(data.main.temp_max - KELVIN);
      weather.press = data.main.pressure;
      weather.humid = data.main.humidity;
      weather.speedW = data.wind.speed;
      weather.dirW = data.wind.deg;
    })
    .then(function () {
      displayWeather();
    });
}

//------------------------------------------------------------------------------------------------------//

//Mannual User Location Search
const searchElement = document.querySelector(".search input");
searchElement.addEventListener("keypress", setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchElement.value);
  }
}

function getResults(query) {
  Alert.style.display = "none";
  let api2 = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${key}`;
  // console.log(api2);
  fetch(api2)
    .then(function (searchinfo) {
      let info = searchinfo.json();
      return info;
    })
    .then(function (info) {
      weather.temperature.value = Math.floor(info.main.temp - KELVIN);
      weather.iconId = info.weather[0].icon;
      weather.mainDesc = info.weather[0].main;
      weather.description = info.weather[0].description;
      weather.city = info.name;
      weather.country = info.sys.country;

      weather.lon = info.coord.lon;
      weather.lat = info.coord.lat;
      weather.rise = info.sys.sunrise;
      weather.set = info.sys.sunset;
      weather.minTemp.value = Math.floor(info.main.temp_min - KELVIN);
      weather.maxTemp.value = Math.floor(info.main.temp_max - KELVIN);
      weather.press = info.main.pressure;
      weather.humid = info.main.humidity;
      weather.speedW = info.wind.speed;
      weather.dirW = info.wind.deg;
    })
    .then(function () {
      displayWeather();
    })
    .catch(function () {
      Alert.style.display = "block";
      Alert.innerHTML = `Enter a Valid City name. <a href="javascript:void(0)" class="closeAlert" onclick="closeAlert()">&times;</a>`;
    });
}

//------------------------------------------------------------------------------------------------------//

//Display Weather
function displayWeather() {
  let RiseUnix = weather.rise;
  let SetUnix = weather.set;

  var d1 = new Date(RiseUnix * 1000);
  var d2 = new Date(SetUnix * 1000);

  var hrsR = d1.getHours();
  var minR = "0" + d1.getMinutes();
  // var secR = "0" + d1.getSeconds();

  var hrsS = d2.getHours();
  var minS = "0" + d2.getMinutes();
  // var secS = "0" + d2.getSeconds();

  if (hrsS > 12) {
    hrsS = hrsS - 12;
  }

  var RiseTime = hrsR + ":" + minR.substr(-2); //+ ":" + secR.substr(-2);
  var SetTime = hrsS + ":" + minS.substr(-2); //+ ":" + secS.substr(-2);

  // console.log(formattedTime);

  Loc.innerHTML = `${weather.city} , ${weather.country}`;
  Icon.innerHTML = `<img src="assets/icons/${weather.iconId}.png"/>`;
  TempValue.innerHTML = `${weather.temperature.value} &deg;C`;
  MainDesc.innerHTML = `${weather.mainDesc}`;
  Desc.innerHTML = `${weather.description}`;
  bgElement.innerHTML = `<img src="assets/${weather.iconId}.jpg"/>`;
  mbgElement.innerHTML = `<img src="assets/mobile/${weather.iconId}.jpg"/>`;

  Lon.innerHTML = `<p> Lon: ${weather.lon}</p>`;
  Lat.innerHTML = `<p> Lat: ${weather.lat}</p>`;
  Rise.innerHTML = `<p> Sun Rise: ${RiseTime} AM</p>`;
  Seet.innerHTML = `<p> Sun Set: ${SetTime} PM</p>`;
  MinT.innerHTML = `<p> Min-Temp: ${weather.minTemp.value} &deg;C</p>`;
  MaxT.innerHTML = `<p> Max-Temp: ${weather.maxTemp.value} &deg;C</p>`;
  Press.innerHTML = `<p> Pressure: ${weather.press} hPa`;
  Humid.innerHTML = `<p> Humidity: ${weather.humid}%</p>`;
  WindSpd.innerHTML = `<p> Wind Speed: ${weather.speedW} m/s</p>`;
  WindDir.innerHTML = `<p> Wind Direction: ${weather.dirW}&deg;</p>`;
}

// Celcius to Fahrenheit Conversion
// C to F Formula
function CtoF(temperature) {
  return (temperature * 9) / 5 + 32;
}

// Conversion
Degbtn.addEventListener("click", function () {
  if (weather.temperature.value === undefined) return;

  if (weather.temperature.unit == "celsius") {
    let fahrenheit = CtoF(weather.temperature.value);
    let fahrenheitMin = CtoF(weather.minTemp.value);
    let fahrenheitMax = CtoF(weather.maxTemp.value);

    fahrenheit = Math.floor(fahrenheit);
    fahrenheitMin = Math.floor(fahrenheitMin);
    fahrenheitMax = Math.floor(fahrenheitMax);

    TempValue.innerHTML = `${fahrenheit} &deg;F`;
    Degbtn.innerHTML = `&deg;F`;

    weather.temperature.unit = "fahrenheit";
    weather.minTemp.unit = "fahrenheit";
    weather.maxTemp.unit = "fahrenheit";

    MinT.innerHTML = `<p> Min-Temp: ${fahrenheitMin} &deg;F</p>`;
    MaxT.innerHTML = `<p> Max-Temp: ${fahrenheitMax} &deg;F</p>`;
  } else {
    TempValue.innerHTML = `${weather.temperature.value} &deg;C`;
    MinT.innerHTML = `<p> Min-Temp: ${weather.minTemp.value} &deg;C</p>`;
    MaxT.innerHTML = `<p> Max-Temp: ${weather.maxTemp.value} &deg;C</p>`;
    Degbtn.innerHTML = `&deg;C`;

    weather.temperature.unit = "celsius";
    weather.minTemp.unit = "celsius";
    weather.maxTemp.unit = "celsius";
  }
});
