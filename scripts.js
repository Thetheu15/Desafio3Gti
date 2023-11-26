const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
let selectedPokemon = [];
let teamName = '';

async function getPokemonData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar os Pokémon:', error);
  }
}

async function displayPokemonCards() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const pokemonList = data.results.slice(0, 151);

    const pokemonCardsContainer = document.getElementById('pokemonCards');

    for (const pokemon of pokemonList) {
      const pokemonData = await getPokemonData(pokemon.url);

      const pokemonCardWrapper = document.createElement('div');
      pokemonCardWrapper.classList.add('pokemon-card-wrapper');

      const pokemonCard = document.createElement('div');
      pokemonCard.classList.add('card');

      const imageUrl = pokemonData.sprites.front_default;
      const pokemonName = pokemonData.name;
      const pokemonId = pokemonData.id;
      const pokemonTypes = pokemonData.types.map(type => type.type.name).join(', ');

      pokemonCard.innerHTML = `
        <img src="${imageUrl}" class="card-img-top" alt="${pokemonName}">
        <div class="card-body">
          <h5 class="card-title">${pokemonName}</h5>
          <p>ID: ${pokemonId}</p>
          <p>Tipo: ${pokemonTypes}</p>
          <button onclick="addToTeam('${pokemonName}', ${pokemonId}, '${imageUrl}')">Adicionar ao time</button>
        </div>
      `;

      pokemonCardWrapper.appendChild(pokemonCard);
      pokemonCardsContainer.appendChild(pokemonCardWrapper);
    }
  } catch (error) {
    console.error('Erro ao exibir os Pokémon:', error);
  }
}

function addToTeam(name, id, image) {
  if (selectedPokemon.length < 6) {
    selectedPokemon.push({ name, id, image });
  } else {
    alert('Você já tem 6 Pokémon no time!');
  }
}

function saveTeam() {
  teamName = document.getElementById('teamName').value;
  const teamData = encodeURIComponent(JSON.stringify(selectedPokemon));
  window.location.href = `teams.html?team=${teamData}&name=${teamName}`;
}

window.onload = displayPokemonCards;
