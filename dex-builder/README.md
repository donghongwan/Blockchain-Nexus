# DEX Builder

DEX Builder is a decentralized exchange (DEX) platform powered by AI, enabling users to trade cryptocurrencies seamlessly. The project includes smart contracts for token management, liquidity pools, staking, and governance.

## Features

- **ERC20 Token Creation**: Easily create and manage ERC20 tokens.
- **Liquidity Pools**: Add and remove liquidity with automated market-making.
- **Staking Mechanism**: Earn rewards by staking tokens.
- **Governance**: Community-driven governance for proposals and voting.
- **AI Integration**: AI models for price prediction and risk assessment.

## Prerequisites

- Node.js (>= 14.x)
- Truffle (>= 5.x)
- Ganache (for local blockchain testing)
- An Infura account (for deploying to Ethereum mainnet/testnet)
- MongoDB (for backend data storage)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/KOSASIH/Blockchain-Nexus.git
   cd Blockchain-Nexus/dex-builder
   ```

2. Install dependencies:

   ```bash
   1 npm install
   ```

3. Create a .env file in the root directory and add your Infura project ID, mnemonic, and Etherscan API key:

   ```plaintext
   1 INFURA_PROJECT_ID=your_infura_project_id
   2 MNEMONIC=your_mnemonic_phrase
   3 ETHERSCAN_API_KEY=your_etherscan_api_key
   4 PORT=3000
   5 DATABASE_URL=mongodb://localhost:27017/dex-builder
   6 AI_MODEL_PATH=./ai/models/
   ```

## Usage
### Running Tests
To run the tests, use the following command:

   ```bash
   1 npm test
   ```

### Deploying Contracts
To deploy the contracts to the development network, use:

   ```bash
   1 npm run migrate
   ```

### Starting the Backend
To start the backend server, use:

   ```bash
   1 npm start
   ```

### Starting the Frontend
To start the frontend application, use:

   ```bash
   1 npm run frontend
   ```

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
