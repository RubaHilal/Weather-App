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
function displayTemperature(response) {
	let currentTemperature = document.querySelector("#temperature");
	let currentCity = document.querySelector("#city");
	let currentDescription = document.querySelector("#description");
	let currentHumidity = document.querySelector("#humidity");
	let windSpeed = document.querySelector("#wind");
	let currentDate = document.querySelector("#date");
	let iconElement = document.querySelector("#icon");
	currentTemperature.innerHTML = Math.round(response.data.main.temp);
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
}

function search(event) {
	event.preventDefault();
	let cityInputElement = document.querySelector("#city-input");
	console.log(cityInputElement);
}

let apiKey = "0df4d3e847b64a8832063c084ffc9e7f";
let city = "San Francisco";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q= ${city} &appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);
