const fs = require('fs');

const citiesAndCountriesAPI = JSON.parse(fs.readFileSync("./src/citylist.json"));
// const subsetCitiesAndCountries = JSON.parse(fs.readFileSync("./src/citylist1.json"));

let countryList = ()=> {                                            // finds all countries and adds them only once to array
    let arrayOfCountries = [];
    

    for (let i = 0; i < citiesAndCountriesAPI.length; i++) {
        
        if (!arrayOfCountries.includes(citiesAndCountriesAPI[i].city.country)) {
            arrayOfCountries.push(citiesAndCountriesAPI[i].city.country)
    }
}    

    return arrayOfCountries;

}

module.exports = countryList;