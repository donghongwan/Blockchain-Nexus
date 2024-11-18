QuantumChain/
│
├── docs/
│   ├── architecture.md
│   ├── user_guide.md
│   ├── developer_guide.md
│   └── API_reference.md
│
├── src/
│   ├── core/
│   │   ├── blockchain.py
│   │   ├── transaction.py
│   │   ├── block.py
│   │   └── consensus.py
│   │
│   ├── crypto/
│   │   ├── quantum_resistant_algorithms.py
│   │   ├── post_quantum_crypto.py
│   │   ├── quantum_key_distribution.py
│   │   └── encryption_utils.py
│   │
│   ├── network/
│   │   ├── p2p_network.py
│   │   ├── node.py
│   │   └── message_protocol.py
│   │
│   ├── dapps/
│   │   ├── dapp_template/
│   │   │   ├── dapp.py
│   │   │   ├── smart_contract.py
│   │   │   └── frontend/
│   │   │       ├── index.html
│   │   │       └── app.js
│   │   └── examples/
│   │       ├── voting_dapp/
│   │       └── marketplace_dapp/
│   │
│   ├── tests/
│   │   ├── test_blockchain.py
│   │   ├── test_crypto.py
│   │   ├── test_network.py
│   │   └── test_dapps.py
│   │
│   └── utils/
│       ├── logger.py
│       ├── config.py
│       └── helpers.py
│
├── scripts/
│   ├── deploy.py
│   ├── run_node.py
│   └── generate_keys.py
│
├── requirements.txt
├── README.md
└── LICENSE
