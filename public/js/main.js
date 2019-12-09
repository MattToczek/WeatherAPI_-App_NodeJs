console.log("Javascript enabled");

let countryCode;
let cities;
const countryName = document.getElementById("countrySelect");
const weatherForm = document.querySelector('form');
const search = document.querySelector('goBtn');
const title = document.querySelector('title');

// const city = document.getElementById("citySelect");
const cityName = document.getElementById('citySelect');
const currentTemp = document.getElementById('temp');
const locationOutput = document.getElementById('locationOutput');
const weatherOutput = document.getElementById('weatherOutput');
const tempOutput = document.getElementById('tempOutput');
const icon = document.getElementById('icon');
const body = document.getElementById('body')
let data;

icon.style.display = 'none';

let removeAll = (c) => { 
    let first = c.firstElementChild;
    while (c.firstElementChild) { 
        first.remove(); 
        first = c.firstElementChild; 
    } 
}

countryName.onchange = (e)=>{

    removeAll(cityName);

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
        cityName.appendChild(opt); 
    });

}

fetch('http://localhost:3010/api')                  // fetches data from api that is made in app.js
  .then(response => response.json())
//   .then(json => console.log(json))
  
  .then(json => data=json)

  weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    const country = countryName.value;
    const city = cityName.value;
    title.textContent = "Loading...";

  
 fetch('http://localhost:3010/api3?city=' + city + '&country=' + country).then((response) => { 
        response.json()
        .then((data)=> {
            console.log(data);
            if (data.error) {
                console.log(data.error);
                title.textContent = data.error;
                locationOutput.textContent = '';
                tempOutput.textContent = '';
                weatherOutput.textContent = '';
            } else {
                title.textContent = 'Current forecast for';
                locationOutput.textContent = 'City: ' + data.cityName + ', ' + data.country ;
                tempOutput.textContent = 'Temp: ' + data.temperature + 'c';

                if (data.weather == "Clouds") {
                    weatherOutput.textContent = 'The weather in ' + data.cityName + ' today is cloudy.';            //corrects clouds to cloudy to make gramatical sense
                }else{
                weatherOutput.textContent = 'The weather in ' + data.cityName + ' today is ' + data.weather + '.';
                }
                console.log(data.icon);
                icon.style.display = 'inline-block';
                icon.src = data.icon;

                console.log(data.weather);
                console.log(data.temperature);

                switch (true) {
                    case (data.weather == "Clouds"):
                        console.log("its clouds");
                        console.log(data.weather);
                        body.className = 'cloud';
                        break;
                    case (data.weather == "Rain"):
                        console.log("its Rain");
                        console.log(data.weather);
                        body.className = 'rain';
                        break;
                    case (data.temperature <= 10):
                        console.log("its cold");
                        console.log(data.temperature);
                            body.className = 'cold';
                        break
                    case (data.temperature >= 10):
                        console.log("its hot");
                        console.log(data.temperature);
                        body.className = 'hot';
                        break
                    default:
                        break;
                }
                
            }
        })
    })
})

