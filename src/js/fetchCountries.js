export default class OnSerch {
  constructor() {
    this.search = '';
  }

  serchCountries() {
    const url = `https://restcountries.eu/rest/v2/name/${this.search}`;
    return fetch(url)
      .then(r => r.json())
      .then(data => {
        return data;
      });
  }

  get query() {
    return this.search;
  }
  set query(newQuery) {
    this.search = newQuery;
  }
}
