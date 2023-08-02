const localAPI = `http://localhost:8088`
const expressServer = `http://localhost:9001`

// Search Bar - fetches result suggestions to display to user
// pulls from json-server

export const fetchSearchSuggestions = () => {
    return fetch("http://localhost:8088/airports")
        .then((res) => res.json())
        .then((data) => {
            return data
        })
        .catch((error) => {
            console.error(`Error fetching searchbar suggestion data:`, error)
            throw error
        })
}


// Airport Header - fetches data from FAA 28-Day NASR (through api.aeronutical.info) by way of local Node Express server
// includes: demographic, ownership, geographic, runways

export const fetchAirportInfo = (airportId) => {
    return fetch(`${expressServer}/airport/${airportId}`)
        .then((res) => res.json())
        .then((airportData) => {
            return airportData
        })
        .catch((error) => {
            console.error('Error fetching airport data:', error)
            throw error
        })
}

// Weather (METAR) - fetches data from aviationweather.gov ADDS Text Data Server by way of local Node Express server

export const fetchMETAR = (airportId) => {
    return fetch(`${expressServer}/metar/${airportId}`)
        .then(res => res.json())
        .then(metarData => {
            return metarData
        })
        .catch((error) => {
            console.error('Error fetching METAR data:', error)
            throw error
        })
}

// Weather (TAF) - fetches data from aviationweather.gov ADDS Text Data Server by way of local Node Express server

export const fetchTAF = (airportId) => {
    return fetch(`${expressServer}/taf/${airportId}`)
        .then(res => res.json())
        .then(tafData => {
            return tafData
        })
        .catch((error) => {
            console.error('Error fetching TAF data:', error)
            throw error
        })
}

// Frequencies - fetches data from FAA 28-Day NASR, current cycle (7/13/23) saved to local json-server

export const fetchFrequencies = (airportId) => {
    return fetch(`${localAPI}/frequencies/?SERVICED_FACILITY=${airportId}`)
        .then(res => res.json())
        .then(freqData => {
            return freqData
        })
        .catch((error) => {
            console.error('Error fetching frequency data:', error)
            throw error
        })
}

// Airport Diagrams - fetches airport diagram via airport-diagrams npm library

const airportDiagrams = require("airport-diagrams")

export const fetchAirportDiagram = async (airportId) => {
    const diagrams = await airportDiagrams.list(`K${airportId}`)
    return JSON.stringify(diagrams, null, 2)
}

// Chart Supplements

const chartSupplements = require("chart-supplements")

export const fetchChartSupplement = (airportId) => {
    chartSupplements.list(`K${airportId}`)
        .then(results => {
            return results
        })
}


// Airport Diagrams
// this works in its own .js file. Logs to console.
// const airportDiagrams = require("airport-diagrams");

// const test = async () => {
//     const cycle = await airportDiagrams.fetchCurrentCycle()
//     console.log("Current Cycle", cycle)

//     const diagrams = await airportDiagrams.list("KBNA")
//     console.log(JSON.stringify(diagrams, null, 2))
// }

// test().then()

// Comments - fetches comments array from json-server (READS)

export const fetchComments = (airportId) => {
    return fetch(`${localAPI}/comments?faaId=${airportId}&_expand=user`)
        .then((res) => res.json())
        .catch((error) => {
            console.error('Error fetching comment data:', error)
            throw error
        })
}

// Comments - ADDS new comment to json-server comments array

export const postComment = (commentObj) => {
    return fetch(`${localAPI}/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(commentObj)
    })
        .then(res => res.json())
}

// Comments - UPDATES selected comment in json-server comments array

export const modifyComment = (commentObj) => {
    return fetch(`${localAPI}/comments/${commentObj.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(commentObj)
    })
        .then(res => res.json())
}

// Comments - DELETES selected comment in json-server comments array

export const deleteComment = (commentId) => {
    return fetch(`${localAPI}/comments/${commentId}`, {
        method: "DELETE"
        }
    )
}