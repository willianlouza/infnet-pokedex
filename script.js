const API_URL = "https://pokeapi.co/api/v2/pokemon/";

const pokemonIcon = document.getElementById("poke-icon");
const pokemonName = document.getElementById("poke-name");

const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = new FormData(e.target).get('name');

    getPokemon(name).then(pokemon => {
        loadPokemon(transformedPokemon(pokemon))
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

