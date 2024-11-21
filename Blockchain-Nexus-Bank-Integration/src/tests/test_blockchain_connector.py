import pytest
from services.blockchain_connector import BlockchainConnector

@pytest.fixture
def blockchain_connector():
    return BlockchainConnector()

def test_connect(blockchain_connector):
    assert blockchain_connector.connect() is True

def test_get_balance(blockchain_connector):
    user_id = "user123"
    balance = blockchain_connector.get_balance(user_id)
    assert balance >= 0  # Assuming balance cannot be negative

def test_send_transaction(blockchain_connector):
    transaction = {
        "sender": "user123",
        "recipient": "user456",
        "amount": 100.0
    }
    result = blockchain_connector.send_transaction(transaction)
    assert result["status"] == "success"
