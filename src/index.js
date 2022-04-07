import './style.css';
import Forecast from './forecast';

const API_KEY = 'cd3db8003532bc290a76d37d031eb2c0';

async function getWeatherData(location){
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url, {mode: 'cors'});
    const data = await response.json();
    let lat = data.coord.lat;
    let lon = data.coord.lon;
    let dailyUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${API_KEY}&units=metric`;
    const response2 = await fetch(dailyUrl, {mode: 'cors'})
    const dailyData = await response2.json();
    const forecast = new Forecast(data, dailyData);
    return forecast;
}

function displayForecast(forecast){
    const weatherDiv = document.createElement('div');
    weatherDiv.classList.add('weather')
    
    const city = document.createElement('h2');
    city.textContent = `${forecast.getCity()}`;
    weatherDiv.appendChild(city);

    const weatherIcon = new Image();
    weatherIcon.src = forecast.getIconUrl();
    weatherIcon.classList.add('main-weather-icon');
    weatherDiv.appendChild(weatherIcon);

    const currentTemp = document.createElement('h2');
    currentTemp.textContent = `${forecast.getTemp()}°C`
    weatherDiv.appendChild(currentTemp);

    const times = document.createElement('div');
    times.classList.add('times');

    const sunriseDiv = document.createElement('div');

    const sunriseText = document.createElement('h4');
    sunriseText.textContent = 'Sunrise (UTC)'
    sunriseDiv.appendChild(sunriseText);

    const sunrise = document.createElement('h3');
    sunrise.textContent = forecast.getSunrise()
    sunriseDiv.appendChild(sunrise);

    const sunsetDiv = document.createElement('div');

    const sunsetText = document.createElement('h4');
    sunsetText.textContent = 'Sunset (UTC)'
    sunsetDiv.appendChild(sunsetText);

    const sunset = document.createElement('h3');
    sunset.textContent = forecast.getSunset()
    sunsetDiv.appendChild(sunset);

    const temps = [0,1,2,3];
    const fiveDay = document.createElement('div');
    fiveDay.classList.add('five-day-forecast');
    for(let i = 0; i < 5; i++){
        const dayWeather = document.createElement('div');
        dayWeather.classList.add('day-weather');

        const day = document.createElement('p');
        day.textContent = forecast.days[i]
        dayWeather.appendChild(day);

        const image = document.createElement('img');
        image.src = `https://openweathermap.org/img/wn/${forecast.dailyIcons[i]}@2x.png`;
        image.classList.add('daily-icon');
        dayWeather.appendChild(image);

        const temp = document.createElement('p');
        temp.textContent = `${forecast.dailyTemps[i]}°C`;
        dayWeather.appendChild(temp);

        fiveDay.appendChild(dayWeather);
    };

    times.appendChild(sunriseDiv);
    times.appendChild(sunsetDiv);

    weatherDiv.appendChild(times);

    weatherDiv.appendChild(fiveDay);

    const content = document.querySelector('.content');
    content.appendChild(weatherDiv);
}

function removeForecast(){
    const weatherDiv = document.querySelector('.weather');
    if(weatherDiv != null){
        const content = document.querySelector('.content');
        content.removeChild(weatherDiv);
    }
}

async function controller(location){
    removeForecast();
    try{
        let forecast = await getWeatherData(location);
        displayForecast(forecast);
    }
    catch(error){
        console.log(error);
        alert('City not found, please make sure to format using the instructions above!')
    }
    
}

const searchInp = document.querySelector('#searchbar');
const searchBtn = document.querySelector('button');
searchBtn.addEventListener('click', function(){
    controller(searchInp.value);
});

controller('London');