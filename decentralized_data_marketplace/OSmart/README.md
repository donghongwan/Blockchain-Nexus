# OSmart - Decentralized Data Marketplace

OSmart is a decentralized data marketplace that empowers users to monetize their data securely and privately. By leveraging blockchain technology, OSmart allows individuals to share their data with businesses and researchers while maintaining control over their information. The platform also integrates data oracles to provide real-world data to smart contracts, enabling a wide range of decentralized applications (dApps).

## Features

- **Data Monetization**: Users can list their data for sale and receive payments in cryptocurrency.
- **Privacy-Preserving**: Users retain control over their data and can choose what to share.
- **Data Oracles**: Integration with oracles to fetch real-world data for enhanced dApp functionality.
- **User  Data Management**: Users can securely store and manage their data on the blockchain.
- **Governance**: Community-driven governance model allowing users to propose and vote on changes to the platform.

## Technologies Used

- **Solidity**: Smart contract development.
- **Ethereum**: Blockchain platform for deploying smart contracts.
- **Hardhat**: Development environment for Ethereum.
- **Ethers.js**: Library for interacting with the Ethereum blockchain.
- **Chai & Mocha**: Testing frameworks for writing and running tests.

## Getting Started

### Prerequisites

- Node.js (v12 or later)
- npm (Node package manager)
- Hardhat (for development and testing)

### Installation

1. Clone the repository:

   ```bash
   1 git clone https://github.com/KOSASIH/Blockchain-Nexus.git
   2 cd Blockchain-Nexus/osmart
   ```

2. Install the dependencies:

   ```bash
   1 npm install
   ```

3. Set up your environment:

- Create a .env file in the root directory and add your Ethereum wallet private key and Infura/Alchemy project ID (if using a test network):

   ```plaintext
   1 PRIVATE_KEY=your_private_key
   2 INFURA_PROJECT_ID=your_infura_project_id
   ```

3. Running the Project
- Compile the smart contracts:

   ```bash
   1 npx hardhat compile
   ```

4. Deploy the contracts:

- You can deploy the contracts to a local network or a test network. To deploy to a local network:

   ```bash
   1 npx hardhat run scripts/setup_data_marketplace.js --network localhost
   ```

5. To deploy to a test network (e.g., Rinkeby):

   ```bash
   1 npx hardhat run scripts/setup_data_marketplace.js --network rinkeby
   ```

6. Run tests:

- To run the tests for the smart contracts, use the following command:

   ```bash
   1 npx hardhat test
   ```

7. Interacting with the Contracts
- You can interact with the deployed contracts using the provided scripts in the scripts directory. For example, to list data or purchase data, you can modify and run the interact_osmart.js script.

## Contributing
Contributions are welcome! If you have suggestions for improvements or new features, please open an issue or submit a pull request.

1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Make your changes and commit them (git commit -m 'Add new feature').
4. Push to the branch (git push origin feature-branch).
5. Open a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments
- Thanks to the Ethereum community for their support and resources.
- Special thanks to the developers of Hardhat, Ethers.js, and other libraries used in this project.
