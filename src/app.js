const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./Utils/geocode.js')
const forecast = require('./Utils/forecast.js')

const app = express()

//define path for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
hbs.registerPartials(partialsPath)
app.set('view engine','hbs')
app.set('views',viewsPath)  // don't need this if the name of the file is views instead of templates (default value is views)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {  
    res.render('index',{
        title:'Weather',
        name:'Dipesh'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title:'HELP ENVIRONMENT',
        name:'DEEPU'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title:'ABOUT WEATHER',
        name:"DIPU"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address)
    return res.send({
        error: 'You must provide an address.'
    })

    geocode(req.query.address,(error, {lat, long, location} = {}) => {
        if(error)
        return res.send({
            error
        })

        // console.log(lat, long)
    
        forecast(lat, long, (error, forecastdata) => {
            if(error)
            return res.send({
                error
            })
    
            // console.log(forecastdata)
            // console.log(location)

            res.send({
                address: req.query.address,
                forecastdata,
                location
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title:'404',
        name:'Dipesh',
        errormsg: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title:'404',
        name:'Dipesh',
        errormsg: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('The server is running on port 3000.')
})