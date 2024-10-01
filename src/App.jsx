import React, { useState } from "react";
import './App.css';
import { fetchWeather } from "./API/fetchWeather";

function App () {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});
    const [favorites, setFavorites] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');

    // Function to search for weather data
    const search = async(e) => {
        if(e.key === "Enter"){
            const data = await fetchWeather(query);
            console.log(data);
            setWeather(data);
            setQuery('');
        }
    }

    // Function to add a city to favorites
    const addToFavorites = () => {
        if (!favorites.some(fav => fav.name === weather.name)) {
            setFavorites([...favorites, weather]);
        }
    }

    // Function to display weather for selected city from the dropdown
    const handleSelectChange = async (e) => {
        const cityName = e.target.value;
        const city = favorites.find(city => city.name === cityName);
        if (city) {
            setSelectedCity(cityName);
            const data = await fetchWeather(city.name);
            setWeather(data);
        }
    }

    return (
        <div className="main-container">
            <div className="w-text">
                <h1>Get Weather</h1>
            </div>

            {/* Input Field */}
            <input 
                type="text" 
                className="search"
                placeholder="Type your city name..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={search}
            />

            {/* Weather Information */}
            {
                weather.main && (
                    <div className="city">
                        <h2 className="city-name">
                            <span>{weather.name}</span>
                            <sup>{weather.sys.country}</sup>
                        </h2>
                        <div className="city-temp">
                            {Math.round(weather.main.temp)}
                            <sup>&deg;C</sup>
                        </div>
                        <div className="add">
                            <span>feels like </span>
                            {Math.round(weather.main.feels_like)}
                            <sup>&deg;C</sup>
                        </div>
                        <div className="info">
                            <img
                                className="city-icon" 
                                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
                                alt={weather.weather[0].description} 
                            />
                            <p>{weather.weather[0].description}</p>
                        </div>

                        {/* Button to Save to Favorites */}
                        <button onClick={addToFavorites} className="fav-btn">Add to Favorites</button>
                    </div>
                )
            }

            {/* Coordinates Information */}
            {
                weather.main && (
                    <div className='coord'>
                        <h3>Coordinates</h3>
                        <span>Longitude: {weather.coord.lon}</span>
                        <span>Latitude: {weather.coord.lat}</span>
                    </div>
                )
            }

            {/* Dropdown Menu for Favorite Cities */}
            {/* Dropdown Menu for Favorite Cities */}
{favorites.length > 0 && (
    <div className="dropdown">
        <h3 className="favorite-heading">Your Favorite Cities</h3>
        <select 
            value={selectedCity} 
            onChange={handleSelectChange}
            className="city-dropdown"
        >
            <option value="" disabled>Favourite Cities</option>
            {favorites.map((city, index) => (
                <option key={index} value={city.name}>
                    {city.name}, {city.sys.country}
                </option>
            ))}
        </select>
    </div>
)}

        </div>
    );
}

export default App;
