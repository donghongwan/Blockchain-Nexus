import unittest
from nexus_quantum_card import NexusQuantumCard

class TestQuantumEncryption(unittest.TestCase):
    def setUp(self):
        self.nexus_card = NexusQuantumCard()

    def test_encryption_decryption(self):
        message = "Test message"
        nonce, ciphertext, tag = self.nexus_card.encrypt_data(message)
        decrypted_message = self.nexus_card.decrypt_data(nonce, ciphertext, tag)
        self.assertEqual(message, decrypted_message)

    def test_invalid_decryption(self):
        message = "Test message"
        nonce, ciphertext, tag = self.nexus_card.encrypt_data(message)
        tampered_tag = tag + b'1'  # Tampering with the tag
        with self.assertRaises(ValueError):
            self.nexus_card.decrypt_data(nonce, ciphertext, tampered_tag)

if __name__ == "__main__":
    unittest.main()
