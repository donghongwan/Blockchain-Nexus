# API Reference

## Introduction
This document provides an overview of the RESTful APIs available for integrating with the Blockchain Nexus system. Each API endpoint is described with its purpose, request parameters, and response format.

## Base URL

[https://api.blockchain-nexus.com/v1](https://api.blockchain-nexus.com/v1)


## Endpoints

### 1. Bank API

#### Get Bank Details
- **Endpoint**: `/bank/{bankId}`
- **Method**: GET
- **Description**: Retrieves details of a specific bank.
- **Parameters**:
  - `bankId` (path): The unique identifier of the bank.
- **Response**:
  ```json
  1 {
  2   "bankId": "123",
  3   "name": "Global Bank",
  4   "location": "New York",
  5   "status": "active"
  6 }
  ```

### 2. Transaction API
- **Create Transaction**
- **Endpoint**: /transaction
- **Method**: POST
- **Description**: Initiates a new transaction.
- **Request Body**:
  ```json
  1 {
  2   "senderId": "user123",
  3   "recipientId": "user456",
  4   "amount": 100.00,
  5   "currency": "USD"
  6 }
  ```
  
- **Response**:
  ```json
  1 {
  2   "transactionId": "txn789",
  3   "status": "pending"
  4 }
  ```
  
### Get Transaction Status
- **Endpoint**: /transaction/{transactionId}
- **Method**: GET
- **Description**: Retrieves the status of a specific transaction.
- **Parameters**:
- **transactionId (path)**: The unique identifier of the transaction.
- **Response**:
  ```json
  1 {
  2   "transactionId": "txn789",
  3   "status": "completed",
  4   "timestamp": "2023-10-01T12:00:00Z"
  5 }
  ```

### 3. User API
#### Register User
- **Endpoint**: /user/register
- **Method**: POST
- **Description**: Registers a new user in the system.
- **Request Body**:
  ```json
  1 {
  2   "username": "newuser",
  3   "password": "securepassword",
  4   "email": "user@example.com"
  5 }
  ```
  
- **Response**:
  ```json
  1 {
  2   "userId": "user123",
  3   "status": "registered"
  4 }
  ```
  
## Conclusion
This API reference provides essential information for developers to integrate with the Blockchain Nexus system. For further details, please refer to the documentation or contact support.

