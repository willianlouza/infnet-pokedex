const API_URL = "https://pokeapi.co/api/v2/pokemon/";

const pokemonIcon = document.getElementById("poke-icon");
const pokemonName = document.getElementById("poke-name");

const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = new FormData(e.target).get('name');

    getPokemon(name).then(pokemon => {
        const transformed = transformedPokemon(pokemon)
        loadPokemon(transformed)
    });
})

function loadPokemon(pokemon) {
    pokemonIcon.src = pokemon.icon;
    pokemonName.innerHTML = pokemon.name;
}

async function getPokemon(param) {
    const result = await fetch(API_URL + param);
    const data = await result.json();
    return data;
}

function transformedPokemon(data) {
    return {
        name: data.name,
        icon: data.sprites.other['official-artwork'].front_default
    }
}


async function loadManyPokemons() {
    for (let i = 1; i <= 20; i++) {
        const pokemon = await getPokemon(i);
        insertPokemon(transformedPokemon(pokemon));
    }
}

function insertPokemon(pokemon) {
    const container = document.createElement('div');
    container.className = 'card';

    const icon = new Image();
    icon.id = "poke-icon";
    icon.src = pokemon.icon;

    container.appendChild(icon);

    const text = document.createElement('h1');
    text.innerHTML = pokemon.name;

    container.appendChild(text);

    document.getElementById('poke-grid').appendChild(container);
}

loadManyPokemons();
