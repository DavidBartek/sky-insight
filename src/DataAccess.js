// Search Bar - fetches result suggestions to display to user
// to be added


// Airport Header - fetches data from FAA NASR (through api.aeronutical.info)
// include: demographic, ownership, geographic, runways
// note: api.aeronautical.info not included due to CORS errors. This was added as a "proxy" property in package.json.

export const fetchAirportInfo = (airportId) => {
    return fetch(`/dev/?airport=${airportId}&include=demographic&include=ownership&include=geographic&include=runways`)
        .then((res) => res.json())
        .then((airportData) => {
            return airportData
        })
        .catch((error) => {
            console.error('Error fetching airport data:', error)
            throw error
        })
}

// Comments - fetches data from json-server, comments array

export const fetchComments = (airportId) => {
    return fetch(`http://localhost:8088/comments?faaId=${airportId}&_expand=user`)
        .then((res) => res.json())
        .then((commentData) => {
            return commentData
        })
        .catch((error) => {
            console.error('Error fetching comment data:', error)
            throw error
        })
}