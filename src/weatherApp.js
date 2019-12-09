const request = require('request');


// citiesAndCountriesAPI = JSON.parse(citiesAndCountriesAPI);


const forecast = (town, country, units, callback) => {
    let data;
    const encodedCityName = encodeURIComponent(town);
    const encodedCountryName = encodeURIComponent(country);
    const weatherMapURL = `http://api.openweathermap.org/data/2.5/weather?q=${encodedCityName},${encodedCountryName}&units=${units}&APPID=66847054fb795da669ef22553d646349`


    request({url: weatherMapURL, json:true}, async (err, response )=> {

        if(err){
            console.log("ERROR: Cannot connect to API");
            
        }else if(response.body == undefined){
            callback({
                error: "That city does not exist!"
            });
            // console.log("That city does not exist - please chelck tyour slpellidng");
            
        }else{
       
            

            callback(response.body);

            data = response.body

            return data;
        }
       
    })

    
        

    // console.log("It is rainy in Manchester");

}




// console.log(countryList());




//     let list = countryList()

//     console.log(cityList(list[2]));
//     console.log("this is it " + cityList('SO'));
    
    

//     // let cityContryArray = ()=> {
//     //     let array = [];
//     //     for (let i = 0; i < subsetCitiesAndCountries.length; i++) {
//     //         let obj = {
//     //             city: subsetCitiesAndCountries[i].city.name,
//     //             country: subsetCitiesAndCountries[i].city.country
//     //         }
//     //         array.push(obj)
            
//     //     }
//     //     return array
//     // }

//     console.log(cityList());
    


module.exports = forecast;
