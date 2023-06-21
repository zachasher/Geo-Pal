const countrytitleEl = document.querySelector(".country__name");
const statsEl = document.querySelector(".country__info");
const flagholderEl = document.querySelector(".country__flag");

//Create Country Cards
function displayStats(stat, currency, language) {
  statsEl.innerHTML = ""; // clear html before appending, avoids duplicates
  countrytitleEl.innerHTML = "";
  flagholderEl.innerHTML = "";

  const nameEl = document.createElement("p");
  nameEl.innerText = stat.name.common;

  const continentEl = document.createElement("p");
  continentEl.innerText = "Continent: " + stat.continents;

  const flagEl = document.createElement("img");
  flagEl.src = stat.flags.png;

  const capitalEl = document.createElement("p");
  capitalEl.innerText = "Capital: " + stat.capital;

  const languageEl = document.createElement("p");
  languageEl.innerText = "Language: " + language;

  const currencyEl = document.createElement("p");
  currencyEl.innerText = "Currency: " + currency;

  const populationEl = document.createElement("p");
  populationEl.innerText = "Population: " + stat.population;

  const timeZoneEl = document.createElement("p");
  timeZoneEl.innerText = "Timezone: " + stat.timezones;

  countrytitleEl.appendChild(nameEl);
  flagholderEl.appendChild(flagEl);

  statsEl.appendChild(continentEl);
  statsEl.appendChild(capitalEl);
  statsEl.appendChild(languageEl);
  statsEl.appendChild(currencyEl);
  statsEl.appendChild(populationEl);
  statsEl.appendChild(timeZoneEl);

  return statsEl;
}

//Render random country from the API
const statsURL = "https://restcountries.com/v3.1/all";
function renderCountry() {
  axios.get(statsURL).then((response) => {
    const stats = response.data;
    const randomIndex = Math.floor(Math.random() * stats.length);
    const randomStat = stats[randomIndex];

    const currencyName = Object.keys(randomStat.currencies)[0];
    const currency = randomStat.currencies[currencyName].name;

    const languageName = Object.keys(randomStat.languages)[0];
    const language = randomStat.languages[languageName];

    displayStats(randomStat, currency, language);
  });
}

const randomCountryButton = document.querySelector(".random-button");
randomCountryButton.addEventListener("click", renderCountry);

renderCountry();

//Search for a country
function searchCountry() {
  const searchInput = document.querySelector(".search__bar");
  const countryName = searchInput.value;

  axios.get(statsURL).then((response) => {
    const stats = response.data;
    const foundCountry = stats.find((stat) => {
      return stat.name.common.toLowerCase() === countryName.toLowerCase();
    });

    if (foundCountry) {
      const currencyName = Object.keys(foundCountry.currencies)[0];
      const currency = foundCountry.currencies[currencyName].name;

      const languageName = Object.keys(foundCountry.languages)[0];
      const language = foundCountry.languages[languageName];

      displayStats(foundCountry, currency, language);
    } else {
      alert("Country not found");
    }
  });
}

const searchButton = document.querySelector(".search__button");
searchButton.addEventListener("click", searchCountry);

const searchInput = document.querySelector(".search__bar");

searchInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        searchButton.click();
    }
});
