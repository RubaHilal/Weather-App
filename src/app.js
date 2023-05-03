function displayTemperature(response) {
	console.log(response.data.main.temp);
	let currentTemperature = document.querySelector("#temperature");
	let currentCity = document.querySelector("#city");
	let currentDescription = document.querySelector("#description");
	let currentHumidity = document.querySelector("#humidity");
	let windSpeed = document.querySelector("#wind");
	currentTemperature.innerHTML = Math.round(response.data.main.temp);
	currentCity.innerHTML = response.data.name;
	currentHumidity.innerHTML = response.data.main.humidity;
	windSpeed.innerHTML = Math.round(response.data.wind.speed);
	currentDescription.innerHTML = response.data.weather[0].description;
}

let apiKey = "0df4d3e847b64a8832063c084ffc9e7f";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q= San Francisco &appid=${apiKey}&units=metric`;
console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);
