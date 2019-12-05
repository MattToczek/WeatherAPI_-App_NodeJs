const express = require('express');
const path = require('path');
const hbs = require('hbs');

//this is convention but I guess it's not actually needed, we could just refer to express directly
const app = express();

// Goes from current folder (__dirname) then sets path to public 
// folder (folders that contain the index.html etc.)
const publicDirectory = path.join(__dirname,'../public')

app.use(express.static(publicDirectory))

const viewsPath = path.join(__dirname, '../templates/views')

const partialPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialPath);

// telling node to use hbs (handle bars) page setup
// used to create dynamic pages (as opposed to static)
app.set('view engine', 'hbs'); 
app.set('views', viewsPath);

app.get('/', (req, res) => {
    res.render('index', {
        title: "Weather App",
        author: "Matt"
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "Weather App",
        author: "Matt"
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
        {
            forecast: 'It is sunny!',
            location: 'Manchester'
        }
    );
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