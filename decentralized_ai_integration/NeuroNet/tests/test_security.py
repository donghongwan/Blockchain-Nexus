import unittest
from security.encryption import EncryptionManager
from security.authentication import AuthManager

class TestSecurityFeatures(unittest.TestCase):
    def setUp(self):
        self.encryption_manager = EncryptionManager()
        self.auth_manager = AuthManager(secret_key='test_secret')

    def test_encryption_decryption(self):
        plaintext = "Hello, World!"
        ciphertext = self.encryption_manager.encrypt(plaintext)
        decrypted_text = self.encryption_manager.decrypt(ciphertext)
        self.assertEqual(plaintext, decrypted_text)

    def test_password_hashing(self):
        password = "secure_password"
        hashed_password = self.auth_manager.hash_password(password)
        self.assertTrue(self.auth_manager.verify_password(password, hashed_password))

    def test_jwt_token(self):
        user_id = "user123"
        token = self.auth_manager.generate_token(user_id)
        decoded_user_id = self.auth_manager.decode_token(token)
        self.assertEqual(user_id, decoded_user_id)

if __name__ == '__main__':
    unittest.main()
