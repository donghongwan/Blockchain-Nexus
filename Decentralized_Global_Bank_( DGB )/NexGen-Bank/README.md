# NexGen Bank

NexGen Bank is a high-tech banking application that integrates advanced features such as AI-driven risk assessment and fraud detection, a robust back-end API, and a user-friendly front-end interface. This project aims to provide a seamless banking experience while ensuring security and efficiency.

## Features

- **User Management**: Registration, login, and profile management.
- **Transaction Management**: Deposit, withdrawal, and transaction history.
- **Loan Management**: Request and manage loans with approval workflows.
- **AI Integration**: Risk assessment and fraud detection using machine learning models.
- **Smart Contracts**: Secure and transparent transactions using Ethereum smart contracts.

## Technologies Used

- **Back-end**: Node.js, Express, MongoDB
- **Front-end**: React.js
- **AI/ML**: Python, scikit-learn, pandas
- **Blockchain**: Ethereum, Hardhat
- **Testing**: Mocha, Chai, Jest, React Testing Library

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Python (v3.6 or higher)
- Hardhat (for smart contract development)

### Installation

1. Clone the repository:
   ```bash
   1 git clone https://github.com/KOSASIH/Blockchain-Nexus.git
   2 cd Blockchain-Nexus/NexGen-Bank
   ```

2. Set up the back-end:

   ```bash
   1 cd backend
   2 npm install
   ```

3. Set up the front-end:

   ```bash
   1 cd frontend
   2 npm install
   ```

4. Set up the AI components:

   ```bash
   1 cd ai
   2. pip install -r requirements.txt
   ```

5. Create a .env file in the root directory and add your environment variables:

   ```plaintext
   1 MONGO_URI=mongodb://<username>:<password>@localhost:27017/nexgenbank
   2 JWT_SECRET=your_jwt_secret_key
   3 PORT=5000
   ```

## Running the Application
1. Start the MongoDB server:

   ```bash
   1 mongod
   ```
   
2. Start the back-end server:

   ```bash
   1 cd backend
   2 npm start
   ```
   
3. Start the front-end application:

   ```bash
   1 cd frontend
   2 npm start
   
4. Train the AI models (optional):

   ```bash
   1 cd ai/riskAssessment
   2 python train.py
   3 cd ../fraudDetection
   4 python train.py
   ```

## Running Tests
To run the tests for the back-end, front-end, and smart contracts, use the following commands:

1. Back-end tests:

   ```bash
   1 cd backend
   2 npm test
   ```
   
2. Front-end tests:

   ```bash
   1 cd frontend
   2 npm test
   ```
   
3. Smart contract tests:

   ```bash
   1 cd tests/contracts
   2 npx hardhat test
   ```
   
## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or features you'd like to add.

## License
This project is licensed under the MIT License.
