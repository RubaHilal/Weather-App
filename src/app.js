function formatDate(timestamp) {
	let date = new Date(timestamp);
	let hours = date.getHours();
	if (hours < 10) {
		hours = `0${hours}`;
	}
	let minutes = date.getMinutes();
	if (minutes < 10) {
		minutes = `0${minutes}`;
	}
	let days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	let day = days[date.getDay()];
	return ` ${day} ${hours}:${minutes}`;
}

function displayForecast(response) {
	console.log(response.data.daily);
	let forecastElement = document.querySelector("#forecast");
	let days = ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

	let forecastHTML = `<div class="row">`;
	days.forEach(function (day) {
		forecastHTML =
			forecastHTML +
			`<div class="col">
                                <div class="WeatherForecastPreview">
                                    <div class="forecast-time">${day}</div><canvas width="20" height="10"></canvas>
                                    <i class="fa-solid fa-temperature-arrow-down"></i>
                                    <div class="forecast-temperature"><span
                                            class="forecast-temperature-max">13°</span><span
                                            class="forecast-temperature-min">10°</span></div>
											</div>
											</div>
  `;
	});

	forecastHTML = forecastHTML + `</div>`;
	forecastElement.innerHTML = forecastHTML;
	console.log(forecastHTML);
}
function getForecast(coordinates) {
	console.log(coordinates);
	let apiKey = "eb9542c65e739e0fb25ade97c749e2aa";
	let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
	axios.get(apiUrl).then(displayForecast);
}
function displayTemperature(response) {
	let currentTemperature = document.querySelector("#temperature");
	let currentCity = document.querySelector("#city");
	let currentDescription = document.querySelector("#description");
	let currentHumidity = document.querySelector("#humidity");
	let windSpeed = document.querySelector("#wind");
	let currentDate = document.querySelector("#date");
	let iconElement = document.querySelector("#icon");

	celsiusTemperature = response.data.main.temp;
	currentTemperature.innerHTML = Math.round(celsiusTemperature);
	currentCity.innerHTML = response.data.name;
	currentHumidity.innerHTML = response.data.main.humidity;
	windSpeed.innerHTML = Math.round(response.data.wind.speed);
	currentDescription.innerHTML = response.data.weather[0].description;
	currentDate.innerHTML = formatDate(response.data.dt * 1000);
	iconElement.setAttribute(
		"src",
		`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png `
	);
	iconElement.setAttribute("alt", response.data.weather[0].description);
	getForecast(response.data.coord);
}
function search(city) {
	let apiKey = "eb9542c65e739e0fb25ade97c749e2aa";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
	axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
	event.preventDefault();
	let cityInputElement = document.querySelector("#city-input");
	search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
	event.preventDefault();
	let temperatureElement = document.querySelector("#temperature");
	celsiusLink.classList.remove("active");
	fahrenheitLink.classList.add("active");
	let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
	temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
	event.preventDefault();
	celsiusLink.classList.add("active");
	fahrenheitLink.classList.remove("active");
	let temperatureElement = document.querySelector("#temperature");
	temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
search("San Francisco");
displayForecast();
