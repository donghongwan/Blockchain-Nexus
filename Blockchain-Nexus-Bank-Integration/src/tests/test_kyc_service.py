import pytest
from services.kyc_service import KYCService

@pytest.fixture
def kyc_service():
    return KYCService()

def test_submit_kyc(kyc_service):
    user_id = "user123"
    identity_data = {
        "name": "John Doe",
        "dob": "1990-01-01",
        "address": "123 Main St, Anytown, USA",
        "id_number": "A123456789"
    }
    result = kyc_service.submit_kyc(user_id, identity_data)
    assert result["status"] == "success"

def test_check_kyc_status(kyc_service):
    user_id = "user123"
    status = kyc_service.check_kyc_status(user_id)
    assert status["status"] in ["verified", "pending", "failed"]  # Assuming these are possible statuses
