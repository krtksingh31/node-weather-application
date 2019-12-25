const request = require('request')

const GEOCODE_URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
const ACCESS_TOKEN = 'pk.eyJ1Ijoia2FydGlrc2kiLCJhIjoiY2p0NW5vaTQwMDV3bjN5dG1hY3I1MWRtayJ9._q2EYPgOB4WHe59qni4Xvw&limit=1'

const geocode = (address, callback) => {
    const url = GEOCODE_URL + encodeURIComponent(address) + '.json?access_token=' + ACCESS_TOKEN

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to geo-service', undefined)
        } else if (response.body.features.length === 0) {
            callback('The request URL seems to be incorrect.', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;