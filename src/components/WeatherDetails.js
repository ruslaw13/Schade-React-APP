import React from 'react'

const WeatherDetails = (props) => {
    return (
        <div className="weather-details">
            <div className="weather-details__name text">{props.data.name}</div>
            <div className="weather-details__temp text">{props.data.main.temp} °C</div>
            <div className="weather-details__feels-like text">Gemeten {props.data.main.feels_like} °C</div>
            <div className="weather-details__group">
                <p className="weather-details__info text">{props.data.weather[0].description}</p>
                <p className="weather-details__info text">Windsnelheid - {(props.data.wind.speed * 3.6).toFixed(1)} km/h</p>
                <p className="weather-details__info text">Barometer - {props.data.main.pressure} hPa</p>
                <p className="weather-details__info text">Luchtvochtigheid - {props.data.main.humidity} %</p>
            </div>
        </div>
    )
}

export default WeatherDetails
