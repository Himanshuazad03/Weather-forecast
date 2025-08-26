const apiKey = "a2897bfd7d9acb5b1974ca4f751b4d74"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q="
let city = document.querySelector('.city')
let temp = document.querySelector('.temp')
let humidity = document.querySelector('.humidity')
let wind = document.querySelector('.wind')
let searchBox = document.querySelector(".search input")
let searchIcon = document.querySelector(".search button")
let WeatherIcon = document.querySelector(".weather-icon")


async function checkWeather(cityValue) {
    try {
        const response = await fetch(apiUrl + cityValue + `&appid=${apiKey}`);
        if (!response.ok) {
            alert("City not found!");
            return;
        }

        const data = await response.json();

        if (data.cod === "404") {
            alert("City not found!");
            return;
        }
        console.log(data);
       
        

        city.innerHTML = data.name;
        temp.innerHTML = Math.round(data.main.temp) + "°C";
        humidity.innerHTML = data.main.humidity + "%";
        wind.innerHTML = data.wind.speed + " Km/h";

        if(data.weather[0].main == "Clear"){
            WeatherIcon.src = "images/sun.png"
        }
        if(data.weather[0].main == "Clouds"){
            WeatherIcon.src = "images/cloudy.png"
        }
        if(data.weather[0].main == "Haze"){
            WeatherIcon.src = "images/haze.png"
        }
        if(data.weather[0].main == "Rain"){
            WeatherIcon.src = "images/weather.png"
        }

    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("An error occurred while fetching weather data.");
    }
 
}

searchIcon.addEventListener('click', ()=> {
    checkWeather(searchBox.value)
})
