
 const weatherForm = document.querySelector('form');
 const search = document.querySelector('input');

const title = document.getElementById('title');
const cityName = document.getElementById('city');
const temp = document.getElementById('temp');

weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    const city = search.value;
    title.textContent = "Loading...";

    fetch('http://localhost:3010/api2?city=' + city + '&country=uk').then((response) => { 
        response.json().then((data)=> {
            console.log(data);
            if (data.error) {
                console.log(data.error);
                title.textContent = data.error;
                cityName.textContent = '';
                currentTemp.textContent = '';
            } else {
                title.textContent = 'Current forecast for';
                cityName.textContent = data.city;
                currentTemp.textContent = 'Temp: ' + data.temp + 'c';
                console.log(data.city);
                console.log(data.temp);
            }
        })
    })
})