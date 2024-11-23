import json
import hashlib
from identity_verification import IdentityVerification

class CredentialManagement:
    def __init__(self):
        self.credentials = {}  # Store issued credentials
        self.verifier = IdentityVerification()

    def issue_credential(self, user_id, credential_data, private_key):
        """Issues a new credential for a user."""
        credential_id = hashlib.sha256(json.dumps(credential_data).encode()).hexdigest()
        credential_data['id'] = credential_id
        credential_data['issuer'] = user_id

        # Create a signature for the credential
        signature = self.verifier.create_signature(private_key, json.dumps(credential_data).encode())
        credential_data['signature'] = signature.hex()

        self.credentials[credential_id] = credential_data
        return credential_id

    def verify_credential(self, credential_id):
        """Verifies the issued credential."""
        credential = self.credentials.get(credential_id)
        if not credential:
            return False

        # Verify the signature
        issuer_id = credential['issuer']
        signature = bytes.fromhex(credential['signature'])
        return self.verifier.verify_signature(issuer_id, json.dumps(credential).encode(), signature)

# Example usage
if __name__ == "__main__":
    credential_manager = CredentialManagement()
    private_key, public_key = credential_manager.verifier.generate_key_pair()
    user_id = "issuer123"

    credential_data = {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "date_of_birth": "1990-01-01"
    }

    credential_id = credential_manager.issue_credential(user_id, credential_data, private_key)
    print(f"Issued credential ID: {credential_id}")

    is_verified = credential_manager.verify_credential(credential_id)
    print(f"Credential verified: {is_verified}")
