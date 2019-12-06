const fs = require('fs');

const citiesAndCountriesAPI = JSON.parse(fs.readFileSync("./src/citylist.json"));
// const subsetCitiesAndCountries = JSON.parse(fs.readFileSync("./src/citylist1.json"));

let cityList = (countryCode)=> {                                    //finds all cities within given country
    let array = [];
    for (let i = 0; i < citiesAndCountriesAPI.length; i++) {
        if (citiesAndCountriesAPI[i].city.country == countryCode) {
            array.push(citiesAndCountriesAPI[i].city.name) 
        }  
    }
    return array
}

console.log(cityList("SO"));


module.exports = cityList;