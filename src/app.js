const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views custom location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        description: 'Drop your location and we\'ll find its forecast!'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        description: 'Hi! I\'m Kartikey Singh!'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        description: 'Need help? Call me @9811398375'
    })
})

// app.com/weather
app.get('/weather', (req, res) => {
    console.log(req.query)
    if (!req.query.address) {
        return res.send({
            title: 'Weather Details',
            error: 'ERROR! Please provide a valid address.'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude , location } = {}) => {
        if (error)
            return res.send({ error });
        forecast(latitude, longitude, (error, { summary, temperature, precipProbability } = {}) => {
            if (error)
                return res.send({ error });

            res.send({
                location, summary, temperature
            })
        })
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'HTTP 404: Page Not Found.',
        errorMessage: 'Sorry, the HELP article you\'re looking for doesn\'t exist.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'HTTP 404: Page Not Found.',
        errorMessage: 'Sorry, the page you\'re looking for doesn\'t exist.'
    })
})
app.listen(port, () => {
    console.log(`Click this link to open up the application: http://localhost:${port}/`)
})