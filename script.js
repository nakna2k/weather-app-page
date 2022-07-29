const API_KEY = `1bafa3a3e487b69ddae1bfa3b96beba8`;


const SEARCH_BTN = document.querySelector("#searchBtn");
const SEARCH_INPUT = document.querySelector("#SearchField");
const ERROR_MSG = document.querySelector("#ErrorMsg");
const wrapper = document.querySelector("#WeatherBox");


const fetchWeather = async (city) =>{
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
    
    const respond = await fetch(url);

    if(respond.status === 200){
        const data = await respond.json();
        console.log(data);
        weatherInfo(data);
        ERROR_MSG.textContent = "";
    }
    else{
        ERROR_MSG.textContent = `Miasto ${SEARCH_INPUT.value} nie istnieje
        `;
        wrapper.innerHTML = "";

        }
    

}

const weatherInfo = (city) =>{
    console.log(city.name);
    
    const icon = "http://openweathermap.org/img/w/" + city.weather[0].icon + ".png"

    const isWarm = city.main.temp > 20 ? 'orange' : 'blue';

    wrapper.innerHTML = `
    <h2>Kraj: ${city.sys.country}</h2>
    <h2>Nazwa miasta: ${city.name}</h2>
    <h3 style = "color:${isWarm}">Temperatura: ${tempConverter(city.main.temp)} </h3>
    <h3>Odczuwalna temperatura: ${tempConverter(city.main.feels_like)}</h3>
    <h3>Niebo: <img class ="zdj" src = "${icon}"/></h3>
    <h3>Ciśnienie: ${city.main.pressure} hPa</h3>
    
    
    `
}
const tempConverter = (temp) =>{
    return (temp - 272.15).toFixed(1) + "°C";
    
    
}

SEARCH_BTN.addEventListener("click",() => fetchWeather(SEARCH_INPUT.value));