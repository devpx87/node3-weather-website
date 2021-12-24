const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')

const app = express()

const port = process.env.PORT || 3000

const viewsPAth = path.join(__dirname, '../templates/views')
const viewPartials = path.join(__dirname, '../templates/partials')

hbs.registerPartials(viewPartials)

app.set('view engine', 'hbs')
app.set('views', viewsPAth)
app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) =>{
    res.render('index', {
        title: 'whether app',
        name: 'parixit'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About',
        name: 'parixit'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: 'address must be provided'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }

        forcast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })


})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'you must provide search team'
        })
    }

    console.log( req.query)
    res.send({
        products: []
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpmessage: 'do yourself',
        title: 'Help',
        name: 'parixit'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help',
        name: 'parixit',
        errorMessage: 'help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Help',
        name: 'parixit',
        errorMessage: 'page not found'
    })
})



app.get('/weather', (req, res) => {
    res.send({
        'forcast':'Freezing',
        'location': 'Junagadh'
    })
})

app.listen(port, () => {
    console.log('server up on ' + port)
})