const weatherCardComponent = function () {
    return `
    <div class="card-container">
        <button id="favourite">
            <i class="fa-solid fa-heart"></i>
        </button>

        <section class="weather-section">
            <img src="" class="icon" alt="icon">
            <h1 class="temp"></h1>
            <div class="hl"></div>
            <div id="wind-humidity">
                <div id="wind"><i class="fa-solid fa-wind"></i>
                    <p class="wind"></p>
                </div>
                <div id="humidity"><img src="humidity.svg">
                    <p class="humidity"></p>
                </div>
            </div>

            <div class="actual-city">
                <h2 class="name-city"></h2>
            </div>

            <div class="more-details">
                <form id="location-input" action="#" autocomplete="on">
                    <input list="fav-cities" type="text" class="search" placeholder="Enter another city...">
                    <datalist id="fav-cities">
                        <option value="Békéscsaba">
                        <option value="Budapest">
                        <option value="Debrecen">
                        <option value="Dunaújváros">
                        <option value="Eger">
                        <option value="Győr">
                        <option value="Hódmezővásárhely">
                        <option value="Kaposvár">
                        <option value="Kecskemét">
                        <option value="Miskolc">
                        <option value="Nagykanizsa">
                        <option value="Nyíregyháza">
                        <option value="Pécs">
                        <option value="Salgótarján">
                        <option value="Sopron">
                        <option value="Szeged">
                        <option value="Szekszárd">
                        <option value="Székesfehérvár">
                        <option value="Szolnok">
                        <option value="Szombathely">
                        <option value="Tatabánya">
                        <option value="Veszprém">
                        <option value="Zalaegerszeg">
                    </datalist>
                    <div class="vl"></div>
                    <button type="submit" id="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
                </form>
                <h4 class="time">22:00</h4>

            </div>

        </section>
    </div>
    `
}

console.log("lekérjük")
let icon;
let temp;
let nameOutput;
let windOutput;
let humidityOutput;
let form;
let search;
let btn;
let heartButton;
let heartIcon;
let timeOutput;
let dropDownCity;
let favoriteCities;

// ------ All capitals of the world
let allCityArrayFunction = function () {
    let allCities = [];
    for (city of citiesAll) {
        allCities.push(city.city)
        allCities.sort()
    }
    return allCities
}
let allCityArray = allCityArrayFunction()

// ------ Create options from an array
let newCityOptionNew = function () {
    for (let i = 0; i < allCityArray.length; i++) {
        let newCityName = allCityArray[i]
        let newCityOption = document.createElement("OPTION")
        newCityOption.textContent = newCityName
        dropDownCity.appendChild(newCityOption)
    }
}

// ------ Label of the chosen city in the middle
function blackSection(cityName) {
    let generatedCityName = document.querySelector(".name-city")

    generatedCityName.innerHTML = cityName
}
let getCitydata = function () {
    return search.value
}

function fetchWeatherData(cityInput) {
    fetch(`https://api.weatherapi.com/v1/current.json?key=4be9c70adbdd44848ca81837221705&q=${cityInput}`)
        .then(response => response.json())
        .then(data => {
            icon.src = data.current.condition.icon;
            temp.innerHTML = data.current.temp_c + "°C";
            windOutput.innerHTML = data.current.wind_kph + "kph";
            humidityOutput.innerHTML = data.current.humidity + "%";
            nameOutput.innerHTML = data.location.name;
            timeOutput.innerHTML = data.location.localtime.substr(11);
        })
}

let submitListener = function () {
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        let city = getCitydata();
        heartIcon.classList.remove("change");

        if (city === "") {
            alert("Please enter a city name!")
            blackSection("Budapest");
            fetchWeatherData("Budapest");
        } else {
            blackSection(city);
            fetchWeatherData(city);
        }
    })
}

// recolor like button
const likeEvent = function () {
    heartButton.addEventListener("click", function () {
        heartIcon.classList.toggle("change");

        const newOption = document.createElement("OPTION");
        const optionContent = document.createTextNode(search.value);

        newOption.appendChild(optionContent);

        favoriteCities.insertBefore(newOption, favoriteCities.firstChild);
    })
}

const loadEvent = function () {
    const rootElement = document.getElementById("root");

    console.log("beszúrjuk")
    rootElement.insertAdjacentHTML("beforeend", weatherCardComponent());

    icon = document.querySelector(".icon");
    temp = document.querySelector(".temp");
    nameOutput = document.querySelector(".name-city");
    windOutput = document.querySelector(".wind");
    humidityOutput = document.querySelector(".humidity");
    form = document.getElementById("location-input");
    search = document.querySelector(".search");
    btn = document.getElementById("submit");
    heartButton = document.getElementById("favourite");
    heartIcon = document.querySelector(".fa-solid.fa-heart");
    timeOutput = document.querySelector(".time");
    dropDownCity = document.querySelector("#fav-cities");
    favoriteCities = document.querySelector("#fav-cities")

    fetchWeatherData("Budapest");
    getCitydata("Budapest");
    blackSection();
    allCityArrayFunction();
    newCityOptionNew();
    likeEvent();
    submitListener();
}

window.addEventListener("load", loadEvent)