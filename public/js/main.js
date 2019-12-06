console.log("Javascript enabled");

let countryCode;
let cities;
let country = document.getElementById("countrySelect");
let city = document.getElementById("citySelect");
let data;

let removeAll = (c) => { 
    let first = c.firstElementChild;
    while (c.firstElementChild) { 
        first.remove(); 
        first = c.firstElementChild; 
    } 
}

country.onchange = (e)=>{

    removeAll(city);

    countryCode =  e.target.value; 
    console.log(countryCode);

    for (let i = 0; i < data.length; i++) {
        if (countryCode == data[i].country) {
            console.log(data[i]);
            
            cities = data[i].cities;
        }
        
    }
    console.log(cities);

    cities.forEach((element, key) => {
        // create new option element
        let opt = document.createElement('option');

        // create text node to add to option element (opt)
        opt.appendChild( document.createTextNode(element) );

        // set value property of opt
        opt.value = element; 
        opt.key = key;

        // add opt to end of select box (sel)
        city.appendChild(opt); 
    });

}

fetch('http://localhost:3010/api')                  // fetches data from api that is made in app.js
  .then(response => response.json())
//   .then(json => console.log(json))
  
  .then(json => data=json)
  






