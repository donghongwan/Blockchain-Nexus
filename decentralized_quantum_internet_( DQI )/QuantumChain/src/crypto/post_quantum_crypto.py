from pqcrypto.sign import dilithium2
from pqcrypto.kem import lightsaber

class PostQuantumCrypto:
    @staticmethod
    def generate_dilithium_keypair():
        public_key, secret_key = dilithium2.generate_keypair()
        return public_key, secret_key

    @staticmethod
    def dilithium_sign(message, secret_key):
        signature = dilithium2.sign(message.encode(), secret_key)
        return signature

    @staticmethod
    def dilithium_verify(message, signature, public_key):
        return dilithium2.verify(signature, message.encode(), public_key)

    @staticmethod
    def generate_lightsaber_keypair():
        public_key, secret_key = lightsaber.generate_keypair()
        return public_key, secret_key

    @staticmethod
    def lightsaber_encrypt(public_key, plaintext):
        ciphertext, shared_secret = lightsaber.encrypt(plaintext.encode(), public_key)
        return ciphertext, shared_secret

    @staticmethod
    def lightsaber_decrypt(secret_key, ciphertext):
        plaintext, shared_secret = lightsaber.decrypt(ciphertext, secret_key)
        return plaintext.decode()
