import hashlib
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.backends import default_backend

class DecentralizedIdentity:
    def __init__(self, private_key):
        self.private_key = private_key
        self.public_key = self._generate_public_key()
        self.identity_hash = self._generate_identity_hash()

    def _generate_public_key(self):
        return self.private_key.public_key().serialize(format=serialization.PublicFormat.SubjectPublicKeyInfo,
                                                       encoding=serialization.Encoding.PEM,
                                                       parameters=None,
                                                       backend=default_backend())

    def _generate_identity_hash(self):
        return hashlib.sha256(self.public_key).hexdigest()

    def sign_message(self, message):
        return self.private_key.sign(message.encode(), padding.PSS(mgf=padding.MGF1(algorithm=hashes.SHA256()), salt_length=padding.PSS.MAX_LENGTH), hashes.SHA256())

    def verify_signature(self, message, signature):
        try:
            self.public_key.verify(signature, message.encode(), padding.PSS(mgf=padding.MGF1(algorithm=hashes.SHA256()), salt_length=padding.PSS.MAX_LENGTH), hashes.SHA256())
            return True
        except InvalidSignature:
            return False
