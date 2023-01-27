function currentTime() {
  let currentTime = new Date();
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = weekDays[currentTime.getDay()];
  let hour = currentTime.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let time = document.querySelector("#time");
  time.innerHTML = `${day} <br /> ${hour}:${minutes}`;
}

function showLisbon() {
  let apiKey = "10469a8133000fdbto80b02142f32bfd";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Lisbon&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function currentWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

function showLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "10469a8133000fdbto80b02142f32bfd";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function showForecast(response) {
  let forecastData = response.data.daily;
  let forecast = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecastData.forEach(function (dataForecast, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        ` 
    <div class="col">
      <div class="day">
        <h1>${formatDay(dataForecast.time)}</h1>
        <h2>
          <img
            src="${dataForecast.condition.icon_url}"
            alt="${dataForecast.condition.description}"
            width = "85px"
          />
        </h2>
        <p>
          <span class="tempMax">${Math.round(
            dataForecast.temperature.maximum
          )}º</span> <span class="tempMin">${Math.round(
          dataForecast.temperature.minimum
        )}º</span>
        </p>
      </div>
    </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

function getCoordinatesForescast(coordinates) {
  let apiKey = "10469a8133000fdbto80b02142f32bfd";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showForecast);
}

function showWeather(response) {
  let temperature = document.querySelector("#temperature");
  let currentCity = document.querySelector("#city");
  let weatherDescription = document.querySelector("#weather-description");
  let feelsLike = document.querySelector("#feels-like");
  let humidity = document.querySelector("#humidity");
  let pressure = document.querySelector("#pressure");
  let wind = document.querySelector("#wind");
  let image = document.querySelector("#weather-image");

  celsiusTemperature = response.data.temperature.current;
  descriptionWeather = response.data.condition.description;
  description =
    descriptionWeather.charAt(0).toUpperCase() + descriptionWeather.slice(1);

  temperature.innerHTML = Math.round(celsiusTemperature);
  currentCity.innerHTML = response.data.city;
  weatherDescription.innerHTML = `${description}`;
  feelsLike.innerHTML = `${Math.round(response.data.temperature.feels_like)}º`;
  humidity.innerHTML = `${response.data.temperature.humidity}%`;
  pressure.innerHTML = `${response.data.temperature.pressure}hPa`;
  wind.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
  image.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  image.setAttribute("alt", response.data.condition.icon);

  getCoordinatesForescast(response.data.coordinates);
}

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#inputCity");
  let cityName = cityInput.value;
  let apiKey = "10469a8133000fdbto80b02142f32bfd";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

function celsiusTemp(event) {
  event.preventDefault();
  let tempC = document.querySelector("#temperature");
  tempC.innerHTML = Math.round(celsiusTemperature);
  celsiusLink.classList.remove("off-link");
  farenheitLink.classList.add("off-link");
}

function farenheitTemp(event) {
  event.preventDefault();
  let tempF = document.querySelector("#temperature");
  tempF.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
  farenheitLink.classList.remove("off-link");
  celsiusLink.classList.add("off-link");
}

currentTime();
showLisbon();

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", searchCity);

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", currentWeather);

let celsiusTemperature = null;

let celsiusLink = document.querySelector("#celsius");
let farenheitLink = document.querySelector("#farenheit");
celsiusLink.addEventListener("click", celsiusTemp);
farenheitLink.addEventListener("click", farenheitTemp);
