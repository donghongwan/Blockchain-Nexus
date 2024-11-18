document.addEventListener('DOMContentLoaded', function() {
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '<p>Loading data...</p>';

    // Fetch data from the backend
    fetch('/api/data')
        .then(response => response.json())
        .then(data => {
            contentDiv.innerHTML = `< <p>Data loaded: ${JSON.stringify(data)}</p>`;
        })
        .catch(error => {
            contentDiv.innerHTML = '<p>Error loading data.</p>';
            console.error('Error:', error);
        });
});
