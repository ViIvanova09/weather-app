import React from 'react';
import './WeatherDashboard.css';




const WeatherDashboard = () => {

    let api_key = "0a61657823c560c7626cfe5f5b9771fe";


    const search = async () => {
        const element = document.getElementsByClassName("cityInput");
        if(element[0].value === ""){
           return 0; 
        }
        
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
        
        let response = await fetch(url);
        let data = await response.json();
        const description = document.getElementsByClassName("description");
        const humidity = document.getElementsByClassName("humidity-percent");
        const wind = document.getElementsByClassName("wind-rate");
        const temperature = document.getElementsByClassName("temperature");
        const location = document.getElementsByClassName("location");

        description[0].innerHTML = data.weather[0].description;
        humidity[0].innerHTML = data.main.humidity+" %";
        wind[0].innerHTML = Math.floor(data.wind.speed)+" km/h";
        temperature[0].innerHTML = Math.floor(data.main.temp)+" °C";
        location[0].innerHTML = data.name;

        let days = 5;
        let url1 = `https://api.openweathermap.org/data/2.5/forecast?q=${element[0].value}&cnt=${days}&units=Metric&appid=${api_key}`;
        let response1 = await fetch(url1);
        let data1 = await response1.json();
        const forecastList = document.getElementsByClassName("forecast-container");
        forecastList[0].innerHTML = "";
        let forecasts = data1.list;
        forecasts.forEach(forecastData => {
            let container = document.createElement('div');
            container.classList.add('container-forecast');

            let hours = document.createElement('div');
            hours.classList.add('hours-text');
            hours.innerHTML = forecastData.dt_txt;
            container.appendChild(hours);

            let temp = document.createElement('div');
            temp.classList.add('forecast-text');
            temp.innerHTML = Math.floor(forecastData.main.temp)+" °C";
            container.appendChild(temp);

            forecastList[0].appendChild(container);
        });

    }   










    return (
        <div>
            <div className='container'>
                <div className='search-bar'>
                    <input type="text" className="cityInput" placeholder='Type city' />
                    <button onClick={()=> {search()}}>Search</button>
                </div>
                <h1>Location and temperature:</h1>
                <div className="data">
                <div className="location"></div>
                    <div className="temperature"></div>
                    <div className='description'></div>
                    <div className="humidity-percent"></div>
                    <div className="text"></div>
                    <div className="wind-rate"></div>
                    <div className="text"></div>
                </div>
                <div className='forecast-container'></div>
            </div>
            
        </div>
    );
};





export default WeatherDashboard;
