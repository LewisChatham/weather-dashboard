var API_KEY = "142a101a55377d96cb27c888467295e4"

function generateUrl(city) {
    return `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
}

function requestWeatherInfo(city) {
    var Url = generateUrl(city);

    return fetch(Url) 
    .then(function (res) {
        return res.json();
    })
}