import { useEffect, useState } from "react"
import { fetchMETAR, fetchTAF } from "../../../DataAccess"
import { PlainTextButton } from "./PlainTextButton"
import "./AirportWeather.css"

export const AirportWeather = ({airportId}) => {
    
    const [currentMETAR, setCurrentMETAR] = useState({})
    const [currentTAF, setCurrentTAF] = useState({})
    const [plainTextMode, setPlainTextMode] = useState(false)

    useEffect(
        () => {
            fetchMETAR(airportId)
                .then((data) => {
                    setCurrentMETAR(data)
                })
        },
        []
    )

    useEffect(
        () => {
            fetchTAF(airportId)
                .then((data) => {
                    setCurrentTAF(data)
                })
        },
        []
    )

    const convertTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const formattedTime = date.toLocaleString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short',
        });
        const formattedTimeString = `${formattedTime}`
        return formattedTimeString
    }

    const convertStrToTitleCase = (string) => {
        return string
            .toLowerCase()
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
    }

    const roundToWhole = (num) => {
        const integer = Math.round(num)
        return integer
    }

    const convertCelciusToFahrenheit = (tempC) => {
        const tempF = (tempC * (9/5)) + 32
        return tempF
    }

    const roundToTwoDec = (num) => {
        const twoDecNum = Number.parseFloat(num).toFixed(2)
        return twoDecNum
    }

    const determineMETARClass = (skyCondition) => {
        if (skyCondition === "VFR") {
            return "metar__data--VFR"
        } else if (skyCondition === "MVFR") {
            return "metar__data--MVFR"
        } else if (skyCondition === "IFR") {
            return "metar__data--IFR"
        } else if (skyCondition === "LIFR") {
            return "metar__data--LIFR"
        } else {
            return "metar__data"
        }
    }

    const determineTAFClass = (cloudLayers, viz) => {
        
        const filteredArray = cloudLayers.filter( (condition) => condition?.$.sky_cover === "BKN" || condition.$.sky_cover === "OVC" )
        let ceilingAGL = null
        if (filteredArray.length === 0) {
            ceilingAGL = 3001
        } else {
            ceilingAGL = filteredArray[0]?.$.cloud_base_ft_agl
        }
        
        if (ceilingAGL >= 3000 && viz >= 5) {
            return "taf__data--VFR"
        } else if (ceilingAGL >= 1000 && ceilingAGL < 3000 || viz >= 3 && viz < 5) {
            return "taf__data--MVFR"
        } else if (ceilingAGL >= 500 && ceilingAGL < 1000 || viz >= 1 && viz < 3) {
            return "taf__data--IFR"
        } else if (ceilingAGL < 500 || viz < 1) {
            return "taf__data--MVFR"
        } else {
            return "taf__data"
        }
    }

    // // beginning of an attempt to format raw TAF.
    // const formatRawTAFString = (str) => {
    //     const wordsArray = str.split(' ');

    //     // Filter out the words "FM" and "TEMPO" along with the words immediately following them
    //     const resultArray = [];
    //     let skipNextWord = false;

    //     for (let i = 1; i < wordsArray.length; i++) {
    //         if (wordsArray[i] === "FM" || wordsArray[i] === "TEMPO") {
    //             skipNextWord = true;
    //             resultArray.push(`${wordsArray[i]} ${wordsArray[i + 1]}`);
    //         } else if (!skipNextWord) {
    //             resultArray.push(wordsArray[i]);
    //         } else {
    //             skipNextWord = false;
    //         }
    //     }
    //     console.log(resultArray)
    // }

    // unfortunately, due to timing issues from the API, METAR and TAF cannot be rendered in external components. It all has to happen here.

    // rendering possibilities:
    // // plain text mode off and no TAF reported
    // // plain text mode off and TAF reported
    // // plain text mode on and no TAF reported
    // // plain text mode on and TAF reported


    if (!currentMETAR || !currentTAF) {
        return null
    } else if (!plainTextMode && !currentTAF.response?.data[0].TAF) {
        return (
            <div className="airport__weather">
                <h3 className="weather__header">Current and Forecasted Weather</h3>
                <PlainTextButton plainTextMode={plainTextMode} setPlainTextMode={setPlainTextMode}/>
                <div className="weather__container">
                    <div className="weather__metar">
                        <div className="metar__title">METAR: </div>
                        <div className={determineMETARClass(currentMETAR.response?.data[0].METAR[0].flight_category[0])}>{currentMETAR.response?.data[0].METAR[0].raw_text[0]}</div>
                    </div>
                    <div className="weather__taf">
                        <div className="taf__title">TAF: </div>
                        <div className="taf__data--rawText">No TAF reported.</div>
                    </div>
                </div>
            </div>
        )
    } else if (!plainTextMode && currentTAF.response?.data[0].TAF) {
        return (
            <div className="airport__weather">
                <h3 className="weather__header">Current and Forecasted Weather</h3>
                <PlainTextButton plainTextMode={plainTextMode} setPlainTextMode={setPlainTextMode}/>
                <div className="weather__container">
                    <div className="weather__metar">
                        <div className="metar__title">METAR: </div>
                        <div className={determineMETARClass(currentMETAR.response?.data[0].METAR[0].flight_category[0])}>{currentMETAR.response?.data[0].METAR[0].raw_text[0]}</div>
                    </div>
                    <div className="weather__taf">
                        <div className="taf__title">TAF: </div>
                        <div className="taf__data--rawText">{currentTAF.response?.data[0].TAF[0].raw_text[0]}</div>
                    </div>
                </div>
            </div>
        )
    } else if (plainTextMode && !currentTAF.response?.data[0].TAF) {
        return (
            <div className="airport__weather">
                <h3 className="weather__header">Current and Forecasted Weather</h3>
                <PlainTextButton plainTextMode={plainTextMode} setPlainTextMode={setPlainTextMode}/>
                <div className="weather__container">
                    <div className="weather__metar">
                        <div className="metar__title">METAR: </div>
                        <div className={determineMETARClass(currentMETAR.response?.data[0].METAR[0].flight_category[0])}>
                            <div>Time: {convertTimestamp(currentMETAR.response?.data[0].METAR[0].observation_time[0])}</div>
                            <div>Wind: {currentMETAR.response?.data[0].METAR[0].wind_dir_degrees[0]}° at {currentMETAR.response?.data[0].METAR[0].wind_speed_kt[0]} kts</div>
                            <div>Visibility: {roundToWhole(currentMETAR.response?.data[0].METAR[0].visibility_statute_mi[0])} sm</div>
                            <div>Clouds (AGL): {currentMETAR.response?.data[0].METAR[0].sky_condition.map((layer, index) => 
                                {
                                    return <div key={index}>{convertStrToTitleCase(layer.$.sky_cover)} {layer.$.cloud_base_ft_agl}'</div>
                                }
                            )}
                            </div>
                            <div>Temperature: {roundToWhole(currentMETAR.response?.data[0].METAR[0].temp_c[0])}°C ({roundToWhole(convertCelciusToFahrenheit(currentMETAR.response?.data[0].METAR[0].temp_c[0]))}°F)</div>
                            <div>Dewpoint: {roundToWhole(currentMETAR.response?.data[0].METAR[0].dewpoint_c[0])}°C ({roundToWhole(convertCelciusToFahrenheit(currentMETAR.response?.data[0].METAR[0].dewpoint_c[0]))}°F)</div>
                            <div>Altimeter: {roundToTwoDec(currentMETAR.response?.data[0].METAR[0].altim_in_hg[0])} inHg</div>
                        </div>
                    </div>
                    <div className="weather__taf">
                        <div className="taf__title">TAF: </div>
                        <div className="taf__data--plainText">No TAF reported.
                        </div>
                    </div>
                </div>
            </div>
        )
    } else if (plainTextMode && currentTAF.response?.data[0].TAF) {
        return (
            <div className="airport__weather">
                <h3 className="weather__header">Current and Forecasted Weather</h3>
                <PlainTextButton plainTextMode={plainTextMode} setPlainTextMode={setPlainTextMode}/>
                <div className="weather__container">
                    <div className="weather__metar">
                        <div className="metar__title">METAR: </div>
                        <div className={determineMETARClass(currentMETAR.response?.data[0].METAR[0].flight_category[0])}>
                            <div>Time: {convertTimestamp(currentMETAR.response?.data[0].METAR[0].observation_time[0])}</div>
                            <div>Wind: {currentMETAR.response?.data[0].METAR[0].wind_dir_degrees[0]}° at {currentMETAR.response?.data[0].METAR[0].wind_speed_kt[0]} kts</div>
                            <div>Visibility: {roundToWhole(currentMETAR.response?.data[0].METAR[0].visibility_statute_mi[0])} sm</div>
                            <div>Clouds (AGL): {currentMETAR.response?.data[0].METAR[0].sky_condition.map((layer, index) => 
                                {
                                    return <div key={index}>{convertStrToTitleCase(layer.$.sky_cover)} {layer.$.cloud_base_ft_agl}'</div>
                                }
                            )}
                            </div>
                            <div>Temperature: {roundToWhole(currentMETAR.response?.data[0].METAR[0].temp_c[0])}°C ({roundToWhole(convertCelciusToFahrenheit(currentMETAR.response?.data[0].METAR[0].temp_c[0]))}°F)</div>
                            <div>Dewpoint: {roundToWhole(currentMETAR.response?.data[0].METAR[0].dewpoint_c[0])}°C ({roundToWhole(convertCelciusToFahrenheit(currentMETAR.response?.data[0].METAR[0].dewpoint_c[0]))}°F)</div>
                            <div>Altimeter: {roundToTwoDec(currentMETAR.response?.data[0].METAR[0].altim_in_hg[0])} inHg</div>
                        </div>
                    </div>
                    {/* { PT TAF to be built out } */}
                    {/* <div className="weather__taf">
                        <div className="taf__title">TAF: </div>
                        <div className="taf__data--plainText">
                            {currentTAF.response?.data[0].TAF[0].forecast.map((block, index) => 
                                {
                                    return <div key={index} className={determineTAFClass(block.sky_condition, block.visibility_statute_mi[0])}>
                                        <div>{convertTimestamp(block.fcst_time_from)}</div>
                                        <div>Wind: {block.wind_dir_degrees[0]}° at {block.wind_speed_kt[0]} kts</div>
                                        <div>Visibility: {roundToWhole(block.visibility_statute_mi)} sm</div>
                                        <div>Clouds (AGL): {block.sky_condition ? (
                                            block.sky_condition.map((layer, index) => {
                                                return <div key={index}>{convertStrToTitleCase(layer.$.sky_cover)} {layer.$.cloud_base_ft_agl}'</div>
                                            })
                                            ) : (
                                                <div>No info available</div>
                                                )
                                        } </div>
                                    </div>
                                }
                                
                            )}
                        </div>
                    </div> */}
                </div>
            </div>
        )
    }

}

