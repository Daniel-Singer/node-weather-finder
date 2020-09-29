const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoidmlnb3JlbGxpIiwiYSI6ImNrZms2dXBqbzAwb3IyeHBqNzN0d2FvZnYifQ.wKLs8MrAawar5WtgTZxyLQ&limit=1`;
    
    request({url, json: true}, (error, {body} = {}) => {

        // const {[1]:long,[0]:lat} = res.body.features[0].center;
        
        // const {place_name:city} = res.body.features[0];
        
        if(error){
            callback('Unable to connect to service!', undefined);

        } else  if(body.features.length === 0){
            callback('Unable to find location. Try another search!', undefined)
        } else if(body.message){
            callback('Wrong URL', undefined)
        }
        else {
            const data = body.features[0]
            callback(undefined, {
                long: data.center[1],
                lat: data.center[0],
                city: data.place_name
            })
        }
    })
}

module.exports = geocode;