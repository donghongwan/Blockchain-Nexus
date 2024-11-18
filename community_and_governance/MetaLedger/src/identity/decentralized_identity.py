# decentralized_identity.py

import hashlib
import json
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import rsa, padding
from cryptography.hazmat.backends import default_backend

class DecentralizedIdentity:
    def __init__(self):
        self.identities = {}

    def create_identity(self, user_id):
        private_key = rsa.generate_private_key(
            public_exponent=65537,
            key_size=2048,
            backend=default_backend()
        )
        public_key = private_key.public_key()
        identity = {
            'user_id': user_id,
            'public_key': self.serialize_public_key(public_key),
            'private_key': self.serialize_private_key(private_key)
        }
        self.identities[user_id] = identity
        return identity

    @staticmethod
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

    def get_identity(self, user_id):
        return self.identities.get(user_id)

    def sign_data(self, user_id, data):
        identity = self.get_identity(user_id)
        if not identity:
            raise Exception("Identity not found.")
        
        private_key = serialization.load_pem_private_key(
            identity['private_key'].encode(),
            password=None,
            backend=default_backend()
        )
        signature = private_key.sign(
            data.encode(),
            padding.PSS(
                mgf=padding.MGF1(hashes.SHA256()),
                salt_length=padding.PSS.MAX_LENGTH
            ),
            hashes.SHA256()
        )
        return signature.hex()

    def verify_signature(self, user_id, data, signature):
        identity = self.get_identity(user_id)
        if not identity:
            raise Exception("Identity not found.")
        
        public_key = serialization.load_pem_public_key(
            identity['public_key'].encode(),
            backend=default_backend()
        )
        try:
            public_key.verify(
                bytes.fromhex(signature),
                data.encode(),
                padding.PSS(
                    mgf=padding.MGF1(hashes.SHA256()),
                    salt_length=padding.PSS.MAX_LENGTH
                ),
                hashes.SHA256()
            )
            return True
        except Exception:
            return False
