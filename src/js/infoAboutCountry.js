import '../css/info-about-country.css';

if (localStorage.getItem('infoAboutCountry')) {
    const country = localStorage.getItem('infoAboutCountry');

    const pushInfoAboutCountry = async () => {
        const response = await fetch(`https://restcountries.eu/rest/v2/name/${country}?fullText=true`);
        const r = await response.json();
        const info = r[0];
        const table = document.querySelector('.country-info');

        table.querySelector('.loading').remove();
        table.querySelector('.name').innerHTML = info.name;
        table.querySelectorAll('.flag').forEach(td => td.innerHTML = `<img src="${info.flag}">`);
        table.querySelector('.number').innerHTML = `Number code: ${info.callingCodes[0]}`;
        table.querySelector('.capital').innerHTML = `Capital: ${info.capital}`;
        table.querySelector('.region').innerHTML = `Region: ${info.region}`;
        table.querySelector('.people').innerHTML = info.population;
        table.querySelector('.area').innerHTML = info.area;
        table.querySelector('.time-zone').innerHTML = `Timezone: ${info.timezones[0]}`;
        table.querySelector('.currency').innerHTML =
            `Currency: ${info.currencies[0].symbol} ${info.currencies[0].name} ${info.currencies[0].symbol}`;
        table.querySelector('.language').innerHTML = `Language: ${info.languages[0].name}`;
    };

    pushInfoAboutCountry();
}
