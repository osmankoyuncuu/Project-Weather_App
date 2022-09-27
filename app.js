//? Selector
const weatherDiv = document.querySelector(".weather");
const weatherInput = document.querySelector(".weather-input");
const weatherSubmit = document.querySelector(".weather-submit");
const alertDiv = document.querySelector("#alert");
let cityArr = [];

//? Fetch
const getWeather = async (city) => {
  const API_KEY = "31bbc6a9d394fb5370973f2f4cd8f16d";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.log("hata var");
    }
    const data = await res.json();
    renderWeather(data);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
//? Fretch Function
const renderWeather = (data) => {
  const {
    name,
    main: { temp, temp_min, temp_max, feels_like },
    sys: { country },
    weather,
    clouds: { all },
    wind: { speed },
  } = data;

  weatherDiv.innerHTML += `
  <div class="weather-card ${name}">
    <div>
        <h5>
        <i class="fa-solid fa-location-dot"></i>${name} <sup id="country">${country}</sup>
        </h5>
    </div>
    <div class="content">
        <img src="./img/${weather[0].icon}.png">
        <h4>${weather[0].description}</h4>
        <h2><span>${Math.round(temp)}</span><sup>°C</sup></h2>
        <h4>${Math.round(temp_min)}°C/${Math.round(temp_max)}°C</h4>
        <h4><i class="fa-solid fa-cloud"></i> Clouds: %${all}</h4>
        <h4><i class="fa-solid fa-temperature-three-quarters"></i> Feels Like: ${Math.round(
          feels_like
        )} °C</h4>
        <h4><i class="fa-solid fa-wind"></i> Wind Speed: ${speed} Km/h</h4>
        
    </div>
  </div>
  `;
};
//?load
window.addEventListener("load", () => {
  weatherInput.focus();
});
//? onclick

weatherSubmit.addEventListener("click", () => {
  if (!weatherInput.value) {
    let timer = 0;
    const intervalId = setInterval(() => {
      console.log(timer);
      timer++;
      if (timer > 2) {
        clearInterval(intervalId);
        alertDiv.innerHTML = "";
      }
    }, 1000);
    alertDiv.innerHTML = `
Please enter a city name `;
  } else if (cityArr.includes(weatherInput.value.toLocaleLowerCase())) {
    console.log("girdi");
    let timer = 0;
    const intervalId = setInterval(() => {
      console.log(timer);
      timer++;
      if (timer > 2) {
        clearInterval(intervalId);
        alertDiv.innerHTML = "";
      }
    }, 1000);
    alertDiv.innerHTML = `
You already know the weather for ${weatherInput.value.toLocaleUpperCase()}, Please search for another city.`;
  } else {
    getWeather(
      weatherInput.value.charAt(0).toUpperCase() +
        weatherInput.value.slice(1).toLocaleLowerCase()
    );
    cityArr.push(weatherInput.value.toLocaleLowerCase());
    weatherInput.value = "";
    console.log(cityArr);
  }
});
//?keydown
weatherInput.addEventListener("keydown", (e) => {
  if (e.code == "Enter") {
    weatherSubmit.click();
  }
});
