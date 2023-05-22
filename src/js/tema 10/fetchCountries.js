export function fetchCountries(name) {
  const url = `https://restcountries.com/v2/name/${encodeURIComponent(
    name
  )}?fields=name,capital,population,flags,languages`;

  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('404');
      }
    })
    .catch(error => {
      throw new Error(error);
    });
}
