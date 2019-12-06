console.log("Javascript enabled");

let countryCode;
let country = document.getElementById("countrySelect");

country.onchange = (e)=>{
    countryCode =  e.target.value; 
    console.log(countryCode);
    
    console.log(cities(countryCode));
}



let restrictCities = ()=>{
    
}

