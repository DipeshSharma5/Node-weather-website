const request = require("request")

const weather = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c51bb3bc21bfbb97599224eb14adf75b&query='+ lat + ',' + long
    request({url, json:true}, (error, {body} = {}) => {
        if(error)
        callback('Unable to connect to network connection.')
        else if(body.error)
        callback(body.error)
        else
        callback(undefined, body.current.temperature)
    })
}

module.exports = weather