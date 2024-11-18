document.addEventListener('DOMContentLoaded', () => {
    const itemsDiv = document.getElementById('items');
    const buyButton = document.getElementById('buyButton');

    async function fetchItems() {
        const response = await fetch('/api/list_items');
        const items = await response.json();
        itemsDiv.innerHTML = items.map(item => `<div>${item.name} - ${item.price} ETH</div>`).join('');
    }

    buyButton.addEventListener('click', async () => {
        const itemId = prompt("Enter item ID to buy:");
        const response = await fetch('/api/buy_item', {
            method: 'POST',
            body: JSON.stringify({ itemId }),
            headers: { 'Content-Type': 'application/json' }
        });
        const result = await response.json();
        alert(`Purchase result: ${result}`);
    });

    fetchItems();
});
