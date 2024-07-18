


let cards = document.querySelectorAll(".card");

// Array of predefined colors
// const colors = ["#ffcccb", "#b19cd9", "#7fffd4", "#ffdead", "#98fb98"];

// // Function to generate a random index
// function getRandomIndex(max) {
//   return Math.floor(Math.random() * max);
// }

// // Iterate over each .card element
// cards.forEach(card => {
//   // Get a random index from the colors array
//   let randomIndex = getRandomIndex(colors.length);
//   // Use the random index to select a color
//   let color = colors[randomIndex];
//   // Apply the color as background
//   card.style.backgroundColor = color;
// });


let moredetail = document.querySelectorAll(".popularcities .card");
moredetail.forEach(button => {
    button.addEventListener('click', () => {
        let parentDiv = button;
        if (parentDiv.classList.contains('expanded')) {
            parentDiv.classList.remove('expanded');
            const elementsToBlur = document.querySelectorAll(`.navigation,body, .leftsection,.todayweather,.collapsed`);
            console.log(elementsToBlur);
            elementsToBlur.forEach(element => {
                element.style.filter = 'none';
                element.style.pointerEvents = 'auto';
            });
            parentDiv.classList.add('collapsed');
            const elementSecondright = parentDiv.querySelector(".rightcard");
            const elementSecondleft = parentDiv.querySelector(".leftcard");
            const elementSecondchild = parentDiv.querySelector(".card-body");
            elementSecondright.style.display = 'none';
            elementSecondleft.style.width = '100%';
            elementSecondright.style.width = '0%';
            elementSecondchild.style.display = "block";
            elementSecondchild.style.flexDirection = "auto";
            elementSecondchild.style.padding = "16px";
            elementSecondchild.style.justifyContent = "auto";
            elementSecondchild.style.alignItems = "auto";
            elementSecondright.style.display = "none";
        } else if (parentDiv.classList.contains('collapsed')) {
            parentDiv.classList.remove('collapsed');
            parentDiv.classList.add('expanded');
            const elementsToBlur = document.querySelectorAll(`.navigation, .leftsection,.todayweather,.collapsed`);

            const elementSecondright = parentDiv.querySelector(".rightcard");
            const elementSecondchild = parentDiv.querySelector(".card-body");
            const elementSecondleft = parentDiv.querySelector(".leftcard");
            console.log("om" + elementSecondright);
            elementSecondchild.style.display = "flex";
            elementSecondchild.style.flexDirection = "row";
            elementSecondchild.style.padding = "30px 0";
            elementSecondchild.style.justifyContent = "center";
            elementSecondchild.style.alignItems = "center";

            // elementSecondleft.style.margin= "30px 0px 30px 10px";
            // elementSecondleft.style.padding="10px";
            elementSecondleft.style.width = '45%';
            elementSecondright.style.width = '55%';
            elementSecondright.style.display = 'flex';
            // elementSecondright.style.alignItems = "center";
            // elementSecondright.style.justifyContent="center";

            console.log(elementsToBlur);
            // console.log(elementSecond);
            elementsToBlur.forEach(element => {
                console.log(element);
                element.style.filter = 'blur(2px)';
                element.style.pointerEvents = 'none';
            });
            // elementSecond.style.pointerEvents="auto";
        }
    });
});



// let addmore = document.querySelector(".addbutton");
// addmore.addEventListener("onclick", () => {

// })

const API_KEY = `32d7faba80dbf817e472ed420c770796`;
var city = document.querySelector("#inputcity");
var search = document.querySelector("#submit");

