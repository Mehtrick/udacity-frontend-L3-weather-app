/* Global Variables */
//This APIKey is deactivated. I did not feel save to push an api key to github which still can be used.
const apiKey = "542ffd081e67f4512b705f89d2a611b2&units=imperial";
const openWeatherBaseUrl = `https://api.openweathermap.org/data/2.5/weather`;

async function getWeatherDataFromOpenWeather(openWeatherBaseUrl, apiKey, zipCode) {
    const res = await fetch(`${openWeatherBaseUrl}?appid=${apiKey}&q=${zipCode}`);
    try {
        return await res.json();
    } catch (error) {
        console.log("something is broken:", error);
    }
}

document.getElementById("generate").addEventListener("click", processWeatherData);

async function processWeatherData() {
    const zipCode = document.getElementById("zip").value;
    if(zipCode.length!==5){
        window.alert("Zip Code should be a 5 digit number");
        return;
    }
    const weatherData = await getWeatherDataFromOpenWeather(openWeatherBaseUrl, apiKey, zipCode);
    await postWeatherData(`/weatherData`, weatherData);
    await getWeatherData(`/all`);
}

async function getWeatherData(url) {
    const res = await fetch(url);
    try {
        const allData = await res.json();
        updateUi(allData);
    } catch (error) {
        console.log("something is broken:", error);
    }
}

function updateUi(allData) {
    document.getElementById("temp").innerHTML = Math.round(allData.temperature) + " degrees";
    document.getElementById("content").innerHTML = allData.userResponse;
    document.getElementById("date").innerHTML = allData.date;
}

async function postWeatherData(url, data) {
    let d = new Date();
    let newDate = (d.getMonth()+1) + "." + d.getDate() + "." + d.getFullYear();
    const userResponse = document.getElementById("feelings").value;
    const dataEntry = {
        temperature: data.main.temp,
        userResponse: userResponse,
        date: newDate,
    };
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dataEntry), // body data type must match "Content-Type" header
    });

}


