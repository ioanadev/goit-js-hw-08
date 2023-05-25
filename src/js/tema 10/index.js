import '/src/css/tema 10/styles.css';

const DEBOUNCE_DELAY = 300;
import { fetchCountries } from './fetchCountries.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
var debounce = require('lodash.debounce');

const searchBox = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const CountryInfo = document.querySelector('.country-info');
console.log(countryList);
function displayCountries(countries) {
  countryList.innerHTML = '';

  if (countries.length == 0) {
    Notify.failure('Oops, there is no country with that name');
    //countryList.textContent = 'Nicio țară găsită.';
    CountryInfo.innerHTML = '';
    return;
  }

  if (countries.length === 1) {
    const country = countries[0];
    console.log(country);
    const countryContainer = document.createElement('div');
    countryContainer.classList.add('country-container');
    const flagInfo = document.createElement('img');
    flagInfo.src = country.flags.svg;
    flagInfo.classList.add('flag-info');
    const nameInfo = document.createElement('h2');
    nameInfo.textContent = country.name;
    nameInfo.classList.add('name-info');

    const countryListInfo = document.createElement('ul');
    const countryListItem = document.createElement('li');

    const capital = document.createElement('h4');
    capital.textContent = `Capitala: ${country.capital}`;
    const population = document.createElement('h4');
    population.textContent = `Populație: ${country.population}`;

    const languages = document.createElement('h4');
    const languageNames = country.languages
      .map(language => language.name)
      .join(', ');
    languages.textContent = `Limbi: ${languageNames}`;

    countryContainer.appendChild(flagInfo);
    countryContainer.appendChild(nameInfo);
    countryListItem.appendChild(capital);
    countryListItem.appendChild(population);
    countryListItem.appendChild(languages);
    countryListInfo.appendChild(countryListItem);

    CountryInfo.innerHTML = '';
    CountryInfo.appendChild(countryContainer);
    CountryInfo.appendChild(countryListInfo);
    return;
  }

  if (countries.length >= 2 && countries.length <= 10) {
    countries.forEach(country => {
      CountryInfo.innerHTML = '';
      const listItem = document.createElement('li');
      listItem.classList.add('list-item');
      const listContainer = document.createElement('div');
      listContainer.classList.add('list-container');
      const flag = document.createElement('img');
      flag.classList.add('flags');
      flag.src = country.flags.svg;

      const countries = document.createElement('h6');
      countries.textContent = country.name;
      listContainer.appendChild(flag);
      listContainer.appendChild(countries);
      listItem.appendChild(listContainer);
      countryList.appendChild(listItem);
    });
    return;
  }

  if (countries.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  }
}

function handleSearch() {
  const searchQuery = searchBox.value.trim();

  if (searchQuery === '') {
    countryList.innerHTML = '';
    CountryInfo.innerHTML = '';
    return;
  }

  fetchCountries(searchQuery)
    .then(countries => displayCountries(countries))
    .catch(error => {
      if (error.message === '404') {
        Notify.failure('Oops, there is no country with that name');
      } else {
        console.error('Error:', error);
      }
    });
}
const debouncedSearch = debounce(handleSearch, DEBOUNCE_DELAY);
searchBox.addEventListener('input', debouncedSearch);
