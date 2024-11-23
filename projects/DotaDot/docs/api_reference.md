# DotaDot API Reference

## Introduction

The DotaDot API provides a set of endpoints for interacting with the platform's features and services. This document outlines the available endpoints, their parameters, and response formats.

## Base URL

All API requests are made to the following base URL:

[http://api.dotadot.com/v1](http://api.dotadot.com/v1) 


## Authentication

To access the API, you must include an API key in the request headers:

Authorization: Bearer YOUR_API_KEY


## Endpoints

### 1. User Management

#### Create User

- **POST** `/users`
- **Request Body**:
  ```json
  1 {
  2   "email": "user@example.com",
  3   "password": "your_password"
  4 }
  ```

- **Response**:
  ```json
  1 {
  2   "id": "user_id",
  3   "email": "user@example.com",
  4   "created_at": "timestamp"
  5 }
  ```
  
##### Get User Details
- **GET** /users/{id}
- **Response**:
  ```json
  1 {
  2   "id": "user_id",
  3   "email": "user@example.com",
  4   "created_at": "timestamp"
  5 }
  ```
  
### 2. DApp Interactions
- **Get DApp List**
- **GET** /dapps
- **Response**:
  ```json
  1 [
  2   {
  3     "id": "dapp_id",
  4     "name": "DApp Name",
  5     "description": "Description of the DApp"
  6   }
  7 ]
  ```

#### Execute Transaction
- **POST** /transactions
- **Request Body**:
  ```json
  1 {
  2   "user_id": "user_id",
  3   "dapp_id": "dapp_id",
  4   "amount": 100
  5 }
  ```
  
- **Response**:
  ```json
  1 {
  2   "transaction_id": "transaction_id",
  3   "status": "success",
  4   "timestamp": "timestamp"
  5 }
  ```
  
## Error Handling
All API responses include a status code and a message. Common status codes include:

- **200 OK**: Request was successful.
- **400 Bad Request**: Invalid request parameters.
- **401 Unauthorized**: Authentication failed.
- **404 Not Found**: Resource not found.
- **500 Internal Server Error**: An error occurred on the server.

## Conclusion
This API reference provides a comprehensive overview of the endpoints available in the DotaDot platform. For further assistance, please refer to the support documentation or contact our support team.
