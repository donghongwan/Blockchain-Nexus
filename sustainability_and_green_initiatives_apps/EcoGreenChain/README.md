# EcoGreenChain DApp

EcoGreenChain is a decentralized application (DApp) for managing carbon and renewable energy credits on the Ethereum blockchain.

## Features

- Create and transfer carbon credits.
- Create and transfer renewable energy credits.
- User-friendly interface with wallet integration.
- Built with React and Web3.js.

## Prerequisites

- Node.js (v14 or later)
- Truffle (v5 or later)
- Ganache (for local development)
 - Infura account (for deploying to test/main networks)

## Installation

1. Clone the repository:

   ```bash
   1 git clone https://github.com/KOSASIH/Blockchain-Nexus.git
   2 cd Blockchain-Nexus/EcoGreenChain
   ```

2. Navigate to the frontend directory and install dependencies:

   ```bash
   1 cd frontend
   2 npm install
   ```
   
3. Create a .env file in the frontend directory and add your environment variables as specified in the .env example.

4. Compile and migrate the smart contracts:

   ```bash
   1 cd ../
   2 truffle migrate --network development
   ```
   
5. Start the front-end application:

   ```bash
   1 cd frontend
   2 npm start
   ```
   
## Usage
- Open your browser and navigate to http://localhost:3000 to access the application.
- Connect your Ethereum wallet (e.g., MetaMask) to interact with the DApp.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
