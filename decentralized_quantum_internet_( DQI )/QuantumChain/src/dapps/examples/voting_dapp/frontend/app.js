document.addEventListener('DOMContentLoaded', () => {
    const candidatesDiv = document.getElementById('candidates');
    const voteButton = document.getElementById('voteButton');

    async function fetchCandidates() {
        const response = await fetch('/api/get_candidates');
        const candidates = await response.json();
        candidatesDiv.innerHTML = candidates.map(candidate => `<div>${candidate.name}</div>`).join('');
    }

    voteButton.addEventListener('click', async () => {
        const candidateId = prompt("Enter candidate ID to vote:");
        const response = await fetch('/api/vote', {
            method: 'POST',
            body: JSON.stringify({ candidateId }),
            headers: { 'Content-Type': 'application/json' }
        });
        const result = await response.json();
        alert(`Vote result: ${result}`);
    });

    fetchCandidates();
});
