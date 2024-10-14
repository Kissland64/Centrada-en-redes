const playerApiUrl = 'https://api.allorigins.win/get?url=' + encodeURIComponent('http://nbainsightsoriginal.somee.com/api/Jugador');
const teamApiUrl = 'https://api.allorigins.win/get?url=' + encodeURIComponent('http://nbainsightsoriginal.somee.com/api/Equipo');
let allPlayers = []; 
let allTeams = [];  

async function getPlayers() {
    try {
        const response = await fetch(playerApiUrl);
        if (!response.ok) {
            throw new Error(`Error HTTP! Estado: ${response.status}`);
        }
        const data = await response.json();
        
        console.log("Datos recibidos de jugadores: ", data.contents);
        
        const players = JSON.parse(data.contents);
        return players;
    } catch (error) {
        console.error("Error al obtener los jugadores: ", error);
    }
}

async function getTeams() {
    try {
        const response = await fetch(teamApiUrl);
        if (!response.ok) {
            throw new Error(`Error HTTP! Estado: ${response.status}`);
        }
        const data = await response.json();
        
        console.log("Datos recibidos de equipos: ", data.contents);
        
        const teams = JSON.parse(data.contents);
        return teams;
    } catch (error) {
        console.error("Error al obtener los equipos: ", error);
    }
}

async function displayPlayersAndTeams() {
    const playerList = document.getElementById('player-list');
    const teamList = document.getElementById('team-list');
    const loader = document.getElementById('loading');

    loader.style.display = 'block';  

    const players = await getPlayers();
    const teams = await getTeams();
    
    console.log("Jugadores cargados: ", players);
    console.log("Equipos cargados: ", teams);

    allPlayers = players;
    allTeams = teams; 

    loader.style.display = 'none';  

    playerList.innerHTML = '';  
    if (players && teams) {
        players.forEach(player => {
            const playerCard = document.createElement('div');
            playerCard.classList.add('player-card');

            const team = teams.find(t => t.equipoId === player.equipoId);

            playerCard.innerHTML = `
                <img src="${team && team.imagen ? team.imagen : 'https://via.placeholder.com/150'}" alt="Logo de ${team ? team.nombre : 'Desconocido'}">
                <h2>${player.nombre}</h2>
                <p><strong>Posición:</strong> ${player.posicion}</p>
                <p><strong>Puntos por partido:</strong> ${player.puntosporPartido}</p>
                <p><strong>Asistencias por partido:</strong> ${player.asistenciasporPartido}</p>
                <p><strong>Rebotes por partido:</strong> ${player.rebotesporPartido}</p>
                <p><strong>Bloqueos por partido:</strong> ${player.bloqueosporPartido}</p>
                <p><strong>Robos por partido:</strong> ${player.robosporPartido}</p>
                <p><strong>Equipo:</strong> ${team ? team.nombre : 'Desconocido'}</p>
                <p><strong>Conferencia:</strong> ${team ? team.conferencia : 'Desconocida'}</p>
            `;

            playerList.appendChild(playerCard);
        });
    } else {
        playerList.innerHTML = `<p>No se pudieron cargar los datos de jugadores.</p>`;
    }

    teamList.innerHTML = '';  
    if (teams) {
        teams.forEach(team => {
            const teamCard = document.createElement('div');
            teamCard.classList.add('team-card');

            teamCard.innerHTML = `
                <img src="${team.imagen || 'https://via.placeholder.com/150'}" alt="Logo de ${team.nombre}">
                <h2>${team.nombre}</h2>
                <p><strong>Conferencia:</strong> ${team.conferencia}</p>
            `;

            teamList.appendChild(teamCard);
        });
    } else {
        teamList.innerHTML = `<p>No se pudieron cargar los datos de equipos.</p>`;
    }
}

function filterPlayers(searchTerm) {
    const playerList = document.getElementById('player-list');
    playerList.innerHTML = '';

    const filteredPlayers = allPlayers.filter(player =>
        player.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredPlayers.length > 0) {
        filteredPlayers.forEach(player => {
            const playerCard = document.createElement('div');
            playerCard.classList.add('player-card');

            const team = allTeams.find(t => t.equipoId === player.equipoId);

            playerCard.innerHTML = `
                <img src="${team && team.imagen ? team.imagen : 'https://via.placeholder.com/150'}" alt="Logo de ${team ? team.nombre : 'Desconocido'}">
                <h2>${player.nombre}</h2>
                <p><strong>Posición:</strong> ${player.posicion}</p>
                <p><strong>Puntos por partido:</strong> ${player.puntosporPartido}</p>
                <p><strong>Asistencias por partido:</strong> ${player.asistenciasporPartido}</p>
                <p><strong>Rebotes por partido:</strong> ${player.rebotesporPartido}</p>
                <p><strong>Bloqueos por partido:</strong> ${player.bloqueosporPartido}</p>
                <p><strong>Robos por partido:</strong> ${player.robosporPartido}</p>
                <p><strong>Equipo:</strong> ${team ? team.nombre : 'Desconocido'}</p>
                <p><strong>Conferencia:</strong> ${team ? team.conferencia : 'Desconocida'}</p>
            `;

            playerList.appendChild(playerCard);
        });
    } else {
        playerList.innerHTML = '<p>No se encontraron jugadores con ese nombre.</p>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    displayPlayersAndTeams();

    const searchBar = document.getElementById('search-bar');
    searchBar.addEventListener('input', (e) => {
        filterPlayers(e.target.value);
    });
});