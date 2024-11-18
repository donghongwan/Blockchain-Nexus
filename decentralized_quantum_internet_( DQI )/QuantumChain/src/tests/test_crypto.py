import unittest
from src.crypto.quantum_resistant_algorithms import QuantumResistantRSA  # Adjust import as necessary
from src.crypto.post_quantum_crypto import PostQuantumCrypto  # Adjust import as necessary
from src.crypto.encryption_utils import EncryptionUtils  # Adjust import as necessary

class TestCrypto(unittest.TestCase):
    def setUp(self):
        self.rsa = QuantumResistantRSA()
        self.private_key, self.public_key = self.rsa.generate_keypair()
        self.post_quantum = PostQuantumCrypto()
        self.encryption_key = EncryptionUtils.generate_key()

    def test_rsa_encryption_decryption(self):
        plaintext = "Hello, World!"
        ciphertext = self.rsa.encrypt(self.public_key, plaintext)
        decrypted_text = self.rsa.decrypt(self.private_key, ciphertext)
        self.assertEqual(plaintext, decrypted_text)  # Check that decryption returns the original plaintext

    def test_post_quantum_signing(self):
        message = "Test message"
        public_key, secret_key = self.post_quantum.generate_dilithium_keypair()
        signature = self.post_quantum.dilithium_sign(message, secret_key)
        self.assertTrue(self.post_quantum.dilithium_verify(message, signature, public_key))  # Verify the signature

    def test_encryption_utils(self):
        message = "Secret Message"
        encrypted_message = EncryptionUtils.encrypt_message(self.encryption_key, message)
        decrypted_message = EncryptionUtils.decrypt_message(self.encryption_key, encrypted_message)
        self.assertEqual(message, decrypted_message)  # Check that decryption returns the original message

if __name__ == '__main__':
    unittest.main()
