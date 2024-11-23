import json
import hashlib
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import rsa, padding
from cryptography.hazmat.primitives import serialization

class IdentityVerification:
    def __init__(self):
        self.public_keys = {}  # Store public keys for identity verification

    def generate_key_pair(self):
        """Generates a new RSA key pair."""
        private_key = rsa.generate_private_key(
            public_exponent=65537,
            key_size=2048,
        )
        public_key = private_key.public_key()
        return private_key, public_key

    def save_public_key(self, user_id, public_key):
        """Saves the public key associated with a user ID."""
        self.public_keys[user_id] = public_key

    def verify_signature(self, user_id, message, signature):
        """Verifies the signature of a message using the user's public key."""
        public_key = self.public_keys.get(user_id)
        if not public_key:
            raise ValueError("Public key not found for user ID.")

        try:
            public_key.verify(
                signature,
                message,
                padding.PSS(
                    mgf=padding.MGF1(hashes.SHA256()),
                    salt_length=padding.PSS.MAX_LENGTH
                ),
                hashes.SHA256()
            )
            return True
        except Exception as e:
            return False

    def create_signature(self, private_key, message):
        """Creates a digital signature for a message using the user's private key."""
        signature = private_key.sign(
            message,
            padding.PSS(
                mgf=padding.MGF1(hashes.SHA256()),
                salt_length=padding.PSS.MAX_LENGTH
            ),
            hashes.SHA256()
        )
        return signature

# Example usage
if __name__ == "__main__":
    verifier = IdentityVerification()
    private_key, public_key = verifier.generate_key_pair()
    user_id = "user123"
    verifier.save_public_key(user_id, public_key)

    message = b"Identity verification message"
    signature = verifier.create_signature(private_key, message)

    is_verified = verifier.verify_signature(user_id, message, signature)
    print(f"Signature verified: {is_verified}")
