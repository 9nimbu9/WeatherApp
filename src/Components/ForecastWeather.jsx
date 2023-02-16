import React from "react";

function ForecastWeather(props){
    return(
        <div>
            <h4>{props.date}</h4>
            <p>Max temperature: {props.maxTemp}{props.tempUnit}</p>
            <p>Min temperature: {props.minTemp}{props.tempUnit}</p>
            <p>Average temperature: {props.avgTemp}{props.tempUnit}</p>
            <p>Sunrise time: {props.sunrise}</p>
            <p>Sunset time: {props.sunset}</p>
            <br></br>
        </div>
    )
}

export default ForecastWeather