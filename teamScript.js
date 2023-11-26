const teamDisplay = document.getElementById('teamDisplay');
const urlParams = new URLSearchParams(window.location.search);
const teamData = JSON.parse(decodeURIComponent(urlParams.get('team')));
const teamName = urlParams.get('name');

teamDisplay.innerHTML = `<h2>${teamName}</h2>`;

for (const pokemon of teamData) {
  const pokemonCardWrapper = document.createElement('div');
  pokemonCardWrapper.classList.add('pokemon-card-wrapper');  

  const pokemonCard = document.createElement('div');
  pokemonCard.classList.add('card');

  const pokemonImage = document.createElement('img');
  pokemonImage.src = pokemon.image;
  pokemonImage.classList.add('card-img-top'); 

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body'); 

  const pokemonName = document.createElement('h5');
  pokemonName.classList.add('card-title'); 
  
  pokemonName.textContent = pokemon.name;

  const pokemonId = document.createElement('p');
  pokemonId.textContent = `ID: ${pokemon.id}`;

  cardBody.appendChild(pokemonName);
  cardBody.appendChild(pokemonId);
  pokemonCard.appendChild(pokemonImage);
  pokemonCard.appendChild(cardBody);
  pokemonCardWrapper.appendChild(pokemonCard);
  teamDisplay.appendChild(pokemonCardWrapper);
}
