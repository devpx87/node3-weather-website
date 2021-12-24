const request = require('request')

const forcast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=713e441b428d2bd6a1f481670d6a509d&query=' + 
    latitude + ',' + longitude + '&units=f'

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degress out.")
        }
    })
}

module.exports = forcast