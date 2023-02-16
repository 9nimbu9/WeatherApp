import React from "react";

function Sun(props){
    return(
        <div>
            <div class="col-lg-4 col-md-6 col-sm-12 rbox">
                <div class="card">
                    <p class="text">SUNRISE</p>
                    <div class="row">
                        <div class="col-5"><img class="pic" src={require("./Pictures/sunrise.png")}/></div>
                        <div class="col-7">
                            <p class="data">{props.sunrise}</p>                                    
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-4 col-md-6 col-sm-12 rbox">
                <div class="card">
                    <p class="text">SUNSET</p>
                    <div class="row">
                        <div class="col-5"><img class="pic" src={require("./Pictures/sunset.png")}/></div>
                        <div class="col-7">
                            <p class="data">{props.sunset}</p>                                    
                        </div>
                    </div>
                </div>
            </div>
            <br></br>
            <br></br>
        </div>
    )
}

export default Sun