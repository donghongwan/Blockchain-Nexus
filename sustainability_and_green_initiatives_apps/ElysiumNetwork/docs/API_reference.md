# API Reference

## Overview
The ElysiumNetwork API allows developers to interact with the blockchain and its components programmatically.

## Authentication
All API requests require authentication via a bearer token.

## Endpoints

### 1. Get User Profile
- **Endpoint**: `GET /api/v1/user/profile`
- **Description**: Retrieve the profile information of the authenticated user.
- **Response**:
  ```json
  1 {
  2   "username": "string",
  3   "email": "string",
  4   "carbon_credits": "number"
  5 }
  ```

### 2. Trade Carbon Credits
- **Endpoint**: POST /api/v1/carbon/credits/trade
- **Description**: Trade carbon credits between users.
- **Request Body**:
  ```json
  1 {
  2   "from_user": "string",
  3   "to_user": "string",
  4   "amount": "number"
  5 }
  ```
  
## Error Handling
All errors will return a JSON object with an error message and code.
