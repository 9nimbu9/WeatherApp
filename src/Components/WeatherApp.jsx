import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CurrentWeather from './CurrentWeather';
import ForecastWeather from './ForecastWeather';
import Sun from './Sun';

function WeatherApp() {
  const [query, setQuery] = useState('');
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [sun, setSun] = useState([])
  const [tempUnit, setTempUnit] = useState(localStorage.getItem('tempUnit') || 'C');

  const API_KEY = '3f4068e143b74f699b261652231602';

  useEffect(() => {
    // Fetch weather data when selectedLocation is set or when the temperature unit is changed
    if (selectedLocation) {
      fetchWeatherData();
    }
  }, [selectedLocation, tempUnit]);

  useEffect(() => {
    // Fetch weather data for user's current location
    const successCallback = async (position) => {
        const { latitude, longitude } = position.coords;
      
        try {
          // Fetch the location name and weather data from WeatherAPI
          const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=3f4068e143b74f699b261652231602&q=${latitude},${longitude}`);
          const locationData = response.data.location;
          const currentWeather = response.data.current;
      
          const currentLocation = {
            name: locationData.name,
            country: locationData.country,
            lat: latitude,
            lon: longitude,
            temperature: currentWeather.temp_c,
            condition: currentWeather.condition.text,
            icon: currentWeather.condition.icon,
          };
      
          setSelectedLocation(currentLocation);
        } catch (error) {
          console.error(error);
        }
      };
      

    const errorCallback = (error) => {
      console.error(error);
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }, []);

  const handleInputChange = async (event) => {
    const value = event.target.value;
    setQuery(value);
    // Fetch location suggestions from WeatherAPI.com API
    const locationResults = await axios.get(`https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${value}`);

    // Map the location results to an array of location objects
    const locations = locationResults.data.map((result) => {
      return {
        name: result.name,
        country: result.region,
        lat: result.lat,
        lon: result.lon,
      };
    });

    setLocations(locations);
  };

  const handleLocationSelect = async (location) => {
    setSelectedLocation(location);
    setQuery("")
  };

  const handleTempUnitChange = (event) => {
    const value = event.target.value;
    setTempUnit(value);
    localStorage.setItem('tempUnit', value);
  };

  const fetchWeatherData = async () => {
    // Fetch weather data from WeatherAPI.com API
    const weatherResult = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${selectedLocation.lat},${selectedLocation.lon}&aqi=no`);

    // Fetch forecast data from WeatherAPI.com API
    const forecastResult = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${selectedLocation.lat},${selectedLocation.lon}&days=10&aqi=no`);

    const SunResult = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${selectedLocation.lat},${selectedLocation.lon}&days=1&aqi=no`);

    // Save the weather data and forecast data
    setWeatherData(weatherResult.data);
    setForecastData(forecastResult.data.forecast.forecastday);
    setSun(SunResult.data.forecast.forecastday)
  };

  const convertTemp = (temp_c) => {
    if (tempUnit === 'F') {
      return (temp_c * 9/5) + 32;
    }
    return temp_c;
  };


  return (
    <div>
      <input type="text" value={query} onChange={handleInputChange} placeholder="Search for a location" />

        <input type="radio" name="tempUnit" value="C" checked={tempUnit === 'C'} onChange={handleTempUnitChange} />
        <label>Celsius</label>
        <input type="radio" name="tempUnit" value="F" checked={tempUnit === 'F'} onChange={handleTempUnitChange} />
        <label>Fahrenheit</label>

        <ul>
          {query!==""?locations.map((location, index) => (
            <li key={index} onClick={() => handleLocationSelect(location)}>
              {location.name}, {location.country} 
            </li>
          )):""}
        </ul>

        {selectedLocation && weatherData && (
          <div className='row'>
              <CurrentWeather name={selectedLocation.name} country={selectedLocation.country} temp={convertTemp(weatherData.current.temp_c).toFixed(1)}
                tempUnit={tempUnit} pressure={weatherData.current.pressure_mb} humidity={weatherData.current.humidity}
                visibility={weatherData.current.condition.text} windSpeed={weatherData.current.wind_kph}/>

              {sun.map((day, index) => (
                <Sun key={index} sunrise={day.astro.sunrise} sunset={day.astro.sunset}/>
              ))}
            <h3>Weather Forecast for the Next 10 Days:</h3>
            {forecastData.map((day, index) => (
              <ForecastWeather key={index} date={day.date} maxTemp={convertTemp(day.day.maxtemp_c).toFixed(1)}
                tempUnit={tempUnit} minTemp={convertTemp(day.day.mintemp_c).toFixed(1)} avgTemp={convertTemp(day.day.avgtemp_c).toFixed(1)}
                sunrise={day.astro.sunrise} sunset={day.astro.sunset}/>
            ))}
          </div>
        )}
      </div>
  );
}

export default WeatherApp;

