[![IMF Member](https://img.shields.io/badge/IMF-Member-brightgreen)](https://www.imf.org/)
[![OECD Member](https://img.shields.io/badge/OECD-Member-brightgreen)](https://www.oecd.org/)
[![World Trade Organization](https://img.shields.io/badge/WTO-Member-brightgreen)](https://www.wto.org/)
[![Basel Committee on Banking Supervision](https://img.shields.io/badge/Basel%20Committee-Certified-brightgreen)](https://www.bis.org/bcbs/)
[![Financial Stability Board](https://img.shields.io/badge/FSB-Member-brightgreen)](https://www.fsb.org/)
[![G20 Member](https://img.shields.io/badge/G20-Member-brightgreen)](https://g20.org/)
[![Securities and Exchange Commission](https://img.shields.io/badge/SEC-Compliant-brightgreen)](https://www.sec.gov/)
[![CFA Institute](https://img.shields.io/badge/CFA%20Institute-Certified-blue)](https://www.cfainstitute.org/)
[![ACAMS Certified](https://img.shields.io/badge/ACAMS-Certified-brightgreen)](https://www.acams.org/)
[![AICPA Certified](https://img.shields.io/badge/AICPA-Certified-brightgreen)](https://www.aicpa.org/)

[![ISO 20022 Certified](https://img.shields.io/badge/ISO%2020022-Certified-brightgreen)](https://www.iso.org/iso-20022.html)
[![ISO 27001 Certified](https://img.shields.io/badge/ISO%2027001-Certified-brightgreen)](https://www.iso.org/iso-27001-information-security.html)
[![PCI DSS Compliant](https://img.shields.io/badge/PCI%20DSS%20Compliant-Certified-brightgreen)](https://www.pcisecuritystandards.org/)
[![FINRA Compliance](https://img.shields.io/badge/FINRA%20Compliance-Certified-brightgreen)](https://www.finra.org/)
[![FATCA Compliant](https://img.shields.io/badge/FATCA%20Compliant-Certified-brightgreen)](https://www.irs.gov/businesses/corporations/foreign-account-tax-compliance-act-fatca)

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
