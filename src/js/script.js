import '../css/style.css';
import {debounce} from 'lodash';

document.querySelector('main').innerHTML = `
<div class="navigation">
        <div class="menu">
            <div class="menu-icon">
                <i class="fas fa-bars fa-2x"></i>
            </div>
            <div class="bar">
                <div class="search">
                    <i class="fas fa-search fa-lg"></i>
                    Search
                </div>
                <div class="downloads">
                    <i class="fas fa-download fa-lg"></i>
                    Downloads
                </div>
                <div class="vector">
                    <i class="fas fa-vector-square fa-lg"></i>
                    Vector Illustration
                </div>
                <div class="photoshop">
                    <i class="fab fa-adobe fa-lg"></i>
                    Photoshop Files
                </div>
                <div class="settings">
                    <i class="fas fa-cog fa-lg"></i>
                    Settings
                </div>
                <div class="help">
                    <i class="fas fa-question-circle fa-lg"></i>
                    Help
                </div>
                <div class="archives">
                    <i class="fas fa-archive fa-lg"></i>
                    Archives
                </div>
                <div class="articles">
                    <i class="fas fa-newspaper fa-lg"></i>
                    Articles
                </div>
                <div class="images">
                    <i class="fas fa-images fa-lg"></i>
                    Images
                </div>
                <div class="videos">
                    <i class="fas fa-video fa-lg"></i>
                    Videos
                </div>
            </div>
        </div>
        <div class="codrops">
            <i class="fas fa-arrow-left fa-sm"></i>
            &nbsp; CODROPS
        </div>
        <div class="demo">
            PREVIOUS DEMO
        </div>
        <div class="back">
            <i class="fas fa-tint fa-sm"></i>
            &nbsp; BACK TO THE CODROPS ARTICLE
        </div>
    </div>
    <div class="content">
        <div class="registration">
            <label class="input-no-selection">
                Введите страну<br>
                <input class="default-input">
                <div class="reset">x</div>
            </label>
            <div class="display-countries no-selection"></div>
            
            <button class="save-no-selection">Save</button>
            <label class="input-with-selection">
                Выберите страну<br>
                <input class="default-input" placeholder="Select...">
                <div class="reset">x</div>
            </label>
            <div class="display-countries with-selection"></div>
         
            <button class="save-with-selection">Save</button>
        </div>
    </div>
`;

void function navigation() {
    // open menu
    document.querySelector('.bar').classList.add('selected');

    document.querySelector('.menu-icon').addEventListener('click', () => {
        const bar = document.querySelector('.bar');

        if (bar.classList.contains('selected')) {
            bar.classList.remove('selected', 'over');
            document.querySelector('.search').innerHTML = `
                <i class="fas fa-search fa-lg"></i>
                Search
            `;
        } else {
            bar.classList.add('selected');
        }
    });

    document.querySelector('.menu-icon').onmouseover = () => {
        const bar = document.querySelector('.bar');

        if (!bar.classList.contains('over')) {
            bar.classList.add('over');
        }

    };

    document.querySelectorAll('.bar > div').forEach(div =>
        div.onmouseover = () => document.querySelector('.bar').classList.add('selected')
    );

    document.querySelector('.menu-icon').onmouseout = () => {
        const bar = document.querySelector('.bar');

        if (bar.classList.contains('selected')) return;

        bar.classList.remove('over');
    };

    document.querySelector('.search').addEventListener('click', e => {
        const search = e.currentTarget;

        if (search.querySelector('input')) return;

        search.innerHTML = `
        <i class="fas fa-search fa-lg"></i>
        <input class="input-search">
    `;
        search.querySelector('input').focus();
    });

    window.addEventListener('click', e => {
        const bar = document.querySelector('.bar');
        const menu = document.querySelector('.menu-icon');

        if (bar === e.target || bar === e.target.parentNode || bar === e.target.parentNode.parentNode) return;
        if (menu === e.target || menu === e.target.parentNode || menu === e.target.parentNode.parentNode) return;

        if (document.querySelector('.search')) {
            document.querySelector('.search').innerHTML = `
                <i class="fas fa-search fa-lg"></i>
                Search
            `;
        }
        bar.classList.remove('selected', 'over');
    });
}();

