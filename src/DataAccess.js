const localAPI = `http://localhost:8088`
const expressServer = `http://localhost:9001`

// Login - fetches specified email

export const fetchLogin = (email) => {
    return fetch(`${localAPI}/users?email=${email}`)
        .then((res) => res.json())
        .then(foundUsers => {
            return foundUsers
        })
        .catch((error) => {
            console.error(`Error fetching user data:`, error)
            throw error
        })
}

// Search Bar - fetches result suggestions to display to user
// pulls from json-server

export const fetchSearchSuggestions = () => {
    return fetch(`${localAPI}/airports`)
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

// Airport Diagrams - fetches current cycle (7/13/23) from local json-server
// only a sample database: // sample list: "KBNA", "KXNX", "KJWN", "M54", "KMQY", "KJFK", "KDFW", "KDEN", "KAPA", "KBJC", "KASE", "KBDU", "KCFO", "KSRB", "KSYI"
// < Class D airports have empty string for url
// the links will deprecate after they expire (next: Oct 5). Parent URL: https://aeronav.faa.gov/d-tpp/

export const fetchAirportDiagram = (airportId) => {
    return fetch(`${localAPI}/airportDiagramsSample?faaId=${airportId}`)
        .then((res) => res.json())
        .then((data) => {
            return data
        })
        .catch((error) => {
            console.error(`Error fetching airport diagram data:`, error)
            throw error
        })
}

// Chart Supplements - fetches current cycle (6/15/23) from local json-server
// only a sample database: // sample list: "KBNA", "KXNX", "KJWN", "M54", "KMQY", "KJFK", "KDFW", "KDEN", "KAPA", "KBJC", "KASE", "KBDU", "KCFO", "KSRB", "KSYI"
// the links will deprecate after they expire (next: Oct 30). Parent URL: https://aeronav.faa.gov/afd/

export const fetchChartSupplement = (airportId) => {
    return fetch(`${localAPI}/chartSupplementsSample?faaId=${airportId}`)
        .then((res) => res.json())
        .then((data) => {
            return data
        })
        .catch((error) => {
            console.error(`Error fetching chart supplement data:`, error)
            throw error
        })
}

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

// Profile Page Favorite Airports - fetches given user's favorite airports

export const fetchFavoriteAirports = (userId) => {
    return fetch(`${localAPI}/favorites?userId=${userId}`)
        .then((res) => res.json())
        .then((data) => {
            return data
        })
        .catch((error) => {
            console.error(`Error fetching favorites data:`, error)
            throw error
        })
}

// Airport Page Favorite Airport - fetches given user's favorite airports AND specifies airport

export const fetchFavoriteAirportSingle = (userId, airportId) => {
    return fetch(`${localAPI}/favorites?userId=${userId}&faaId=${airportId}`)
        .then((res) => res.json())
        .then((data) => {
            return data
        })
        .catch((error) => {
            console.error(`Error fetching favorites data:`, error)
            throw error
        })
}

// Airport Page - posts new favorite airport object to json-server

export const addFavoriteAirport = (favoriteObj) => {
    return fetch(`${localAPI}/favorites`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(favoriteObj)
    })
        .then(res => res.json())
}

// Airport Page - deletes favorite object from json-server

export const deleteFavoriteAirport = (favoriteId) => {
    return fetch(`${localAPI}/favorites/${favoriteId}`, {
        method: "DELETE"
        }
    )
}


/* Deprecated */

// Airport Diagrams - fetches airport diagram via airport-diagrams npm library
// this npm library is broken; chart supplements ok for now

// const airportDiagrams = require("airport-diagrams")
// export const fetchAirportDiagram = async (airportId) => {
//     const diagrams = await airportDiagrams.list(`K${airportId}`)
//     return JSON.stringify(diagrams, null, 2)
// }

// Chart Supplements - 3rd party node library fetch by way of express server. Sometimes takes 20 sec, sometimes nothing ever comes.
// export const fetchChartSupplement = (airportId) => {
//     return fetch(`${expressServer}/chartSupplement/${airportId}`)
//         .then(res => res.json())
//         .then(chartSupplementObj => {
//             return chartSupplementObj
//         })
//         .catch((error) => {
//             console.error('Error fetching chart supplement data:', error)
//             throw error
//         })
// }