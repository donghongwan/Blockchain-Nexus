import os
from cryptography.fernet import Fernet

class EncryptionManager:
    def __init__(self):
        # Generate a key for encryption and decryption
        self.key = Fernet.generate_key()
        self.cipher = Fernet(self.key)

    def encrypt(self, plaintext):
        """Encrypts the plaintext using Fernet symmetric encryption."""
        if isinstance(plaintext, str):
            plaintext = plaintext.encode()  # Convert string to bytes
        ciphertext = self.cipher.encrypt(plaintext)
        return ciphertext

    def decrypt(self, ciphertext):
        """Decrypts the ciphertext back to plaintext."""
        decrypted_text = self.cipher.decrypt(ciphertext)
        return decrypted_text.decode()  # Convert bytes back to string

    def save_key(self, filepath):
        """Saves the encryption key to a file."""
        with open(filepath, 'wb') as key_file:
            key_file.write(self.key)

    def load_key(self, filepath):
        """Loads the encryption key from a file."""
        with open(filepath, 'rb') as key_file:
            self.key = key_file.read()
            self.cipher = Fernet(self.key)
