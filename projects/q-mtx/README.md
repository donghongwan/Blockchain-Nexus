
# Q-MTX Blockchain Project

## Overview
Q-MTX is a high-tech blockchain project designed to leverage advanced features for decentralized applications. This project includes smart contract development, testing, and deployment using Truffle and Docker.

## Prerequisites
- Node.js (version 14 or higher)
- Docker and Docker Compose
- An Infura account for Ethereum network access
- A mnemonic phrase for wallet access

## Setup Instructions

1. **Clone the repository:**
   ```bash
   1 git clone https://github.com/KOSASIH/Blockchain-Nexus.git
   2 cd Blockchain-Nexus/q-mtx
   ```

2. **Install dependencies**:

   ```bash
   1 npm install
   ```

3. **Set up environment variables**: Create a .env file in the root directory and add your Infura key and mnemonic:

   ```plaintext
   1 INFURA_KEY=your_infura_key
   2 MNEMONIC=your_mnemonic
   ```

4. **Run Docker containers**:

   ```bash
   1 docker-compose up --build
   ```

5. **Deploy contracts**: In a new terminal, run:

   ```bash
   1 npm run migrate
   ```

## Usage
- To start the application, navigate to the app container and run:

   ```bash
   1 npm start
   ```

- To run tests, use:

   ```bash
   1 npm test
   ```

- To verify contracts on Etherscan, use:

   ```bash
   1 npm run verify
   ```

## Contribution
Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.
