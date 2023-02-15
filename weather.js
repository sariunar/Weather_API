document.addEventListener("DOMContentLoaded", function (event) {
    getWeather();
});

const input = document.querySelector("#input");

input.value = 'Ulan-Ude';

function setCity(event) {
    if (event.code === 'Enter') {
        getWeather();
    }
}

input.addEventListener("keypress", setCity);

function getWeather() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&lang=ут&appid=bdbd02cc95ce2dc28ebf2d22e44d2eda&units=metric`)
        .then(response => response.json())
        .then(weather => {
            console.log(weather)
            document.querySelector('.city').innerText = weather.name;
            document.querySelector('.country').innerText = new Intl.DisplayNames("en", { type: "region" }).of(weather.sys.country);
            document.querySelector('.date').innerText = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
            document.querySelector('.tempValue').innerText = Math.round(weather.main.temp) + '°';
            document.querySelector('.hi-low').innerText = "Max: " + Math.round(weather.main.temp_max) + '°' + " / " + "Min: " + Math.round(weather.main.temp_min) + '°';
            document.querySelector('.weather').innerText = weather.weather[0].description;
        })
        .catch(error => console.log(error));
    input.value = '';
} 