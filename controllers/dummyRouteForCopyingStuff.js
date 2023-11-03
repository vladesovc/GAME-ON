// Assuming `searchResults` is the data you want to pass to the new URL
const redirectUrl = `/titlesearchresults?data=${encodeURIComponent(JSON.stringify(searchResults))}`;
res.redirect(redirectUrl);




  






const signupFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (name && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert(response.statusText);
        }
    }
};

document.getElementById('titleSearchForm')
    .addEventListener('submit', titleSearchFormHandler);

document.getElementById('genreSearchForm')
    .addEventListener('submit', genreSearchFormHandler);
