# identity_verification.py

import requests

class IdentityVerification:
    def __init__(self, identity_service_url):
        self.identity_service_url = identity_service_url

    def verify_identity(self, user_id, proof):
        response = requests.post(f"{self.identity_service_url}/verify", json={
            'user_id': user_id,
            'proof': proof
        })
        if response.status_code == 200:
            return response.json().get('verified', False)
        return False

    def request_verification(self, user_id, data):
        response = requests.post(f"{self.identity_service_url}/request_verification", json={
            'user_id': user_id,
            'data': data
        })
        if response.status_code == 200:
            return response.json()
        return None
