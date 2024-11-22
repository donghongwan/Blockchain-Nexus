# API Reference for MetaLedger

## Overview
The MetaLedger API allows developers to interact with the blockchain, manage identities, and participate in governance.

## Base URL

[https://api.metaledger.com/v1](https://api.metaledger.com/v1) 


## Authentication
All API requests require an API key. Include the key in the request header:

Authorization: Bearer YOUR_API_KEY


## Endpoints

### 1. Create Transaction
- **POST** `/transactions`
- **### Request Body
```json
1 {
2   "recipient": "recipient_address",
3   "amount": "amount_to_send"
4 }
```

- **Response**
```json
1 {
2   "transaction_id": "unique_transaction_id",
3   "status": "pending"
4 }
```

2. Get Transaction Status
- **GET** /transactions/{transaction_id}
- **Response**
```json
1 {
2   "transaction_id": "unique_transaction_id",
3   "status": "confirmed",
4   "block_id": "associated_block_id"
5 }
```

3. Manage Identity
- **POST** /identity
- **Request Body**
```json
1 {
2   "user_id": "user_identifier",
3   "action": "verify" // or "update"
4 }
```

- **Response**
```json
1 {
2   "status": "success",
3   "message": "Identity verified/updated successfully."
4 }
```

4. Governance Proposals
- **GET** /governance/proposals
- **Response**
```json
1 {
2   "proposals": [
3     {
4       "proposal_id": "proposal_id",
5       "title": "Proposal Title",
6       "status": "active"
7     }
8   ]
9 }
```

## Conclusion
The MetaLedger API provides a comprehensive set of endpoints for developers to build applications and interact with the blockchain. For more detailed information, please refer to the specific endpoint documentation.
