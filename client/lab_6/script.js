/* eslint-disable no-trailing-spaces */
/* eslint-disable indent */
/* eslint-disable no-use-before-define */
async function windowActions() {
    // endpoint
  const request = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
  const resultArray = await request.json();// arrayName

  function findMatches(wordToMatch, resultArray) {
    return resultArray.filter((place) => {
      const regex = new RegExp(wordToMatch, 'gi');
      // filtered by name or zipcode
      return place.name.match(regex) || place.zip.match(regex);
    });
  }

  function displayMatches(event) {
    const matchArray = findMatches(event.target.value, resultArray);
    const html = matchArray.map((place) => {
      const regex = new RegExp(event.target.value, 'gi');
      const cityName = place.city;
      const placeName = place.name;
      const categoryName = place.category;
      const addressName = place.address_line_1;
      const zipName = place.zip;
      return `
                <li>
                    <span class="name">${placeName}</span></br>
                    <span class="name">${categoryName}</span></br>
                    <span class="name"><em>${addressName}</em></span></br>
                    <span class="name"><em>${cityName}</em></span></br>
                    <span class="name"><em>${zipName}</em></span> 
                </li>
            `;
    }).join('');
    suggestions.innerHTML = html;
  }
  const search = document.querySelector('.search');
  const suggestions = document.querySelector('.suggestions');

  search.addEventListener('change', displayMatches);
  search.addEventListener('keyup', (evt) => { displayMatches(evt); });
}

window.onload = windowActions;