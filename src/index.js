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

function showForecast(response) {
  let forecast = document.querySelector("#forecast");
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` 
    <div class="col">
      <div class="day">
        <h1>Mon</h1>
        <h2>
          <img
            src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-day.png"
            alt="broken clouds"
          />
        </h2>
        <p>
          Max 14º <br />
          Min 9º
        </p>
      </div>
    </div>`;
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

navigator.geolocation.getCurrentPosition(showLocation);

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", searchCity);

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", currentWeather);

let celsiusTemperature = null;

let celsiusLink = document.querySelector("#celsius");
let farenheitLink = document.querySelector("#farenheit");
celsiusLink.addEventListener("click", celsiusTemp);
farenheitLink.addEventListener("click", farenheitTemp);
