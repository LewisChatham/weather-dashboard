var API_KEY = "142a101a55377d96cb27c888467295e4"

function generateUrl(city) {
    var NUMBER_OF_DAYS = 5;

    return `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=${NUMBER_OF_DAYS}&appid=${API_KEY}`
}

function makeRequest(Url) {
    return fetch(Url).then(function (res) {
        return res.json();
    })
}