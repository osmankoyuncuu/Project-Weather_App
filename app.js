//? Selector
const weatherDiv = document.querySelector(".weather");
const weatherInput = document.querySelector(".weather-input");
const weatherSubmit = document.querySelector(".weather-submit");

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
    main: { temp },
    sys: { country },
    weather,
  } = data;
  weatherDiv.innerHTML += `
  <div class="weather-card ${name}">
    <div>
        <h5>
        <i class="fa-solid fa-location-dot"></i>${name} <sup id="country">${country}</sup>
        </h5>
    </div>
    <div>
        <img src="./img/${weather[0].icon}.png">
        <h2><span>${Math.round(temp)}</span><sup>°C</sup></h2>
        <h4>${weather[0].description}</h4>
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
  getWeather(
    weatherInput.value.charAt(0).toUpperCase() +
      weatherInput.value.slice(1).toLocaleLowerCase()
  );
  weatherInput.value = "";
});
//?keydown
weatherInput.addEventListener("keydown", (e) => {
  if (e.code == "Enter") {
    weatherSubmit.click();
  }
});
