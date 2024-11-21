import pytest
from fastapi.testclient import TestClient
from api.v1.bank_api import router as bank_router
from api.v1.transaction_api import router as transaction_router
from api.v1.user_api import router as user_router
from main import app  # Assuming you have a main.py file that initializes the FastAPI app

app.include_router(bank_router, prefix="/api/v1")
app.include_router(transaction_router, prefix="/api/v1")
app.include_router(user_router, prefix="/api/v1")

client = TestClient(app)

def test_create_account():
    response = client.post("/api/v1/create_account", json={"user_id": "user123", "initial_balance": 1000.0})
    assert response.status_code == 200
    assert response.json() == {"message": "Account created for user user123 with balance 1000.0"}

def test_send_transaction():
    response = client.post("/api/v1/send", json={"sender": "user123", "recipient": "user456", "amount": 100.0})
    assert response.status_code == 200
    assert response.json() == {"message": "Transaction of 100.0 from user123 to user456 successful."}

def test_submit_kyc():
    response = client.post("/api/v1/submit_kyc/user123", json={
        "name": "John Doe",
        "dob": "1990-01-01",
        "address": "123 Main St, Anytown, USA",
        "id_number": "A123456789"
    })
    ```python
    assert response.status_code == 200
    assert response.json() == {"message": "KYC submitted for user user123."}

def test_get_balance():
    response = client.get("/api/v1/balance/user123")
    assert response.status_code == 200
    assert "balance" in response.json()

def test_get_kyc_status():
    response = client.get("/api/v1/kyc_status/user123")
    assert response.status_code == 200
    assert "status" in response.json()
``` ### 5. `src/tests/test_api.py` (continued)

```python
def test_get_transaction_history():
    response = client.get("/api/v1/transaction_history/user123")
    assert response.status_code == 200
    assert isinstance(response.json()["transactions"], list)

def test_update_balance():
    response = client.put("/api/v1/update_balance/user123", json={"new_balance": 1500.0})
    assert response.status_code == 200
    assert response.json() == {"message": "Balance updated for user user123 to 1500.0"}

def test_cancel_transaction():
    response = client.delete("/api/v1/cancel_transaction/transaction_id_123")
    assert response.status_code == 200
    assert response.json() == {"message": "Transaction transaction_id_123 has been canceled."}
