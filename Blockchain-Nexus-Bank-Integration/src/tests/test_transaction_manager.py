import pytest
from services.transaction_manager import TransactionManager

@pytest.fixture
def transaction_manager():
    return TransactionManager()

def test_create_transaction(transaction_manager):
    transaction = {
        "sender": "user123",
        "recipient": "user456",
        "amount": 100.0
    }
    result = transaction_manager.create_transaction(transaction)
    assert result["status"] == "created"

def test_validate_transaction(transaction_manager):
    transaction = {
        "sender": "user123",
        "recipient": "user456",
        "amount": 100.0
    }
    is_valid = transaction_manager.validate_transaction(transaction)
    assert is_valid is True

def test_transaction_history(transaction_manager):
    user_id = "user123"
    history = transaction_manager.get_transaction_history(user_id)
    assert isinstance(history, list)  # Expecting a list of transactions
