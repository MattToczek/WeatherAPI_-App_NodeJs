console.log("Javascript enabled");

let countryCode;
let cities;
let country = document.getElementById("countrySelect");
let data;

country.onchange = (e)=>{
    countryCode =  e.target.value; 
    console.log(countryCode);

    for (let i = 0; i < data.length; i++) {
        if (countryCode == data[i].country) {
            console.log(data[i]);
            
            cities = data[i].cities;
        }
        
    }
    console.log(cities);
    
    // console.log(cities(countryCode));
}

fetch('http://localhost:3010/api')
  .then(response => response.json())
//   .then(json => console.log(json))
  
  .then(json => data=json)



