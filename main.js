console.log("hej");

const api = {
  key: "2598adb562809c01fe792fce63490f07",
  base: "https://api.openweathermap.org/data/2.5/",
};

const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", setQuery);

// if Enter , run function som fetchar
function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
    console.log(searchbox.value);
  }
}

// fetching
function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResaults); // run function
}

// skickar in data från fetchen... (weather)
// Hämnta element och ändra value
function displayResaults(weather) {
  console.log(weather);
  //city
  let city = document.querySelector(".location .city");
  city.innerText = `${weather.name}, ${weather.sys.country} `;

  //datum
  let now = new Date();
  console.log(now);
  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now); // pass in new date()

  //temp
  let temp = document.querySelector(".current .temp");
  temp.innerHTML = `${Math.round(weather.main.temp).toFixed(0)}<span>°c</span>`;

  //weather
  let weather_el = document.querySelector(".current .weather");
  weather_el.innerText = `${weather.weather[0].description}`;

  //hi-low
  let hilow = document.querySelector(".hi-low");
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(
    weather.main.temp_max
  )}°c`;
}

function dateBuilder(d) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()]; //console.log("day", [d.getDay()]);
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