const getWeatherDetails = (cityName, lat, lon) => {
    const GET_WEATHER_API = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    fetch(GET_WEATHER_API).then(response => response.json()).then(data => {
        console.log(data);
        if (data.length == 0) {
            alert("cannot find " + cityName);
            return;
        }
        const uniqueDateForecast = [];
        const todaysDate = new Date(data.dt * 1000).getDate();
        const forecastResult = data.list.filter(forecast => {
            const dateForecast = new Date(forecast.dt * 1000).getDate();
            if (!uniqueDateForecast.includes(dateForecast)) {
                uniqueDateForecast.push(dateForecast);
                return true; // Ensures the current forecast is included in the filtered results
            }
            return false; // Ensures the current forecast is excluded from the filtered results
        });

        let subcard = document.querySelectorAll(".subcard");
        var j = 0;
        console.log(forecastResult);
        forecastResult.forEach(forecast => {
            console.log(forecast);
            // const lat = forecast.coord.lat;
            // const lon = forecast.coord.lon;
            // const name = forecast.name;
            subcard[j].querySelector(".temp").innerHTML = Math.round(forecast.main.temp);
            subcard[j].querySelector(".feel").innerHTML = Math.round(forecast.main.feels_like);
            subcard[j].querySelector(".humidity").innerHTML = Math.round(forecast.main.humidity);
            subcard[j].querySelector(".windspeed").innerHTML = Math.round(forecast.wind.speed);
            subcard[j].querySelector(".pressure").innerHTML = Math.round(forecast.main.pressure);
            var todaydate = new Date(forecast.dt * 1000);
            // const todaydate = new Date();

            const day = todaydate.getDate().toString().padStart(2, '0');
            const month = todaydate.toLocaleString('default', { month: 'long' });
            const year = todaydate.getFullYear();
            const weekday = todaydate.toLocaleString('default', { weekday: 'long' });
            const hours = todaydate.getHours().toString().padStart(2, '0');
            const minutes = todaydate.getMinutes().toString().padStart(2, '0');
            const formattedDate = `${day} ${month}, ${year} ${weekday} ${hours}:${minutes}`;
            // console.log(formattedDate);

            subcard[j].querySelector(".date").innerHTML = `${formattedDate}`;
            let weather = '';
            console.log("length" + forecast.weather.length);
            for (var i = 0; i < forecast.weather.length; i++) {
                weather = weather + forecast.weather[i].description + "/";
            }
            weather = weather.substring(0, weather.length - 1);
            // document.querySelector(".maincard .date").innerHTML = `${formattedDate}`;
            let weathermain = '';
            if (j == 0) {
                for (var i = 0; i < forecast.weather.length; i++) {
                    weathermain = weathermain + forecast.weather[i].description + "/";
                }
                weathermain = weathermain.substring(0, weathermain.length - 1);
                // weather =data.weather[0].description;
                document.querySelector(".maincard .subtitle1").innerHTML = weathermain;
                console.log("Weather" + weathermain);
                // document.querySelector(".maincard .subtitle1").innerHTML = weathermain;
            }
            // weather =data.weather[0].description;
            subcard[j].querySelector(".subtitle1").innerHTML = weather;
            // var date = new Date(forecast.sys.sunrise * 1000);
            // var hour = date.getHours().toString().padStart(2, '0');
            // var minutes = date.getMinutes().toString().padStart(2, '0');
            // subcard[j].querySelector(".sunrise").innerHTML = `${hour}:${minutes}`;
            // var date = new Date(forecast.sys.sunset * 1000);
            // var hour = date.getHours().toString().padStart(2, '0');
            // var minutes = date.getMinutes().toString().padStart(2, '0');
            // subcard[j].querySelector(".sunset").innerHTML = `${hour}:${minutes}`;
            j++;
        })

    }).catch((error) => {
        alert("cannot find coordinate1" + error);
    });
}


const getCityCoordinate = (city) => {
    let cityName = city.trim();
    console.log(cityName);
    if (!cityName) {
        return;
    }
    const GEOCODING_API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;

    fetch(GEOCODING_API_URL).then(response => response.json()).then(data => {
        console.log(data);
        if (data.length == 0) {
            alert("cannot find " + cityName);
            return;
        }
        // const {name,lat,lon}=data[0];

        // console.log(data.coord.lat);
        const lat = data.coord.lat;
        const lon = data.coord.lon;
        const name = data.name;
        document.querySelector(".place").innerHTML = data.name;
        document.querySelector(".maincard .temp").innerHTML = Math.round(data.main.temp);
        document.querySelector(".maincard .feel").innerHTML = Math.round(data.main.feels_like);
        document.querySelector(".maincard .humidity").innerHTML = Math.round(data.main.humidity);
        document.querySelector(".maincard .windspeed").innerHTML = Math.round(data.wind.speed);
        document.querySelector(".maincard .pressure").innerHTML = Math.round(data.main.pressure);
        var todaydate = new Date(data.dt * 1000);
        console.log(todaydate);
        // const todaydate = new Date();

        const day = todaydate.getDate().toString().padStart(2, '0');
        const month = todaydate.toLocaleString('default', { month: 'long' });
        const year = todaydate.getFullYear();
        const weekday = todaydate.toLocaleString('default', { weekday: 'long' });
        const hours = todaydate.getHours().toString().padStart(2, '0');
        const minutes1 = todaydate.getMinutes().toString().padStart(2, '0');
        const formattedDate = `${day} ${month}, ${year} ${weekday} ${hours}:${minutes1}`;

        // const formattedDate = `${day} ${month}, ${year} ${weekday}`;
        console.log(formattedDate);
        // console.log(formattedDate);

        document.querySelector(".maincard .date").innerHTML = `${formattedDate}`;
        // let weather = '';
        // for (var i = 0; i < data.weather.length; i++) {
        //     weather = weather + data.weather[i].description + "/";
        // }
        // weather = weather.substring(0, weather.length - 1);
        // // weather =data.weather[0].description;
        // document.querySelector(".maincard .subtitle1").innerHTML = weather;
        var date = new Date(data.sys.sunrise * 1000);
        var hour = date.getHours().toString().padStart(2, '0');
        var minutes = date.getMinutes().toString().padStart(2, '0');
        document.querySelector(".maincard .sunrise").innerHTML = `${hour}:${minutes}`;
        var date = new Date(data.sys.sunset * 1000);
        var hour = date.getHours().toString().padStart(2, '0');
        var minutes = date.getMinutes().toString().padStart(2, '0');
        document.querySelector(".maincard .sunset").innerHTML = `${hour}:${minutes}`;
        // document.querySelector(".maincard h5").innerHTML = Math.round(data.main.temp);
        // document.querySelector(".maincard h5").innerHTML = Math.round(data.main.temp);

        getWeatherDetails(name, lat, lon);
    }).catch((error) => {
        alert("error:" + error);
    });
}
getCityCoordinate("delhi");
// search.addEventListener("click", getCityCoordinate);
searchform.addEventListener('submit', event => {
    event.preventDefault();
    let city = inputcity.value.trim();
    if (city) {
        getCityCoordinate(city);
    }
});
