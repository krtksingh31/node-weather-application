const request = require('request')

const WEATHER_FORECAST_URL = 'https://api.darksky.net/forecast/8ad491316c900634eb05f7414fcfc272/'

const forecast = (latitude, longitude, callback) => {
    const latLong = latitude + ',' + longitude
    const url = WEATHER_FORECAST_URL + latLong + '?units=si'

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service.', undefined);
        } else if (response.body.error) {
            callback('Unable to find the location.', undefined);
        } else {
            callback(undefined, {
                summary: response.body.daily.data[0].summary,
                temperature: response.body.currently.temperature,
                precipProbability: response.body.currently.precipProbability
            })
        }
    })
}

module.exports = forecast;