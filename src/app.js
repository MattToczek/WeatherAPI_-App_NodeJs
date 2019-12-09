const express = require('express');
const path = require('path');
const hbs = require('hbs');
const weather = require('./weatherApp.js');
const fs = require('fs');
const countries = require('./countryList.js')
const getIcon = require('./icon.js')

// const countryCode = require('./public/js/main.js')

//this is convention but I guess it's not actually needed, we could just refer to express directly
const app = express();

// Goes from current folder (__dirname) then sets path to public 
// folder (folders that contain the index.html etc.)
const publicDirectory = path.join(__dirname,'../public')

// console.log(document.getElementById('goBtn'));

app.use(express.static(publicDirectory))

const viewsPath = path.join(__dirname, '../templates/views')

const partialPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialPath);

// telling node to use hbs (handle bars) page setup
// used to create dynamic pages (as opposed to static)
app.set('view engine', 'hbs'); 
app.set('views', viewsPath);

let data= {
    name: "",
    main: {temp: ""}
};

// weather("bradford", "uk", "metric", (response) => {                 // callback passed into the function as parameter to allow for delay in API
//         data = response;                                            // updates data from whatever is returned by callback (set in weatherApp.js)
//     });


// let city = document.getElementsByClassName("city");





app.get('/', (req, res) => {
    res.render('index', {
        title: "Weather App",
        author: "Matt",
        countryList: htmlElementCountry,
        // cityList: htmlElementCity,
        // data: data.weather[0].main
    });
})

let tempArray = countries();

let countryList = tempArray[0];
// let cityList = cities('SO');
// console.log("tis is it" + cityList);


let createList = (array, id)=> {                            //returns a select menu populated with countries or cities (string)
    let lis = "";
    for (let index = 0; index < array.length; index++) {

        lis += `<option>${array[index]}</option>`;  
        // console.log(lis);
    }
    let ul = `<select id=${id}>${lis}</select>`;
    return ul
}








let htmlElementCountry = createList(countryList.sort(), "countrySelect")
// let htmlElementCity = createList(cityList, "citySelect")
// console.log(htmlElement);


app.get('/about', (req, res) => {
    res.render('about', {
        title: "Weather App",
        author: "Matt",

    });
})

// app.get('/about', (req,res) => {
//     res.send('Welcome to ABOUT')
// })

app.get('/contact', (req,res) => {
    res.send('<h1>Welcome to CONTACT</h1>');
})

app.get('/api', (req, res) => {
    res.send(
        tempArray[1]
    );
})

app.get('/api2', (req,res) => {
    
    if(!req.query.city){
        res.send({
            error: 'Please enter a city name'
        })
    } 
    else{
        weather(req.query.city, "uk", "metric", (response) => {                 // callback passed into the function as parameter to allow for delay in API
            // data = response;                                            // updates data from whatever is returned by callback (set in weatherApp.js)
            if(response.error){
                res.send({
                    error: response.error
                })
                
            }else{
                res.send({
                    cityName: req.query.city,
                    temperature: response.main.temp
                })
            }
        });

        console.log(req.query);


    }   
})

app.get('/api3', (req,res) => {
    
    if(!req.query.city || !req.query.country){
        res.send({
            error: 'Please enter a country and city name'
        })
    } 
    else{
        weather(req.query.city, req.query.country, "metric", (response) => {                 // callback passed into the function as parameter to allow for delay in API
            // data = response;                                            // updates data from whatever is returned by callback (set in weatherApp.js)
            if(response.error){
                res.send({
                    error: response.error
                })
                
            }else{

                res.send({
                    cityName: req.query.city,
                    temperature: response.main.temp,
                    weather: response.weather[0].main,
                    country: req.query.country,
                    icon:  "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png"
                })
            }
        });

        


    }   
})

app.get('/weather', (req,res) => {
    

    res.render('weather', {
        cityName: data.name,
        temperature: data.main.temp
    })
})

// catch statement to give error read for wrong path
app.get('*', (req, res) => {               
    res.send('<h1>404 your page does not exist</h1>')
})

console.log(__dirname);
console.log(__filename);

app.listen(3010, () => {
    console.log(`server's running`);
})