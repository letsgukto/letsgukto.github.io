const weatherContainer = document.querySelector(".js-weather");
const weatherDisplay = weatherContainer.querySelector("h5");

const API_KEY = "166ffdc63dbe78bd4828619076f171e0";
const COORDS = "coords";

function getWeather(lat, lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then(function (reponse) {
      return reponse.json();
    })
    .then(function (json) {
      console.log(json);
      const temperature = json.main.temp;
      weatherDisplay.innerText = `${temperature}℃`;
    });
}

function handleGeo(geo) {
  const latitude = geo.coords.latitude;
  const longitude = geo.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  getWeather(latitude, longitude);
}

function geoError() {
  console.log("error");
}

function getGeoLocal() {
  navigator.geolocation.getCurrentPosition(handleGeo, geoError);
}

getGeoLocal();
