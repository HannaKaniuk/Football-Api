const url = 'https://v3.football.api-sports.io/predictions?fixture=198772';
const options = {
    method: 'GET',
    headers: {
        'x-apisports-key': 'ad6f643563a6754999b833b3e3ccc099'  
    }
};

async function fetchMatches() {
    try{
        const response = await fetch (url, options);
        if(!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        return result.response || [];
    }
    catch (error){
        console.error('Error fetching data:', error);
        return [];
    }
    
}

function displayMatches(matches) {
    const matchesList = document.getElementById('matches');
    matchesList.innerHTML = '';

    if (matches.length === 0){
        matchMedia.textContent = 'No matches available.';
        return;
    }

    matches.forEach(match => {
        const matchItem = document.createElement('li');
        const homeTeam = match.teams?.home?.name || 'Unknown';
        const awayTeam = match.teams?.away?.name || 'Unknown';
        const predictedWinner = match.predictions?.winner?.name || 'Draw or No Prediction';

        matchItem.textContent = `${homeTeam} vs ${awayTeam} - Predicted Winner: ${predictedWinner}`;
        matchesList.appendChild(matchItem);
        
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    const matches = await fetchMatches();
    displayMatches(matches);
});