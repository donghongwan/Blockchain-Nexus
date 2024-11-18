// app.js

async function setValue() {
    const key = document.getElementById('key').value;
    const value = document.getElementById('value').value;

    const response = await fetch('/api/execute', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            method: 'set_value',
            params: [key, value]
        })
    });

    const result = await response.json();
    document.getElementById('result').innerText = JSON.stringify(result);
}

async function getValue() {
    const key = document.getElementById('getKey').value;

    const response = await fetch('/api/execute', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            method: 'get_value',
            params: [key]
        })
    });

    const result = await response.json();
    document.getElementById('result').innerText = JSON.stringify(result);
}
