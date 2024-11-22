# API Reference

## Authentication Endpoint
- **POST /api/authenticate**
  - Request Body: 
    ```json
    1 {
    2   "username": "user",
    3   "password": "pass"
    4 }
    ```
  - Response: 
    ```json
    1 {
    2   "token": "abc123"
    3 }
    ```

## Data Encryption Endpoint
- **POST /api/encrypt**
  - Request Body: 
    ```json
    1 {
    2   "data": "Sensitive information"
    3 }
    ```
  - Response: 
    ```json
    1 {
    2   "encrypted_data": "encrypted_string_here"
    3 }
    ```
