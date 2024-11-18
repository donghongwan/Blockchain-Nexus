from cryptography.fernet import Fernet

class EncryptionUtils:
    @staticmethod
    def generate_key():
        return Fernet.generate_key()

    @staticmethod
    def encrypt_message(key, message):
        fernet = Fernet(key)
        encrypted_message = fernet.encrypt(message.encode())
        return encrypted_message

    @staticmethod
    def decrypt_message(key, encrypted_message):
        fernet = Fernet(key)
        decrypted_message= fernet.decrypt(encrypted_message)
        return decrypted_message.decode()
