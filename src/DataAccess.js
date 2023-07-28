const localAPI = `http://localhost:8088`

// Search Bar - fetches result suggestions to display to user
// to be added


// Airport Header - fetches data from FAA NASR (through api.aeronutical.info)
// include: demographic, ownership, geographic, runways
// note: api.aeronautical.info not included in the url below due to CORS errors.
// As a workaround, this url was added as a "proxy" property in package.json.

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

// Comments - fetches comments array from json-server (READS)

export const fetchComments = (airportId) => {
    return fetch(`${localAPI}/comments?faaId=${airportId}&_expand=user`)
        .then((res) => res.json())
        // .then((commentData) => {
        //     return commentData
        // })
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
        // .then(() => {
        //     fetchComments(commentObj.faaId)
        // })
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
        // .then(() => {
        //     fetchComments(commentObj.faaId)
        // })
}

// Comments - DELETES selected comment in json-server comments array

export const deleteComment = (commentId, faaId) => {
    return fetch(`${localAPI}/comments/${commentId}`, {
        method: "DELETE",
        }
    )
        // .then(() => {
        //     fetchComments(faaId)
        // })
}