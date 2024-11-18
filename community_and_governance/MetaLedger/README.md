# MetaLedger

MetaLedger is an advanced blockchain framework designed to facilitate the development and deployment of decentralized applications (dApps) and smart contracts. It provides a robust infrastructure for identity management, governance models, and network functionality, making it an ideal choice for developers looking to build on blockchain technology.

## Features

- **Smart Contract Deployment**: Easily deploy and manage smart contracts on the Ethereum blockchain.
- **Decentralized Identity Management**: Create and manage decentralized identities for users.
- **Governance Models**: Implement various governance models for decision-making processes.
- **Blockchain Node**: Run a blockchain node with a simple API for interaction.
- **Comprehensive Testing**: Built-in testing framework to ensure the reliability of components.

## Installation

To install the required dependencies, run:

```bash
pip install -r requirements.txt
```

## Usage
### Deploying a Smart Contract
To deploy a smart contract, use the following command:

```bash
1 python scripts/deploy.py <contract_source_file> <contract_name>
```

### Running a Blockchain Node
To run a blockchain node, execute:

```bash
1 python scripts/run_node.py
```

### Generating Cryptographic Keys
To generate a new key pair, run:

```bash
1 python scripts/generate_keys.py
```

### Setting Up Decentralized Identity
To set up a decentralized identity, use:

```bash
1 python scripts/identity_setup.py
```

## Testing
To run the tests, use:

```bash
1 pytest src/tests/
```

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
