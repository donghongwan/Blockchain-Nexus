// tools/analytics/index.js

const { generateReport } = require('./report');

async function main() {
    await generateReport();
}

main().catch(console.error);
