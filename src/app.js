const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();


//Define paths for Express config

const publicDirectoryFolder = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handlebars view engine and location

app.set('view engine', 'hbs');
app.set('views', viewPath)
hbs.registerPartials(partialsPath);

// Set up static directory to serve


app.use(express.static(publicDirectoryFolder))


//Server Port

app.listen(5000, () => {
    console.log('Server is up on port 5000')
});


// Routes for pages


// index page

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Daniel'
    });
});

// about page

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Daniel'
    })
});

// help page

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'HELP',
        msg: 'Help will be provided soon',
        name: 'Daniel'
    })
});

// weather endpoint

app.get('/weather', (req, res) => {

    
    

    if (!req.query.city) {
        return res.send({
            error: 'You must provide a City name'
        })
    }
    
        geocode(req.query.city, (error, { lat, long, city } = {}) => {

            if (error) {
                return res.send({
                    error: error
                });
            }
            forecast(lat, long, (error, forecastData) => {
                const { temperature, feelslike, weather_descriptions } = forecastData;
                if (error) {
                    return res.send({
                        error
                    }) 
                }
                return res.send({
                    forecast: `It is ${weather_descriptions} throughout the day, currently ${temperature}°C and it feels like ${feelslike}°C`,
                    city,
                    address: req.query.city
                })
            })
        })
    
});

// Help articles

app.get('/help/*', (req, res) => {
    res.render('404', {
        name: 'Daniel',
        title: '404 not found',
        errorMsg: 'Help article not found'
    })
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

// 404 page

app.get('*', (req, res) => {
    res.render('404', {
        name: 'Daniel',
        title: '404 not found',
        errorMsg: 'Page could not be found'
    })
})

