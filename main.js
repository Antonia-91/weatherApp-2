const api = {
  key: "2598adb562809c01fe792fce63490f07",
  base: "https://api.openweathermap.org/data/2.5/",
};

const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", setQuery);

// if Enter , run function som fetchar
function setQuery(evt) {
  if (evt.keyCode == 13) {
    //run fetch function
    getResault(searchbox.value);
    console.log(searchbox.value);
  }
}

// fetch data
function getResault(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResaults); // run function display
}

function displayResaults(weather) {
  console.log(weather);

  changeBackground(weather);

  //city
  let city = document.querySelector(".location .city");
  city.innerText = `${weather.name}, ${weather.sys.country} `;

  //datum
  let now = new Date();
  console.log(now.getDate());
  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now); // pass in new date()

  //temp
  let temp = document.querySelector(".current .temp");
  temp.innerHTML = `${Math.round(weather.main.temp).toFixed(0)}<span>°c</span>`;

  //weather
  let weather_el = document.querySelector(".current .weather");
  weather_el.innerText = `${weather.weather[0].main}`;

  //hi-low
  let hilow = document.querySelector(".hi-low");
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(
    weather.main.temp_max
  )}°c`;
}

// function to that will return day, date, outh, year
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

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

// change background
function changeBackground(weather) {
  let body = document.querySelector(".body");
  switch (weather.weather[0].main) {
    case "Clear":
      document.body.style.backgroundImage = 'url("clear.jpg")';
      break;

    case "Clouds":
      document.body.style.backgroundImage = 'url("cloudy.jpg")';
      break;

    case "Rain":
    case "Drizzle":
    case "Mist":
      document.body.style.backgroundImage = 'url("rain.jpg")';
      break;

    case "Thunderstorm":
      document.body.style.backgroundImage = 'url("storm.jpg")';
      break;

    case "Snow":
      document.body.style.backgroundImage = 'url("snow.jpg")';
      break;
  }
}
