# privacy_preserving.py

import json
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import rsa, padding
from cryptography.hazmat.backends import default_backend

class PrivacyPreserving:
    def __init__(self):
        self.data_store = {}

    def store_data(self, user_id, data):
        encrypted_data = self.encrypt_data(data)
        self.data_store[user_id] = encrypted_data

    def encrypt_data(self, data):
        private_key = rsa.generate_private_key(
            public_exponent=65537,
            key_size=2048,
            backend=default_backend()
        )
        public_key = private_key.public_key()
        ciphertext = public_key.encrypt(
            data.encode(),
            padding.OAEP(
                mgf=padding.MGF1(algorithm=hashes.SHA256()),
                algorithm=hashes.SHA256(),
                label=None
            )
        )
        return {
            'ciphertext': ciphertext.hex(),
            'public_key': self.serialize_public_key(public_key),
            'private_key': self.serialize_private_key(private_key)
        }

    @staticmethod```python
    def serialize_public_key(public_key):
        return public_key.public_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PublicFormat.SubjectPublicKeyInfo
        ).decode()

    @staticmethod
    def serialize_private_key(private_key):
        return private_key.private_bytes(
            encoding=serialization.Encoding.PEM,
            encryption_algorithm=serialization.NoEncryption()
        ).decode()

    def decrypt_data(self, user_id):
        encrypted_data = self.data_store.get(user_id)
        if not encrypted_data:
            raise Exception("No data found for this user.")

        private_key = serialization.load_pem_private_key(
            encrypted_data['private_key'].encode(),
            password=None,
            backend=default_backend()
        )
        ciphertext = bytes.fromhex(encrypted_data['ciphertext'])
        plaintext = private_key.decrypt(
            ciphertext,
            padding.OAEP(
                mgf=padding.MGF1(algorithm=hashes.SHA256()),
                algorithm=hashes.SHA256(),
                label=None
            )
        )
        return plaintext.decode()
