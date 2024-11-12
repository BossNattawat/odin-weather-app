import "./styles.css";

const cityName = document.querySelector("#cityName")
const description = document.querySelector("#description")
const weatherCondition = document.querySelector("#weatherCondition")
const temp = document.querySelector("#temp")
const form = document.querySelector("form")
const resultWrapper = document.querySelector("#resultWrapper")
const mainContent = document.querySelector("#resultWrapper"); 

resultWrapper.style.display = "none"

form.addEventListener("submit", (e) => {

    const city = document.querySelector("#city").value.trim()

    e.preventDefault()

    if(city){
        console.log(city);
        fetchAPI(city)
        form.reset()
    }
})

async function fetchAPI(cityInput){

    const resultWrapper = document.querySelector("#resultWrapper")
    const loading = document.querySelector("#loader");

    const apiKey = process.env.API_KEY

    loading.style.display = "flex";
    mainContent.classList.add("blurred")
    resultWrapper.style.display = "none";

    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityInput}/today?unitGroup=metric&key=${apiKey}&contentType=json`)
    .then(res => {
        if(!res.ok){
            console.error(res.status)
        }
        return res.json()
    })
    .then((res) => {

        let cityNameFetch = res.resolvedAddress
        let descriptionFetch = res.description
        let weatherConditionFetch = res.currentConditions.conditions
        let tempFetch = res.currentConditions.temp

        cityName.innerHTML = `Weather in ${cityNameFetch}`
        description.innerHTML = descriptionFetch
        weatherCondition.innerHTML = `Weather condition: ${weatherConditionFetch}`
        temp.textContent = `${tempFetch}`

        resultWrapper.style.display = "flex"

        loading.style.display = "none";
        mainContent.classList.remove("blurred");
        resultWrapper.style.display = "flex";
    })
    .catch((error) => {
        alert("An error occurred!")

        loading.style.display = "none";
        mainContent.classList.remove("blurred");
    })

}