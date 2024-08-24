const url = 'https://api-football-v1.p.rapidapi.com/v3/predictions?fixture=198772';
const options = {
    method: 'GET',
    headers: {
        'x-apisports-key': 'ad6f643563a6754999b833b3e3ccc099',  
    }
};

async function fetchMatches() {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json(); 
        console.log(result); 
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchMatches(); 
});
