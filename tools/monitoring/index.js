// tools/monitoring/index.js

const { monitorNetwork } = require('./monitor');

async function main() {
    await monitorNetwork();
}

main().catch(console.error);
