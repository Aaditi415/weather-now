// window.location().reload();

const wrapper = document.querySelector(".wrapper"),
    inputPart = document.querySelector(".input-part"),
    infoTxt = inputPart.querySelector(".info-txt"),
    inputField = inputPart.querySelector("input"),
    locationBtn = inputPart.querySelector("button"),
    weatherPart = wrapper.querySelector(".weather-part"),
    wIcon = weatherPart.querySelector("#wIcon"),
    arrowBack = wrapper.querySelector("header i");

let api;

inputField.addEventListener("keyup", e => {
    if (e.key == "Enter" && inputField.value != "") {
        requestApi(inputField.value);
        wrapper.classList.remove("img");
    }

});

locationBtn.addEventListener("click", () => {
    wrapper.classList.remove("img");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
        alert("Your browser not support geolocation api");
    }

});
myApiKey = 'e47c5c38692f9e892d93db6aaee621ac';

function requestApi(city) {
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${myApiKey}`;
    fetchData();
}

function onSuccess(position) {
    const { latitude, longitude } = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${myApiKey}`;
    fetchData();
}

function onError(error) {
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}

function fetchData() {
    infoTxt.innerText = "Getting weather details...";
    infoTxt.classList.add("pending");
    fetch(api).then(res => res.json()).then(result => weatherDetails(result)).catch(() => {
        infoTxt.innerText = "Something went wrong";
        infoTxt.classList.replace("pending", "error");
    });
}

function weatherDetails(info) {
    if (info.cod == "404") {
        infoTxt.classList.replace("pending", "error");
        infoTxt.innerText = `${inputField.value} isn't a valid city name`;
    } else {
        const city = info.name;
        const country = info.sys.country;
        const { description, id } = info.weather[0];
        const { temp, feels_like, humidity } = info.main;
        const { sunrise } = info.sys;
        const { sunset } = info.sys;
        const { visibility } = info;
        const { speed } = info.wind;
        console.log(temp, (visibility / 1000) + "km", speed + "km/h");

        date1 = new Date(sunrise * 1000);
        sunrise_time = date1.toLocaleTimeString();

        date2 = new Date(sunset * 1000);
        sunset_time = date2.toLocaleTimeString();
        console.log(sunrise_time, sunset_time);
        if (id == 800) {
            wIcon.src = "icon/clear-sky.png";
            wrapper.style.backgroundImage = "url('image/clear-sky.jpg')";
            wrapper.style.backgroundSize = "cover";
            wrapper.style.color = "#fff";
        } else if (id >= 200 && id <= 232) {
            wIcon.src = "icon/storm.png";
            wrapper.style.backgroundImage = "url('image/storm.jpg')";
            wrapper.style.backgroundSize = "cover";
            wrapper.style.color = "#fff";

        } else if (id >= 600 && id <= 622) {
            wIcon.src = "icon/snow.png";
            wrapper.style.backgroundImage = "url('image/snowdemo.jpg')";
            wrapper.style.backgroundSize = "cover";
            wrapper.style.color = "#000";

        } else if (id >= 701 && id <= 781) {
            wIcon.src = "icon/haze.png";
            wrapper.style.backgroundImage = "url('image/haze.jpg')";
            wrapper.style.backgroundSize = "cover";
            wrapper.style.color = "#fff";
        } else if (id >= 801 && id <= 804) {
            wIcon.src = "icon/cloudy.png";
            wrapper.style.backgroundImage = "url('image/cloudy.jpg')";
            wrapper.style.backgroundSize = "cover";
            wrapper.style.color = "#fff";

        } else if ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) {
            wIcon.src = "icon/rain.png";
            wrapper.style.backgroundImage = "url('image/rain1.jpg')";
            wrapper.style.backgroundSize = "cover";
            wrapper.style.color = "#fff";

        }

        weatherPart.querySelector(".temp .numb").innerText = Math.floor(temp);
        weatherPart.querySelector(".weather").innerText = description;
        weatherPart.querySelector(".location span").innerText = `${city}, ${country}`;
        weatherPart.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
        weatherPart.querySelector("#humidity").innerText = `${humidity}%`;
        weatherPart.querySelector("#sunrise").innerText = `${sunrise_time}`;
        weatherPart.querySelector("#sunset").innerText = `${sunset_time}`;
        weatherPart.querySelector("#wind").innerText = `${speed}mph`;
        weatherPart.querySelector("#visibility").innerText = `${visibility/1000}km`;

        infoTxt.classList.remove("pending", "error");
        infoTxt.innerText = "";
        inputField.value = "";
        wrapper.classList.add("active");
    }
}

arrowBack.addEventListener("click", () => {
    wrapper.classList.remove("active");
    wrapper.classList.add("img");

});