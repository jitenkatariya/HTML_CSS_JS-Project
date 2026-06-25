const input = document.querySelector("#inputField");
const searchIcon = document.querySelector("#searchIcon");

const icon = document.querySelector("#icon");
const desc = document.querySelector("#desc");

const temperature = document.querySelector("#temp");
const cityName = document.querySelector("#city");

const windSpeed = document.querySelector("#windSpeed");
const humidity = document.querySelector("#humiditytype");

const startButton = document.querySelector(".start");
const homeButton = document.querySelector(".homeBtn");

const Box1 = document.querySelector(".mainBox1");
const Box2 = document.querySelector(".mainBox2");
const Box3 = document.querySelector(".mainBox3");

startButton.addEventListener("click", () => {
  Box1.classList.add("inactive");
  Box2.classList.remove("inactive");
});

function changeIcon(weatherMain) {
  let icons = {
    Clouds: "./images/clouds.png",
    Rain: "./images/rain.png",
    Mist: "./images/mist.png",
    Haze: "./images/haze.png",
    Snow: "./images/snow.png",
    Clear: "./images/clear.png",
  };
  icon.src = icons[weatherMain] || "/images/clear.png";
}

const url = "https://api.openweathermap.org/data/2.5/weather?";
const apiKey = "69fa21bd56bcfeba62534633337e135a";

async function getWeatherDate(city) {
  let finalUrl = `${url}q=${city}&appid=${apiKey}`;
  let weatherDate = await fetch(finalUrl).then((res) => res.json());
  console.log(weatherDate);

  if (weatherDate.cod == 404) {
    Box2.classList.add("inactive");
    Box3.classList.remove("inactive");

    desc.innerHTML = "Description";
    temperature.innerHTML = "0°C";
    cityName.innerHTML = "Anand";
    windSpeed.innerHTML = "0km/h";
    humidity.innerHTML = "0%";
    input.value = "";
    icon.src = "images/clear.png";
  }

  desc.innerHTML = weatherDate.weather[0].description;
  temperature.innerHTML = Math.round(weatherDate.main.temp - 273.15) + "°C";
  cityName.innerHTML = weatherDate.name;
  windSpeed.innerHTML = Math.round(weatherDate.wind.speed * 3.6) + " km/h";
  // windSpeed.innerHTML = weatherDate.wind.speed + "km/h";
  humidity.innerHTML = weatherDate.main.humidity + "%";

  changeIcon(weatherDate.weather[0].main);
}

searchIcon.addEventListener("click", () => {
  getWeatherDate(input.value);
});

input.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    getWeatherDate(input.value);
  }
});

homeButton.addEventListener("click", () => {
  Box3.classList.add("inactive");
  Box1.classList.remove("inactive");
});
