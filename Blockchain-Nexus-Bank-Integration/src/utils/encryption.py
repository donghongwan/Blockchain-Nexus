from cryptography.fernet import Fernet
import base64
import os

class EncryptionUtil:
    """Utility class for encryption and decryption."""
    
    def __init__(self, key: bytes = None):
        if key is None:
            key = Fernet.generate_key()
        self.cipher = Fernet(key)

    def encrypt(self, data: str) -> str:
        """Encrypt the given data."""
        if isinstance(data, str):
            data = data.encode()
        encrypted_data = self.cipher.encrypt(data)
        return encrypted_data.decode()

    def decrypt(self, encrypted_data: str) -> str:
        """Decrypt the given encrypted data."""
        decrypted_data = self.cipher.decrypt(encrypted_data.encode())
        return decrypted_data.decode()

    @staticmethod
    def generate_key() -> str:
        """Generate a new encryption key."""
        return base64.urlsafe_b64encode(os.urandom(32)).decode()

# Example usage
if __name__ == "__main__":
    encryption_util = EncryptionUtil()
    secret_message = "This is a secret message."
    encrypted = encryption_util.encrypt(secret_message)
    print("Encrypted:", encrypted)
    decrypted = encryption_util.decrypt(encrypted)
    print("Decrypted:", decrypted)
