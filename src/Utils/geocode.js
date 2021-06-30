const request = require("request")

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiZGlwZXNoNSIsImEiOiJja3FnajMwcWgxY292MndudjJiamFwMTR1In0.ksf9JpP_e5If9XZjnGGLew'
    request({url, json:true}, (error,{body} = {}) => {
        if(error)
        callback('Unable to connect to network connection')
        else if(body.message)
        callback(body.message)
        else if(body.features.length === 0)
        callback('Unable to find the location')
        else
        callback(undefined, {
            lat: body.features[0].center[1],
            long: body.features[0].center[0],
            location: body.features[0].place_name
        })
    })
}

module.exports = geocode