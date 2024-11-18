# QuantumChain API Reference

## Introduction
This document provides a comprehensive reference for the APIs available in the QuantumChain platform. It includes descriptions of the core functionalities, endpoints, and data structures.

## Core API Endpoints

### 1. Transaction API

#### Create Transaction
- **Endpoint**: `/api/transaction/create`
- **Method**: POST
- **Description**: Creates a new transaction.
- **Request Body**:
  ```json
  1 {
  2   "from": "string",
  3   "to": "string",
  4   "amount": "float",
  5   "signature": "string"
  6 }
  ```

  - **Response**:
  ```json
  1 {
  2   "transaction_id": "string",
  3   "status": "string"
  4 }
  ```

###  2. Block API
- **Get Block**
- **Endpoint**: /api/block/{block_id}
- **Method**: GET
- **Description**: Retrieves a block by its ID.
- **Response**:
  ```json
  1 {
  2   "block_id": "string",
  3   "transactions": [
  4     {
  5       "transaction_id": "string",
  6       "from": "string",
  7       "to": "string",
  8       "amount": "float"
  9     }
  10   ],
  11   "previous_block_id": "string",
  12   "timestamp": "string"
  13 }
  ```
  
### 3. Network API
- **Get Node Info**
- **Endpoint**: /api/node/info
- **Method**: GET
- **Description**: Retrieves information about the current node.
- **Response**:
  ```json
  1 {
  2   "node_id": "string",
  3   "status": "string",
  4   "peers": [
  5     "string"
  6   ]
  7 }
  ```

## Cryptography API
### Quantum Key Distribution
- **Generate Key Pair**
- **Endpoint**: /api/crypto/generate_key_pair
- **Method**: POST
- **Description**: Generates a new quantum key pair.
- **Response**:
  ```json
  1 {
  2   "private_key": "string",
  3   "public_key": "string"
  4 }
  ```
  
## Conclusion
This API reference provides the necessary details for developers to interact with the QuantumChain platform programmatically. For further assistance, please refer to the Developer Guide or contact the support team.
