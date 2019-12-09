
const request = require('request');

const getIcon = (code) => {

    return "http://openweathermap.org/img/wn/" + code + "@2x.png"


}

module.exports = getIcon;