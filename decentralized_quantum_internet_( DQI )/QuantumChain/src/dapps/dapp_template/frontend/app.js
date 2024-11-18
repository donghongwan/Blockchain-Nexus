document.addEventListener('DOMContentLoaded', () => {
    const dataDiv = document.getElementById('data');
    const sendTransactionButton = document.getElementById('sendTransaction');

    // Fetch data from the smart contract
    async function fetchData() {
        const response = await fetch('/api/get_data');
        const data = await response.json();
        dataDiv.innerText = `Data: ${data}`;
    }

    // Send a transaction to the smart contract
    sendTransactionButton.addEventListener('click', async () => {
        const response = await fetch('/api/send_transaction', { method: 'POST' });
        const result = await response.json();
        alert(`Transaction sent: ${result}`);
    });

    fetchData();
});
