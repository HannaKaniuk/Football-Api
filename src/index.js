// src/index.js
async function fetchMatches() {
    try {
        const response = await fetch('/matches');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

function displayMatches(matches) {
    const matchesList = document.getElementById('matches');
    matchesList.innerHTML = '';

    if (matches.length === 0) {
        matchesList.textContent = 'No matches available.';
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
