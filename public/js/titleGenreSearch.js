
const titleSearchFormHandler = async (event) => {
    event.preventDefault();

    // Collect values from the login form
    const title = document.getElementById('titleSearchInput').value.trim();

    if (title) {
        // Send a GET request to the API endpoint
        const response = await fetch(`/api/games/titlesearch/${title}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            const data = await response.json();
            const redirectUrl = `/gamesearch/title?data=${encodeURIComponent(JSON.stringify(data))}`;
            window.location.replace(redirectUrl);

        } else {
            alert(response.statusText);
        }
    }
};

document.getElementById('titleSearchForm')
    .addEventListener('submit', titleSearchFormHandler);

// document.getElementById('genreSearchForm')
//     .addEventListener('submit', genreSearchFormHandler);  ?game=