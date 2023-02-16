import React from "react";

function CurrentWeather(props){
    return(
        <div className="card">
            <h2>{props.name}, {props.country}</h2>
            <p>Temperature: {props.temp}{props.tempUnit}</p>
            <p>Pressure: {props.pressure} mb</p>

            <div class="col-lg-4 col-md-6 col-sm-6 rbox">
                <div class="card">
                    <p class="text">HUMIDITY</p>
                    <div class="row">
                        <div class="col-5"><img className="pic" src={require("./Pictures/humidity.png")}/></div>
                        <div class="col-7">
                            <p class="data">{props.humidity}</p>
                            <p class="text2">%</p>
                        </div>
                    </div> 
                </div>                        
            </div>

            <div class="col-lg-4 col-md-6 col-sm-6 rbox">
                <div class="card">
                    <p class="text">VISIBILITY</p>
                    <div class="row">
                        <div class="col-5"><img className="pic" src={require("./Pictures/visibility.png")}/></div>
                        <div class="col-7">
                            <p class="data">{props.visibility}</p>
                        </div>
                    </div> 
                </div>                        
            </div>

            <div class="col-lg-4 col-md-6 col-sm-6 rbox">
                <div class="card">
                    <p class="text">WIND SPEED</p>
                    <div class="row">
                        <div class="col-5"><img className="pic" src={require("./Pictures/wind speed.png")}/></div>
                        <div class="col-7">
                            <p class="data">{props.windSpeed}</p>
                            <p class="text2">kmph</p>
                        </div>
                    </div> 
                </div>                        
            </div>
        </div>
    )
}

export default CurrentWeather