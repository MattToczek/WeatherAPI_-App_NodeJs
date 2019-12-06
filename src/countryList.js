const fs = require('fs');

const citiesAndCountriesAPI = JSON.parse(fs.readFileSync("./src/citylist.json"));
// const subsetCitiesAndCountries = JSON.parse(fs.readFileSync("./src/citylist1.json"));

let countryList = ()=> {                                            // finds all countries and adds them only once to array

    let arrayOfCountries = [citiesAndCountriesAPI[0].city.country]
    let arrayOfObjects = [{
                country: citiesAndCountriesAPI[0].city.country,
                cities: [citiesAndCountriesAPI[0].city.name]
            }]

    for (let i = 1; i < citiesAndCountriesAPI.length; i++) {
        
        if (!arrayOfCountries.includes(citiesAndCountriesAPI[i].city.country)) {
            arrayOfCountries.push(citiesAndCountriesAPI[i].city.country)
            arrayOfObjects.push({
                country: citiesAndCountriesAPI[i].city.country,
                cities: [citiesAndCountriesAPI[i].city.name]
            })

        }else{
            arrayOfObjects[arrayOfCountries.indexOf(citiesAndCountriesAPI[i].city.country)].cities.push(citiesAndCountriesAPI[i].city.name)
            //     country: citiesAndCountriesAPI[i].city.country,
            //     cities: [...cities, ]
            // })
        }
    }    

    let arrayAndObjects = [arrayOfCountries, arrayOfObjects];

    return arrayAndObjects;

}

module.exports = countryList;