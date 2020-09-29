const request = require('request');

const forecast = (long, lat, callback) => {

    const url = `http://api.weatherstack.com/current?access_key=48867b8a6a61569e722d46727a95d2fa&query=${lat},${long}&units=m`
    
    request({ url, json:true }, (error, response) => {
        const {temperature, feelslike, weather_descriptions} = response.body.current;
        if (error) {
            callback('Unable to connect to service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, {
                temperature,
                feelslike,
                weather_descriptions
                
            })
        }
    })
}

module.exports = forecast;