void function content() {
    // recently countries
    if (!localStorage.getItem('selected-countries')) {
        localStorage.setItem('selected-countries', '');
    }

    document.querySelectorAll('.reset').forEach(button => button.addEventListener('click', () => {
        button.parentNode.querySelector('input').value = '';
        button.parentNode.querySelector('.display-countries').style.display = '';
    }));

    const getCountriesByString = async str => {
        const response = await fetch(`https://restcountries.eu/rest/v2/${str}`);
        const countries = await response.json();

        if (countries.status === 404) {
            throw `No options`;
        } else {
            return countries;
        }
    };

    const pushCountriesAtContainer = (container, countries) => {
        const max = container.max;
        const min = container.min;

        countries.slice(min, max).forEach(country => {
            if (country.name) {
                container.innerHTML += `
                            <div class="country">
                                <a href="info-about-country.html"><div title="Info about ${country.name}" class="name">${country.name}</div></a>
                                <div class="alt-name">${country.altSpellings[0] || ''}</div>
                            </div>
                            `;
            } else {
                container.innerHTML += `
                            <div class="country">
                                <a href="info-about-country.html"><div title="Info about ${country}" class="name">${country}</div></a>
                                <div class="recently">recently</div>
                            </div>
                         `;
            }
            // checkout to info about country
            document.querySelectorAll('.name').forEach(divName => divName.addEventListener('click', () => {
                const country = divName.innerText.trim();

                localStorage.setItem('infoAboutCountry', country);
            }));
        });
    };

    const renderCountriesBySearch = async (container, countryName, quantity) => {
        container.style.display = 'block';

        try {
            let countries = await getCountriesByString(countryName);

            if (quantity) {
                countries = countries.slice(0, quantity);
            }

            if (countries.length === 0) {
                container.innerHTML = `No options`;
            } else {
                const selectedCountries = localStorage.getItem('selected-countries').split('??');
                const re = new RegExp(countryName.slice(5), 'ig');

                selectedCountries.pop();
                container.innerHTML = ``;
                countries = [...selectedCountries.filter(country => countryName === 'all' || re.test(country)), ...countries];
                pushCountriesAtContainer(container, countries);
                document.querySelector('.with-selection').countries = countries;
            }
        } catch (err) {
            container.innerHTML = `No options`;
        }
    };

    // debounced
    const renderCountriesBySearchDebounced = debounce(renderCountriesBySearch, 500);

    document.querySelector('.input-no-selection input').addEventListener('keyup', () => {
        const input = document.querySelector('.input-no-selection input');
        const country = input.value.trim();
        const container = document.querySelector('.no-selection');

        if (country === '') {
            container.style.display = '';
            return;
        }

        renderCountriesBySearchDebounced(container, `name/${country}`)
    });

    window.addEventListener('click', e => {
        const container = document.querySelectorAll('.display-countries');

        if (!e.target.classList.contains('default-input')) {
            container.forEach(container => container.style.display = '');
        }
    });

    document.querySelectorAll('.display-countries').forEach(container =>
        container.addEventListener('click', e => {
            let countryName;

            if (e.target.classList.contains('name') || e.target.classList.contains('alt-name')) {
                countryName = e.target.parentNode.querySelector('.name').innerHTML.trim();
            } else if (e.target.classList.contains('country')) {
                countryName = e.target.querySelector('.name').innerHTML.trim();
            }
            if (countryName) {
                if (container.classList.contains('no-selection')) {
                    document.querySelector('.input-no-selection input').value = countryName;
                } else {
                    document.querySelector('.input-with-selection input').value = countryName;
                    document.querySelector('.input-with-selection input').myValue = countryName;
                }
            }
        })
    );

    document.querySelector('.save-no-selection').addEventListener('click', () => {
        let selectedCountries = localStorage.getItem('selected-countries');
        const countryName = document.querySelector('.input-no-selection input').value.trim();

        if (!localStorage.getItem('selected-countries').split('??').includes(countryName)) {
            selectedCountries += `${countryName}??`;
            localStorage.setItem('selected-countries', selectedCountries);
        }

        console.log(`saved ${countryName}`);
    });

    document.querySelector('.save-with-selection').addEventListener('click', async () => {
        let selectedCountries = localStorage.getItem('selected-countries');
        const countryName = document.querySelector('.input-with-selection input').value.trim();
        const response = await fetch(`https://restcountries.eu/rest/v2/name/${countryName}`);
        let countries = await response.json();

        if (countries.status === 404) {
            console.log(`${countryName} doesn't exist!`);
            return;
        }

        countries = countries.map(country => country.name);

        if (countries.includes(countryName)) {
            if (!localStorage.getItem('selected-countries').split('??').includes(countryName)) {
                selectedCountries += `${countryName}??`;
                localStorage.setItem('selected-countries', selectedCountries);
                console.log(`saved ${countryName}`);
            } else {
                console.log(`passed ${countryName}, but already has been included`);
            }
        } else {
            console.log(`saved ${countryName}`);
        }
    });

    document.querySelector('.input-no-selection input').addEventListener('click', () => {
            let search = 'all';
            const input = document.querySelector('.input-no-selection input');
            const container = document.querySelector('.no-selection');

            if (input.value.trim() !== '') {
                search = `name/${input.value.trim()}`;
            }

            renderCountriesBySearchDebounced(container, search);
        }
    );

    // второй инпут
    document.querySelector('.input-with-selection input').addEventListener('click', () => {
        const input = document.querySelector('.input-with-selection input');
        const container = document.querySelector('.with-selection');

        input.setSelectionRange(0, 0);
        container.min = 0;
        container.max = 10;
        renderCountriesBySearchDebounced(container, 'all', 30);
    });

    document.querySelector('.input-with-selection input').addEventListener('keypress', () => {
        const input = document.querySelector('.input-with-selection input');

        input.style.color = 'black';
        if (input.value.trim() === input.myValue || input.value.trim() === `Select...`) {
            input.value = '';
        }
    });

    document.querySelector('.input-with-selection input').addEventListener('keyup', () => {
        const input = document.querySelector('.input-with-selection input');
        const container = document.querySelector('.with-selection');

        container.min = 0;
        container.max = 10;
        container.scrollTop = 0;
        renderCountriesBySearchDebounced(container, `name/${input.value.trim()}`);
    });

    window.addEventListener('click', e => {
        if (e.target instanceof HTMLHtmlElement) {
            const input = document.querySelector('.input-with-selection input');
            const container = document.querySelector('.with-selection');

            if (input.myValue) {
                input.value = input.myValue;
                input.style.color = 'black';
            } else {
                input.value = `Select...`;
                input.style.color = 'gray';
            }

            container.style.display = '';
        }
    });

    document.querySelector('.with-selection').addEventListener('scroll', e => {
        const container = document.querySelector('.with-selection');

        if (container.scrollHeight === Math.round(container.scrollTop) + 100) {
            container.min = container.max + 1;
            container.max += 11;
            pushCountriesAtContainer(container, container.countries);
        }
    });
}();
