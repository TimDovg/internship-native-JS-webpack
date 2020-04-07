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
        <div class="multiply-choice">
             <div class="header">Multiple choice:</div>
             <div class="display">
                 <div class="container"></div>
                 <div class="options">
                     <svg class="clean" height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" class="css-tj5bde-Svg"><path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path></svg>
                     <div class="slash"></div>
                     <svg class="arrow" height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" class="css-tj5bde-Svg"><path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
                 </div>
             </div>
             <div class="display-countries-multi"></div>
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

    document.querySelector('.with-selection').addEventListener('scroll', () => {
        const container = document.querySelector('.with-selection');

        if (container.scrollHeight === Math.round(container.scrollTop) + 100) {
            container.min = container.max;
            container.max += 10;
            pushCountriesAtContainer(container, container.countries);
        }
    });
}();

void function multipleSelection() {
    let allCountries;
    const input = document.createElement('input');
    const getAllCountries = async () => {
        const r = await fetch('https://restcountries.eu/rest/v2/all');
        const response = await r.json();

        allCountries = response.map(country => country.name);
        input.countries = allCountries;
    };
    const renderCountries = (container, countries) => {
        const display = document.querySelector('.display-countries-multi');

        container.innerHTML = ``;
        countries.forEach(country => container.innerHTML += `<div class="display-countries-multi-country-name">${country}</div>`);
        container.style.display = `flex`;

        document.querySelectorAll('.multiply-choice .display-countries-multi-country-name').forEach(divName =>
            divName.addEventListener('click', () => {
                const name = divName.innerHTML.trim();
                const id = name.replace(/\s/g, '-');

                input.insertAdjacentHTML('beforebegin',
                    `<div class="country-multi">
                              <div class="name-multi">${name}</div>
                              <div class="close ${id}"><svg height="14" width="14" viewBox="0 0 20 20" aria-hidden="true" focusable="false" class="css-tj5bde-Svg"><path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path></svg></div>
                           </div>`);
                input.selectedCountries.push(name);
                display.style.display = '';
                input.value = '';
                input.focus();

                document.querySelector(`.multiply-choice .container .${id}`).addEventListener('click', e => {
                    input.selectedCountries = input.selectedCountries.filter(country => country !== name);
                    e.currentTarget.parentNode.remove();
                });
            })
        );
    };

    const renderDefaultCountries = () => {
        const displayContainer = document.querySelector('.multiply-choice .display-countries-multi');

        input.value = '';
        input.countriesCounter = 10;
        input.countries = allCountries.filter(country => !input.selectedCountries.includes(country));
        renderCountries(displayContainer, input.countries.slice(0, input.countriesCounter));
        input.focus();
        displayContainer.scrollTop = 0;
    };

    getAllCountries();
    input.countriesCounter = 10;
    input.selectedCountries = [];

    document.querySelector('.multiply-choice .display').addEventListener('click', () => {
        const display = document.querySelector('.multiply-choice .display');
        const container = display.querySelector('.container');

        if (!display.classList.contains('active')) {
            display.classList.add('active');

            if (!container.querySelector('input')) {
                container.appendChild(input);
            }
        }

        renderDefaultCountries();
    });

    document.querySelector('.multiply-choice .clean').addEventListener('click', () => {
        const container = document.querySelector('.multiply-choice .container');

        container.innerHTML = ``;
        container.appendChild(input);
    });

    window.addEventListener('click', e => {
        if (e.target instanceof HTMLHtmlElement) {
            const display = document.querySelector('.multiply-choice .display');
            const displayContainer = document.querySelector('.multiply-choice .display-countries-multi');

            display.classList.remove('active');
            input.remove();
            displayContainer.style.display = '';
        }
    });

    input.addEventListener('click', renderDefaultCountries);

    input.addEventListener('keyup', () => {
        const container = document.querySelector('.multiply-choice .display-countries-multi');
        const value = input.value;
        const re = new RegExp(value, 'ig');
        const countries = allCountries.filter(country => re.test(country) && !input.selectedCountries.includes(country));

        input.countriesCounter = 10;
        input.countries = countries;
        if (input.countries.length) {
            renderCountries(container, input.countries.slice(0, input.countriesCounter));
        } else {
            container.innerHTML = `<div class="display-countries-multi-country-name">No options</div>`;
        }
    });

    document.querySelector('.multiply-choice .display-countries-multi').addEventListener('scroll', () => {
        const container = document.querySelector('.multiply-choice .display-countries-multi');

        if (container.scrollHeight === Math.round(container.scrollTop) + 157) {
            input.countriesCounter += 10;
            renderCountries(container, input.countries.slice(0, input.countriesCounter));
        }
    });
}();
