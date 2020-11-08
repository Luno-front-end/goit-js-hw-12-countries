import countriesCard from '../templates/countries.hbs';
import listCountries from '../templates/listCountries.hbs';
import OnSerch from './fetchCountries';
import { error } from './error';
const debounce = require('lodash.debounce');
const containerCard = document.querySelector('.formCard');
const inputEl = document.querySelector('.search');

inputEl.addEventListener('input', debounce(onSerchCountries, 500));
const onSerch = new OnSerch();

function onSerchCountries(e) {
  clearContainer();
  if (e.target.value.length < 1) {
    return;
  }
  onSerch.query = e.target.value;
  onSerch.serchCountries().then(createMarkup);
  // .catch(error => {
  //   alert('як би ти зламав систему...');
  // });
}

function createMarkup(data) {
  if (data.length === 1) {
    createMarkupCard(data);
  } else if (data.length > 1 && data.length <= 10) {
    createMarkupList(data);
  } else if (data.length > 10) {
    error({
      title: 'Too many matches found. Please enter a more specific query!',
      delay: 2000,
    });
  }
}

function createMarkupCard(data) {
  const markup = countriesCard(data);
  containerCard.insertAdjacentHTML('beforeend', markup);
}
function createMarkupList(data) {
  const markup = listCountries(data);
  containerCard.insertAdjacentHTML('beforeend', markup);
}
function clearContainer() {
  containerCard.innerHTML = '';
}

// function checkErrors() {

// }
