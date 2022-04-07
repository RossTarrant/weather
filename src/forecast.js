export default class Forecast{
    constructor(data, dailyData){
        this.city = data.name;
        this.temp = Math.round(data.main.temp);
        this.minTemp = Math.round(data.main.temp_min);
        this.maxTemp = Math.round(data.main.temp_max);
        this.humidity = data.main.humidity;
        this.weather = this.setWeather(data);
        this.weatherDescription = data.weather[0].description;
        this.sunrise = this.setSunrise(data.sys.sunrise-data.timezone);
        this.sunset = this.setSunset(data.sys.sunset-data.timezone);
        this.iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        this.days = this.setDays();
        this.dailyTemps = this.setDailyTemps(dailyData);
        this.dailyIcons = this.setDailyIcons(dailyData);
    }

    getCity(){
        return this.city;
    }

    getTemp(){
        return this.temp;
    }

    getMinTemp(){
        return this.minTemp;
    }

    getMaxTemp(){
        return this.maxTemp;
    }

    getHumidity(){
        return this.humidity;
    }

    getWeather(){
        return this.weather;
    }

    getWeatherDescription(){
        return this.weatherDescription;
    }

    getSunrise(){
        return this.sunrise;
    }

    getSunset(){
        return this.sunset;
    }

    getIconUrl(){
        return this.iconUrl;
    }

    setWeather(data){
        let weather = data.weather[0].main;
        if(weather === 'Clear'){
            return 'Blue Sky'
        }
        else if(weather === 'Drizzle'){
            return 'Rain'
        }
        else{

        }
    }

    setSunrise(sunrise){
        let date = new Date(sunrise * 1000);
        let hours = date.getHours();
        let minutes = "0" + date.getMinutes();
        let formattedTime = hours + ':' + minutes.substr(-2) + 'am';
        return formattedTime;
    }

    setSunset(sunset){
        let date = new Date(sunset * 1000);
        let hours = date.getHours();
        let minutes = "0" + date.getMinutes();
        let formattedTime = hours + ':' + minutes.substr(-2) + 'pm';
        return formattedTime;
    }

    setDays(){
        let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        let toReturn = [];
        const d = new Date();
        let day = d.getDay();
        day++
        for(let i = 0; i < 5; i++){
            toReturn.push(days[day]);
            day++;
            if(day===7){
                day = 0;
            }
        }
        return toReturn;
    }

    setDailyTemps(data){
        let toReturn = [];
        for(let i = 1; i < 6; i++){
            toReturn.push(Math.round(data.daily[i].temp.max))
        }
        return toReturn;
    }

    setDailyIcons(data){
        let toReturn = [];
        for(let i = 1; i < 6; i++){
            toReturn.push(data.daily[i].weather[0].icon);
        }
        return toReturn;
    }
}