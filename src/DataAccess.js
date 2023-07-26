// Search Bar - fetches result suggestions to display to user
// to be added


// Airport Header - fetches 
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