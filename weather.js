const weatherContainer = document.querySelector(".js-weather");
const weatherDisplay = weatherContainer.querySelector("h4");

const API_KEY = "78cf455dd2b78727cc889cf20cc7eb72";
const COORDS = "coords";

function getWeather(lat, lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then(function (reponse) {
      return reponse.json();
    })
    .then(function (json) {
      const temperature = json.main.temp;
      const place = json.name;
      console.log(json);
      weatherDisplay.innerText = `${temperature}℃ @ ${place}`;
    });
}

function saveCoord(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeo(geo) {
  const latitude = geo.coords.latitude;
  const longitude = geo.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoord(coordsObj);
  getWeather(latitude, longitude);
}

function geoError() {
  console.log("error");
}

function getGeoLocal() {
  navigator.geolocation.getCurrentPosition(handleGeo, geoError);
}

function weatherinit() {
  const loadedCoord = localStorage.getItem(COORDS);
  if (loadedCoord === null) {
    getGeoLocal();
  } else {
    const parsedCoord = JSON.parse(loadedCoord);
    const latitude = parsedCoord.latitude;
    const longitude = parsedCoord.longitude;
    getWeather(latitude, longitude);
  }
}

weatherinit();
