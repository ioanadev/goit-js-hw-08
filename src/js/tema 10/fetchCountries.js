export function fetchCountries(name) {
  const url = `https://restcountries.com/v2/name/${encodeURIComponent(
    name
  )}?fields=name,capital,population,flags,languages`;

  return fetch(url)
    .then(response => response.json())
    .then(data => data)
    .catch(error => {
      console.error('Error:', error);
      return [];
    });
}
