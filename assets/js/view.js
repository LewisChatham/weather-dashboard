var citySelectionForm = $("#city-selection-form");
var citySelectionInput = $("#city-selection-input");
var forecastEl = $("#forecast")
var currentEl = $("#currentWeather")
var historyEl = $("#history")


loadSearchHistory()

function loadSearchHistory () {
    removeAllChildren(historyEl)
    var cities = JSON.parse(localStorage.getItem("cities"))
    if (cities !== null) {
        for (let i = 0; i < cities.length; i++) {
            var city = $("<input type='button' class='city-btn'>")
            city.attr("value", cities[i])
            historyEl.append(city)
        }
    }
}


function loadFromHistory (event) {
    var target = event.target
    if (target.value == undefined) {
        return
    }    
    var city = target.value
    removeAllChildren(forecastEl);
    removeAllChildren(currentEl);
    requestWeatherInfo(city).then(function (data) {
        var days = data.list;
        var currentWeatherInfo = formatWeatherInfo(days[0])
        var currentCard = createWeatherCard(currentWeatherInfo)
        appendCurrentCard(city, currentCard)

        for (var i = 0; i < days.length; i = i + 8) {
            var formattedWeatherInfo = formatWeatherInfo(days[i])
            var card = createWeatherCard(formattedWeatherInfo)
            appendWeatherCard(card)
        }
    })
}


function formatWeatherInfo(weatherInfo) {
    var dateTime = weatherInfo.dt_txt
    var date = dateTime.split(" ")[0]
    var icon = weatherInfo.weather[0].icon
    var temp = weatherInfo.main.temp
    var windSpeed = weatherInfo.wind.speed
    var humidity = weatherInfo.main.humidity
    

    return {
        date: date,
        icon: icon,
        temp: temp,
        windSpeed: windSpeed,
        humidity: humidity
    }
}

function createWeatherCard(weatherInfo) {
    var {date, icon, temp, windSpeed, humidity} = weatherInfo

    var card = $("<div class='weather-card'>")

    var iconEl = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + icon + "@2x.png")
    var dateEl = $("<h3>").text(date)
    var tempEl = $("<p>").text("Temp: " + temp + "°C")
    var windSpeedEl = $("<p>").text("Wind Speed: " + windSpeed + "kt")
    var humidityEl = $("<p>").text("Humidity: " + humidity + "SI")
    
    card.append(iconEl)
    card.append(dateEl)
    card.append(tempEl)
    card.append(windSpeedEl)
    card.append(humidityEl)

    return card
}

function appendWeatherCard(card) {
    forecastEl.append(card)
}

function appendCurrentCard(selectedCity, card) {
    var cityEl = $("<h3>").text(selectedCity)
    currentEl.append(cityEl)
    currentEl.append(card)
}

function saveSelectedCity (city) {
    var cities = JSON.parse(localStorage.getItem("cities"))
    if (cities === null) {
        cities = [city]
    } else {
        if (!cities.includes(city)) {
            cities.splice(0, 0, city)
        }
    }

    localStorage.setItem("cities", JSON.stringify(cities))
}

function removeAllChildren (parent) {
    parent.empty()
}

historyEl.on("click", loadFromHistory)

citySelectionForm.on("submit", function (event) {
    event.preventDefault();
    removeAllChildren(forecastEl);
    removeAllChildren(currentEl);

    var selectedCity = citySelectionInput.val()

    saveSelectedCity(selectedCity)
    loadSearchHistory()


    requestWeatherInfo(selectedCity).then(function (data) {
        var days = data.list;
        var currentWeatherInfo = formatWeatherInfo(days[0])
        var currentCard = createWeatherCard(currentWeatherInfo)
        appendCurrentCard(selectedCity, currentCard)

        for (var i = 0; i < days.length; i = i + 8) {
            var formattedWeatherInfo = formatWeatherInfo(days[i])
            var card = createWeatherCard(formattedWeatherInfo)
            appendWeatherCard(card)
        }
    })
})

