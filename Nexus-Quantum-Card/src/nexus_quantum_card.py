import requests
import logging
from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes
from Crypto.Hash import SHA256
from config import Config

class NexusQuantumCard:
    def __init__(self):
        self.config = Config()
        self.logger = self.setup_logging()
        self.encryption_key = self.generate_encryption_key()

    def setup_logging(self):
        """Sets up logging for the Nexus-Quantum-Card."""
        logging.basicConfig(
            level=self.config.LOG_LEVEL,
            filename=self.config.LOG_FILE,
            format='%(asctime)s - %(levelname)s - %(message)s'
        )
        return logging.getLogger(__name__)

    def generate_encryption_key(self):
        """Generates a secure encryption key."""
        key = get_random_bytes(self.config.KEY_SIZE // 8)
        self.logger.info("Generated encryption key.")
        return key

    def encrypt_data(self, data):
        """Encrypts data using AES encryption."""
        cipher = AES.new(self.encryption_key, AES.MODE_GCM)
        ciphertext, tag = cipher.encrypt_and_digest(data.encode())
        self.logger.info("Data encrypted.")
        return cipher.nonce, ciphertext, tag

    def decrypt_data(self, nonce, ciphertext, tag):
        """Decrypts data using AES encryption."""
        cipher = AES.new(self.encryption_key, AES.MODE_GCM, nonce=nonce)
        decrypted_data = cipher.decrypt_and_verify(ciphertext, tag)
        self.logger.info("Data decrypted.")
        return decrypted_data.decode()

    def quantum_key_distribution(self):
        """Simulates quantum key distribution."""
        try:
            response = requests.get(f"{self.config.QUANTUM_SERVER_URL}/generate_key", timeout=self.config.TIMEOUT)
            response.raise_for_status()
            quantum_key = response.json().get("key")
            self.logger.info("Quantum key distributed successfully.")
            return quantum_key
        except requests.RequestException as e:
            self.logger.error(f"Error during quantum key distribution: {e}")
            return None

    def send_secure_message(self, message):
        """Sends a secure message using quantum key distribution."""
        quantum_key = self.quantum_key_distribution()
        if quantum_key:
            nonce, ciphertext, tag = self.encrypt_data(message)
            # Here you would send the message along with the quantum key
            self.logger.info("Secure message sent.")
            return {
                "quantum_key": quantum_key,
                "nonce": nonce.hex(),
                "ciphertext": ciphertext.hex(),
                "tag": tag.hex()
            }
        else:
            self.logger.error("Failed to send secure message due to key distribution failure.")
            return None

    def receive_secure_message(self, quantum_key, nonce_hex, ciphertext_hex, tag_hex):
        """Receives and decrypts a secure message."""
        nonce = bytes.fromhex(nonce_hex)
        ciphertext = bytes.fromhex(ciphertext_hex)
        tag = bytes.fromhex(tag_hex)
        decrypted_message = self.decrypt_data(nonce, ciphertext, tag)
        self.logger.info("Secure message received and decrypted.")
        return decrypted_message

# Example usage
if __name__ == "__main__":
    nexus_card = NexusQuantumCard()
    message = "Hello, secure world!"
    secure_message = nexus_card.send_secure_message(message)
    if secure_message:
        print("Secure message sent:", secure_message)
        # Simulate receiving the message
        decrypted_message = nexus_card.receive_secure_message(
            secure_message['quantum_key'],
            secure_message['nonce'],
            secure_message['ciphertext'],
            secure_message['tag']
        )
        print("Decrypted message:", decrypted_message)
